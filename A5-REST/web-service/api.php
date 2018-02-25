<?php

$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$table = $request[0];

$link = mysqli_connect('localhost', 'root', '', 'REST');
mysqli_set_charset($link,'utf8');
// create SQL based on HTTP method
switch ($method){
  case 'GET':
    $sel = htmlspecialchars($_GET['selection']);
    $spec = htmlspecialchars($_GET['specific']);
    //$key = array_shift($request)+0;
    echo "<br>";
    $sql = "SELECT * FROM `$table`".($sel!=="FullTable"?" WHERE $sel='$spec'":'');
  break;

  case 'PUT':
    parse_str(file_get_contents("php://input"),$post_vars);
    $col = $post_vars['col'];
    $colval = $post_vars['colval'];
    $upcolval = $post_vars['upcolval'];
    $upcol = $post_vars['upcol'];
    $sql = "update `$table` set $upcol='$upcolval'".($col!=="*"?" WHERE $col='$colval'":'');
  break;

  case 'POST':
    $dec = $_POST['desc'];
    $nam = $_POST['name'];
    $url = $_POST['url'];
    $sql = "insert into `$table` (name, theDesc, URL) VALUES ('$nam', '$dec', '$url')";
  break;

  case 'DELETE':
    parse_str(file_get_contents("php://input"),$post_vars);
    $sel =$post_vars['select2'];
    $del =$post_vars['delid'];
    $sql = "delete from `$table` where $sel='$del'";
  break;
}
// excecute SQL statement
$result = mysqli_query($link,$sql);
// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(mysqli_error());
}
// print results, insert id or affected row count
if ($method == 'GET') {
  //if (!$key) echo '[';
  for ($i=0;$i<mysqli_num_rows($result);$i++) {
    echo ($i>0?',<br>':'').json_encode(mysqli_fetch_object($result));
  }
  if(mysqli_num_rows($result)==0){
    echo "no entries were found";
  }
}
elseif ($method == 'POST') {
 echo "<br>Successfully recorded entry with ID number:";
 echo mysqli_insert_id($link);
} else if($method == 'PUT') {
 echo "The numbers of rows updated: ".mysqli_affected_rows($link);
}
else{
  echo "The numbers of rows deleted: ".mysqli_affected_rows($link);
}
// close mysql connection
mysqli_close($link);
?>
