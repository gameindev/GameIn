import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { BrandProfile } from '../brand-profile.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PatchBrandProfileDto } from '../dtos/patch-brandProfile.dto';

@Injectable()
export class UpdateBrandProfileProvider {
    constructor(
        /**
         * Injecting Brand Profile Repository
         */
        @InjectRepository(BrandProfile)
        private readonly brandProfilesRepository: Repository<BrandProfile>,
    ) { }
    

    public async updateBrandProfile(patchBrandProfileDto: PatchBrandProfileDto) {
        let brandProfile = undefined;

        try {
            brandProfile = await this.brandProfilesRepository.findOneBy({
                user: { id: patchBrandProfileDto.user_id, }
            });
        } catch (error) {
            throw new InternalServerErrorException('Error while trying to find brand profile.');
        }

        if (!brandProfile) {
            throw new BadRequestException('Brand profile not found.');
        }

        try {
            brandProfile = await this.brandProfilesRepository.save({
                ...brandProfile,
                ...patchBrandProfileDto,
            });
        } catch (error) {
            throw new InternalServerErrorException('Error while trying to update brand profile.');
        }

        return brandProfile;
    }
}
