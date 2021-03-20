// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.0.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyBOrM_-ePB97oebbvg86JQfk6lx12rk5aY",
    authDomain: "katalis-89754.firebaseapp.com",
    databaseURL: "https://katalis-89754.firebaseio.com",
    projectId: "katalis-89754",
    storageBucket: "katalis-89754.appspot.com",
    messagingSenderId: "344174481383",
    appId: "1:344174481383:web:9f6846e88681b95a03f742",
    //   apiKey: 'api-key',
    //   authDomain: 'project-id.firebaseapp.com',
    //   databaseURL: 'https://project-id.firebaseio.com',
    //   projectId: 'project-id',
    //   storageBucket: 'project-id.appspot.com',
    //   messagingSenderId: 'sender-id',
    //   appId: 'app-id',
    //   measurementId: 'G-measurement-id',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();