import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

const CounterOnView = ({ value }) => {
    const ref = useRef(null);

    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { damping: 100, stiffness: 200 });
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView && value !== undefined) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            if (ref.current) {
                const isDecimal = !Number.isInteger(value);
                const decimalPlaces = isDecimal ? (value.toString().split(".")[1]?.length || 1) : 0;
                const formatted = latest.toFixed(decimalPlaces);
                ref.current.textContent = isDecimal ? `${formatted}K` : formatted;
            }
        });

        return () => unsubscribe();
    }, [springValue, value]);

    return <div className="count" ref={ref} />;
};

export default CounterOnView;
