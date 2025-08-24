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

---

## Folder structure

src/components/cancellation/
CancelSubscriptionModal.tsx
JobStatusStep.tsx
constant.ts

shared/
CancellationFlowContext.tsx
flowUtils.ts
formShapes.ts
types.ts
useFormState.ts
useCancellationFlow.ts

job-found/
JobFoundFlow.tsx
SurveyEmployment.tsx
Feedback.tsx
VisaHelp.tsx
VisaPartner.tsx

still-looking/
StillLookingFlow.tsx
DownSellOffer.tsx
SurveyFeedback.tsx
CancellationReason.tsx
DownSellAccept.tsx
FinalConfirm.tsx

src/components/ui/Modal.tsx
src/services/cancellationService.ts

---

## Data model

- **subscriptions**
  - `status`: `active | pending_cancellation | cancelled`
  - `monthly_price`
- **cancellations**
  - `user_id`, `subscription_id`
  - `downsell_variant`, `reason`, `accepted_downsell`
- **cancellation_surveys**
  - Linked 1:1 with cancellations
  - Stores survey answers

Row-Level Security is enabled with `auth.uid()` checks.

---

## Security

- RLS policies on all tables
- Input validation (length, numbers)
- Server-only variant assignment
- No raw HTML, CSRF/XSS safe

---

## Assumptions

1. Once cancellation flow is completed (cancelled or accepted downsell), the **Cancel Migrate Mate** button will **not be shown again** for that subscription.
2. Only one active cancellation per subscription.
3. Downsell discount is fixed (`COMMON_DISCOUNT_AMOUNT`, currently $10).
4. Price changes apply from the next billing cycle (billing backend is responsible).
5. Users can still reactivate before the end of their billing period.
6. Copy, survey questions and options are static.
7. No analytics or notifications included, can be added later.

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

Toasts for errors and confirmations

Analytics events for flow start, downsell, completion

Internationalize copy

Stronger client-side validation with zod


---

```
