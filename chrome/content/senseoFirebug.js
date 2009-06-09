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

SENSEO.getPrefValue = function(name)
{
	const PrefService = Components.classes["@mozilla.org/preferences-service;1"];
	const nsIPrefBranch = Components.interfaces.nsIPrefBranch;
	const nsIPrefBranch2 = Components.interfaces.nsIPrefBranch2;
	const prefs = PrefService.getService(nsIPrefBranch2);
	const prefDomain = "extensions.firebug";

	//Check if this is global firefox preference.
	var prefName;
	if ( name.indexOf("browser.") != -1)
		prefName = name;
	else
		prefName = prefDomain + "." + name;

	var type = prefs.getPrefType(prefName);
	if (type == nsIPrefBranch.PREF_STRING) {
		return prefs.getCharPref(prefName);
	} else if (type == nsIPrefBranch.PREF_INT) {
		return prefs.getIntPref(prefName);
	} else if (type == nsIPrefBranch.PREF_BOOL) {
		return prefs.getBoolPref(prefName);
	}
}

// Wrapper for getting preferences with a default.
// Returns undefined if the preference doesn't exist and no default is specified.
SENSEO.getPref = function(name, defaultval)
{
	var val = SENSEO.getPrefValue(name);
	return ( "undefined" == typeof(val) ? defaultval : val );
}

SENSEO.userAgent = navigator.userAgent;
