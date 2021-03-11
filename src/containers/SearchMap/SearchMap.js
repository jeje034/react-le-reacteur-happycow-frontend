import "./SearchMap.scss";

import { MapContainer, TileLayer } from "react-leaflet";
import CustomMapMarker from "../../components/CustomMapMarker/CustomMapMarker";

import GetBrowserGeocoordinates from "../../functions/GetBrowserGeocoordinates";
import GetDistanceBetweenTwoPoints from "../../functions/GetDistanceBetweenTwoPoints";
import establishments from "../../assets/establishments.json";

const SearchMap = () => {
    const browserGeocoordinates = GetBrowserGeocoordinates();

    const sortEstablishmentsByDistance = () => {
        establishments.sort((a, b) => {
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

    sortEstablishmentsByDistance();

    const establishmentToDisplay = establishments.slice(0, 5);

    return (
        <div className="search-map-container">
            <div className="search-map-left">
                <div>Resto 1</div>
                <div>Resto 2</div>
                <div>Resto 3</div>
                <div>Resto 4</div>
                <div>Resto 5</div>
                <div>Resto 6</div>
                <div>Resto 7</div>
                <div>Resto 8</div>
                <div>Resto 9</div>
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
                    {establishmentToDisplay.map((establishment, indice) => {
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
