import * as d3 from "d3";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * Donut chart with center total. `segments`: `{ name, value, color }` (color = CSS hex/rgb).
 */
export default function D3DonutChart({
    segments = [],
    size = 200,
    thickness = 24,
    centerLabel = "",
    centerSublabel = "",
    strokeColor = "#2c2e33",
    strokeWidth = 1,
    labelColor = "#c1c2c5",
    sublabelColor = "#909296",
    minWidth = 200,
    padAngle = 0.015,
}) {
    const wrapRef = useRef(null);
    const svgRef = useRef(null);
    const ttRef = useRef(null);
    const [width, setWidth] = useState(size);

    useLayoutEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        const ro = new ResizeObserver(() => {
            const w = el.clientWidth || minWidth;
            setWidth(Math.max(minWidth, Math.min(w, size + 80)));
        });
        ro.observe(el);
        setWidth(Math.max(minWidth, Math.min(el.clientWidth || minWidth, size + 80)));
        return () => ro.disconnect();
    }, [minWidth, size]);

    useEffect(() => {
        const svgEl = svgRef.current;
        const wrapEl = wrapRef.current;
        const ttEl = ttRef.current;
        if (!svgEl || !segments.length) return;

        const outer = Math.min(size, width - 16) / 2;
        const inner = Math.max(outer - thickness, outer * 0.45);

        const svg = d3.select(svgEl);
        svg.selectAll("*").remove();
        svg.attr("width", width).attr("height", size).attr("role", "img");

        const g = svg.append("g").attr("transform", `translate(${width / 2},${size / 2})`);

        const pie = d3
            .pie()
            .sort(null)
            .padAngle(segments.length > 1 ? padAngle : 0)
            .value((d) => d.value)(segments);

        const arc = d3.arc().innerRadius(inner).outerRadius(outer).cornerRadius(3);

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
            .style("z-index", "20");

        const paths = g
            .selectAll("path")
            .data(pie)
            .join("path")
            .attr("d", arc)
            .attr("fill", (d) => d.data.color)
            .attr("stroke", strokeColor)
            .attr("stroke-width", strokeWidth)
            .style("cursor", "crosshair")
            .on("mouseenter", (event, d) => {
                tip.html(`<strong>${d.data.name}</strong><br/>${d.data.value.toLocaleString()}`).style(
                    "opacity",
                    1,
                );
                const r = wrapEl.getBoundingClientRect();
                tip.style("left", `${event.clientX - r.left + 12}px`).style("top", `${event.clientY - r.top + 12}px`);
            })
            .on("mousemove", (event) => {
                const r = wrapEl.getBoundingClientRect();
                tip.style("left", `${event.clientX - r.left + 12}px`).style("top", `${event.clientY - r.top + 12}px`);
            })
            .on("mouseleave", () => tip.style("opacity", 0));

        g.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", centerSublabel ? "-0.2em" : "0.35em")
            .attr("fill", labelColor)
            .attr("font-size", centerSublabel ? 22 : 18)
            .attr("font-weight", 700)
            .text(centerLabel);

        if (centerSublabel) {
            g.append("text")
                .attr("text-anchor", "middle")
                .attr("dy", "1.35em")
                .attr("fill", sublabelColor)
                .attr("font-size", 11)
                .attr("font-weight", 500)
                .text(centerSublabel);
        }

        return () => {
            tip.style("opacity", 0);
            paths.on(null);
            svg.selectAll("*").remove();
        };
    }, [
        segments,
        width,
        size,
        thickness,
        centerLabel,
        centerSublabel,
        strokeColor,
        strokeWidth,
        labelColor,
        sublabelColor,
        padAngle,
    ]);

    return (
        <div ref={wrapRef} style={{ position: "relative", width: "100%", minWidth, display: "flex", justifyContent: "center" }}>
            <svg ref={svgRef} style={{ display: "block" }} />
            <div ref={ttRef} />
        </div>
    );
}
