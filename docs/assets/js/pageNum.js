
var pageNum = null;

(function () {
  var href = window.location.href;
  var m = href.match(/(\d+)$/);
  if (m) {
    pageNum = parseInt(m[1]);
  }
})();

function insertNextLink(message) {
  document.writeln('<a href="/post-novel/' + (pageNum+1) + '">' + message + '</a>');
}
