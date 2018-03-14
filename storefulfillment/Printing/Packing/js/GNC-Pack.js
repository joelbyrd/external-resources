/**
 * Creates a new PrintDocument Object
 * @class
 * @classdesc Represents the print document as a whole, containing a list of pick tickets or orders
 */
var PrintDocument = (function () {
	function PrintDocument(title, itemsPerPage, itemsPerLastPage, headerPages, itemHeaderPages, fillBlankItems) {

		document.title			=	title || "Pack Slip";
		this.ItemsPerPage		=	itemsPerPage || 8;
		this.ItemsPerLastPage	=	itemsPerLastPage || 8;
		this.FillBlankItems		=	!!fillBlankItems;
		this.DateTime			=	new Date();

		// HeaderPages and ItemHeaderPages:
		//		first page only; "every": every page; "everyWithItems": only on pages that also write items
		this.HeaderPages		=	headerPages || "every";
		this.ItemHeaderPages	=	itemHeaderPages || "everyWithItems";

		this.Orders				=	[];
		this.AddOrder			=	addOrder;

		this.SiteURL			=	"https://clientName.gsipartners.com";

		// find SiteURL (baseURL)
		var protocol = document.location.protocol;
		if (protocol.toLowerCase() !== "file:") {
			var domain = document.location.host || document.location.hostname;
			var portCheckDomain = domain.match(/:(\d+)/);
			var port = undefined;
			if (portCheckDomain && portCheckDomain[1] && portCheckDomain[1] !== "")
				port = portCheckDomain[1];
			var portCheckLocation = document.location.port;
			if (portCheckLocation && portCheckLocation === "")
				portCheckLocation = undefined;
			port = port || portCheckLocation || (protocol.toLowerCase() === "https" ? "443" : "80");
			domain = domain.replace(/:.*$/, "");

			//if a test site: word test or dev in the url, or there is a port in the URL
			if (location.port || domain.match("localhost") || domain.match("127.0.0.1") || domain.toUpperCase().indexOf("TEST") > -1 || domain.toUpperCase().indexOf("DEV") > -1) {
				//load from the individual test sites
				this.SiteURL = protocol + "//" + domain + (port ? ':' + port : '');
				//this.SiteURL = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
			}
		}

		this.SiteURL += "/";
		
		console.log("SiteURL: " + this.SiteURL);
	}

	function addOrder(order){
		// add unique orders only
		var foundIndex = this.Orders.findIndex(function(i) { return i.UniqueId === order.UniqueId; });

		if (foundIndex == -1) {
			console.log("adding new order: " + order.UniqueId);
			this.Orders.push(order);
			return order;
		}

		console.log("appending to existing order: " + this.Orders[foundIndex].UniqueId);
		return this.Orders[foundIndex];
	}//addOrder

	return PrintDocument;
})();

/**
 * Creates a new Order Object
 * @class
 * @classdesc Represents an order in the list of PrintDocument.Orders
 */
