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
 * Created By: Nitish Kumar on 10/19/2018 3:05 PM
 */

// const Model = require('./src/Model');
//
// module.exports = Model;

const Schema = require('./src/Schema');
const bluePrint = require('./src/Schema/BluePrint');

let table = new bluePrint();

table.integer('id');
table.double('price');
table.string('jsondata');
table.text('resultData');

Schema.create('users', table.structure);

