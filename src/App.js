import { useEffect, useState } from "react";
import "./App.css";
function App() {
    const [gpsCoordinates, setgpsCoordinates] = useState();

    useEffect(() => {
        const fetchData = () => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    setgpsCoordinates({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                    console.log(
                        `${position.coords.latitude}, ${position.coords.longitude}`
                    ); //Lat, long mtp : 43.6174848, 3.9124991999999996
                });
            } else {
                console.log("Geolocation not Available");
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>HappyCow J1</h1>
            <h2>
                {gpsCoordinates
                    ? `pour Google Map : ${gpsCoordinates.latitude}, ${gpsCoordinates.longitude}`
                    : "En chrg ou pas dispo"}
            </h2>
        </div>
    );
}
export default App;
