<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $message = $_POST['message'];
    $tel = $_POST['tel'];
    $email = $_POST['email'];

    $to_email = "contact@latelier-8.fr";
    
    $subject = "Nouveau message de $name";

    $email_message = "Name: $name\n";
    $email_message .= "Message: $message\n";
    $email_message .= "Telephone: $tel\n";
    $email_message .= "Email: $email\n";

    $headers = "From: L'Atelier 8 <noreply@latelier-8.fr>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    if (mail($to_email, $subject, $email_message, $headers)) {
        header("Location: /pages/thank-you.html");
        exit();
    } else {
        echo "Oops! Something went wrong. Please try again later.";
    }
} else {
    header("Location: index.html");
    exit();
}
?>
