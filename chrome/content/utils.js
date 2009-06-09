/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License specifically applicable to
 * this software at http://developer.yahoo.com/yslow/license.txt, or the general
 * form at http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is: YSlow
 *
 * The Initial Developer of the Original Code is Yahoo! Inc.
 *
 * Contributor(s): Nico Steiner
 * ***** END LICENSE BLOCK ***** */

//Create the Utils namespace within the global YSLOW namespace.
if ( typeof SENSEO.Utils == "undefined") {
	SENSEO.Utils = {};
}

// Dynamically add a stylesheet to the document.
SENSEO.Utils.loadCss = function(url, doc)
{
	if (!doc)
	{
		doc = FirebugContext.senseoContext.browserDoc;
	}

	var newCss = doc.createElement("link");
	newCss.rel = "stylesheet";
	newCss.type = "text\/css";
	newCss.href = url;
	
	doc.body.appendChild(newCss);
	
	return newCss;
}

// Dynamically add a script to the document.
SENSEO.Utils.loadJs = function(url, doc) {

	if ( ! doc ) {
		doc = FirebugContext.senseoContext.browserDoc;
	}

	var element = doc.createElement("script");
	element.src = url;
	doc.body.appendChild(element);

	return element;
}

/*
SENSEO.Utils.patchNetPanel = function () {
	var netPanelPrototype = SENSEO.Utils.getPanelPrototype('net');

	if ( netPanelPrototype ) {
		netPanelPrototype.updateRowData = SENSEO.Utils.updateRowData;
		netPanelPrototype.getOptionsMenuItems = SENSEO.Utils.getOptionsMenuItemsNet;
	}
}
*/

SENSEO.Utils.getTitleData = function() {
  var titleTags = content.document.getElementsByTagName('title');
  var titleData = [];
  for (var i = 0; i < titleTags.length; i++) {
    titleData.push(titleTags[i].firstChild.nodeValue);
  }
  return titleData;
};

SENSEO.Utils.getMetaDescriptionData = function() {
  var metaTags = content.document.getElementsByTagName('meta');
  var metaDescriptionData = [];
  for (var i = 0; i < metaTags.length; i++) {
    if (metaTags[i].name && metaTags[i].name.toLowerCase() == 'description') {
      metaDescriptionData.push(metaTags[i].content);
    }
  }
  return metaDescriptionData;
};

SENSEO.Utils.getMetaKeywordsData = function() {
  var metaTags = content.document.getElementsByTagName('meta');
  var metaKeywordsData = [];
  for (var i = 0; i < metaTags.length; i++) {
    if (metaTags[i].name && metaTags[i].name.toLowerCase() == 'keywords') {
      metaKeywordsData.push(metaTags[i].content);
    }
  }
  return metaKeywordsData;
};

SENSEO.Utils.getHeadlineData = function(level) {
  var headlineTags = content.document.getElementsByTagName('h' + level);
  var headlineData = [];
  for (var i = 0; i < headlineTags.length; i++) {
    if (headlineTags[i].firstChild && headlineTags[i].childNodes) {
      var headlineNodeValue = '';
      if (headlineTags[i].firstChild.nodeValue) {
        headlineNodeValue = headlineTags[i].firstChild.nodeValue;
      }
      var headlineChildNodes = headlineTags[i].getElementsByTagName("*");
      for (var j = 0; j < headlineChildNodes.length; j++) {
        if (headlineChildNodes[j].firstChild && headlineChildNodes[j].firstChild.nodeName == 'IMG') {
          headlineNodeValue = "[Image]";
        } else {
          if (headlineChildNodes[j].firstChild && headlineChildNodes[j].firstChild.nodeValue) {
            headlineNodeValue += headlineChildNodes[j].firstChild.nodeValue;
          }
        }
      }
      headlineData.push(headlineNodeValue);
    }
  }
  return headlineData;
};

SENSEO.Utils.getImageAltData = function() {
  var imageTags = content.document.getElementsByTagName('img');
  var imageAltData = [];
  for (var i = 0; i < imageTags.length; i++) {
    var imageFile = imageTags[i].src;
    if (imageFile.lastIndexOf('/')) {
      imageFile = imageFile.substr(imageFile.lastIndexOf('/') + 1);
    }
    if (imageTags[i].alt) {
      if (imageTags[i].alt != '') {
        imageAltData.push([imageFile, imageTags[i].alt]);
      } else {
        linkTitleData.push([imageFile, '<span class="failed">empty</span>']);
      }
    } else {
      imageAltData.push([imageFile, '<span class="failed">n/a</span>']);
    }
  }
  return imageAltData;
};

SENSEO.Utils.getLinkTitleData = function() {
  var linkTags = content.document.getElementsByTagName('a');
  var linkTitleData = [];
  for (var i = 0; i < linkTags.length; i++) {
    if (linkTags[i].title) {
      if (linkTags[i].title != '') {
        linkTitleData.push(linkTags[i].title);
      } else {
        linkTitleData.push('<span class="failed">empty</span>');
      }
    } else {
      linkTitleData.push('<span class="failed">n/a</span>');
    }
  }
  return linkTitleData;
};

