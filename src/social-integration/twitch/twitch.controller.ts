import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { TwitchService } from './providers/twitch.service';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('twitch')
export class TwitchController {

    constructor(private readonly twitchService: TwitchService) { }

    @Get('login')
    @UseGuards(AuthGuard('twitch'))
    login() {
        // Redirects to Twitch for authentication
    }


    @Get('callback')
    @UseGuards(AuthGuard('twitch'))
    callback(@Req() req: Request, @Res() res: Response) {
        // `req.user` now contains the Twitch profile and tokens.
        // You should save these to your database, linked to your app's user.
        console.log('Twitch User Profile:', (req as any).user);
        res.redirect('http://localhost:3001/profile'); // Redirect to your frontend
    }


    @Get('stats')
    async getStats(@Req() req: Request) {
        // In a real app, retrieve these from your database.
        // For this test, we will hardcode them.

        const realTwitchUserId = '1254577176'; // e.g., '12345678'
        const realTwitchAccessToken = '66tnupxg9qcqqdkz864r23vb6fgsgw';

        if (!realTwitchUserId || !realTwitchAccessToken) {
            return { error: 'Twitch account not connected or token is missing.' };
        }

        return this.twitchService.getProfileStats(
            realTwitchUserId,
            realTwitchAccessToken,
        );
    }

}
