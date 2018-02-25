<?php
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "Hiragana";

	// Create connection
	$conn = mysqli_connect($servername, $username, $password, $dbname);
	// Check connection
	if (!$conn) {
		die("Connection failed: " . mysqli_connect_error());
	}

	$name = $_POST['username2'];
	$pass = $_POST['password2'];


	$sql = "INSERT INTO users (userName, userPassword)
	VALUES ('$name', '$pass')";

	if (mysqli_query($conn, $sql)) {
		echo "New user created successfully";
	} else {
		echo "Error: " . $sql . "<br>" . mysqli_error($conn);
	}

	mysqli_close($conn);
?>