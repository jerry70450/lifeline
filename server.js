import "./../client/public/style.css"
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import * as Firebaseui from "firebaseui";
const express = require('express');
const router = express.Router();

// @route POST api/users/
// @desc Register a new user
// @access Public

const firebaseConfig = {
  apiKey: "AIzaSyDxpNvP2hLIpowKmEYAu0FwDtX9HGFLvss",
  authDomain: "lifeline-57cdc.firebaseapp.com",
  databaseURL: "https://lifeline-57cdc.firebaseio.com",
  projectId: "lifeline-57cdc",
  storageBucket: "lifeline-57cdc.appspot.com",
  messagingSenderId: "464367001192",
  appId: "1:464367001192:web:697ffb5707000b3b7665dd"
};

firebase.initializeApp(firebaseConfig);

const express = require('express');

const app = express();

app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
