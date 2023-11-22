<?php
// Vérifiez si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  
  // Replacez ceci par votre véritable adresse e-mail de réception
  $receiving_email_address = 'jeanlucrakotoarimanana461@gmail.com';

  // Récupérez les données du formulaire
  $name = $_POST['name'];
  $email = $_POST['email'];
  $subject = $_POST['subject'];
  $message = $_POST['message'];

  // Construisez le corps du message
  $email_body = "Nom: $name\n";
  $email_body .= "Email: $email\n";
  $email_body .= "Objet: $subject\n\n";
  $email_body .= "Message:\n$message";

  // En-têtes pour l'e-mail
  $headers = "From: $email";

  // Utilisez la fonction mail() pour envoyer l'e-mail
  if (mail($receiving_email_address, $subject, $email_body, $headers)) {
    // Succès
    echo 'Votre message a été envoyé avec succès. Merci pour votre confiance!';
  } else {
    // Échec
    echo 'Erreur lors de l\'envoi du message. Veuillez réessayer plus tard.';
  }
} else {
  // Si le formulaire n'a pas été soumis, redirigez vers la page du formulaire ou effectuez d'autres actions nécessaires
  header("Location: formulaire.php");
  exit();
}
?>
