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
 * Created By: Nitish Kumar on 10/19/2018 3:11 PM
 */

let drivers = {};

drivers.mysql = {
    driver : 'MYSQL',
    host : process.env.DB_HOST ? process.env.DB_HOST : 'localhost',
    port : process.env.DB_PORT ? process.env.DB_PORT : 3306,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
};

drivers.sqlite = {};

drivers.mongodb = {
    driver : 'MONGODB',
    host : process.env.DB_HOST ? process.env.DB_HOST : 'localhost',
    port : process.env.DB_PORT ? process.env.DB_PORT : 27017,
    database : process.env.DB_NAME
};

drivers.redis = {};

drivers.filesys = {
    driver : 'FILES',
    path : process.env.DB_FILESYS_PATH
};

const currentDriver = typeof(process.env.DB_DRIVER) === "string" ? process.env.DB_DRIVER.toLowerCase() : '';

const exportDriver = typeof(drivers[currentDriver]) === "object" ? drivers[currentDriver] : drivers.mysql;

Object.keys(exportDriver).forEach((prop) => {
    if (typeof(exportDriver[prop]) === "undefined") {
        throw new Error('Database Driver Configuration Missing!');
    }
});

module.exports = exportDriver;