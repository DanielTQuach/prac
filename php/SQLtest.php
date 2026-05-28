<?php
$servername = "localhost";
$username = "root";
$password = ""; // XAMPP default
$dbname = "testdb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

echo "Connected succesfully";

$sql = "SELECT" * FROM services";
$result = $conn->query($sql);

<!DOCTYPE html>
<html>
<head><title>Booking Service</titlle></head>
<body>
    <h1>Book an Appointment</h1>
    <form action="book.php" method="POST">
        <label>Select Service:</label>
        <select name="serice_id" required>
            <?php while($row = $result->fetch_assoc()) { ?>
                <option value="<?php echo $row['id']; ?>">
                    <?php echo $row['name']; ?> - $<?php echo $row['price']; ?>
                </option>
            <?php } ?>
        </select>
        <br><br>
        <label>Date & Time:</label>
        <input type="datetime-local" name="booking_time" required>
        <br><br>
        <input type="text" name="customer_name" placeholder="Your Name" required>
        <input type="email" name="customer_email" placeholder="Your Email" required>
        <br><br>
        <button type="submit">Book Now</button>
    </form>

    
</body>
</html>
?>