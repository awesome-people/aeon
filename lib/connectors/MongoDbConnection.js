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
 * Created By: Nitish Kumar on 10/19/2018 8:36 PM
 */

const ConnectionManager = require('./ConnectionManager');
const mongo = require('mongodb').MongoClient;
const assert = require('assert');

class MongoDbConnection extends ConnectionManager {
    constructor(config) {
        super();
        this.url = `mongodb://${config.host}:${config.port}`;
        this.database = config.database;
        return this.connect();
    }

    connect() {
        return mongo.connect(this.url, (err, client) => {
            assert.equal(null, err);
            return client;
        });
    }
}

module.exports = MongoDbConnection;