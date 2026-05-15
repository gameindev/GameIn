/**
 * Must match criteria labels on the brand feedback form (frontend).
 * Weights for certification points per delivered sponsorship are in `creator-certification.util.ts`.
 */
export const SPONSORSHIP_FEEDBACK_CRITERIA = [
    'Communication',
    'Sponsorship Fulfillment',
    'Reliability',
    'Audience Impact',
    'Brand Fit / Content Quality',
    'Professionalism / Attitude',
] as const;

export type SponsorshipFeedbackCriterion = (typeof SPONSORSHIP_FEEDBACK_CRITERIA)[number];
