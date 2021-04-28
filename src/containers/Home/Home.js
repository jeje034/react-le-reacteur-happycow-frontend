import "./Home.scss";

import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import establishments from "../../assets/establishments.json";

import EstablishmentsSection from "../../components/EstablishmentsSection/EstablishmentsSection";

import GetBrowserGeocoordinates from "../../functions/GetBrowserGeocoordinates";
import GetDistanceBetweenTwoPoints from "../../functions/GetDistanceBetweenTwoPoints";

//<title>Find Vegan &amp; Vegetarian Restaurants Near Me - HappyCow</title> Msgjs21

//1200 and more : 4 établissements par ligne : 1152 de largeur : 4 images de 270 (* 175) + 3 marges de 24 = 1080 + 72 = 1152
//992 -> 1199 : 3 établissements par ligne
//768 -> 992 : 2 établissements entiers par ligne
//0 -> 767 : 1.x établissements par ligne

const getBackgroundTopImage = () => {
    const testDay = new Date();
    let dayInNumerals = testDay.getDay();

    //msgjs21 Supprimer ce if une fois qu'on aura les images pour chaque jour (donc 7 images en tout)
    if (
        dayInNumerals === 1 ||
        dayInNumerals === 2 ||
        dayInNumerals === 3 ||
        dayInNumerals === 4 ||
        dayInNumerals === 5 ||
        dayInNumerals === 6
    ) {
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
    const [veganFoodNearMeArray, setVeganFoodNearMeArray] = useState([]);
    const [bAndBsNearMeArray, setBAndBsNearMeArray] = useState([]);
    const [
        isDownloadingVeganFoodNearMe,
        setIsDownloadingVeganFoodNearMe,
    ] = useState(true);

    useEffect(() => {
        let localGpsCoordinates;

        const sortEstablishmentsByDistance = () => {
            establishments.sort((a, b) => {
                return (
                    GetDistanceBetweenTwoPoints(
                        localGpsCoordinates.latitude,
                        localGpsCoordinates.longitude,
                        a.location.lat,
                        a.location.lng
                    ) -
                    GetDistanceBetweenTwoPoints(
                        localGpsCoordinates.latitude,
                        localGpsCoordinates.longitude,
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
                } else if (bAndBsCounter < 10 && establishment.type === "B&B") {
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
            const today = new Date();
            if (
                today.getFullYear() !== 2021 ||
                today.getMonth() !== 2 ||
                today.getDate() !== 10
            ) {
                return;
            }

            let localEstablishmentsTypes = [];
            let localCategories = [];
            let prices = [];
            let websites = [];
            let facebooks = [];
            // let notInFrance = 0;
            // let inFrance = 0;

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

                if (prices.indexOf(establishment.price) === -1) {
                    prices.push(establishment.price);
                }
                if (websites.indexOf(establishment.website) === -1) {
                    websites.push(establishment.website);
                }
                if (facebooks.indexOf(establishment.facebook) === -1) {
                    facebooks.push(establishment.facebook);
                }
                //Impossible de récupérer la ville à partir du champ link car on peut
                //avoir des tirets à la fois dans le nom de la ville et dans le nom de l'établissement

                //On ne peut pas toujours récupérer les villes à partir des adresses, notamment car elles sont parfois tronquées
                // if (establishment.address.indexOf(", France") === -1) {
                //     console.log(establishment.address);
                //     notInFrance++;
                // } else {
                //     inFrance++;
                // }
            }
            //console.log(localEstablishmentsTypes);
            //console.log(localCategories);
            //console.log("prices:", prices);
            //console.log("facebooks:", facebooks);
            //console.log("websites:", websites)
        };

        const fetchData = () => {
            localGpsCoordinates = GetBrowserGeocoordinates();

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
                                searchMapLink={
                                    deviceScreen !== "mobile" &&
                                    deviceScreen !== "twoCards"
                                }
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
                </>
            )}
        </div>
    );
};

export default Home;