SENSEO.Utils.titleLinksGrade = function() {
  var linkTags = content.document.getElementsByTagName('a');
  if (linkTags) {
    var count = linkTags.length;
    var withLink = 0;
    
    for (var i = 0; i < linkTags.length; i++) {
      if (linkTags[i].title) {
        if (linkTags[i].title != '') {
          withLink++;
        }
      }
    }
    return (withLink / count) * 100;
  }
};

SENSEO.Utils.altImagesGrade = function() {
  var imgTags = content.document.getElementsByTagName('img');
  if (imgTags) {
    var count = imgTags.length;
    var withAlt = 0;
    
    for (var i = 0; i < imgTags.length; i++) {
      if (imgTags[i].alt) {
        if (imgTags[i].alt != '') {
          withAlt++;
        }
      }
    }
    return (withAlt / count) * 100;
  }
};

SENSEO.Utils.getDensity = function(text, keywords) {
  var density = 0;
  var matches = 0;
  if (text && keywords) {
    for (var i = 0; i < keywords.length; i++) {
      var rx = new RegExp(keywords[i], 'gi');
      if (text.match && text.match(rx)) {
        matches = matches + text.match(rx).length;
      }
    }
    density = matches / text.split(" ").length * 100;
  }
  return density;
}

SENSEO.Utils.getHostData = function() {
  var hostData = content.window.location.hostname;
  return hostData;
};

SENSEO.Utils.getPathData = function() {
  var pathData = content.window.location.pathname;
  return pathData;
};

SENSEO.Utils.markKeywordMatches = function(text, keywords) {
  if (text && keywords) {
    for (var i = 0; i < keywords.length; i++) {
      var rx = new RegExp(keywords[i], 'gi');
      if (text.replace) {
        text = text.replace(rx, '<span class="match">' + keywords[i] + '</span>');
      }
    }
    return text;
  }
};

SENSEO.Utils.getBodyData = function() {
  var bodyTags = content.document.getElementsByTagName('body')[0].getElementsByTagName('*');
  var bodyData = '';
  for (var i = 0; i < bodyTags.length; i++) {
    if (!(bodyTags[i].nodeName.toLowerCase() == 'script')) {
      if (bodyTags[i].firstChild && bodyTags[i].firstChild.nodeValue) {
        bodyData = bodyData + bodyTags[i].firstChild.nodeValue + ' ';
      }
    }
  }
  return bodyData;
};

SENSEO.Utils.similarGrade = function(text1, text2) {

  var similar = false;
  var matches = 0;
  
  if (text1 && text2) {
    var text1 = text1.split(" ");
    var text2 = text2.split(" ");
    for (var i = 0; i < text1.length; i++) {
      for (var j = 0; j < text2.length; j++) {
        if (text1[i].toLowerCase() == text2[j].toLowerCase()) {
          matches = matches + 1;
          break;
        }
      }
    }
    return (matches / (text2.length - 1) * 100);
  }
};

SENSEO.Utils.trimWhitespace = function(text) {
  text = text.replace(/^\s+/, '').replace(/\s+$/, '');
  return text;
}

SENSEO.Utils.includesAllKeywords = function(text, keywords) {
  if (text && keywords) {
    for (var i = 0; i < keywords.length; i++) {
      var rx = new RegExp(SENSEO.Utils.trimWhitespace(keywords[i]), 'i');
      if (text.match) {
        if (!text.match(rx)) {
          return false;
        }
      }
    }
    return true;
  }
};

SENSEO.Utils.includesSomeKeywords = function(text, keywords) {
  if (text && keywords) {
    for (var i = 0; i < keywords.length; i++) {
      var rx = new RegExp(SENSEO.Utils.trimWhitespace(keywords[i]), 'i');
      if (text.match) {
        if (text.match(rx)) {
          return true;
        }
      }
    }
    return false;
  }
};

SENSEO.Utils.calculateGrade = function(grades) {
  if (grades) {
    var count = grades.length;
    var index = 0;
    for (var i = 0; i < count; i++) {
      if (grades[i] == 'pass') {
        index = index + 3;
      }
      if (grades[i] == 'warning') {
        index = index + 1;
      }
    }
    
    var percent = parseInt(index / (count * 3) * 100);

    if (percent >= 90)
      return ['A', percent];
    else if (percent >= 80)
      return ['B', percent];
    else if (percent >= 70)
      return ['C', percent];
    else if (percent >= 60)
      return ['D', percent];
    else if (percent >= 50)
      return ['E', percent];
    else
      return ['F', percent];
  }
};

SENSEO.Utils.calculateWeightedGrade = function(grades) {
  if (grades) {
  
    var count = grades.length;
    var index = 0;
    var avweight = 0;
    
    for (var i = 0; i < count; i++) {
      index = index + grades[i][0] * grades[i][1];
      avweight += grades[i][1];
    }
    
    var percent = parseInt(index / (count * 100 * (avweight / count)) * 100);

    if (percent > 90)
      return ['A', percent];
    else if (percent > 80)
      return ['B', percent];
    else if (percent > 70)
      return ['C', percent];
    else if (percent > 60)
      return ['D', percent];
    else if (percent > 50)
      return ['E', percent];
    else
      return ['F', percent];
  }
};
