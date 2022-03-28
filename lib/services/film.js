'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class FilmService extends Service {
    createFilm(film){
        const { Film } = this.server.models();
        return Film.query().insertAndFetch(film);
    }

    listFilm(){
        const { Film } = this.server.models();

        return Film.query().select("*").from("film");
    }

    sendEmail(){
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
                to: "louis.doussineau@etu.unilim.fr",
                subject: "Nouveau film",
                text: "Bonjour ! Un nouveau film a été ajouté.",
                html: "<b>Bonjour ! Un nouveau film a été ajouté.</b>",
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
}