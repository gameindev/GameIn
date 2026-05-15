import * as d3 from "d3";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useMantineTheme } from "@mantine/core";
import { mantineShade } from "./mantineShade";

const defaultMargin = { top: 28, right: 16, bottom: 52, left: 56 };

/**
 * Multi-series line chart (monotone curves, dotted grid, legend) for social trends.
 */
export default function D3LineChart({
    data = [],
    xKey = "date",
    series = [
        { key: "Followers", colorToken: "teal.5" },
        { key: "Views", colorToken: "blue.5" },
        { key: "Likes", colorToken: "violet.5" },
    ],
    height = 280,
    minWidth = 260,
    gridColorToken = "dark.4",
    labelColorToken = "gray.4",
}) {
    const theme = useMantineTheme();
    const wrapRef = useRef(null);
    const svgRef = useRef(null);
    const [width, setWidth] = useState(minWidth);

    const gridColor = mantineShade(theme, gridColorToken);
    const labelColor = mantineShade(theme, labelColorToken);
    const colors = series.map((s) => mantineShade(theme, s.colorToken));

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
        if (!svgEl || !data.length) return;

        const margin = defaultMargin;
        const innerW = Math.max(60, width - margin.left - margin.right);
        const innerH = Math.max(60, height - margin.top - margin.bottom);

        const svg = d3.select(svgEl);
        svg.selectAll("*").remove();
        svg.attr("width", width).attr("height", height).attr("role", "img");

        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        const dates = data.map((d) => String(d[xKey]));
        const x = d3.scalePoint().domain(dates).range([0, innerW]).padding(0.04);

        let yMax = 1;
        for (const row of data) {
            for (const s of series) {
                const v = Number(row[s.key]) || 0;
                if (v > yMax) yMax = v;
            }
        }
        const y = d3
            .scaleLinear()
            .domain([0, yMax * 1.05])
            .nice()
            .range([innerH, 0]);

        g.selectAll("line.h")
            .data(y.ticks(5))
            .join("line")
            .attr("x1", 0)
            .attr("x2", innerW)
            .attr("y1", (d) => y(d))
            .attr("y2", (d) => y(d))
            .attr("stroke", gridColor)
            .attr("stroke-opacity", 0.45)
            .attr("stroke-dasharray", "4 6");

        const xTickEvery = Math.max(1, Math.ceil(dates.length / 8));
        const tickDates = dates.filter((_, i) => i % xTickEvery === 0 || i === dates.length - 1);

        const xa = g.append("g").attr("transform", `translate(0,${innerH})`).call(
            d3
                .axisBottom(x)
                .tickValues(tickDates)
                .tickFormat((d) => String(d).slice(5)),
        );
        xa.select(".domain").remove();
        xa.selectAll("text")
            .attr("fill", labelColor)
            .attr("font-size", 10)
            .attr("transform", "rotate(-32)")
            .style("text-anchor", "end")
            .attr("dx", "-0.4em")
            .attr("dy", "0.35em");

        const ya = g.append("g").call(d3.axisLeft(y).ticks(5));
        ya.select(".domain").remove();
        ya.selectAll("text").attr("fill", labelColor).attr("font-size", 10);

        const curve = data.length < 2 ? d3.curveLinear : d3.curveMonotoneX;

        series.forEach((s, i) => {
            const line = d3
                .line()
                .defined((d) => d[s.key] != null)
                .x((d) => x(String(d[xKey])))
                .y((d) => y(Number(d[s.key]) || 0))
                .curve(curve);

            g.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", colors[i])
                .attr("stroke-width", 2)
                .attr("d", line);
        });

        const leg = svg.append("g").attr("transform", `translate(${margin.left}, 8)`);
        series.forEach((s, i) => {
            const lx = i * 118;
            leg.append("circle").attr("cx", lx).attr("cy", 6).attr("r", 4).attr("fill", colors[i]);
            leg.append("text")
                .attr("x", lx + 10)
                .attr("y", 10)
                .attr("fill", labelColor)
                .attr("font-size", 11)
                .text(s.key);
        });

        return () => svg.selectAll("*").remove();
    }, [data, width, height, xKey, series, colors, gridColor, labelColor]);

    return (
        <div ref={wrapRef} style={{ position: "relative", width: "100%", minWidth }}>
            <svg ref={svgRef} style={{ display: "block", maxWidth: "100%" }} />
        </div>
    );
}
