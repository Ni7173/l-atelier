<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require '/vendor/autoload.php';
require '/../secure/config.php';

use vendor\PHPMailer\src\PHPMailer.php;
use vendor\PHPMailer\src\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $tel = filter_var($_POST['tel'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);

    $message = nl2br(htmlspecialchars($_POST['message'], ENT_QUOTES, 'UTF-8'));

    $to_email = $smtp_username;
    $subject = "Message de $name";

    $send_result = sendEmail($to_email, $subject, $name, $tel, $email, $message);

    if ($send_result === true) {
        header("Location: /pages/thank-you.html");
        exit();
    } else {
        echo "L'email n'a pas pu être envoyé. Erreur : $send_result";
    }
} else {
    header("Location: index.html");
    exit();
}

?>
