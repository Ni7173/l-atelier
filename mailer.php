<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'path/to/PHPMailer/src/Exception.php';
require 'path/to/PHPMailer/src/PHPMailer.php';
require 'path/to/PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars($_POST['message'], ENT_QUOTES, 'UTF-8');
    $tel = htmlspecialchars($_POST['tel'], ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars($_POST['email'], ENT_QUOTES, 'UTF-8');

    // Adresse email du destinataire
    $to_email = "contact@latelier-8.fr";
    
    // Sujet de l'email
    $subject = "Message de $name";

    // Initialiser PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Paramètres du serveur
        $mail->isSMTP();
        $mail->Host = 'smtp.hostinger.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'contact@latelier-8.fr'; // Remplacez par votre adresse email SMTP
        $mail->Password = 'Jaifaim2latelier8/+'; // Remplacez par votre mot de passe email SMTP
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Activer le chiffrement TLS
        $mail->Port = 465; // Port SMTP

        // Destinataires
        $mail->setFrom('noreply@latelier-8.fr', 'L\'Atelier 8');
        $mail->addAddress($to_email); // Ajouter le destinataire
        // $mail->addReplyTo($email, $name); // Ajouter une adresse de réponse

        // Contenu de l'email
        $mail->isHTML(true); // Set email format to HTML
        $mail->Subject = $subject;
        $mail->Body    = "<html><body>
                             <p><strong>Name:</strong> $name</p>
                             <p><strong>Telephone:</strong> $tel</p>
                             <p><strong>Email:</strong> $email</p>
                             <p><strong>Message:</strong><br>$message</p>
                          </body></html>";
        $mail->AltBody = "Name: $name\nTelephone: $tel\nEmail: $email\n\nMessage: $message";

        $mail->send();
        header("Location: /pages/thank-you.html");
        exit();
    } catch (Exception $e) {
        echo "L'email n'a pas pu être envoyé. Erreur de PHPMailer: {$mail->ErrorInfo}";
    }
} else {
    // Redirection vers la page d'accueil si le formulaire n'est pas soumis
    header("Location: index.html");
    exit();
}
?>
