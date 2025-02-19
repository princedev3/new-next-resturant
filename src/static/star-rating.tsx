import { Star } from "lucide-react";
import { FaStarHalfAlt } from "react-icons/fa";

const StarRating = ({ rating }: { rating: number }) => {
  const star = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      star.push(
        <Star key={i} color="#eab308" fill="#eab308" className="w-4 h-4" />
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      star.push(
        <FaStarHalfAlt
          key={i}
          color="#eab308"
          fill="#eab308"
          className=" w-4 h-4   "
        />
      );
    } else {
      star.push(<Star key={i} color="#eab308" className="  w-4 h-4" />);
    }
  }

  return <div className="flex ">{star} </div>;
};

export default StarRating;
