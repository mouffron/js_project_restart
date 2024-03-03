'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');
const Encrypt = require('@mathias_mouffron/iut-encrypt');

module.exports = class User extends Model {

    static get tableName() {

        return 'user';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            firstName: Joi.string().min(3),
            lastName: Joi.string().min(3),
            username: Joi.string().required(),
            password: Joi.string().min(8).required(),
            mail: Joi.string().email().required(),
            role: Joi.string(),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    $beforeInsert(queryContext) {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;

        this.role = 'user';

        this.password = Encrypt.sha1(this.password);
    }

    $beforeUpdate(opt, queryContext) {

        this.updatedAt = new Date();

        this.password = Encrypt.sha1(this.password);
    }

};
