import "./SearchMap.scss";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import CustomMapMarker from "../../components/CustomMapMarker/CustomMapMarker";

import GetBrowserGeocoordinates from "../../functions/GetBrowserGeocoordinates";
import GetDistanceBetweenTwoPoints from "../../functions/GetDistanceBetweenTwoPoints";
import establishments from "../../assets/establishments.json";

const SearchMap = () => {
    const [establishmentsToDisplay, setEstablishmentsToDisplay] = useState([]);
    const [browserGeocoordinates, setbrowserGeocoordinates] = useState(null);

    useEffect(() => {
        const localBrowserGeocoordinates = GetBrowserGeocoordinates();
        setbrowserGeocoordinates(localBrowserGeocoordinates);

        let establishmentsToDisplayLater = [];

        const filterEstablishmentsByDistance = () => {
            for (let i = 0; i < establishments.length; i++) {
                const establishment = establishments[i];

                if (
                    GetDistanceBetweenTwoPoints(
                        localBrowserGeocoordinates.latitude,
                        localBrowserGeocoordinates.longitude,
                        establishment.location.lat,
                        establishment.location.lng
                    ) <= 5
                ) {
                    establishment["selected"] = false;
                    establishmentsToDisplayLater.push(establishment);
                }
            }
        };

        const sortEstablishmentsByDistance = () => {
            establishmentsToDisplayLater.sort((a, b) => {
                return (
                    GetDistanceBetweenTwoPoints(
                        localBrowserGeocoordinates.latitude,
                        localBrowserGeocoordinates.longitude,
                        a.location.lat,
                        a.location.lng
                    ) -
                    GetDistanceBetweenTwoPoints(
                        localBrowserGeocoordinates.latitude,
                        localBrowserGeocoordinates.longitude,
                        b.location.lat,
                        b.location.lng
                    )
                );
            });
        };

        filterEstablishmentsByDistance();

        sortEstablishmentsByDistance();

        establishmentsToDisplayLater = establishmentsToDisplayLater.slice(
            0,
            15
        );

        setEstablishmentsToDisplay(establishmentsToDisplayLater);
    }, []);

    const onVenueEnter = (establishment, indice) => {
        const newEstablishmentsToDisplay = [...establishmentsToDisplay];
        establishmentsToDisplay[indice].selected = true;
        setEstablishmentsToDisplay(newEstablishmentsToDisplay);

        // console.log(
        //     "enter " +
        //         establishment.placeId +
        //         " - " +
        //         establishment.name +
        //         " - " +
        //         indice
        // );
    };

    const onVenueLeave = (establishment, indice) => {
        const newEstablishmentsToDisplay = [...establishmentsToDisplay];
        establishmentsToDisplay[indice].selected = false;
        setEstablishmentsToDisplay(newEstablishmentsToDisplay);
        // console.log(
        //     "enter " + establishment.placeId + " - " + establishment.name
        // );
    };

    return (
        <div className="search-map-container">
            <div className="search-map-left">
                {establishmentsToDisplay &&
                    establishmentsToDisplay.length > 0 &&
                    establishmentsToDisplay.map((establishment, indice) => {
                        return (
                            <div
                                className="search-map-venue-item"
                                key={establishment.placeId}
                                onMouseEnter={() => {
                                    onVenueEnter(establishment, indice);
                                }}
                                onMouseLeave={() => {
                                    onVenueLeave(establishment, indice);
                                }}
                            >
                                <img
                                    className="search-map-venue-item-image"
                                    src={establishment.thumbnail}
                                    alt={establishment.name}
                                />
                                {establishment.name}
                            </div>
                        );
                    })}
            </div>
            <div className="search-map-right">
                {browserGeocoordinates && (
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
                        {establishmentsToDisplay.map(
                            (establishment, indice) => {
                                return (
                                    <CustomMapMarker
                                        key={indice}
                                        establishment={establishment}
                                        withDetails={true}
                                    ></CustomMapMarker>
                                );
                            }
                        )}
                    </MapContainer>
                )}
            </div>
        </div>
    );
};

export default SearchMap;
