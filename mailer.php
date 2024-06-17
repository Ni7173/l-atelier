<?php
require '/home/annebonnet/secure/config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars($_POST['message'], ENT_QUOTES, 'UTF-8');
    $tel = htmlspecialchars($_POST['tel'], ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars($_POST['email'], ENT_QUOTES, 'UTF-8');

    $to_email = "contact@latelier-8.fr";
    $subject = "Message de $name";

    // Envoyer l'email en utilisant la fonction définie dans config.php
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
