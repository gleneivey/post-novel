
var footnoteNumberMap = {
  "!": "1", "@": "2", "#": "3", "$": "4", "%": "5",
  "^": "6", "&": "7", "*": "8", "(": "9", ")": "0"
};

function punctToNum(punctString) {
  var numString = "";
  for (var c=0; c < punctString.length; c++) {
    numString += footnoteNumberMap[punctString[c]];
  }
  return numString;
}

var footnoteContent = {
  "!": "A \"nibling\" is the child of a person's sibling."
};
