SEMANTICON	=
{
	PEOPLE	: 2,
	ORG		: 4,
	PRODUCT	: 8,
	
	aPeople	: [],
	aOrg	: [],
	aProduct	: [],
	oCurrentlySelected	: "",
	
	init	: function(panelDoc, contentDoc)
	{
		this.doc		= panelDoc;
		this.contentDoc	= contentDoc;
		
		this.oData	=
		{
			People	: this.doc.getElementById('bodyPeople'),
			Org		: this.doc.getElementById('bodyOrg'),
			Product	: this.doc.getElementById('bodyProduct')
		};
		
		//this.flushData();

		this.parseVCards();
		this.parseHProducts();
		this.parseRDFa();
		
		this.handleNav();
		this.populateData();
	},
	
	hideData	: function()
	{
		for (var iI = 0, aA = this.doc.getElementsByClassName('bodyTitle'); iI < aA.length; iI++)
		{
			aA[iI].style.display	= "none";
		}
		
		for (var xI in this.oData)
		{
			this.oData[xI].style.display	= "none";
		}
	},
	
	showData	: function(sData)
	{
		this.hideData();

		this.doc.getElementById('header'+ sData).style.display	= "table-cell";


		if (sData == "All")
		{
			for (var xI in this.oData)
			{
				this.oData[xI].style.display	= "table";
			}
		}
		else
			this.oData[sData].style.display	= "table";
	},
	
	handleNav	: function()
	{
		this.navAll		= new NavItem('All');
		this.navPeople	= new NavItem('People');
		this.navOrg		= new NavItem('Org');
		this.navProduct		= new NavItem('Product');
		
		this.navPeople.setAmount(this.aPeople.length);
		this.navOrg.setAmount(this.aOrg.length);
		this.navProduct.setAmount(this.aProduct.length);
		
		if (this.navPeople.getAmount() > 0)
		{
			this.navPeople.enable();
		}

		if (this.navOrg.getAmount() > 0)
		{
			this.navOrg.enable();
		}
		
		if (this.navProduct.getAmount() > 0)
		{
			this.navProduct.enable();
		}

		this.navAll.setAmount(this.navAll.getAmount() + this.navPeople.getAmount() + this.navOrg.getAmount() + this.navProduct.getAmount());
	},
	
	flushData	: function()
	{
		this.aPeople	= [];
		this.aOrg		= [];
		/*var aPeopleTR	= this.oData["People"].getElementsByTagName('tr');
		var aOrgTR	= this.oData["Org"].getElementsByTagName('tr');
		
		while (aPeopleTR.length > 1)
		{
			this.oData["People"].removeChild(aPeopleTR[aPeopleTR.length-1]);
		}

		while (aOrgTR.length > 1)
		{
			this.oData["Org"].removeChild(aOrgTR[aOrgTR.length-1]);
		}*/

	},
	
	populateData	: function()
	{
		this.doc.getElementById('countAll').innerHTML	= this.navAll.getAmount();
		this.doc.getElementById('countPeople').innerHTML	= this.navPeople.getAmount();
		this.doc.getElementById('countOrg').innerHTML	= this.navOrg.getAmount();
		this.doc.getElementById('countProduct').innerHTML	= this.navProduct.getAmount();
		
		this.showData("All");
		this.navAll.select();


		// PEOPLE
		for (var xI in this.aPeople)
		{
			var oTR	= this.doc.createElement('tr');
			
			var oTD1	= this.doc.createElement('td');
			oTD1.className	= "td1";
			oTD1.innerHTML	= "<a href='' title='Show details'>+<\/a>";

			var oTD2	= this.doc.createElement('td');
			oTD2.className	= "td2";
			oTD2.innerHTML	= this.aPeople[xI].givenName;
			
			var oTD3	= this.doc.createElement('td');
			oTD3.className	= "td3";
			oTD3.innerHTML	= this.aPeople[xI].familyName;
			
			var oTD4	= this.doc.createElement('td');
			oTD4.className	= "td4";
			oTD4.innerHTML	= this.aPeople[xI].title;

			var oTD5	= this.doc.createElement('td');
			oTD5.className	= "td5";
			oTD5.innerHTML	= this.aPeople[xI].org;

			var oTD6	= this.doc.createElement('td');
			oTD6.className	= "td6";
			oTD6.innerHTML	= this.aPeople[xI].format;

			oTR.appendChild(oTD1);
			oTR.appendChild(oTD2);
			oTR.appendChild(oTD3);
			oTR.appendChild(oTD4);
			oTR.appendChild(oTD5);
			oTR.appendChild(oTD6);
			
			this.oData["People"].appendChild(oTR);
		}

		// ORG
		for (var xI in this.aOrg)
		{
			var oTR	= this.doc.createElement('tr');
			
			var oTD1	= this.doc.createElement('td');
			oTD1.className	= "td1";
			oTD1.innerHTML	= "<a href='' title='Show details'>+<\/a>";

			var oTD2	= this.doc.createElement('td');
			oTD2.className	= "td2";
			oTD2.innerHTML	= this.aOrg[xI].orgName;

			oTR.appendChild(oTD1);
			oTR.appendChild(oTD2);

			this.oData["Org"].appendChild(oTR);
		}

		// PRODUCT
		for (var xI in this.aProduct)
		{
			var oTR	= this.doc.createElement('tr');
			
			var oTD1	= this.doc.createElement('td');
			oTD1.className	= "td1";
			oTD1.innerHTML	= "<a href='' title='Show details'>+<\/a>";

			var oTD2	= this.doc.createElement('td');
			oTD2.className	= "td2";
			oTD2.innerHTML	= this.aProduct[xI].productName;

			var oTD3	= this.doc.createElement('td');
			oTD3.className	= "td3";
			oTD3.innerHTML	= this.aProduct[xI].category;

			var oTD4	= this.doc.createElement('td');
			oTD4.className	= "td4";
			oTD4.innerHTML	= this.aProduct[xI].description;

			var oTD5	= this.doc.createElement('td');
			oTD5.className	= "td5";
			oTD5.innerHTML	= this.aProduct[xI].price;

			var oTD6	= this.doc.createElement('td');
			oTD6.className	= "td6";
			oTD6.innerHTML	= this.aProduct[xI].url;

			var oTD7	= this.doc.createElement('td');
			oTD7.className	= "td6";
			oTD7.innerHTML	= this.aProduct[xI].format;

			oTR.appendChild(oTD1);
			oTR.appendChild(oTD2);
			oTR.appendChild(oTD3);
			oTR.appendChild(oTD4);
			oTR.appendChild(oTD5);
			oTR.appendChild(oTD6);
			oTR.appendChild(oTD7);

			this.oData["Product"].appendChild(oTR);
		}

	},
	
	parseVCards	: function()
	{
		var oElem	= this.contentDoc.getElementsByClassName('vcard');
		
		for (var iI = 0, iL = oElem.length; iI < iL; iI++)
		{
			var o	=
			{
				givenName	: this.getgivenName(oElem[iI]),
				familyName	: this.getFamilyName(oElem[iI]),
				orgName		: this.getOrgName(oElem[iI]),
				nickname	: this.getValueByClassName(oElem[iI], 'nickname'),
				title		: this.getValueByClassName(oElem[iI], 'title'),
				org			: this.getValueByClassName(oElem[iI], 'org'),
				url			: this.getAttrByClassName(oElem[iI], 'url', 'href'),
				
				format		: "hCard"
			};
			
			if (o.givenName != "" && o.familyName != "")
				this.aPeople.push(o);
			else if (o.orgName != "")
				this.aOrg.push(o);
			else if (o.productName != "")
				this.aProduct.push(o);
		}
		
		
		delete(oElem);
	},
	
	parseHProducts	: function()
	{
		var oElem	= this.contentDoc.getElementsByClassName('hproduct');
				
		for (var iI = 0, iL = oElem.length; iI < iL; iI++)
		{
			var o	=
			{
				productName	: this.getProductName(oElem[iI]),
				price		: this.getValueByClassName(oElem[iI], 'price'),
				category	: this.getValueByClassName(oElem[iI], 'category'),
				description	: this.getValueByClassName(oElem[iI], 'description'),
				url			: this.getAttrByClassName(oElem[iI], 'url', 'href'),
				photo		: this.getAttrByClassName(oElem[iI], 'photo', 'src'),
				
				format		: "hProduct"
			};
			
			if (o.productName != "")
				this.aProduct.push(o);
		}
		
		
		delete(oElem);
	},

	parseRDFa	: function()
	{
		var oPerson	= getElementsByAttribute(SEMANTICON.contentDoc.body, "div", "typeof", "v:Person");

		for (var iI = 0, iL = oPerson.length; iI < iL; iI++)
		{
			// PREVENTS DUPLICATES: hCard is default
			if (! !!~oPerson[iI].className.indexOf("vcard"))
			{
				var o	=
				{
					givenName	: this.getgivenName(oPerson[iI]),
					familyName	: this.getFamilyName(oPerson[iI]),
					orgName		: this.getOrgName(oPerson[iI]),
					nickname	: this.getValueByProperty({handle:oPerson[iI], prop:'v:nickname'}),
					title		: this.getValueByProperty({handle:oPerson[iI], prop:'title'}),
					org			: this.getValueByProperty({handle:oPerson[iI], prop:'v:affiliation'}),
					url			: this.getValueByProperty({handle:oPerson[iI], prop:'v:url'}),
            	
					format		: "RDFa"
					
				};
            	
				if (o.givenName != "" && o.familyName != "")
					this.aPeople.push(o);
				else if (o.orgName != "")
					this.aOrg.push(o);
			}
		}

		delete(oPerson);

		var oProduct	= getElementsByAttribute(SEMANTICON.contentDoc.body, "div", "typeof", "v:Product");

		for (var iI = 0, iL = oProduct.length; iI < iL; iI++)
		{
			// PREVENTS DUPLICATES: hProduct is default
			if (! !!~oProduct[iI].className.indexOf("hproduct"))
			{
				var o	=
				{
					productName	: this.getProductName(oProduct[iI]),
					price		: this.getValueByProperty({handle:oProduct[iI], prop:'v:price'}),
					category	: this.getValueByProperty({handle:oProduct[iI], prop:'v:category'}),
					description	: this.getValueByProperty({handle:oProduct[iI], prop:'v:description'}),
					url			: this.getValueByProperty({handle:oProduct[iI], prop:'v:url'}),
					photo		: this.getValueByProperty({handle:oProduct[iI], tgt:'img', prop:'v:photo', retval:'src'}),
	
					format		: "RDFa"
					
				};
	
				if (o.productName != "")
					this.aProduct.push(o);
			}
		}

		delete(oProduct);

	},
	
	getOrgName		: function(oHandle)
	{
		var sRetVal;
		
		sRetVal	= this.getValueByClassName(oHandle, 'org');
		
		if (sRetVal.length < 1)
		{
			sRetVal	= this.getValueByClassName(oHandle, 'fn', SEMANTICON.ORG);
			
			if (sRetVal.length > 0)
				sRetVal	=	sRetVal.split(" ")[0];
		}
		
		//	FORMAT NOT hCard, LET'S TRY RDFa
		if (sRetVal.length < 1)
		{
			sRetVal	= this.getValueByProperty({handle:oHandle, prop:'v:organization'});
			
			if (sRetVal.length > 0)
				sRetVal	=	sRetVal.split(" ")[0];
		}

		return sRetVal;
	},
	
	getProductName		: function(oHandle)
	{
		var sRetVal;
		
		sRetVal	= this.getValueByClassName(oHandle, 'name');
		
		if (sRetVal.length < 1)
		{
			sRetVal	= this.getValueByClassName(oHandle, 'fn', SEMANTICON.PRODUCT);
		}
		
		//	FORMAT NOT hProduct, LET'S TRY RDFa
		if (sRetVal.length < 1)
		{
			sRetVal	= this.getValueByProperty({handle:oHandle, prop:'v:name'});
			
			if (sRetVal.length > 0)
				sRetVal	=	sRetVal.split(" ")[0];
		}

		return sRetVal;
	},

	getgivenName	: function(oHandle)
	{
		var sRetVal;
		
		sRetVal	= this.getValueByClassName(oHandle, 'given-name');
		
		if (sRetVal.length < 1)
		{
			sRetVal	= this.getValueByClassName(oHandle, 'fn', SEMANTICON.PEOPLE);
			
			if (sRetVal.length > 0)
				sRetVal	=	sRetVal.split(" ")[0];
		}
		
		//	FORMAT NOT hCard, LET'S TRY RDFa
		if (sRetVal.length < 1)
		{
			sRetVal	= this.getValueByProperty({handle:oHandle, prop:'v:name'});
			
			if (sRetVal.length > 0)
				sRetVal	=	sRetVal.split(" ")[0];
		}

		return sRetVal;
	},

	getFamilyName	: function(oHandle)
	{
		var sRetVal;
		
		sRetVal	= this.getValueByClassName(oHandle, 'family-name');
		
		if (sRetVal.length < 1)
		{
			sRetVal	= this.getValueByClassName(oHandle, 'fn', SEMANTICON.PEOPLE);

			if (sRetVal.length > 0)
				sRetVal	=	sRetVal.split(" ")[1];
		}

		//	FORMAT NOT hCard, LET'S TRY RDFa
		if (sRetVal.length < 1)
		{
			sRetVal	= this.getValueByProperty({handle:oHandle, prop:'v:name'});
			
			if (sRetVal.length > 0)
				sRetVal	=	sRetVal.split(" ")[1];
		}

		return sRetVal;
	},


	getValueByClassName	: function(oHandle, sClass)
	{
		var o = oHandle.getElementsByClassName(sClass);
		
		// LOOKING ONLY FOR PEOPLE
		if (arguments[2] === 2)
		{
			if (o.length > 0 && !!~o[0].className.indexOf("org"))
			{
				return "";
			}
			
		}

		// LOOKING ONLY FOR ORGANIZATIONS
		else if (arguments[2] === 4)
		{
			if (o.length > 0 && !!~o[0].className.indexOf("org"))
			{
				return (o.length > 0 && !!~o[0].className.indexOf("org")) ? o[0].innerHTML : "";
			}
		}

		// LOOKING ONLY FOR PRODUCTS
		else if (arguments[2] === 8)
		{
			if (o.length > 0 && !!~o[0].className.indexOf("fn"))
			{
				return (o.length > 0 && !!~o[0].className.indexOf("fn")) ? o[0].innerHTML : "";
			}
		}
		
		return (o.length > 0) ? o[0].innerHTML : "";
	},
	
	getValueByProperty	: function(oParam)
	{
		var oHandle	= oParam.handle;
		var sTgt	= oParam.tgt || "*";
		var sProp	= oParam.prop;

		var o = getElementsByAttribute(oHandle, sTgt, "property", sProp);

		var sRetVal	= oParam.retval || (o.length > 0) ? o[0].innerHTML : "";

		return sRetVal;
	},

	getAttrByClassName	: function(oHandle, sClass, sAttr)
	{
		var o = oHandle.getElementsByClassName(sClass);
		
		return (o.length > 0) ? o[0].getAttribute(sAttr) : "";
	},
};


