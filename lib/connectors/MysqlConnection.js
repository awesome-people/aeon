/*
 * This file is part of the awesome-people/aeon package.
 *
 * Copyright (c) 2018, Nitish Kumar <mintu.nitish@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @see https://github.com/awesome-people/aeon
 * 
 * Created By: Nitish Kumar on 10/19/2018 3:48 PM
 */

const ConnectionManager = require('./ConnectionManager');
const mysql = require('mysql');

class MysqlConnection extends ConnectionManager{
    constructor(config) {
        super();
        this.connection = mysql.createConnection(config);
        this.connect();
    }

    connect() {
        return this.connection.connect((err) => {
            if (err) {
                throw new Error(err);
            }
        })
    }

    terminate() {
        return this.connection.end();
    }
}

module.exports = MysqlConnection;