import { useEffect, useMemo, useRef, useState } from "react";
import { Group, Text, Box, Button } from "@mantine/core";
import { Link, useSearchParams } from "react-router";
import { SearchContext } from "../../../shared/context/searchContext";
import ListView from "../components/ListView";
import GridView from "../components/GridView";
import { Tableview } from "../components/TableView";
import DataView from "../components/DataView";
import VisibleRows from "../../../shared/components/VisibleRows";
import SectionHeader from "../../../shared/components/SectionHeader";
import useApi from "../../../shared/hooks/useApi";
import { SEARCH_ENDPOINTS } from "../api/searchEndpoints";
import { useAppSelector } from "../../../app/store/hooks";
import { currentUser } from "../../auth/store/selector";
import routePaths from "../../../app/router/routes";
import NewsCard from "../../../shared/components/NewsCard";
import { SearchStyles } from "../styles/searchStyle";
import { IconSearch } from "@tabler/icons-react";

const viewMap = {
    list: ListView,
    grid: GridView,
    table: Tableview,
};

export default function SearchAll() {
    const { get } = useApi();
    const user = useAppSelector(currentUser);
    const [view, setView] = useState("list");
    const [loading, setLoading] = useState(false);
    const [creators, setCreators] = useState([]);
    const [brands, setBrands] = useState([]);
    const [searchParams] = useSearchParams();
    const q = (searchParams.get("q") || "").toLowerCase();

    useEffect(() => {
        let mounted = true;
        async function run() {
            try {
                setLoading(true);
                const common = { keyword: "", country: "", page: 1, limit: 4 };

                const [cRes, bRes] = await Promise.all([
                    get({
                        url: SEARCH_ENDPOINTS.SEARCH_USERS,
                        params: { ...common, user_type: "CREATOR" },
                    }),
                    get({
                        url: SEARCH_ENDPOINTS.SEARCH_USERS,
                        params: { ...common, user_type: "BRAND" },
                    }),
                ]);

                if (!mounted) return;

                setCreators(cRes?.data?.results || []);
                setBrands(bRes?.data?.results || []);
            } catch {
                if (!mounted) return;
                setCreators([]);
                setBrands([]);
            } finally {
                if (mounted) setLoading(false);
            }
        }
        run();
        return () => (mounted = false);
    }, [get, user?.id]);

    const ViewComponent = viewMap[view] || ListView;

    const creatorsToShow = useMemo(() => {
        const query = q.trim();
        return creators.filter((u) => {
            if (u.id === user.id) return false;
            if (!query) return true;
            return (u.username || "").toLowerCase().includes(query);
        });
    }, [creators, q, user.id]);

    const brandsToShow = useMemo(() => {
        const query = q.trim();
        return brands.filter((u) => {
            if (u.id === user.id) return false;
            if (!query) return true;
            return (u.username || "").toLowerCase().includes(query);
        });
    }, [brands, q, user.id]);

    return (
        <SearchStyles>
            <Group justify="space-between" align="center" mb="md">
                <SectionHeader icon={<IconSearch />} text="SEARCH RESULTS" />
                <Group>
                    <Button variant="grey" size="xs">
                        Filter
                    </Button>
                    <VisibleRows size="sm" />
                    <DataView size="sm" viewMode={view} setViewMode={setView} />
                </Group>
            </Group>

            {/* Tabs */}
            <Group
                className="tabGroup"
                justify="space-between"
                align="center"
                mb={32}
            >
                <Group gap="lg">
                    <Link
                        to={routePaths.SEARCH.replace(":userType", "all")}
                        style={{ textDecoration: "none" }}
                    >
                        <Text fw={600} c="teal">
                            ALL
                        </Text>
                    </Link>
                    <Link
                        to={routePaths.SEARCH.replace(":userType", "creator")}
                        style={{ textDecoration: "none" }}
                    >
                        <Text fw={500}>CREATORS</Text>
                    </Link>
                    <Link
                        to={routePaths.SEARCH.replace(":userType", "brand")}
                        style={{ textDecoration: "none" }}
                    >
                        <Text fw={500}>BRANDS</Text>
                    </Link>
                    <Link
                        to={routePaths.ACCOUNTS.NEWSFEED.ROOT}
                        style={{ textDecoration: "none" }}
                    >
                        <Text fw={500}>NEWSFEED</Text>
                    </Link>
                </Group>
            </Group>

            {/* Creators */}
            <Box my="md" mb={32}>
                <Text fw={700} mb="xs">
                    CREATORS
                </Text>

                {loading ? (
                    <Text size="sm" c="dimmed">
                        Loading...
                    </Text>
                ) : creatorsToShow.length ? (
                    <SearchContext.Provider
                        value={{ searchData: creatorsToShow, userType: "creator" }}
                    >
                        <ViewComponent />
                    </SearchContext.Provider>
                ) : (
                    <Text size="sm" c="dimmed">
                        No creators found
                    </Text>
                )}
            </Box>

            {/* Brands */}
            <Box my="md" mb={32}>
                <Text fw={700} mb="xs">
                    BRANDS
                </Text>

                {loading ? (
                    <Text size="sm" c="dimmed">
                        Loading...
                    </Text>
                ) : brandsToShow.length ? (
                    <SearchContext.Provider
                        value={{ searchData: brandsToShow, userType: "brand" }}
                    >
                        <ViewComponent />
                    </SearchContext.Provider>
                ) : (
                    <Text size="sm" c="dimmed">
                        No brands found
                    </Text>
                )}
            </Box>

            {/* News Feed */}
            <Box my="md" mb={32}>
                <Text fw={700} mb="xs">
                    NEWS FEED
                </Text>
                <NewsCard title="GameIn news" date={new Date().toDateString()} />
            </Box>
        </SearchStyles>
    );
}
