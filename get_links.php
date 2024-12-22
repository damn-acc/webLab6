<?php
if (file_exists('links.json')) {
    $links = json_decode(file_get_contents('links.json'), true);
    echo json_encode(["links" => $links]);
} else {
    echo json_encode(["links" => []]);
}
?>
