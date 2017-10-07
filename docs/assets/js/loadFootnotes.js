
// convert footnote references in text into links
var body = document.querySelectorAll("body")[0];
var textEls = [];
function recursivelyProcessTextEls(nontextEl) {
  nontextEl.childNodes.forEach(function (child) {
    if (child.nodeType == 3) {
      textEls.push(child);
    } else {
      recursivelyProcessTextEls(child);
    }
  });
}
recursivelyProcessTextEls(body);

var footnotesUsed = [];
function recursivelySubstituteIntoText(done, toDo) {
  var match = toDo.match(/^(.*?)\[\[([!@#$%^&*)(]+)\]\](.*)$/);
  if (match) {
    var plainString = match[1];
    var noteIndex = match[2];
    var unprocessedString = match[3];

    var noteNum = punctToNum(noteIndex);
    footnotesUsed.push({ noteNum: noteNum, note: footnoteContent[noteIndex] });

    done += plainString;
    done += "<a class='to-note' href='#' id='to-note" + noteNum + "'>";
    done += noteNum + "</a>";
    if (unprocessedString.length === 0) {
      return done;
    } else {
      return recursivelySubstituteIntoText(done, unprocessedString);
    }
  } else {
    return done + toDo;
  }
}
function replaceFootnoteMarkerIn(textEl) {
  var replacementHtml = recursivelySubstituteIntoText("", textEl.wholeText);
  if (replacementHtml == textEl.wholeText) {
    return;
  }

  var replacementSpan = document.createElement("span");
  textEl.parentNode.replaceChild(replacementSpan, textEl);
  replacementSpan.innerHTML = replacementHtml;
}

textEls.forEach(function (textEl) {
  replaceFootnoteMarkerIn(textEl);
});


// add used footnote text into DOM
footnotesUsed.forEach(function (footnote) {
});
