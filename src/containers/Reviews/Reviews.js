import "./Reviews.scss";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import GetEstablishmentTypeIcon from "../../components/WithoutHtml/GetEstablishmentTypeIcon";
import establishments from "../../assets/establishments.json";

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
        <div className={getBannerClasses(establishment.type)}>
            <h1 className="reviews-h1">{establishment.name}</h1>
            <div className="reviews-under-h1">
                <div className={getEtablishmentTypeClasses(establishment.type)}>
                    <img
                        className="review-establishment-type-icon"
                        src={GetEstablishmentTypeIcon(establishment.type)}
                        alt={establishment.type}
                    />
                    {capitalize(establishment.type)}
                </div>
                <div>* * * * * </div>
            </div>
        </div>
    );
};

export default Reviews;
