import * as d3 from "d3";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Flex, Text } from "@mantine/core";
import { useMantineTheme } from "@mantine/core";
import { mantineShade } from "../../../../shared/components/d3/mantineShade";
import {
    formatCompactCurrency,
    formatCompactNumber,
} from "../../../../shared/utils/helpers/formatCompactNumber.helper";

const margin = { top: 12, right: 12, bottom: 36, left: 48 };

function formatShortDate(dateStr) {
    if (!dateStr) return "";
    const d = new Date(`${String(dateStr).slice(0, 10)}T12:00:00.000Z`);
    if (Number.isNaN(d.getTime())) return String(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}

function pickTickIndices(len) {
    if (len <= 1) return len ? [0] : [];
    const count = Math.min(8, len);
    const step = (len - 1) / (count - 1);
    const indices = [];
    for (let i = 0; i < count; i += 1) {
        indices.push(Math.round(i * step));
    }
    return [...new Set(indices)];
}

export default function DashboardPerformanceTrendChart({
    data = [],
    valueKey = "value",
    height = 220,
    minWidth = 280,
    formatValue = (v) => formatCompactNumber(v),
    colorToken = "teal.5",
}) {
    const theme = useMantineTheme();
    const wrapRef = useRef(null);
    const svgRef = useRef(null);
    const [width, setWidth] = useState(minWidth);

    const gridColor = mantineShade(theme, "dark.4");
    const labelColor = mantineShade(theme, "gray.4");
    const color = mantineShade(theme, colorToken);

    useLayoutEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        const ro = new ResizeObserver(() => setWidth(Math.max(minWidth, el.clientWidth || minWidth)));
        ro.observe(el);
        setWidth(Math.max(minWidth, el.clientWidth || minWidth));
        return () => ro.disconnect();
    }, [minWidth]);

    useEffect(() => {
        const svgEl = svgRef.current;
        if (!svgEl) return;

        const svg = d3.select(svgEl);
        svg.selectAll("*").remove();

        if (!data.length) {
            svg.attr("width", width).attr("height", height);
            return;
        }

        const innerW = Math.max(60, width - margin.left - margin.right);
        const innerH = Math.max(60, height - margin.top - margin.bottom);

        svg.attr("width", width).attr("height", height).attr("role", "img");

        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        const values = data.map((d) => Number(d[valueKey]) || 0);
        const yMax = Math.max(d3.max(values) ?? 1, 1);

        const x = d3
            .scaleLinear()
            .domain([0, Math.max(1, data.length - 1)])
            .range([0, innerW]);

        const y = d3
            .scaleLinear()
            .domain([0, yMax * 1.08])
            .nice()
            .range([innerH, 0]);

        g.selectAll("line.h")
            .data(y.ticks(4))
            .join("line")
            .attr("x1", 0)
            .attr("x2", innerW)
            .attr("y1", (d) => y(d))
            .attr("y2", (d) => y(d))
            .attr("stroke", gridColor)
            .attr("stroke-opacity", 0.45)
            .attr("stroke-dasharray", "4 6");

        const ya = g.append("g").call(d3.axisLeft(y).ticks(4).tickFormat((d) => formatValue(d)));
        ya.select(".domain").remove();
        ya.selectAll("text").attr("fill", labelColor).attr("font-size", 10);

        const tickIndices = pickTickIndices(data.length);
        const xa = g
            .append("g")
            .attr("transform", `translate(0,${innerH})`)
            .call(
                d3
                    .axisBottom(x)
                    .tickValues(tickIndices)
                    .tickFormat((i) => formatShortDate(data[i]?.date)),
            );
        xa.select(".domain").remove();
        xa.selectAll("text").attr("fill", labelColor).attr("font-size", 10);

        const curve = data.length < 2 ? d3.curveLinear : d3.curveMonotoneX;

        const area = d3
            .area()
            .x((_, i) => x(i))
            .y0(innerH)
            .y1((_, i) => y(values[i]))
            .curve(curve);

        g.append("path")
            .datum(values)
            .attr("fill", color)
            .attr("fill-opacity", 0.16)
            .attr("d", area);

        const line = d3
            .line()
            .x((_, i) => x(i))
            .y((_, i) => y(values[i]))
            .curve(curve);

        g.append("path")
            .datum(values)
            .attr("fill", "none")
            .attr("stroke", color)
            .attr("stroke-width", 2.5)
            .attr("d", line);
    }, [data, width, height, valueKey, color, gridColor, labelColor, formatValue]);

    if (!data.length) {
        return (
            <Flex align="center" justify="center" mih={height}>
                <Text size="sm" c="dimmed">
                    No trend data in this period.
                </Text>
            </Flex>
        );
    }

    return (
        <Box ref={wrapRef} style={{ width: "100%", minWidth }}>
            <svg ref={svgRef} style={{ display: "block", width: "100%", height }} />
        </Box>
    );
}
