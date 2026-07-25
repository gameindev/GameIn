import { RatingWidgetStyles } from "../styles/ratingWidgetStyles";

const CHART_SIZE = 240;
const CHART_CENTER = CHART_SIZE / 2;
const CHART_RADIUS = 68;
const CHART_LEVELS = 5;
const MAX_SCORE = 5;

const DEFAULT_RATINGS = [
    { key: "buildQuality", label: "BUILD QUALITY", value: 3.7 },
    { key: "style", label: "STYLE", value: 4.1 },
    { key: "satisfaction", label: "SATISF.", value: 3 },
    { key: "performance", label: "PERFORMANCE", value: 4 },
    { key: "comfort", label: "COMFORT", value: 3.2 },
    { key: "value", label: "VALUE", value: 4.4 },
];

const clampScore = (value) => {
    const numericValue = Number(value);

    if (Number.isNaN(numericValue)) return 0;

    return Math.min(MAX_SCORE, Math.max(0, numericValue));
};

const formatRating = (value) =>
    Number(value || 0).toLocaleString("en-US", {
        maximumFractionDigits: 1,
    });

const getPoint = (index, radius, total) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;

    return {
        x: CHART_CENTER + Math.cos(angle) * radius,
        y: CHART_CENTER + Math.sin(angle) * radius,
    };
};

const getPolygonPoints = (items, radiusResolver) =>
    items
        .map((item, index) => {
            const radius = radiusResolver(item, index);
            const point = getPoint(index, radius, items.length);

            return `${point.x},${point.y}`;
        })
        .join(" ");

const getLabelAnchor = (point) => {
    if (Math.abs(point.x - CHART_CENTER) < 8) return "middle";

    return point.x > CHART_CENTER ? "start" : "end";
};

const RatingWidget = ({ ratings = DEFAULT_RATINGS, activeIndex = 3, compact = false }) => {
    const sourceRatings =
        Array.isArray(ratings) && ratings.length ? ratings : DEFAULT_RATINGS;
    const normalizedRatings = sourceRatings.map((item) => ({
        ...item,
        value: clampScore(item.value),
    }));

    const averageRating =
        normalizedRatings.reduce((total, item) => total + item.value, 0) /
        normalizedRatings.length;

    const labelItems = normalizedRatings.map((item, index) => ({
        ...item,
        point: getPoint(index, CHART_RADIUS + 32, normalizedRatings.length),
    }));

    return (
        <RatingWidgetStyles className={compact ? "is-compact" : undefined}>
            <div className="rating_chart" aria-label="Creator rating radar chart">
                <svg
                    className="rating_chart_svg"
                    viewBox={`0 0 ${CHART_SIZE} ${CHART_SIZE}`}
                    role="img"
                >
                    <title>Creator rating score {formatRating(averageRating)}</title>

                    {Array.from({ length: CHART_LEVELS }).map((_, index) => {
                        const level = CHART_LEVELS - index;
                        const radius = CHART_RADIUS * (level / CHART_LEVELS);

                        return (
                            <polygon
                                key={level}
                                className={`rating_grid rating_grid_${level}`}
                                points={getPolygonPoints(normalizedRatings, () => radius)}
                            />
                        );
                    })}

                    {normalizedRatings.map((item, index) => {
                        const outerPoint = getPoint(
                            index,
                            CHART_RADIUS,
                            normalizedRatings.length,
                        );

                        return (
                            <line
                                key={item.key}
                                className="rating_axis"
                                x1={CHART_CENTER}
                                y1={CHART_CENTER}
                                x2={outerPoint.x}
                                y2={outerPoint.y}
                            />
                        );
                    })}

                    <polygon
                        className="rating_value_shadow"
                        points={getPolygonPoints(
                            normalizedRatings,
                            (item) => CHART_RADIUS * (item.value / MAX_SCORE),
                        )}
                    />
                    <polygon
                        className="rating_value"
                        points={getPolygonPoints(
                            normalizedRatings,
                            (item) => CHART_RADIUS * (item.value / MAX_SCORE),
                        )}
                    />

                    {normalizedRatings.map((item, index) => {
                        const point = getPoint(
                            index,
                            CHART_RADIUS * (item.value / MAX_SCORE),
                            normalizedRatings.length,
                        );

                        return (
                            <circle
                                key={item.key}
                                className="rating_marker"
                                cx={point.x}
                                cy={point.y}
                                r="2.6"
                            />
                        );
                    })}

                    <circle
                        className="rating_score_backdrop"
                        cx={CHART_CENTER}
                        cy={CHART_CENTER}
                        r="24"
                    />
                    <text
                        className="rating_score"
                        x={CHART_CENTER}
                        y={CHART_CENTER + 5}
                        textAnchor="middle"
                    >
                        {formatRating(averageRating)}
                    </text>

                    {labelItems.map((item) => (
                        <text
                            key={item.key}
                            className="rating_label"
                            x={item.point.x}
                            y={item.point.y}
                            textAnchor={getLabelAnchor(item.point)}
                        >
                            {item.label}
                        </text>
                    ))}
                </svg>
            </div>

            <div className="rating_pagination" aria-hidden="true">
                {normalizedRatings.map((item, index) => (
                    <span
                        key={item.key}
                        className={`rating_dot ${index <= activeIndex ? "is_active" : ""}`}
                    />
                ))}
            </div>
        </RatingWidgetStyles>
    );
};

export default RatingWidget;
