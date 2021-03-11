import "./CustomMapMarker.scss";

import { Link } from "react-router-dom";
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from "leaflet";
import { Marker, Popup } from "react-leaflet";

const CustomMapMarker = ({ establishment, withDetails }) => {
    const getVegOptionsIconMarkup = () => {
        return renderToStaticMarkup(
            <svg>
                <g>
                    <path
                        d="M9.676 42.879c0-1.263 3.732-2.284 8.332-2.284 4.601 0 8.333 1.021 8.333 2.284s-3.732 2.284-8.333 2.284-8.332-1.021-8.332-2.284"
                        fillOpacity="0.30"
                        fill="#030404"
                    />
                    <path
                        d="M35.681 17.758c0-9.805-7.913-17.758-17.673-17.758-9.759 0-17.673 7.953-17.673 17.758 0 8.849 6.437 16.183 14.859 17.538l3.07 8.853 2.688-8.877c8.357-1.409 14.729-8.711 14.729-17.514"
                        fill="#DC5D5C"
                    />
                    <path
                        d="M15.671 29.232s-4.641-15.644 8.045-22.399l.164.321c.988 1.97 1.668 4.156 1.924 6.343.17 1.519.118 3.076-.3 4.556-.518 1.833-2.095 2.71-3.712 3.535-.471.236-.962.432-1.44.655-.89.412-1.793.929-2.167 1.879 0 0-.098-1.525 2.559-4.811 0 0 1.865-1.872 1.793-5.472 0 0-6.094 1.748-6.866 15.395"
                        fill="#FEFEFE"
                    />
                </g>
            </svg>
        );
    };
    const getVegetarianIconMarkup = () => {
        return renderToStaticMarkup(
            <svg>
                <g xmlns="http://www.w3.org/2000/svg" fill="none">
                    <path
                        d="M9.348 42.879c0-1.263 3.732-2.284 8.332-2.284 4.601 0 8.333 1.021 8.333 2.284s-3.732 2.284-8.333 2.284-8.332-1.021-8.332-2.284"
                        fillOpacity=".30"
                        fill="#030404"
                    />
                    <path
                        d="M35.354 17.758c0-9.805-7.913-17.758-17.673-17.758-9.759 0-17.673 7.953-17.673 17.758 0 8.849 6.437 16.183 14.859 17.538l3.07 8.853 2.688-8.877c8.357-1.409 14.729-8.711 14.729-17.514"
                        fill="#89288F"
                    />
                    <path
                        d="M7.215 18.812s6.991-1.564 7.429 6.866c0 0-6.636.406-7.429-6.866"
                        fill="#FEFEFE"
                    />
                    <path
                        d="M17.877 29.272s-4.615-15.644 7.999-22.399l.164.321c.982 1.977 1.663 4.156 1.911 6.343.17 1.519.118 3.083-.295 4.556-.524 1.839-2.088 2.71-3.698 3.535-.465.242-.956.439-1.427.655-.89.412-1.787.929-2.16 1.885 0 0-.091-1.532 2.546-4.817 0 0 1.859-1.872 1.788-5.472 0 0-6.061 1.754-6.828 15.395"
                        fill="#FEFEFE"
                    />
                </g>
            </svg>
        );
    };

    //https://d1mvj2ulps5lli.cloudfront.net/map_marker/vegan_marker.svg
    const getVeganIconMarkup = () => {
        return renderToStaticMarkup(
            <svg>
                <g xmlns="http://www.w3.org/2000/svg" fill="none">
                    <path
                        d="M9.676 42.879c0-1.263 3.732-2.284 8.332-2.284 4.601 0 8.333 1.021 8.333 2.284s-3.732 2.284-8.333 2.284-8.332-1.021-8.332-2.284"
                        fillOpacity=".30"
                        fill="#030404"
                    />
                    <path
                        d="M35.681 17.758c0-9.805-7.913-17.758-17.673-17.758-9.759 0-17.673 7.953-17.673 17.758 0 8.849 6.437 16.183 14.859 17.538l3.07 8.853 2.688-8.877c8.357-1.409 14.729-8.711 14.729-17.514"
                        fill="#288941"
                    />
                    <path
                        d="M18.931 28.637s-2.251-13.817 9.275-18.17l.105.288c.615 1.767.956 3.679.929 5.544-.013 1.303-.223 2.612-.733 3.816-.641 1.499-2.062 2.075-3.528 2.618-.419.151-.857.268-1.289.412-.805.262-1.63.609-2.049 1.381 0 0 .085-1.309 2.703-3.836 0 0 1.78-1.394 2.114-4.444 0 0-5.367.844-7.527 12.391"
                        fill="#FEFEFE"
                    />
                    <path
                        d="M17.459 28.637s2.251-13.817-9.275-18.17l-.105.288c-.622 1.767-.963 3.679-.936 5.544.02 1.303.229 2.612.739 3.816.636 1.499 2.062 2.075 3.522 2.618.425.151.864.268 1.296.412.798.262 1.623.609 2.048 1.381 0 0-.084-1.309-2.703-3.836 0 0-1.787-1.394-2.114-4.444 0 0 5.36.844 7.527 12.391"
                        fill="#FEFEFE"
                    />
                </g>
            </svg>
        );
    };

    //https://d1mvj2ulps5lli.cloudfront.net/map_marker/bnb_hotel_marker.svg
    const getBAndBIconMarkup = () => {
        return renderToStaticMarkup(
            <svg>
                <g xmlns="http://www.w3.org/2000/svg" fill="none">
                    <path
                        d="M9.839 42.879c0-1.263 3.731-2.284 8.332-2.284 4.601 0 8.333 1.021 8.333 2.284s-3.732 2.284-8.333 2.284-8.332-1.021-8.332-2.284"
                        fillOpacity=".15"
                        fill="#030404"
                    />
                    <path
                        d="M35.845 17.758c0-9.804-7.913-17.758-17.673-17.758-9.759 0-17.673 7.953-17.673 17.758 0 8.849 6.437 16.183 14.859 17.538l3.069 8.853 2.689-8.876c8.357-1.41 14.729-8.713 14.729-17.515"
                        fill="#2285A2"
                    />
                    <path
                        fill="#FEFEFE"
                        d="M8.158 24.055h1.898v-12.887h-1.898z"
                    />
                    <path
                        fill="#FEFEFE"
                        d="M9.801 21.437h18.137v-1.807h-18.137z"
                    />
                    <path
                        fill="#FEFEFE"
                        d="M27.506 24.055h1.905v-7.049h-1.905z"
                    />
                    <path
                        d="M15.239 16.319c0 1.001-.812 1.806-1.813 1.806s-1.812-.805-1.812-1.806c0-.996.811-1.8 1.812-1.8s1.813.804 1.813 1.8"
                        fill="#FEFEFE"
                    />
                    <path
                        d="M22.499 14.341h-6.048v4.045h9.503s-.261-3.783-3.455-4.045"
                        fill="#FEFEFE"
                    />
                </g>
            </svg>
        );
    };

    const getCustomMarkerIcon = (establishmentType) => {
        //console.log("establishmentType", establishmentType);

        let htmlIcon;
        if (establishmentType && establishmentType === "vegetarian") {
            htmlIcon = getVegetarianIconMarkup();
        } else if (establishmentType && establishmentType === "vegan") {
            htmlIcon = getVeganIconMarkup();
        } else if (establishmentType && establishmentType === "B&B") {
            htmlIcon = getBAndBIconMarkup();
        } else {
            htmlIcon = getVegOptionsIconMarkup();
        }

        return divIcon({
            html: htmlIcon,
            iconAnchor: [18, 44], //Pour que ce soit centré sur la pointe de la flèche
            iconSize: [0, 0], //Pour masquer le petit carré blanc en haut à gauche
        });
    };

    return (
        <Marker
            position={[establishment.location.lat, establishment.location.lng]}
            icon={getCustomMarkerIcon(establishment.type)}
        >
            {withDetails ? (
                <Popup closeButton={true} autoClose={false}>
                    <div className="custom-map-marker-pop-up">
                        <img
                            className="custom-map-marker-image"
                            src={establishment.thumbnail}
                            alt={establishment.name}
                        />
                        <div className="custom-map-marker-pop-up-text">
                            <Link
                                to={`/reviews/${establishment.placeId}`}
                                target="_blank"
                            >
                                <div className="custom-map-marker-establishment-name">
                                    {establishment.name}
                                </div>
                            </Link>

                            {establishment.phone && (
                                <div className="custom-map-marker-phone">
                                    <a href={`tel:${establishment.phone}`}>
                                        {establishment.phone}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </Popup>
            ) : (
                <Popup>
                    <a
                        href={`https://www.google.com/maps?q=${establishment.location.lat},${establishment.location.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Open in Google Map
                    </a>
                </Popup>
            )}
        </Marker>
    );
};

export default CustomMapMarker;
