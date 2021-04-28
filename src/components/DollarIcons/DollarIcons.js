import "./_DollarIcons.scss";

const DollarIcons = ({ price, smallIcons }) => {
    const getDollarIcon = (price, title) => {
        let className;

        //Comme dans le fichier JSON, on a uniquement des price à null ou "Inexpensive", on considère
        //null comme Moderate => 1 $ jaune si Inexpensive, 2 $ jaune si null.
        if (title === "Inexpensive") {
            className = "dollars-icon-one-icon dollar-icons-yellow";
        } else if (title === "Moderate") {
            className =
                "dollars-icon-one-icon" +
                (price && price === "Inexpensive"
                    ? " dollar-icons-grey"
                    : " dollar-icons-yellow");
        } else {
            className =
                "dollars-icon-one-icon" +
                (price && price === "Expensive"
                    ? " dollar-icons-yellow"
                    : " dollar-icons-grey");
        }

        if (smallIcons) {
            className += " dollars-icon-one-icon-small";
        }

        return (
            <div title={title}>
                <svg
                    className={className}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox={smallIcons ? "0 0 20 38" : "0 0 13 24"}
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

    return (
        <div
            className={
                smallIcons
                    ? "dollar-icons-main dollar-icons-main-small"
                    : "dollar-icons-main"
            }
        >
            {getDollarIcon(price, "Inexpensive")}
            {getDollarIcon(price, "Moderate")}
            {getDollarIcon(price, "Expensive")}
        </div>
    );
};

export default DollarIcons;
