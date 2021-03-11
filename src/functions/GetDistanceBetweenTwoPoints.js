const GetDistanceBetweenTwoPoints = (
    latitude1,
    longitude1,
    latitude2,
    longitude2
) => {
    if (!latitude1 || !longitude1) {
        return 0;
    }

    //https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula

    var p = 0.017453292519943295; // Math.PI / 180
    var c = Math.cos;
    var a =
        0.5 -
        c((latitude2 - latitude1) * p) / 2 +
        (c(latitude1 * p) *
            c(latitude2 * p) *
            (1 - c((longitude2 - longitude1) * p))) /
            2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
};

export default GetDistanceBetweenTwoPoints;
