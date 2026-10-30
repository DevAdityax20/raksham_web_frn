# 11 — Architecture decisions and open questions

Only decisions supported by evidence (code or the owner's stated requirements) are marked **decided**. Alternatives named are common options, **not** a record of formal evaluation by the team.

## Decided by the owner (product scope)

| # | Decision |
| --- | --- |
| P1 | Raksham has an AI assistant, **Sachi**, for complete legal information on Indian law, rights, rules and facilities, with detailed answers and links |
| P2 | Sachi accepts **text and voice** in the user's **preferred language** |
| P3 | Sachi must support situations such as police or government misconduct, domestic violence, and online and offline harassment, with **private** guidance, calm support, departments to visit, rights and forms |
| P4 | Citizens can find advocates by **department/jurisdiction, location, budget and experience**, with search filters |
| P5 | Citizens can **consult instantly by chat** or **book/hire** an advocate |
| P6 | Chat is charged at a very small amount, for example **₹15–20 per 5 minutes**, and accordingly for longer |
| P7 | Advocates **register themselves from the sign-up page** and appear only **after admin approval** |

## Decided by the code

| # | Decision | Evidence |
| --- | --- | --- |
| D1 | Separate Citizen Web App and Admin Panel projects | Two project folders |
| D2 | Frontend, admin and backend kept as separate projects | Three sibling folders |
| D3 | React, Vite, JavaScript (no TypeScript) | `package.json` |
| D4 | Tailwind CSS 4 with plain CSS design tokens | `src/styles/` |
| D5 | React Router for the sign-in and create-account routes | `App.jsx` |
| D6 | English and Hindi via i18next, remembered in the browser | `src/i18n/` |
| D7 | Services say "not connected" and never fake success | `authService.js`, `feedbackService.js` |
| D8 | Sample data is labelled "Sample data" | resources data and cards |
| D9 | No secrets in frontend environment variables | `.env.example` files |
| D10 | Authorization must be enforced by the backend | Admin README |

## Proposed in this package (not yet decided)

| Topic | Proposal | Alternative to consider |
| --- | --- | --- |
| Backend shape | One modular backend | Microservices (more operational work at this scale) |
| Advocates' app | Same web app, advocate area by role | A separate advocate portal |
| Sachi grounding | Retrieve reviewed sources first, then generate | Generate without retrieval (higher risk of wrong law) |
| Private mode | Default for sensitive topics, no saved history | Always save history |
| Audit log | Separate append-only table | Dedicated log service |
| Chat storage | Encrypted messages | End-to-end encrypted chat, no server access |
| Billing | Prepaid 5-minute blocks with extension | Pay after the chat |

## Open questions

**Product and legal**

1. Who reviews Sachi's legal content, and how often is it re-reviewed?
2. What rules apply to advocates giving paid advice or advertising online (Bar Council norms)? Legal advice is needed.
3. What can people do without an account ("Continue without an account")?
4. Which Indian languages beyond English and Hindi, and for voice?
5. Which helpline numbers are verified and who maintains them?

**Money**

6. Payment gateway and methods (UPI, cards, wallet)?
7. Fee band per 5 minutes, Raksham's share, taxes, payout schedule?
8. Refunds for unused time or technical failure?
9. Is "hire" only a booking fee, or a longer paid engagement handled off-platform?

**Technology**

10. Backend language, framework and API style?
11. Database technology and knowledge-index method?
12. AI language model provider and data-retention terms; speech provider and language coverage?
13. Chat: server-readable (moderation possible) or end-to-end encrypted?
14. Hosting for each component, CI/CD and monitoring?

**Roles**

15. Final administrator roles and permissions.
16. How are fake or abusive advocates and users detected and removed?

## Live versus simulated features

| Feature | State |
| --- | --- |
| Page UI, routing, English/Hindi, form validation, resource filtering | Live in the frontend |
| Sign in, create account, feedback, Google sign-in, forgot password | Simulated ("not connected") |
| Official resources | Simulated (sample records) |
| Emergency helpline links | Live links; numbers to be verified |
| Sachi, advocate search, chat, booking, payments, advocate registration and approval, admin features | Planned |
