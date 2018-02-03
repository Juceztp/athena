//Dependencies
require("babel-core/register");
require("babel-polyfill");
const owapi = require('owapi');

export default class Athena {
        async run() {
                const result = await owapi.getAllStats('Trev-11289', 'us');
                console.log(result);
        }
}