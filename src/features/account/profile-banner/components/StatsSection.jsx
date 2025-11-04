import { IconEye, IconUser } from "@tabler/icons-react";
import { ProfileStats } from "../styles/style";
import { Text } from "@mantine/core";


export default function StatsSection({ stats }) {
    // console.log(stats);
    return (
        <ProfileStats>
            <div className="profile_stats">
                <div className="stats_section">
                    <IconEye size="0.75em" />
                    <Text className="views" size="md" weight={500}>
                        {stats.views}
                    </Text>
                    <Text className="helperText" size="xs" color="dimmed">
                        Views
                    </Text>
                </div>
                <div className="stats_section">
                    <IconUser size="0.75em" />
                    <Text className="followers" size="md" weight={500}>
                        {stats.followers || "0"}
                    </Text>
                    <Text className="helperText" size="xs" color="dimmed">
                        Followers
                    </Text>
                </div>
                <div className="stats_section">
                    <Text className="joined" size="md" weight={600}>
                        Joined:
                    </Text>
                    <Text className="helperText" size="xs" color="dimmed">
                        {stats?.joinedOn || "OCT. 23rd, 2022"}
                    </Text>
                </div>
            </div>
        </ProfileStats>
    )
}