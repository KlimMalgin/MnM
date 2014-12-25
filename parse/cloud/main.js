
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

Parse.Cloud.define("getTagsByPhrase", function(request, response) {
  var query = new Parse.Query("Tags");
  query.equalTo("userId", request.params.userId);
  query.find({
    success: function (results) {
      var result = [];
      for (var i = 0; i < results.length; ++i) {
        if (results[i].get("text").indexOf(request.params.phrase) >= 0) {
          result.push(results[i]);
        }
      }
      response.success(result);
    },
    error: function () {
      response.error("request tags failed!");
    }
  });
});
