const GetOpeningHoursInformations = (establishmentDescription) => {
    //Dcommentez et modifiez des heures pour simuler une horaire d'établissement ouvert ou fermé
    // if (establishmentDescription) {
    //     establishmentDescription = establishmentDescription.replace(
    //         "10:00",
    //         "19:00"
    //     );
    // }

    const openingHoursInformations = {};

    openingHoursInformations.openingHours = GetOpeningHours(
        establishmentDescription
    );

    if (openingHoursInformations.openingHours.length === 0) {
        openingHoursInformations.openOrClosed = "OPENING UNKNOWN";
    } else {
        let now = new Date();

        const dayInLetters = new Intl.DateTimeFormat("en-US", {
            weekday: "long",
        })
            .format(now)
            .substring(0, 3);

        let hoursAndMinutes = now.toLocaleTimeString("fr-FR").substring(0, 5);

        openingHoursInformations.openOrClosed = "CLOSED NOW";

        for (let i = 0; i < openingHoursInformations.openingHours.length; i++) {
            const element = openingHoursInformations.openingHours[i];

            if (element.startsWith(dayInLetters) && element.length === 15) {
                let hoursAndMinutesStart = element.substring(4, 9);
                let hoursAndMinutesEnd = element
                    .substring(10)
                    .replace("00:00", "23:59");

                if (
                    hoursAndMinutes >= hoursAndMinutesStart &&
                    hoursAndMinutes <= hoursAndMinutesEnd
                ) {
                    openingHoursInformations.openOrClosed = "OPEN NOW";
                    break;
                }
            }
        }
    }

    return openingHoursInformations;
};

//Retourne un tableau des heures d'ouverture avec un seul jour par élément
//Ex: ["Tue 18:00-23:00", "Wed 18:00-23:00", "Thu 18:00-23:00", "Fri 18:00-00:00", "Sat 00:00-02:00", "Sat 10:00-00:00", "Sun 00:00-02:00", "Sun 10:00-19:00"]
const GetOpeningHours = (establishmentDescription) => {
    //Dans establishmentDescription, les horaires exploitables sont ainsi:
    // ... Open Mon-Wed 11:00-23:00, Thu-Sat 11:00-02:00, Sun 11:00-23:00. (classique)
    // ... Open Mon-Fri 10:00-19:30, Sat 12:00-19:30. Closed Sun. (avec horaires de fermeture à ignorer)
    // ... Open Mon-Sun 12:00-14:30, 19:00-22:30. (avec un moins une tranche horaire sans jour => récupérer le jour de la tranche horaire précédente)
    // ... Open Tue-Thu 18:00-23:00, Fri 18:00-02:00, Sat 10:00-02:00, Sun 10:00-19:00. (avec horaire de fin le jour suivant (00:00, 01:00, 02:00, ...))
    //Parfois toutes les exceptions sont cumulées !

    //1 - On exclue les quelques cas non gérables
    if (!establishmentDescription) {
        return "";
    }

    let position = establishmentDescription.indexOf(" Open ");
    if (position === -1) {
        return "";
    }

    try {
        //2 - On enlève ce qu'il y a avant les horaires.
        let openingsHours = establishmentDescription.substring(position + 6);

        //3 - On enlève ce qu'il y a après les horaires.
        position = openingsHours.indexOf(".");
        if (position >= 0) {
            openingsHours = openingsHours.substring(0, position);
        }

        //4 - On découpe en tableau de tranches horaires
        const initialTimeSlots = openingsHours.split(", ");

        //5 - On ajoute les jours aux éléments du tableau sans jour
        //Ex: ["Mon-Sat 12:00-14:30", "19:00-23:00"] -> ["Mon-Sat 12:00-14:30", "Mon-Sat 19:00-23:00"]
        const timeSlots2 = [];
        let temporaryArray = [];
        let days = "";
        for (let i = 0; i < initialTimeSlots.length; i++) {
            const element = initialTimeSlots[i];
            temporaryArray = element.split(" ");
            if (temporaryArray) {
                if (temporaryArray.length === 2) {
                    days = temporaryArray[0];
                    timeSlots2.push(element);
                } else if (temporaryArray.length === 1) {
                    timeSlots2.push(days + " " + element);
                }
            }
        }

        //6 - On décompose les regroupements de jours
        //Ex: ["Mon-Wed 11:00-23:00"] -> ["Mon 11:00-23:00", "Tue 11:00-23:00", "Wed 11:00-23:00"]
        const timeSlots3 = [];
        for (let i = 0; i < timeSlots2.length; i++) {
            const element = timeSlots2[i];
            if (element[3] === "-") {
                let dayDecompositionReturned = dayDecomposition(
                    element.substring(0, 3),
                    element.substring(4, 7),
                    element.substring(8)
                );

                for (let i = 0; i < dayDecompositionReturned.length; i++) {
                    timeSlots3.push(dayDecompositionReturned[i]);
                }
            } else {
                timeSlots3.push(element);
            }
        }

        //On décompose les horaires sur plusieurs jours
        //Ex: ["Tue 18:00-23:00", "Fri 18:00-02:00",                    "Sat 10:00-02:00",                    "Sun 10:00-19:00"]
        // -> ["Tue 18:00-23:00", "Fri 18:00-00:00", "Sat 00:00-02:00", "Sat 10:00-00:00", "Sun 00:00-02:00", "Sun 10:00-19:00"]
        const timeSlots4 = [];
        temporaryArray = [];
        let openedAndClosedHours = [];
        for (let i = 0; i < timeSlots3.length; i++) {
            const element = timeSlots3[i];
            temporaryArray = element.split(" ");
            let dayInProgress = temporaryArray[0]; //Ex: "Fri"
            openedAndClosedHours = temporaryArray[1].split("-"); //Ex: ["18:00", "02:00"]

            if (
                openedAndClosedHours[1] > openedAndClosedHours[0] ||
                openedAndClosedHours[1] === "00:00"
            ) {
                //Dans le if, on ne décompose pas
                timeSlots4.push(element);
            } else {
                //Dans le else, on décompose les horaires par jour ou groupe de jours
                timeSlots4.push(
                    `${dayInProgress} ${openedAndClosedHours[0]}-00:00`
                );
                timeSlots4.push(
                    `${getNextDay(dayInProgress)} 00:00-${
                        openedAndClosedHours[1]
                    }`
                );
            }
        }

        return timeSlots4;
    } catch (error) {
        console.log("An error occured during opening hours search:", error);
        return [];
    }
};

const dayDecomposition = (firstDay, lastDay, hours) => {
    let openingHours = [];
    const days = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
    ];

    let dayIndex = days.indexOf(firstDay);
    if (dayIndex === -1 || days.indexOf(lastDay) === -1) {
        return;
    }

    let dayInProgress = "";
    do {
        dayInProgress = days[dayIndex++];
        openingHours.push(`${dayInProgress} ${hours}`);
    } while (dayInProgress !== lastDay);

    return openingHours;
};

const getNextDay = (dayInProgress) => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];

    let index = days.indexOf(dayInProgress);
    if (index === -1) {
        return "Unk";
    } //Pour Unknown

    return days[index + 1];
};

export default GetOpeningHoursInformations;
