FBL.ns(function() { with (FBL)
{
	Firebug.SemanticonModule = extend(Firebug.Module,
	{
		initialize: function()
		{
			this.initPrefs();
		},
		
		initPrefs: function()
		{
			SEMANTICON.prefs = {};
		},
		
		onClickLabel: function(context, event, ele)
		{
			if (event.button != 0)
				return;

			else if (isControl(event))
				Firebug.toggleDetachBar(true);
			
			else
			{
				Firebug.toggleBar(true);
				Firebug.tabBrowser.selectedBrowser.chrome.selectPanel('semanticon');
			}
		},
		
		showPanel	: function(browser, panel)
		{
			/*
			var bMe = panel && panel.name == "semanticon";
			var myButtons = browser.chrome.$("fbSenseoButtons");
			
			// This removes our buttons.
				collapse(myButtons, !bMe);
			*/
		},

		components: function()
		{
			Firebug.tabBrowser.selectedBrowser.chrome.selectPanel('semanticon');
			
			var sHtml = '<div>Testing Semanticon</div>';

			FirebugContext.senseoContext.addButtonView('panel_components', '<div class="components">' + sHtml + '</div>');
		}
	}); 

	function SemanticonPanel()
	{
	};
  
	SemanticonPanel.prototype = extend(Firebug.Panel,
	{
		name	: "semanticon",
		title	: "Semanticon",
		searchable	: true,
		editable	: false,
		
		// This is only called once per browser tab.
		initialize	: function(context, doc)
		{
			this.context	= context;
			this.document	= doc;
			this.panelNode	= doc.createElement("div");
			this.panelNode.ownerPanel = this;

			setClass(this.panelNode, "panelNode panelNode-" + this.name);
			doc.body.appendChild(this.panelNode);
			
			// Make some CSS and JS available from WITHIN the panel's document.

			var newCss = this.document.createElement("link");
			newCss.rel = "stylesheet";
			newCss.type = "text\/css";
			newCss.href = "chrome://semanticon/content/semanticon.css";
	
			this.document.body.appendChild(newCss);

			this.initializeNode(this.panelNode);
			
			SEMANTICON.init(this.document, context.window.document);
		},


		// Initialize the panel. This is called when the Panel is activated and
		// whenever the browser document changes (new URL, reload).
		initializeNode: function()
		{
			// Create a SenSEOContext for this instance.
			FirebugContext.senseoContext = new SENSEO.SenSEOContext(this);
		
			FirebugContext.senseoContext.PAGE["initializeNode"] = true;
		
			// Save a pointer back to this object from the iframe's document:
			this.document.semanticonPanel = this;
			this.document.senseoContext = FirebugContext.senseoContext;
		
			var sHTML;
			
			sHTML	= '\
<div class="Semanticon">\
	<div id="header">\
		<div id="logo"><span>Semanticon</span></div>\
		<div id="nav">\
			<a id="All">All (<span class="amount">0</span>)</a>\
			<a class="disabled" id="People">People (<span class="amount">0</span>)</a>\
			<a class="disabled" id="Org">Organizations (<span class="amount">0</span>)</a>\
			<a class="disabled" id="Events">Events (<span class="amount">0</span>)</a>\
			<a class="disabled" id="Product">Products (<span class="amount">0</span>)</a>\
			<a class="disabled" id="Reviews">Reviews (<span class="amount">0</span>)</a>\
		</div>\
	</div>\
	<div id="content">\
		<table id="tblContent" cellpadding="0" cellspacing="0">\
			<thead>\
				<tr>\
					<th id="headerAll" class="bodyTitle" colspan="10">All (<span id="countAll">0</span>)</th>\
					<th id="headerPeople" class="bodyTitle" colspan="10">People (<span id="countPeople">0</span>)</th>\
					<th id="headerOrg" class="bodyTitle" colspan="10">Organizations (<span id="countOrg">0</span>)</th>\
					<th id="headerProduct" class="bodyTitle" colspan="10">Products (<span id="countProduct">0</span>)</th>\
				</tr>\
			</thead>\
			<tfoot>\
				<tr>\
					<td colspan="10">&nbsp;</td>\
				</tr>\
			</tfoot>\
			<tbody id="bodyPeople">\
				<tr>\
					<th class="th1">&nbsp;</th>\
					<th>Given name</th>\
					<th>Family name</th>\
					<th>Title</th>\
					<th>Organization</th>\
					<th>Format</th>\
				</tr>\
			</tbody>\
			<tbody id="bodyOrg">\
				<tr>\
					<th class="th1">&nbsp;</th>\
					<th>Organization</th>\
				</tr>\
			</tbody>\
			<tbody id="bodyProduct">\
				<tr>\
					<th class="th1">&nbsp;</th>\
					<th>Product name</th>\
					<th>Category</th>\
					<th>Description</th>\
					<th>Price</th>\
					<th>URL</th>\
					<th>Format</th>\
				</tr>\
			</tbody>\
		</table>\
	</div>\
	<div id="footer">\
		Copyright &copy; 2009 Samuli Hakoniemi\
	</div>\
</div>';

			this.panelNode.innerHTML	= sHTML;
		},

		// This is called whenever the panel comes into view. Like toggling between browser tabs.
		show	: function()
		{
			gLatestSenSEOContext = FirebugContext.senseoContext;  // save this to make detach work
			
			this.restoreButtons();
			
			// There is only ONE DOCUMENT shared by all browser tabs. So if the user opens two
			// browser tabs, we have to restore the appropriate yslowContext when switching between tabs.
			
			this.document.senseoContext = FirebugContext.senseoContext;
			
			FirebugContext.senseoContext.show();
		},
		
		restoreButtons	: function()
		{
		}

	});
  
	Firebug.registerModule(Firebug.SemanticonModule);
	Firebug.registerPanel(SemanticonPanel);

}});