"use strict"

const fs = require('fs');
const path = require('path');

const route = path.resolve(__dirname, '..', '..', '..', "FrontEnd", "views", 'partials', "svg.ejs")

module.exports.create = (icon) => {
    try {
        let data = fs.readFileSync(route,'utf8');

        data = data.replace('</svg>', `${icon}\n</svg>`);

        fs.writeFileSync(route, data, 'utf8');

        return { status: 200, message: "new icon successfully added" }
    }
    catch (error) {
        return { status: 500, message: error.message }
    }
}

module.exports.delete = (id) => {
    try {
        let data = fs.readFileSync(route,'utf8');

        const regex = new RegExp(`<symbol[^>]*id="${id}"[^>]*>[\\s\\S]*?<\\/symbol>`, 'g');

        data = data.replace(regex, '');

        fs.writeFileSync(route, data, 'utf8');

        return { status: 200, message: "icon successfully deleted" };
    }
    catch (error) {
        return { status: 500, message: error.message };
    }
}