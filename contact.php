<?php
// if ($_SERVER["REQUEST_METHOD"] == "POST") {
//     $name = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
//     $message = htmlspecialchars($_POST['message'], ENT_QUOTES, 'UTF-8');
//     $tel = htmlspecialchars($_POST['tel'], ENT_QUOTES, 'UTF-8');
//     $email = htmlspecialchars($_POST['email'], ENT_QUOTES, 'UTF-8');

//     $to_email = "contact@latelier-8.fr";
    
//     $subject = "Nouveau message de $name";

//     $email_message = "<html><body>";
//     $email_message .= "<p><strong>Name:</strong> $name</p>";
//     $email_message .= "<p><strong>Telephone:</strong> $tel</p>";
//     $email_message .= "<p><strong>Email:</strong> $email</p>";
//     $email_message .= "<p><strong>Message:</strong><br>$message</p>";
//     $email_message .= "</body></html>";

//     $headers = "From: " . $email . "\r\n";
//     $headers .= "Reply-To: " . $email . "\r\n";
//     $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
//     $headers .= "X-Mailer: PHP/" . phpversion();

//     if (mail($to_email, $subject, $email_message, $headers)) {
//         header("Location: /pages/thank-you.html");
//         exit();
//     } else {
//         echo "Oops! Something went wrong. Please try again later.";
//     }
// } else {
//     header("Location: index.html");
//     exit();
// }

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Échapper toutes les données reçues du formulaire
    $name = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars($_POST['message'], ENT_QUOTES, 'UTF-8');
    $tel = htmlspecialchars($_POST['tel'], ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars($_POST['email'], ENT_QUOTES, 'UTF-8');

    // Adresse email du destinataire
    $to_email = "test-c19y6e07d@srv1.mail-tester.com";
    
    // Sujet de l'email
    $subject = "Nouveau message de $name";

    // Message de l'email en HTML
    $html_message = "<html><body>";
    $html_message .= "<p><strong>Name:</strong> $name</p>";
    $html_message .= "<p><strong>Telephone:</strong> $tel</p>";
    $html_message .= "<p><strong>Email:</strong> $email</p>";
    $html_message .= "<p><strong>Message:</strong><br>$message</p>";
    $html_message .= "</body></html>";

    // Message de l'email en texte brut
    $text_message = "Name: $name\n";
    $text_message .= "Telephone: $tel\n";
    $text_message .= "Email: $email\n\n";
    $text_message .= "Message: $message\n";

    // En-têtes de l'email
    $boundary = md5("random"); // pour les emails multipart
    $headers = "From: L'Atelier 8 <noreply@latelier-8.fr>\r\n";
    $headers .= "Return-Path: bounce@latelier-8.fr\r\n"; // Utiliser une adresse de rebond valide
    $headers .= "Reply-To: contact@latelier-8.fr\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/alternative; boundary=$boundary\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Message combiné (HTML et texte brut)
    $email_message = "--$boundary\r\n";
    $email_message .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $email_message .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $email_message .= chunk_split(base64_encode($text_message));
    $email_message .= "--$boundary\r\n";
    $email_message .= "Content-Type: text/html; charset=UTF-8\r\n";
    $email_message .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $email_message .= chunk_split(base64_encode($html_message));
    $email_message .= "--$boundary--";

    // Envoyer l'email
    if (mail($to_email, $subject, $email_message, $headers)) {
        header("Location: /pages/thank-you.html");
        exit();
    } else {
        echo "Oops! Something went wrong. Please try again later.";
    }
} else {
    // Redirection vers la page d'accueil si le formulaire n'est pas soumis
    header("Location: index.html");
    exit();
}
?>