# Raksham — System Design Package

**Raksham** is a legal-help platform for people in India with two connected halves:

1. **Sachi**, an AI assistant that gives private, plain-language guidance on Indian law, rights, departments, forms and facilities, by text or voice, in the user's own language.
2. **An advocate marketplace**, where citizens find a suitable lawyer by department, location, budget and experience, then consult instantly by paid chat (about ₹15–20 for 5 minutes) or book a lawyer.

Advocates register themselves from the sign-up page and are listed only after **admin approval**. Administrators run the platform through a separate Admin Panel.

Raksham gives legal *information and navigation*, not legal advice. Sachi explains and points to official sources; advocates give advice.

## What is built and what is not

The product scope above is **confirmed by the project owner** (stated while preparing this package). Most of it is **not built yet**. See [00 — Reconciliation report](00-reconciliation-report.md) for the evidence.

| Component | Status |
| --- | --- |
| Citizen Web App (UI: home, sign in, create account, English/Hindi) | **Implemented, frontend only** |
| Admin Panel | **Scaffolded only** |
| Raksham API (backend) | **Not started** (`raksham_web_bck` is empty) |
| Sachi AI assistant | **Planned** (not yet visible in the UI) |
| Advocate search, consultation chat, booking, payments | **Planned** (only a "Human help" preview section exists) |
| Advocate registration and approval | **Planned** (a placeholder link and status pill exist on Create account) |
| Database, AI provider, voice provider, payment gateway, hosting | **Not chosen** |

## Three kinds of users

| User | What they do |
| --- | --- |
| **Citizen** | Asks Sachi for help, searches advocates, consults by chat, books. |
| **Advocate** | Registers, waits for approval, then receives consultations and bookings. |
| **Administrator** | Approves advocates, manages legal content, prices and safety, handles reports and refunds. |

## Confirmed technology (frontend only)

React 19 (JavaScript), Vite 8, Tailwind CSS 4, React Router 7, i18next (English and Hindi), Lucide icons, Inter font, ESLint 10. Backend, database, AI, speech, payment and hosting technologies are open decisions, listed in [11 — Decisions](11-architecture-decisions.md).

## Diagram index

| # | Document | The question it answers |
| --- | --- | --- |
| 00 | [Reconciliation report](00-reconciliation-report.md) | What is true today versus the product vision? |
| 01 | [System context](01-system-context.md) | Who uses Raksham and what outside services does it touch? |
| 02 | [High-level design](02-high-level-design.md) | How is the whole platform organized? |
| 03 | [Sachi AI assistant](03-sachi-ai-assistant.md) | How does Sachi turn a question into safe, private, sourced help? |
| 04 | [Find and consult an advocate](04-advocate-consultation.md) | How does a citizen find a lawyer, pay and chat? |
| 05 | [Advocate onboarding](05-advocate-onboarding.md) | How does an advocate join and get approved? |
| 06 | [Admin panel workflow](06-admin-workflow.md) | How do admins run the platform with accountability? |
| 07 | [Database ERD](07-database-erd.md) | What data exists and how is it related? |
| 08 | [Low-level design](08-low-level-design.md) | How do the important parts work inside? |
| 09 | [Security and privacy](09-security-privacy.md) | Who can do what, and how is private data protected? |
| 10 | [Deployment architecture](10-deployment-architecture.md) | Where would it run? |
| 11 | [Architecture decisions](11-architecture-decisions.md) | Why this design, and what is still open? |

## HLD versus LLD

- **High-level design (HLD)** shows the big parts and how they connect (documents 01, 02, 10).
- **Low-level design (LLD)** shows how one part works inside: components, rules, states and failures (documents 03 to 06 and 08).

## Colour legend used in every diagram

| Colour | Meaning |
| --- | --- |
| Green, solid border | Implemented (frontend only) |
| Amber, solid border | Scaffolded (project exists, no features) |
| Grey, dashed border | Planned: an owner requirement, or a design proposal |

Where a technology choice is only my proposal (not an owner decision) the text says **proposed**.

## How to open and present

Mermaid renders on GitHub and in VS Code with a Mermaid preview extension. Clean SVG exports of every diagram are in [`diagrams/`](diagrams/), with editable sources in `diagrams/source/`. Open an SVG in a browser to show it full screen.

**Verification:** all 22 diagrams were rendered with Mermaid CLI without syntax errors. I looked at the rendered layout of the high-level design, the Sachi pipeline, the search-and-consult flow and the consultation ER diagram; the rest rendered without errors but their layout was not inspected visually.
