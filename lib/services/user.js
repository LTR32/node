'use strict';

const { Service } = require('@hapipal/schmervice'); 
const Jwt = require('@hapi/jwt');

module.exports = class UserService extends Service {

        create(user){

             const { User } = this.server.models();
        
             return User.query().insertAndFetch(user);
        }
        
        listUser(){
                const { User } = this.server.models();

                return User.query().select("*").from("user");
        }

        updateUser(id, user){
            const { User } = this.server.models();

            return User.query().updateAndFetchById(id, user).throwIfNotFound();
        }

        removeUser(id) {
            const { User } = this.server.models();

            return User.query().delete().where("id", id);
        }

        sendEmail(email){
                const nodemailer = require('nodemailer');
        
                nodemailer.createTestAccount((err, account) =>{
                    if(err) {
                        console.error("Echec lors de la création du compte de test." + err.message);
                        return process.exit(1);
                    }
                
                    console.log("Identifiants obtenus, envoie du message...");
                
                    let transporter = nodemailer.createTransport({
                        host: 'smtp.ethereal.email',
                        port: 587,
                        auth: {
                            user: 'eileen.fisher40@ethereal.email',
                            pass: 'pTgKruADyVShcBstrC'
                        }
                    });
                
                    let message = {
                        from: "eileen.fisher40@ethereal.email",
                        to: email,
                        subject: "Bienvenue",
                        text: "Bonjour ! Merci d'avoir créé votre compte.",
                        html: "<b>Bonjour ! Merci d'avoir créé votre compte.</b>",
                    }
                
                    transporter.sendMail(message, (err, info) =>{
                        if(err) {
                            console.log('Erreur rencontrée.' + err.message);
                            return process.exit(1);
                        }
                
                        console.log("Message envoyé: %s", info.messageId);
                        console.log('Preview URL : %s', nodemailer.getTestMessageUrl(info));
                    });
                });
            }

            login(Identifiants){
                const { User } = this.server.models();

                let user = User.query().select("id",  "firstName", "lastName", "password", "mail", "scope")
                .where("username", Identifiants.username).first();
                return Jwt.token.generate(
                    {
                        aud: 'urn:audience:iut',
                        iss: 'urn:issuer:iut',
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        mail: user.mail,
                        scope: user.scope
                    },
                    {
                        algorithm: 'HS512',
                        key: 'random_string',
                    },
                    {
                        ttlSec: 14400, // 4 hours
                    }
                );
            }

}
