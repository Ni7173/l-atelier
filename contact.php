<?php
// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form fields data
    $name = $_POST['name'];
    $message = $_POST['message'];
    $tel = $_POST['tel'];
    $email = $_POST['email'];

    // Email address where you want to receive the form submission
    $to_email = "nino.bravais20@gmail.com";

    // Email subject
    $subject = "New Contact Form Submission";

    // Email message
    $email_message = "Name: $name\n";
    $email_message .= "Message: $message\n";
    $email_message .= "Telephone: $tel\n";
    $email_message .= "Email: $email\n";

    // Send email
    if (mail($to_email, $subject, $email_message)) {
        // Email sent successfully
        echo "Thank you for your message. We'll get back to you soon!";
    } else {
        // Error sending email
        echo "Oops! Something went wrong. Please try again later.";
    }
} else {
    // If form is not submitted, redirect to the contact page
    header("Location: index.html");
    exit;
}
?>
