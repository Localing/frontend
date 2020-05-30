export const pointsToLevels = (points) => {
    let title = "";
    let number = 0;

    // set title and number
    if (points < 1000) {
        number = 1;
        title = "Local Hero";
    } else if (1000 <= points < 2500) {
        number = 2;
        title = "Knight";
    } else if (2500 <= points < 5000) {
        number = 3;
        title = "Baron";
    } else if (5000 <= points < 10000) {
        number = 4;
        title = "Lord";
    } else if (10000 <= points < 20000) {
        number = 5;
        title = "Earl";
    } else if (20000 <= points < 30000) {
        number = 6;
        title = "Duke";
    } else if (30000 <= points < 50000) {
        number = 7;
        title = "Prince";
    } else if (50000 <= points < 100000) {
        number = 8;
        title = "King";
    } else if (100000 <= points < 200000) {
        number = 9;
        title = "World Leader";
    } else if (200000 <= points < 250000) {
        number = 10;
        title = "Supreme Leader of the Galaxy";
    } else if (500000 <= points < 1000000) {
        number = 11;
        title = "Pretty Much God";
    } else {
        number = 12;
        title = "God";
    }

    return {
        number,
        title
    }

}