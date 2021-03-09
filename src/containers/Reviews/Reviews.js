import "./Reviews.scss";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer } from "react-leaflet";

import GetOpeningHoursInformations from "../../functions/GetOpeningHoursInformations";

import GetEstablishmentTypeIcon from "../../functions/GetEstablishmentTypeIcon";
import establishments from "../../assets/establishments.json";
import RatingInStars from "../../components/RatingInStars/RatingInStars";
import CustomMapMarker from "../../components/CustomMapMarker/CustomMapMarker";

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

const getSimplifiedWebsiteUrl = (website) => {
    let position = website.indexOf("//");
    let simplifiedUrl;

    if (position >= 0) {
        simplifiedUrl = website.substring(position + 2);
    } else {
        simplifiedUrl = website;
    }

    position = simplifiedUrl.indexOf("/");
    if (position >= 0) {
        simplifiedUrl = simplifiedUrl.substring(0, position);
    }

    return simplifiedUrl;
};

const dollarIcon = (price, title) => {
    let className;

    //Comme dans le fichier JSON, on a uniquement des price à null ou "Inexpensive", on considère
    //null comme Moderate => 1 $ jaune si Inexpensive, 2 $ jaune si null.

    if (title === "Inexpensive") {
        className = "reviews-dollar-icon reviews-dollar-icon-yellow";
    } else if (title === "Moderate") {
        className =
            "reviews-dollar-icon" +
            (price && price === "Inexpensive"
                ? " reviews-dollar-icon-grey"
                : " reviews-dollar-icon-yellow");
    } else {
        className =
            "reviews-dollar-icon" +
            (price && price === "Expensive"
                ? " reviews-dollar-icon-yellow"
                : " reviews-dollar-icon-grey");
    }

    return (
        <div title={title}>
            <svg
                className={className}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 13 24"
                stroke="currentColor"
            >
                <path
                    fill="#fc0"
                    fillRule="evenodd"
                    stroke="10"
                    d="M7.987 11.372H4.478a3.244 3.244 0 01-3.24-3.24 3.244 3.244 0 013.24-3.24h6.193a.61.61 0 00.607-.608.61.61 0 00-.607-.608H6.838V.608A.61.61 0 006.23 0a.61.61 0 00-.607.608v3.068h-1.15c-2.455 0-4.455 2-4.455 4.456 0 2.455 2 4.455 4.455 4.455h3.51a3.244 3.244 0 013.24 3.24 3.244 3.244 0 01-3.24 3.241H1.677a.61.61 0 00-.607.608.61.61 0 00.607.608h3.945v3.108A.61.61 0 006.23 24a.61.61 0 00.608-.608v-3.108h1.2a4.455 4.455 0 00-.05-8.911z"
                ></path>
            </svg>
        </div>
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

                    // console.log("Price:", anEstablishment.price);
                    // console.log(
                    //     anEstablishment.location.lat,
                    //     anEstablishment.location.lng
                    // );
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
                        <div className="reviews-around-map">
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
                                        zoomControl={true}
                                    >
                                        <TileLayer
                                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <CustomMapMarker
                                            establishment={establishment}
                                        ></CustomMapMarker>
                                    </MapContainer>
                                )}
                        </div>

                        <div className="reviews-informations-under-map">
                            {establishment.type !== "B&B" && (
                                <div className="reviews-information-under-map">
                                    <div className="reviews-information-under-map-title">
                                        Price
                                    </div>
                                    <div className="reviews-around-dollar">
                                        {dollarIcon(
                                            establishment.price,
                                            "Inexpensive"
                                        )}
                                        {dollarIcon(
                                            establishment.price,
                                            "Moderate"
                                        )}
                                        {dollarIcon(
                                            establishment.price,
                                            "Expensive"
                                        )}
                                    </div>
                                </div>
                            )}
                            {establishment.website && (
                                <div className="reviews-information-under-map">
                                    <div className="reviews-information-under-map-title">
                                        Website
                                    </div>
                                    <a
                                        href={establishment.website}
                                        target="_blank"
                                        rel="noreferrer"
                                        title="Visit their website"
                                    >
                                        <div className="reviews-information-under-map-value">
                                            {getSimplifiedWebsiteUrl(
                                                establishment.website
                                            )}
                                        </div>
                                    </a>
                                </div>
                            )}
                            {establishment.facebook && (
                                <div className="reviews-information-under-map">
                                    <div className="reviews-information-under-map-title">
                                        {!establishment.website && "Website"}
                                    </div>
                                    <a
                                        href={establishment.facebook}
                                        target="_blank"
                                        rel="noreferrer"
                                        title="Go to Facebook page for this venue"
                                    >
                                        <svg
                                            className="reviews-facebook-icon"
                                            viewBox="0 0 15 26"
                                            stroke="currentColor"
                                        >
                                            <path
                                                fill="#3b5998"
                                                stroke="1"
                                                fillRule="evenodd"
                                                d="M13.393 1.005L10.31 1C6.844 1 4.605 3.297 4.605 6.853v2.699H1.504a.485.485 0 00-.485.485v3.91c0 .268.217.485.485.485h3.1v9.866c0 .268.218.485.486.485h4.046a.485.485 0 00.485-.485v-9.866h3.625a.485.485 0 00.485-.485l.002-3.91a.486.486 0 00-.485-.485H9.62V7.264c0-1.1.262-1.658 1.694-1.658h2.078a.485.485 0 00.484-.485V1.49a.485.485 0 00-.484-.485z"
                                            ></path>
                                        </svg>
                                        <div className="reviews-information-under-map-value">
                                            facebook
                                        </div>
                                    </a>
                                </div>
                            )}
                        </div>
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
