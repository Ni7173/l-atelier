<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars($_POST['message'], ENT_QUOTES, 'UTF-8');
    $tel = htmlspecialchars($_POST['tel'], ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars($_POST['email'], ENT_QUOTES, 'UTF-8');

    $to_email = "contact@latelier-8.fr";
    
    $subject = "Nouveau message de $name";

    $email_message = "Name: $name\n";
    $email_message .= "Telephone: $tel\n";
    $email_message .= "Email: $email\n\n";
    $email_message .= "Message: $message\n";

    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
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
