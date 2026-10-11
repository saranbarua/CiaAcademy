import { loadStripe, Stripe } from "@stripe/stripe-js";

// Publishable key only — the secret key never leaves the backend.
// Must be issued from the SAME Stripe account as the backend's
// STRIPE_SECRET_KEY, or confirmPayment will fail with a key mismatch.
const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string | undefined;

export const stripePublishableKeyMissing = !key;

export const stripePromise: Promise<Stripe | null> = key
  ? loadStripe(key)
  : Promise.resolve(null);
