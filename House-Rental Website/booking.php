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
    <link rel="stylesheet" href="./css/booking.css">
    <!--===============================================================================================-->
    <link href="https://fonts.googleapis.com/css?family=Raleway:400,700" rel="stylesheet">
    <script src="./js/modernizr-3.5.0.min.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
</head>
<body>
<?php
    include("config/config.php");
    include("navbar.php");
    include("server.php");
    $House_No = $_GET['House_No'];

    $sql2 = "SELECT * FROM book WHERE House_No ='$House_No'";
    $query2 = mysqli_query($db, $sql2) or trigger_error("Query Failed! SQL: $sql2 - Error: ".mysqli_error($db), E_USER_ERROR);
?>


<div class="container contact-form">
            <div class="contact-image">
                <img src="./img/rocket_contact.png" alt="rocket_contact"/>
            </div>
            <form method="post">
                <h3>Enter the Details of buyer</h3>
               <div class="row">
                    <form <?php echo 'action="property.php?House_No='.$House_No.'"'; ?> method="POST" >
                        <div class="col-md-6">
                            <div>
                                <?php echo '<input type="hidden" name="House_No"  value="'.$House_No.'">'; ?>
                            </div>
                            <div class="form-group">
                                <input type="text" name="name" class="form-control" placeholder="Buyer's Name *" value="" required>
                            </div>
                            <div class="form-group">
                                <input type="phone" name="phone" class="form-control" placeholder="Buyer's Phone Number *" value="" required>
                            </div>
                            <div class="form-group">
                                <input type="text" name="aadhar" class="form-control" placeholder="Buyer's Identity Number *" value="" required>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <textarea name="msg" class="form-control" placeholder="Your Message *" style="width: 100%; height: 150px;" required></textarea>
                            </div>
                        </div>
                        <div class="col-md-3 form-group">
                            <input type="submit" name="book" class="btnContact" value="Submit" >&nbsp;
                            <?php echo '<a href="property.php?House_No='.$House_No.'"  class="btn " >Close</a>'; ?>
                        </div>
                    </form>
                </div>
            </form>
</div>

</body>
</html>
