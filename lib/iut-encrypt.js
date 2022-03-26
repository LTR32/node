'use strict';

const Encrypt = require('@dan/iut-encrypt');

const plainTextPassword = 'motdepasse';

const passwordSha1 = Encrypt.sha1(plainTextPassword);

if(Encrypt.compareSha1('motdepassesaisit', passwordSha1)){

    console.log('Connexion validé');
}