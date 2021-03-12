import "./RatingInStars.scss";

const RatingInStars = ({ rating, smallStars }) => {
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

    const getFontAwesomeClasses = (rating) => {
        if (rating === 1) {
            return "fas fa-star";
        } else if (rating === 0.5) {
            return "fas fa-star-half-alt";
        } else {
            return "far fa-star";
        }
    };

    return (
        <div className="rating-in-stars-main">
            {stars.map((element, indice) => {
                return (
                    <i
                        key={indice}
                        className={
                            (smallStars
                                ? "rating-in-stars-small-star "
                                : "rating-in-stars-star ") +
                            getFontAwesomeClasses(element)
                        }
                    ></i>
                );
            })}
        </div>
    );
};

export default RatingInStars;
