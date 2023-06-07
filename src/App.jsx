/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./components/Loading";
import Controls from "./components/Controls";
import Simpsons from "./components/Simpsons";
import "./App.css";

const App = () => {
  //state hooks
  const [simpsons, setSimpsons] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [likeInput, setLikeInput] = useState("");

  //get data from API
  const getData = async () => {
    try {
      const { data } = await axios.get(
        `https://thesimpsonsquoteapi.glitch.me/quotes?count=10`
      );

      //fixed the api data to have unique id
      data.forEach((element, index) => {
        element.id = index + Math.random();
      });

      setSimpsons(data);
      console.log(simpsons);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []); //[] means it runs once

  // Function to update the character to toggle between like/dislike
  const onLikeToggle = (id) => {
    //find the item
    const simpsonsCopy = [...simpsons];
    const indexOf = simpsonsCopy.findIndex((char) => {
      return char.id === id;
    });

    // invert if liked or not liked
    simpsonsCopy[indexOf].liked = !simpsonsCopy[indexOf].liked;
    setSimpsons(simpsonsCopy);
  };

  //Function to wire up delete button
  const onDelete = (id) => {
    const simpsonsCopy = [...simpsons];
    const indexOf = simpsonsCopy.findIndex((char) => {
      return char.id === id;
    });

    simpsonsCopy.splice(indexOf, 1);
    setSimpsons(simpsonsCopy);
  };

  //Search box
  const onSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  //sort by like
  const onLikeInput = (e) => {
    setLikeInput(e.target.value);
  };

  //below is the return
  if (!simpsons) return <Loading />;
  if (simpsons.length === 0) return <p>You deleted all the characters!</p>;

  //calculate the total likes
  let total = 0;
  simpsons.forEach((char) => {
    if (char.liked) {
      total++;
    }
  });

  //filter the result
  let filteredList = [...simpsons];

  //filtered by search
  if (searchInput) {
    filteredList = filteredList.filter((char) => {
      //console.log(char.character, searchInput);
      if (char.character.toLowerCase().includes(searchInput.toLowerCase()))
        return true;
    });
  }
  //sort by liked / not liked
  if (likeInput === "liked") {
    filteredList.sort((itemOne, itemTwo) => {
      if (itemOne.liked === true) return -1;
      if (!itemTwo.liked) return 1;
    });
  } else if (likeInput === "notLiked") {
    filteredList.sort((itemOne, itemTwo) => {
      if (itemTwo.liked === true) return -1;
      if (!itemOne.liked) return 1;
    });
  }

  return (
    <>
      <h1>Total no of liked chars #{total}</h1>

      <Controls onSearchInput={onSearchInput} onLikeInput={onLikeInput} />

      <Simpsons
        simpsons={filteredList}
        onDelete={onDelete}
        onLikeToggle={onLikeToggle}
      />
    </>
  );
};

export default App;
