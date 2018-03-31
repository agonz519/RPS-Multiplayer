$(document).ready(function() {
// INITIALIZE FIREBASE
	var config = {
		apiKey: "AIzaSyB8xrvZ_GI2bITie_17kmXRB0-8ZHgs7Mg",
		authDomain: "rps-multiplayer-17ca7.firebaseapp.com",
		databaseURL: "https://rps-multiplayer-17ca7.firebaseio.com",
		projectId: "rps-multiplayer-17ca7",
		storageBucket: "rps-multiplayer-17ca7.appspot.com",
		messagingSenderId: "102496090301"
	};
	firebase.initializeApp(config);

	var db = firebase.database();

	var turn = 0;

	$("#submitName").on("click", function() {
		turn++;
		db.ref().set({
			turn: turn
		});
	});

	db.ref().on("value", function(snapshot) {
		console.log(snapshot.val().turn);
		$("#result").text(snapshot.val().turn);
		turn = snapshot.val().turn;
	}, function(errorObject) {
		console.log("the read failed: " + errorObject.code);
	});



});