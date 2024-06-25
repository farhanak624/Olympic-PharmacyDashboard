import { initializeApp } from "@firebase/app";
import { updateFCM } from "../Api/AdminApi";
import { getMessaging, getToken, onMessage } from "@firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_FIRE_BASEAPIKEY,
  authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGEBAQUET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_FIREBASE_MESSAGESENTERID,
  appId: import.meta.env.VITE_REACT_APP_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_REACT_APP_FIREBASE_MESSURMENTID,
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = async () => {
  return getToken(messaging, {
    vapidKey: import.meta.env.VITE_REACT_APP_FIREBASE_VAPIDKEY,
  })
    .then((currentToken) => {
      if (currentToken) {
        updateFCM({ firebaseId: currentToken })
          .then((data) => {
            console.log(data, "Successfully updated fcm.");
          })
          .catch((err) => {
            console.log(err);
          });
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("recived a bg mesahe))))))))))))))))");

      resolve(payload);
    });
  });
