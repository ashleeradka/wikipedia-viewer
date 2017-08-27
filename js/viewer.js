  $(document).ready(function() {
  $("form").submit(function(evt) {
    evt.preventDefault();
    $("#form").addClass("vis");
    $("body").removeClass("center");
    $("#response").removeClass("vis");

    var $searchField = $("#search");
    // the AJAX part
    var wikiAPI = "https://en.wikipedia.org/w/api.php";
    var searchTerm = $searchField.val();
    var wikiOptions = {
      action: "query",
      format: "json",
      origin: "*",
      list: "search",
      titles: "Main Page",
      srsearch: searchTerm,
      srnamespace: "0",
      srlimit: "10",
      srprop: "snippet|titlesnippet"
    };

    function displayResults(data) {
      var dataObj = data.query.search;
      var responseHTML = "<h1>Search Results:</h1><ul>";
      if (data.query.search.length > 0) {
        for (var i = 0; i < data.query.search.length; i++) {
          responseHTML += "<li>";
          responseHTML +=
            "<h2>" +
            '<a href="https://en.wikipedia.org/?curid=' +
            dataObj[i].pageid +
            '" target="_blank">' +
            dataObj[i].title +
            "</a></h2>";
          responseHTML += "<p>" + dataObj[i].snippet + "...</p>";
        } // end of for loop
        responseHTML += "</ul><input></input>";
        $("#response").html(responseHTML);
        $('#response > input').attr('type', 'button');
        $('#response > input').attr('value', 'Search Again');
        $('#response > input').attr('onClick', 'window.location.reload()');
      } else {
        $("#response").html(
          "<h1>Hmmm...no search results for '" + searchTerm + "'</h1>"
        );
        $("body").addClass("center");
        $("#form").removeClass("vis");
      }
    }
    $.getJSON(wikiAPI, wikiOptions, displayResults);
  }); // form submit end
}); // doc ready end
