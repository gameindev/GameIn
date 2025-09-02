

export enum OfferingType{
    INDIVIDUAL = "INDIVIDUAL",
    PRIZE_POOLED = "PRIZE_POOLED"
}


export type FindOfferingsParams = {
    page?: number;            // default 1
    limit?: number;           // default 20, max 100
    user_id?: number;         // optional filter
    relations?: Array<'user' | 'offers' | 'price' | 'prices'>; // choose which to include
};