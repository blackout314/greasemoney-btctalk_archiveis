// ==UserScript==
// @name           archive-is
// @namespace      https://bitcointalk.org/
// @description    test
// @include        https://bitcointalk.org/*
// ==/UserScript==

var links,thisLink;

links = document.evaluate("//a[@href][@class='ul']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i=0;i<links.snapshotLength;i++) {
    var thisLink = links.snapshotItem(i);

    var archivethis = thisLink.href.replace('https://',
                                          'https://archive.is/?run=1&url=https://');
    var newHTML         = document.createElement ('span');
    newHTML.innerHTML   = '<a title="archive-is" target="_blank" href="'+archivethis+'">[📦]</a>';
    thisLink.appendChild (newHTML);
}
