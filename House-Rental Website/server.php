<?php

$name = '';
$email = '';
$password = '';
$errors=array();


$db = mysqli_connect('localhost', 'root', '', 'rentmyhouse');

if($db->connect_error){
    echo "Error Connecting Database...";
}

if(isset($_POST['login'])){
    $email = mysqli_real_escape_string($db, $_POST['email']);
    $password = mysqli_real_escape_string($db, $_POST['password']);
    $password = md5($password);
    $sql = "SELECT * FROM user WHERE email='$email' AND Password='$password'";
    $result = $db->query($sql);
    if ($result->num_rows>0) {
        $_SESSION['email'] = $email;
        echo ('<script LANGUAGE="JavaScript">
        swal("Welcome!", "You have Successfully Logged In", "success");
        </script>');
    }
    else {
        echo ('<script LANGUAGE="JavaScript">
        swal("Attention!", "Invalid Credentials", "error");
        </script>');
    }
}


if(isset($_POST['register'])){
    $name = mysqli_real_escape_string($db, $_POST['name']);
    $email = mysqli_real_escape_string($db, $_POST['email']);
    $password = mysqli_real_escape_string($db, $_POST['password']);
    $password = md5($password);
    
    $sql = "SELECT * FROM user WHERE email='$email'";
    $result = $db->query($sql);
    if($result->num_rows>0){
        echo ('<script LANGUAGE="JavaScript">
        swal("Attention!", "Email Already Registered", "warning");
        </script>');
    }
    else{
        $sql = "INSERT INTO user (name,email,Password) VALUES('$name','$email','$password')";
        if ($db->query($sql) === true) {
          $_SESSION['email'] = $email;
          echo ('<script LANGUAGE="JavaScript">
            swal("Welcome!", "You have Successfully Registered and Logged in", "success");
            </script>');
            
        }
    }
}



if(isset($_POST['book'])){
    $House_No = mysqli_real_escape_string($db, $_POST['House_No']);
    $name = mysqli_real_escape_string($db, $_POST['name']);
    $email = $_SESSION['email'];
    $aadhar = mysqli_real_escape_string($db, $_POST['aadhar']);
    $phone = mysqli_real_escape_string($db, $_POST['phone']);
    $msg = mysqli_real_escape_string($db, $_POST['msg']);
    
     

    $sql = "SELECT * FROM book WHERE House_No='$House_No'";
    $result = $db->query($sql);
    if($result->num_rows>0){
        echo('<script LANGUAGE="JavaScript">
        swal("congrats!", "Property Booked Successfully", "success");
        </script>');
    }
    else{
        $sql2 = "INSERT INTO book (House_No,name,email,phone,aadhar,msg) VALUES('$House_No','$name','$email','$phone','$aadhar','$msg')";
        $query2 = mysqli_query($db, $sql2) or trigger_error("Query Failed! SQL: $sql2 - Error: ".mysqli_error($db), E_USER_ERROR);

    }
    
    
}



if(isset($_POST['update'])){
    $email = $_SESSION['email'];
    $updated_email = mysqli_real_escape_string($db, $_POST['email']);
    $name = mysqli_real_escape_string($db, $_POST['name']);
    $sql = "UPDATE user SET email ='$updated_email',name = '$name' WHERE email='$email'";
    if ($db->query($sql) === true) {
        $sql2 = "UPDATE book SET email ='$updated_email' WHERE email='$email'";
        $query2 = mysqli_query($db, $sql2) or trigger_error("Query Failed! SQL: $sql2 - Error: ".mysqli_error($db), E_USER_ERROR);
        $_SESSION['email'] = $updated_email;
        echo ('<script LANGUAGE="JavaScript">
        swal("Welcome!", "You have Successfully Updated your Profile", "success");
        </script>');
    }
    
  }

