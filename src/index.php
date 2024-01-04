<?php
session_start();

//var_dump($_POST);
//$connect = new PDO("mysql:host=localhost;dbname=login_db", "root", "");
$db = mysqli_connect('localhost', 'root', '', 'login_db');


?>

<!DOCTYPE html>
<html lang = "en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>To Do Application</title>
    <link rel = "stylesheet" href="style.css?v=<?php echo time(); ?>">
</head>
<body>
    <div class = "container">
        <div class = "todo-header">
            <h2>ToDo List</h2>  
        </div>
        <form method="POST" action="index.php">
        <?php if (isset($errors)) { ?>
        <p><?php echo $errors; ?></p>
        <?php } ?>
        <div class ="todo-body">
            <input 
            type= "text"
            id= "todoText"
            name="task"
            class= "todo-input"
            placeholder= "Add your items"
            />
            <img 
            src= "https://static.vecteezy.com/system/resources/previews/000/583/100/original/vector-button-plus-icon.jpg"
            alt= "+"
            id="submit"
            onClick = "submit"
            />
        </div>
</form>
<h5 id="Alert"></h5>
        <ul id="list-items" class="list-items"></ul>
        <button type= "submit" onclick="location.href='logout.php';">Log out</button>
<div>
</div>

        
    </div>
    </div>
    <script type="text/javascript" src="App.js"></script>
</body>


</html>