//	NAVITEM

function NavItem(sId)
{
	this.instance	= SEMANTICON.doc.getElementById(sId);
	this.instance.oParent	= this;
	this.amount	= this.instance.getElementsByClassName('amount')[0];
	
	this.instance.onclick	= function()
	{
		if (!!~this.className.indexOf("disabled"))
			return false;
			
		this.oParent.select();
		SEMANTICON.showData(this.id);
	}
	
	return this;
};

NavItem.prototype	=
{
	enable	: function()
	{
		this.instance.className	= this.instance.className.replace("disabled", "");
	},
	
	select	: function()
	{
		if (SEMANTICON.oCurrentlySelected)
			SEMANTICON.oCurrentlySelected.deselect();
			
		SEMANTICON.oCurrentlySelected	= this;
		
		this.instance.className	+= (this.instance.className.length > 0)? " selected" : "selected";
	},
	
	deselect	: function()
	{
		this.instance.className	= this.instance.className.replace("selected", "");
	},
	
	setAmount	: function(iA)
	{
		this.amount.innerHTML	= Number(iA);
	},

	getAmount	: function()
	{
		return Number(this.amount.innerHTML);
	},

};


function cout(sMsg)
{
	if (typeof console != "undefined")
		console.log(sMsg);
};


/*
	Copyright Robert Nyman, http://www.robertnyman.com
	Free to use if this text is included
	
	Modified: Added case-insensitive to RegExp
*/

function getElementsByAttribute(oElm, strTagName, strAttributeName, strAttributeValue)
{ 
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	var oAttributeValue = (typeof strAttributeValue != "undefined")? new RegExp("(^|\\s)" + strAttributeValue + "(\\s|$)", "i") : null;
	var oCurrent; 
	var oAttribute; 
	
	for(var i=0; i<arrElements.length; i++)
	{
		oCurrent = arrElements[i];
		oAttribute = oCurrent.getAttribute && oCurrent.getAttribute(strAttributeName);
		if(typeof oAttribute == "string" && oAttribute.length > 0)
		{ 
			if(typeof strAttributeValue == "undefined" || (oAttributeValue && oAttributeValue.test(oAttribute)))
				arrReturnElements.push(oCurrent); 
		} 
	} 

	return arrReturnElements; 
};
