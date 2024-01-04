<?php
$is_invalid = false;
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $mysqli = require __DIR__ . "/database.php";
    $sql= sprintf("SELECT * FROM user
           WHERE email = '%s'",
           $mysqli->real_escape_string($_POST["email"]));
    $result = $mysqli->query($sql);
    $user = $result->fetch_assoc();
    if ($user) {
        if (password_verify($_POST["password"], $user["password_hash"])) {
            session_start();
            session_regenerate_id();
            $_SESSION["user_id"] = $user["id"];
            header("Location: welcome.php");
            exit;
        }
    }
    $is_invalid = true;
}

?>
<!DOCTYPE html>
<html>
<div class=Container2>
    <head>
        <title>Login</title>
        <meta charset="UTF-8">
        <link rel = "stylesheet" href="loginstyle.css"/>
    </head>
    <body>
        
        <div class="header">
            <h1>Login</h1>
            <?php if ($is_invalid): ?>
            <em>Invalid Login</em>
        <?php endif; ?>
        </div>
        <form method="post">
            <div class="input-container">
            <label for="email">Email</label>
            <input type="email" name= "email" id="email" value="<?= htmlspecialchars($_POST["email"] ?? "")?>"><br>
            </div>
            <div class = "input-container">
            <label for="password">Password</label>
            <input type="password" name="password" id="password">
            </div>
            <div class = "button">
                 <button type = "submit">Login</button>&nbsp
                 <button type ="button" onclick="location.href='signup.php';">Sign up</button>
            </div>
        </form>
        
    </body>
    </div>
</html>