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

    build(opMode) {
        const action = this.mapping[this.driver];

        if (action === undefined) {
            throw Error('Undefined Connection Driver!');
        }

        return eval(`this._${action}(${opMode})`);
    }

    _mysqlQueryBuilder(opMode) {
        const mySqlBuilder = require('./MySql/Builder');
        const MySqlBuilder = new mySqlBuilder(this.bindings);
        if (opMode === 'C') {
            return MySqlBuilder._mysqlCreateOps();
        }
        else if (opMode === 'R') {
            return MySqlBuilder._mysqlReadOps();
        }
        else if (opMode === 'U') {}
        else if (opMode === 'D') {}
        else {}
    }

    _mongoQueryBuilder() {}
}

module.exports = Builder;