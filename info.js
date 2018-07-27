const tagCatalog = [
{
  "postag": "pos",
  "elements": [
    {"value": "v", "expanded": "verb"}, 
    {"value": "n", "expanded": "noun"}, 
    {"value": "a", "expanded": "adjective"}, 
    {"value": "p", "expanded": "pronoun"}, 
    {"value": "d", "expanded": "adverb"}, 
    {"value": "c", "expanded": "conjunction"}, 
    {"value": "r", "expanded": "preposition"}, 
    {"value": "m", "expanded": "numeral"}, 
    {"value": "e", "expanded": "exclamation"}, 
    {"value": "p", "expanded": "punctuation"}
  ]
},
{
  "postag": "person", 
  "elements": [
    {"value": "1", "expanded": "1"}, 
    {"value": "2", "expanded": "2"}, 
    {"value": "3", "expanded": "3"}
  ]
},
{
  "postag": "number", 
  "elements": [
    {"value": "s", "expanded": "sg."}, 
    {"value": "p", "expanded": "pl."}
  ]
},
{
  "postag": "tense", 
  "elements": [
    {"value": "p", "expanded": "present"}, 
    {"value": "r", "expanded": "perfect"}, 
    {"value": "i", "expanded": "imperfect"}, 
    {"value": "f", "expanded": "future"}, 
    {"value": "t", "expanded": "future perfect"}, 
    {"value": "l", "expanded": "pluperfect"}
  ]
},
{
  "postag": "mood", 
  "elements": [
    {"value": "i", "expanded": "indicative"}, 
    {"value": "n", "expanded": "infinitive"}, 
    {"value": "s", "expanded": "subjunctive"}, 
    {"value": "m", "expanded": "imperative"}, 
    {"value": "d", "expanded": "gerund"}, 
    {"value": "g", "expanded": "gerundive"}, 
    {"value": "@", "expanded": "supine"}, 
    {"value": "p", "expanded": "participle"}
  ]
},
{
  "postag": "voice", 
  "elements": [
    {"value": "a", "expanded": "active"}, 
    {"value": "d", "expanded": "deponent"}, 
    {"value": "p", "expanded": "passive"}
  ]
},
{
  "postag": "gender", 
  "elements": [
    {"value": "m", "expanded": "m."}, 
    {"value": "f", "expanded": "f."}, 
    {"value": "n", "expanded": "n."}
  ]
},
{
  "postag": "case", 
  "elements": [
    {"value": "n", "expanded": "nom."}, 
    {"value": "g", "expanded": "gen."}, 
    {"value": "d", "expanded": "dat."}, 
    {"value": "a", "expanded": "acc."}, 
    {"value": "b", "expanded": "abl."}, 
    {"value": "v", "expanded": "voc."}, 
    {"value": "l", "expanded": "loc."}
  ]
},
{
  "postag": "degree", 
  "elements": [
    {"value": "p", "expanded": " "}, 
    {"value": "c", "expanded": "comparative"}, 
    {"value": "s", "expanded": "superlative"}
  ]
}
];

function doPOS(tag) {
  var i,j,wordPos = "";
  for (i in tagCatalog) {
	for (j in tagCatalog[i].elements) 
	if (tag[i] === tagCatalog[i].elements[j].value) {
		wordPos += tagCatalog[i].elements[j].expanded + " ";
    }
  };
  return wordPos;
};

const doInfo = function() {
  const bubbleTop = document.querySelector("div");
  bubbleTop.addEventListener("mouseover", function(event) { // "click" is another way to go
    if (event.target.tagName === "SPAN") {
      let clickedWord = event.target;
// Get information.
      let wordForm = (clickedWord.dataset.intext) ? clickedWord.dataset.intext : `&nbsp;`;
      let wordDict = (clickedWord.dataset.dict) ? clickedWord.dataset.dict : " ";
      var wordPos = (clickedWord.dataset.pos) ? doPOS(clickedWord.dataset.pos) : " ";
      let wordDef = (clickedWord.dataset.def) ? clickedWord.dataset.def : " ";
      let infoBox = 
        `
          <li class="entry">${wordForm}</li>
          <li><em>FROM</em>: ${wordDict}</li>
          <li><em>MORPHOLOGY</em>: ${wordPos}</li>
          <li><em>DEFINITION</em>: ${wordDef}</li>
        `;
      document.querySelector("#info").innerHTML = infoBox;
    }
  });
};

doInfo();