<?php 
session_start();
isset($_SESSION["email"]);
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
    <link rel="stylesheet" href="./css/animate.css">
    <!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/bootstrap/css/bootstrap.min.css">
    <!--===============================================================================================-->
        <link rel="stylesheet" type="text/css" href="fonts/iconic/css/material-design-iconic-font.min.css">
    <!--===============================================================================================-->
        <link rel="stylesheet" type="text/css" href="vendor/animate/animate.css">
    <!--===============================================================================================-->	
        <link rel="stylesheet" type="text/css" href="vendor/css-hamburgers/hamburgers.min.css">
    <!--===============================================================================================-->
        <link rel="stylesheet" type="text/css" href="vendor/animsition/css/animsition.min.css">
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
    include("server.php");
    include("modals.php");
    include("navbar.php");

    $House_No = $_GET['House_No'];
    $sql = "SELECT * FROM property_list WHERE House_No ='$House_No'";
    $sql2 = "SELECT * FROM book WHERE House_No ='$House_No'";
    $query = mysqli_query($db, $sql) or trigger_error("Query Failed! SQL: $sql - Error: ".mysqli_error($db), E_USER_ERROR);
    $query2 = mysqli_query($db, $sql2) or trigger_error("Query Failed! SQL: $sql2 - Error: ".mysqli_error($db), E_USER_ERROR);
    $rows=mysqli_fetch_assoc($query);
?>


<div class="smoke">
        <div class="container">
            <div class="heading animate-box">
                <h2><b>Property Description</b></h2>
            </div>
            <br><br>
                <div class=" animate-box">
                    <h3><b><?php echo $rows['p_name'] ;?></b></h3>
                </div>
                
                <div class="animate-box">
                    <h3>2BHK Apartment</h3>
                </div>
                <div data-animate-effect="fadeInLeft">
                    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                        <ol class="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        </ol>
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                            <?php echo '<img class="d-block w-100" style="height:600px"  src="'.$rows['p_photo1'].'" alt="Third slide">';?>
                            </div>
                            <div class="carousel-item">
                            <?php echo '<img class="d-block w-100" style="height:600px"  src="'.$rows['p_photo2'].'" alt="Third slide">';?>
                            </div>
                            <div class="carousel-item">
                            <?php echo '<img class="d-block w-100" style="height:600px"  src="'.$rows['p_photo3'].'" alt="Third slide">';?>
                            </div>
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                </div>
                <br><br>
                <div class="animate-box text-center orange">
                <?php 
                    if(isset($_SESSION["email"])){
                        if (mysqli_num_rows($query2)>0) {
                            echo '<h3><b>This Property has been already booked!!<b></h3>';
                        }
                        else{
                            echo '<h3><a class = "orange text-decoration-none fs-25" href="booking.php?House_No='.$House_No.'"><b>BOOK NOW!!<b></a></h3>';
                        }
                    }
                    else{
                        echo '<h3><a href="" class="orange text-decoration-none fs-25" data-toggle="modal" data-target="#login"><b>LOG IN<b></a> to book this property!!</h3>';
                    }
                        ?>
                </div>
        </div>
</div>

<div class="white">
        <div class="container" id="fh5co-features">
            <div class="animate-box ">
                <h3><b>More About the Property</b></h3>
            </div>
            <div class="animate-box ">
                    <br>
                    <table width="100%">
                        <tr>
                            <td><h5><b>House Name</b></h5></td>
                            <td><h5><?php echo $rows['p_name'] ;?></h5></td>
                        </tr>
                        <tr>
                            <td><h5><b>Address : </b></h5></td>
                            <td><h5><?php echo $rows['p_address'] ;?></h5></td>
                        </tr>
                        <tr>
                            <td><h5><b>Build Area : </b></h5></td>
                            <td><h5><?php echo $rows['p_buildArea'] ;?></h5></td>
                        </tr>
                        <tr>
                            <td><h5><b>Contact Info: </b></h5></td>
                            <td><h5><?php echo $rows['p_info'] ;?></h5></td>
                        </tr>
                        <tr>
                            <td><h5><b>Estimated Price : </b></h5></td>
                            <td><h5><?php echo $rows['p_price'] ;?></h5></td>
                        </tr>
                    </table>
                    
                </div>

        </div>
</div>
<?php
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
