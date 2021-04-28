import "./_OpenClosedIcon.scss";

import GetOpeningHoursInformations from "../../functions/GetOpeningHoursInformations";

const OpenClosedIcon = ({ establishmentDescription }) => {
    const getOpenClosedClassColor = (establishmentDescription) => {
        const openingHoursInformations = GetOpeningHoursInformations(
            establishmentDescription
        );

        if (openingHoursInformations.openOrClosed === "OPEN NOW") {
            return "open-closed-icon-color-open";
        } else if (openingHoursInformations.openOrClosed === "CLOSED NOW") {
            return "open-closed-icon-color-closed";
        } else {
            return "";
        }
    };

    return (
        <svg
            className={getOpenClosedClassColor(establishmentDescription)}
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
    );
};

export default OpenClosedIcon;
