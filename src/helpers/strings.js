export const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const truncate = (str, length = 140, ending = " ...") => {
    if (str.length > length) {
        return str.substring(0, length - ending.length) + ending;
    } else {
        return str;
    }
};
