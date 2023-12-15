<?php
// Assuming you have a database connection established

// Get the user input from the search bar
$searchTerm = $_POST['search'];

// Prepare the SQL statement using parameterized queries
$sql = "SELECT * FROM products WHERE name LIKE :searchTerm";
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':searchTerm', '%' . $searchTerm . '%', PDO::PARAM_STR);

// Execute the statement
$stmt->execute();

// Fetch the results
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Process the results as needed
// ...
?>