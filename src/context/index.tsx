import React, { createContext, useEffect, useState } from "react";
import { RestaurantInterface } from "../interfaces";

interface Props {
  children: React.ReactNode;
}

interface ContextData {
  restaurants: RestaurantInterface[];
  favorites: RestaurantInterface[];
  handleAddFavorite: (res: RestaurantInterface) => void;
  handleRemoveFavorite: (res: RestaurantInterface) => void;
  handleUpdateRestaurants: () => void;
}

export const Context = createContext<ContextData | null>(null);

export const Provider: React.FC<Props> = ({ children }) => {
  const [favorites, setFavorites] = useState<RestaurantInterface[]>([]);
  const [restaurants, setRestaurants] = useState<RestaurantInterface[]>();

  // fetch the restaurants at first
  useEffect(() => {
    fetch("http://localhost:5001/restaurants")
      .then(res => res.json())
      .then(data => setRestaurants(data));
  }, []);

  // used to update the local restaurants every time we add review to it
  const handleUpdateRestaurants = () => {
    fetch("http://localhost:5001/restaurants")
      .then(res => res.json())
      .then(data => setRestaurants(data));
  };

  // add to favs
  const handleAddFavorite = (res: RestaurantInterface) => {
    setFavorites([...favorites, res]);
  };

  // remove from favs
  const handleRemoveFavorite = (res: RestaurantInterface) => {
    setFavorites(favorites.filter(favRes => favRes.id !== res.id));
  };

  // get favorites at page load from LS
  useEffect(() => {
    const localFavs: RestaurantInterface[] = JSON.parse(
      localStorage.getItem("currentFavorites") || "[]"
    );

    setFavorites(localFavs);
  }, []);

  // everytime you update favorites - set them in LS
  useEffect(() => {
    localStorage.setItem("currentFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const contextObj: ContextData = {
    // before filtering
    restaurants: restaurants && restaurants?.length > 0 ? restaurants : [],
    favorites,
    handleAddFavorite,
    handleRemoveFavorite,
    handleUpdateRestaurants,
  };

  return <Context.Provider value={contextObj}>{children}</Context.Provider>;
};
