import React, { useEffect, useState, useMemo } from "react";
import axios from "axios"; // this is importing from the package.json
import { useHistory } from "react-router-dom";

//import component files
import Header from "../components/Header"; // imports the function Header() which writes the my header / found in the file Header.js

// my Rebrickable API key
// const rebrickKey = `abf9be335b49755a93e9a68d4186ef36`;
// Extract hidden api keys
// console.log("ENV VALUE:", process.env.REACT_APP_REBRICK_API_KEY);
const rebrickKey = process.env.REACT_APP_REBRICK_API_KEY;
const bingMapsKey = process.env.REACT_APP_BING_MAPS_API_KEY;
const googleMapsKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

// ##### THIS IS THE MAIN FUNCTION WHICH DISPLAYS THE ENTIRE PAGE ##### // goes down to last line of this file
function Home() {
  // const history = useHistory(); // defines history as an object of useHistory
  // const [
  //   rebrickData /* the current state*/,
  //   setRebrickData /*the incremental/new state*/,
  // ] = useState(null); // sets the state (url) of the data being bulled from Rebrickable
  // const [theme_id /*current*/, setTheme_id /*new*/] = useState("158"); // sets the state of the theme id // default is set to "158" (star wars)
  const [themeData, setThemeData] = useState("158");
  // const [productData, setProductData] = useState(false);

  // this useEffect() will run when the variable specified in the array changes
  // in this case, useEffect() will run them the theme_id changes
  // I want to change the theme_id within the url's string literal so the app will get new/different data from the api
  useEffect(() => {
    axios
      .get(
        // `https://rebrickable.com/api/v3/lego/sets/?theme_id=${theme_id}/?key=${rebrickKey}`
        // `https://rebrickable.com/api/v3/lego/colors/?key=abf9be335b49755a93e9a68d4186ef36`
        // `https://rebrickable.com/api/v3/lego/colors/?key=${rebrickKey}`
        `https://rebrickable.com/api/v3/lego/themes/${themeData}/?key=${rebrickKey}`
        // `https://rebrickable.com/api/v3/lego/sets/${set_num}-1/?key=${rebrickKey}`
      )
      .then(function (response) {
        const theme = response.data;
        setThemeData(theme); // this is now new state of rebrickData
        // console.log(rebrick);
        // console.log(response);
        // console.log("CM themeData:", response);
      })
      .catch(function (error) {
        console.log("CM themeData Error", error);
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
  }, [themeData]); // the theme_id will change when the user changes pages

  /*








  */

  const [productNum, setProductNum] = useState("4477");
  // const [productNum, setProductNum] = useState("");
  const [productData, setProductData] = useState(null);

  const [locationData, setLocationData] = useState(null);
  const [ImageData, setImageData] = useState(null);

  // const productNumTest = "30016-1";
  // This is the side effect to the user running with a new/different product number
  useEffect(() => {
    axios
      .get(
        `https://rebrickable.com/api/v3/lego/sets/${productNum}-1/?key=${rebrickKey}`
        // `https://rebrickable.com/api/v3/lego/sets/${productNumTest}/?key=${rebrickKey}`
      )
      .then(function (response) {
        // console.log(response);
        const product = response.data;
        const theme = response.data.theme_id;

        setThemeData(theme);
        setProductData(product); // this now becomes the new state of 'productData'
        console.log("CM productData:", product); // use this data to record item attributes (name, number, image, etc.)
      })
      .catch(function (error) {
        console.log("CM_ProductData Error:", error);
      });

    //
    //
    //

    axios
      .get(
        // `http://dev.virtualearth.net/REST/v1/Locations/US/WA/98052/Redmond/1%20Microsoft%20Way?o=xml&key=AvmSc1iqRYyycN97F02C7TCH3ZmVfrdtrtPFsoC28TccvuXgxUKpgkbTHu0Uuyyh`
        // `http://dev.virtualearth.net/REST/v1/Locations/US/WA/-/Ballard/-?o=xml&inclnb=1&key=${bingMapsKey}`
        // `http://dev.virtualearth.net/REST/v1/Locations?countryRegion={countryRegion}&adminDistrict={adminDistrict}&locality={locality}&postalCode={postalCode}&addressLine={addressLine}&userLocation={userLocation}&userIp={userIp}&usermapView={usermapView}&includeNeighborhood={includeNeighborhood}&maxResults={maxResults}&key=${bingMapsKey}`
        `http://dev.virtualearth.net/REST/v1/Locations?postalCode=${productNum}&key=${bingMapsKey}` //AvmSc1iqRYyycN97F02C7TCH3ZmVfrdtrtPFsoC28TccvuXgxUKpgkbTHu0Uuyyh`
      )
      .then(function (response) {
        // console.log("CM locationData response", response);
        const location = response.data; // CHECK THIS .data
        setLocationData(location.resourceSets[0].resources[0].address); //.data.resourceSets.resources[0].address.locality
        // console.log("CM location", location);
        // console.log(
        //   "CM city",
        //   location.resourceSets[0].resources[0].address.locality
        // );
        // console.log(
        //   "THE PLACE",
        //   location.resourceSets[0].resources[0].address.locality
        // );
      })
      .catch(function (error) {
        console.log("CM Zipcode Error:", error);
      });

    //
    //
    //

    axios
      .get(
        // `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=47.5763831,-122.4211769&fov=80&heading=70&pitch=0&key=${googleMapsKey}`
        // `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=40.457375,-80.009353&key=AIzaSyCVVyLU4CfpZ4YVw6Yqxn2TWmbZUge4CAE`
        // `https://maps.googleapis.com/maps/api/streetview?location=41.403609,2.174448&size=456x456&key=AIzaSyCVVyLU4CfpZ4YVw6Yqxn2TWmbZUge4CAE&signature=EvGQrLtO9n7PVx_MH_Bv__IxEmE=`
        `https://maps.googleapis.com/maps/api/streetview?location=41.403609,2.174448&size=456x456&key=AIzaSyCVVyLU4CfpZ4YVw6Yqxn2TWmbZUge4CAE&signature=EvGQrLtO9n7PVx_MH_Bv__IxEmE=&signature=D4ihXo9zOHvmfSDLH1W9CjS-jxI=`
      )
      .then(function (response) {
        console.log("IMAGE RES:", response);
        const image = response;
        setImageData(image);
      })
      .catch(function (error) {
        console.log("CM Image Error:", error);
      });

    //
    //
    //
  }, [productNum]); // the product number will change when the user input a different number to the text box
  // SEE onClick method in button tag

  // console.log("NEW locationData", locationData);
  // console.log(
  //   "NEW CITY",
  //   locationData.resourceSets[0].resources[0].address.locality
  // );
  /*
  
  resourceSets[0].resources[0].address.locality
  
  
  
  
  
  
  */

  // This manages the data displayed when the user goes to another page with a new url
  // the url searching variables can for the most part be the same for any React app
  // useEffect(() => {
  //   const searchParams = history.location.search;
  //   const urlParams = new URLSearchParams(searchParams);
  //   const theme_id = urlParams.get("theme_id"); // ---->>>>> CHECK THIS LINE IF ERROR <<<<<<------
  //   if (theme_id) {
  //     setTheme_id(theme_id);
  //   }
  // }, [history]); // Everytime [history] array changes, this useEffect will be called
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

  /*
  
  
  
  use 'useEffect' and 'useState' to acquire and set the data from the API
  this data is then inserted in 'useMemo' to assign new variables for displaying in the HTML
  after 'useMemo' is used, data should be used only for displaying
  exception: button tag onClick assign new productNum
  
  
  
  */

  const { themeName } = useMemo(() => {
    let themeName = "";

    if (themeData) {
      themeName = `${themeData.name}`; //string // should write "Star Wars"
    }

    return {
      themeName,
    };
  }, [themeData]);

  const { itemName, itemImage, itemYear, itemNum } = useMemo(() => {
    // let itemTheme = "";
    let itemName = "";
    let itemImage = "";
    let itemYear = "";
    let itemNum = "";

    if (productData) {
      // itemTheme = `${productData.theme_id}`;
      itemName = `${productData.name}`;
      itemImage = `${productData.set_img_url}`;
      itemYear = `${productData.year}`;
      itemNum = `${productData.set_num.split("-")[0]}`;
    }

    return {
      // itemTheme,
      itemName,
      itemImage,
      itemYear,
      itemNum,
    };
  }, [productData]);

  const { city, state, country } = useMemo(() => {
    let city = "";
    let state = "";
    let country = "";

    if (locationData) {
      city = `${locationData.locality}`; //.resourceSets.resources[0].address.locality}`; //.resourceSets[0].resources[0].address.locality}`;
      state = `${locationData.adminDistrict}`;
      country = `${locationData.countryRegion}`;
    }

    return {
      city,
      state,
      country,
    };
  }, [locationData]);

  // let userInput = document.getElementsByClassName("userInput");
  // document
  //   .getElementsByClassName("inputButton")
  //   .addEventListener("click", () => {
  //     setProductNum = userInput;
  //   });

  return (
    <>
      <Header />
      <main className="Home">
        <div>
          <div className="TopContainer">
            <h1>Find the geographical location of a set</h1>
            <h2>Input a set number</h2>
            <div className="InputBoxDiv">
              <input
                className="UserInput"
                type="text"
                id="ProductInput"
              ></input>
              <button
                className="InputButton"
                onClick={() =>
                  setProductNum(document.getElementById("ProductInput").value)
                }
              >
                Set
              </button>
            </div>
          </div>
          <div className="DataContainer">
            <div className="DataColumn1">
              <p className="ThemeName">Theme: {themeName}</p>
              {/* <p>{itemTheme}</p> */}
              <p className="ItemName">Item Name: {itemName}</p>

              <p className="ItemYear">Year: {itemYear}</p>
              <p className="ItemNum">Product No. {itemNum}</p>
            </div>
            <img
              src={itemImage}
              alt="Box Art"
              className="ItemImage DataColumn2"
            ></img>
          </div>
          <p className="LocationInfo">
            Location: {city}, {state}, {country}
          </p>
        </div>
      </main>
    </>
  );
}

export default Home;
