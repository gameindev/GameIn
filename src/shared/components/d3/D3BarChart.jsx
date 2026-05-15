import * as d3 from "d3";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useMantineTheme } from "@mantine/core";
import { mantineShade } from "./mantineShade";

const defaultMarginVertical = { top: 12, right: 10, bottom: 44, left: 48 };
const defaultMarginHorizontal = { top: 10, right: 18, bottom: 36, left: 140 };

/** Default bar width (vertical) / bar height (horizontal) in px — same across all GameIn analytics bar charts. */
export const D3_DEFAULT_BAR_THICKNESS_PX = 22;

/**
 * Dark-dashboard bar chart (dotted value grid, purple-style bars, tooltips).
 * @param {'vertical'|'horizontal'} layout — vertical: categories on X; horizontal: categories on Y.
 */
export default function D3BarChart({
    data = [],
    categoryKey = "name",
    valueKey = "value",
    height = 260,
    layout = "vertical",
    barColorToken = "violet.5",
    gridColorToken = "dark.4",
    labelColorToken = "gray.4",
    valueFormat = (v) => String(v),
    margin: marginProp,
    xLabelRotate = 0,
    /** Show every Nth category label on the category axis (1 = all). */
    xTickEvery = 1,
    /**
     * When set (vertical layout), category axis shows only these indices (overrides xTickEvery).
     * Example: `[0, 13]` for first and last label only.
     */
    xTickIndices,
    /** Vertical layout: override tick label text (e.g. map slot keys to "am" / "pm"). */
    formatCategoryTick,
    /** Vertical layout: draw dashed value grid but hide the left numeric axis. */
    showValueAxis = true,
    /**
     * Axis tick label `font-size` (SVG). String (`"10px"`, `"0.75rem"`) or number as px.
     * When omitted, defaults stay layout-specific (category vs value).
     */
    labelFontSize,
    /** Fixed bar thickness in px; shrinks only if category bands are tighter than this. */
    barThicknessPx = D3_DEFAULT_BAR_THICKNESS_PX,
    minWidth = 180,
}) {
    const theme = useMantineTheme();
    const wrapRef = useRef(null);
    const svgRef = useRef(null);
    const ttRef = useRef(null);
    const [width, setWidth] = useState(minWidth);

    const barColor = mantineShade(theme, barColorToken);
    const gridColor = mantineShade(theme, gridColorToken);
    const labelColor = mantineShade(theme, labelColorToken);

    useLayoutEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        const ro = new ResizeObserver(() => {
            setWidth(Math.max(minWidth, el.clientWidth || minWidth));
        });
        ro.observe(el);
        setWidth(Math.max(minWidth, el.clientWidth || minWidth));
        return () => ro.disconnect();
    }, [minWidth]);

    useEffect(() => {
        const svgEl = svgRef.current;
        const wrapEl = wrapRef.current;
        const ttEl = ttRef.current;
        if (!svgEl || !wrapEl || !data.length) return;

        const axisFs =
            labelFontSize == null
                ? null
                : typeof labelFontSize === "number"
                  ? `${labelFontSize}px`
                  : String(labelFontSize);

        const margin =
            marginProp ??
            (layout === "vertical"
                ? showValueAxis
                    ? defaultMarginVertical
                    : { top: 8, right: 6, bottom: 30, left: 8 }
                : defaultMarginHorizontal);

        const innerW = Math.max(40, width - margin.left - margin.right);
        const innerH = Math.max(40, height - margin.top - margin.bottom);

        const svg = d3.select(svgEl);
        svg.selectAll("*").remove();
        svg.attr("width", width).attr("height", height).attr("role", "img");

        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        const tip = d3
            .select(ttEl)
            .style("position", "absolute")
            .style("pointer-events", "none")
            .style("opacity", 0)
            .style("background", "var(--mantine-color-dark-7, #1a1b1e)")
            .style("border", "1px solid var(--mantine-color-dark-4, #373a40)")
            .style("border-radius", "8px")
            .style("padding", "6px 10px")
            .style("font-size", "12px")
            .style("color", "#c1c2c5")
            .style("z-index", "20")
            .style("white-space", "pre-line");

        const showTip = (html, event) => {
            tip.html(html).style("opacity", 1);
            const rect = wrapEl.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            tip.style("left", `${Math.min(x + 12, rect.width - 120)}px`).style("top", `${y + 12}px`);
        };
        const hideTip = () => tip.style("opacity", 0);

        if (layout === "vertical") {
            const categories = data.map((d) => String(d[categoryKey]));
            const maxV = d3.max(data, (d) => Number(d[valueKey]) || 0) || 1;

            const x = d3.scaleBand().domain(categories).range([0, innerW]).padding(0.32);
            const y = d3
                .scaleLinear()
                .domain([0, maxV * 1.08])
                .nice()
                .range([innerH, 0]);

            const gridG = g.append("g");
            gridG
                .selectAll("line.h")
                .data(y.ticks(5))
                .join("line")
                .attr("class", "h")
                .attr("x1", 0)
                .attr("x2", innerW)
                .attr("y1", (d) => y(d))
                .attr("y2", (d) => y(d))
                .attr("stroke", gridColor)
                .attr("stroke-opacity", 0.45)
                .attr("stroke-dasharray", "4 6");

            const tickIndices =
                Array.isArray(xTickIndices) && xTickIndices.length > 0
                    ? xTickIndices.filter((i) => i >= 0 && i < categories.length)
                    : categories.map((_, i) => i).filter((i) => i % Math.max(1, xTickEvery) === 0);
            const tickVals = tickIndices.map((i) => categories[i]);

            const xa = g
                .append("g")
                .attr("transform", `translate(0,${innerH})`)
                .call(d3.axisBottom(x).tickValues(tickVals));
            xa.select(".domain").remove();
            xa.selectAll("text")
                .attr("fill", labelColor)
                .attr("font-size", axisFs ?? (xLabelRotate ? 9 : 11))
                .attr("transform", xLabelRotate ? `rotate(${xLabelRotate})` : null)
                .style("text-anchor", xLabelRotate ? "end" : "middle")
                .attr("dx", xLabelRotate ? "-0.35em" : "0")
                .attr("dy", xLabelRotate ? "0.55em" : "0.85em")
                .text((d) => {
                    if (formatCategoryTick) {
                        const i = categories.indexOf(String(d));
                        return formatCategoryTick(String(d), i);
                    }
                    return String(d);
                });

            if (showValueAxis) {
                const ya = g.append("g").call(d3.axisLeft(y).ticks(5).tickSizeOuter(0).tickPadding(10));
                ya.select(".domain").remove();
                ya.selectAll("text").attr("fill", labelColor).attr("font-size", axisFs ?? 10);
            }

            const bw = Math.min(barThicknessPx, x.bandwidth() * 0.92);

            g.selectAll("rect")
                .data(data)
                .join("rect")
                .attr("x", (d) => x(String(d[categoryKey])) + (x.bandwidth() - bw) / 2)
                .attr("y", (d) => y(Number(d[valueKey]) || 0))
                .attr("width", bw)
                .attr("height", (d) => innerH - y(Number(d[valueKey]) || 0))
                .attr("rx", 0)
                .attr("ry", 0)
                .attr("fill", barColor)
                .attr("opacity", 0.94)
                .style("cursor", "crosshair")
                .on("mouseenter", (event, d) => {
                    showTip(
                        `<strong>${d[categoryKey]}</strong><br/>${valueFormat(Number(d[valueKey]) || 0)}`,
                        event,
                    );
                })
                .on("mousemove", (event, d) => {
                    showTip(
                        `<strong>${d[categoryKey]}</strong><br/>${valueFormat(Number(d[valueKey]) || 0)}`,
                        event,
                    );
                })
                .on("mouseleave", hideTip);
        } else {
            const categories = data.map((d) => String(d[categoryKey]));
            const maxV = d3.max(data, (d) => Number(d[valueKey]) || 0) || 1;

            const y = d3.scaleBand().domain(categories).range([0, innerH]).padding(0.32);
            const x = d3
                .scaleLinear()
                .domain([0, maxV * 1.06])
                .nice()
                .range([0, innerW]);

            g.selectAll("line.v")
                .data(x.ticks(5))
                .join("line")
                .attr("class", "v")
                .attr("x1", (d) => x(d))
                .attr("x2", (d) => x(d))
                .attr("y1", 0)
                .attr("y2", innerH)
                .attr("stroke", gridColor)
                .attr("stroke-opacity", 0.45)
                .attr("stroke-dasharray", "4 6");

            g.append("g")
                .call(d3.axisLeft(y))
                .call((s) => s.select(".domain").remove())
                .selectAll("text")
                .attr("fill", labelColor)
                .attr("font-size", axisFs ?? 11);

            g.append("g")
                .attr("transform", `translate(0,${innerH})`)
                .call(d3.axisBottom(x).ticks(5))
                .call((s) => s.select(".domain").remove())
                .selectAll("text")
                .attr("fill", labelColor)
                .attr("font-size", axisFs ?? 10);

            const bh = Math.min(barThicknessPx, y.bandwidth() * 0.92);

            g.selectAll("rect")
                .data(data)
                .join("rect")
                .attr("y", (d) => y(String(d[categoryKey])) + (y.bandwidth() - bh) / 2)
                .attr("x", 0)
                .attr("height", bh)
                .attr("width", (d) => x(Number(d[valueKey]) || 0))
                .attr("rx", 0)
                .attr("ry", 0)
                .attr("fill", barColor)
                .attr("opacity", 0.94)
                .style("cursor", "crosshair")
                .on("mouseenter", (event, d) => {
                    showTip(
                        `<strong>${d[categoryKey]}</strong><br/>${valueFormat(Number(d[valueKey]) || 0)}`,
                        event,
                    );
                })
                .on("mousemove", (event, d) => {
                    showTip(
                        `<strong>${d[categoryKey]}</strong><br/>${valueFormat(Number(d[valueKey]) || 0)}`,
                        event,
                    );
                })
                .on("mouseleave", hideTip);
        }

        return () => {
            tip.style("opacity", 0);
            svg.selectAll("*").remove();
        };
    }, [
        data,
        width,
        height,
        layout,
        categoryKey,
        valueKey,
        barColor,
        gridColor,
        labelColor,
        marginProp,
        xLabelRotate,
        xTickEvery,
        xTickIndices,
        formatCategoryTick,
        showValueAxis,
        labelFontSize,
        barThicknessPx,
    ]);

    return (
        <div ref={wrapRef} style={{ position: "relative", width: "100%", minWidth }}>
            <svg ref={svgRef} style={{ display: "block", maxWidth: "100%" }} />
            <div ref={ttRef} />
        </div>
    );
}
