/**
 * Seeds 50 demo accounts: 25 creators + 25 brands with rich profile data
 * (bios, preferred games, social handles, FAQs, images, metrics).
 *
 * Run from backend/: npm run seed:dummy
 * Replace existing seed rows: npm run seed:dummy:reset
 *   (or: npm run seed:dummy -- --reset)
 * Bash/Git Bash env form: DUMMY_SEED_RESET=1 npm run seed:dummy
 *   (Do not use Windows "set VAR=1" in Git Bash — it will not export to Node.)
 *
 * Login: gamein_seed_c01@seed.local / gamein_seed_b01@seed.local
 * Password (all): GameInSeed#2026
 */
import 'reflect-metadata';
import * as bcrypt from 'bcrypt';
import type { DeepPartial } from 'typeorm';
import dataSource from '../data-source';
import { User } from '../users/user.entity';
import { UserType } from '../users/enums/user-type.enums';
import { FileType } from '../uploads/enums/file-types.enum';
import { SocialPlatform } from '../social-integration/enums/social-platform.enums';

const SEED_PASSWORD = 'GameInSeed#2026';
const USERNAME_PREFIX_CREATOR = 'gamein_seed_c';
const USERNAME_PREFIX_BRAND = 'gamein_seed_b';
const CREATOR_COUNT = 25;
const BRAND_COUNT = 25;

const GAME_CATALOG: { title: string; genre: string; publisher: string; url: string }[] = [
    { title: 'League of Legends', genre: 'MOBA', publisher: 'Riot Games', url: 'https://www.leagueoflegends.com/' },
    { title: 'Valorant', genre: 'Tactical FPS', publisher: 'Riot Games', url: 'https://playvalorant.com/' },
    { title: 'Fortnite', genre: 'Battle Royale', publisher: 'Epic Games', url: 'https://www.fortnite.com/' },
    { title: 'Counter-Strike 2', genre: 'FPS', publisher: 'Valve', url: 'https://www.counter-strike.net/' },
    { title: 'Dota 2', genre: 'MOBA', publisher: 'Valve', url: 'https://www.dota2.com/' },
    { title: 'Apex Legends', genre: 'Battle Royale', publisher: 'EA', url: 'https://www.ea.com/games/apex-legends' },
    { title: 'Minecraft', genre: 'Sandbox', publisher: 'Mojang', url: 'https://www.minecraft.net/' },
    { title: 'Roblox', genre: 'Platform', publisher: 'Roblox Corp', url: 'https://www.roblox.com/' },
    { title: 'EA SPORTS FC', genre: 'Sports', publisher: 'EA', url: 'https://www.ea.com/games/ea-sports-fc' },
    { title: 'Call of Duty: Warzone', genre: 'Battle Royale', publisher: 'Activision', url: 'https://www.callofduty.com/warzone' },
    { title: 'Overwatch 2', genre: 'Hero Shooter', publisher: 'Blizzard', url: 'https://overwatch.blizzard.com/' },
    { title: 'Rocket League', genre: 'Sports', publisher: 'Psyonix', url: 'https://www.rocketleague.com/' },
    { title: 'Genshin Impact', genre: 'ARPG', publisher: 'HoYoverse', url: 'https://genshin.hoyoverse.com/' },
    { title: 'World of Warcraft', genre: 'MMORPG', publisher: 'Blizzard', url: 'https://worldofwarcraft.blizzard.com/' },
    { title: 'Final Fantasy XIV', genre: 'MMORPG', publisher: 'Square Enix', url: 'https://finalfantasyxiv.com/' },
    { title: 'Elden Ring', genre: 'Action RPG', publisher: 'Bandai Namco', url: 'https://en.bandainamcoent.eu/elden-ring' },
    { title: 'Street Fighter 6', genre: 'Fighting', publisher: 'Capcom', url: 'https://www.streetfighter.com/6/' },
    { title: 'Tekken 8', genre: 'Fighting', publisher: 'Bandai Namco', url: 'https://tekken.com/' },
    { title: 'Hearthstone', genre: 'CCG', publisher: 'Blizzard', url: 'https://hearthstone.blizzard.com/' },
    { title: 'PUBG: Battlegrounds', genre: 'Battle Royale', publisher: 'KRAFTON', url: 'https://pubg.com/' },
];

