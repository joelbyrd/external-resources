/**
 * Creates a new PrintDocument Object
 * @class
 * @classdesc Represents the print document as a whole, containing a list of pick tickets or orders
 */
var PrintDocument = (function () {
	function PrintDocument(title, itemsPerPage, itemsPerLastPage, headerPages, itemHeaderPages) {
		document.title			=	title || "Pick Ticket";
		this.ItemsPerPage		=	itemsPerPage || 8;
		this.ItemsPerLastPage	=	itemsPerLastPage || 5;
		this.DateTime			=	new Date();
		this.DateDisplay		=	this.DateTime.toLocaleDateString("en-US", { year:'numeric', month:'2-digit', day: '2-digit'});
		this.TimeDisplay		=	this.DateTime.toLocaleDateString("en-US", { year:'numeric', month:'2-digit', day: '2-digit'});

		// HeaderPages and ItemHeaderPages:
		//		first page only; "every": every page; "everyWithItems": only on pages that also write items
		this.HeaderPages		=	headerPages || "every";
		this.ItemHeaderPages	=	itemHeaderPages || "everyWithItems";

		this.PickTickets		=	[];
		this.AddPickTicket		=	addPickTicket;
	}

	function addPickTicket(pickTicket){
		// add unique pick tickets only
		var foundIndex = this.PickTickets.findIndex(function(i) { return i.UniqueId === pickTicket.UniqueId; });

		if (foundIndex == -1) {
			console.log("adding new pick ticket: " + pickTicket.UniqueId);
			pickTicket.Document = this;
			this.PickTickets.push(pickTicket);
			return pickTicket;
		}

		console.log("appending to existing ticket: " + this.PickTickets[foundIndex].UniqueId);
		return this.PickTickets[foundIndex];

		/* non-polyfill version (does not use Array.findIndex)
		for (var i = 0; i < this.PickTickets.length; i++) {
			var oldPickTicket = this.PickTickets[i];

			if (pickTicket.UniqueId == oldPickTicket.UniqueId) {
				// this pick ticket already exists in the list of print documents
				console.log("appending to existing ticket: " + oldPickTicket.UniqueId);
				return oldPickTicket;
			}
		}

		// new pick ticket
		console.log("adding new pick ticket: " + pickTicket.UniqueId);

		// copy these to the pick header
		// maybe look for another way to do this without doubling up on these values (at print doc and also pick header levels) and without using a global?

		this.PickTickets.push(pickTicket);
		return pickTicket;
		*/
	}//addPickTicket

	return PrintDocument;
})();

/**
 * Creates a new PickTicket Object
 * @class
 * @classdesc Represents a pick ticket in the list of PrintDocument.PickTickets
 */
