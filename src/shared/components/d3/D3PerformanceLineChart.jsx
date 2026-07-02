import * as d3 from "d3";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useMantineTheme } from "@mantine/core";
import { mantineShade } from "./mantineShade";

const defaultMargin = { top: 16, right: 52, bottom: 48, left: 52 };

function compactUsd(v) {
    const n = Number(v) || 0;
    if (n >= 1000) return `$${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K`;
    return `$${Math.round(n)}`;
}

function exactUsd(v) {
    return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(Number(v) || 0);
}

function exactCount(v) {
    return new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(Number(v) || 0);
}

/**
 * Dual-axis performance line chart (area fills, monotone curves, dashed grid).
 * Left axis: money series; right axis: count metrics (shared scale).
 */
export default function D3PerformanceLineChart({
    data = [],
    xKey = "date",
    leftKey,
    leftColorToken = "teal.5",
    rightSeries = [],
    visibleKeys = {},
    height = 300,
    minWidth = 320,
    gridColorToken = "dark.4",
    labelColorToken = "gray.4",
    leftAxisLabel = "Revenue (USD)",
    rightAxisLabel = "Sponsorships / Engagement / Followers",
    /** Full-precision tooltip formatters (axis ticks stay compact). */
    formatLeftValue = exactUsd,
    formatRightValue = exactCount,
    leftLabel,
    formatXTick = (d) => {
        const s = String(d);
        if (/^\d+$/.test(s)) {
            const h = Number(s);
            if (h === 0) return "12am";
            if (h < 12) return `${h}am`;
            if (h === 12) return "12pm";
            return `${h - 12}pm`;
        }
        const parts = s.split("-");
        if (parts.length === 3) {
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const m = months[Number(parts[1]) - 1] ?? parts[1];
            return `${m} ${Number(parts[2])}`;
        }
        return s.slice(5);
    },
}) {
    const theme = useMantineTheme();
    const wrapRef = useRef(null);
    const svgRef = useRef(null);
    const ttRef = useRef(null);
    const [width, setWidth] = useState(minWidth);

    const leftSeriesLabel = leftLabel ?? leftKey;

    const gridColor = mantineShade(theme, gridColorToken);
    const labelColor = mantineShade(theme, labelColorToken);
    const leftColor = mantineShade(theme, leftColorToken);
    const rightColors = rightSeries.map((s) => mantineShade(theme, s.colorToken));

    const activeRight = rightSeries.filter((s) => visibleKeys[s.key] !== false);

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
        const wrapEl = wrapRef.current;
        const ttEl = ttRef.current;
        if (!svgEl || !wrapEl || !ttEl || !data.length || !leftKey) return;

        const margin = defaultMargin;
        const innerW = Math.max(80, width - margin.left - margin.right);
        const innerH = Math.max(80, height - margin.top - margin.bottom);

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
            .style("padding", "8px 12px")
            .style("font-size", "12px")
            .style("color", "#c1c2c5")
            .style("z-index", "20")
            .style("white-space", "pre-line")
            .style("line-height", "1.45");

        const showTip = (html, event) => {
            tip.html(html).style("opacity", 1);
            const rect = wrapEl.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            tip.style("left", `${Math.min(x + 14, rect.width - 160)}px`).style("top", `${Math.max(y - 8, 4)}px`);
        };
        const hideTip = () => tip.style("opacity", 0);

        const formatTooltipTitle = (row) => {
            const raw = String(row[xKey]);
            if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
            return formatXTick(raw);
        };

        const dates = data.map((d) => String(d[xKey]));
        const x = d3.scalePoint().domain(dates).range([0, innerW]).padding(0.05);

        let leftMax = 1;
        if (visibleKeys[leftKey] !== false) {
            for (const row of data) {
                const v = Number(row[leftKey]) || 0;
                if (v > leftMax) leftMax = v;
            }
        }

        let rightMax = 1;
        for (const row of data) {
            for (const s of activeRight) {
                const v = Number(row[s.key]) || 0;
                if (v > rightMax) rightMax = v;
            }
        }

        const yLeft = d3
            .scaleLinear()
            .domain([0, leftMax * 1.08])
            .nice()
            .range([innerH, 0]);

        const yRight = d3
            .scaleLinear()
            .domain([0, Math.max(rightMax, 1) * 1.08])
            .nice()
            .range([innerH, 0]);

        g.selectAll("line.h")
            .data(yLeft.ticks(5))
            .join("line")
            .attr("x1", 0)
            .attr("x2", innerW)
            .attr("y1", (d) => yLeft(d))
            .attr("y2", (d) => yLeft(d))
            .attr("stroke", gridColor)
            .attr("stroke-opacity", 0.45)
            .attr("stroke-dasharray", "4 6");

        const xTickEvery = Math.max(1, Math.ceil(dates.length / 8));
        const tickDates = dates.filter((_, i) => i % xTickEvery === 0 || i === dates.length - 1);

        const xa = g.append("g").attr("transform", `translate(0,${innerH})`).call(
            d3.axisBottom(x).tickValues(tickDates).tickFormat((d) => formatXTick(d)),
        );
        xa.select(".domain").remove();
        xa.selectAll("text").attr("fill", labelColor).attr("font-size", 10).attr("dy", "0.8em");

        if (visibleKeys[leftKey] !== false) {
            const yaL = g.append("g").call(d3.axisLeft(yLeft).ticks(5).tickFormat((d) => compactUsd(d)));
            yaL.select(".domain").remove();
            yaL.selectAll("text").attr("fill", leftColor).attr("font-size", 10);

            g.append("text")
                .attr("transform", "rotate(-90)")
                .attr("x", -innerH / 2)
                .attr("y", -42)
                .attr("text-anchor", "middle")
                .attr("fill", labelColor)
                .attr("font-size", 9)
                .text(leftAxisLabel);
        }

        if (activeRight.length > 0) {
            const yaR = g.append("g")
                .attr("transform", `translate(${innerW},0)`)
                .call(d3.axisRight(yRight).ticks(5).tickFormat((d) => String(Math.round(d))));
            yaR.select(".domain").remove();
            yaR.selectAll("text").attr("fill", labelColor).attr("font-size", 10);

            g.append("text")
                .attr("transform", "rotate(-90)")
                .attr("x", -innerH / 2)
                .attr("y", innerW + 46)
                .attr("text-anchor", "middle")
                .attr("fill", labelColor)
                .attr("font-size", 9)
                .text(rightAxisLabel);
        }

        const curve = data.length < 2 ? d3.curveLinear : d3.curveMonotoneX;

        if (visibleKeys[leftKey] !== false) {
            const areaL = d3
                .area()
                .defined((d) => d[leftKey] != null)
                .x((d) => x(String(d[xKey])))
                .y0(innerH)
                .y1((d) => yLeft(Number(d[leftKey]) || 0))
                .curve(curve);

            g.append("path")
                .datum(data)
                .attr("fill", leftColor)
                .attr("fill-opacity", 0.12)
                .attr("d", areaL);

            const lineL = d3
                .line()
                .defined((d) => d[leftKey] != null)
                .x((d) => x(String(d[xKey])))
                .y((d) => yLeft(Number(d[leftKey]) || 0))
                .curve(curve);

            g.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", leftColor)
                .attr("stroke-width", 2)
                .attr("d", lineL);
        }

        activeRight.forEach((s, i) => {
            const color = rightColors[i];
            const area = d3
                .area()
                .defined((d) => d[s.key] != null)
                .x((d) => x(String(d[xKey])))
                .y0(innerH)
                .y1((d) => yRight(Number(d[s.key]) || 0))
                .curve(curve);

            g.append("path")
                .datum(data)
                .attr("fill", color)
                .attr("fill-opacity", 0.1)
                .attr("d", area);

            const line = d3
                .line()
                .defined((d) => d[s.key] != null)
                .x((d) => x(String(d[xKey])))
                .y((d) => yRight(Number(d[s.key]) || 0))
                .curve(curve);

            g.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", color)
                .attr("stroke-width", 2)
                .attr("d", line);
        });

        const focus = g.append("g").attr("class", "focus").style("display", "none");
        focus
            .append("line")
            .attr("class", "focus-vline")
            .attr("y1", 0)
            .attr("y2", innerH)
            .attr("stroke", labelColor)
            .attr("stroke-opacity", 0.55)
            .attr("stroke-dasharray", "3 4");

        const dotG = focus.append("g").attr("class", "focus-dots");

        const nearestIndex = (mx) => {
            let idx = 0;
            let best = Infinity;
            dates.forEach((d, i) => {
                const px = x(d);
                if (px == null) return;
                const dist = Math.abs(px - mx);
                if (dist < best) {
                    best = dist;
                    idx = i;
                }
            });
            return idx;
        };

        const buildTooltipHtml = (row) => {
            const lines = [`<strong>${formatTooltipTitle(row)}</strong>`];
            if (visibleKeys[leftKey] !== false) {
                lines.push(`${leftSeriesLabel}: ${formatLeftValue(row[leftKey])}`);
            }
            for (const s of activeRight) {
                const label = s.label ?? s.key;
                lines.push(`${label}: ${formatRightValue(row[s.key])}`);
            }
            return lines.join("<br/>");
        };

        const updateFocus = (idx) => {
            const row = data[idx];
            const xPos = x(String(row[xKey]));
            if (xPos == null) return;

            focus.style("display", null);
            focus.select(".focus-vline").attr("x1", xPos).attr("x2", xPos);

            const dots = [];
            if (visibleKeys[leftKey] !== false) {
                dots.push({
                    cx: xPos,
                    cy: yLeft(Number(row[leftKey]) || 0),
                    color: leftColor,
                });
            }
            activeRight.forEach((s, i) => {
                dots.push({
                    cx: xPos,
                    cy: yRight(Number(row[s.key]) || 0),
                    color: rightColors[i],
                });
            });

            dotG
                .selectAll("circle")
                .data(dots)
                .join("circle")
                .attr("cx", (d) => d.cx)
                .attr("cy", (d) => d.cy)
                .attr("r", 4)
                .attr("fill", (d) => d.color)
                .attr("stroke", "#1a1b1e")
                .attr("stroke-width", 1.5);
        };

        g.append("rect")
            .attr("width", innerW)
            .attr("height", innerH)
            .attr("fill", "transparent")
            .style("cursor", "crosshair")
            .on("mousemove", (event) => {
                const [mx] = d3.pointer(event);
                const idx = nearestIndex(mx);
                updateFocus(idx);
                showTip(buildTooltipHtml(data[idx]), event);
            })
            .on("mouseleave", () => {
                focus.style("display", "none");
                hideTip();
            });

        return () => {
            hideTip();
            svg.selectAll("*").remove();
        };
    }, [
        data,
        width,
        height,
        xKey,
        leftKey,
        leftColor,
        leftSeriesLabel,
        rightSeries,
        activeRight,
        visibleKeys,
        rightColors,
        gridColor,
        labelColor,
        leftAxisLabel,
        rightAxisLabel,
        formatXTick,
        formatLeftValue,
        formatRightValue,
    ]);

    return (
        <div ref={wrapRef} style={{ position: "relative", width: "100%", minWidth }}>
            <svg ref={svgRef} style={{ display: "block", maxWidth: "100%" }} />
            <div ref={ttRef} />
        </div>
    );
}
