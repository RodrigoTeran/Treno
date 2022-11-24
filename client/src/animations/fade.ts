import { Variants } from "framer-motion";

export const fadeVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeInOut",
            delay: 0,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.5,
            ease: "easeInOut",
            delay: 0,
        },
    },
};


export const fadeExitVariants = (duration: number): Variants => {
    return {
        exit: {
            opacity: 0,
            transition: { type: "tween", duration, delay: 0.5 },
        },
        initial: {
            opacity: 1,
            transition: { type: "tween", duration: 1 },
        },
    }
};