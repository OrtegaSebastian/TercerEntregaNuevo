function getRoot(req, res) {
    res.send('Bienvenido');
}

const logger = require('./helpers/log4js')

// const loggerUser = require('./helpers/log4js')


//nodemailer aun no lo pruebo////////////////////////////////////////////


//ACA DEBO PONER CORREO ETHEREAL Y DESCOMENTAR 


// const {createTransport}= require('nodemailer')
// const TEST_MAIL='xxxxxx@ethereal.email'

// const transporter = createTransport({
//     host:'smtp.ethereal.email',
//     port:587,
//     auth:{
//         user: TEST_MAIL,
//         pass:'Backend'
//     }
// })

// const mailOptions = {
//     from:'Servidor Registro',
//     to:TEST_MAIL,
//     subject:'Nuevo Registro',
//     html: '<h3>Se ha registrado un nuevo usuario en la base de datos</h3>'
// }


/////////////////////////////////////////////////////////////////////////////

//mensaje de texto para el usuario desde twilio
//agregar al .env las credenciales IMPORTANTE

// OJO CAMBIAR IMPORTS POR ECM6
// const twilio= require('twilio') ;
// import * as dotenv from "dotenv";
// const dotenv= require('dotenv')
// dotenv.config();

// const accountSID = "AC98115544aec1da2a919cf82b6c466f28";
// const authToken = process.env.TWILIO;

// const client = twilio(accountSID, authToken);
// const palabra = "codigo"

// //Como envio la lista de productos ? 
// try {
//   const msg = await client.messages.create({
//     body: "Gracias por su compra",
//     from: "whatsapp:+14155238886",
//     to:`whatsapp:`+ process.env.PHONE,
//   });
// } catch (e) {
//    console.log(e)
//   console.log("error");
// }


// const accountSid= ''
// const accountToken= ''
// const cliente = twilio(accountSid,accountToken)

// try{const message = await cliente.messages.create({
//     body:'Su Pedido ha sido recibido y se encuentra en proceso',
//     //agregar numero de twilio //IMPORTANTE
//     from:'',
//     //ver como requerir numero de usuario
//     to:req.params
// })
// console.log(message)
// }catch(e){console.log(e)}




function getLogin(req, res) {
    if (req.isAuthenticated()) {

        let user = req.user;
        res.render('login-ok', {
            usuario: user.username,
            nombre: user.firstName,              
            // apellido: user.lastName,        
            // email: user.email
        });
    }
    else {
        res.sendFile(__dirname + '/views/login.html');
    }
}

function getSignUp(req, res) {
    res.sendFile(__dirname + '/views/signup.html');
}


function postLogin(req, res) {
    const user = req.user;
    console.log(user);
    res.sendFile(__dirname + '/views/index.html');
}

function postSignup(req, res) {
    const user = req.user;
    console.log(user);
    //Parte de nodemailer
//     try{const info = transporter.sendMail(mailOptions)
//     console.log(info)
// }
// catch(e){console.log(e)}
    res.sendFile(__dirname + '/views/index.html');
}

function getFailLogin(req, res) {
    const user = req.user
    console.log(user)
    console.log('error en login');
    res.render('login-error', {
    });
    // loggerUser()
}

function getFailsignup(req, res) {
    console.log('error en signup');
    res.render('signup-error', {
    });
}


// el .logout es un metodo de passport
function getLogout(req, res) {
    req.logout((err) => {
        if (err) { return next(err); }
        res.sendFile(__dirname + '/views/index.html');
    });
}

module.exports = {
    getRoot,
    getLogin,
    postLogin,
    getFailLogin,
    getLogout,
    getSignUp,
    postSignup,
    getFailsignup
}