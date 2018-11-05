/*
 * This file is part of the elegans/aeon package.
 *
 * Copyright (c) 2018, Nitish Kumar <mintu.nitish@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @see https://github.com/elegans/aeon
 * 
 * Created By: Nitish Kumar on 5/11/18 12:21 PM
 */

const connectorsMap = require('./../globals/Mappings').connectors;
const config = require('./../../config');

class Executioner {
    constructor(query, driver) {
        this.query = query;
        this.driver = driver;
    }

    execute(callback) {
        const connection = this.getConnection();
        connection.query(this.query, (err, res, fields) => {
            if (err) throw err;
            callback(res);
        });
    }

    getConnection() {
        const connector = require(`./../connectors/${connectorsMap[this.driver]}`);
        return new connector(config);
    }
};

module.exports = Executioner;