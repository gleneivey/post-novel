
var footnoteNumberMap = {
  "!": "1", "@": "2", "#": "3", "$": "4", "%": "5",
  "^": "6", "&": "7", "*": "8", "(": "9", ")": "0"
};

function punctToNum(punctString) {
  var numString = "";
  for (var c=0; c < punctString.length; c++) {
    numString += footnoteNumberMap[punctString[c]];
  }
console.log(punctString + "    " + numString);
  return numString;
}

var footnoteContent = {
  "!": "First footnote, very short.",
  "@": "Second footnote, much longer.  Computer, lights up! You did exactly what you had to do. You considered all your options, you tried every alternative and then you made the hard choice. Congratulations - you just destroyed the Enterprise. I guess it's better to be lucky than good. Mr. Worf, you sound like a man who's asking his friend if he can start dating his sister. In all trust, there is the possibility for betrayal. I suggest you drop it, Mr. Data. The unexpected is our normal routine. When has justice ever been as simple as a rule book? Travel time to the nearest starbase? I can't. As much as I care about you, my first duty is to the ship. Maybe we better talk out here; the observation lounge has turned into a swamp. What? We're not at all alike! Sorry, Data. Wait a minute - you've been declared dead. You can't give orders around here. Talk about going nowhere fast. How long can two people talk about nothing? A lot of things can change in twelve years, Admiral. Ensign Babyface! Captain, why are we out here chasing comets? Fate. It protects fools, little children, and ships named 'Enterprise.'"
};
