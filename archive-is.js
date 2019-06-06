// ==UserScript==
// @name          archive-is
// @namespace     https://bitcointalk.org/
// @description   archive-is fast link
// @require       https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.3.1.min.js
// @version       0.3
// @downloadURL   https://github.com/blackout314/greasemoney-btctalk_archiveis/raw/master/archive-is.js
// @grant         none
// @include       https://bitcointalk.org/*
// ==/UserScript==

var links,thisLink;

function createArchiveLink(archivethis, thisLink) {
	var newHTML         = document.createElement ('span');
	newHTML.innerHTML   = '<a title="archive-is" target="_blank" href="'+archivethis+'">[📦]</a>';
	thisLink.appendChild (newHTML);
}

links = document.evaluate("//a[@href][@class='ul']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i=0;i<links.snapshotLength;i++) {
  var thisLink = links.snapshotItem(i);
  var archivethis = thisLink.href.replace('https://', 'https://archive.is/?run=1&url=https://');
  createArchiveLink(archivethis, thisLink);
}

links = document.evaluate("//div[@class='subject']/a[@href]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i=0;i<links.snapshotLength;i++) {
  var thisLink = links.snapshotItem(i);
  var archivethis = thisLink.href.replace('https://', 'https://archive.is/?run=1&url=https://');
  createArchiveLink(archivethis, thisLink);
}

links = document.evaluate("//a[contains(.,'All')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i=0;i<links.snapshotLength;i++) {
  var thisLink = links.snapshotItem(i);
  var archivethis = thisLink.href.replace('https://', 'https://archive.is/?run=1&url=https://');
  createArchiveLink(archivethis, thisLink);
}
