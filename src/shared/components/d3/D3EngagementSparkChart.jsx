import * as d3 from "d3";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useMantineTheme } from "@mantine/core";
import { mantineShade } from "./mantineShade";

const margin = { top: 6, right: 4, bottom: 6, left: 4 };

/**
 * Minimal green area sparkline (no axes) for engagement trend cards.
 */
export default function D3EngagementSparkChart({
    data = [],
    valueKey = "value",
    height = 80,
    minWidth = 120,
    colorToken = "teal.5",
}) {
    const theme = useMantineTheme();
    const wrapRef = useRef(null);
    const svgRef = useRef(null);
    const [width, setWidth] = useState(minWidth);
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
        if (!svgEl || !data.length) return;

        const innerW = Math.max(20, width - margin.left - margin.right);
        const innerH = Math.max(20, height - margin.top - margin.bottom);

        const svg = d3.select(svgEl);
        svg.selectAll("*").remove();
        svg.attr("width", width).attr("height", height).attr("role", "img");

        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3
            .scaleLinear()
            .domain([0, Math.max(1, data.length - 1)])
            .range([0, innerW]);

        const values = data.map((d) => Number(d[valueKey]) || 0);
        const yMax = Math.max(d3.max(values) ?? 1, 1);
        const y = d3.scaleLinear().domain([0, yMax * 1.1]).range([innerH, 0]);

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
            .attr("fill-opacity", 0.18)
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
            .attr("stroke-width", 2)
            .attr("d", line);
    }, [data, width, height, valueKey, color]);

    return (
        <div ref={wrapRef} style={{ width: "100%", minWidth }}>
            <svg ref={svgRef} style={{ display: "block", width: "100%", height }} />
        </div>
    );
}
