import * as d3 from "d3";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box } from "@mantine/core";
import { theme } from "../../../shared/styles/theme/customTheme";

const GEOJSON_URL = "/geo/world.geo.json";

const PRIMARY = theme.colors.primary[0];

/** Match GeoJSON feature names to our display names / ISO codes. */
function pctForFeature(featureName, countries) {
    if (!featureName || !countries?.length) return null;
    const n = featureName.toLowerCase().trim();

    for (const c of countries) {
        const dn = c.displayName.toLowerCase();
        if (n === dn || n.includes(dn) || dn.includes(n)) return c.pct;
    }

    const aliases = [
        { match: (s) => s.includes("united states"), code: "US" },
        { match: (s) => s === "united kingdom" || s.includes("great britain"), code: "GB" },
        { match: (s) => s === "germany" || s === "deutschland", code: "DE" },
        { match: (s) => s === "canada", code: "CA" },
        { match: (s) => s === "australia", code: "AU" },
        { match: (s) => s === "india", code: "IN" },
        { match: (s) => s === "argentina", code: "AR" },
        { match: (s) => s === "brazil", code: "BR" },
        { match: (s) => s === "france", code: "FR" },
    ];

    for (const { match, code } of aliases) {
        if (match(n)) {
            const hit = countries.find((c) => c.code === code);
            if (hit) return hit.pct;
        }
    }

    return null;
}

export default function DemographicsWorldMap({ countries = [], height = 200 }) {
    const wrapRef = useRef(null);
    const svgRef = useRef(null);
    const [geo, setGeo] = useState(null);
    const [width, setWidth] = useState(280);

    useEffect(() => {
        let cancelled = false;
        fetch(GEOJSON_URL)
            .then((r) => r.json())
            .then((data) => {
                if (!cancelled) setGeo(data);
            })
            .catch(() => {});
        return () => {
            cancelled = true;
        };
    }, []);

    useLayoutEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        const ro = new ResizeObserver(() => {
            setWidth(Math.max(200, el.clientWidth || 280));
        });
        ro.observe(el);
        setWidth(Math.max(200, el.clientWidth || 280));
        return () => ro.disconnect();
    }, []);

    useEffect(() => {
        const svgEl = svgRef.current;
        if (!svgEl || !geo?.features?.length) return;

        const svg = d3.select(svgEl);
        svg.selectAll("*").remove();
        svg.attr("width", width).attr("height", height).attr("role", "img");

        const maxPct = Math.max(...countries.map((c) => c.pct), 1);
        const projection = d3.geoEquirectangular().fitExtent(
            [
                [0, 0],
                [width, height],
            ],
            geo,
        );
        const path = d3.geoPath().projection(projection);

        // fitExtent vertically centers when aspect ratios differ — pin to top
        const [[, y0]] = path.bounds(geo);
        if (y0 > 0) {
            const [tx, ty] = projection.translate();
            projection.translate([tx, ty - y0]);
        }

        svg.append("g")
            .selectAll("path")
            .data(geo.features)
            .join("path")
            .attr("d", path)
            .attr("fill", (d) => {
                const pct = pctForFeature(d.properties?.name, countries);
                if (pct == null) return "rgba(255,255,255,0.05)";
                const t = 0.22 + (pct / maxPct) * 0.68;
                return d3.interpolateRgb("rgba(92,229,176,0.15)", PRIMARY)(t);
            })
            .attr("stroke", "rgba(255,255,255,0.07)")
            .attr("stroke-width", 0.5);
    }, [geo, countries, width, height]);

    return (
        <Box
            ref={wrapRef}
            h={height}
            w="100%"
            style={{ alignSelf: "flex-start" }}
        >
            <svg ref={svgRef} style={{ display: "block", width: "100%", height: "100%" }} />
        </Box>
    );
}
