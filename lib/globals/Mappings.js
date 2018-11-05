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
 * Created By: Nitish Kumar on 5/11/18 3:28 PM
 */

let mappings = {};

mappings.connectors = {
    'MYSQL' : 'MysqlConnection',
    'MONGODB' : 'MongoDbConnection'
};

module.exports = mappings;