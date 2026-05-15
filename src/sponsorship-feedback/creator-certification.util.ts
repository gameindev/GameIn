import {
    SPONSORSHIP_FEEDBACK_CRITERIA,
    type SponsorshipFeedbackCriterion,
} from './sponsorship-feedback.constants';

/** Max points per criterion for one completed sponsorship (total max = 60). */
export const CRITERION_MAX_POINTS: Record<SponsorshipFeedbackCriterion, number> = {
    Communication: 10,
    'Sponsorship Fulfillment': 15,
    Reliability: 10,
    'Audience Impact': 10,
    'Brand Fit / Content Quality': 10,
    'Professionalism / Attitude': 5,
};

/**
 * Map 1–5 Likert to points for one criterion: 1 → 0, 5 → max (linear).
 */
export function likertToWeightedPoints(score: number, maxPoints: number): number {
    if (typeof score !== 'number' || Number.isNaN(score)) return 0;
    const clamped = Math.min(5, Math.max(1, score));
    return Math.round(((clamped - 1) / 4) * maxPoints * 100) / 100;
}

/**
 * Resolve score for a canonical criterion (supports legacy feedback keys).
 */
export function scoreForCanonicalCriterion(
    scores: Record<string, number | undefined>,
    criterion: SponsorshipFeedbackCriterion,
): number | undefined {
    const direct = scores[criterion];
    if (typeof direct === 'number' && !Number.isNaN(direct)) return direct;
    if (criterion === 'Brand Fit / Content Quality') {
        const legacy = scores['Creativity'];
        if (typeof legacy === 'number' && !Number.isNaN(legacy)) return legacy;
    }
    if (criterion === 'Reliability') {
        const legacy = scores['Collaboration Quality'];
        if (typeof legacy === 'number' && !Number.isNaN(legacy)) return legacy;
    }
    return undefined;
}

/** Certification points earned for a single sponsorship from stored scores JSON. */
export function certificationPointsFromScoresJson(scores: Record<string, number>): number {
    let total = 0;
    for (const c of SPONSORSHIP_FEEDBACK_CRITERIA) {
        const s = scoreForCanonicalCriterion(scores, c);
        if (typeof s !== 'number') continue;
        total += likertToWeightedPoints(s, CRITERION_MAX_POINTS[c]);
    }
    return Math.round(total * 100) / 100;
}

export function aggregateCanonicalCriterionAverages(
    rows: { scores: Record<string, number> }[],
): Record<SponsorshipFeedbackCriterion, number> {
    const byCriterion = {} as Record<SponsorshipFeedbackCriterion, number>;
    for (const criterion of SPONSORSHIP_FEEDBACK_CRITERIA) {
        let sum = 0;
        let n = 0;
        for (const r of rows) {
            const v = scoreForCanonicalCriterion(r.scores, criterion);
            if (typeof v === 'number' && !Number.isNaN(v)) {
                sum += v;
                n += 1;
            }
        }
        byCriterion[criterion] = n > 0 ? Math.round((sum / n) * 10) / 10 : 0;
    }
    return byCriterion;
}

/**
 * Certification tier (1–6) from GameIn spec: points + delivered deals + criterion gates.
 * Uses highest tier whose minimum thresholds are all satisfied (checked from 6 down to 2).
 */
export function computeCertificationLevel(
    totalPoints: number,
    deliveredDeals: number,
    byCanonicalCriterionAvg: Record<SponsorshipFeedbackCriterion, number>,
): number {
    const f = byCanonicalCriterionAvg['Sponsorship Fulfillment'] ?? 0;
    const rel = byCanonicalCriterionAvg['Reliability'] ?? 0;
    const aud = byCanonicalCriterionAvg['Audience Impact'] ?? 0;
    const bf = byCanonicalCriterionAvg['Brand Fit / Content Quality'] ?? 0;

    const minAvg = Math.min(
        ...SPONSORSHIP_FEEDBACK_CRITERIA.map((k) => byCanonicalCriterionAvg[k] ?? 0),
    );

    if (totalPoints >= 390 && deliveredDeals >= 10 && minAvg >= 4.5) return 6;
    if (totalPoints >= 320 && deliveredDeals >= 8 && f >= 4.25 && bf >= 4.25) return 5;
    if (totalPoints >= 240 && deliveredDeals >= 5 && f >= 3.75 && aud >= 3.75) return 4;
    if (totalPoints >= 150 && deliveredDeals >= 3 && f >= 2.5 && rel >= 2.5) return 3;
    if (totalPoints >= 60 && deliveredDeals >= 1) return 2;
    return 1;
}
