
var pageNum = null;

(function () {
  var href = window.location.href;
  var m = href.match(/(\d+)$/);
console.log(m);
  if (m) {
    pageNum = parseInt(m[1]);
  }
})();

function insertPageNum() {
  document.writeln(pageNum);
}

function insertNextLink(message) {
  document.writeln('<a href="/' + (pageNum+1) + '">' + message + '</a>');
}
