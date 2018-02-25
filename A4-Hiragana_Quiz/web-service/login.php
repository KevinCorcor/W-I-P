<?php
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
        session_start();
        $name = $_POST['username'];
        $pass = $_POST['password'];
        
        
        $sql = "SELECT * FROM users WHERE userName='$name' AND userPassword='$pass'";
        //$sql = "SELECT * FROM users";
        $result = $conn->query($sql);
       
        if ($result->num_rows > 0) {
      //  echo $result->row;
        // output data of each row
            while($row = $result->fetch_assoc()) {
            //echo 
                if($row['userName']===$name){
            //echo $row['userName'];
                    if($row['userPassword']===$pass){
                        $_SESSION["id"]=$row['userId'];
                        echo "Welcome " . $name . "<br>";
                       // echo 'Current PHP version: ' . phpversion();
                    }
                }
                else{
                    echo "Invalid userName or Password";
                }
            }
        }else{
            echo "There was an error loggin you in. Are you signed up?";
        }
        $conn->close();
        //}
?> 