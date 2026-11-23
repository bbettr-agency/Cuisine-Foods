/**
 * PRIVACY POLICY – content for /privacy-policy.
 *
 * Written from how this website and its enquiry forms actually work. It contains
 * NO invented company, legal or retention details: where the business has not yet
 * confirmed something, the text stays general and the item is listed in
 * `awaitingConfirmation` (shown in docs, not on the page).
 *
 * `reviewed` MUST stay false until Cuisine Foods has confirmed those items and the
 * policy has had legal review. While false, the page carries a "being finalised"
 * notice, is noindex and stays out of the sitemap. Set it to true to publish.
 */
export const privacyPolicy = {
  path: "/privacy-policy",
  reviewed: false,
  lastUpdated: "23 November 2026",
  awaitingConfirmation: [
    "Registered company name and registration number",
    "Information Officer's name and contact details",
    "Whether people who enquire are sent marketing messages, and by which channels",
    "How long enquiries and contact records are kept",
    "Whether Meta 'Automatic advanced matching' is off for the pixel (section 6 assumes it is)",
    "Written operator agreements with Bbettr Agency and GoHighLevel",
    "Review by a South African attorney",
  ],
} as const;

export type PolicyBlock = string | { list: string[] } | { table: { head: [string, string]; rows: [string, string][] } };
export type PolicySection = { id: string; title: string; blocks: PolicyBlock[] };

