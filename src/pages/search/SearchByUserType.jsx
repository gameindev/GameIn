import { useEffect, useState } from "react"
import { useParams } from "react-router"
import SectionHeader from "../../components/shared/ui/SectionHeader"
import { Flame, Search, Star } from "lucide-react"
import CreatorBanner from '../../assets/search/creator-search-cover.jpg'
import BrandBanner from '../../assets/search/brand-search-cover.jpg'
import CoverBanner from "../../components/shared/ui/CoverBanner"
import { SearchStyles } from "../../styles/pages/SearchStyles"
import { TextInput } from "@mantine/core"

const userTypeData = {
  creator:{
    name: "CREATORS",
    icon: <Star size="1.5rem" />,
    coverImage: CreatorBanner
  },
  brand:{
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
        <CoverBanner coverImage={searchData.coverImage} />
        <form>
          <TextInput
            mt="md"
            rightSection={<Search />}
            placeholder="type here"
            rightSectionPointerEvents="all"
          />
        </form>
      </SearchStyles>
  )
}
