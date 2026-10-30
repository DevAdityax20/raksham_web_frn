# 00 — Reconciliation report

Purpose: record what is verified in the codebase, what the owner has now stated as product scope, and the gap between the two.

## Evidence used

| Source | Used? | Notes |
| --- | --- | --- |
| Product requirements stated by the project owner (this session) | **Yes, authoritative for scope** | Sachi AI, advocate marketplace, paid chat, advocate self-registration with admin approval. |
| Citizen frontend code (`raksham_web_frn`) | Yes | Inspected: routes, data, services, i18n, env. |
| Admin frontend (`raksham_admin_frn`) | Yes | Scaffold only. |
| Backend (`raksham_web_bck`) | Yes | **Empty folder.** |
| Original Raksham `.md` specification files | **Not found** | Only the two README files exist. Earlier Claude project conversations are not accessible. |
| Deployment configuration | None in repo | A live production site exists; its host is not recorded. |

## Confirmed product scope (owner requirements)

1. **Advocate discovery:** users set preferences (department or area of law with jurisdiction, location, budget, years of experience) plus search filters.
2. **Instant consultation and hire/booking:** users consult a lawyer directly, by chat, or book one.
3. **Paid chat:** a very small fee, for example ₹15–20 for 5 minutes, charged "accordingly" for longer sessions.
4. **Advocate self-registration** from the sign-up/login page, listed **only after admin approval**.
5. **Sachi AI assistant:** complete help on Indian law, rules, rights and facilities, in a detailed format with links; text or **voice** input in the user's **preferred language**.
6. **Sachi scenarios:** a biker stopped by police whose rights are violated or who is misbehaved with; any misconduct by police or a government employee; **domestic violence**; **online and offline harassment**, including blackmail, with **end-to-end privacy**, guidance on what to do, staying calm, which department to visit, the person's rights and which forms to fill.
7. "**Other features like the same**" (more such guided, private help topics).

## What exists today (verified)

**Citizen Web App** (UI only): routes `/`, `/auth/sign-in`, `/auth/create-account`, not-found. Homepage sections: hero with emergency helplines (112, 181, 1930, 1915), Why Raksham, six legal categories, How it works (four steps), **Human help (a preview section)**, official resources (three sample records), privacy and safety, footer with feedback form. Sign-in and sign-up validate input but are **not connected**. English and Hindi switching works. The sign-up page has an advocate placeholder ("Apply for verification" plus a "Pending approval" pill) and a "hide sensitive content in notifications" preference.

**Admin Panel:** empty folders for dashboard, citizen management, advocate verification, legal resources, support tickets, consultations, payments, notifications, analytics, admin management, audit logs. These folder names already match the owner's scope.

## Gap analysis: vision versus code

| Owner requirement | In the code today |
| --- | --- |
| Sachi AI (text and voice, many languages) | Not present. The UI says "AI-guided" but has no assistant; "Answer a few questions" is a placeholder. |
| Advocate search by department, location, budget, experience | Not present. "Human help" is a static preview. |
| Instant chat, per-5-minute billing, booking | Not present. Admin folders `consultations` and `payments` are empty. |
| Advocate registration | Placeholder link and pill only; no form or role. |
| Admin approval of advocates | Admin folder exists, empty. |
| End-to-end privacy for victims | Only the Quick exit button and a notification-privacy preference (UI). |
| Voice and extra Indian languages | Only English and Hindi text. |

## Implemented, simulated and planned

| Category | Items |
| --- | --- |
| **Implemented (frontend)** | Page UI, routing, English/Hindi, form validation, resource filtering on sample data, helpline `tel:` links, Quick exit |
| **Simulated** | Sign in, create account, feedback, Google sign-in, forgot password (all say "not connected"); three labelled sample resources |
| **Planned (owner requirements, no code)** | Everything in the gap table, plus backend, authentication with three roles, database |

## Outdated or conflicting documentation

| Item | Finding |
| --- | --- |
| `raksham_web_frn/README.md` | Contains unresolved Git merge-conflict markers and says there is no routing (outdated). |
| Earlier version of this design package | **Replaced.** It treated advocates as an admin-verified directory only and had no Sachi design, chat, billing or booking. |

## Unresolved decisions (summary; full list in [11](11-architecture-decisions.md))

Backend stack; database; AI provider and knowledge-base method; speech (voice) provider and language coverage; payment gateway and wallet model; commission split between advocates and Raksham; refunds for unused chat time; whether advocates use the same web app or a separate portal; chat end-to-end encryption versus server-readable moderation; legal review of Sachi's content and of paid advice rules for advocates; verified helpline numbers.
