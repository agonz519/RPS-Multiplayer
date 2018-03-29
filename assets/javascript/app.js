$(document).ready(function(){

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

// INITIAL VALUES
	var player1Name = "";
	var player1Choice = "";
	var player1Wins = 0;
	var player1Losses = 0;
	var player1Ties = 0;
	var player2Name = "";
	var player2Choice = "";
	var player2Wins = 0;
	var player2Losses = 0;
	var player2Ties = 0;
	var turn = 0;

	// SUBMIT NAME CLICK EVENT



	db.ref().on("value", function(snapshot) {
		console.log(snapshot.val());

		if (snapshot.child("players/1").exists()) {
			alert("EUREKA!!!!");
			var player1 = snapshot.child("players/1").val();
			$('#player1name').text(player1.name);
		} else {
			alert("doh!!");
		}

		if (snapshot.child("players/2").exists()) {
			alert("Player 2 exists");
			var player2 = snapshot.child("players/2").val();
			$('#player2name').text(player2.name);
		} else {
			alert("player 2 does not exist");
		}

		$("#submitName").on("click", function(event) {
			// PREVENT RELOAD OF PAGE
			event.preventDefault();

			var name = $('#nameInput').val().trim();
			if (snapshot.child("players/1").exists() === false) {
				player1Name = name;
				db.ref("players/1").update({
					name: player1Name,
					wins: player1Wins,
					losses: player1Losses,
					ties: player1Ties,
					choice: player1Choice
				});
				db.ref("players/1").onDisconnect().remove();
			} else if (snapshot.child("players/2").exists() === false){
				player2Name = name;
				db.ref("players/2").update({
					name: player2Name,
					wins: player2Wins,
					losses: player2Losses,
					ties: player2Ties,
					choice: player2Choice
				});
				db.ref("players/2").onDisconnect().remove();
			} else {
				alert("Sorry, game is full. Please wait...");
				$('#nameInput').val("");
			}
		});

	}, function(errorObject) {
		console.log("The read failed: " + errorObject.code);
	});


});

