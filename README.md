# Cancellation Flow

This project implements the subscription cancellation flow for **Migrate Mate**.  
The flow is built with React/Next.js and Supabase, and uses a context-based state manager (`CancellationFlowProvider`) to avoid prop drilling.

---

## How it works

Two main paths:

- **Job Found**  
  Survey → Feedback → Visa Help → Visa Partner → Finish

- **Still Looking**  
  Deterministic 50/50 A/B:
  - **Variant A** → Survey → Reason → Confirm
  - **Variant B** → Downsell Offer → Accept → Downsell Accept (continue plan)  
    or Decline → Survey → Reason → Confirm

> Variant assignment happens once per cancellation (server-side RNG), stored in the `cancellations` table, and reused on return visits.

## Data model

- **subscriptions**
  - `status`: `active | pending_cancellation | cancelled`
  - `monthly_price`
- **cancellations**
  - `user_id`, `subscription_id`
  - `downsell_variant`, `reason`, `accepted_downsell`
- **cancellation_surveys**
  - `FOUND_THROUGH`, `ROLES_APPLIED`, `COMPANIES_EMAILED`
  - `INTERVIEWS`, `VISA_HELP`, `VISA_TYPE`, `FEEDBACK`

Row-Level Security is enabled with `auth.uid()` checks.

---

## Security

- RLS policies on all tables
- Input validation (length, numbers)
- Server-only variant assignment
- No raw HTML, CSRF/XSS safe

---

## Assumptions

1. Once cancellation flow is completed (cancelled or accepted downsell), the **Cancel Migrate Mate** button will **be shown again** for that subscription because we are using mock data we are showing the button.
2. Only one active cancellation per subscription(Currently it is not handled as the flow for existing cancellation design is not provided).
3. Downsell discount is fixed (`COMMON_DISCOUNT_AMOUNT`, currently $10).
4. Price changes apply from the next billing cycle (billing backend is responsible).
5. Copy, survey questions and options are static.(Can be made dynamic in future)
6. No analytics or notifications included, can be added later.

---

## Running locally

```bash
npm install
npm run db:setup
npm run dev

Validation

Feedback textarea: min 25 characters

“Too expensive” reason: numeric > 0

Radio groups: must select an option

User experience

Responsive modal, pixel-aligned with Figma

Step counter adapts if downsell step is added

Exit mid-survey shows confirm alert

Final screens hide the back button

Future improvements

Analytics events for flow start, downsell, completion

Internationalize copy

Stronger client-side validation with zod


---

```
