# 05 — Advocate onboarding and approval

**What it shows:** how an advocate registers from the sign-up page and becomes visible to citizens only after an administrator approves them.

> **Status: PLANNED.** The Create account page already has an advocate placeholder ("Are you an advocate? Apply for verification" and a "Pending approval" pill) that does nothing yet.

## A. Registration to listing

```mermaid
flowchart TB
  subgraph a1["1. Sign up"]
    direction LR
    start(["Advocate opens<br/>Create account"]) --> role["Choose: I am<br/>an advocate"]
    role --> acct["Create the<br/>account"]
  end

  subgraph a2["2. Apply"]
    direction LR
    prof["Complete the<br/>profile"] --> docs["Upload proof<br/>documents"]
    docs --> sub["Submit for<br/>approval"]
  end

  subgraph a3["3. Review"]
    direction LR
    pend["Pending approval<br/>not visible to citizens"] --> rev{"Administrator<br/>decision"}
    rev -->|"Approved"| live["Listed in search, can receive<br/>chats and bookings"]
    rev -->|"More information"| more["Advocate adds<br/>details"]
    more --> pend
    rev -->|"Rejected"| rej["Notified with<br/>a reason"]
  end

  a1 --> a2
  a2 --> a3

  classDef planned fill:#F3F4F6,stroke:#6B7280,color:#1F2937,stroke-dasharray:4 3
  classDef group fill:#FFFFFF,stroke:#CBD5E1,color:#334155
  class start,role,acct,prof,docs,sub,pend,rev,live,more,rej planned
  class a1,a2,a3 group
```

## What the advocate provides (proposed)

| Item | Why it is needed |
| --- | --- |
| Name, contact, photo | Identity shown in the listing |
| Bar enrolment details and proof documents | Basis for approval (exact checks to be defined with legal advice) |
| Practice areas and jurisdictions | Match the citizen's department and court-area filters |
| City and languages | Match location and language filters |
| Years of experience | Experience filter |
| Fee per 5-minute chat and booking fee | Budget filter and billing |
| Availability | "Available now" and booking slots |

## B. Advocate status

```mermaid
stateDiagram-v2
  [*] --> Draft
  Draft --> Submitted: Advocate submits
  Submitted --> UnderReview: Reviewer opens it
  UnderReview --> MoreInfoNeeded: Clarification requested
  MoreInfoNeeded --> UnderReview: Advocate responds
  UnderReview --> Approved: Credentials verified
  UnderReview --> Rejected: Not verified
  Rejected --> Draft: Advocate corrects and reapplies
  Approved --> Suspended: Complaint or breach
  Suspended --> Approved: Issue resolved
  Approved --> Withdrawn: Advocate leaves
  Withdrawn --> [*]
```

## Rules

- Only the **Approved** state shows the advocate in search or lets them take consultations.
- Every status change is made by an authorized administrator on the server and is written to the audit log ([06](06-admin-workflow.md)).
- The advocate and the administrator never share the same permissions; an advocate cannot approve themselves.
- Uploaded documents are private: visible to the reviewing administrator only, kept in restricted storage.
- Approval means Raksham checked listed credentials. It is **not** an endorsement of legal outcomes.
