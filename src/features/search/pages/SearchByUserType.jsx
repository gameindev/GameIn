import { useParams } from "react-router";
import CoverBanner from "../../../shared/components/CoverBanner";
import ListView from "../components/ListView";
import { SearchStyles } from "../styles/searchStyle";
import { SocialInfo } from "../types/socialInfoData.mapper";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useApi from "../../../shared/hooks/useApi";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { currentUser } from "../../auth/store/selector";
import { USERTYPES } from "../../../shared/enums/userTypesEnum";
import { useSearchSubmit } from "../hooks/useSearchSubmit";
import { userTypeDataMapper } from "../types/userTypeData.mapper";
import SectionHeader from "../../../shared/components/SectionHeader";
import { Button, Divider, Group, Text } from "@mantine/core";
import FormField from "../../../shared/components/FormField";
import { searchFilterFieldsMapper } from "../types/searchFilterFields.mapper";
import { SwitchButton } from "../../../shared/components/Switch";
import DataView from "../components/DataView";
import VisibleRows from "../../../shared/components/VisibleRows";
import { SearchContext } from "../../../shared/context/searchContext";
import GridView from "../components/GridView";
import { Tableview } from "../components/TableView";




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


const viewList = {
    list: <ListView SocialInfo={SocialInfo} />,
    grid: <GridView SocialInfo={SocialInfo} />,
    table: <Tableview />,
};

export default function SearchByUserType() {
    const { userType } = useParams();
    const [roleData, setRoleData] = useState({});
    const [searchData, setSearchData] = useState([]);
    const [view, setView] = useState("list");
    const { control, handleSubmit, reset } = useForm({ defaultValues });

    const { get } = useApi();
    const dispatch = useAppDispatch();
    const lastQueryRef = useRef(null);

    const user = useAppSelector(currentUser);


    useEffect(() => {
        userType?.toUpperCase() === USERTYPES.CREATOR
            ? setRoleData(userTypeDataMapper.creator)
            : setRoleData(userTypeDataMapper.brand);

        setSearchData([]);
        reset(defaultValues);
    }, [setRoleData, userType, reset]);

    // Trigger default search on page load
    useEffect(() => {
        if (userType && (userType?.toUpperCase() === USERTYPES.BRAND || userType?.toUpperCase() === USERTYPES.CREATOR)) {
            useSearchSubmit(defaultValues, userType, lastQueryRef, setSearchData, user, get);
        }
    }, [userType, user, get]);

    if (
        userType?.toUpperCase() !== USERTYPES.BRAND &&
        userType?.toUpperCase() !== USERTYPES.CREATOR
    ) {
        return;
    }

    const onSubmit = async (formData) => {        
        await useSearchSubmit(formData, userType, lastQueryRef, setSearchData, user, get);
    }

    return (
        <SearchStyles>
            <SectionHeader icon={roleData?.icon} text={roleData?.name} />
            <CoverBanner coverImage={roleData.coverImage} size="auto" />

            <form onSubmit={handleSubmit(onSubmit)}>
                <Group justify="space-between">
                    <Group className="forms-fields">
                        {searchFilterFieldsMapper.map(({
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
                        ))}
                    </Group>

                    {/* <Group className="switch-buttons" justify="space-between">
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
                    </Group> */}

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
            <Divider my="sm" variant="dashed" color="#50565a" />

            {searchData?.results?.length ? (
                <SearchContext.Provider
                    value={{ searchData: searchData?.results, userType }}
                >
                    {view && viewList[view]}
                </SearchContext.Provider>
            ) : (
                <Text c="dimmed" ta="center" size="md">
                    No results found
                </Text>
            )}
        </SearchStyles>
    )
}