const CREATOR_FIRST = [
    'Alex', 'Jordan', 'Sam', 'Riley', 'Casey', 'Morgan', 'Taylor', 'Quinn', 'Avery', 'Skyler',
    'Jamie', 'Reese', 'Dakota', 'Rowan', 'Sage', 'River', 'Phoenix', 'Eden', 'Blair', 'Emery',
    'Harper', 'Logan', 'Parker', 'Hayden', 'Kendall',
];
const CREATOR_LAST = [
    'Chen', 'Patel', 'Garcia', 'Nakamura', 'Okonkwo', 'Silva', 'Kowalski', 'Andersen', 'Haddad', 'Volkov',
    'Martinez', 'Okafor', 'Fernandez', 'Nguyen', 'Khan', 'Schmidt', 'Yamamoto', 'Rossi', 'Bakker', 'Larsson',
    'Novak', 'Santos', 'Murphy', 'Olsen', 'Tanaka',
];
const CREATOR_NICHES = [
    'competitive FPS & aim training',
    'MMO progression and raid guides',
    'variety speedruns & charity marathons',
    'mobile esports and handheld gaming',
    'cosplay, IRL, and convention vlogs',
    'indie discovery and early access reviews',
    'fighting game tournaments and lab work',
    'strategy and deck-building',
    'RPG lore deep dives and role-play',
    'ASMR cozy streams and chill builds',
    'music production on stream',
    'art and 3D modeling commissions',
    'sim racing and hardware tuning',
    'battle royale coaching',
    'MMO economy and crafting',
    'retro and emulation preservation',
    'horror narrative games',
    'sports titles and Ultimate Team',
    'sandbox creativity and redstone/logic',
    'VTuber tech and motion capture',
    'community tournaments organization',
    'accessibility-first gaming',
    'parent-friendly family co-op',
    'science education through games',
    'AAA story campaigns without spoilers',
];
const GENDERS = ['male', 'female', 'nonbinary', 'prefer_not'];
const COUNTRIES = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Spain', 'Brazil', 'Mexico',
    'Japan', 'South Korea', 'Australia', 'India', 'Poland', 'Sweden', 'Netherlands', 'Argentina',
];
const TIMEZONES = [
    'America/Los_Angeles', 'America/New_York', 'America/Sao_Paulo', 'Europe/London', 'Europe/Berlin',
    'Europe/Warsaw', 'Asia/Tokyo', 'Asia/Seoul', 'Australia/Sydney', 'Asia/Singapore',
];
const LANGUAGES = ['en', 'es', 'de', 'fr', 'pt', 'ja', 'ko', 'pl'];

const BRAND_NAMES = [
    'NexusForge Peripherals', 'Pulse Energy Gaming', 'Arcadia Indie Studio', 'Vanta Esports Agency',
    'PixelMint Creative', 'Stormcell Audio', 'Helix LAN Events', 'Cinder GPU Labs',
    'Northwind Merch Co', 'Tidal Hydration', 'Obsidian Keyboards', 'Lumen RGB Furniture',
    'Riftbound Mobile Games', 'Quartz Capture Cards', 'Ember Coaching Academy', 'Frostbyte Hosting',
    'Solarflare Apparel', 'Driftline Racing Sims', 'Mirage VFX House', 'Tapestry Narrative Studio',
    'Vector Anticheat', 'Horizon Charity Bundle', 'Kite VR Arcade', 'Basalt Board Games', 'Comet Cloud Saves',
];

const BRAND_HEADQUARTERS = [
    '221B Circuit Ave, Austin, TX 78701, USA',
    '88 Neon Blvd, Toronto, ON M5V 2T6, Canada',
    '14 Shoreditch High St, London E1 6JE, UK',
    '7 Alexanderplatz, 10178 Berlin, Germany',
    'Av. Paulista 1578, São Paulo SP 01310-200, Brazil',
    '2 Chome-11-1 Nagata, Kobe, Hyogo 650-0046, Japan',
    'Level 6, 120 Collins St, Melbourne VIC 3000, Australia',
    'Calle de Serrano 41, 28001 Madrid, Spain',
    '15 Rue du Faubourg Saint-Antoine, 75011 Paris, France',
    'ul. Marszałkowska 10/16, 00-590 Warsaw, Poland',
    'Söder Mälarstrand 21, 118 25 Stockholm, Sweden',
    'Keizersgracht 123, 1015 CJ Amsterdam, Netherlands',
    'Av. Corrientes 1234, C1043AAO Buenos Aires, Argentina',
    'Gangnam-daero 396, Seoul 06211, South Korea',
    'Connaught Place, New Delhi 110001, India',
    '1 Fusionopolis Way, Singapore 138632',
    'Puerto Madero, Buenos Aires C1107, Argentina',
    'Mission St 200, San Francisco, CA 94105, USA',
    'Potsdamer Platz 1, 10785 Berlin, Germany',
    'Rua Oscar Freire 379, São Paulo SP 01426-001, Brazil',
    'Queen St 120, Auckland 1010, New Zealand',
    'Złota 59, 00-120 Warsaw, Poland',
    'Gran Vía 28, 28013 Madrid, Spain',
    'Orchard Rd 218, Singapore 238851',
    'Bloor St W 100, Toronto ON M5S 2Y4, Canada',
];

