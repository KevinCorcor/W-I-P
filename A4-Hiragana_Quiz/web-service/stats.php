<?php
    session_start();
    if(isset($_SESSION['id']) && !empty($_SESSION['id'])){//http://stackoverflow.com/questions/3538513/detect-if-php-session-exists
        //connection variables
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
        //begin a session for this user
      
          $id = $_SESSION['id'];            
            
            $sql = "SELECT characters, attempts, scores FROM users WHERE userId='$id'";
            
            $result = $conn->query($sql);
           
            if ($result->num_rows > 0) {
          
                $row = $result->fetch_assoc();
                $x = $row['characters'];
                $y = $row['attempts'];
                $z= $row['scores'];
                echo  $x . '#';
                echo $y . '#';
                echo $z;
            }else{
                echo "There was an error retrievig your results. Are you signed up and logged in?";
            }
            $conn->close();
    }
    else{
        echo "please ensure you are logged in";
    }
?> 