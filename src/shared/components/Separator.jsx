const Separator = ({
    orientation = "vertical",
    size = "2.5em",
    thickness = "1px",
    color = "#4a5568",
    variant = "dashed",
    style,
    classes,
}) => {
    const isVertical = orientation === "vertical";

    const baseStyle = {
        width: isVertical ? thickness : size,
        height: isVertical ? size : thickness,
        alignSelf: "center",
        opacity: 0.8,
    };

    const variantStyle =
        variant === "dashed"
            ? {
                backgroundColor: "transparent",
                borderLeft: isVertical ? `${thickness} dashed ${color}` : undefined,
                borderTop: !isVertical ? `${thickness} dashed ${color}` : undefined,
            }
            : {
                backgroundColor: color,
            };

    return <span className={classes} style={{ ...baseStyle, ...variantStyle, ...style }} />;
};

export default Separator;
