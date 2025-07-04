import { useEffect, useState } from "react";
import { useParams } from "react-router";
import SectionHeader from "../../components/shared/ui/SectionHeader";
import { ChevronDown, Flame, Search, Star, X } from "lucide-react";
import CreatorBanner from "../../assets/search/creator-search-cover.jpg";
import BrandBanner from "../../assets/search/brand-search-cover.jpg";
import CoverBanner from "../../components/shared/ui/CoverBanner";
import { SearchStyles } from "../../styles/pages/SearchStyles";
import {
  Group,
  TextInput,
  Switch,
  Button,
  Text,
  Divider,
  NativeSelect,
} from "@mantine/core";
import DataView from "../../components/shared/ui/DataViewIcons";
import VisibleRows from "../../components/shared/ui/VisibleRows";
import Listview from "../../components/searchview/Listview";
import SwitchButton from "../../components/shared/ui/Switch";
import FormField from "../../components/shared/ui/FormField";
import { useForm } from "react-hook-form";
import Gridview from "../../components/searchview/Gridview";
import { theme } from "../../styles/theme/customTheme";
import {
  Gamepad2,
  Instagram,
  Music2,
  Twitch,
  Twitter,
  User,
  Youtube,
} from "lucide-react";
import Tableview from "../../components/searchview/Tableview";
import useApi from "../../hooks/useApi";
import { API_PATHS } from "../../services/endpoints";
import { USERTYPES } from "../../utils/enum";
import { SearchContext } from "../../context/SearchContext";

const userTypeData = {
  creator: {
    name: "CREATORS",
    icon: <Star size="1.5em" />,
    coverImage: CreatorBanner,
  },
  brand: {
    name: "BRANDS",
    icon: <Flame size="1.5em" />,
    coverImage: BrandBanner,
  },
};

const defaultValues = {
  search_input: "",
  teams: "",
  game: "",
  country: "",
  gamein_partner: "",
  followers: "",
  level: "",
  sortBy: "",
  ai_matchmaking: "",
  verification: "",
};

const fields = [
  {
    name: "search_input",
    className: "input-wrapper",
    variant: "secondaryGrey",
    label: "",
    placeholder: "type here",
    rightSection: <Search size="1em" />,
    component: TextInput,
    componentType: "",
  },
  {
    name: "teams",
    className: "input-wrapper",
    variant: "secondaryGrey",
    label: "",
    rightSection: <ChevronDown size="1em" />,
    component: NativeSelect,
    componentType: "",
    options: ["type(orga,teams)", "Angular", "Vue"],
  },
  {
    name: "game",
    className: "input-wrapper",
    variant: "secondaryGrey",
    label: "",
    rightSection: <ChevronDown size="1em" />,
    component: NativeSelect,
    componentType: "",
    options: ["game", "Angular", "Vue"],
  },
  {
    name: "country",
    className: "input-wrapper",
    variant: "secondaryGrey",
    label: "",
    rightSection: <ChevronDown size="1em" />,
    component: NativeSelect,
    componentType: "",
    options: ["country", "Angular", "Vue"],
  },
  {
    name: "gamein_partner",
    className: "input-wrapper",
    variant: "secondaryGrey",
    label: "",
    rightSection: <ChevronDown size="1em" />,
    component: NativeSelect,
    componentType: "",
    options: ["gamein partner", "Angular", "Vue"],
  },
  {
    name: "followers",
    className: "input-wrapper",
    variant: "secondaryGrey",
    label: "",
    rightSection: <ChevronDown size="1em" />,
    component: NativeSelect,
    componentType: "",
    options: ["followers", "Angular", "Vue"],
  },
  {
    name: "level",
    className: "input-wrapper",
    variant: "secondaryGrey",
    label: "",
    rightSection: <ChevronDown size="1em" />,
    component: NativeSelect,
    componentType: "",
    options: ["level", "Angular", "Vue"],
  },
  {
    name: "sortBy",
    className: "input-wrapper",
    variant: "secondaryGrey",
    label: "",
    rightSection: <ChevronDown size="1em" />,
    component: NativeSelect,
    componentType: "",
    options: ["sort by", "Angular", "Vue"],
  },
];

