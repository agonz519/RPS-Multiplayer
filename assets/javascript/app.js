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
	var turn = 1;

	$("#p1Choice").hide();
	$("#p2Choice").hide();

	db.ref().on("value", function(snapshot) {
		console.log("Snapshot value currently equals " + snapshot.val());

		if (snapshot.child("players/1").exists()) {
			console.log("Player 1 exists.")
			var player1 = snapshot.child("players/1").val();
			$('#player1name').text(player1.name);
			$('#p1Stats').text("Wins: " + player1Wins + " | Losses: " + player1Losses + " | Ties: " + player1Ties);
		} else {
			console.log("Player 1 does not exist.");
			$('#player1name').text("");
		}
		if (snapshot.child("players/2").exists()) {
			console.log("Player 2 exists.");
			var player2 = snapshot.child("players/2").val();
			$('#player2name').text(player2.name);
			$('#p2Stats').text("Wins: " + player2Wins + " | Losses: " + player2Losses + " | Ties: " + player2Ties);
		} else {
			console.log("Player 2 does not exist.");
			$('#player2name').text("");
		}

		turn = snapshot.val().turn;

		// SUBMIT NAME CLICK EVENT
		$("#submitName").on("click", function(event) {
			// PREVENT RELOAD OF PAGE
			event.preventDefault();


			if (snapshot.child("players/1").exists() === false) {
				player1Name = $('#nameInput').val().trim();
				db.ref("players/1").update({
					name: player1Name,
					wins: player1Wins,
					losses: player1Losses,
					ties: player1Ties,
					choice: player1Choice
				});
				$('.form-group').text("Hello " + player1Name + "! You are player 1.");
				db.ref("players/1").onDisconnect().remove();
			} else if (snapshot.child("players/2").exists() === false){
				player2Name = $('#nameInput').val().trim();
				db.ref("players/2").update({
					name: player2Name,
					wins: player2Wins,
					losses: player2Losses,
					ties: player2Ties,
					choice: player2Choice
				});
				$('.form-group').text("Hello " + player2Name + "! You are player 2.");
				db.ref("players/2").onDisconnect().remove();
			} else {
				alert("Sorry, game is full. Please wait...");
				$('#nameInput').val("");
			}
		});

		if (snapshot.child("players/1").exists() && snapshot.child("players/2").exists()) {
			db.ref().set({
				turn: turn
			});
		}

		db.ref().on("value", function(snaps) {
			console.log(snaps.val().turn);
			turn = snaps.val().turn;
		}, function(errorObject) {
			console.log("the read failed: " + errorObject.code);
		});



		db.ref("turn").on("value", function(snappy) {
			console.log(snappy.val());
			$("#p1Choice").show();
			if (snappy.val().turn === 1) {
				$("#result").text("Waiting on player 1");
				$("#rock1").on("click", function() {
					$("#rock1").css("font-weight", "bold");
					player1Choice = "rock";
					console.log("Player 1 chose " + player1Choice);
					db.ref("players/1").update({
						choice: player1Choice,
					});
					turn++;
					db.ref().update({
						turn: turn
					});
				});
			}
			if (snappy.val().turn === 2) {
				$("#result").text("Waiting on player 2");
				$("#paper2").on("click", function() {
					$("#paper2").css("font-weight", "bold");
					player2Choice = "paper";
					console.log("Player 2 chose " + player2Choice);
					db.ref("players/2").update({
						choice: player2Choice,
					});
					turn++
					db.ref().update({
						turn: turn
					});
				});
			}
			if (snappy.val().turn === 3) {
				if (player1Choice === player2Choice) {
					db.ref("players/1").update({ties: player1Choice++});
					db.ref("players/2").update({ties: player2Choice++});
				} else if (player1Choice === 'rock' && player2Choice === "scissors") {
					db.ref("players/1").update({wins: player1Wins++});
					db.ref("players/2").update({wins: player2Losses++});
				} else if (player1Choice === 'paper' && player2Choice === "rock") {
					db.ref("players/1").update({wins: player1Wins++});
					db.ref("players/2").update({wins: player2Losses++});
				} else if (player1Choice === 'scissors' && player2Choice === "paper") {
					db.ref("players/1").update({wins: player1Wins++});
					db.ref("players/2").update({wins: player2Losses++});
				} else {
					db.ref("players/1").update({wins: player1Losses++});
					db.ref("players/2").update({wins: player2Wins++});
				}
				turn = 1;
				db.ref().update({
					turn: turn
				});
			}
		})




	}, function(errorObject) {
		console.log("The read failed: " + errorObject.code);
	});


});

