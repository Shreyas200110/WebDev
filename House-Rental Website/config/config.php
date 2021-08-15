<?php 

$db = mysqli_connect('localhost','root','','rentmyhouse');


if($db->connect_error){
	echo "Error connecting database";
}

 ?>