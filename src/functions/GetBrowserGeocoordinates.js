const useRealGpsCoordinates = false;

const GetBrowserGeocoordinates = () => {
    let browserCoordinates;
    let gpsCoordinatesFound = false;

    if (useRealGpsCoordinates) {
        //fonction réalisée à l'aide de https://www.pluralsight.com/guides/how-to-use-geolocation-call-in-reactjs
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                browserCoordinates = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };

                gpsCoordinatesFound = true;
                // console.log(
                //     "Gps coordinates fond:",
                //     `${position.coords.latitude}, ${position.coords.longitude}`
                // );
                //Lat, long mtp, proche de Jérôme : 43.6174848, 3.9124991999999996
            });
        } else {
            console.log("Geolocation not available");
        }
    }

    if (!gpsCoordinatesFound) {
        //Si on n'a pas de coordonnées, on prend celles de la rue de la citée, 75 004 Paris (en face de la cathédrale Notre Dame de Paris).
        browserCoordinates = {
            latitude: 48.85384469500249,
            longitude: 2.347264296359486,
        };
    }
    return browserCoordinates;
};

export default GetBrowserGeocoordinates;
