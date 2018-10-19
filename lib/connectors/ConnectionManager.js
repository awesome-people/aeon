/*
 * This file is part of the awesome-people/aeon package.
 *
 * Copyright (c) 2018, Nitish Kumar <mintu.nitish@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @see https://github.com/awesome-people/aeon
 * 
 * Created By: Nitish Kumar on 10/19/2018 4:04 PM
 */

class ConnectionManager {
    constructor() {
        if (this.constructor === ConnectionManager) {
            throw new Error ("Abstract Class Instantiation");
        }
    }

    connect() {
        throw new Error("Unimplemented Method : connect");
    }

    terminate() {
        throw new Error("Unimplemented Method : terminate");
    }
}

module.exports = ConnectionManager;