var q = require("q");

async function allRecords () {
    var def = q.defer();

    try {
        console.log(require("./records.json"));
        def.resolve(require("./records.json"));
    }
    catch (err) {
        def.reject(err);
    }

    return def.promise;
}

module.exports = {
    allRecords
}