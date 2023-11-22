<?php
// Vérifiez si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  
  // Replacez ceci par votre véritable adresse e-mail de réception
  $receiving_email_address = 'jeanlucrakotoarimanana461@gmail.com';
  
  // Incluez la bibliothèque "PHP Email Form" si elle existe
  if (file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php')) {
    include($php_email_form);
  } else {
    die('Impossible de charger la bibliothèque "PHP Email Form"!');
  }
  
  // Initialisez la classe PHP_Email_Form
  $contact = new PHP_Email_Form;
  $contact->ajax = true;

  // Configurez les détails de l'e-mail
  $contact->to = $receiving_email_address;
  $contact->from_name = $_POST['name'];
  $contact->from_email = $_POST['email'];
  $contact->subject = $_POST['subject'];

  // Décommentez le code ci-dessous si vous souhaitez utiliser SMTP pour envoyer des e-mails. Vous devez entrer vos informations d'identification SMTP correctes.
  /*
  $contact->smtp = array(
    'host' => 'example.com',
    'username' => 'example',
    'password' => 'pass',
    'port' => '587'
  );
  */

  // Ajoutez les messages au corps de l'e-mail
  $contact->add_message($_POST['name'], 'From');
  $contact->add_message($_POST['email'], 'Email');
  $contact->add_message($_POST['message'], 'Message', 10);

  // Envoyez l'e-mail et affichez le résultat
  echo $contact->send();
} else {
  // Si le formulaire n'a pas été soumis, redirigez vers la page du formulaire ou effectuez d'autres actions nécessaires
  header("Location: formulaire.php");
  exit();
}
?>
