// put this above or inside your file (near imports)
import React from "react";

export default function CustomRadar({
  keys,
  valuesObject,
  size = 300,
  levels = 5,
  max = 5,
  stroke = "#37D6A6",
  fill = "rgba(55,214,166,0.25)",
  gridColor = "#3C4044",
  labelColor = "#AAB0B6",
}) {
  const cx = size / 2;
  const cy = size / 2;
  const padding = 24; // space for labels
  const radius = Math.min(cx, cy) - padding;
  const axisCount = keys.length;
  const angleStep = (Math.PI * 2) / axisCount;

  // helper to get point coords for an angle & radius fraction
  const point = (angle, r) => ({
    x: cx + Math.cos(angle - Math.PI / 2) * r,
    y: cy + Math.sin(angle - Math.PI / 2) * r,
  });

  // build grid polygons
  const gridPolygons = new Array(levels).fill(0).map((_, li) => {
    const r = radius * ((li + 1) / levels);
    const pts = keys
      .map((_, i) => {
        const a = i * angleStep;
        const p = point(a, r);
        return `${p.x},${p.y}`;
      })
      .join(" ");
    return pts;
  });

  // build axis lines
  const axes = keys.map((k, i) => {
    const a = i * angleStep;
    const p = point(a, radius);
    return { to: p, label: k, angle: a };
  });

  // build data polygon (single series)
  const dataPts = keys
    .map((k, i) => {
      const raw = Number(valuesObject?.[k] ?? 0);
      const v = Number.isNaN(raw) ? 0 : Math.max(0, Math.min(max, raw));
      const r = (v / max) * radius;
      const a = i * angleStep;
      const p = point(a, r);
      return `${p.x},${p.y}`;
    })
    .join(" ");

  return (
    <svg width="100%" height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* grid polygons */}
      {gridPolygons.map((pts, idx) => (
        <polygon
          key={idx}
          points={pts}
          fill="none"
          stroke={gridColor}
          strokeWidth={1}
          opacity={idx === gridPolygons.length - 1 ? 0.5 : 0.25}
        />
      ))}

      {/* axes */}
      {axes.map((a, i) => (
        <g key={i}>
          <line
            x1={cx}
            y1={cy}
            x2={a.to.x}
            y2={a.to.y}
            stroke={gridColor}
            strokeWidth={1}
            opacity={0.25}
          />
          {/* labels */}
          <text
            x={a.to.x}
            y={a.to.y}
            fill={labelColor}
            fontSize={12}
            textAnchor={
              Math.abs(Math.cos(a.angle)) < 0.2
                ? "middle"
                : Math.cos(a.angle) > 0
                ? "start"
                : "end"
            }
            dominantBaseline={
              Math.sin(a.angle) > 0.2
                ? "hanging"
                : Math.sin(a.angle) < -0.2
                ? "baseline"
                : "middle"
            }
          >
            {a.label}
          </text>
        </g>
      ))}

      {/* data polygon fill */}
      <polygon points={dataPts} fill={fill} stroke={stroke} strokeWidth={2} />

      {/* data points */}
      {keys.map((k, i) => {
        const raw = Number(valuesObject?.[k] ?? 0);
        const v = Number.isNaN(raw) ? 0 : Math.max(0, Math.min(max, raw));
        const r = (v / max) * radius;
        const a = i * angleStep;
        const p = point(a, r);
        return (
          <circle
            key={k}
            cx={p.x}
            cy={p.y}
            r={3.5}
            fill={stroke}
            stroke="#fff"
            strokeWidth={1}
          />
        );
      })}

      {/* optional numeric ticks on one radial (right side) */}
      {new Array(levels).fill(0).map((_, li) => {
        const r = radius * ((li + 1) / levels);
        const p = point(0, r); // angle 0 -> top; use small offset to put numbers near center-right
        return (
          <text
            key={li}
            x={cx + r + 8}
            y={cy}
            fill={labelColor}
            fontSize={10}
            textAnchor="start"
            dominantBaseline="middle"
            transform={`translate(0, ${(li + 1 - levels) * 0})`}
          >
            {li + 1}
          </text>
        );
      })}
    </svg>
  );
}
