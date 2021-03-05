import "./EstablishmentsSection.scss";

import { Link } from "react-router-dom";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import GetEstablishmentTypeIcon from "../WithoutHtml/GetEstablishmentTypeIcon";
import RatingInStars from "../RatingInStars/RatingInStars";

const EstablishmentsSection = ({
    deviceScreen,
    responsive,
    sectionDatas,
    sectionTitle,
}) => {
    const getEstblishmentCard = (indice) => {
        if (sectionDatas.length >= indice + 1) {
            //console.log(`/reviews/${sectionDatas[indice].placeId}`);
            return (
                <div className="establishment-section-establishment-card">
                    <Link
                        key={sectionDatas[indice].placeId}
                        to={`/reviews/${sectionDatas[indice].placeId}`}
                        target="_blank"
                        style={{
                            textDecoration: "none",
                            color: "black",
                        }}
                    >
                        <img
                            className="establishment-section-card-image"
                            alt={sectionDatas[indice].name}
                            src={sectionDatas[indice].thumbnail}
                        ></img>
                    </Link>

                    <div className="establishment-section-establishment-type-and-name">
                        <img
                            className="establishment-section-establishment-type-image"
                            src={GetEstablishmentTypeIcon(
                                sectionDatas[indice].type
                            )}
                            alt={sectionDatas[indice].type}
                        />
                        <Link
                            key={sectionDatas[indice].placeId}
                            //to={`/reviews`}
                            to={`/reviews/${sectionDatas[indice].placeId}`}
                            target="_blank"
                            style={{
                                textDecoration: "none",
                                color: "black",
                            }}
                        >
                            <div className="establishment-section-establishment-name">
                                {sectionDatas[indice].name.length > 20
                                    ? sectionDatas[indice].name.substring(
                                          0,
                                          20
                                      ) + "…"
                                    : sectionDatas[indice].name}
                            </div>
                        </Link>
                    </div>
                    {/*
                    Le Caboulot de la Se…
                    Les Demoiselles de M…                    
                    Green Lab - Comédie

                     */}
                    {/*
     Récupérer à partir d'adresse semble délicat
     "9 Rue Quincampoix (at 4t…rondissement), Paris, …"
     "31 rue Vieille du Temple, Paris, France, 75004"
     "22, Rue des Ecouffes, Paris, France, 75004"

     => à partir de coorodnnées
      */}
                    <div className="establishment-section-adress">
                        Ville, Pays
                    </div>

                    <div className="establishment-section-around-star">
                        <RatingInStars rating={sectionDatas[indice].rating} />
                    </div>
                    <p>{sectionDatas[indice].description}</p>
                </div>
            );
        }
    };

    return (
        <section className="establishment-container-x-columns">
            <h2 className="establishment-section-h2">{sectionTitle}</h2>
            <Carousel
                swipeable={deviceScreen === "mobile"} //Peut-on le faire défiler à la main ?
                draggable={false}
                showDots={false} //Pour masquer les petits points (dots dans le doc) en bas permettant de savoir sur quelle "page on est" et aussi de se déplacer
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={false}
                autoPlay={false} //msgjs21 this.props.deviceType !== "mobile" ? true : false
                autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition={
                    deviceScreen === "mobile"
                        ? "none 0"
                        : "transform 200ms ease-in-out"
                } //"none 0" //"all .5"
                transitionDuration={200} //{deviceScreen === "mobile" ? 0 : 300}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["mobile"]}
                arrows={
                    responsive[deviceScreen]["items"] >= 2 &&
                    sectionDatas.length > responsive[deviceScreen]["items"]
                }
                deviceType={deviceScreen} //msgjs21 {this.props.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {getEstblishmentCard(0)}
                {getEstblishmentCard(1)}
                {getEstblishmentCard(2)}
                {getEstblishmentCard(3)}
                {getEstblishmentCard(4)}
                {getEstblishmentCard(5)}
                {getEstblishmentCard(6)}
                {getEstblishmentCard(7)}
                {getEstblishmentCard(8)}
                {getEstblishmentCard(9)}
            </Carousel>

            {/* {sectionDatas.map((restaurant, index) => {
        return (
            <div key={restaurant.placeId}>
                {`${getDistanceFromBrowserForDebug(
                    restaurant.location.lat,
                    restaurant.location.lng
                ).toFixed(1)} km : ${restaurant.name} : type ${
                    restaurant.type
                }, category ${restaurant.category}, vegan ${
                    restaurant.vegan
                }, vegOnly ${restaurant.vegOnly}, address ${
                    restaurant.address
                }`}
            </div>
        );
    })} */}
            {/* {bAndBsNearMeArray.map((bAndB, index) => {
        return (
            <div key={bAndB.placeId}>
                {`${getDistanceFromBrowserForDebug(
                    bAndB.location.lat,
                    bAndB.location.lng
                ).toFixed(1)} km : ${bAndB.name} : category ${
                    bAndB.category
                }, vegan ${bAndB.vegan}, vegOnly ${
                    bAndB.vegOnly
                }, address ${bAndB.address}`}
            </div>
        );
    })} */}
            {/*  Exemple de filtre sur un map
    
    {restaurants
        .filter(
            (restaurant) =>
                !restaurant.address.includes("Paris")
        )
        .map((restaurant, index) => {
            //console.log(restaurant.location);
            return (
                <div key={restaurant.placeId}>
                    {"2 - restaurants sans Paris - " +
                        distance(
                            restaurant.location.lat,
                            restaurant.location.lng
                        ) +
                        " - " +
                        restaurant.address}
                </div>
            );
        })} */}
        </section>
    );
};

export default EstablishmentsSection;
