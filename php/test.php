<?php
$name = "PHP test";
$numbers = [1, 2, 3, 4, 5];

echo "<h1>$name</h1>";

if (count($numbers) > 3) {
    echo "<p>The array has more than 3 items.</p>";
} else {
    echo "<p>The array has 3 or fewer items.</p>";
}

echo "<ul>";
foreach ($numbers as $n) {
    echo "<li>Number: $n</li>";
}

echo "</ul>";

for ($i = 0; $i < 3; $i++) {
    echo "<p>Loop iteration: $i</p>";
}
?>