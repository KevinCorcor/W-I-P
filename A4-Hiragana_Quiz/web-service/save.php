<?php

	
	// $_POST["answers"]."<br>".$_POST["questions"]
	session_start();
if(isset($_SESSION['id']) && !empty($_SESSION['id'])){//http://stackoverflow.com/questions/3538513/detect-if-php-session-exists
    	//echo "please login first";
  //  }else{

		
		 $ans = explode(",", $_POST["answers"]);
		 $qs = explode(",", $_POST["questions"]);
		 $ID = $_SESSION["id"];
		 $chars;
		 $scores;
		 $att;

		$servername = "localhost";
		$username = "root";
		$password = "";
		$dbname = "Hiragana";
		
		// Create connection
		$conn = new mysqli($servername, $username, $password, $dbname);
		// Check connection
		if ($conn->connect_error) {
		    die("Connection failed: " . $conn->connect_error);
		}
		 $counter = 0;
	    $sql = "SELECT characters, attempts, scores FROM users WHERE userId=$ID";
	    $result = $conn->query($sql);
	    if ($result->num_rows > 0) {
	    	$row = $result->fetch_assoc();
	    	$chars = explode(",", $row['characters']);
	    	//echo $chars[$counter];
		 	$scores = explode(",", $row['scores']);
			$att = explode(",", $row['attempts']);
	    }else{
	        echo "not yet";
	    }
	   
		while($counter<count($ans)){
			$key = array_search($qs[$counter], $chars);
			$x=(int)$scores[$key];
			$y=(int)$ans[$counter];
			$scores[$key]=($x+$y);
			$att[$key]++;
			$counter++;
		}
		$z =implode(",", $att);
		$k =implode(",", $scores);
		$sql = "UPDATE users SET attempts='$z', scores='$k' WHERE userId=$ID";
		if ($conn->query($sql) === TRUE) {
		    echo "Record updated successfully";
		} else {
		    echo "Error updating record: " . $conn->error;
		}
		$conn->close();
	}
	else{
		session_destroy();
		echo "Please login first<br>";
		echo "<button onclick='offloadLogin();' id='login'>Login</button>";
		echo '<form id="loginform2" method="post" hidden>
	 Username: <input name="username" id="username" value="" type="text"><br>
	 Password: <input name="password" id="password" value="" type="password">
	 <input name="loginsub" id="loginsub2" value="Login" type="submit">
	 </form><button id="logout2" hidden>Logout</button>';
	}
	

?>