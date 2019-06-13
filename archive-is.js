// ==UserScript==
// @name          archive-is
// @namespace     https://bitcointalk.org/
// @description   archive-is fast link
// @version       0.5
// @downloadURL   https://github.com/blackout314/greasemoney-btctalk_archiveis/raw/master/archive-is.js
// @grant         none
// @include       https://bitcointalk.org/*
// ==/UserScript==

// @ require? https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.3.1.min.js
var links,thisLink;
const replace = 'https://';
const replaced = 'https://archive.is/?run=1&url=https://';
let loc;

var openAndClose = function(elem) {
  var url = elem.originalTarget.dataset.www;
  let newWindow = window.open(url, '_blank' /*, 'width=300,height=300'*/);
  window.focus();
  console.log('URL', url);

  setTimeout(function(){
    loc = newWindow.location;
    console.log('ARCHIVE', loc);   
    elem.originalTarget.innerText = '✅';
    //newWindow.close();
  }, 2000);
}

function createPageLink() {
  var archivethis     = window.location.href;
	var newHTML         = document.createElement ('div');
	newHTML.innerHTML   = '&nbsp; CURRENT PAGE [<a data-ref="current" title="archive-is" target="_blank" href="https://archive.is/?run=1&url='+archivethis+'">📦</a>]';
  newHTML.style       = 'position:fixed;top:0;left:0px;border:1px black solid;background:white;font-size:8px;';
  document.body.appendChild(newHTML);
}

function createArchiveLink(archivethis, thisLink, dataattrib) {
	var newHTML         = document.createElement ('span');
	newHTML.innerHTML   = '</a>[<a data-ref="'+dataattrib+'" title="archive-is" target="_blank" href="'+archivethis+'">📦</a>'+
    '<span class="new" data-www="'+archivethis+'">▶️</span>]';
  thisLink.parentNode.insertBefore(newHTML, thisLink.nextSibling);
}

function addGlobalStyle(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}

function isBitcointalkLink(thisLink) {
  return thisLink.href.indexOf('bitcointalk') > 0;
}

links = document.evaluate("//a[@href][@class='ul']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i=0;i<links.snapshotLength;i++) {
  var thisLink = links.snapshotItem(i);
	if(isBitcointalkLink(thisLink)) {
    var archivethis = thisLink.href.replace(replace, replaced);
    createArchiveLink(archivethis, thisLink, 'one');
  }
}

links = document.evaluate("//div[@class='subject']/a[@href]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i=0;i<links.snapshotLength;i++) {
  var thisLink = links.snapshotItem(i);
  if(isBitcointalkLink(thisLink)) {
    var archivethis = thisLink.href.replace(replace, replaced);
    createArchiveLink(archivethis, thisLink, 'two');
  }
}

links = document.evaluate("//a[text()='All']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i=0;i<links.snapshotLength;i++) {
  var thisLink = links.snapshotItem(i);
  if(isBitcointalkLink(thisLink)) {
    var archivethis = thisLink.href.replace(replace, replaced);
    createArchiveLink(archivethis, thisLink, 'three');
  }
}

document.querySelectorAll('.new').forEach((elem) => {
  elem.addEventListener('click', openAndClose, false);
});

createPageLink();
