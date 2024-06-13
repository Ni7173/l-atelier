<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $message = htmlspecialchars($_POST['message']);
    $tel = htmlspecialchars($_POST['tel']);
    $email = htmlspecialchars($_POST['email']);

    $to_email = "contact@latelier-8.fr";
    
    $to_email = base64_encode("contact@latelier-8.fr");

    $subject = "Nouveau message de $name";

    $email_message = "Name: $name\n";
    $email_message .= "Message: $message\n";
    $email_message .= "Telephone: $tel\n";
    $email_message .= "Email: $email\n";

    $headers = "From: L'Atelier 8 <noreply@latelier-8.fr>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    if (mail($to_email, $subject, $email_message, $headers)) {
        header("Location: /html/thank-you.html");
        exit();
    } else {
        echo "Oops! Something went wrong. Please try again later.";
    }
} else {
    header("Location: index.html");
    exit();
}
?>
