import { Text } from "@mantine/core";
import { Eye, UserRound } from "lucide-react";
import { ProfileStats } from "./styles";

const StatsSection = ({ stats }) => (
  <ProfileStats>
    <div className="profile_stats">
      <div className="stats_section">
        <Eye size='0.75' />
        <Text className="views" size="md" weight={500}>
          {stats.views || '11,294'}
        </Text>
        <Text className="helperText" size="xs" color="dimmed">
          Views
        </Text>
      </div>
      <div className="stats_section">
        <UserRound size='0.75' />
        <Text className="followers" size="md" weight={500}>
          {stats?.followers || '1124'}
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
          {stats?.joined || 'OCT. 23rd, 2022'}
        </Text>
      </div>
    </div>
  </ProfileStats>
);

export default StatsSection;
