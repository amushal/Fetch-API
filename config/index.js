module.exports = {};

let config_list = [
    "JWT_SECRET",
]

const environment = process.env.ENVIRONMENT || 'development';
let configurations = {};

try {
    configurations = require("./" + environment + ".json");
} catch (err) {}


for(let i = 0; i < config_list.length; i++) {
    let conf = config_list[i];

    if(configurations[conf] != undefined || configurations[conf] != null) {
        module.exports[conf] = configurations[conf];
    } else {
        module.exports[conf] = "";
    }
}