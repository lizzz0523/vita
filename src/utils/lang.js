export const indexOf = (arr, fn) => {
    if (typeof fn !== 'function') {
        return arr.indexOf(fn);
    }

    let index = -1;

    arr.some((v, k) => {
        if (fn(v, k) === true) {
            index = k;
            return true;
        }
    });

    return index;
}