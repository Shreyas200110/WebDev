<?php 
include("server.php");
 ?>

<div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content wrap-login100">
              <button type="button" class="close d-flex flex-row-reverse m-l-4" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <span class="login100-form-title p-b-34 p-t-20">
						      Log in
					    </span>
            <div class="modal-body">
                <form method="POST">
                    <div class="wrap-input100">
                        <input class="input100" type="email" name="email" placeholder="Email" required>
                        <span class="focus-input100" data-placeholder="&#xf207;"></span>
                    </div>
                    <div class="wrap-input100 ">
                        <input class="input100" type="password" name="password" placeholder="Password" required>
                        <span class="focus-input100" data-placeholder="&#xf191;"></span>
                    </div>
                    <div class="login100-form-btn justify-content-center">
                        <button type="submit" name="login">Login</button>
                    </div>
                </form>
            </div>
          </div>
        </div>
      </div>





      <div class="modal fade" id="register" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content wrap-login100">
              <button type="button" class="close d-flex flex-row-reverse m-l-4" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <span class="login100-form-title p-b-34 p-t-20">
						      Register
					    </span>
            <div class="modal-body">
                <form method="POST">
                    <div class="wrap-input100 ">
                        <input class="input100" type="text" name="name" placeholder="Name" required>
                        <span class="focus-input100" data-placeholder="&#xf207;"></span>
                    </div>
                    <div class="wrap-input100 ">
                        <input class="input100" type="email" name="email" placeholder="Email" required>
                        <span class="focus-input100" data-placeholder="&#xf207;"></span>
                    </div>
                    <div class="wrap-input100 ">
                        <input class="input100" type="password" name="password" placeholder="Password" required>
                        <span class="focus-input100" data-placeholder="&#xf191;"></span>
                    </div>
                    <div class="login100-form-btn justify-content-center">
                        <button type="submit" name="register">Register</button>
                    </div>
                </form>
            </div>
          </div>
        </div>
      </div>





      <div class="modal fade" id="update" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content wrap-login100">
              <button type="button" class="close d-flex flex-row-reverse m-l-4" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <span class="login100-form-title p-b-34 p-t-20">
						      Update Profile
					    </span>
            <div class="modal-body">
                <form method="POST">
                    <div class="wrap-input100 ">
                        <input class="input100" type="text" name="name" placeholder="Updated Name" required>
                        <span class="focus-input100" data-placeholder="&#xf207;"></span>
                    </div>
                    <div class="wrap-input100 ">
                        <input class="input100" type="email" name="email" placeholder="Updated Email" required>
                        <span class="focus-input100" data-placeholder="&#xf207;"></span>
                    </div>
                    <div class="login100-form-btn justify-content-center">
                        <button type="submit" name="update">UPDATE</button>
                    </div>
                </form>
            </div>
          </div>
        </div>
      </div>
      
