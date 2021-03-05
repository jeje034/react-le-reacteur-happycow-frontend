import "./RatingInStars.scss";

import starIcon from "../../assets/Star.png";
import emptyStarIcon from "../../assets/EmptyStar.png";
import halfStarIcon from "../../assets/HalfStar.png";

const RatingInStars = ({ rating }) => {
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
        <div className="rating-in-stars-main">
            {stars.map((element, indice) => {
                return (
                    <img
                        key={indice}
                        className="rating-in-stars-star"
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

export default RatingInStars;
