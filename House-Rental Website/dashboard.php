<?php 
session_start();
isset($_SESSION["email"]);
include("config/config.php");
include("modals.php");
?>


<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<title>Example</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">-->
    <link rel="stylesheet" href="./css/bootstrap.min.css">
    <!--===============================================================================================-->
    <link rel="stylesheet" href="./css/style.css">
    <!--===============================================================================================-->
    <link rel="stylesheet" href="./css/animate.css" />
    <!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/bootstrap/css/bootstrap.min.css">
    <!--===============================================================================================-->
        <link rel="stylesheet" type="text/css" href="fonts/iconic/css/material-design-iconic-font.min.css">
    <!--===============================================================================================-->
        <link rel="stylesheet" type="text/css" href="vendor/animate/animate.css">
    <!--===============================================================================================-->	
        <link rel="stylesheet" type="text/css" href="vendor/css-hamburgers/hamburgers.min.css">
    <!--===============================================================================================-->
        <link rel="stylesheet" type="text/css" href="svendor/animsition/css/animsition.min.css">
    <!--===============================================================================================-->
        <link rel="stylesheet" type="text/css" href="vendor/select2/select2.min.css">
    <!--===============================================================================================-->	
        <link rel="stylesheet" type="text/css" href="vendor/daterangepicker/daterangepicker.css">
    <!--===============================================================================================-->
        <link rel="stylesheet" type="text/css" href="css/util.css">
        <link rel="stylesheet" type="text/css" href="css/main.css">
    <!--===============================================================================================-->
    <link href="https://fonts.googleapis.com/css?family=Raleway:400,700" rel="stylesheet">
    <script src="./js/modernizr-3.5.0.min.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
</head>
<body>
    <?php
        $email = $_SESSION['email'];
        $sql = "SELECT * FROM book WHERE email = '$email'";
        $query = mysqli_query($db, $sql) or trigger_error("Query Failed! SQL: $sql - Error: ".mysqli_error($db), E_USER_ERROR);
    
    ?>

<div class="row top-bar">
    <div class="col-sm-1"></div>
    <div class="col-sm-5 d-sm-block d-none" style="font-size: 13px">
        <i class="fa fa-envelope"></i> Support@example.com &nbsp;
        <i class="fa fa-phone"></i> 12312456342 &nbsp;
        <i class="fa fa-comments"></i> Live chat
    </div>
    <div class="col-sm-2 col-6 text-center">
        <i class="fa fa-facebook-square"></i>
        <i class="fa fa-twitter-square"></i>
        <i class="fa fa-instagram"></i>
        <i class="fa fa-google-plus-square"></i>
        <i class="fa fa-linkedin"></i>
    </div>
        <?php
            if (isset($_SESSION['email']) && !empty($_SESSION['email'])) {
        ?>
            <div class="col-sm-3 col-6 login">
                <a href="dashboard.php" class="text-white">My Profile</a>&nbsp; &nbsp;
                <a href="logout.php" class="text-white">Logout</a>
            </div>
        <?php
            }
            else{
        ?>
        <div class="col-sm-3 col-6 login">
        <a href="#!" class="text-white" data-toggle="modal" data-target="#login">Login</a> &nbsp; &nbsp;
        <a href="#!" class="text-white" data-toggle="modal" data-target="#register">Sign Up</a>
        <?php
            }
        ?>
    </div>
</div>

<nav class="navbar navbar-expand-lg nav-bar navbar-light bg-light">
    <div class="container">
        <a class="navbar-brand" href="index.php">RentMyHouse</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto navi">
                <li class="nav-item">
                    <a class="nav-link nav-btn" href="index.php">HOME</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link nav-btn" href="" data-toggle="modal" data-target="#update">UPDATE PROFILE</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link nav-btn" href="#booked">BOOKED PROPERTIES</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link nav-btn" href="#contact">CONTACT</a>
                </li>
            </ul>
        </div>
    </div>
</nav>


<div class="white">
    <div class="container" id="booked">
            <div class="heading animate-box">
                <h2><b>Your Booked Properties</b></h2><br><br>
                <?php if(mysqli_num_rows($query)>0){ ?>
                <div class="row">
                    <?php

                        while($rows=mysqli_fetch_assoc($query)){
                            $property_id = $rows['House_No'];
                    ?>
                    <div class="col-sm-4" data-animate-effect="fadeInLeft">
                        <div class="price-box animate-box">
                        <?php 
                            $sql2="SELECT * FROM property_list WHERE House_No='$property_id'";
                            $query2 = mysqli_query($db, $sql2) or trigger_error("Query Failed! SQL: $sql2 - Error: ".mysqli_error($db), E_USER_ERROR);
                            if(mysqli_num_rows($query2)>0)
                                {
                                    $row=mysqli_fetch_assoc($query2); 
                                    $photo=$row['dp'];
                        
                            echo'<img class="card-img-top" src="'.$photo.'" alt="">';
                            }?>
                            <div><?php echo $row['p_name']?></div>
                            <br>
                            <?php echo '<a href="property.php?House_No='.$rows['House_No'].'"  class="btn btn-banner" >View Property </a>'; ?>
                        </div>
                        
                    </div>
                    <?php 
                            }
                        }
                    ?>
                </div>
            </div>
    </div>
</div>

<?php
    include("contact.php");
    include("footer.php");
?>








   <!--<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
        crossorigin="anonymous"></script>-->
        <script src="./js/jquery.min.js"></script>
    <!--<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>-->
    <script src="./js/bootstrap.min.js"></script>
    <!--<script src="https://use.fontawesome.com/8e45396e2e.js"></script>-->
    <script src="./js/fontawesome.js"></script>
    <script src="./js/jquery.waypoints.min.js"></script>
    <script src="./js/animate.js"></script>

</body>

</html>