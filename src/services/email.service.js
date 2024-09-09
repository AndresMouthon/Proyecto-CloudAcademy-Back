const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "andresdomingomouthon541@gmail.com",
    pass: "skvcttdejgrdktvc",
  },
});

const sendVerificationEmail = (email = "", code = 0, password = "") => {
  let emailSection = "";
  if (password !== "") {
    emailSection = `
      <div style="background-color: #85D539; padding: 15px; border-radius: 5px; margin-top: 20px;">
        <h2 style="color: #333;">Su Cuenta</h2>
        <p style="font-size: 18px; color: white;"><strong>Email: ${email}</strong></p>
        <p style="font-size: 18px; color: white;"><strong>Clave: ${password}</strong></p>
      </div>
    `;
  }
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email || process.env.DEFAULT_EMAIL,
    subject: 'Código de verificación',
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
        <h1 style="color: #333;">¡Registro Exitoso!</h1>
        <p style="font-size: 16px; color: #555;">Gracias por registrarse en nuestra plataforma. A continuación, encontrará su código de verificación.</p>
        <div style="background-color: #01AFE4; padding: 15px; border-radius: 5px; margin-top: 20px;">
          <h2 style="color: #333;">Código de Verificación</h2>
          <p style="font-size: 18px; color: white;"><strong>${code}</strong></p>
        </div>
        ${emailSection}
      </div>
    `,
  };
  return transporter.sendMail(mailOptions);
};


module.exports = sendVerificationEmail;
