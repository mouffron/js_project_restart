'use strict';

const Boom = require('@hapi/boom');
const { Service } = require('@hapipal/schmervice');
const Encrypt = require('@mathias_mouffron/iut-encrypt');

module.exports = class UserService extends Service {

    create(user){

        const { User } = this.server.models();

        return User.query().insertAndFetch(user);
    }

    getAll(){
        const { User } = this.server.models();
        return User.query().select('id', 'firstName', 'lastName', 'username', 'mail');
    }

    async deleteUserById(userId) {
        const { User } = this.server.models();
        await User.query().deleteById(userId);
    }

    async updateUserById(userId, userData){
        const { User } = this.server.models();

        const userToUpdate = await User.query().findById(userId);

        if (!userToUpdate) {
            // Si l'utilisateur n'est pas trouvé, utilisez Boom pour générer une erreur 404 Not Found
            throw Boom.notFound('User not found');
        }
        try {
            // Mettre à jour les données de l'utilisateur avec les nouvelles données fournies
            if (userData.firstName) {
                userToUpdate.firstName = userData.firstName;
            }
            if (userData.lastName) {
                userToUpdate.lastName = userData.lastName;
            }
            if (userData.username) {
                userToUpdate.username = userData.username;
            }
            if (userData.password) {
                userToUpdate.password = userData.password;
            }
            if (userData.mail) {
                userToUpdate.mail = userData.mail;
            }

            // Enregistrer les modifications dans la base de données
            await userToUpdate.$query().patch();

            return userToUpdate;
        } catch (error) {
            throw error;
        }
    }
    async login(mail, password) {
        const { User } = this.server.models();
        try {

            const user = await User.query().findOne({ mail });

            if (!user) {
                //utilisateur n'existe pas
                return Boom.unauthorized('User not found');
            }

            const hashedPassword = Encrypt.sha1(password);
            if (hashedPassword !== user.password) {
                //mot de passe est incorrect
                return Boom.unauthorized('Incorrect password');
            }

            // authentification réussie
            return { authenticated: true, message: 'successful' };

        } catch (error) {

            throw error;
        }
    }
}
