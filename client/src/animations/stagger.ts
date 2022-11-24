export const variantsContainer = {
    exit: {
        opacity: 1,
        transition: {
            when: "beforeChildren",
        },
    },
    hidden: {
        opacity: 0,
        transition: {
            duration: 0.3,
        },
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            when: "beforeChildren",
        },
    },
};

export const variantsChildren = {
    exit: {
        x: -30,
        opacity: 0,
        transition: { type: "spring", duration: 0.3 },
    },
    hidden: {
        x: -30,
        opacity: 0,
        transition: { type: "spring", duration: 0.6 },
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: { type: "spring", duration: 0.6 },
    },
};