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

## 3. Repeat submissions (returning contacts)

Facts read from the account: duplicate contacts are not allowed (matched on email, then phone);
duplicate opportunities are allowed; contacts have NO assigned owner – reps are identified by
tags such as `luewelin's lead` and by their sales pipeline.

**Current behaviour (default):** an existing contact is not written to. The visitor gets the
generic failure and is offered the official GHL form.

**Prepared, switched off (`repeatEnquiry.enabled` in `config/quote-form.ts`):**

1. The server adds a **note** to the existing contact with the full new enquiry. Saved fields,
   existing tags, the trigger tag and both lead workflows are untouched; no opportunity is made.
2. The server adds the tag **`cuisine-repeat-enquiry`**.
3. The visitor gets the normal thank-you (so nothing reveals that they were already known).

Needed in GHL before switching it on (new items only – nothing existing changes):

- Tag `cuisine-repeat-enquiry` – **created** (ID `54Ya8V1NSc2W5zKODEGM`).
- ONE new workflow, e.g. "Website – repeat enquiry alert":
  - Trigger: Contact Tag → Tag Added → `cuisine-repeat-enquiry`. Allow re-entry: ON.
  - If/Else on the contact's rep tag (`luewelin's lead`, `paul's lead`, `schalk's lead`,
    `marina's lead`, `andrew's lead`, `ettiene's lead`) → Internal Notification to that rep;
    else → Internal Notification to the person who allocates new leads.
  - Last action: Remove Contact Tag `cuisine-repeat-enquiry` (so the next enquiry alerts again).
  - No Create Opportunity action.

Unverified until one approved test: the notes call with the Vercel token's permissions.

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
4. Same identity again: with repeat enquiries OFF, the generic failure and the offer of the
   official form, no change in GHL; with them ON, the normal thank-you, one new note, one
   rep alert, and no new opportunity.
5. One test each for Gauteng, Western Cape and North-West routing.
6. One used-oil test: new field populated, routing as expected.
7. Wrong token on Preview: form reports failure, nothing saved.
8. Delete test contacts and opportunities.

Never yet exercised against the live API: the contact save, the custom-field write format and
the tag call. Step 3 is the first time they run.

## 8. Known differences from the official form

Single choice per question (GHL allows several); local phone numbers saved as `+27…`;
consent wording is service-specific; GHL's own form-attribution data is not produced.

## 8a. Used-oil lead routing (checked 21 Nov, read-only)

- Rep allocation is not instant for ANY lead. Of the newest real form leads, the five aged
  2–24 hours (four sunflower, one used oil) had no rep tag; every lead older than about 30
  hours had one. New leads wait in "⭐ Cuisine Foods Gauteng" plus "Gauteng Reps (IGNORE) /
  New Leads" until allocated, then move to a rep's sales pipeline.
- The two used-oil test contacts sit in exactly that waiting position, with the same tags
  (`gp lead`, `gp lead (phase2)`) the bulk test had before allocation.
- Used-oil leads from the official form do get allocated: 22 of 25 in the last three months
  carry a rep tag.
- One real difference: custom-form used-oil leads have no "Estimated monthly volume" value
  (they answer the new used-oil question instead). If the allocation step depends on volume,
  they could be skipped. Re-check the two test contacts after the next allocation run.

## 8b. Automated messages to leads (checked 21 Nov, read-only)

The conversations of the two used-oil test contacts and the bulk test contact contain only
internal activity entries ("Opportunity created" / "Opportunity updated"). No SMS, email or
WhatsApp was sent to any of them by GHL, before or after rep allocation. So there is no
automated wording that could mislead a used-oil lead – and also no automated confirmation;
the on-site thank-you is the only acknowledgement a lead receives until a rep makes contact.

## 9. Production launch checklist

Order matters. Nothing here has been done.

1. Merge pull request #2 (`feat/custom-form`) into `feat/unified-quote-funnel`, then #1 into
   `main`. Vercel deploys `main` to production automatically.
2. Before that merge, in Vercel → Environment Variables, **Production** scope:
   - `GHL_API_TOKEN` – the same Private Integration token used in Preview.
   - `NEXT_PUBLIC_META_PIXEL_ENABLED=true` – only if the pixel should run in production
     (the automatic switch covers previews of `feat/custom-form` only).
3. After the deploy: open `/api/quote` on production → `{"configured":true,"ghl":"ok"}`.
4. One approved live test per funnel; check contact, workflows, opportunities, Meta Lead.
5. Point ads at `/quote`, `/quote/buy` or `/quote/collect` as wanted.
6. Domain cutover (separate decision): DNS for `cuisinefoods.co.za` to Vercel; old-URL
   redirects are in `next.config.js`.

## 10. Rollback

| Problem | Action | Time |
|---|---|---|
| Custom form misbehaves | Vercel: set `NEXT_PUBLIC_QUOTE_FORM_MODE=ghl`, redeploy → all funnels use the official GHL form | minutes |
| One visitor is stuck | Send them the funnel URL with `?form=ghl` | immediate |
| Bad release | Vercel → Deployments → previous production deployment → Instant Rollback | immediate |
| GHL writes must stop | Remove `GHL_API_TOKEN` from Production and redeploy (form then refuses honestly) | minutes |
| Pixel problem | Remove `NEXT_PUBLIC_META_PIXEL_ENABLED`, redeploy | minutes |

The official GHL form, its Form Submitted triggers and both workflows are unchanged, so the
fallback path is exactly what runs today.
