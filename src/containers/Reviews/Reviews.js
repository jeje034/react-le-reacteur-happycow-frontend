import "./Reviews.scss";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import GetOpeningHoursInformations from "../../functions/GetOpeningHoursInformations";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import GetEstablishmentTypeIcon from "../../functions/GetEstablishmentTypeIcon";
import establishments from "../../assets/establishments.json";
import RatingInStars from "../../components/RatingInStars/RatingInStars";

const getBannerClasses = (establishmentType) => {
    let className = "review-title-and-more";

    if (establishmentType === "vegan") {
        className += " review-vegan-background-color";
    } else if (establishmentType === "veg-options") {
        className += " review-veg-options-background-color";
    } else if (establishmentType === "B&B") {
        className += " review-b-and-b-background-color";
    } else {
        className += " review-vegetarian-background-color";
    }
    return className;
};

const getEtablishmentTypeClasses = (establishmentType) => {
    let className = "review-establishment-type";

    if (establishmentType === "vegan") {
        className += " review-vegan-color";
    } else if (establishmentType === "veg-options") {
        className += " review-veg-options-color";
    } else if (establishmentType === "B&B") {
        className += " review-b-and-b-color";
    } else {
        className += " review-vegetarian-color";
    }
    return className;
};

const capitalize = (establishmentType) => {
    //Impossible d'utiliser la commande CSS text-transform: capitalize car elle transforme veg-options en Veg-Options au lieu de Veg-options

    if (typeof establishmentType !== "string") return "";
    return (
        establishmentType.charAt(0).toUpperCase() + establishmentType.slice(1)
    );
};

const Reviews = () => {
    const [establishment, setEstablishment] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchData = () => {
            for (let i = 0; i < establishments.length; i++) {
                const anEstablishment = establishments[i];
                // console.log(
                //     "anEstablishment.placeId:",
                //     anEstablishment.placeId
                // );

                if (anEstablishment.placeId === Number(id)) {
                    setEstablishment(anEstablishment);
                    break;
                }
            }
        };

        fetchData();
    }, [id]);

    return (
        <>
            <div className={getBannerClasses(establishment.type)}>
                <div className="review-title-and-more-for-justify">
                    <h1 className="reviews-h1">{establishment.name}</h1>
                    <div className="reviews-under-h1">
                        <div
                            className={getEtablishmentTypeClasses(
                                establishment.type
                            )}
                        >
                            <img
                                className="review-establishment-type-icon"
                                src={GetEstablishmentTypeIcon(
                                    establishment.type
                                )}
                                alt={establishment.type}
                            />
                            {capitalize(establishment.type)}
                        </div>
                        <div className="reviews-rating-in-stars">
                            <RatingInStars rating={establishment.rating} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="reviews-container">
                <div className="reviews-description-and-more">
                    {/* A gauche pour les grands écrans, en haut pour les petits. */}
                    <div className="reviews-description-and-more-left-or-top">
                        {/*msgjs21 à mettre plus tard si l'on gère les liens <div>Europe / France / Paris</div> */}
                        <div className="reviews-hours-contact-adress">
                            <div className="reviews-hours-with-icon">
                                <svg
                                    className={getOpenCloseClassColor(
                                        establishment.description
                                    )}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        style={{
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                        }}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    ></path>
                                </svg>
                                <div className="reviews-flex-column">
                                    <div
                                        className={
                                            "reviews-hours-contact-adress-first-line " +
                                            getOpenCloseClassColor(
                                                establishment.description
                                            )
                                        }
                                    >
                                        {
                                            GetOpeningHoursInformations(
                                                establishment.description
                                            ).openOrClosed
                                        }
                                    </div>
                                    <div className="reviews-font-14px-500">
                                        until 10:00pm
                                    </div>
                                    <div className="reviews-font-14px-500">
                                        18:00 - 22:00
                                    </div>
                                    {/* msgjs21 si temps faire more hours qui ouvre sur une fenêre modale
                                peut être pas mal pour montrer qu'on maitrise les fenêtres modales.*/}
                                </div>
                            </div>
                            <div className="reviews-contact-with-icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        style={{
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                        }}
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    ></path>
                                </svg>
                                <div className="reviews-flex-column">
                                    <div className="reviews-hours-contact-adress-first-line">
                                        CONTACT
                                    </div>
                                    <div className="reviews-font-14px-500">
                                        {establishment.phone}
                                    </div>
                                </div>
                            </div>

                            <div className="reviews-adress-with-icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    fill="none"
                                >
                                    <path
                                        style={{
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                        }}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    ></path>
                                    <path
                                        style={{
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                        }}
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    ></path>
                                </svg>
                                <div className="reviews-flex-column">
                                    <div className="reviews-hours-contact-adress-first-line">
                                        FIND
                                    </div>
                                    <div className="reviews-font-14px-500">
                                        {establishment.address}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="reviews-description">
                            {establishment.description}
                        </div>
                    </div>

                    {/* A droite pour les grands écrans, en bas pour les petits. */}
                    <div className="reviews-description-and-more-right-or-bottom">
                        {/* Réalisé grâce à https://react-leaflet.js.org/docs/start-installation et https://blog.logrocket.com/how-to-use-react-leaflet/
                         */}
                        {establishment.location &&
                            establishment.location.lat &&
                            establishment.location.lng && (
                                <MapContainer
                                    center={[
                                        establishment.location.lat,
                                        establishment.location.lng,
                                    ]}
                                    zoom={16}
                                    scrollWheelZoom={false}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker
                                        position={[
                                            establishment.location.lat,
                                            establishment.location.lng,
                                        ]}
                                    >
                                        <Popup>{establishment.name}</Popup>
                                    </Marker>
                                </MapContainer>
                            )}
                    </div>
                </div>
            </div>
        </>
    );
};

const getOpenCloseClassColor = (establishmentDescription) => {
    const openingHoursInformations = GetOpeningHoursInformations(
        establishmentDescription
    );

    if (openingHoursInformations.openOrClosed === "OPEN NOW") {
        return "reviews-color-open";
    } else if (openingHoursInformations.openOrClosed === "CLOSED NOW") {
        return "reviews-color-closed";
    } else {
        return "";
    }
};

export default Reviews;
