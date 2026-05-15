import { IsInt, IsNotEmpty, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

export class SubmitSponsorshipFeedbackDto {
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    offering_order_id: number;

    /**
     * Map of criterion label -> score 1–5 (keys must match platform criteria).
     */
    @IsObject()
    @IsNotEmpty()
    scores: Record<string, number>;
}