const SOCIAL_PLATFORMS_ROTATION: SocialPlatform[][] = [
    [SocialPlatform.TWITCH, SocialPlatform.YOUTUBE, SocialPlatform.DISCORD],
    [SocialPlatform.YOUTUBE, SocialPlatform.X, SocialPlatform.INSTAGRAM],
    [SocialPlatform.TWITCH, SocialPlatform.TIKTOK, SocialPlatform.KICK],
    [SocialPlatform.INSTAGRAM, SocialPlatform.YOUTUBE, SocialPlatform.DISCORD, SocialPlatform.X],
    [SocialPlatform.TIKTOK, SocialPlatform.YOUTUBE, SocialPlatform.TWITCH],
];

function uploadRow(slug: string, w: number, h: number) {
    return {
        name: `${slug}.jpg`,
        path: `https://picsum.photos/seed/${encodeURIComponent(slug)}/${w}/${h}`,
        type: FileType.IMAGE,
        mime: 'image/jpeg',
        size: 204800 + (slug.length % 97) * 1024,
    };
}

function pickGames(seed: number, count: number): typeof GAME_CATALOG {
    const out: typeof GAME_CATALOG = [];
    for (let j = 0; j < count; j++) {
        out.push(GAME_CATALOG[(seed + j * 7) % GAME_CATALOG.length]);
    }
    return out;
}

function socialIntegrations(username: string, seed: number) {
    const platforms = SOCIAL_PLATFORMS_ROTATION[seed % SOCIAL_PLATFORMS_ROTATION.length];
    return platforms.map((platform, idx) => ({
        platform,
        social_id: `${username}_${platform.toLowerCase()}_${seed + idx}`,
        scope_granted: 'seed_dummy_no_oauth',
    }));
}

function creatorFaqs(username: string, niche: string) {
    const tz = TIMEZONES[username.length % TIMEZONES.length];
    return [
        {
            question: 'What is your streaming schedule?',
            answer: `I go live 4–5 days a week, usually evenings (${tz}). Follow @${username} for week-by-week updates.`,
            order: 0,
        },
        {
            question: 'What content do you focus on?',
            answer: `Primarily ${niche}. I collaborate with brands that align with fair play and community-first values.`,
            order: 1,
        },
        {
            question: 'How can brands work with you?',
            answer: 'Use GameIn sponsorship tools for briefs, or message me with campaign goals, timelines, and creative guardrails. I disclose all paid integrations.',
            order: 2,
        },
    ];
}

function brandFaqs(brand: string) {
    return [
        {
            question: 'What audiences do you target?',
            answer: `${brand} focuses on engaged PC and console players, 18–34, with strong overlap in esports and co-op communities.`,
            order: 0,
        },
        {
            question: 'What does a typical partnership include?',
            answer: 'Creative direction, asset kit, optional product seeding, performance reporting, and optional tournament or stream integrations.',
            order: 1,
        },
        {
            question: 'How should creators apply?',
            answer: 'Pitch via GameIn with past work samples, audience demographics, and preferred deliverables. We review within 5–10 business days.',
            order: 2,
        },
    ];
}

async function resetSeedUsers(): Promise<void> {
    await dataSource.query(
        `DELETE FROM users WHERE username LIKE $1 OR username LIKE $2`,
        [`${USERNAME_PREFIX_CREATOR}%`, `${USERNAME_PREFIX_BRAND}%`],
    );
}

function shouldResetSeed(): boolean {
    if (process.argv.includes('--reset')) return true;
    const v = process.env.DUMMY_SEED_RESET;
    return v === '1' || v === 'true' || v === 'yes';
}

