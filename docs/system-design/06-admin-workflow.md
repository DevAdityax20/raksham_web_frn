# 06 — Admin panel workflow

**What it shows:** how administrators run Raksham while access control and accountability are preserved.

> **Status: PLANNED.** The Admin Panel is only scaffolded; its empty folders (`dashboard`, `citizen-management`, `advocate-verification`, `legal-resources`, `support-tickets`, `consultations`, `payments`, `notifications`, `analytics`, `admin-management`, `audit-logs`) match this design. The roles below are **proposed**, not confirmed.

## A. What administrators manage

```mermaid
flowchart LR
  login["Admin signs in"] --> check{"Server checks<br/>role and permission"}
  check -->|"Denied"| denied["Access refused"]
  check -->|"Allowed"| dash["Dashboard"]

  dash --> adv["Advocate approvals"]
  dash --> kb["Legal knowledge<br/>and resources"]
  dash --> price["Pricing and policy"]
  dash --> sup["Reports, disputes<br/>and refunds"]
  dash --> cit["Citizen accounts"]
  dash --> ana["Analytics"]

  adv --> log[("Audit log")]
  kb --> log
  price --> log
  sup --> log
  cit --> log

  classDef planned fill:#F3F4F6,stroke:#6B7280,color:#1F2937,stroke-dasharray:4 3
  class login,check,denied,dash,adv,kb,price,sup,cit,ana,log planned
```

The server checks the role before any module opens, and every change is written to the audit log. The Admin Panel only shows or hides screens; it cannot grant access by itself.

| Module | What the administrator does | Scaffold folder |
| --- | --- | --- |
| Advocate approvals | Review applications, approve, reject, suspend ([05](05-advocate-onboarding.md)) | `advocate-verification` |
| Legal knowledge and resources | Add and review laws, rights, forms, links and official resources that Sachi uses | `legal-resources` |
| Pricing and policy | Set the allowed fee band per 5 minutes, booking rules, refund rules | `payments` |
| Reports, disputes and refunds | Handle complaints about chats, wrong Sachi answers, payment issues | `support-tickets`, `consultations` |
| Citizen accounts | Support and, if necessary, restrict accounts | `citizen-management` |
| Analytics | Usage and quality overview without personal details | `analytics` |
| Admin accounts | Create administrators and assign roles | `admin-management` |
| Audit log | Read-only history of admin actions | `audit-logs` |

## B. Keeping Sachi correct

**What it shows:** how a user's "this answer is wrong" report improves Sachi.

```mermaid
flowchart LR
  rep["User reports a wrong<br/>or unclear answer"] --> tick["Ticket in Support and Reports"]
  tick --> rev["Content manager checks<br/>with a legal reviewer"]
  rev --> fix{"Source needs<br/>a change?"}
  fix -->|"Yes"| upd["Update the knowledge base<br/>and re-index"]
  fix -->|"No"| note["Reply to the reporter"]
  upd --> note

  classDef planned fill:#F3F4F6,stroke:#6B7280,color:#1F2937,stroke-dasharray:4 3
  class rep,tick,rev,fix,upd,note planned
```

The footer feedback form on the site (types: Helpful, Not sure, Needs fixing) is the first, simulated, version of this report.

## C. An audited action

```mermaid
sequenceDiagram
  actor Admin
  participant Panel as Admin Panel
  participant API as Raksham API
  participant Log as Audit log

  Admin->>Panel: Approve advocate
  Panel->>API: Request with session
  API->>API: Check role and permission
  alt Permitted
    API->>API: Change status
    API->>Log: Record who, what, when
    API-->>Panel: Success
  else Not permitted
    API-->>Panel: Refused
  end
```

## Proposed administrator roles

| Role | Intended scope |
| --- | --- |
| Super Admin | Manage administrators and read the audit log |
| Verification Reviewer | Decide advocate applications |
| Content Manager | Maintain the knowledge base and official resources |
| Support Agent | Handle reports and tickets |
| Finance Agent | Handle pricing rules, payments, payouts and refunds |

The final role list is an open question ([11](11-architecture-decisions.md)).