var Order = (function () {
	function Order(uniqueId) {
		// used to uniquely identify this in the list; PickBatch_Who_Picker for pick tickets and OrderNo (and ShipmentId?) for orders
		this.UniqueId			=	(uniqueId || "").trimAndStrip();

		this.Header				=	"";
		this.Items				=	[];
		this.CarrierInfo		=	"";

		this.SetHeader			=	setHeader;
		this.SetAddress			=	setAddress;
		this.AddItem			=	addItem;
		this.SetMaxPage			=	setMaxPage;
		this.RenderCarrierLabel	=	renderCarrierLabel;
		this.ExportData			=	exportData;
		this.RenderToDocument	=	renderToDocument;
	};

	function exportData() {
		console.log("Exporting");

		// Get the modal to display export data
		var modal = document.getElementById('exportModal');

		var exportClasses = document.querySelectorAll(".ExportData");
		var outputContent = document.getElementById("exportContent");
		var exportText = "";
		var tmpText = "";

		var dateTimeNoFormat = ( printDocument.DateTime.getFullYear().toString() +
								(printDocument.DateTime.getMonth() + 1).toString().padStart(2,"0") +
								printDocument.DateTime.getDay().toString().padStart(2,"0") +
								printDocument.DateTime.getHours().toString().padStart(2,"0") +
								printDocument.DateTime.getMinutes().toString().padStart(2,"0") +
								printDocument.DateTime.getSeconds().toString().padStart(2,"0") );

		for(var i = 0; i < exportClasses.length; i++)
		{
		   tmpText = exportClasses.item(i).innerHTML
		   tmpText = tmpText.replace(/order/g,"order" + dateTimeNoFormat);
		   tmpText = tmpText.replace(/.*AddItem\(new Item\("&nbsp;","&nbsp;".*$/gm,"");
		   tmpText = tmpText.trim();
		   tmpText = tmpText.replace(/\n/g,"<br />");
		   exportText += tmpText + "<br />";
		}

		outputContent.innerHTML = exportText + "&nbsp;";
		modal.style.display = "block";

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}
	}//exportData

	function setHeader(header){
		// set the header if there is no header already set
		if ((this.Header == null || typeof this.Header !== 'object') ){
			this.Header = header;
			//console.log("added pick header:" + JSON.stringify(header));
		}
	}//setHeader

	function setAddress(addressType, address){
		// set an address if that address type is not already set
		switch (addressType) {
			case "buyer":
				if (!this.Header.BuyerAddress) {
					this.Header.BuyerAddress = address;
				}
				break;

			case "billTo":
				if (!this.Header.BillToAddress) {
					this.Header.BillToAddress = address;
				}
				break;

			case "shipTo":
				if (!this.Header.ShipToAddress) {
					this.Header.ShipToAddress = address;
				}
				break;

			default:
				//throw new Error("Invalid Address Type");
		}
	}//setAddress

	function addItem(item) {
		// add valid items only
		if (!item || !item.IsValidItem()) return;

		// set non-item properties 1x based on information found in the first item
		//if (this.Items.length == 0) // first item
		//	this.NotRecap = (item.RtnStock + item.Picked + item.Allocated == 0);

		this.Items.push(item);
		//console.log("added item:" + JSON.stringify(item));
	}//addItem

	function setMaxPage(){
		var countOfItems = this.Items.length;

		// check to see how many pages: divide number of items by items per page and round up (this is the Math.ceil result)
		if (countOfItems > 0 )
			this.Header.MaxPage = Math.ceil(countOfItems / printDocument.ItemsPerPage);
		else
			this.Header.MaxPage = -1;

		//console.log("countOfItems:" + countOfItems + ";   ItemsPerPage:" + printDocument.ItemsPerPage + ";   m.ceil:" + Math.ceil(countOfItems / printDocument.ItemsPerPage) + ";   this.Header.MaxPage:" + this.Header.MaxPage);
		// if the number items on the last page is greater than the items per last page limit, then increase this.Header.MaxPage by 1
		//		checks the remainder (modulo) when dividing total item count by items per page
		//		also checks when there is no remainder (=0) for when items per last page is less than items per page (common setup)
		if (((countOfItems % printDocument.ItemsPerPage) > printDocument.ItemsPerLastPage) || ((countOfItems % printDocument.ItemsPerPage) == 0 && printDocument.ItemsPerPage > printDocument.ItemsPerLastPage))
			this.Header.MaxPage++;
		//console.log("remainder (modulo) ItemsPerPage:" + (countOfItems % printDocument.ItemsPerPage) + ";   ItemsPerLastPage:" + printDocument.ItemsPerLastPage + ";   this.Header.MaxPage:" + this.Header.MaxPage);
	}//setMaxPage

	function renderToDocument(target) {
		var thisPage;

		// page header
		var headerTemplate = document.getElementById("headerTemplate");

		// item table header
		// nothing dynamically loaded / rendered
		var itemHeaderTemplate = document.getElementById("itemHeaderTemplate").innerHTML;

		// items
		var itemTemplate = document.getElementById("itemTemplate");
		var itemGiftTemplate = document.getElementById("itemGiftTemplate");
		var blankItemTemplate = itemTemplate;

		// return instructions
		// nothing dynamically loaded / rendered
		var returnTemplate = document.getElementById("returnTemplate").innerHTML;

		// carrier label
		// until the carrier library is rewritten, a container for old document.write results is used rather than a proper template
		//var carrierTemplateToGet = "carrierTemplate" + this.Carrier;
		//var carrierTemplate = document.getElementById(carrierTemplateToGet);

		var pageText = "";

		// loop through the items
		// create the header info on the first page and any new pages
		// also write out completed pages as new ones are detected
		for (var i = 0; i < this.Items.length; ++i) {
			//console.log("this.Header.PageNo: " + this.Header.PageNo + "; item: " + i + "; ItemsPerPage: " + printDocument.ItemsPerPage + "; i % printDocument.ItemsPerPage: " + i % printDocument.ItemsPerPage);

			var thisItem = this.Items[i];

			if (i === 0 || i % printDocument.ItemsPerPage === 0) {
				//console.log("new page");

				// if this is not the first item, then write out the previous page
				if (i != 0) {
					pageText += returnTemplate;
					thisPage.innerHTML = pageText;
					target.appendChild(thisPage);
					this.Header.PageNo++;
				}

				// considered a startNewPage(target) function here since this logic is in 2 places
				//		but it would need to return 2 values: pageText and thisPage
				//		and the "every" check is different
				// start a new page
				pageText = "";
				thisPage = document.getElementById("newPage").cloneNode(true);

				// if this is the first page, or if we write a header every page with items, then create a new header
				if ((this.Header.PageNo == 1 && printDocument.HeaderPages == "firstOnly") || printDocument.HeaderPages.substring(0,5) == "every")
					pageText += this.Header.Render(headerTemplate);

				// if this is the first page, or if we write an item header every page with items, then create a new item header
				if ((this.Header.PageNo == 1 && printDocument.HeaderPages == "firstOnly") || printDocument.ItemHeaderPages.substring(0,5) == "every")
					pageText += itemHeaderTemplate;
			}

			// get the appropriate template based on whether or not the item is a gift
			// alternatively, if a gift item is spread across multiple "items", then there are a couple ways we could handle this
			//		a) search ahead here (ex. loop through this.Items[i]+1, this.Items[i]+2... ), looking for the next occurrence of a LineNum to know when the next item begins
			//		b) modify the addItem function to identify and build items so that each Item really is a single item
			//			ex. Item.GiftMessaging = ["giftLine1","giftLine2"]
			// in either case above (a) or (b), you'll need to keep track of paging and begin new pages as needed
			var templateToRender = thisItem.IsGift() ? itemGiftTemplate : itemTemplate;

			// write the item
			pageText += thisItem.Render(templateToRender);
		} // done looping through all items

		// if FillBlankItems is set
		// and the last page does not have the max number of items per page,
		// then add blank lines
		if (printDocument.FillBlankItems && this.Items.length % printDocument.ItemsPerPage != 0) {
			var numLinesToFill = printDocument.ItemsPerLastPage - (this.Items.length % printDocument.ItemsPerPage);
			pageText += thisItem.RenderBlank(blankItemTemplate, numLinesToFill);
		}

		// if the last page has the max number of items per page,
		// or if the last page has more items than are allowed on the last page,
		// then we need to add anoter page for the last page information (store instructions / carrier label)
		if (this.Items.length % printDocument.ItemsPerPage == 0 || this.Items.length % printDocument.ItemsPerPage > printDocument.ItemsPerLastPage ){
			// write out the left-over items
			pageText += returnTemplate;
			thisPage.innerHTML = pageText;
			target.appendChild(thisPage);
			this.Header.PageNo++;

			// last page info goes on a new page by itself
			// start a new page
			pageText = "";
			thisPage = document.getElementById("newPage").cloneNode(true);

			// if this is the first page, or if we write a header every page, then create a new header
			if ((this.Header.PageNo == 1 && printDocument.HeaderPages == "firstOnly") || printDocument.HeaderPages == "every")
				pageText += this.Header.Render(headerTemplate);

			// if this is the first page, or if we write an item header every page, then create a new item header
			if ((this.Header.PageNo == 1 && printDocument.HeaderPages == "firstOnly") || printDocument.ItemHeaderPages == "every")
				pageText += itemHeaderTemplate;

		}

		pageText += returnTemplate;
		//pageText += this.RenderCarrierLabel(carrierTemplate);	// for when the carrier library is rewritten
		pageText += this.RenderCarrierLabel("");
		thisPage.innerHTML = pageText;
		target.appendChild(thisPage);
	}//renderToDocument

	function renderCarrierLabel() { /* don't populate an element, return the data back */
		//console.log("rendering instructions");

		// when the carrier library is written...
		//		get the correct carrier template
		//		var carrierTemplate;
		//		switch (carrier) case "UPS" ... case "FedEx" ... case "USPS" ...

		// until the carrier library is rewritten, place the results from the old one in a <div> container
		var templateEl = document.getElementById("carrierContainer");	// remove this when the carrier library is rewritten to use the passed value

		if (typeof templateEl === "string")
			templateEl = document.querySelectorAll(templateEl);
		
		var template = templateEl.innerHTML;

		var label = new CarrierLabel(this.CarrierInfo);
		// this standard assumes Exp Address is used (hide is not checked)
		// current/old carrier library assumes Exp Address is used (hide is checked) - override those invalid «ShipToX» tags
		/*
		label.shipTo = [this.Header.ShipToAddress.FName + " " + this.Header.ShipToAddress.LName,
						this.Header.ShipToAddress.Street,
						this.Header.ShipToAddress.Street2,
						this.Header.ShipToAddress.Ref1,
						this.Header.ShipToAddress.Ref2,
						this.Header.ShipToAddress.City + " " + this.Header.ShipToAddress.State,
						this.Header.ShipToAddress.Zip];
		*/

		var carrierLabelBody = redirectDocumentWrite(label.selectLabelType);
		
		template = template.replaceAll("{CarrierLabel}", carrierLabelBody);
		
		return template;
	}//renderCarrierLabel

	return Order;
})();

/**
 * Creates a new Header Object
 * @class
 * @classdesc Represents the header information on an Order
 */
var Header = (function() {
	function Header(orderNo,coDivDept,salesPerson,shipMethod) {
		//class specific variables, these are all parameters for you to pass in.
		this.OrderNo			=	orderNo;
		this.CoDivDept			=	coDivDept;
		this.SalesPerson		=	salesPerson;
		this.WebOrderNo			=	salesPerson;
		this.ShipMethod			=	shipMethod;

		this.BillToAddress		=	"";
		this.BuyerAddress		=	"";
		this.ShipToAddress		=	"";
		this.Storeaddress		=	"";

		this.PageNo				=	1;
		this.MaxPage			=	0;

		this.Render				=	render;
	};

	function render (templateEl) { /* don't populate an element, return the data back */
		// copied from item - needs some other type of check?
		//if (!templateEl || !this.IsValidItem()) return "";

		if (typeof templateEl === "string")
			templateEl = document.querySelectorAll(templateEl);

		var template = templateEl.innerHTML;

		var dateDisplay = printDocument.DateTime.toLocaleDateString("en-US", { year:'numeric', month:'2-digit', day: '2-digit'});
		var timeDisplay = printDocument.DateTime.toLocaleTimeString("en-US", { hour12: false, hour:'2-digit', minute:'2-digit', second: '2-digit' })

		// replace all the values we define in our templates
		template = template.replaceAll("{OrderNo}", this.OrderNo);
		template = template.replaceAll("{CoDivDept}", this.CoDivDept);
		template = template.replaceAll("{PageNo}", this.PageNo);
		template = template.replaceAll("{MaxPage}", this.MaxPage);
		template = template.replaceAll("{SalesPerson}", this.SalesPerson);
		template = template.replaceAll("{WebOrderNo}", this.WebOrderNo);
		template = template.replaceAll("{ShipMethod}", this.ShipMethod);

		var displayBillToPhone = false;
		var displayBillToCountry = true;
		var displayShipToPhone = true;
		var displayShipToCountry = false;

		template = template.replaceAll("{BillToAddress}", this.BillToAddress.GetFormatted(displayBillToPhone,displayBillToCountry));
		template = template.replaceAll("{ShipToAddress}", this.ShipToAddress.GetFormatted(displayShipToPhone,displayShipToCountry));

		template = template.replaceAll("{Date}", dateDisplay);
		template = template.replaceAll("{Time}", timeDisplay);

		return template;
	}

	return Header;

})();

/**
 * Creates a new Header Object
 * @class
 * @classdesc Represents the address information on an Order.Header... .BuyerAddress, .BillToAddress, or .ShipToAddress
 */
var Address = (function() {
	function Address(prefix,fName,mI,lName,suffix,name,ref1,ref2,street,street2,city,state,zip,phone,country) {
		//class specific variables, these are all parameters for you to pass in.
		this.Prefix			=	(prefix || "").trimAndStrip();
		this.FName			=	(fName || "").trimAndStrip();
		this.MI				=	(mI || "").trimAndStrip();
		this.LName			=	(lName || "").trimAndStrip();
		this.Suffix			=	(suffix || "").trimAndStrip();
		this.Name			=	(name || "").trimAndStrip();
		this.Ref1			=	(ref1 || "").trimAndStrip();
		this.Ref2			=	(ref2 || "").trimAndStrip();
		this.Street			=	(street || "").trimAndStrip();
		this.Street2		=	(street2 || "").trimAndStrip();
		this.City			=	(city || "").trimAndStrip();
		this.State			=	(state || "").trimAndStrip();
		this.Zip			=	(zip || "").trimAndStrip();
		this.Phone			=	(phone || "").trimAndStrip();
		this.Country		=	(country || "").trimAndStrip();

		this.GetFormatted	=	getFormatted;
	};

	function getFormatted(withPhone,withCountry) {

		// put the name together, adding a space after each part of the name if it is not blank
		var formattedName = [this.Prefix, this.FName, this.MI, this.LName, this.Suffix].filter(function(f) { return !!f; }).join(" ").trim();

		var cityWithComma = this.City ? this.City + "," : "";
		var formattedCityStateZip = [cityWithComma, this.State, this.Zip].filter(function(f) { return !!f; }).join(" ").trim();

		// put the address together, adding a new line after each part of the address if it is not blank
		var formattedAddress;
		formattedAddress = [formattedName, this.Name, this.Ref1, this.Ref2, this.Street, this.Street2, formattedCityStateZip].filter(function(f) { return !!f; }).join("<br />").trim();
		// add phone / country
		formattedAddress += withPhone ? "<br />" + this.Phone : "";
		formattedAddress += withCountry ? "<br />" + this.Country : "";

		formattedAddress = formattedAddress.replace(/\s*\<br\s*\/?\>\s*$/i, "");

		return formattedAddress;
	}

	return Address;

})();

/**
 * Creates a new Item Object
 * @class
 * @classdesc Represents an Item on an Order
 */
var Item = (function() {
	function Item(lineNo,vendorDesc,sku,webStyle,quantity,unitPrice,extPrice,tax,customAttr) {
		this.IsGift			=	isGift;
		this.IsValidItem	=	isValidItem;
		this.Render			=	render;
		this.RenderBlank	=	renderBlank;

		// order.AddItem(new Item("«LineNo1»","«SKU1»","«VendorDesc1»","«WebStyle1»","«Quantity1»","«UnitPrice1»","«ExtPrice1»","«Tax1»",{czStripA:"«czStripA1»",czStripB:"«czStripB1»"}));
		//class specific variables
		this.LineNo			=	lineNo.trimAndStrip() || "&nbsp;";
		this.Sku			=	sku.trimAndStrip() || "&nbsp;";
		this.VendorDesc		=	vendorDesc.trimAndStrip() || "&nbsp;";
		this.WebStyle		=	webStyle.trimAndStrip() || "&nbsp;";
		this.Quantity		=	quantity.trimAndStrip() || "&nbsp;";

	    customAttr = customAttr || {}; //this should be a hash defined with attributes, then pull data with this.customAttr['attribute'] in functions

	    // now clean up the attributes removing any that are blank/empty or still have VN tags in them
        // do this before assigning to this.CustomAttr because then "this" is messed up in the forEach callback
	    Object.keys(customAttr).forEach(function (key) {
	        var attr = customAttr[key];
	        if (typeof attr === "string") {
	            var tmp = attr.trimAndStrip();
	            if (!tmp) delete customAttr[key];
	            else customAttr[key] = tmp;
	        } else if (typeof attr === "undefined" || attr == null) {
	            delete customAttr[key];
	        }
	    });

	    this.CustomAttr = customAttr;


		// money values
		this.UnitPrice = parseFloatIgnoreCommaDollars(unitPrice);
		this.ExtPrice = parseFloatIgnoreCommaDollars(extPrice);
		this.Tax = parseFloatIgnoreCommaDollars(tax);
	};

	//function isValidItem ) { return !!this.ItemId; }
	function isValidItem() { return this.VendorDesc != "&nbsp;"; }

	// render this ITEM to the target element. we can put logic in here to omit certain fields or gift logic or whatever we want
	// we would have multiple render methods, one per class... Item, PickTicket, Header... maybe even a "page" class
	// this would be very similar to how current pick tickets are except probably a little more granular rather than the one/two giant objects
	function render(templateEl) { /* don't populate an element, return the data back */
		if (!templateEl || !this.IsValidItem()) return "";

		if (typeof templateEl === "string")
			templateEl = document.querySelectorAll(templateEl);

		// note on images
		// trying to load an image in the template like other values throws an error in the template itself: src={Image}
		// and replacing the whole thing including the src (ex. {imgSrc} as "src=...") resulted in no image loading
		// this work-around modifies the template, which probably isn't the best, so we may want to look more into other solutions
		//var img = templateEl.getElementsByTagName('img')[0];
		//img.src = this.CustomAttr['image'] || "";

		var template = templateEl.innerHTML;

		// replace all the values we define in our templates
		template = template.replaceAll("{LineNo}", this.LineNo);
		template = template.replaceAll("{Sku}", this.Sku);
		template = template.replaceAll("{VendorDesc}", this.VendorDesc);
		template = template.replaceAll("{Description}", this.Description);
		template = template.replaceAll("{WebStyle}", this.WebStyle);
		template = template.replaceAll("{Quantity}", this.Quantity);

		// money
		template = template.replaceAll("{UnitPrice}", this.UnitPrice.toMoney());
		template = template.replaceAll("{ExtPrice}", this.ExtPrice.toMoney());
		template = template.replaceAll("{Tax}", this.Tax.toMoney());

		// custom
		template = template.replaceAll("{czStripA}", this.CustomAttr['czStripA'] || "&nbsp;");
		template = template.replaceAll("{czStripB}", this.CustomAttr['czStripB'] || "&nbsp;");

		return template;
	} //render

	function renderBlank(templateEl,numBlankLines) { /* don't populate an element, return the data back */
		//console.log("rendering " + numBlankLines + " blank line(s)");
		if (typeof templateEl === "string")
			templateEl = document.querySelectorAll(templateEl);

		var template = "";
		for (var i = 0; i < numBlankLines; i++) {
			// find all columns in the item row and replace the contents with &nbsp;
			var cols = templateEl.getElementsByClassName("col");
			for (var j = 0; j < cols.length; j++) {
				cols[j].innerHTML = "&nbsp;"
			}
			template += templateEl.innerHTML;
		}

		return template;
	} //renderBlank

	function isGift() { return this.VendorDesc.indexOf("Gift Wrap") > -1; }

	return Item;

})();