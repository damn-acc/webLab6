<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if ($data && isset($data['link'])) {
        $links = file_exists('links.json') ? json_decode(file_get_contents('links.json'), true) : [];
        $links[] = $data['link'];
        file_put_contents('links.json', json_encode($links));
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error"]);
    }
}
?>
