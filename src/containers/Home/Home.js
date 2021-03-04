import "./Home.scss";

import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import establishments from "../../assets/establishments.json";

import EstablishmentsSection from "../../components/EstablishmentsSection/EstablishmentsSection";

//<title>Find Vegan &amp; Vegetarian Restaurants Near Me - HappyCow</title> Msgjs21

//1200 and more : 4 établissements par ligne : 1152 de largeur : 4 images de 270 (* 175) + 3 marges de 24 = 1080 + 72 = 1152
//992 -> 1199 : 3 établissements par ligne
//768 -> 992 : 2 établissements entiers par ligne
//0 -> 767 : 1.x établissements par ligne

const useRealGpsCoordinates = false; //msgjs21 indiquer dans le readme.md qu'on prend les coordonnées de paris pour avoir des données

const getBackgroundTopImage = () => {
    const testDay = new Date();
    let dayInNumerals = testDay.getDay();

    //msgjs21 Supprimer ce if une fois qu'on aura les images pour chaque jour (donc 7 images en tout)
    if (dayInNumerals === 2 || dayInNumerals === 3 || dayInNumerals === 4) {
        const dayInLetters = new Intl.DateTimeFormat("en-US", {
            weekday: "long",
        })
            .format(testDay)
            .toLowerCase();

        return `/assets/bg.home.large.${dayInLetters}.webp`;
    } else {
        return "/assets/bg.home.large.thursday.webp";
    }
};

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
                        // console.log(
                        //     "Gps coordinates fond:",
                        //     `${position.coords.latitude}, ${position.coords.longitude}`
                        // );
                        //Lat, long mtp, proche de Jérôme : 43.6174848, 3.9124991999999996
                    });
                } else {
                    console.log("Geolocation not available");
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
                    bAndBsCounter++; //Comme j'ai seulement 2 B&Bs dans ma base, je ne fais pas d'algo spécial pour les sélectionner.
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

    return (
        <div>
            <img
                className="home-background-top-image-relative"
                alt="HappyCow background food"
                src={getBackgroundTopImage()}
            ></img>

            <div className="home-around-wave-absolute">
                <svg
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
            </div>

            {isDownloadingVeganFoodNearMe ? (
                <section
                    style={{
                        position: "relative",
                        textAlign: "center",
                        fontFamily: "Nunito",
                        fontSize: 30,
                    }}
                >
                    Chargement en cours...
                </section>
            ) : (
                <>
                    <div
                        style={{
                            marginTop: 120,
                            marginBottom: 180,
                            position: "relative",
                            //backgroundColor: "pink",
                        }}
                    >
                        {
                            <EstablishmentsSection
                                deviceScreen={deviceScreen}
                                responsive={responsive}
                                sectionDatas={veganFoodNearMeArray}
                                sectionTitle="Vegan Food Near Me"
                            />
                        }
                    </div>

                    {
                        <EstablishmentsSection
                            deviceScreen={deviceScreen}
                            responsive={responsive}
                            sectionDatas={bAndBsNearMeArray}
                            sectionTitle="B&amp;Bs"
                        />
                    }
                    {establishmentsTypesForDebug.map((type, index) => {
                        return (
                            <div key={index}>{"" + index + " : " + type}</div>
                        );
                    })}
                    <div>{bAndBsNearMeArray[0].name}</div>
                    <div>
                        {getDistanceFromBrowserForDebug(
                            bAndBsNearMeArray[0].location.lat,
                            bAndBsNearMeArray[0].location.lng
                        ).toFixed(1) + " km"}
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;
