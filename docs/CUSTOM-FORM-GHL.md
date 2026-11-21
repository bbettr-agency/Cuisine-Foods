# Custom quote form – GoHighLevel integration notes

**Status: preview only. Not connected (no token in Vercel), not in production.**

Done in GHL so far: tag `cuisine-custom-form-submitted` (ID `ehaX4cL4kyPhX2dLwNfT`); field
"Estimated used oil per month" (ID `4Sw8vyql0mfm3bJZOHZE`, single dropdown, 7 options); a
Contact Tag trigger added by the client to BOTH `Copy - Cuisine Foods Leads (Phase 2)` and
`CUISINE REPS ALLOCATING`, next to their Form Submitted triggers, with re-entry enabled.
No lead has been submitted through the custom form.

The custom three-step form (`components/funnel/quote-form.tsx`) posts to `/api/quote`, which
writes to the Cuisine Foods sub-account (`HzftIvKXZGCy4lvw09vh`) through the Contacts API.
The official form "Cuisine Foods (Phase 2) - Copy" (`5qCMWMxLFGwkpxTkDvRg`) stays in the code
as the fallback and is not modified.

## 1. Minimum GHL configuration (to be done by a person, after approval)

| # | Item | Exact value |
|---|---|---|
| 1 | New tag – **created** (ID `ehaX4cL4kyPhX2dLwNfT`) | `cuisine-custom-form-submitted` |
| 2 | New contact custom field | Name **Estimated used oil per month**, type **Dropdown (Single)** – one estimate per enquiry; the server sends it as a plain value. Options, exactly: `Less than 20 L`, `20–50 L`, `51–100 L`, `101–200 L`, `201–500 L`, `More than 500 L`, `Not sure` (the dashes are en dashes). |
| 3 | Additional workflow trigger | **Contact Tag → Tag Added → `cuisine-custom-form-submitted`**, added *next to* the existing Form Submitted trigger. No action, filter or setting downstream is changed. |
| 4 | Private Integration token | Runtime scopes: View Contacts, Edit Contacts. Nothing else. (Creating items 1–2 through the API would additionally need Edit Tags and Edit Custom Fields; creating them by hand needs no token change.) |

**Created:** Contact custom field **Website attribution** (ID `sxUePgtfySBUhbMvDQPq`, key
`contact.website_attribution`), type **Multi Line (Large Text)**. Its ID is built into the code. Mapping the server writes (one `key: value` per line, this order, only the keys
that are present, 200 characters per value, 1,500 in total):

```
utm_source: facebook
utm_medium: paid
utm_campaign: <campaign>
utm_content: <ad>
utm_term: <term>
fbclid: <Meta click id from the ad URL>
gclid: <Google click id, if any>
fbc: <Meta _fbc cookie, only when the pixel is on>
fbp: <Meta _fbp cookie, only when the pixel is on>
landing_page: /quote
```

It is written once, when a NEW contact is created. GHL publishes no official character limit (community reports: about 12,000 for
multi-line), and a field's type cannot be changed after creation. The first test write is the
compatibility check.

## 2. Which workflows get the new trigger

The GHL API does not expose workflow triggers, so this must be read in the workflow builder.
Rule: **add the Tag Added trigger only to a workflow whose own trigger is Form Submitted.**

For each of `Copy - Cuisine Foods Leads (Phase 2)` and `CUISINE REPS ALLOCATING`, record:

1. Trigger type, and for Form Submitted the form(s) named in its filter.
2. Any other trigger filters (tags, custom-field values).
3. Settings → "Allow re-entry" (on/off).
4. In every Create/Update Opportunity action: the "Allow duplicate opportunities" setting.

- A workflow started by Form Submitted → gets the trigger.
- A workflow started by something the first workflow does (pipeline stage change, opportunity
  created, a tag, "Add to workflow") → must NOT get it; it would run twice.
- The per-rep "Lead's Automation", "Follow Ups" and "Closed Won" workflows are not entry
  workflows and get nothing unless step 1 shows otherwise.

## 3. Repeat submissions

Facts read from the account: duplicate contacts are **not** allowed (matched on email, then
phone); duplicate opportunities **are** allowed at account level.

A tag already on a contact does not fire Tag Added again, and removing and re-applying it
re-runs the workflow – which could open a second opportunity or re-assign a rep, depending on
the two settings in §2 (3) and (4). Those are unverified, so the form does the conservative thing:

- **New contact** (email and phone both unknown to GHL): contact saved, tag applied once.
- **Existing contact**: handling is **disabled**. Nothing is written to GHL – no field, tag,
  note or task. The visitor gets the same generic "we couldn't send your request" message
  used for any failure; the buy funnel offers the official GHL form on the spot, the collect
  funnel shows WhatsApp and phone. The official form then behaves exactly as it does today.

