module.exports.signUpErrors = (err) => {
    let errors = { lastName: "",firsttName: "", email: "", password: "" };
  
    if (err.message.includes("lastName"))
      errors.name = "Veuillez renseigner votre nom";

    if (err.message.includes("firstName"))
      errors.name = "Veuillez renseigner votre prénom";
  
    if (err.message.includes("email")) errors.email = "Email incorrect";
  
    if (err.message.includes("password"))
      errors.password = "Le mot de passe doit faire 6 caractères minimum";
  
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
      errors.email = "Cet email est déjà enregistré";
  
    return errors;
  };
  
  module.exports.signInErrors = (err) => {
    let errors = { email: '', password: ''}
  
    if (err.message.includes('email')){

      // ) 
      errors.email = "Email inconnu";
    }
    
    if (err.message.includes('password'))
      errors.password = "Le mot de passe est érroné"
  
    return errors;
  }
  
  module.exports.uploadErrors = (err) => {
    let errors = { format: '', maxSize: ""};
  
    if (err.message.includes('invalid file'))
      errors.format = "Format incompatabile";
  
    if (err.message.includes('max size'))
      errors.maxSize = "Le fichier dépasse la taille maximale";
  
    return errors
  }