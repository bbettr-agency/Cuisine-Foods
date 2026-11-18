# Custom quote form – GoHighLevel integration notes

**Status: preview only. Not connected, not in production. Nothing in GHL has been changed.**

The custom three-step form (`components/funnel/quote-form.tsx`) posts to `/api/quote`, which
writes to the Cuisine Foods sub-account (`HzftIvKXZGCy4lvw09vh`) through the Contacts API.
The official form "Cuisine Foods (Phase 2) - Copy" (`5qCMWMxLFGwkpxTkDvRg`) stays in the code
as the fallback and is not modified.

## 1. Minimum GHL configuration (to be done by a person, after approval)

| # | Item | Exact value |
|---|---|---|
| 1 | New tag | `cuisine-custom-form-submitted` |
| 2 | New contact custom field | Name **Estimated used oil per month**, type **Dropdown (Single)** – one estimate per enquiry; the server sends it as a plain value. Options, exactly: `Less than 20 L`, `20–50 L`, `51–100 L`, `101–200 L`, `201–500 L`, `More than 500 L`, `Not sure` (the dashes are en dashes). |
| 3 | Additional workflow trigger | **Contact Tag → Tag Added → `cuisine-custom-form-submitted`**, added *next to* the existing Form Submitted trigger. No action, filter or setting downstream is changed. |
| 4 | Private Integration token | Runtime scopes: View Contacts, Edit Contacts. Nothing else. (Creating items 1–2 through the API would additionally need Edit Tags and Edit Custom Fields; creating them by hand needs no token change.) |

Approved in principle, NOT created yet: one attribution field. Recommended type **Multi Line
(Large Text)**, name e.g. "Website attribution". The server writes one line such as
`utm_source=facebook&utm_campaign=…&fbclid=…`, capped at 1,500 characters. GHL publishes no
official character limit; community reports put multi-line fields at roughly 12,000 and give
no figure for single-line, which is why multi-line is recommended. A field's type cannot be
changed after creation. Compatibility is confirmed only by the first test write (§7).

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
- **Existing contact**: fields and tags are left untouched. The new enquiry is added as a
  **task** on the contact ("Repeat website enquiry – …", due in 24 hours, assigned to the
  contact's owner when there is one) with the answers in the task body.

The visitor sees the same thank-you in both cases, so the form does not reveal whether an
email or phone number is already on file. (Response time can still differ slightly.)

Consequence to accept or change: a returning contact does NOT re-run the lead workflow – the
rep is alerted by the task instead. Alternatives once §2 (3) and (4) are known:

| Option | Behaviour | Use when |
|---|---|---|
| A (current) | Task on the existing contact, nothing else changed | Until verified, or permanently |
| B | Update the contact, remove + re-apply the tag | Re-entry is on AND the opportunity action does not allow duplicates |

## 4. Meta Pixel (prepared, off)

- Pixel `2662434760785009` – the same pixel the official form uses.
- Off unless `NEXT_PUBLIC_META_PIXEL_ENABLED=true` for that Vercel environment.
- PageView once per funnel page load; Lead only after the server confirms the save, with an
  event id so it cannot be sent twice.
- Loaded only with the custom form. The official embed fires the pixel itself, so the two are
  never loaded together on purpose; if a visitor falls back to the embed after a failed
  submission, the embed adds one extra PageView (no extra Lead).
- No Conversions API (server-side) event is sent.

## 5. Attribution (captured, not stored)

Captured in the browser and sent with the enquiry: `utm_source`, `utm_medium`,
`utm_campaign`, `utm_content`, `utm_term`, `fbclid`, `gclid`, and Meta's `_fbc` / `_fbp`
cookies when the pixel is on. Stored in GHL only if `GHL_FIELD_ATTRIBUTION` is set.
The contact's Source is set to "Website form – bulk oil quote" / "– used oil collection".

## 6. Server environment variables (Vercel, Preview scope for testing)

`GHL_API_TOKEN`, `GHL_TRIGGER_TAG`, `GHL_FIELD_UCO_VOLUME`, optional `GHL_FIELD_ATTRIBUTION`,
optional `NEXT_PUBLIC_META_PIXEL_ENABLED`. Without `GHL_API_TOKEN` the form refuses to submit.

## 7. Controlled integration test (needs approval before each write)

1. §2 recorded; §1 items 1–4 created; variables set on the **Preview** environment only.
2. Control: one internal test lead through the official form; record fields, tags, workflow
   history, owner, opportunity (pipeline + stage), notifications.
3. Custom form, new internal identity: compare with the control item by item.
4. Same identity again: expect the same thank-you, ONE new task on the contact, no change to its
   fields, tags, workflow history or opportunities.
5. One test each for Gauteng, Western Cape and North-West routing.
6. One used-oil test: new field populated, routing as expected.
7. Wrong token on Preview: form reports failure, nothing saved.
8. Delete test contacts and opportunities.

Never yet exercised against the live API: the contact save, the custom-field write format, the
tag call and the task call. Steps 3 and 4 are the first time they run.

## 8. Known differences from the official form

Single choice per question (GHL allows several); local phone numbers saved as `+27…`;
consent wording is service-specific; GHL's own form-attribution data is not produced.