var PickTicket = (function () {
	function PickTicket(uniqueId) {
		// used to uniquely identify this in the list; PickBatch_Who_Picker for pick tickets and OrderNo (and ShipmentId?) for orders
		this.UniqueId			=	(uniqueId || "").trimAndStrip();

		this.NotRecap			=	true;
		this.Header				=	"";
		this.Items				=	[];

		this.TicketType			=	checkTicketType;
		this.SetHeader			=	setHeader;
		this.AddItem			=	addItem;
		this.SetMaxPage			=	setMaxPage;
		this.SortItems			=	sortItems;
		this.RenderInstructions	=	renderInstructions;
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
		   tmpText = tmpText.replace(/pickTicket/g,"pickTicket" + dateTimeNoFormat);
		   tmpText = tmpText.replace(/.*AddItem.*("",){12}"".*$/gm, "");
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

	// check for SFS or ISPU
	function checkTicketType() {
		var ticketName = this.Header.TicketName;

		// ISPU: In Store Pick-Up
		// BOPIS: Buy Online Pickup In Store
		// YBINCGI: You Bought It, Now Come Get It		// joke
		var ispuTicketNames = ["ISPU","BOPIS","YBINCGI"];

		if (ispuTicketNames.some(function(ispuName){return ticketName.indexOf(ispuName) > -1;}))
			return "ISPU";

		return "SFS";
	}//checkTicketType

	function setHeader(header){
		// set the header if there is no header already set
		if ((this.Header == null || !(this.Header instanceof Header)) ){
			this.Header = header;
			//console.log("added pick header:" + JSON.stringify(header));
		}
	}//setHeader

	function addItem(item) {
		// add valid items only
		if (!item || !item.IsValidItem()) return;

		// set non-item properties 1x based on information found in the first item
		if (this.Items.length == 0) // first item
			this.NotRecap = (item.RtnStock + item.Picked + item.Allocated == 0);

		item.PickTicket = this;
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

	function sortItems(){
		this.Items.sort(function(a,b) {
			// sort for numerics
			if (isNumeric(a.SortValue) && isNumeric(b.SortValue)) return a.SortValue-b.SortValue;

			// sort for non-numerics
			if (a.SortValue<b.SortValue) return -1;
			if (a.SortValue>b.SortValue) return 1;

			return 0;
		})
	}//sortItems

	function renderToDocument(target) {
		var thisPage;

		// page header
		var headerTemplate = document.getElementById("headerTemplate");

		// item table header
		// nothing dynamically loaded / rendered
		var itemHeaderTemplate = document.getElementById("itemHeaderTemplate").innerHTML;

		// items
		var itemTemplate = document.getElementById("itemTemplate");

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
				thisPage.id = "";

				// if this is the first page, or if we write a header every page with items, then create a new header
				if ((this.Header.PageNo == 1 && printDocument.HeaderPages == "firstOnly") || printDocument.HeaderPages.substring(0,5) == "every")
					pageText += this.Header.Render(headerTemplate);

				// if this is the first page, or if we write an item header every page with items, then create a new item header
				if ((this.Header.PageNo == 1 && printDocument.HeaderPages == "firstOnly") || printDocument.ItemHeaderPages.substring(0,5) == "every")
					pageText += itemHeaderTemplate;
			}

			// write the item
			pageText += thisItem.Render(itemTemplate,this.TicketType());
		} // done looping through all items

		// if the last page has the max number of items per page,
		// or if the last page has more items than are allowed on the last page,
		// then we need to add anoter page for the last page information (store instructions / carrier label)
		if (this.Items.length % printDocument.ItemsPerPage == 0 || this.Items.length % printDocument.ItemsPerPage > printDocument.ItemsPerLastPage ){
			// write out the left-over items
			thisPage.innerHTML = pageText;
			target.appendChild(thisPage);
			this.Header.PageNo++;

			// last page info goes on a new page by itself
			// start a new page
			pageText = "";
			thisPage = document.getElementById("newPage").cloneNode(true);
			thisPage.id = "";

			// if this is the first page, or if we write a header every page, then create a new header
			if ((this.Header.PageNo == 1 && printDocument.HeaderPages == "firstOnly") || printDocument.HeaderPages == "every")
				pageText += this.Header.Render(headerTemplate);

			// if this is the first page, or if we write an item header every page, then create a new item header
			if ((this.Header.PageNo == 1 && printDocument.HeaderPages == "firstOnly") || printDocument.ItemHeaderPages == "every")
				pageText += itemHeaderTemplate;

			pageText += this.RenderInstructions();
			thisPage.innerHTML = pageText;
			target.appendChild(thisPage);
			this.Header.PageNo++;
		} else {
			// last page info fits on the last page with items
			pageText += this.RenderInstructions();
			thisPage.innerHTML = pageText;
			target.appendChild(thisPage);
		}
	}//renderToDocument

	function renderInstructions() {
		//console.log("rendering instructions");

		// instruction table header
		var instructionsText = document.getElementById("instructionsHeaderTemplate").innerHTML;

		// get the template for each instruction
		var instructionsTemplate = document.getElementById("instructionsTemplate").innerHTML;

		// get the correct instruction list; recap has priority over SFS / ISPU
		var instructionsToGet;
		instructionsToGet = this.NotRecap ? "instructionsList" + this.TicketType() : "recapInstructionsList" + this.TicketType();

		// convert the instruction list to an array
		var instructionList = document.getElementById(instructionsToGet).innerHTML;
		var instructionListArray = instructionList.split("\n");
		var numInstr;

		var instructionRows = "";

		// loop through the instructions and build the instruction rows
		for (var i = 0; i < instructionListArray.length; ++i) {
			var thisInstruction = instructionListArray[i];
			var template = instructionsTemplate;

			thisInstruction = thisInstruction.trim();
			if (!thisInstruction) continue;
			numInstr = thisInstruction.split("\t");

			//console.log("{#}:" + numInstr[0] + "; {instruction}: " + numInstr[1]);

			// replace all the values we define in our templates
			template = template.replaceAll("{#}", numInstr[0]);
			template = template.replaceAll("{instruction}", numInstr[1]);

			instructionRows += template;
		}

		// apply the instruction rows to the template
		instructionsText = instructionsText.replaceAll("{InstructionRows}", instructionRows);

		return instructionsText;
	}

	return PickTicket;
})();