async function seed(): Promise<void> {
    await dataSource.initialize();
    const reset = shouldResetSeed();
    if (reset) {
        console.log('Removing existing gamein_seed_* users...');
        await resetSeedUsers();
    }

    const existing = await dataSource.getRepository(User).findOne({
        where: { username: `${USERNAME_PREFIX_CREATOR}01` },
    });
    if (existing && !reset) {
        console.log(
            'Seed users already present. To replace them run: npm run seed:dummy:reset\n' +
                '  or: npm run seed:dummy -- --reset\n' +
                '  (In Git Bash use one of the above; "set DUMMY_SEED_RESET=1" does not work there.)',
        );
        await dataSource.destroy();
        return;
    }

    const passwordHash = await bcrypt.hash(SEED_PASSWORD, await bcrypt.genSalt());
    const userRepo = dataSource.getRepository(User);

    for (let i = 1; i <= CREATOR_COUNT; i++) {
        const username = `${USERNAME_PREFIX_CREATOR}${i.toString().padStart(2, '0')}`;
        const email = `${username}@seed.local`;
        const first = CREATOR_FIRST[(i - 1) % CREATOR_FIRST.length];
        const last = CREATOR_LAST[(i - 1) % CREATOR_LAST.length];
        const niche = CREATOR_NICHES[(i - 1) % CREATOR_NICHES.length];
        const y = 1990 + ((i * 3) % 12);
        const m = 1 + ((i * 5) % 12);
        const d = 1 + ((i * 7) % 28);
        const dob = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const followers = 5000 + i * 13789 + (i % 5) * 50000;
        const views = followers * 24 + i * 100000;
        const rank = ((i - 1) % 6) + 1;
        const games = pickGames(i, 4 + (i % 2));

        const user = userRepo.create({
            username,
            email,
            password: passwordHash,
            user_type: UserType.CREATOR,
            date_of_birth: dob,
            timezone: TIMEZONES[i % TIMEZONES.length],
            language: LANGUAGES[i % LANGUAGES.length],
            is_active: true,
            is_verified: true,
            is_first: false,
            creator_profile: {
                first_name: first,
                last_name: last,
                gender: GENDERS[i % GENDERS.length],
                country: COUNTRIES[i % COUNTRIES.length],
                contact: `+1-415-555-${String(1000 + i).slice(-4)}`,
                website: `https://creator.example/${username}`,
                followers,
                views,
                rank,
                profile_image: uploadRow(`${username}-p`, 512, 512),
                cover_image: uploadRow(`${username}-c`, 1600, 480),
            },
            user_bio: {
                bio: `${first} "${username}" ${last} — ${niche}. Former amateur competitor turned full-time creator. Open to long-term brand ambassadorships, tournament hosting, and co-streams. Average CCV disclosed in media kit on request.`,
                video_bio_url: 'https://www.youtube.com/watch?v=M7lc1UVf-VE',
                preferred_games: games.map((g, idx) => ({
                    game_url: g.url,
                    sort_order: idx,
                    meta_data: {
                        title: g.title,
                        genre: g.genre,
                        publisher: g.publisher,
                        platform_focus: idx % 2 === 0 ? 'PC' : 'Cross-platform',
                        hours_played_band: ['casual', 'regular', 'hardcore'][(i + idx) % 3],
                    },
                })),
            },
            social_integrations: socialIntegrations(username, i),
            faqs: creatorFaqs(username, niche),
        } as DeepPartial<User>);
        await userRepo.save(user);
    }

    for (let i = 1; i <= BRAND_COUNT; i++) {
        const username = `${USERNAME_PREFIX_BRAND}${i.toString().padStart(2, '0')}`;
        const email = `${username}@seed.local`;
        const brandName = BRAND_NAMES[(i - 1) % BRAND_NAMES.length];
        const hq = BRAND_HEADQUARTERS[(i - 1) % BRAND_HEADQUARTERS.length];
        const country = COUNTRIES[(i + 3) % COUNTRIES.length];
        const followers = 20000 + i * 42310;
        const views = followers * 18;
        const rank = ((i - 1 + 3) % 6) + 1;
        const games = pickGames(i + 50, 3 + (i % 3));

        const user = userRepo.create({
            username,
            email,
            password: passwordHash,
            user_type: UserType.BRAND,
            date_of_birth: null,
            timezone: TIMEZONES[(i + 2) % TIMEZONES.length],
            language: LANGUAGES[(i + 1) % LANGUAGES.length],
            is_active: true,
            is_verified: true,
            is_first: false,
            brand_profile: {
                brand_name: brandName,
                head_office: hq,
                contact: `+44-20-7946-${String(1000 + i).slice(-4)}`,
                website: `https://brand.example/${username}`,
                country,
                followers,
                views,
                rank,
                profile_image: uploadRow(`${username}-p`, 512, 512),
                cover_image: uploadRow(`${username}-c`, 1600, 480),
            },
            user_bio: {
                bio: `${brandName} partners with creators for authentic storytelling, limited drops, and measurable lift. We ship globally, support diverse voices, and prioritize clear briefs with room for creator-led ideas.`,
                video_bio_url: 'https://www.youtube.com/watch?v=M7lc1UVf-VE',
                preferred_games: games.map((g, idx) => ({
                    game_url: g.url,
                    sort_order: idx,
                    meta_data: {
                        title: g.title,
                        genre: g.genre,
                        campaign_fit: ['esports', 'lifestyle', 'hardware', 'mobile', 'indie'][(i + idx) % 5],
                    },
                })),
            },
            social_integrations: socialIntegrations(username, i + 100),
            faqs: brandFaqs(brandName),
        } as DeepPartial<User>);
        await userRepo.save(user);
    }

    console.log(
        `Seeded ${CREATOR_COUNT} creators and ${BRAND_COUNT} brands. Password: ${SEED_PASSWORD}`,
    );
    await dataSource.destroy();
}

seed().catch(async (err) => {
    console.error(err);
    if (dataSource.isInitialized) await dataSource.destroy();
    process.exit(1);
});
