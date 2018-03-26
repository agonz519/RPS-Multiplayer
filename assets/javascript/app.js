// INITIALIZE FIREBASE
const config = {
	apiKey: "AIzaSyB8xrvZ_GI2bITie_17kmXRB0-8ZHgs7Mg",
	authDomain: "rps-multiplayer-17ca7.firebaseapp.com",
	databaseURL: "https://rps-multiplayer-17ca7.firebaseio.com",
	projectId: "rps-multiplayer-17ca7",
	storageBucket: "rps-multiplayer-17ca7.appspot.com",
	messagingSenderId: "102496090301"
};

firebase.initializeApp(config);
let database = firebase.database();