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
 * Created By: Nitish Kumar on 10/19/2018 3:48 PM
 */

const ConnectionManager = require('./ConnectionManager');
const mysql = require('mysql');
const assert = require('assert');

class MysqlConnection extends ConnectionManager{
    constructor(config) {
        super();
        this.connection = mysql.createConnection(config);
        this.connect();
        return this.connection;
    }

    connect() {
        return this.connection.connect((err) => {
            assert.equal(null, err);
        })
    }

    terminate() {
        return this.connection.end();
    }
}

module.exports = MysqlConnection;