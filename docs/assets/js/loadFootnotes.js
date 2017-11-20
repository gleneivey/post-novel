
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
var footnoteMap = {};
function recursivelySubstituteIntoText(done, toDo) {
  var match = toDo.match(/^((.|\n)*?)\[\[([!@#$%^&*)(]+)\]\]((.|\n)*)$/);
  if (match) {
    var plainString = match[1];
    var noteIndex = match[3];
    var unprocessedString = match[4];

    var noteNum = punctToNum(noteIndex);
    footnotesUsed.push({ noteNum: noteNum, note: footnoteContent[noteIndex] });
    footnoteMap[noteNum] = footnoteContent[noteIndex];

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
//console.log(footnote);
});

var noteEls = document.getElementsByClassName("to-note");
for (var c=0; c < noteEls.length; c++) {
  var noteNum = noteEls[c].text;
  var handler = function (event) {
    event.stopPropagation();
    event.preventDefault();

    var el = event.target;
    var targetRect = el.getBoundingClientRect();

    var fn = document.getElementById("footnote");
    fn.setAttribute("style", "display: block");
    fn.innerText = footnoteMap[noteNum];
    var fnRect = fn.getBoundingClientRect();

    fn.setAttribute("style", "display: block; " +
        "top: " + ((targetRect.top - 30) - fnRect.top) +
        "px; left: " + ((targetRect.left + 12) - fnRect.left) + "px");
  };
  noteEls[c].addEventListener("click", handler);
}

var clearHandler = function () {
  var fn = document.getElementById("footnote");
  fn.setAttribute("style", "display: none");
  fn.innerText = "";
};
body.addEventListener("click", clearHandler);
body.addEventListener("keydown", clearHandler);
