export const pointsToLevels = (points) => {
    let title = ""
    let level = 0
    let description = "";
    let badge = "";

    // set title and number
    if (points < 1000) {
        level = 1;
        title = "Local Hero";
    } else if (points < 2500) {
        level = 2;
        title = "Knight";
    } else if (points < 5000) {
        level = 3;
        title = "Baron";
    } else if (points < 10000) {
        level = 4;
        title = "Lord";
    } else if (points < 20000) {
        level = 5;
        title = "Earl";
    } else if (points < 30000) {
        level = 6;
        title = "Duke";
    } else if (points < 50000) {
        level = 7;
        title = "Prince";
    } else if (points < 100000) {
        level = 8;
        title = "King";
    } else if (points < 200000) {
        level = 9;
        title = "World Leader";
    } else if (points < 250000) {
        level = 10;
        title = "Supreme Leader of the Galaxy";
    } else if (points < 1000000) {
        level = 11;
        title = "Pretty Much God";
    } else {
        level = 12;
        title = "God";
    }

    return {
        level,
        title,
        description,
        badge
    }

}