export const privacySections: PolicySection[] = [
  {
    id: "who-we-are",
    title: "1. Who we are",
    blocks: [
      "This website is operated by Cuisine Foods (\"Cuisine Foods\", \"we\", \"us\"). Cuisine Foods is the responsible party for your personal information under the Protection of Personal Information Act 4 of 2013 (\"POPIA\").",
      "Our office addresses, telephone number and email address are shown below. Questions about this policy, and requests about your personal information, can be sent to our Information Officer using those details.",
    ],
  },
  {
    id: "scope",
    title: "2. What this policy covers",
    blocks: [
      "This policy explains what personal information we collect through this website, why we collect it, who we share it with and what rights you have. It applies to this website and to enquiries you send us through it, by WhatsApp, by phone or by email.",
    ],
  },
  {
    id: "what-we-collect",
    title: "3. Information we collect",
    blocks: [
      "Information you give us. When you request a bulk cooking oil quote or a used cooking oil collection, we ask for:",
      {
        list: [
          "your first name and your business name;",
          "your phone number and email address;",
          "your type of business;",
          "the oil you need and an estimated monthly volume, or an estimate of the used oil you produce;",
          "your province and, where applicable, your region and area.",
        ],
      },
      "If you use a WhatsApp button on this website, we first ask for your first name, last name, email address, phone number and province, so that the right person can pick up your chat. You can continue to WhatsApp without giving them.",
      "If you contact us by WhatsApp, phone or email, we also receive whatever you choose to tell us. We do not ask for identity numbers, payment card details or other special personal information through this website. Please do not send them through the enquiry forms.",
      "Campaign information. If you arrive from an advert or a link, the web address may carry campaign details (for example utm_source or utm_campaign) and click identifiers from advertising platforms (for example Meta's fbclid). If you submit an enquiry, these are saved with it, together with the page you first arrived on, so that we know which advert or link led to the enquiry.",
      "Technical information. Our hosting provider processes standard technical data needed to deliver the website, such as your IP address, your browser type and the pages requested.",
      "Advertising measurement. This happens only with your permission – see section 6.",
    ],
  },
  {
    id: "why",
    title: "4. Why we use your information",
    blocks: [
      {
        table: {
          head: ["Purpose", "Our basis under POPIA"],
          rows: [
            ["To respond to your enquiry, prepare a quotation or arrange a collection", "Your consent when you submit the form, and steps taken at your request before entering into a contract"],
            ["To pass your enquiry to the sales representative for your area", "As above"],
            ["To keep a record of enquiries and our dealings with you", "Our legitimate interest in running our business"],
            ["To understand which adverts and pages lead to enquiries", "Our legitimate interest; for the Meta Pixel, your consent"],
            ["To protect the website and forms from spam and abuse", "Our legitimate interest"],
            ["To comply with legal obligations", "Compliance with law"],
          ],
        },
      },
      "We do not make decisions about you based solely on automated processing.",
      "We use the details you send us to respond to your enquiry. You may object at any time to receiving direct marketing from us, and any marketing message we send will tell you how to opt out.",
    ],
  },
  {
    id: "sharing",
    title: "5. Who we share your information with",
    blocks: [
      "We do not sell your personal information. We share it only with:",
      {
        list: [
          "our staff and sales representatives, so that the right person can contact you;",
          "GoHighLevel (HighLevel Inc.) – the customer relationship management system in which enquiries are stored;",
          "Bbettr Agency – our website and marketing agency, which built and maintains this website and helps administer that system;",
          "Vercel Inc. – website hosting;",
          "Meta Platforms – advertising measurement, only if you allow it (section 6), and WhatsApp if you choose to contact us that way;",
          "authorities, where the law requires it.",
        ],
      },
      "Transfers outside South Africa. Some of these providers may store or process information on servers outside South Africa. Where that happens we rely on your consent, on the transfer being necessary to respond to your request, or on the provider being bound by agreements or laws that give protection substantially similar to POPIA, as section 72 of POPIA allows.",
    ],
  },
  {
    id: "cookies",
    title: "6. Cookies and the Meta Pixel",
    blocks: [
      "Essential storage. The website uses your browser's storage to remember your advertising choice (below) and, during a visit, the campaign information described in section 3. This does not track you across other websites.",
      "Meta Pixel – only if you choose \"Allow\". On our enquiry pages we ask whether you will help us measure our adverts. If you choose Allow, a small piece of code from Meta Platforms (the \"Meta Pixel\") loads. It sets cookies (such as _fbp and _fbc) and tells Meta that a page was viewed and, if you send an enquiry, that an enquiry was made. Our website does not pass your name, email address, phone number or business name to Meta with these events. Meta may combine this information with other information it holds about you; Meta's own privacy policy explains how.",
      "If you choose \"No thanks\", the Meta Pixel does not load and no advertising cookies are set. Your enquiry is handled in exactly the same way.",
      "Changing your mind. You can reset your advertising choice at any time with the button below; you will then be asked again.",
      "Our standard enquiry form. If our own form is unavailable, we may show an enquiry form provided by GoHighLevel instead. That form is loaded from the provider and may use its own cookies and the Meta Pixel.",
    ],
  },
  {
    id: "retention",
    title: "7. How long we keep your information",
    blocks: [
      "We keep enquiry records for as long as needed to deal with your enquiry and to maintain our business relationship with you, and after that only for as long as the law requires or allows.",
    ],
  },
  {
    id: "security",
    title: "8. How we protect your information",
    blocks: [
      "We take reasonable technical and organisational steps to protect personal information against loss, damage and unauthorised access. Enquiries are sent over an encrypted connection.",
      "No method of transmission or storage is completely secure. If a security compromise affects your personal information, we will notify you and the Information Regulator as POPIA requires.",
    ],
  },
  {
    id: "your-rights",
    title: "9. Your rights",
    blocks: [
      "Under POPIA you may:",
      {
        list: [
          "ask whether we hold personal information about you and request a copy;",
          "ask us to correct or delete information that is inaccurate, out of date or no longer needed;",
          "object to our processing of your information on reasonable grounds;",
          "withdraw consent you have given (this does not affect what was done before you withdrew it);",
          "object at any time to direct marketing;",
          "complain to the Information Regulator (South Africa) – see inforegulator.org.za.",
        ],
      },
      "To exercise any of these rights, contact us using the details on this page. We may need to verify your identity before acting on a request.",
    ],
  },
  {
    id: "children",
    title: "10. Children",
    blocks: ["This website is intended for businesses. We do not knowingly collect personal information from children."],
  },
  {
    id: "links",
    title: "11. Links to other websites",
    blocks: ["This website links to other sites, including our social media pages and WhatsApp. We are not responsible for how those sites handle your information."],
  },
  {
    id: "changes",
    title: "12. Changes to this policy",
    blocks: ["We may update this policy from time to time. The date at the top of this page shows when it was last changed."],
  },
];