/**
 * Creates a new Header Object
 * @class
 * @classdesc Represents the header information on a PickTicket
 */
var Header = (function() {
	function Header(who,picker,printBatch,carrier,ticketId,ticketNo,section1,location1,VendorNo1,VendorName1,ticketName,pickType,customAttr) {
		//class specific variables, these are all parameters for you to pass in.
		this.Who			=	who;
		this.Picker			=	picker;
		this.PrintBatch		=	printBatch;
		this.Carrier		=	carrier;
		this.TicketId		=	ticketId;
		this.TicketNo		=	ticketNo;
		this.Section1		=	section1;
		this.Location1		=	location1;
		this.VendorNo1		=	VendorNo1;
		this.VendorName1	=	VendorName1;
		this.TicketName		=	ticketName;
		this.PickType		=	pickType;
		this.CustomAttr		=	customAttr;

		this.PageNo			=	1;
		this.MaxPage		=	0;

		this.Render			=	render;
	};

	function render (templateEl) { /* don't populate an element, return the data back */
		// copied from item - needs some other type of check?
		//if (!templateEl || !this.IsValidItem()) return "";

		if (typeof templateEl === "string")
			templateEl = document.querySelectorAll(templateEl);

		var template = templateEl.innerHTML;

		var dateDisplay = printDocument.DateTime.toLocaleDateString("en-US", { year:'numeric', month:'2-digit', day: '2-digit'});
		var timeDisplay = printDocument.DateTime.toLocaleTimeString("en-US", { hour12: false, hour:'2-digit', minute:'2-digit', second: '2-digit' });

		// replace all the values we define in our templates
		template = template.replaceAll("{VendorNo1}", this.VendorNo1);
		template = template.replaceAll("{VendorName1}", this.VendorName1);
		template = template.replaceAll("{PageNo}", this.PageNo);
		template = template.replaceAll("{MaxPage}", this.MaxPage);
		template = template.replaceAll("{PrintBatch}", this.PrintBatch);
		template = template.replaceAll("{Date}", dateDisplay);
		template = template.replaceAll("{Time}", timeDisplay);
		template = template.replaceAll("{TicketName}", this.TicketName);
		template = template.replaceAll("{TicketId}", this.TicketNo);

		// note on images
		// trying to load an image in the template like other values throws an error in the template itself: src={Image}
		// and replacing the whole thing including the src (ex. {imgSrc} as "src=...") resulted in no image loading
		var newImg = document.createElement("img");
		newImg.src = "/images/Barcode.ashx?Code=" + this.PrintBatch + "&Type=128A&X=2.5&Y=0.4&round=1";	// printDocument.SiteURL
		newImg.style.width = "2.5in";
		newImg.style.height = "0.4in";
		newImg.style.border = "none";
		newImg.onerror = function() { this.style.visibility = "hidden";};//"this.style.visibility=\'hidden\';this.style.height=\'60px\';";
		template = template.replaceAll("{BarcodeImg}", newImg.outerHTML);

		return template;
	}

	return Header;

})();
/**
 * Creates a new Item Object
 * @class
 * @classdesc Represents an Item on a PickTicket
 */
