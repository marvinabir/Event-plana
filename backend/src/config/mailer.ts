// emailService.ts
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Function to send a registration email
 * @param email 
 * @param name 
 */
export const sendRegistrationEmail = async (email: string, name: string) => {
  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Set email options
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: 'Welcome to Our Service',
    text: `Hello ${name},\n\nThank you for registering!\n\nBest regards,\nYour Company`,
  };

  // Send email
  await transporter.sendMail(mailOptions);
};






// // emailService.ts
// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// dotenv.config();

// /**
//  * Function to send a registration email
//  * @param email 
//  * @param name 
//  */
// export const sendRegistrationEmail = async (email: string, name: string) => {
//   // Create a transporter object using the default SMTP transport
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_ADDRESS,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

//   // Set email options
//   const mailOptions = {
//     from: process.env.EMAIL_ADDRESS,
//     to: email,
//     subject: 'Welcome to Our Service',
//     text: `Hello ${name},\n\nThank you for registering!\n\nBest regards,\nYour Company`,
//   };

//   // Send email
//   await transporter.sendMail(mailOptions);
// };
