import { IMG_CDN_URL } from "./Config";
import { Link } from "react-router-dom";

const RestaurantCard = ({
  id,
  name,
  cloudinaryImageId,
  cuisines,
  areaName,
  avgRating,
  promoted,
}) => {
  // Log to ensure id is correctly passed
  console.log("RestaurantCard id:", id);

  if (!name) return null;

  return (
    <Link to={`/restaurant/${id}`}>
      <div className="w-[300px] m-2 p-4 rounded-lg transition duration-300 ease-in-out hover:scale-105 shadow-lg bg-white relative">
        <img
          className="w-full h-[200px] rounded-lg object-cover mb-4"
          src={`${IMG_CDN_URL}${cloudinaryImageId}`}
          alt="restaurants-logo"
        />
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-sm text-gray-700 mb-2">{cuisines?.join(", ")}</p>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <img
              className="h-5 w-5 mr-2"
              src="https://www.clipartmax.com/png/small/207-2072371_or-combined-to-be-gigantic-location-icon-in-orange-color.png"
              alt=""
            />
            <span className="text-sm text-gray-700">{areaName}</span>
          </div>
          {avgRating !== "--" && (
            <div className="bg-green-500 text-white text-sm font-semibold px-2 py-1 rounded">
              <i className="fa fa-star mr-1"></i> {avgRating}
            </div>
          )}
        </div>
        <div className="text-sm text-red-500 font-semibold">
          40% Off | Use TRYNEW
        </div>
      </div>
    </Link>
  );
};

// Higher-order component to add the promoted label
export const withPromotedLabel = (Component) => {
  return (props) => {
    return (
      <div className="relative">
        {props.promoted && (
          <label className="relative top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            Promoted
          </label>
        )}
        <Component {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
