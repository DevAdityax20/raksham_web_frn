# 04 — Find and consult an advocate

**What it shows:** how a citizen finds the right lawyer from their preferences, then either starts a paid instant chat or books a lawyer. Approved advocates only; no advocate is shown until the administrator has approved them ([05](05-advocate-onboarding.md)).

> **Status: PLANNED** (owner requirement). Today the site has only a static "Human help" preview section; there is no search, chat, booking or payment.

## Preferences and filters

| Input | Meaning | Where it comes from |
| --- | --- | --- |
| **Department / area of law** and **jurisdiction** | For example criminal, family, cyber, consumer; and the state or court area | Owner requirement |
| **Location** | City or state of the advocate | Owner requirement |
| **Budget** | Maximum fee, for example per 5-minute block | Owner requirement |
| **Years of experience** | Minimum experience | Owner requirement |
| Language, rating, "available now", verified badge | Extra search filters | Proposed |

Saved preferences prefill the search; filters narrow the results.

## A. Search, choose and consult

**What it shows:** the full journey for both ways of consulting.

```mermaid
flowchart TB
  subgraph find["1. Find an advocate"]
    direction LR
    pref["Set preferences<br/>department, location,<br/>budget, experience"] --> search["Search with filters<br/>language, rating,<br/>available now"]
    search --> list["List of approved<br/>advocates"]
    list --> prof["View profile<br/>and fee"]
  end

  subgraph inst["2a. Instant chat"]
    direction LR
    pay1["Pay for time in<br/>5-minute blocks"] --> chat["Timed chat with<br/>the advocate"]
    chat --> ext["Session ends or<br/>is extended"]
  end

  subgraph book["2b. Book a lawyer"]
    direction LR
    slot["Choose a slot and<br/>describe the matter"] --> pay2["Pay the<br/>booking fee"]
    pay2 --> conf["Advocate<br/>confirms"]
    conf --> meet["Consultation at<br/>the booked time"]
  end

  after["3. Rate and give feedback"]

  find -->|"Instant chat"| inst
  find -->|"Book a lawyer"| book
  inst --> after
  book --> after

  classDef planned fill:#F3F4F6,stroke:#6B7280,color:#1F2937,stroke-dasharray:4 3
  classDef group fill:#FFFFFF,stroke:#CBD5E1,color:#334155
  class pref,search,list,prof,pay1,chat,ext,slot,pay2,conf,meet,after planned
  class find,inst,book group
```

## B. Instant paid chat

**What it shows:** how an instant chat is started, paid, timed and closed.

```mermaid
sequenceDiagram
  actor Citizen
  participant App as Citizen Web App
  participant API as Raksham API
  participant Pay as Payment gateway
  actor Advocate

  Citizen->>App: Choose Instant chat
  App->>API: Request session with advocate
  API->>Advocate: Notify request
  Advocate-->>API: Accept
  API-->>App: Show price per 5 minutes
  App->>Pay: Pay for chosen blocks
  Pay-->>API: Payment confirmed
  API-->>App: Session active, timer starts
  loop While time remains
    Citizen->>Advocate: Messages
    Advocate->>Citizen: Replies
  end
  API-->>App: One minute left, offer extension
  Citizen->>Pay: Pay another block (optional)
  API-->>App: Session ended
  API->>API: Record earning for advocate
```

## C. Session states

**What it shows:** the states a paid chat can be in.

```mermaid
stateDiagram-v2
  [*] --> Requested
  Requested --> Declined: Advocate unavailable
  Requested --> AwaitingPayment: Advocate accepts
  AwaitingPayment --> Cancelled: Payment not made in time
  AwaitingPayment --> Active: Payment confirmed
  Active --> Active: Extended by another block
  Active --> Ended: Time used up or either side ends
  Active --> Interrupted: Technical failure
  Interrupted --> Refunded: Unused time returned
  Ended --> [*]
  Declined --> [*]
  Cancelled --> [*]
  Refunded --> [*]
```

## Pricing model

| Item | Design |
| --- | --- |
| Billing unit | **5-minute block**. A longer chat is charged "accordingly": two blocks for ten minutes, and so on. |
| Price level | The owner's example is **about ₹15–20 per 5 minutes**. Whether advocates set their own fee inside a band, and the exact band, are open. |
| When it is paid | Before the chat starts (prepaid blocks), with a one-tap extension near the end (proposed). |
| Raksham's share, taxes, gateway fees, advocate payouts | **Undecided.** |
| Unused time or a technical failure | Refund policy is open; the state diagram above shows a proposed refund path. |

## Booking ("hire") a lawyer

A booking is a scheduled consultation: the citizen picks a slot, describes the matter in a few lines, pays the booking fee, and the advocate confirms. What happens after the first consultation (a longer engagement and its fee) is **outside the platform's chat billing** and is an open question; Raksham connects the two parties and does not give legal advice itself.

## Rules

- Only **approved** advocates appear in search; suspended ones are hidden immediately.
- The chat is between the two parties; the platform records **who, when and how long**, and billing. Message content handling is an open decision (see [09](09-security-privacy.md)).
- Advocates are independent professionals; the site already states Raksham is not a law firm.
- Either side can report a conversation; reports go to Support and Reports ([06](06-admin-workflow.md)).
