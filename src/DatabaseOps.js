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
 * Created By: Nitish Kumar on 6/11/18 10:26 AM
 */

const driver = require('./../config').driver;
const query = require('./../lib/query');

class DatabaseOps {
    constructor(){
        this.connection = driver;
        this.primaryKey = 'id';
    }

    find(id) {
        this.bindings['where'][this.primaryKey] = id;
        return this;
    }

    select(fields = []) {
        if (!fields instanceof Array) {
            throw Error('Select Requires an Array of Field Names!');
        }
        for(let i in fields) {
            this.bindings['select'].push(fields[i]);
        }
        return this;
    }

    distinct(condition) {
        this.bindings['distinct'] = typeof condition === "boolean" ? condition : false;
        return this;
    }

    where(conditions = {}) {
        if (typeof conditions !== "object") {
            throw Error('Where Requires an Object having Conditions!');
        }
        for(let i in conditions) {
            let temp = i.split(' ');
            if (temp[1] !== undefined) {
                if ((DatabaseOps._getOperators()).indexOf(temp[1]) === -1) {
                    throw Error(`Invalid Operator in Where Clause : ${conditions[i]}`);
                }
            }
        }
        this.bindings['where'] = Object.assign(this.bindings['where'], conditions);
        return this;
    }

    order(mixed = []) {
        if (!mixed instanceof Array) {
            throw Error('Order Requires an Array of Clauses!');
        }
        for(let i in mixed) {
            let temp = mixed[i].split(' ');
            if (temp[1] !== undefined) {
                if ((DatabaseOps._getOrderClauses()).indexOf(temp[1].toLowerCase()) === -1) {
                    throw Error('Invalid Order Clause!');
                }
            }
            this.bindings['order'].push(mixed[i]);
        }
        return this;
    }

    limit(numberOfResults) {
        this.bindings['limit'] = typeof numberOfResults === "number" && !isNaN(numberOfResults) ? numberOfResults : false;
        return this;
    }

    get(callback) {
        const Query = new query(this.bindings, this.connection, callback);
        Query.getResultData(callback);
    }

    query(rawQuery, callback) {}

    static _getOperators() {
        return [
            '=', '<', '>', '<=', '>=', '<>', '!=', '<=>', 'like', 'like binary', 'not like', 'ilike', '&', '|', '^', '<<', '>>', 'rlike', 'regexp', 'not regexp', '~', '~*', '!~', '!~*', 'similar to', 'not similar to', 'not ilike', '~~*', '!~~*',
        ];
    }

    static _getOrderClauses() {
        return ['desc', 'asc'];
    }
}