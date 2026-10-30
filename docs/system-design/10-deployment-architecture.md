# 10 — Deployment architecture

## What is verified

- Both frontends build to static files with `npm run build` (Vite output in `dist/`).
- The Citizen Web App uses client-side routes (`/auth/sign-in`, `/auth/create-account`), so its host **must rewrite unknown paths to `index.html`**, otherwise refreshing those pages returns 404.
- Configuration is by `VITE_` variables (`VITE_API_BASE_URL`, `VITE_QUICK_EXIT_URL`); they are public values baked into the build.
- A live production site of the Citizen Web App exists, but **no deployment configuration is in the repository** and its host is not recorded.
- No backend, database, storage, AI, speech or payment service is deployed, because none exists.

## Proposed deployment (not confirmed)

> **Status: PROPOSED.** Vendors are deliberately not named; choosing them is an open decision.

```mermaid
flowchart TB
  user(["Browser"])

  subgraph edge["Static hosting"]
    web["Citizen Web App<br/>static build"]:::impl
    panel["Admin Panel<br/>static build"]:::scaffold
  end

  subgraph app["Application hosting"]
    api["Raksham API"]:::planned
    rt["Real-time chat service"]:::planned
  end

  subgraph store["Managed data services"]
    db[("Primary database")]:::planned
    idx[("Knowledge index")]:::planned
    files[("Restricted file storage")]:::planned
  end

  subgraph third["Third-party services"]
    ai["AI language model"]:::planned
    speech["Speech services"]:::planned
    pay["Payment gateway"]:::planned
    msg["SMS and email"]:::planned
  end

  logs["Logging and monitoring"]:::planned

  user --> web
  user --> panel
  web --> api
  web --> rt
  panel --> api
  api --> db
  api --> idx
  api --> files
  api --> ai
  api --> speech
  api --> pay
  api --> msg
  pay -.->|"payment confirmation"| api
  api -.-> logs

  classDef impl fill:#E6F4EA,stroke:#1B7F4B,color:#0B3D24
  classDef scaffold fill:#FFF4D6,stroke:#B58100,color:#4A3500
  classDef planned fill:#F3F4F6,stroke:#6B7280,color:#1F2937,stroke-dasharray:4 3
  classDef group fill:#FFFFFF,stroke:#CBD5E1,color:#334155
  class edge,app,store,third group
```

**Legend:** green = built (host unrecorded), amber = scaffolded, grey dashed = proposed.

## Notes

| Topic | Proposal |
| --- | --- |
| Admin separation | Admin Panel on its own address, not linked from the public site |
| Real-time chat | Needs a long-lived connection (WebSocket); can be part of the API host at first |
| Payment confirmation | The gateway calls back the API; the API trusts that call, not the browser |
| Secrets | Held by the hosting platform for the API; none in any frontend |
| Environments | Separate `VITE_API_BASE_URL` for development and production |
| Monitoring | Application logs and uptime checks; the audit log stays in the database, apart from operational logs; no message text or Sachi questions in logs |
| CI/CD | Not set up; build and lint should run on every push |
