/*
 * This file is part of the awesome-people/aeon package.
 *
 * Copyright (c) 2018, Nitish Kumar <daniel@klabbers.email>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @see https://github.com/awesome-people/aeon
 * 
 * Created By: Nitish Kumar on 10/19/2018 3:05 PM
 */

const driver =  require('./lib/connectors/MysqlConnection');
const options = require('./config');

let res = new driver(options);