const SocialInfo = [
  {
    text: "Twitch",
    icon: <Twitch size={theme.spacing.xs} />,
    followers: "35K",
    color: "primary",
  },
  {
    text: "Instagram",
    icon: <Instagram size={theme.spacing.xs} />,
    followers: "35K",
    color: "primary",
  },
  {
    text: "Twitter",
    icon: <Twitter size={theme.spacing.xs} />,
    followers: "35K",
    color: "skyblue",
  },
  {
    text: "Youtube",
    icon: <Youtube size={theme.spacing.xs} />,
    followers: "35K",
    color: "skyblue",
  },
  {
    text: "Tiktok",
    icon: <Music2 size={theme.spacing.xs} />,
    followers: "35K",
    color: "secondary",
  },
  {
    text: "Discord",
    icon: <Gamepad2 size={theme.spacing.xs} />,
    followers: "35K",
    color: "secondary",
  },
];

const viewList = {
  list: <Listview SocialInfo={SocialInfo} />,
  grid: <Gridview SocialInfo={SocialInfo} />,
  table: <Tableview />,
};

export default function SearchByUserType() {
  const { userType } = useParams();
  const [roleData, setRoleData] = useState({});
  const [view, setView] = useState("list");
  const { control, handleSubmit } = useForm({ defaultValues });
  const [searchData, setSearchData] = useState([]);
  const { get } = useApi();

  useEffect(() => {
    userType?.toUpperCase() === USERTYPES.CREATOR
      ? setRoleData(userTypeData.creator)
      : setRoleData(userTypeData.brand);
  }, [setRoleData, userType]);

  if (userType?.toUpperCase() !== USERTYPES.BRAND && userType?.toUpperCase() !== USERTYPES.CREATOR) return;

  const onSubmit = async formData => {
    const { search_input, country } = formData;
    try {
      const { data } = await get(
        API_PATHS.SEARCH({
          keyword: search_input,
          userType: userType?.toUpperCase(),
          country,
        })
      );
      setSearchData(data);
    } catch (error) {
      return Promise.reject("Complete profile error:", error);
    }
  };

  return (
    roleData && (
      <SearchStyles>
        <SectionHeader icon={roleData?.icon} text={roleData?.name} />
        <CoverBanner coverImage={roleData.coverImage} size="auto" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Group justify="space-between">
            <Group className="forms-fields">
              {fields.map(
                ({
                  name,
                  className,
                  variant,
                  label,
                  placeholder,
                  rightSection,
                  component,
                  componentType,
                  options,
                }) => (
                  <FormField
                    key={name}
                    name={name}
                    control={control}
                    Component={component}
                    componentProps={{
                      label,
                      className,
                      variant,
                      rightSection,
                      ...(componentType && { componentType }),
                      ...(placeholder && { placeholder }),
                      ...(options && { data: options }),
                    }}
                  />
                )
              )}
            </Group>
            <Group className="switch-buttons" justify="space-between">
              <FormField
                name={defaultValues.ai_matchmaking}
                control={control}
                Component={SwitchButton}
                componentProps={{
                  name: "ai_matchmaking",
                  label: "ai matchmaking",
                }}
              />
              <FormField
                name={defaultValues.verification}
                control={control}
                Component={SwitchButton}
                componentProps={{
                  name: "verification",
                  label: "verification",
                }}
              />
            </Group>
            <Group className="pagination" justify="space-between">
              <DataView size="sm" viewMode={view} setViewMode={setView} />
              <VisibleRows size="sm" />
            </Group>
            <Group flex="0 0 100%" justify="end">
              <Button variant="primary" type="submit">
                Search
              </Button>
            </Group>
          </Group>
        </form>

        <Text>RESULTS</Text>
        <Divider my="sm" variant="dashed" color="white" />

        {searchData?.results?.length ? (
          <SearchContext.Provider value={{ searchData: searchData?.results, userType }}>
            {view && viewList[view]}
          </SearchContext.Provider>
        ) : <Text c="dimmed" ta="center" size="md">No results found</Text>}
      </SearchStyles>
    )
  );
}