No message says whether a contact exists. Limit of this interim approach: a new contact
succeeds and an existing one does not, so someone probing with known details could still
infer it. Closing that fully needs an approved way to accept repeat enquiries.

Candidates to test before choosing (none is enabled):

| Option | Behaviour | Needs verifying first |
|---|---|---|
| A (current) | Existing contacts are sent to the official form | – |
| B | Update the contact, remove + re-apply the tag | Re-entry is on AND the opportunity action does not allow duplicates |
| C | Leave the contact unchanged, add a task for its owner | Task API permission; how reps are notified of tasks |

## 4. Meta Pixel (built; on automatically for Preview builds of `feat/custom-form` only)

Switch: decided at build time in `next.config.js` – ON when Vercel builds a Preview of
`feat/custom-form`, or wherever `NEXT_PUBLIC_META_PIXEL_ENABLED=true` is set on purpose; OFF
everywhere else, including production. No dashboard setting is needed for testing.

Consent: nothing from Meta (script, cookie, event) loads until the visitor presses "Allow" on a
small banner; "No thanks" is remembered and nothing loads. A Lead is sent only for visitors who
allowed it. The official GHL embed has its own pixel and consent handling, outside this code.


- Pixel `2662434760785009` – the same pixel the official form uses.
- Off unless `NEXT_PUBLIC_META_PIXEL_ENABLED=true` for that Vercel environment.
- PageView once per funnel page load, including the `/quote` selection page. Lead only after
  the server confirms BOTH the contact save and the trigger tag, with an event id so it cannot
  be sent twice. A failed or retried submission sends no Lead.
- Loaded only with the custom form. The official embed fires the pixel itself, so the two are
  never loaded together on purpose; if a visitor falls back to the embed after a failed
  submission, the embed adds one extra PageView (no extra Lead).
- No Conversions API (server-side) event is sent.

## 5. Attribution (captured, not stored)

Captured in the browser and sent with the enquiry: `utm_source`, `utm_medium`,
`utm_campaign`, `utm_content`, `utm_term`, `fbclid`, `gclid`, and Meta's `_fbc` / `_fbp`
cookies when the pixel is on. Stored in GHL only if `GHL_FIELD_ATTRIBUTION` is set.
The contact's Source is set to "Website form – bulk oil quote" / "– used oil collection".

## 6. Server environment variables (Vercel, **Preview** scope only)

Required: `GHL_API_TOKEN` (Private Integration token: View Contacts + Edit Contacts). Nothing else.
Optional overrides of built-in defaults: `GHL_TRIGGER_TAG`, `GHL_FIELD_UCO_VOLUME`,
`GHL_FIELD_ATTRIBUTION`, `NEXT_PUBLIC_META_PIXEL_ENABLED`.
Without `GHL_API_TOKEN` the form refuses to submit. Once it is set, anyone who can open the
preview URL can create a real contact – keep Vercel Deployment Protection on, or remove the
variable after testing.

## 6a. What the opportunity data shows (read-only, aggregates, 4,000 of 4,111 read)

- A normal lead has TWO opportunities: one in a "Reps (IGNORE)" pipeline and one in the
  allocated rep's Sales pipeline. That is the current design, not a fault.
- 122 contacts have two or more OPEN opportunities in the same rep pipeline, so repeat
  submissions already create duplicate opportunities today (duplicates are allowed at account
  level). The Create Opportunity action's own setting is not visible through the API.
- Every opportunity read has source "Meta Ads". Whether that is hard-coded in the workflow
  action or derived from the form's attribution is unknown; check it on the first test.

## 7. Controlled integration test (needs approval before each write)

1. §2 recorded; §1 items 1–4 created; variables set on the **Preview** environment only.
2. Control: one internal test lead through the official form; record fields, tags, workflow
   history, owner, opportunity (pipeline + stage), notifications.
3. Custom form, new internal identity: compare with the control item by item.
4. Same identity again: expect the generic failure message and the offer of the official
   form, and NO change at all in GHL.
5. One test each for Gauteng, Western Cape and North-West routing.
6. One used-oil test: new field populated, routing as expected.
7. Wrong token on Preview: form reports failure, nothing saved.
8. Delete test contacts and opportunities.

Never yet exercised against the live API: the contact save, the custom-field write format and
the tag call. Step 3 is the first time they run.

## 8. Known differences from the official form

Single choice per question (GHL allows several); local phone numbers saved as `+27…`;
consent wording is service-specific; GHL's own form-attribution data is not produced.
