// ==UserScript==
// @name          archive-is
// @namespace     https://bitcointalk.org/
// @description   archive-is fast link
// @require       https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.3.1.min.js
// @version       0.4
// @downloadURL   https://github.com/blackout314/greasemoney-btctalk_archiveis/raw/master/archive-is.js
// @grant         none
// @include       https://bitcointalk.org/*
// ==/UserScript==

var links,thisLink;
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

links = document.evaluate("//a[@href][@class='ul']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i=0;i<links.snapshotLength;i++) {
  var thisLink = links.snapshotItem(i);
  var archivethis = thisLink.href.replace('https://', 'https://archive.is/?run=1&url=https://');
  createArchiveLink(archivethis, thisLink, 'one');
}

links = document.evaluate("//div[@class='subject']/a[@href]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i=0;i<links.snapshotLength;i++) {
  var thisLink = links.snapshotItem(i);
  var archivethis = thisLink.href.replace('https://', 'https://archive.is/?run=1&url=https://');
  createArchiveLink(archivethis, thisLink, 'two');
}

links = document.evaluate("//a[contains(.,'All')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i=0;i<links.snapshotLength;i++) {
  var thisLink = links.snapshotItem(i);
  var archivethis = thisLink.href.replace('https://', 'https://archive.is/?run=1&url=https://');
  createArchiveLink(archivethis, thisLink, 'three');
}

document.querySelectorAll('.new').forEach((elem) => {
  elem.addEventListener('click', openAndClose, false);
});
