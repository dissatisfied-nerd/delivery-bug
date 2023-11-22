export const classNames = (cls, mods, additional) => {
    return [
        cls,
        ...additional.filter(Boolean),
        ...Object.keys(mods).filter((key) => mods[key]),
    ].join(" ");
};
