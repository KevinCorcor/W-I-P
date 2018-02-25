<?php
    //connection variable https://www.w3schools.com/angular/angular_tables.asp
   // header('Content-Type: charset=utf-8');
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "A6";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    //begin a session for this user
    $sql = "SELECT * FROM records";
        $conn->query("SET Names utf8");
   $result = $conn->query($sql);
   $outp = ""; //declare and initialise variable here because
            //(we want to be able to use it outside the while loop)


while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {

        $outp .= ","; //this puts the "," between each object
    }

    $outp .= '{"Name":"'  . $rs["Name"]. '",';
    $outp .= '"City":"'   . $rs["City"]. '",';
    $outp .= '"Country":"'. $rs["Country"]. '"}';

}

$outp ='{ "records":['.$outp.']}';
 //echo array("records"=>$outp); //takes current $outp and wraps it in []
    //json_encode returns a JSON encoded string on success
   // echo json_encode($toBeJson);//json_encode returns a JSON encoded string on success
   // echo json_encode($toBeJson);
   // echo json_last_error_msg();
    //header('Content-Type: text/html; charset=utf-8');

  // header('Content-Type: charset=utf-8');

    echo $outp;
    $conn->close();
?>
