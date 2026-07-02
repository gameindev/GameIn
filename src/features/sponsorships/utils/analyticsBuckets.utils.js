/** Normalize API bucket arrays (snake_case from Nest; tolerate camelCase). */
export function pickCreatorBuckets(demo) {
    const c = demo?.creators;
    if (!c || typeof c !== "object") return { age_buckets: [], gender: [], countries: [] };
    return {
        age_buckets: c.age_buckets ?? c.ageBuckets ?? [],
        gender: c.gender ?? c.Gender ?? [],
        countries: c.countries ?? c.Countries ?? [],
    };
}

export function pickBrandBuckets(demo) {
    const b = demo?.brands;
    if (!b || typeof b !== "object") return { countries: [] };
    return {
        countries: b.countries ?? b.Countries ?? [],
    };
}
