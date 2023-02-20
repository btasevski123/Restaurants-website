import React, { useContext } from "react";
import { Context } from "../context";
import RestaurantCard from "./RestaurantCard";

const Favorites: React.FC = () => {
  const context = useContext(Context);

  return (
    <div className="container">
      {context?.favorites && context.favorites.length > 0 ? (
        <>
          <h1>Your favorite restaurants</h1>
          {context?.favorites.map(favRes => (
            <RestaurantCard key={`fav-res-${favRes.id}`} res={favRes} />
          ))}
        </>
      ) : (
        <p>There are currently no favorites in your pocket.</p>
      )}
    </div>
  );
};

export default Favorites;
