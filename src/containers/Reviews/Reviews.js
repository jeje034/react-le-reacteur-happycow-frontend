import "./Reviews.scss";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import GetEstablishmentTypeIcon from "../../components/WithoutHtml/GetEstablishmentTypeIcon";
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
    console.log("establishmentType", establishmentType);
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
                <div>Europe / France / Montpellier</div>
                <div>Closed now</div>
                <div>
                    Vegetarian restaurant in the city centre since late 2018.
                    2nd branch. Offers falafel, hummus, and salad served in a
                    wrap or on a platter. Some items contain feta or dairy but
                    can be adjusted for vegans. Note March 2021: Restaurants
                    allowed to open for takeaway/delivery only. Call before you
                    go and let HappyCow know about any changes. Open Mon-Sat
                    12:00-22:30. Closed Sun.
                </div>
            </div>
        </>
    );
};

export default Reviews;
