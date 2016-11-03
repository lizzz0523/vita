export const hex2Array = (color) => {
    let r = (color >> 16 & 0xff) / 255,
        g = (color >> 8 & 0xff) / 255,
        b = (color >> 0 & 0xff) / 255;

    return [r, g, b, 1.0];
}