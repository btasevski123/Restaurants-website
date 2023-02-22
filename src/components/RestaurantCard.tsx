import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context";
import { RestaurantInterface } from "../interfaces";

const RestaurantCard: React.FC<{ res: RestaurantInterface }> = ({ res }) => {
  const context = useContext(Context);

  const isFavorite = context?.favorites.find((favRes) => favRes.id === res.id);

  const starsSum =
    res.reviewsList.length > 0 &&
    res?.reviewsList.map((review) => review.stars).reduce((a, b) => a + b);

  // console.log(starsSum);

  return (
    <div className="res">
      <Link to={`/restaurant-${res.slug}`} className="res-inner">
        <button
          onClick={(e) => {
            e.preventDefault();
            isFavorite ? context?.handleRemoveFavorite(res) : context?.handleAddFavorite(res);
          }}
          className="btn-fav"
        >
          {isFavorite ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>}
        </button>
        <picture>
          <img src={res.image} alt={res.businessname} />
        </picture>
        <div className="content">
          <p className="business-name">{res.businessname}</p>
          <p className="restaurant-type">{res.restauranttype}</p>
          {starsSum && (
            <p>
              rating - {starsSum / res.reviews}, <br />{" "}
              <small>based on {res.reviews} reviews</small>
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default RestaurantCard;
