import { useState, useEffect } from "react";
import Shimmer from "./ShimmerUI";
import { useParams } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { MENU_API } from "./Config";

const RestaurantMenu = () => {
  const [resInfo, setresInfo] = useState(null);
  const { id: resId } = useParams();

  console.log("params", resId);

  useEffect(() => {
    fetchMenu();
  }, [resId]);

  const onlinestatus = useOnlineStatus();
  if (onlinestatus === false) {
    return <h1>You are offline, Please check your internet connection</h1>;
  }

  const fetchMenu = async () => {
    try {
      const response = await fetch(`${MENU_API}${resId}&submitAction=ENTER`);
      const json = await response.json();
      console.log("API response:", json); // Log the entire response
      setresInfo(json.data);
    } catch (error) {
      console.error("Error fetching menu data: ", error);
    }
  };

  if (resInfo === null) {
    return <Shimmer />;
  }

  console.log("resInfo", resInfo);

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards?.[2]?.card?.card?.info || {};
  const itemCards =
    resInfo?.cards?.[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]?.card
      ?.card?.itemCards || [];

  console.log("itemCards", itemCards);

  const getImageUrl = (imageId) =>
    `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`;

  return (
    <div className="Menu p-4">
      <h1 className="text-2xl font-bold mb-4">{name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {itemCards.length > 0 ? (
          itemCards.map((item, index) => (
            <div key={index} className="card bg-white p-4 rounded-lg shadow-md">
              <h2 className="card-title text-xl font-semibold mb-2">
                {item.card.info.name}
              </h2>
              <p className="price mb-2">
                Price: ₹
                {item.card.info.defaultPrice / 100 ||
                  item.card.info.finalPrice / 100 ||
                  item.card.info.price / 100}
              </p>
              <p className="card-description mb-2">
                {item.card.info.description}
              </p>
              {item.card.info.imageId && (
                <img
                  src={getImageUrl(item.card.info.imageId)}
                  alt={item.card.info.name}
                  className="card-image w-full h-48 object-cover rounded"
                />
              )}
            </div>
          ))
        ) : (
          <p>No items available.</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
