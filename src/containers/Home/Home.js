import "./Home.scss";

import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import establishments from "../../assets/establishments.json";
import backgroundTopImage from "../../assets/bg.home.large.tuesday.webp";
import vegOptionImage from "../../assets/category_veg-options.svg";
import veganImage from "../../assets/category_vegan.svg";
import vegetarianImage from "../../assets/category_vegetarian.svg";
import starIcon from "../../assets/Star.png";
import emptyStarIcon from "../../assets/EmptyStar.png";
import halfStarIcon from "../../assets/HalfStar.png";

//<title>Find Vegan &amp; Vegetarian Restaurants Near Me - HappyCow</title> Msgjs21

//1200 and more : 4 établissements par ligne : 1152 de largeur : 4 images de 270 (* 175) + 3 marges de 24 = 1080 + 72 = 1152
//992 -> 1199 : 3 établissements par ligne
//768 -> 992 : 2 établissements entiers par ligne
//0 -> 767 : 1.x établissements par ligne

const useRealGpsCoordinates = false; //msgjs21 indiquer dans le readme.md qu'on prend les coordonnées de paris pour avoir des données

const Home = () => {
    console.log("deb home");
    const [gpsCoordinates, setgpsCoordinates] = useState();
    const [veganFoodNearMeArray, setVeganFoodNearMeArray] = useState([]);
    const [bAndBsNearMeArray, setBAndBsNearMeArray] = useState([]);
    const [
        establishmentsTypesForDebug,
        setEstablishmentsTypesForDebug,
    ] = useState([]);
    const [
        isDownloadingVeganFoodNearMe,
        setIsDownloadingVeganFoodNearMe,
    ] = useState(true);

    const getDistanceFromBrowserForDebug = (latitude, longitude) => {
        if (
            !gpsCoordinates ||
            !gpsCoordinates.latitude ||
            !gpsCoordinates.longitude
        ) {
            return gpsCoordinates.longitude;
        }

        let lat1 = gpsCoordinates.latitude;
        let lon1 = gpsCoordinates.longitude;

        //https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula

        var p = 0.017453292519943295; // Math.PI / 180
        var c = Math.cos;
        var a =
            0.5 -
            c((latitude - lat1) * p) / 2 +
            (c(lat1 * p) * c(latitude * p) * (1 - c((longitude - lon1) * p))) /
                2;

        return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    };

    useEffect(() => {
        let localGpsCoordinates;

        const getAndSetBrowserGeocondinates = () => {
            let gpsCoordinatesFound = false;

            if (useRealGpsCoordinates) {
                //fonction réalisée à l'aide de https://www.pluralsight.com/guides/how-to-use-geolocation-call-in-reactjs
                if ("geolocation" in navigator) {
                    navigator.geolocation.getCurrentPosition(function (
                        position
                    ) {
                        localGpsCoordinates = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        };

                        gpsCoordinatesFound = true;
                        console.log(
                            "Gps coordinates fond:",
                            `${position.coords.latitude}, ${position.coords.longitude}`
                        );
                        //Lat, long mtp, proche de Jérôme : 43.6174848, 3.9124991999999996
                    });
                } else {
                    console.log("Geolocation not Available");
                }
            }

            if (gpsCoordinatesFound) {
                setgpsCoordinates(localGpsCoordinates);
            } else {
                //Si on n'a pas de coordonnées, on prend celles de la rue de la citée, 75 004 Paris (en face de la cathédrale Notre Dame de Paris).
                localGpsCoordinates = {
                    latitude: 48.85384469500249,
                    longitude: 2.347264296359486,
                };

                setgpsCoordinates(localGpsCoordinates);
            }
        };

        const getDistanceFromBrowserCoordinates = (latitude, longitude) => {
            if (
                !localGpsCoordinates ||
                !localGpsCoordinates.latitude ||
                !localGpsCoordinates.longitude
            ) {
                return 0;
            }

            let lat1 = localGpsCoordinates.latitude;
            let lon1 = localGpsCoordinates.longitude;

            //https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula

            var p = 0.017453292519943295; // Math.PI / 180
            var c = Math.cos;
            var a =
                0.5 -
                c((latitude - lat1) * p) / 2 +
                (c(lat1 * p) *
                    c(latitude * p) *
                    (1 - c((longitude - lon1) * p))) /
                    2;

            return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
        };

        const sortEstablishmentsByDistance = () => {
            establishments.sort((a, b) => {
                return (
                    getDistanceFromBrowserCoordinates(
                        a.location.lat,
                        a.location.lng
                    ) -
                    getDistanceFromBrowserCoordinates(
                        b.location.lat,
                        b.location.lng
                    )
                );
            });
        };

        const setEstablishmentsToDisplay = () => {
            const restaurantsNearMe = [];
            const bAndBsNearMe = [];
            let restaurantsCounter = 0;
            let bAndBsCounter = 0;

            for (let i = 0; i < establishments.length; i++) {
                const establishment = establishments[i];

                if (
                    restaurantsCounter < 10 &&
                    (establishment.type === "vegan" ||
                        establishment.type === "vegetarian" ||
                        establishment.type === "veg-options")
                ) {
                    restaurantsNearMe.push(establishment);
                    restaurantsCounter++;
                }
                if (bAndBsCounter < 10 && establishment.type === "B&B") {
                    bAndBsNearMe.push(establishment);
                    bAndBsCounter++;
                }

                if (restaurantsCounter === 10 && bAndBsCounter === 10) {
                    break;
                }
            }
            setVeganFoodNearMeArray(restaurantsNearMe);
            setBAndBsNearMeArray(bAndBsNearMe);
        };

        const getDatasForDebug = () => {
            let localEstablishmentsTypes = [];
            let localCategories = [];

            for (let i = 0; i < establishments.length; i++) {
                const establishment = establishments[i];

                if (
                    localEstablishmentsTypes.indexOf(establishment.type) === -1
                ) {
                    localEstablishmentsTypes.push(establishment.type);
                }

                if (localCategories.indexOf(establishment.category) === -1) {
                    localCategories.push(establishment.category);
                }
            }

            console.log(localEstablishmentsTypes);
            console.log(localCategories);

            setEstablishmentsTypesForDebug(localEstablishmentsTypes);
        };

        const fetchData = () => {
            getAndSetBrowserGeocondinates();

            sortEstablishmentsByDistance();

            setEstablishmentsToDisplay();

            getDatasForDebug();

            setIsDownloadingVeganFoodNearMe(false);
        };

        fetchData();
    }, []);

    const isMobile = useMediaQuery({ maxWidth: 767 });
    const mayDisplay2Cards = useMediaQuery({ maxWidth: 992 });
    const mayDisplay3Cards = useMediaQuery({ maxWidth: 1199 });
    let deviceScreen;

    if (isMobile) {
        deviceScreen = "mobile";
    } else if (mayDisplay2Cards) {
        deviceScreen = "twoCards";
    } else if (mayDisplay3Cards) {
        deviceScreen = "threeCards";
    } else {
        deviceScreen = "foursCards";
    }
    console.log("deviceScreen;", deviceScreen);

    //1200 and more : 4 établissements par ligne : 1152 de largeur : 4 images de 270 (* 175) + 3 marges de 24 = 1080 + 72 = 1152
    //992 -> 1199 : 3 établissements par ligne
    //768 -> 992 : 2 établissements entiers par ligne
    //0 -> 767 : 1.x établissements par ligne
    const responsive = {
        foursCards: {
            breakpoint: { max: 3000, min: 1199 },
            items: 4,
            //slidesToSlide: 3, // optional, default to 1.
        },
        threeCards: {
            breakpoint: { max: 1199, min: 992 },
            items: 3,
            //slidesToSlide: 2, // optional, default to 1.
        },
        twoCards: {
            breakpoint: { max: 992, min: 767 },
            items: 2,
            //slidesToSlide: 2, // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 767, min: 0 },
            items: 1.3,
            slidesToSlide: 1, // optional, default to 1.
        },
    };

    const getStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (rating - 1 >= 0) {
                stars.push(1);
            } else if (rating - 0.5 >= 0) {
                stars.push(0.5);
            } else {
                stars.push(0);
            }
            rating--;
        }

        return (
            <div className="home-around-star">
                {stars.map((element, indice) => {
                    return (
                        <img
                            key={indice}
                            className="home-star"
                            src={
                                element === 1
                                    ? starIcon
                                    : element === 0.5
                                    ? halfStarIcon
                                    : emptyStarIcon
                            }
                            alt={
                                element === starIcon
                                    ? "Star"
                                    : element === halfStarIcon
                                    ? "Half star"
                                    : "No star"
                            }
                        />
                    );
                })}
            </div>
        );
    };

    const getEstblishmentCard = (indice) => {
        if (veganFoodNearMeArray.length >= indice + 1) {
            return (
                <div className="home-establishment-card">
                    <Link
                        key={veganFoodNearMeArray[indice].placeId}
                        // to={`/offer/${offer._id}`}
                        to={`/reviews`}
                        target="_blank"
                        style={{
                            textDecoration: "none",
                            color: "black",
                        }}
                    >
                        <img
                            className="home-card-image"
                            alt={veganFoodNearMeArray[indice].name}
                            src={veganFoodNearMeArray[indice].thumbnail}
                        ></img>
                    </Link>

                    <div className="home-establishment-type-and-name">
                        {veganFoodNearMeArray[indice].type ===
                            "veg-options" && (
                            <img
                                className="home-establishment-type-image"
                                src={vegOptionImage}
                                alt="veg-options"
                            />
                        )}
                        {veganFoodNearMeArray[indice].type === "vegan" && (
                            <img
                                className="home-establishment-type-image"
                                src={veganImage}
                                alt="vegan"
                            />
                        )}
                        {veganFoodNearMeArray[indice].type === "vegetarian" && (
                            <img
                                className="home-establishment-type-image"
                                src={vegetarianImage}
                                alt="vegetarian"
                            />
                        )}
                        <Link
                            key={veganFoodNearMeArray[indice].placeId}
                            // to={`/offer/${offer._id}`}
                            to={`/reviews`}
                            target="_blank"
                            style={{
                                textDecoration: "none",
                                color: "black",
                            }}
                        >
                            <div className="home-establishment-name">
                                {veganFoodNearMeArray[indice].name.length > 20
                                    ? veganFoodNearMeArray[
                                          indice
                                      ].name.substring(0, 20) + "…"
                                    : veganFoodNearMeArray[indice].name}
                            </div>{" "}
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
                    <div className="home-adress">Ville, Pays</div>

                    {getStars(veganFoodNearMeArray[indice].rating)}
                    <p>{veganFoodNearMeArray[indice].description}</p>
                </div>
            );
        }
    };

    return (
        <div>
            <img
                className="backgroundTopImage"
                alt="HappyCow background food"
                src={backgroundTopImage}
            ></img>
            <svg
                className="home-wave-image"
                data-name="Cta layer"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1366 217"
                preserveAspectRatio="xMaxYMax meet"
            >
                <path
                    d="M0,601a1849.2,1849.2,0,0,1,370-47c246.77-6.15,360,41.14,613,38,95.54-1.19,226.52-9.76,383-42q-.26,108.75-.5,217.5H-.5Z"
                    fill="#ffffff"
                    transform="translate(0 -550)"
                ></path>
            </svg>
            {isDownloadingVeganFoodNearMe ? (
                <div className="container-x-columns">Chargement en cours</div>
            ) : (
                <div className="container-x-columns">
                    <h2 className="home-h2">Vegan Food Near Me</h2>
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
                    ;
                    {/* {veganFoodNearMeArray.map((restaurant, index) => {
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
                    <br></br>
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
                    <br></br>
                    {establishmentsTypesForDebug.map((type, index) => {
                        return (
                            <div key={index}>{"" + index + " : " + type}</div>
                        );
                    })}
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
                </div>
            )}
        </div>
    );
};

export default Home;
