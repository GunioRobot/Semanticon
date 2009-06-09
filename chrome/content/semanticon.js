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

//Create the global YSLOW namespace.
var SENSEO = SENSEO || {};
SENSEO.userAgent = 'SenSEO';

var gLatestSenSEOContext = false;

// Intended for use by YSlowSolo users.
// It assumes there is only one YSlowContext.
SENSEO.getSenSEOContext = function(browserWindow)
{
	var senseoContext = new SENSEO.SenSEOContext(browserWindow);

	FirebugContext.senseoContext = senseoContext;

	senseoContext.browserDoc = browserWindow.document;
	senseoContext.senseoInit();
	senseoContext.peelerObj = new SENSEO.Peeler(senseoContext);
	senseoContext.comps = [];  // clear it out
	senseoContext.count = {};  // clear it out

	return senseoContext;
}

// Wrapper for getting preferences with a default.
// Returns undefined if the preference doesn't exist and no default is specified.
// Override this function for specific platforms. See yslowFirebug.js for an example.
SENSEO.getPref = function(name, defaultval)
{
	return defaultval;
}
 