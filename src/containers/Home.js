import React, { useEffect, useState, useMemo } from "react";
import axios from "axios"; // this is importing from the package.json
import { useHistory } from "react-router-dom";

//import component files
import Header from "../components/Header"; // imports the function Header() which writes the my header / found in the file Header.js

// const rebrickKey form "./.env"

// my Rebrickable API key
const rebrickKey = `abf9be335b49755a93e9a68d4186ef36`;

// ##### THIS IS THE MAIN FUNCTION WHICH DISPLAYS THE ENTIRE PAGE ##### // goes down to last line of this file
function Home() {
  const history = useHistory(); // defines history as an object of useHistory
  const [
    rebrickData /* the current state*/,
    setRebrickData /*the incremental/new state*/,
  ] = useState(null); // sets the state (url) of the data being bulled from Rebrickable
  const [theme_id /*current*/, setTheme_id /*new*/] = useState("158"); // sets the state of the theme id // default is set to "158" (star wars)

  // Extract hidden api keys
  // console.log("ENV VALUE: " + process.env.REACT_APP_REBRICK_API_KEY);

  // this useEffect() will run when the variable specified in the array changes
  // in this case, useEffect() will run them the theme_id changes
  // I want to change the theme_id within the url's string literal so the app will get new/different data from the api
  useEffect(() => {
    axios
      .get(
        // `https://rebrickable.com/api/v3/lego/sets/?theme_id=${theme_id}/?key=${rebrickKey}`
        // `https://rebrickable.com/api/v3/lego/colors/?key=abf9be335b49755a93e9a68d4186ef36`
        // `https://rebrickable.com/api/v3/lego/colors/?key=${rebrickKey}`
        `https://rebrickable.com/api/v3/lego/themes/158/?key=${rebrickKey}`
      )
      .then(function (response) {
        const rebrick = response.data;
        setRebrickData(rebrick);
        console.log(response);
      })
      .catch(function (error) {
        console.log("## Error: " + error);
      });

    /*
      translation of this useEffect:
      1. get data from the given url
      2. then a function runs
        a. 'response' is all the data taken from .get, and it is automatically input by use of the get().then() syntax
        b. a new var called 'rebrick' is assigned to the key in the 'response' called 'data'
          -- 'data' looks like this>   data : {id:158, parent_id: null, name: "Star Wars"}
        c. setRebrickData (from line 16 of the useState) takes the this var (response.data) and uses it to update the state
      3. function catches an error if there is one // see Rebrickable documentation for list of error codes and their meaning
      4. my goal is to change the theme_id, therefore when the theme_id changes, the rebrickData changes, 
         prompting useEffect to change the rebrick data state
      */
  }, [theme_id]);

  //  EXAMPLE OF DATA REQUEST
  //https://rebrickable.com/api/v3/lego/colors/?key=abf9be335b49755a93e9a68d4186ef36&page=2&ordering=-name%2Cid
  // SHORTENED TO:

  // the url searching vatiables can for the most part be the same for any React app
  useEffect(() => {
    const searchParams = history.location.search;
    const urlParams = new URLSearchParams(searchParams);
    const theme_id = urlParams.get("theme_id"); // ---->>>>> CHECK THIS LINE IF ERROR <<<<<<------
    if (theme_id) {
      setTheme_id(theme_id);
    }
  }, [history]); // Everytime [history] array changes, this useEffect will be called
  // history is the previous page URL
  /*
  the useEffect will run the arrow function inside
  URLSearchParams is a built-in JavaScript keyword/ it defines the utility methods to work with the query string of a URL
  an object implementing URLSearchParams can directly be used in a for...of structure
  returns: a URLSearchParams object instance
  there are methods such as .append, .delete, etc that can be added to URLSearchParams
  in this case, the function is storing the api url in 'searchParams' which is a string
  URLSearchParams then takes 'searchParams' as a parameter to search through and the data is stored in the variable 'urlParams'
  the variable 'city' can be translated to:
      const city = new URLSearchParams(history.location.search).get("city")
  */

  const { themeName } = useMemo(() => {
    let themeName = "";

    if (rebrickData) {
      themeName = `${rebrickData.name}`; //string // should write "Star Wars"
    }

    return {
      themeName,
    };
  }, [rebrickData]);

  console.log("rebrickData " + rebrickData);

  return (
    <>
      <Header />
      <main className="Home">
        <div>
          <h1>Home: Midterm</h1>
          <div className="inputBoxDiv">
            <input className="numberInput" type="text"></input>
            <button className="inputButton">Set</button>
            <p>{themeName}</p>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
