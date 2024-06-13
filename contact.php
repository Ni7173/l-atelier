<?php
// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form fields data
    $name = $_POST['name'];
    $message = $_POST['message'];
    $tel = $_POST['tel'];
    $email = $_POST['email'];

    // Email address where you want to receive the form submission
    $to_email = "contact@latelier-8.fr";

    // Email subject
    $subject = "Nouveau message";

    // Email message
    $email_message = "Nom: $name\n";
    $email_message .= "Message: $message\n";
    $email_message .= "Telephone: $tel\n";
    $email_message .= "Email: $email\n";

    // Send email
    if (mail($to_email, $subject, $email_message)) {
        header("Location: /html/thank-you.html");
    } else {
        echo "Oops! Something went wrong. Please try again later.";
    }
} else { 
    // If form is not submitted, redirect to the contact page
    header("Location: index.html");
    exit;
}
?>
