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

SENSEO.SenSEOContext = function(panel)
{
	this.defaultview = "";
	this.PAGE = {
		totalSize:0,
        totalRequests:0,
        totalSizePrimed:0,
        totalRequestsPrimed:0,
		overallScore:0,
		bPeeled:false,
		statusbar:false,
		readyState:'',
		initializeNode:false
	};

	// Support different views for each button in the panel (Performance, Stats, Components).
	// This is a hash where the key is the button's id (eg, "ysPerfButton") and the value is a DIV element.
	this.panel = panel;
	this.curButtonId = "";
	this.buttonViews = {};
    this.colors = {
        doc      : '#1D368B',
        redirect : '#456FAC',
        iframe   : '#185167',
        xhr      : '#169784',
        flash    : '#5B7D3B',
        js       : '#A7CC25',
        css      : '#F19824',
        cssimage : '#CC3B2E',
        image    : '#9C1C82',
        unknown  : '#888888'
    };

    // We'll create all the ButtonViews as DIVs within this DIV.
    this.initDiv();
}

////////////////////////////////////////////////////////////////////////////////
// BUTTON VIEWS
////////////////////////////////////////////////////////////////////////////////

SENSEO.SenSEOContext.prototype.initDiv = function()
{

    var elem = this.panel.document.createElement("div");
    elem.style.display = "block";
	if ( this.panel.panelNode ) { // avoid errors in YSlowSolo
	    this.panel.panelNode.appendChild(elem);
	}

	// If you want to add HTML to a YSlowContext, do that view its viewNode.
	// viewNode is to YSlowContext as panelNode is to YSlowPanel.
    this.viewNode = elem;
};


SENSEO.SenSEOContext.prototype.show = function()
{
    // Select the current button.
    if ( FirebugChrome.$(this.curButtonId) ) {
		// In some cases, we have a buttonView without a button (like "panel_about").
	    FirebugChrome.$(this.curButtonId).checked = true;
	}

    // Display the view for the currently selected button.
    this.showButtonView(this.curButtonId);
};


SENSEO.SenSEOContext.prototype.addButtonView = function(sButtonId, sHtml) {
    var btnView = this.getButtonView(sButtonId);
    if ( ! btnView ) {
        btnView = this.panel.document.createElement("div");
        btnView.style.display = "none";
        this.viewNode.appendChild(btnView);
        this.buttonViews[sButtonId] = btnView;
    }

    btnView.innerHTML = sHtml;
    this.showButtonView(sButtonId);
};


SENSEO.SenSEOContext.prototype.setButtonView = function(sButtonId, sHtml)
{
    var btnView = this.getButtonView(sButtonId);
    if ( ! btnView ) {
		return;
    }

    btnView.innerHTML = sHtml;
    this.showButtonView(sButtonId);
};


SENSEO.SenSEOContext.prototype.getButtonView = function(sButtonId)
{
    return ( this.buttonViews.hasOwnProperty(sButtonId) ? this.buttonViews[sButtonId] : undefined );
};


SENSEO.SenSEOContext.prototype.showButtonView = function(sButtonId)
{
    var btnView = this.getButtonView(sButtonId);

    if ( ! btnView ) {
        return;
    }

    // Hide all the other button views.
    for ( var sId in this.buttonViews ) {
        if ( this.buttonViews.hasOwnProperty(sId) && sId != sButtonId ) {
            this.buttonViews[sId].style.display = "none";
        }
    }

    btnView.style.display = "block";
    this.curButtonId = sButtonId;
};

SENSEO.SenSEOContext.prototype.getCurButtonView = function()
{
    return this.getButtonView(this.curButtonId);
};
