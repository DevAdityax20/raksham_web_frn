# 07 — Database entity-relationship diagrams

> **Status: PROPOSED conceptual model.** No database or schema exists yet and the database technology is undecided. The model is derived from the owner's requirements and from data shapes already in the frontend (resource fields, feedback types, preferences, form fields). It is split into four small diagrams.

## A. Accounts, advocates and administrators

**What it shows:** citizens, advocates (a kind of user), their approval, and administrator roles.

```mermaid
erDiagram
  USER ||--o| USER_PREFERENCE : has
  USER ||--o| ADVOCATE_PROFILE : may_have
  ADVOCATE_PROFILE ||--o{ ADVOCATE_PRACTICE_AREA : covers
  PRACTICE_AREA ||--o{ ADVOCATE_PRACTICE_AREA : classifies
  ADVOCATE_PROFILE ||--o{ ADVOCATE_DOCUMENT : uploads
  ADVOCATE_PROFILE ||--o{ VERIFICATION_REQUEST : submits
  ADMIN_ACCOUNT ||--o{ VERIFICATION_REQUEST : reviews
  ADMIN_ACCOUNT }o--|| ROLE : assigned
  ROLE }o--o{ PERMISSION : grants

  USER {
    uuid id PK
    string name "optional, nickname allowed"
    string identifier "email or mobile"
    string password_hash "never the plain password"
    string role "citizen or advocate"
  }
  USER_PREFERENCE {
    uuid user_id PK, FK
    string language
    boolean hide_sensitive_notifications
    string department "search preference"
    string location "search preference"
    int max_budget_inr "search preference"
    int min_experience_years "search preference"
  }
  ADVOCATE_PROFILE {
    uuid id PK
    uuid user_id FK
    string enrolment_no
    string city
    string state
    int years_experience
    int fee_per_block_inr "per 5 minutes"
    string status "see state diagram in 05"
  }
  PRACTICE_AREA {
    uuid id PK
    string name "department or area of law"
  }
  ADVOCATE_PRACTICE_AREA {
    uuid advocate_id FK
    uuid practice_area_id FK
    string jurisdiction
  }
  ADVOCATE_DOCUMENT {
    uuid id PK
    uuid advocate_id FK
    string file_ref "restricted storage"
  }
  VERIFICATION_REQUEST {
    uuid id PK
    uuid advocate_id FK
    uuid reviewer_id FK
    string state
    datetime decided_at
  }
  ADMIN_ACCOUNT {
    uuid id PK
    string email
    uuid role_id FK
  }
  ROLE {
    uuid id PK
    string name
  }
  PERMISSION {
    uuid id PK
    string code
  }
```

## B. Consultations, bookings and payments

**What it shows:** a paid chat or booking between a citizen and an advocate, with its messages, payments, earnings and review.

```mermaid
erDiagram
  USER ||--o{ CONSULTATION : requests
  ADVOCATE_PROFILE ||--o{ CONSULTATION : handles
  CONSULTATION ||--o| BOOKING : may_be
  CONSULTATION ||--o{ CHAT_MESSAGE : contains
  CONSULTATION ||--o{ PAYMENT : paid_by
  CONSULTATION ||--o| ADVOCATE_EARNING : yields
  CONSULTATION ||--o| REVIEW : receives

  CONSULTATION {
    uuid id PK
    uuid citizen_id FK
    uuid advocate_id FK
    string type "instant or booked"
    string state "see state diagram in 04"
    int blocks_paid "5-minute blocks"
    datetime started_at
    datetime ended_at
  }
  BOOKING {
    uuid id PK
    uuid consultation_id FK
    datetime slot_start
    string matter_summary
    string status
  }
  CHAT_MESSAGE {
    uuid id PK
    uuid consultation_id FK
    uuid sender_id FK
    string body_protected "encrypted"
    datetime sent_at
  }
  PAYMENT {
    uuid id PK
    uuid consultation_id FK
    int amount_inr
    string status
    string gateway_ref "no card data stored"
  }
  ADVOCATE_EARNING {
    uuid id PK
    uuid advocate_id FK
    uuid consultation_id FK
    int amount_inr
    string payout_status
  }
  REVIEW {
    uuid id PK
    uuid consultation_id FK
    int rating
    string comment
  }
```

## C. Sachi and the legal knowledge base

**What it shows:** Sachi conversations and the reviewed sources they cite.

```mermaid
erDiagram
  SACHI_SESSION ||--o{ SACHI_MESSAGE : contains
  SACHI_MESSAGE ||--o{ MESSAGE_CITATION : cites
  KNOWLEDGE_SOURCE ||--o{ KNOWLEDGE_PASSAGE : split_into
  KNOWLEDGE_PASSAGE ||--o{ MESSAGE_CITATION : used_in
  KNOWLEDGE_SOURCE ||--o{ LEGAL_FORM_GUIDE : describes

  SACHI_SESSION {
    uuid id PK
    uuid user_id FK "nullable in private mode"
    string language
    string mode "normal or private"
    datetime expires_at "private sessions are deleted"
  }
  SACHI_MESSAGE {
    uuid id PK
    uuid session_id FK
    string author "user or sachi"
    string text
    datetime created_at
  }
  MESSAGE_CITATION {
    uuid message_id FK
    uuid passage_id FK
  }
  KNOWLEDGE_SOURCE {
    uuid id PK
    string title
    string kind "law, rule, scheme, procedure, form"
    string url "official link"
    date reviewed_on
  }
  KNOWLEDGE_PASSAGE {
    uuid id PK
    uuid source_id FK
    string topic
    string language
    string text
  }
  LEGAL_FORM_GUIDE {
    uuid id PK
    uuid source_id FK
    string form_name
    string department
    string steps
  }
```

Private-mode sessions have no user link and expire; their messages are deleted with them.

## D. Resources, support and accountability

**What it shows:** official resources, user reports, and the audit history of administrator actions.

```mermaid
erDiagram
  LEGAL_CATEGORY ||--o{ LEGAL_RESOURCE : groups
  RESOURCE_TYPE ||--o{ LEGAL_RESOURCE : classifies
  USER ||--o{ FEEDBACK_REPORT : sends
  USER ||--o{ SUPPORT_TICKET : opens
  USER ||--o{ NOTIFICATION : receives
  ADMIN_ACCOUNT ||--o{ AUDIT_LOG : performs

  LEGAL_CATEGORY {
    uuid id PK
    string code
    string title
  }
  RESOURCE_TYPE {
    uuid id PK
    string code
  }
  LEGAL_RESOURCE {
    uuid id PK
    uuid category_id FK
    uuid type_id FK
    string title
    string operator
    string city "nullable"
    string contact
    date last_reviewed
    boolean is_sample
  }
  FEEDBACK_REPORT {
    uuid id PK
    uuid user_id FK "nullable"
    string type "helpful, not_sure, needs_fixing"
    string message "max 500 characters"
    uuid sachi_message_id "optional"
  }
  SUPPORT_TICKET {
    uuid id PK
    uuid user_id FK
    string status
  }
  NOTIFICATION {
    uuid id PK
    uuid user_id FK
    string channel
    string safe_text "no sensitive content"
  }
  AUDIT_LOG {
    uuid id PK
    uuid admin_id FK
    string action
    string entity_type
    uuid entity_id
    datetime occurred_at
  }
```

`AUDIT_LOG` is append-only history, kept apart from editable operational records. The resource and feedback attributes come from fields already in the frontend.

## Left out on purpose

Wallet and ledger details, payouts, taxes and commission (undecided); analytics tables; evidence uploads by citizens (not part of the stated requirements). No real data is used anywhere in this package.
