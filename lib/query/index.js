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

const builder = require('./Builder');
const executioner = require('./Executioner');

class Query {
    constructor(bindings, connection) {
        this.bindings = bindings;
        this.driver = connection;
        this.query = this._getQuery();
    }

    _getQuery() {
        const Builder = new builder(this.bindings, this.driver);
        return Builder.build();
    }

    getResultData(callback) {
        const Executioner = new executioner(this.query, this.driver);
        return Executioner.execute(callback);
    }
}

module.exports = Query;