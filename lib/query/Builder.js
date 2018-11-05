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
 * Created By: Nitish Kumar on 10/19/2018 10:32 PM
 */

class Builder {
    constructor(bindings, driver) {
        this.bindings = bindings;
        this.driver = driver;
        this.mapping = {
            'MYSQL' : 'mysqlQueryBuilder',
            'MONGODB' : 'mongoQueryBuilder'
        }
    }

    build() {
        const action = this.mapping[this.driver];

        if (action === undefined) {
            throw Error('Undefined Connection Driver!');
        }

        return eval(`this._${action}()`);
    }

    _mysqlQueryBuilder() {
        const mysql = require('mysql');
        if (this.bindings['select'].length === 0) {
            this.bindings['select'].push('*');
        }
        let query = 'SELECT';
        if (this.bindings['distinct']) {
            query += ` DISTINCT`;
        }
        for (let i in this.bindings['select']) {
            query += ` ${this.bindings['select'][i]},`;
        }
        query = query.slice(0, -1);
        query += ` FROM ${this.bindings['from'][0]}`;
        query += ' WHERE';
        for (let i in this.bindings['where']) {
            query += ` ${i} ${mysql.escape(this.bindings['where'][i])} AND`;
        }
        query = query.slice(0, -4);
        query += ' ORDER BY';
        for (let i in this.bindings['order']) {
            query += ` ${this.bindings['order']},`;
        }
        query = query.slice(0, -1);
        if (this.bindings['limit']) {
            query += ` LIMIT ${this.bindings['limit']}`;
        }

        return query;
    }

    _mongoQueryBuilder() {}
}

module.exports = Builder;