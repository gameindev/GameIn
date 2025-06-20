import { useEffect, useState } from "react"
import { useParams } from "react-router"
import SectionHeader from "../../components/shared/ui/SectionHeader"
import { Check, ChevronDown, Flame, Search, Star, X } from "lucide-react"
import CreatorBanner from '../../assets/search/creator-search-cover.jpg'
import BrandBanner from '../../assets/search/brand-search-cover.jpg'
import CoverBanner from "../../components/shared/ui/CoverBanner"
import { SearchStyles } from "../../styles/pages/SearchStyles"
import { Group, TextInput, Switch, Button, Text, Divider, } from "@mantine/core"
import DataView from "../../components/shared/ui/DataViewIcons"
import VisibleRows from "../../components/shared/ui/VisibleRows"
import Listview from "../../components/searchview/Listview"

const userTypeData = {
  creator: {
    name: "CREATORS",
    icon: <Star size="1.5rem" />,
    coverImage: CreatorBanner
  },
  brand: {
    name: "BRANDS",
    icon: <Flame size="1.5rem" />,
    coverImage: BrandBanner
  }
}

export default function SearchByUserType() {
  const { userType } = useParams()
  const [searchData, setSearchData] = useState({})

  useEffect(() => {
    userType?.toLowerCase() === "creators" ? setSearchData(userTypeData.creator) : setSearchData(userTypeData.brand)
  }, [setSearchData, userType])


  if (userType?.toLowerCase() !== "brands" && userType?.toLowerCase() !== "creators") return;

  return (
    searchData &&
    <SearchStyles>
      <SectionHeader icon={searchData?.icon} text={searchData?.name} />
      <CoverBanner coverImage={searchData.coverImage} size="auto" />
      <form>
        <Group>
          <Group className="forms-fields">
            <TextInput
              className="input-wrapper"
              size="sm"
              variant="secondaryGrey"
              rightSection={<Search />}
              placeholder="type here"
              rightSectionPointerEvents="all"
            />
            <TextInput
              className="input-wrapper"
              size="sm"
              variant="secondaryGrey"
              component="select"
              rightSection={<ChevronDown />}
              pointer
            >
              <option value="1">type(orga,teams,...)</option>
              <option value="2">2</option>
            </TextInput>
            <TextInput
              className="input-wrapper"
              size="sm"
              variant="secondaryGrey"
              component="select"
              rightSection={<ChevronDown />}
              pointer
            >
              <option value="1">game</option>
              <option value="2">2</option>
            </TextInput>
            <TextInput
              className="input-wrapper"
              size="sm"
              variant="secondaryGrey"
              component="select"
              rightSection={<ChevronDown />}
              pointer
            >
              <option value="1">country</option>
              <option value="2">2</option>
            </TextInput>
            <TextInput
              className="input-wrapper"
              size="sm"
              variant="secondaryGrey"
              component="select"
              rightSection={<ChevronDown />}
              pointer
            >
              <option value="1">gamein partner</option>
              <option value="2">2</option>
            </TextInput>
            <TextInput
              className="input-wrapper"
              size="sm"
              variant="secondaryGrey"
              component="select"
              rightSection={<ChevronDown />}
              pointer
            >
              <option value="1">followers</option>
              <option value="2">2</option>
            </TextInput>
            <TextInput
              className="input-wrapper"
              size="sm"
              variant="secondaryGrey"
              component="select"
              rightSection={<ChevronDown />}
              pointer
            >
              <option value="1">level</option>
              <option value="2">2</option>
            </TextInput>
            <TextInput
              className="input-wrapper"
              size="sm"
              variant="secondaryGrey"
              component="select"
              rightSection={<ChevronDown />}
              pointer
            >
              <option value="1">sort by</option>
              <option value="2">2</option>
            </TextInput>
          </Group>
          <Group className="switch-buttons" justify="space-between">
            <Switch
              size="xl"
              labelPosition="left"
              thumbIcon={<Check />}
              withThumbIndicator={false}
              label="ai matchmaking"
            />
            <Switch
              size="xl"
              labelPosition="left"
              thumbIcon={<Check />}
              withThumbIndicator={false}
              label="ai matchmaking"
            />
          </Group>
          <Group className="pagination" justify="space-between">
            <DataView size="sm" />
            <VisibleRows size="sm" />
          </Group>
          <Group flex='0 0 100%' justify="end">
            <Button variant="primary" type="submit">Search</Button>
          </Group>
        </Group>
      </form>

      <Text>RESULTS</Text>
      <Divider my="sm" variant="dashed" color="white" />
      <Listview />

    </SearchStyles>
  )
}