var Item = (function() {
	function Item(itemId,sku,vsku,desc,vdesc,qty,upc,gtin,upcEnc,gtinEnc,encodeData, encodeDataEnc,
					section,location,location2,location3,sellingPrice,bin,picked,allocated,rtnStock,
					style,styleDesc,lvl1Sku,lvl2Sku,lvl3Sku,lvl4Sku,extCost,extPrice,catSKU,customAttr) {

		var nbspOnBlank = true;

		//class specific variables
		this.ItemId = itemId.trimAndStrip(nbspOnBlank);
		this.Sku = sku.trimAndStrip(nbspOnBlank);
		this.VSku = vsku.trimAndStrip(nbspOnBlank);
		this.Description = desc.trimAndStrip(nbspOnBlank);
		this.VDesc = vdesc.trimAndStrip(nbspOnBlank);
		this.Qty = qty.trimAndStrip(nbspOnBlank);
		this.Upc = upc.trimAndStrip(nbspOnBlank);
		this.Gtin = gtin.trimAndStrip(nbspOnBlank);
		this.UpcEnc = upcEnc.trimAndStrip(nbspOnBlank);
		this.GtinEnc = gtinEnc.trimAndStrip(nbspOnBlank);
		this.EncodeData = encodeData.trimAndStrip(nbspOnBlank);
		this.EncodeDataEnc = encodeDataEnc.trimAndStrip(nbspOnBlank);
		this.Section = section.trimAndStrip(nbspOnBlank);
		this.BaseLocation = location.trimAndStrip(nbspOnBlank);
		this.ItmLocation2 = location2.trimAndStrip(nbspOnBlank);
		this.ItmLocation3 = location3.trimAndStrip(nbspOnBlank);
		this.SellingPrice = sellingPrice.trimAndStrip(nbspOnBlank);
		this.Bin = bin.trimAndStrip(nbspOnBlank);  //will be slot passed in
		this.Picked = picked.trimAndStrip(nbspOnBlank);
		this.Allocated = allocated.trimAndStrip(nbspOnBlank);
		this.RtnStock = rtnStock.trimAndStrip(nbspOnBlank);
		this.Itmstyle = style.trimAndStrip(nbspOnBlank);
		this.StyleDesc = styleDesc.trimAndStrip(nbspOnBlank);
		this.Lvl1Sku = lvl1Sku.trimAndStrip(nbspOnBlank);
		this.Lvl2Sku = lvl2Sku.trimAndStrip(nbspOnBlank);
		this.Lvl3Sku = lvl3Sku.trimAndStrip(nbspOnBlank);
		this.Lvl4Sku = lvl4Sku.trimAndStrip(nbspOnBlank);
		this.CatSku = catSKU.trimAndStrip(nbspOnBlank);
		this.CustomAttr	=	customAttr; //this should be a hash defined with attributes, then pull data with this.CustomAttr['attribute'] in functions

		// set recap for slot information
		this.NotRecap		=	(this.RtnStock + this.Picked + this.Allocated == 0);
		// money values
		this.ExtCost = parseFloatIgnoreCommaDollars(extCost);
		this.ExtPrice = parseFloatIgnoreCommaDollars(extPrice);

		//change this value to change the way the items are sorted
		this.SortValue = this.Description
		if (!isNumeric(this.SortValue)) this.SortValue = this.SortValue.replace(/\W/g, '');

		this.IsValidItem	=	isValidItem;
		this.Render			=	render;
		this.RenderQuantity	=	renderQuantity;
	};

	//function IsValidItem() { return !!this.ItemId; }
	function isValidItem() { return this.Description != "&nbsp;"; }

	// render this ITEM to the target element. we can put logic in here to omit certain fields or gift logic or whatever we want
	// we would have multiple render methods, one per class... Item, PickTicket, Header... maybe even a "page" class
	// this would be very similar to how current pick tickets are except probably a little more granular rather than the one/two giant objects
	function render (templateEl,ticketType) { /* don't populate an element, return the data back */
		if (!templateEl || !this.IsValidItem()) return "";

		if (typeof templateEl === "string")
			templateEl = document.querySelectorAll(templateEl);

		var template = templateEl.innerHTML;

		// replace all the values we define in our templates
		template = template.replaceAll("{Sku}", this.Sku);
		template = template.replaceAll("{VSku}", this.VSku);
		template = template.replaceAll("{Description}", this.Description);
		template = template.replaceAll("{VDesc}", this.VDesc);
		template = template.replaceAll("{Qty}", this.Qty);
		template = template.replaceAll("{Upc}", this.Upc);
		template = template.replaceAll("{Gtin}", this.Gtin);
		template = template.replaceAll("{UpcEnc}", this.UpcEnc);
		template = template.replaceAll("{GtinEnc}", this.GtinEnc);
		template = template.replaceAll("{EncodeData}", this.EncodeData);
		template = template.replaceAll("{EncodeDataEnc}", this.EncodeDataEnc);
		template = template.replaceAll("{Section}", this.Section);
		template = template.replaceAll("{BaseLocation}", this.BaseLocation);
		template = template.replaceAll("{ItmLocation2}", this.ItmLocation2);
		template = template.replaceAll("{ItmLocation3}", this.ItmLocation3);
		template = template.replaceAll("{Bin}", this.Bin);
		template = template.replaceAll("{Picked}", this.Picked);
		template = template.replaceAll("{Allocated}", this.Allocated);
		template = template.replaceAll("{RtnStock}", this.RtnStock);
		template = template.replaceAll("{Itmstyle}", this.Itmstyle);
		template = template.replaceAll("{StyleDesc}", this.StyleDesc);
		template = template.replaceAll("{Lvl1Sku}", this.Lvl1Sku);
		template = template.replaceAll("{Lvl2Sku}", this.Lvl2Sku);
		template = template.replaceAll("{Lvl3Sku}", this.Lvl3Sku);
		template = template.replaceAll("{Lvl4Sku}", this.Lvl4Sku);
		template = template.replaceAll("{CatSku}", this.CatSku);

		// note on images
		// trying to load an image in the template like other values throws an error in the template itself: src={Image}
		// and replacing the whole thing including the src (ex. {imgSrc} as "src=...") resulted in no image loading
		// solution: create a new image element
		var newImg = document.createElement("img");
		newImg.src = this.CustomAttr.image || "";	// printDocument.SiteURL
		newImg.style.width = "91px";
		newImg.onerror = function() { this.style.visibility = "hidden"; this.style.height = "60px";};//"this.style.visibility=\'hidden\';this.style.height=\'60px\';";
		template = template.replaceAll("{ItemImg}", newImg.outerHTML);

		// money
		template = template.replaceAll("{ExtCost}", this.ExtCost.toMoney());
		template = template.replaceAll("{ExtPrice}", this.ExtPrice.toMoney());
		template = template.replaceAll("{SellingPrice}", this.SellingPrice.toMoney());

		// custom
		template = template.replaceAll("{Brand}", this.CustomAttr.brand || "");
		template = template.replaceAll("{Color}", this.CustomAttr.color || "");
		template = template.replaceAll("{UPCAlias}", this.CustomAttr.upcAlias || "");
		template = template.replaceAll("{Size}", this.CustomAttr.size || "");


		var quantityTemplateToGet;
		var quantityTemplate;
		var quantityTemplateComplete;

		if (this.Bin !== "0") {
			// slots
			// get the slot information
			// items
			quantityTemplateToGet = this.NotRecap ? "slotTemplate" : "recapSlotTemplate" + ticketType;
			quantityTemplate = document.getElementById(quantityTemplateToGet);

			// get this item's slot info
			quantityTemplateComplete = this.RenderQuantity(quantityTemplate);
		} else {
			// not slots
			// get the quantity information
			// items
			var quantityTemplateToGet = this.NotRecap ? "quantityTemplate" : "recapQuantityTemplate" + ticketType;
			var quantityTemplate = document.getElementById(quantityTemplateToGet);

			// get this item's quantity info
			var quantityTemplateComplete = this.RenderQuantity(quantityTemplate);
		}

		template = template.replaceAll("{QuantityInfo}", quantityTemplateComplete);

		return template;
	}

	// separate section within each line item
	function renderQuantity (templateEl) { /* don't populate an element, return the data back */
		if (!templateEl || !this.IsValidItem()) return "";

		if (typeof templateEl === "string")
			templateEl = document.querySelectorAll(templateEl);

		var template = templateEl.innerHTML;

		// calculate the error and return to stock amounts for recaps
		var errorAmount = this.RtnStock - (parseInt(this.Picked) - parseInt( this.Allocated));
		var returnToStockAmt = parseInt(this.Picked) - parseInt( this.Allocated);

		if(errorAmount<0) errorAmount = 0;

		// replace all the values we define in our templates
		template = template.replaceAll("{Qty}", this.Qty);
		template = template.replaceAll("{Bin}", this.Bin);
		template = template.replaceAll("{Picked}", this.Picked);
		template = template.replaceAll("{ErrorAmount}", errorAmount);
		template = template.replaceAll("{ReturnToStockAmt}", returnToStockAmt);

		return template;
	}

	return Item;

})();