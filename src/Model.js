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

const Database = require('./DatabaseOps');

class Model extends Database
{
    constructor(){
        super();
        this.tableName = this.constructor.name.toString().toLowerCase() + 's';
        this.bindings = {
            'select' : [],
            'from' : [this.tableName],
            'where' : {},
            'order' : [],
            'limit' : false,
            'distinct' : false
        };
    }
}

module.exports = Model;