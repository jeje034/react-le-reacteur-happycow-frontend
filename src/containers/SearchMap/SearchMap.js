import "./SearchMap.scss";

import { MapContainer, TileLayer } from "react-leaflet";
import CustomMapMarker from "../../components/CustomMapMarker/CustomMapMarker";

import GetBrowserGeocoordinates from "../../functions/GetBrowserGeocoordinates";
import GetDistanceBetweenTwoPoints from "../../functions/GetDistanceBetweenTwoPoints";
import establishments from "../../assets/establishments.json";

const SearchMap = () => {
    const browserGeocoordinates = GetBrowserGeocoordinates();

    let establishmentsToDisplay = [];

    const filterEstablishmentsByDistance = () => {
        for (let i = 0; i < establishments.length; i++) {
            const establishment = establishments[i];

            if (
                GetDistanceBetweenTwoPoints(
                    browserGeocoordinates.latitude,
                    browserGeocoordinates.longitude,
                    establishment.location.lat,
                    establishment.location.lng
                ) <= 5
            ) {
                establishmentsToDisplay.push(establishment);
            }
        }
    };

    const sortEstablishmentsByDistance = () => {
        establishmentsToDisplay.sort((a, b) => {
            return (
                GetDistanceBetweenTwoPoints(
                    browserGeocoordinates.latitude,
                    browserGeocoordinates.longitude,
                    a.location.lat,
                    a.location.lng
                ) -
                GetDistanceBetweenTwoPoints(
                    browserGeocoordinates.latitude,
                    browserGeocoordinates.longitude,
                    b.location.lat,
                    b.location.lng
                )
            );
        });
    };

    filterEstablishmentsByDistance();

    sortEstablishmentsByDistance();

    establishmentsToDisplay = establishmentsToDisplay.slice(0, 10);

    return (
        <div className="search-map-container">
            <div className="search-map-left">
                {establishmentsToDisplay &&
                    establishmentsToDisplay.length > 0 &&
                    establishmentsToDisplay.map((establishment, indice) => {
                        return (
                            <div key={establishment.placeId}>
                                {establishment.name}
                            </div>
                        );
                    })}
            </div>
            <div className="search-map-right">
                <MapContainer
                    center={[
                        browserGeocoordinates.latitude,
                        browserGeocoordinates.longitude,
                    ]}
                    zoom={12}
                    scrollWheelZoom={false}
                    zoomControl={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {establishmentsToDisplay.map((establishment, indice) => {
                        return (
                            <CustomMapMarker
                                key={indice}
                                establishment={establishment}
                                withDetails={true}
                            ></CustomMapMarker>
                        );
                    })}
                </MapContainer>
            </div>
        </div>
    );
};

export default SearchMap;
