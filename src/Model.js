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
 * Created By: Nitish Kumar on 10/19/2018 10:23 PM
 */

const driver = require('./../config').driver;

class Model {
    constructor(){
        this.connection = driver;
        this.bindings = {
            'select' : [],
            'from' : [],
            'join' : [],
            'where' : [],
            'having' : [],
            'order' : [],
            'union' : []
        };
        this.distinct = false;
        this.tableName = this.constructor.toString().toLowerCase();
        this.operators = [
            '=', '<', '>', '<=', '>=', '<>', '!=', '<=>', 'like', 'like binary', 'not like', 'ilike', '&', '|', '^', '<<', '>>', 'rlike', 'regexp', 'not regexp', '~', '~*', '!~', '!~*', 'similar to', 'not similar to', 'not ilike', '~~*', '!~~*',
        ];
    }


}