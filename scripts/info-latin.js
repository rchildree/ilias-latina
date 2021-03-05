// const navToggle = document.querySelector('.nav__toggle');
// navToggle.addEventListener('click', () => {
// 	  document.querySelector('.nav').classList.toggle('nav-open');
// 	  document.querySelector('.fa-angle-double-left').classList.toggle('hamburger-open');
// }
// );

const tagCatalog = [
	{
		"postag": "pos", //0
		"elements": [
			{"value": "v", "expanded": "verb"}, 
			{"value": "n", "expanded": "noun"}, 
			{"value": "a", "expanded": "adjective"}, 
			{"value": "p", "expanded": "pron."}, 
			{"value": "d", "expanded": "adv."}, 
			{"value": "c", "expanded": "conj."}, 
			{"value": "r", "expanded": "prep."}, 
			{"value": "m", "expanded": "num."}, 
			{"value": "e", "expanded": "excl."}
		]
	},
	{
		"postag": "person", //1
		"elements": [
			{"value": "-", "expanded": " "}, 
			{"value": "1", "expanded": "1"}, 
			{"value": "2", "expanded": "2"}, 
			{"value": "3", "expanded": "3"}
		]
	},
	{
		"postag": "number", //2
		"elements": [
			{"value": "-", "expanded": " "}, 
			{"value": "s", "expanded": "sg."}, 
			{"value": "p", "expanded": "pl."}
		]
	},
	{
		"postag": "tense", //3
		"elements": [
			{"value": "-", "expanded": " "}, 
			{"value": "p", "expanded": "pres."}, 
			{"value": "r", "expanded": "pf."}, 
			{"value": "i", "expanded": "impf."}, 
			{"value": "f", "expanded": "fut."}, 
			{"value": "t", "expanded": "futpf."}, 
			{"value": "l", "expanded": "plupf."}
		]
	},
	{
		"postag": "mood", //4
		"elements": [
			{"value": "-", "expanded": " "}, 
			{"value": "i", "expanded": "ind."}, 
			{"value": "n", "expanded": "inf."}, 
			{"value": "s", "expanded": "subj."}, 
			{"value": "m", "expanded": "imperat."}, 
			{"value": "d", "expanded": "gerund"}, 
			{"value": "g", "expanded": "gerundive"}, 
			{"value": "u", "expanded": "supine"}, 
			{"value": "p", "expanded": "ppl."}
		]
	},
	{
		"postag": "voice", //5
		"elements": [
			{"value": "-", "expanded": " "}, 
			{"value": "a", "expanded": "act."}, 
			{"value": "d", "expanded": "dep."}, 
			{"value": "p", "expanded": "pass."}
		]
	},
	{
		"postag": "gender", //6
		"elements": [
			{"value": "-", "expanded": " "}, 
			{"value": "m", "expanded": "m."}, 
			{"value": "f", "expanded": "f."}, 
			{"value": "n", "expanded": "n."}
		]
	},
	{
		"postag": "case", //7
		"elements": [			
			{"value": "-", "expanded": " "}, 
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
		"postag": "degree", //8
		"elements": [
			{"value": "-", "expanded": " "}, 
			{"value": "p", "expanded": " "}, 
			{"value": "c", "expanded": "comp."}, 
			{"value": "s", "expanded": "super."}
		]
	}
	];

function doPOS(tag) {
	var i,j,answer = "";
	let wordPos = [];
	tag = tag.split("");
	for (i in tagCatalog) {
	for (j in tagCatalog[i].elements) {
			if (tag[i] === tagCatalog[i].elements[j].value) {
				wordPos.push(tagCatalog[i].elements[j].expanded);
			}
	}};
	if (tag[0] === "n" || tag[0] === "a" || tag[0] === "p" || tag[0] === "m") {
		answer = `${wordPos[7]} ${wordPos[2]} ${wordPos[6]} ${wordPos[8]}`;
	} else if (tag[4] === "p") { // participle: 
		answer = `${wordPos[3]} ${wordPos[5]} ${wordPos[4]}, ${wordPos[7]} ${wordPos[2]} ${wordPos[6]}`;
	} else if (tag[4] === "n") { // infinitive: 
		answer = `${wordPos[3]} ${wordPos[5]} ${wordPos[4]}`;
	} else if (tag[4] === "g" || tag[4] === "d" || tag[4] === "u") { // gerund / gerundive / supine: 
		answer = `${wordPos[4] + ", " + wordPos[7]} ${wordPos[2]} ${wordPos[6]}`;
	} else if (tag[0] === "v") { // verbs: 12 3 5 4
		answer = `${wordPos[1]} ${wordPos[2]} ${wordPos[3]} ${wordPos[5]} ${wordPos[4]}`;
	} else if (tag[0]) { // the rest
		answer = `${wordPos[0]}`;
	};
	return answer;
};


const doInfo = function(event) {
	if (event.target.tagName === "SPAN") {
		let mousedWord = event.target;
		console.log(mousedWord.dataset.cite);
		let wordCite = (mousedWord.dataset.cite); // addition for citation's sake
		let wordForm = (mousedWord.textContent) ? mousedWord.textContent : `&nbsp;`;
		let wordDict = (mousedWord.dataset.dict) ? mousedWord.dataset.dict : " ";
		var wordPos = (mousedWord.dataset.pos) ? doPOS(mousedWord.dataset.pos) : " ";
		let wordDef = (mousedWord.dataset.def) ? mousedWord.dataset.def : " ";
		let infoBox = 
			`
				<li id="firstline">
					<span id="citation">${wordCite}</span><span id="entry">${wordForm}</span>
				</li>
				<li id="pos">${wordPos}</li>
				<li style="margin-top:5px">${wordDict}</li>
				<li><em>${wordDef}</em></li>
			`;
		document.querySelector("#info").innerHTML = infoBox;
	}
};
	
const doLink = function(event) {
	if (event.target.tagName === "SPAN") {
		let clickedWord = event.target;
		let wordLookup = (clickedWord.dataset.lookup) ? clickedWord.dataset.lookup : " ";
		let url = 'http://alatius.com/ls/index.php?met=up&ord=' + wordLookup;
		window.open(url, '_dict');
	}
};

const bubbleTop = document.querySelector("#main");
	bubbleTop.addEventListener('mouseover', doInfo, false);
	window.matchMedia('(hover: hover)').matches ? bubbleTop.addEventListener('click', doLink, false) : bubbleTop.addEventListener('touchstart', doInfo, false);