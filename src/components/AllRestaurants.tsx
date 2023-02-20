import React, { useContext } from "react";
import { Context } from "../context";
import RestaurantCard from "./RestaurantCard";

const AllRestaurants: React.FC = () => {
  const context = useContext(Context);

  return (
    <div className="container">
      <h2>All restaurants</h2>
      <div className="flex">
        {context?.restaurants?.map(res => (
          <RestaurantCard res={res} key={`all-res-${res.id}`} />
        ))}
      </div>
    </div>
  );
};

export default AllRestaurants;
