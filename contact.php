<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars($_POST['message'], ENT_QUOTES, 'UTF-8');
    $tel = htmlspecialchars($_POST['tel'], ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars($_POST['email'], ENT_QUOTES, 'UTF-8');

    $to_email = "contact@latelier-8.fr";
    
    $subject = "Nouveau message de $name";

    $email_message = "<html><body>";
    $email_message .= "<p><strong>Name:</strong> $name</p>";
    $email_message .= "<p><strong>Telephone:</strong> $tel</p>";
    $email_message .= "<p><strong>Email:</strong> $email</p>";
    $email_message .= "<p><strong>Message:</strong><br>$message</p>";
    $email_message .= "</body></html>";

    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
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
