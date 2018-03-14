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
	
		this.Country		=	(country || "").trimAndStrip();

		phone = phone || "";
		
		phone = phone.replace(/\D|^1/g,""); // remove non-digits and leading 1's
		if (phone.length == 10) {
			phone = phone.replace(/(\d{3})(\d{3})(\d{4})/,"($1) $2-$3"); // format phone number as (xxx) yyy-zzzz
		}
		
		this.Phone = phone;
		
		this.GetFormatted	=	getFormatted;
	};

	function getFormatted(withPhone,withCountry, firstBold) {

		// put the name together, adding a space after each part of the name if it is not blank
		var formattedName = [this.Prefix, this.FName, this.MI, this.LName, this.Suffix].filter(function(f) { return !!f; }).join(" ").trim();

		var cityWithComma = this.City ? this.City + "," : "";
		var formattedCityStateZip = [cityWithComma, this.State, this.Zip].filter(function(f) { return !!f; }).join(" ").trim();

		var addressParts = [formattedName, this.Name, this.Ref1, this.Ref2, this.Street, this.Street2, formattedCityStateZip].filter(function(f) { return !!f; });
		if (withPhone && this.Phone) addressParts.push(this.Phone);
		if (withCountry && this.Country) addressParts.push(this.Country);
		
		if (firstBold && addressParts.length > 0){
			addressParts[0] = "<strong>" + addressParts[0] + "</strong>";
		}
		
		// put the address together, adding a new line after each part of the address if it is not blank
		var formattedAddress;
		formattedAddress = addressParts.join("<br />").trim();


		formattedAddress = formattedAddress.replace(/\s*\<br\s*\/?\>\s*$/i, "");

		return formattedAddress;
	}

	return Address;

})();


function addDollarSigns(priceFields) {
	if (!priceFields) return;
	for (var i = 0; i < priceFields.length; ++i) {
		var field = priceFields[i];
		var temp = field.innerHTML; 
		if (temp.indexOf("«") >= 0)
			field.innerHTML = "&nbsp;";
		else {
			var match = temp.match(/\d+(\.\d+)?|\.\d+/);
			if (match) {
				temp = "$" + parseFloat(match[0]).toFixed(2);
			}
			field.innerHTML = temp; // field.innerHTML.replace(/^(?!\$)(.*\d.*$)/gi, "$$1");
		}
	}
}




