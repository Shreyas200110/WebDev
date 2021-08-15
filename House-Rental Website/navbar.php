<!DOCTYPE html>
<html lang="en">

<head>
    <title>Example</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">-->
    <link rel="stylesheet" href="./css/bootstrap.min.css">
    <link rel="stylesheet" href="./css/style.css">
    <link rel="stylesheet" href="./css/animate.css" />
    <link href="https://fonts.googleapis.com/css?family=Raleway:400,700" rel="stylesheet">
    <script src="./js/modernizr-3.5.0.min.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
</head>

<body>
<?php
    include("modals.php");
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
        <a class="navbar-brand" href="#">RentMyHouse</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto navi">
                <li class="nav-item">
                    <a class="nav-link nav-btn active" href="index.php">HOME</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link nav-btn" href="#features">REVIEWS</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link nav-btn" href="#team">ABOUT US</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link nav-btn" href="#contact">CONTACT</a>
                </li>
            </ul>
        </div>
    </div>
</nav>


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