var RECORDS_HELPER = require("../helpers/records-helper");
var q = require("q");

async function getAll() {
    var def = q.defer();
     
    if (resp == undefined) {
      let data = await RECORDS_HELPER.allRecords();
      def.resolve(data);
    } else {
      def.resolve(resp);
    }
  
    return def.promise;
  }
  
  module.exports = {
    getAll: async function (request, response, next) {
      try {
        let data = await getAll();
        response.status(200).sendWithLog({ status: "success", data: data });
      } catch (err) {
        console.log(err);
        response
          .status(500)
          .sendWithLog({ status: "error", message: "Something went wrong" });
      }
    },
}