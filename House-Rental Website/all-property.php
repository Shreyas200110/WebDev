<?php 
session_start();
isset($_SESSION["email"]);
include("config/config.php");
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
    include("navbar.php");
    $sql = "SELECT * from property_list";
    $query = mysqli_query($db, $sql) or trigger_error("Query Failed! SQL: $sql - Error: ".mysqli_error($db), E_USER_ERROR);
    if(mysqli_num_rows($query)>0){
?>

<div class="smoke">
        <div class="container">
            <div class="heading animate-box">
                <h2><b>All Properties</b></h2>
            </div>
            <div class="text-center animate-box">
                <h3>Rent your dream house</h3>
            </div>
            <br><br>
            <div class="row">
            <?php
                while($rows=mysqli_fetch_assoc($query)){
                    $property_id = $rows['House_No'];
            ?>
                <div class="col-sm-4" style="padding-bottom:25px"data-animate-effect="fadeInLeft">
                    <div class="price-box animate-box">
                    <?php 
                        $sql2="SELECT * FROM property_list WHERE House_No='$property_id'";
                        $query2 = mysqli_query($db, $sql2) or trigger_error("Query Failed! SQL: $sql2 - Error: ".mysqli_error($db), E_USER_ERROR);
                        if(mysqli_num_rows($query2)>0)
                            {
                                $row=mysqli_fetch_assoc($query2); 
                                $photo=$row['dp'];
                    
                        echo'<img class="card-img-top" style="height:317px"  src="'.$photo.'" alt="">';
                         }?>
                        <div><?php echo $rows['p_name']?></div>
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
