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
 * Created By: Nitish Kumar on 8/11/18 3:54 PM
 */

const mysql = require('mysql');

const DataTypeGeneratorsMapping = {
    'INT' : '_intTypeCreateGenerators',
    'FLOAT' : '_floatingTypeCreateGenerators',
    'CHAR' : '_characterTypeCreateGenerators'
};

const DataTypeMap = {
    'INT' : [
        'BIT', 'TINYINT', 'SMALLINT', 'MEDIUMINT', 'INT', 'BIGINT', 'SERIAL'
    ],
    'FLOAT' : [
        'DECIMAL', 'FLOAT', 'DOUBLE'
    ],
    'CHAR' : [
        'CHAR', 'STRING', 'TEXT', 'MEDIUMTEXT', 'LONGTEXT'
    ]
};

class MySqlQueryBuilder {
    constructor(bindings) {
        this.bindings = bindings;
    }

    _mysqlReadOps() {
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

    _mysqlCreateOps() {
        let query = 'CREATE TABLE ';
        if (this.bindings.table) {
            query += this.bindings.table;
            delete this.bindings.table;
            let dataType, action, dataParent;
            for (let i in this.bindings) {
                dataType = this.bindings[i].type;
                for (let type in DataTypeMap) {
                    if (DataTypeMap[type].indexOf(dataType) !== -1) {
                        dataParent = type;
                        break;
                    }
                }
                if (DataTypeGeneratorsMapping.hasOwnProperty(dataParent)) {
                    query += eval(`${DataTypeGeneratorsMapping[dataParent]}(${this.bindings[i]})`);
                }
                else {
                    // @TODO : Handle Miscellaneous Types
                }
            }
        }
        else {
            throw Error('Table Name Not Discovered In Schema!');
        }
    }

    _intTypeCreateGenerators(bind) {

    }

    _floatingTypeCreateGenerators(bind) {}

    _characterTypeCreateGenerators(bind) {}
}

module.exports = MySqlQueryBuilder;