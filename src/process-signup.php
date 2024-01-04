
<?php
if (empty($_POST["Username"])) {
    die("Name is required");
}
if (! filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
    die("Valid email is required");
} //validate if it's an email address with @
 
if (strlen($_POST["password"]) < 6) {
    die("Password must be at least 6 characters");
}

if (! preg_match("/[a-z]/i", $_POST["password"])) {
    die("Password must contain at least one letter");
}

if (! preg_match("/[0-9]/i", $_POST["password"])) {
    die("Password must contain at least one number");
}

if ($_POST["password"] !== $_POST["password-confirmation"]) {
    die("Passwords don't match");
}

$password_hash = password_hash($_POST["password"], PASSWORD_DEFAULT);

$mysqli = require __DIR__ . "/database.php"; //connecting to mySQL database

$sql = "INSERT INTO user (username, email, password_hash)
        VALUES (?, ?, ?)";

$stmt = $mysqli->stmt_init();

if ( ! $stmt->prepare($sql)) {
    die("SQL error " . $mysqli->error);
} //preparing sql statement

$stmt->bind_param("sss", $_POST["Username"], $_POST["email"], $password_hash);
if ($stmt->execute()) {
    header("Location: signup-success.html");
    exit;
} else {
    if ($mysqli->errno() === 1062) {
        die("Username already taken");
    } else {
    die($mysqli->error . " " . $mysqli->errno);
    }
}

