import axios from "axios";
const baseURL = import.meta.env.VITE_REACT_APP_ECOMURl2;
const apikey = "AIzaSyBOHuJ-4CqJBjmSi_RugeonwPU5cBVqbeA";
const getCountryFromCoordinates = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apikey}`
    );
    const results = response.data.results;
    if (results.length > 0) {
      const addressComponents = results[0].address_components;
      for (const component of addressComponents) {
        if (component.types.includes("country")) {
          return component.long_name;
        }
      }
    }
    return "India"; // Default to India if no country found
  } catch (error) {
    console.error("Error fetching country: ", error);
    return "India"; // Default to India or handle error appropriately
  }
};
const getCountry = async () => {
  if (!navigator.geolocation) {
    console.error("Geolocation is not supported by your browser");
    return "India"; // Default to India or handle error appropriately
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const country = await getCountryFromCoordinates(latitude, longitude);
        resolve(country);
      },
      (error) => {
        console.error("Error getting geolocation: ", error);
        resolve("India"); // Default to India or handle error appropriately
      }
    );
  });
};
const EcomUpdatedInstance = axios.create({ baseURL });

EcomUpdatedInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token"); //import.meta.env.VITE_REACT_APP_TOKEN;
    const appid = import.meta.env.VITE_REACT_APP_APPID;
    const country = await getCountry();
    console.log("country", country);
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    if (appid) {
      config.headers["appid"] = appid;
    }
    config.headers["Country"] = country;
    // Only set Content-Type to multipart/form-data if you're sending form data with files
    // config.headers["Content-Type"] = "multipart/form-data";

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
export default EcomUpdatedInstance;
