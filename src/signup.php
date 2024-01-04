<!DOCTYPE html>
<html>
    <head>
        <title>Signup</title>
        <meta charset="UTF-8">
        <link rel = "stylesheet" href="loginstyle.css"/>
        <script src="https://unpkg.com/just-validate@latest/dist/just-validate.production.min.js" defer></script>
        <script src="validation.js" defer></script>
    </head>
    <body>
        <div class="Container">
            <div class="header">
                <h1>Signup</h1>
            </div>
        <form action = "process-signup.php" method="post" id="signup" novalidate>
            <div class = "form">
                <label>Username</label><br>
                <input type = "text" id= "Username" name="Username">
            </div>
            <div class = "form">
                <label for= "email">Email</label><br>
                <input type="email" id="email" name="email">
            </div>
            <div class = "form">
                <label for="password">Password</label><br>
                <input type="password" id="password" name="password">
            </div>
            <div class = "form">
                <label for="Password-confirmation">Repeat Password</label><br>
                <input type="password" id="password-confirmation" name = "password-confirmation"> 
            </div>
            <div class="button">
                <br><button type="submit">Submit</button>&nbsp
                <button type = "submit" onclick="location.href='login.php';">Login</button>
            </div>
           
        </form>
    </div>
    </body>
</html>