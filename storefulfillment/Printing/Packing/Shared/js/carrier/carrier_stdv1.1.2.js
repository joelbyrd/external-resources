/*
--Current Object:
var obj = { //non packslip-map data and static data first, 
    orientation: "P", //"P" for Portrait, "R" for right landscape, "L" for left landscape
	carrier: "«Carrier»", //-
	//carrier: 			"UPSN",
	csPhone: 			"800-888-8888", //unique per client, must be in format of xxx-xxx-xxxx or xxx-xxxx
	imgLocaton: 		location.protocol + "//" + document.domain.toString(), //hardcoded to /shared/assets?
	barcodeLocation: 	location.protocol + "//" + document.domain.toString() + "/images",
	orderNo: 			"«OrderNo»",
	retailerPhone: 		"18004445555", //set per client, formatted via JS
	returnToAddress: 	["«Vendor1»","«Vendor2»","«Vendor3»","«Vendor4»","«Vendor5»","«Vendor6»"], //or define your own
	shipAlias: 			"«ShipmentAlias»", //for use on packslip/newgistics, not used in carrier
	shipMethod: 		"«ShipMethod»",
	shipMethodDesc: 	"«ShipMethodDesc»",
	shipTo: 			["«ShipTo1»","«ShipTo2»","«ShipTo3»","«ShipTo4»","«ShipTo5»","«ShipTo6»"], 
	trackingNumber: 	"«TrackingNumber»",
	weight: 			"«Weight»", 
	fedexData: {
		//missing: CustomerName, shipDate, Hindicator,
		barcode1D: 		"«1DBarcode»", //-
		barcode96: 		"«128Barcode»", //-
		customerName: 	"«CustomerName»",
		//readable96: 	"«96Readable»", //- moved into the loadDataFedex function
		addrBarcode: 	"«AddrBarcode»", //-
		carrierSM: 		"«CarrierSM»", //-
		CLS: 			"«CLS»", //
		deliveryDate: 	"«DeliveryDate»", //-
		deliveryDay: 	"«DeliveryDay»", //-
		dryIce: 		"«DryIce»", //-
		endorsement: 	"«Endorsement»", //smartpost //-
		FHDSvcCode: 	"«FHDSvcCode»", //-
		formID: 		"«FormID»", //-
		fxrsVersion: 	"«FXRSVersion»",
		handleCode: 	"«HandleCode»", //-
		IMPB:  			"«IMPB»", //smartpost, require on all* //-
		locID: 			"«LocID»", //-
		meterNo: 		"«MeterNo»", //-
		originID: 		"«OriginID»", //-
		payType: 		"«PayType»", //-
		pdf417: 		"«PDF417»", //required //-
		productName: 	"«ProductName»", //-
		rampID: 		"«RampID»", //-
		serviceCode: 	"«ServiceCode»", //-
		shipDate: 		"«ShipDate»", //-
		shipToPhone:  	"«ShipToPhone»", //-
		shipToPhone2:  	"«ShipToPhone2»", //-
		shipToPhone3:  	"«ShipToPhone3»", //-
		shipToCountry: 	"«ShipToCountry»", 
		shipToZip:  	"«ShipToZip»", 
		stateUS: 		"«StateUS»", //-
		ursa30: 		"«Ursa»", //-
		VersionCode: 	"«VersionCode»", //smartpost //-
		weightUOM: 		"LBS" //default to lbs?
		//now in JS:  TrackingFormatted
	},//fedexObject
	uspsData: {
		companyName: "Chad CO",
		shipToZip: "«ShipToZip»",
		carrierSM: "«CarrierSM»", 
		construct: "«Construct»",
		shipDate: "«ShipDate»" 	
	},//uspsData
	upsData: {
		bullDomain: document.domain.toString(), //to check local vs site merges
		carrierSM: "«CarrierSM»",
		orderSMDesc: "«OrderSMDesc»",
        ref:    "", //override ref on UPS label
        inv:    "", //override inv on UPS label
		urc: "«URC»",
		urcVersion: "«URCVersion»",
		urcDate: 	"«URCDate»",
		shipDate: "«ShipDate»",
		shipToCity: "«ShipToCity»",
		shipToState: "«ShipToState»",
		shipToZip: "«ShipToZip»",
		shipToCountry: "«ShipToCountryISO»",
		isThirdParty: true //set per client
	},//ups data
	upssData: {
		carrier: "«Carrier»",
		trackingNumber: "«TrackingNumber»",
		trackingNumberFormatted: "«TrackingFormatted»",
		shipToBarcode:"«ShipToBarcode»",
		SMDesc: "«SMDesc»",
		serviceIcon: "«ServiceIcon»",
		trackingBarcode: "«TrackingBarcode»",
		uRC: "«URC»",
		uRCVersionDate: "«UrcVersionDate»",
		weight: "«Weight»",
		shipDate: "«ShipDate»",
		uPSControl: "«UPSControl»",
		carrierSM: "«CarrierSM»",
		adultSigText: "«AdultSignatureText»",
		shipmentAlias: "«ShipAlias»",
		currentCarrier: "«CurrentCarrier»",
		sPTrackNo: "«SurePostTrackingNo»",
		sPSVC: "«SurePostSvcInd»",
		sPCZip: "«SurePostCosigneeZip»",
		sPPOAdd: "«SurePostPOAddress»",
		sPPOCity: "«SurePostPOCity»",
		sPPOState: "«SurePostPOState»",
		sPPOZip: "«SurePostPOZip»",
		sPFacType: "«SurePostFacilityType»",
		bullseye: "«Bullseye»",
		sPWeight: "«SPWEIGHT»",
		shipToZip: "«ShipToZip»"	
	},//upssData
	purlData: {
        purlSM: "«PurlSM»",
        deliveryDate: "«DeliveryDate»",
        destIATA: "«DestIATA»",
        osnr: "«OSNR»",
        route: "«Route»",
        returnAddress: ["CLIENT NAME","SOME ROAD","CITY STATE ZIP"],
        serviceLevel: "«ServiceLevel»",
        shipToPhone: "«ShipToPhone»",
        shipToZip: "«ShipToZip»",
        transitDays: "«TransitDays»"       
	}, //purolator data
	newgisticsData: {

	}//newgistics data if needed
}//carrier info object

*/

String.prototype.rjust = function (num) {
    var defaultPad = " ";
    //nothing was passed, return string
    if ('undefined' === typeof num) {
        return this;
    }
    if (arguments.length == 2) {
        defaultPad = arguments[1];
    }
    var out = this;
    while (out.length < num) {
        out = defaultPad + out;
    }

    return out;
}

function FormatPhone ( phoneArrayin ) {
	var thisphone, sAreaCode, sFirstThree, sLastFour, sExtension; 
	//array in is [phone1, phone2, phone3, retailerphone]
	//pick first non-blank phone number
	if( phoneArrayin[0].replace( /\D/g, '') )
		thisphone = phoneArrayin[0].replace( /\D/g, '' );
	else if( phoneArrayin[1].replace( /\D/g, '') )
		thisphone = phoneArrayin[1].replace( /\D/g, '' );
	else if( phoneArrayin[2].replace( /\D/g, '') )
		thisphone = phoneArrayin[2].replace( /\D/g, '' );
	else
		thisphone = phoneArrayin[3].replace( /\D/g, '' );

	if (thisphone.charAt(0) == "1") thisphone = thisphone.substr(1);

	sAreaCode = thisphone.substring( 0, 3 );
	sFirstThree = thisphone.substring( 3, 6 );
	sLastFour = thisphone.substring( 6, 10 );

	if( thisphone.length == 0 || thisphone=="«VendorPhone»" ) {
		return "";
	}
	if( thisphone.length > 10 ) {
		sExtension = thisphone.substring( 10, 14 );
		return "(" + sAreaCode + ")&nbsp;" + sFirstThree + "-" + sLastFour + "x" + sExtension;
	} else {
		return "(" + sAreaCode + ")&nbsp;" + sFirstThree + "-" + sLastFour;
	}
}//
 
 
 function formatUSZip(zip){ 
	//console.info("CHECKING ZIP: " + zip);
     if (/(^\d{5}$)|(^\d{5}-\d{4}$)|(^\d{9}$)/.test(zip.trim()))
		return zip.trim().substring(0,5);
	//else if (/^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/.test(zip.trim()))
		//return zip.trim();
	else
		return zip;
 }
 
  function formatCAZip(zip){ 
	//console.info("CHECKING ZIP: " + zip);
   //  if (/(^\d{5}$)|(^\d{5}-\d{4}$)|(^\d{9}$)/.test(zip.trim()))
	//	return zip.trim().substring(0,5);
	if (/^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/.test(zip.trim()))
		return zip.trim();
	else
         return zip;
 }
 
function fedexShipDate(dateIn){ //requires packslipbase.js
	var thisDate;
	if(dateIn.indexOf("»") < 0 && dateIn != "" && dateIn != "&nbsp;" ) 
		thisDate = new Date(dateIn);
	else
		thisDate = new Date();
	
	var monthAbbrv = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
	
	return thisDate.getDate().toString().rjust(2,"0") + monthAbbrv[thisDate.getMonth()] + thisDate.getFullYear();
}

function ConvertToPoundsOunces( sWeightIn ) {
	var weightdbl = parseFloat(sWeightIn);
	weightdbl = (weightdbl * 16).toFixed(0);
	return parseInt(weightdbl/16) + " lbs " + weightdbl % 16  + " oz";
}

function ConvertToOuncesOnly( sWeightIn ) {
	var weightdbl = parseFloat(sWeightIn);
	weightdbl = (weightdbl * 16).toFixed(0);
	return  weightdbl + " oz";
}
function ConvertToOuncesOnlyToTheTenth( sWeightIn ) {
	var weightdbl = parseFloat(sWeightIn);
	weightdbl = (weightdbl * 16).toFixed(1);
	return  weightdbl + " OZ";
}

function FormatWeight(sWeight){
	if(sWeight <1)
		return ConvertToOuncesOnlyToTheTenth(sWeight);
	else
	{
		sWeight = Math.ceil(parseFloat(sWeight));
		return sWeight + " LBS";
	}
}

function isIE() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

function GetZipCode(address){
	var adr = compressAddressParts(address);
	
	var len = adr.length;
	
	var zip_code = adr[len - 1];
	
	var regx = /\d{5}([-+]?\d{4})?$/gi;
	
	if(zip_code.match(regx)) 
		return zip_code.match(regx);
	else{
		console.warn("Could not parse zip code from ["+address+"]");
		return "FAILED";
	}
		
	
	return zip_code;
}

// [SUREPOST] Variables.
var surepostIndiciaLookup = new Array();
surepostIndiciaLookup[surepostIndiciaLookup.length] = ["3H", "PRSRT MEDIA MAIL<br />U.S. POSTAGE PAID<br />UPS<br />eVS"];
surepostIndiciaLookup[surepostIndiciaLookup.length] = ["YN", "PS LIGHTWEIGHT<br />U.S. POSTAGE PAID<br />UPS<br />eVS"];
surepostIndiciaLookup[surepostIndiciaLookup.length] = ["YW", "PARCEL SELECT<br />U.S. POSTAGE PAID<br />UPS<br />eVS"];
surepostIndiciaLookup[surepostIndiciaLookup.length] = ["3A", "PRSRT BPM<br />U.S. POSTAGE PAID<br />UPS<br />eVS"];
surepostIndiciaLookup[surepostIndiciaLookup.length] = ["3H", "PRSRT MEDIA MAIL<br />U.S. POSTAGE PAID<br />UPS<br />eVS"];
// [SUREPOST] Functions.
function CheckIfNullOrEmpty( sStringIn ) {
	return ( sStringIn == "" || sStringIn == "&nbsp;" || sStringIn == typeof("undefined") || sStringIn.indexOf( "«" ) > -1 );
}
function CheckIfUPSDelivered( sSvcIndicatorIn ) {
	sSvcIndicatorIn = sSvcIndicatorIn.toUpperCase();
	return ( sSvcIndicatorIn == "YH" || sSvcIndicatorIn == "YT" || sSvcIndicatorIn == "YY" || sSvcIndicatorIn == "3G" || sSvcIndicatorIn == "03" || sSvcIndicatorIn == "" );
}
function CheckForSurepostIndicia( sSvcIndicatorIn, sCarrierSMIn ) {
	// first check against the sv indicator. If nothing found, check against carrier sm. If still nothing found, return blank.
	for( var i = 0; i < surepostIndiciaLookup.length; i++ ) {
		if( surepostIndiciaLookup[i][0] == sSvcIndicatorIn ) {
			return surepostIndiciaLookup[i][1];
		}
	}
	for( var i = 0; i < surepostIndiciaLookup.length; i++ ) {
		if( surepostIndiciaLookup[i][0] == sCarrierSMIn ) {
			return surepostIndiciaLookup[i][1];
		}
	}
	return "";
}

function humanReadTrackingNo(trkin) {
    return trkin.substr(0, 4) + "&nbsp;" + trkin.substr(4, 4) + "&nbsp;" + trkin.substr(8, 4) + "&nbsp;" + trkin.substr(12, 4)  +
        "&nbsp;" + trkin.substr(16, 4) + "&nbsp;" + trkin.substr(20,4)  + "&nbsp;" + trkin.substr(24); //,1) + mod10(trkin.toUpperCase().trim()); - removed, being managed in VN
}

function mod10(trkin){
	var flippedStr = "";
	for(var i = trkin.length-2; i>=0; i--) {
		flippedStr += trkin[i];
	}
	var sum = 0;
	for(var i = 0; i<flippedStr.length; i++) {
		if(i%2 == 0)
			sum += 2*parseInt(flippedStr[i])
		else 
			sum += parseInt(flippedStr[i])
	}
	var result = sum%10;
	return result.toString();
}

function AddPhoneNumberToShipTo(shipTo, number){
	
	var _shipto = shipTo.split('<BR/>');
	var result = "";
	
	if(number == "")
		return shipTo;
	else if(_shipto.length>2){
		
		for(var i=0; i<_shipto.length; i++){
			if(i ==1)
				result +=  number + "<br/> " + _shipto[i]+ "<br/> ";
			else
				result += _shipto[i]+ "<br/> ";
		}	
	}
	else{
		return shipTo + "<br/>" + number;
	}
	
	return result;
}
var allLabelDefinitions = function(){
	
    this.missingData = [];
    this.defaultErrorMessage = "label could not print due to the missing data: ";
		
	this.CheckMissingFedex = function(){
		//parent Class always has this.labelInfo, only scope is here
		var labelProps = ["trackingNumber", "carrier"];
		var specificProps = ["barcode1D"];
		var specificError = "";

		var fedExObj = this.labelInfo.fedexData;
		var labelObj = this.labelInfo;

		if (fedExObj.pdf417 == "")

		for (var i = 0; i < labelProps.length; i++) {
			//console.log("check prop : " + labelProps[i]);
			if(labelObj[labelProps[i]].indexOf("»") > 0 || labelObj[labelProps[i]].replace("&nbsp;","").trim() == "")
				this.missingData.push(labelProps[i]);
		};

		var isError = false;
		for (var i = 0; i < specificProps.length; i++) {
		    isError = false;
			//console.log("check prop : " + specificProps[i]);
		    if (fedExObj[specificProps[i]].indexOf("»") > 0 || fedExObj[specificProps[i]].replace("&nbsp;", "").trim() == "") {
		        this.missingData.push(specificProps[i]);
		    } else { //specific prop has been populated with data
		        if (specificProps[i] == "barcode1D" && fedExObj[specificProps[i]].length % 2 != 0) {
		            specificError = " - not an even number of digits";
		            isError = true;
		        }
                //create any more property checks here

                if(isError)
		         this.missingData.push(specificProps[i] + specificError);
		    }//else
		};//for each specific prop
	}//check missing function

	this.CheckMissingUPS = function(){
		//parent Class always has this.labelInfo 
		//if ShipTobarcode or URC is missing, error
		//always check trackingno and carrier;
	 
		var labelProps = ["trackingNumber", "carrier"];
		var specificProps = ["urc", "shipToZip", "urcVersion"];

		var upsObj = this.labelInfo.upsData;
		var labelObj = this.labelInfo;

		for (var i = 0; i < labelProps.length; i++) {
			//console.log("check prop : " + labelProps[i] + "; " + labelObj["trackingNumber"]);
			if(labelObj[labelProps[i]].indexOf("»") > 0 || labelObj[labelProps[i]].replace("&nbsp;","").trim() == "")
				this.missingData.push(labelProps[i]);
		};
		for (var i = 0; i < specificProps.length; i++) {
			//console.log("check prop : " + specificProps[i]);
			if(upsObj[specificProps[i]].indexOf("»") > 0 || upsObj[specificProps[i]].replace("&nbsp;","").trim() == "")
				this.missingData.push(specificProps[i]);
		};
	}//check missing ups
	
	this.CheckMissingUPSS = function(){
		//parent Class always has this.labelInfo 
		//if ShipTobarcode or URC is missing, error
		//always check trackingno and carrier;
	 
		//console.warn("No check is performed for missing UPS Surepose date");
	}
	
	this.CheckMissingUSPS = function(){
		var labelProps = ["trackingNumber", "carrier"];
		var specificProps = ["construct"];

		var uspsObj = this.labelInfo.uspsData;
		var labelObj = this.labelInfo;

		for (var i = 0; i < labelProps.length; i++) {
			//console.log("check prop : " + labelProps[i] + "; " + labelObj["trackingNumber"]);
			if(labelObj[labelProps[i]].indexOf("»") > 0 || labelObj[labelProps[i]].replace("&nbsp;","").trim() == "")
				this.missingData.push(labelProps[i]);
		};
		for (var i = 0; i < specificProps.length; i++) {
			//console.log("check prop : " + specificProps[i]);
			if(uspsObj[specificProps[i]].indexOf("»") > 0 || uspsObj[specificProps[i]].replace("&nbsp;","").trim() == "")
				this.missingData.push(specificProps[i]);
		};
	}
	
	this.CheckMissingUSPSS = function(){
		//console.warn("No check is performed for missing USPS Surepose date");
	}
	
	this.loadDataFedex = function(){  //sets data based on serviceDesc


		//default values
		this.labelInfo.fedexData.serviceDesc = "Express";
		this.labelInfo.fedexData.serviceLetter = "E";
		var logofile = "fedex-express.gif"
		if (isIE() == 8)
		    logofile = "fedex-express-r.gif"

		this.labelInfo.fedexData.gndHome = "GND";
		//move if to smartpost proto?

		//readable home tracking number

		if (!(this.labelInfo.fedexData.readable96) || this.labelInfo.fedexData.readable96 == ""){
			this.labelInfo.fedexData.readable96 = "(" + this.labelInfo.fedexData.barcode1D.substring(0,7) + ") " + 
				this.labelInfo.fedexData.barcode1D.substring(7,14) + " " +
				this.labelInfo.fedexData.barcode1D.substring(14, this.labelInfo.fedexData.barcode1D.length);

		}

	   	//set service description
		if( this.labelInfo.fedexData.carrierSM == "17" || 
			this.labelInfo.fedexData.carrierSM == "18" || 
			this.labelInfo.fedexData.carrierSM == "07" ) {
			this.serviceDesc = "SmartPost";
		} else {
			switch( this.labelInfo.fedexData.serviceCode ) {
				case "800": case "804": case "850": case "851": case "863": case "883": case "887": case "895":
					this.labelInfo.fedexData.serviceDesc = "Home";
					this.labelInfo.fedexData.serviceLetter = "H";
					this.labelInfo.fedexData.gndHome = "HOME";

					if (isIE() == 8)
					    logofile = "fedex-ground-r.gif";
					else
					    logofile = "fedex-ground.gif"
					break;
				case "015": case "019": case "150": case "151": case "158": case "159": case "302": case "311": case "417": case "418":
					this.labelInfo.fedexData.serviceDesc = "Ground";
					this.labelInfo.fedexData.serviceLetter = "G";

					if (isIE() == 8)
					    logofile = "fedex-ground-r.gif";

					else
					    logofile = "fedex-ground.gif"
					break;
			}//switch
		}//else

		this.labelInfo.fedexData.logo = '<img src="' + this.labelInfo.imgLocaton + '/shared/assets/' + logofile + '" class="logo" alt="FedEx Express">';

	    //add FNC1 to beginning of barcode if Ground
		if (this.labelInfo.fedexData.serviceDesc != "Express")
			this.labelInfo.fedexData.barcode1D = "\\" +this.labelInfo.fedexData.barcode1D;


			//format tracking number, 
		this.labelInfo.trackingFormatted = "";
		if (this.labelInfo.fedexData.serviceDesc == "Express"){
			for (var i = 0; i < this.labelInfo.trackingNumber.length; i++) {
				if (i%4 == 0){
					this.labelInfo.trackingFormatted += " " 
				}
				this.labelInfo.trackingFormatted += this.labelInfo.trackingNumber.charAt(i);
			};
		}else{
			this.labelInfo.trackingFormatted = this.labelInfo.trackingNumber.substring(0,6) + " " + 
				this.labelInfo.trackingNumber.substring(6, this.labelInfo.trackingNumber.length);
		}

		//set the state passed in to state-US
		this.labelInfo.fedexData.stateUS = this.labelInfo.fedexData.stateUS + "-US";

		//set DDMONYYYY format
		this.labelInfo.fedexData.shipDate = fedexShipDate(this.labelInfo.fedexData.shipDate);

		//set phone
		this.labelInfo.fedexData.shipToPhone = 
			FormatPhone([	this.labelInfo.fedexData.shipToPhone,
							this.labelInfo.fedexData.shipToPhone2,
							this.labelInfo.fedexData.shipToPhone3,
							this.labelInfo.retailerPhone ]);

		//this.labelInfo.fedexData.pdf417 += "%04";
 	}//cfunc
	 
 	this.loadDataUPS = function(){
 	    var srvID = "";
 	    this.labelInfo.upsData.isCanada = false;

 	    if (this.labelInfo.upsData.shipToCountry == "124")
 	        this.labelInfo.upsData.isCanada = true;

 		if(this.labelInfo.trackingNumber.trim() != "")
 			srvID = this.labelInfo.trackingNumber.ljust(10).substr(8,2).trim();//this.labelInfo.trackingNumber.ljust(10).substr(9,2).trim()
			//Looks like this was off by 1.
 		if(srvID.length != 2)
 			srvID = this.labelInfo.upsData.carrierSM;

 		//set SM Desc
 		switch(srvID){
 			case "01": case "25": case "24": case "A2": case "NT": case "PG": case "44": case "47": case "58": case "A3":
 				this.labelInfo.upsData.orderSMDesc = "UPS NEXT DAY AIR";
 				break
 			case "13": case "30": case "29": case "A4":
 				this.labelInfo.upsData.orderSMDesc = "UPS NEXT DAY AIR SAVER";
 				break;
 			case "07": case "18": case "19": case "A5":
 				this.labelInfo.upsData.orderSMDesc = "UPS 2ND DAY AIR A.M.";
 				break;
 			case "02": 	case "36":	case "35":	case "A6":	case "NY": case "T3":
 				this.labelInfo.upsData.orderSMDesc = "UPS 2ND DAY AIR";
 				break;
 			case "12":	case "40":	case "39":	case "A7":
 				this.labelInfo.upsData.orderSMDesc = "UPS 3 DAY SELECT";
 				break;
 			case "03": case "43": case "42": case "A8": case "P2":
 				this.labelInfo.upsData.orderSMDesc = "UPS GROUND";
 				break;
 			case "32": case "A9":
				this.labelInfo.upsData.orderSMDesc = "UPS EARLY A.M.";
				break;
			case "33": case "AA":
				this.labelInfo.upsData.orderSMDesc = "UPS EARLY A.M.";
				break;
			case "59": case "AC":
				this.labelInfo.upsData.orderSMDesc = "UPS NEXT DAY AIR";
				break;
			case "60": case "AD":
				this.labelInfo.upsData.orderSMDesc = "UPS NEXT DAY AIR";
				break;
			case "62": case "AE":
				this.labelInfo.upsData.orderSMDesc = "UPS NEXT DAY AIR SAVER";
				break;
			case "65": case "AF":
				this.labelInfo.upsData.orderSMDesc = "UPS 2ND DAY AIR A.M.";
				break;
			case "70": case "AG": case "PW": case "T1":
				this.labelInfo.upsData.orderSMDesc = "UPS 2ND DAY AIR";
				break;
			case "71": case "AH":
				this.labelInfo.upsData.orderSMDesc = "UPS 3 DAY SELECT";
				break;
			case "72": case "AJ":
				this.labelInfo.upsData.orderSMDesc = "UPS GROUND";
				break;
 		    case "15": case "A0":
 		        if (this.labelInfo.upsData.isCanada)
 		            this.labelInfo.upsData.orderSMDesc = "UPS EXPRESS EARLY A.M";
                else
				    this.labelInfo.upsData.orderSMDesc = "UPS EARLY A.M.";
				break;
			case "41": case "A1":
			    if (this.labelInfo.upsData.isCanada)
			        this.labelInfo.upsData.orderSMDesc = "UPS EXPRESS EARLY A.M";
			    else
			        this.labelInfo.upsData.orderSMDesc = "UPS EARLY A.M.";
				break;
			case "54": case "G1": case "G5":
				this.labelInfo.upsData.orderSMDesc = "UPS EXPRESS PLUS";
				break;
			case "34": case "G4": case "G8":
				this.labelInfo.upsData.orderSMDesc = "UPS EXPRESS PLUS";
				break;
			case "66": case "D3": case "D4":
				this.labelInfo.upsData.orderSMDesc = "UPS EXPRESS";
				break;
			case "69": case "D6": case "D7":
				this.labelInfo.upsData.orderSMDesc = "UPS EXPRESS";
				break;
			case "67": case "DG": case "DH":
				this.labelInfo.upsData.orderSMDesc = "UPS EXPEDITED";
				break;
			case "68": case "DK": case "DL":
				this.labelInfo.upsData.orderSMDesc = "UPS STANDARD";
				break;
			case "NP": case "PA":
				this.labelInfo.upsData.orderSMDesc = "UPS EARLY A.M.";
				break;
			case "NT": case "P4": case "PG": case "PN":
				this.labelInfo.upsData.orderSMDesc = "UPS NEXT DAY AIR";
				break;
			case "NW": case "PS":
				this.labelInfo.upsData.orderSMDesc = "UPS NEXT DAY AIR SAVER";
				break;
			case "PO": case "P7":
				this.labelInfo.upsData.orderSMDesc = "UPS 2ND DAY AIR A.AM.";
				break;
			case "NY": case "T3": case "T7": case "P6":
				this.labelInfo.upsData.orderSMDesc = "UPS 2ND DAY AIR";
				break;
			case "P1": case "P8":
				this.labelInfo.upsData.orderSMDesc = "UPS 3 DAY SELECT";
				break;
			case "P2": case "P9":
				this.labelInfo.upsData.orderSMDesc = "UPS GROUND";
				break;
			case "14": case "D2": case "D3": case "D4": case "69": case "D5": case "D6": case "D7":
				this.labelInfo.upsData.orderSMDesc = "UPS EXPRESS";
				break;
			case "04": case "D8": case "D9": case "DA": case "DC": case "DD": case "DE":
				this.labelInfo.upsData.orderSMDesc = "UPS SAVER";
				break;
			case "17": case "DF": case "DG": case "DH":
				this.labelInfo.upsData.orderSMDesc = "UPS EXPEDITED";
				break;
			case "20": case "DJ": case "DK": case "DL":
				this.labelInfo.upsData.orderSMDesc = "UPS STANDARD";
				break;
			case "08":
				this.labelInfo.upsData.orderSMDesc = "UPS ECONOMY";
				break;
			//default is read in on OBJ already orders.smdesc
		}//switch

		//set service icon
		switch(srvID){
			case "01": case "25": case "24": case "A2": case "NT": case "59": case "AC": case "66": case "D3": case "D4": case "P4": case "14": case "D2":
				this.labelInfo.upsData.serviceIcon = "1";
				break;
			case "44": case "47": case "58": case "A3": case "PG": case "60": case "AD": case "PN": case "69": case "D5": case "D6": case "D7":
				this.labelInfo.upsData.serviceIcon = "1 S";
				break;
			case "PW": case "T1": case "PY": case "T0": case "T3": case "T7":
			     this.labelInfo.upsData.serviceIcon = "2 S";
				break;
			case "13": case "30": case "29": case "A4": case "62": case "AE": case "NW": case "PS": case "04": case "D8": case "D9": case "DA":
				this.labelInfo.upsData.serviceIcon = "1P";
				break;
			case "07": case "18": case "19": case "A5": case "65": case "AF": case "PO": case "P7":
				this.labelInfo.upsData.serviceIcon = "2A";
				break;
			case "02": case "36": case "35": case "A6": case "NY": case "70": case "AG": case "67": case "DG": case "DH": case "P6": case "17": case "DF":
				this.labelInfo.upsData.serviceIcon = "2";
				break;
			case "12": case "40": case "39": case "A7": case "71": case "AH": case "P1": case "P8":
				this.labelInfo.upsData.serviceIcon = "3";
				break;
			case "03": case "43": case "42": case "A8": case "P2": case "72": case "AJ": case "68": case "DK": case "DL": case  "P9": case "20": case "DJ": 
				this.labelInfo.upsData.serviceIcon = "#";
				break;
 			case "32": case "A9": case "15": case "A0": case "54": case "G1": case "G5": case "NP":
				this.labelInfo.upsData.serviceIcon = "1+";
				break;
			case "33": case "AA": case "41": case "A1": case "34": case "G4": case "G8": case "PA":
				this.labelInfo.upsData.serviceIcon = "1+S";
				break;
			case "DC": case "DD": case "DE":
				this.labelInfo.upsData.serviceIcon = "1PS";
				break;
			default:
				this.labelInfo.upsData.serviceIcon = "";
		}//swtich

		//set formatted tracking no
		var tfmt = this.labelInfo.trackingNumber.ljust(23).substr(0,23);
		this.labelInfo.trackingFormatted = 
			tfmt.substr(0,2) + " " +
			tfmt.substr(2,3) + " " +
			tfmt.substr(5,3) + " " +
			tfmt.substr(8,2) + " " +
			tfmt.substr(10,4) + " " +
			tfmt.substr(14,4);
 
 		//set URC version date
		var urcM = "";  
		var urcY = "";
		// this is ie8 fix for date parsing
		console.log("making date out of " + this.labelInfo.upsData.urcDate + " removing '-' and replacing with '/': " + this.labelInfo.upsData.urcDate.replace(/\-/g,"/"));
		var urcDateObj = new Date(this.labelInfo.upsData.urcDate.replace(/\-/g, "/"));
		 
		if( ! isNaN(urcDateObj.getFullYear()) ){
			urcM = urcDateObj.getMonth() + 1;
			urcY = urcDateObj.getFullYear();
		}
		this.labelInfo.upsData.urcVersionDate = 
			this.labelInfo.upsData.urcVersion + " " 
			+ urcM.toString().rjust(2,"0") +
			 "/" + urcY;

		//set adult sig text:
		switch(this.labelInfo.upsData.carrierSM){
			case "A4": case "A2": case "A6": case "A3": case "A8":
				this.labelInfo.upsData.adultSignature = "ADULT SIGNATURE REQUIRED -- MIN 21";
				break;
			default:
				this.labelInfo.upsData.adultSignature = "";
		}//switch adult
 
        //set state for UPS canada 
		switch (this.labelInfo.upsData.shipToState.replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase()) {
		    case "alberta":
		        this.labelInfo.upsData.shipToState = "AB";
		        break;
		    case "british columbia":
		        this.labelInfo.upsData.shipToState = "BC";
		        break;
		    case "manitoba":
		        this.labelInfo.upsData.shipToState = "MB";
		        break;
		    case "new brunswick":
		        this.labelInfo.upsData.shipToState = "NB";
		        break;
		    case "newfoundland and labrador": case "newfoundland": case "labrador":
		        this.labelInfo.upsData.shipToState = "NL";
		        break;
		    case "nova scotia":
		        this.labelInfo.upsData.shipToState = "NS";
		        break;
		    case "northwest territories":
		        this.labelInfo.upsData.shipToState = "NT";
		        break;
		    case "nunavut":
		        this.labelInfo.upsData.shipToState = "NU";
		        break;
		    case "ontario":
		        this.labelInfo.upsData.shipToState = "ON";
		        break;
		    case "price edward island":
		        this.labelInfo.upsData.shipToState = "PE";
		        break;
		    case "quebec":
		        this.labelInfo.upsData.shipToState = "QC";
		        break;
		    case "saskatchewan":
		        this.labelInfo.upsData.shipToState = "SK";
		        break;
		    case "yukon":
		        this.labelInfo.upsData.shipToState = "YT";
		        break;
		    default:
		        this.labelInfo.upsData.shipToState = this.labelInfo.upsData.shipToState.replace(/\W/g, "");
		        if (this.labelInfo.upsData.shipToState.length > 2)
		            console.log("possible error, canadian state name instead of abbreviation: " + this.labelInfo.upsData.shipToState);
		}

 		//set bullseye
		var url;
		if (this.labelInfo.upsData.bullDomain === undefined)
			url = "/images/bullseye.ashx";
		else
			url = this.labelInfo.imgLocaton + "/images/bullseye.ashx";
		var bullDateObj = new Date(this.labelInfo.upsData.shipDate);

		var bullDateFormat = 
			bullDateObj.getFullYear() + "-" + 
			(bullDateObj.getMonth()+1).toString().rjust(2,"0") + "-" +
			bullDateObj.getDate().toString().rjust(2,"0");

		this.labelInfo.upsData.bullseye = 
			url + "?" + 
			"PostalCode=" + this.labelInfo.upsData.shipToZip + "&" + 
			"TrackingNo=" + this.labelInfo.trackingNumber + "&" +
			"Pickup=" + bullDateFormat + "&" +
			"Weight=" + Math.ceil(parseFloat(this.labelInfo.weight)).toString() + "&" +//this.labelInfo.weight + "&" +
			"City=" + this.labelInfo.upsData.shipToCity + "&" +
			"State=" + this.labelInfo.upsData.shipToState + "&" +
			"Country=" + this.labelInfo.upsData.shipToCountry ;

 	    //format address as last bold, uppercase
		var newArr, strout;
		newArr = compressAddressParts(this.labelInfo.shipTo);
		strout = "";
		for (var i = 0; i < newArr.length; ++i) {
		    if (i == newArr.length - 1)
		        newArr[i] = "<span class='lastbold'>" + newArr[i].toUpperCase() + "</span>";

		    strout += newArr[i] + "<br/>";
		}
		this.labelInfo.shipToFormatted = strout;
		
		if (this.labelInfo.upsData.ref == null || this.labelInfo.upsData.ref == "")
		    this.labelInfo.upsData.refPrinted = this.labelInfo.orderNo;
		else
		    this.labelInfo.upsData.refPrinted = this.labelInfo.upsData.ref;
		
		this.labelInfo.upsData.invPrinted = "";
		if(this.labelInfo.upsData.inv != null && this.labelInfo.upsData.inv != "")
			this.labelInfo.upsData.invPrinted = "<div>INV: " + this.labelInfo.upsData.inv + "</div>";
			
		if (this.labelInfo.upsData.isThirdParty === true)
		    this.labelInfo.upsData.billingtext = "BILLING: 3RD PARTY";
		else
		    this.labelInfo.upsData.billingtext = "BILLING: P/P";

		

	
 	}//load UPS data

	this.loadDataUPSS = function(){
 		var srvID = "";

 		if(this.labelInfo.upssData.trackingNumber.trim() != "")
 			srvID = this.labelInfo.upssData.trackingNumber.ljust(10).substr(8,2).trim();//this.labelInfo.trackingNumber.ljust(10).substr(9,2).trim()
			//Looks like this was off by 1.
 		if(srvID.length != 2)
 			srvID = this.labelInfo.upssData.carrierSM;

 		//set SM Desc
 		switch(srvID){
 			case "01": case "25": case "24": case "A2": case "NT": case "PG": case "44": case "47": case "58": case "A3":
 				this.labelInfo.upssData.orderSMDesc = "UPS Surepost NEXT DAY AIR";
 				break
 			case "13": case "30": case "29": case "A4":
 				this.labelInfo.upssData.orderSMDesc = "UPS Surepost NEXT DAY AIR SAVER";
 				break;
 			case "07": case "18": case "19": case "A5":
 				this.labelInfo.upssData.orderSMDesc = "UPS Surepost 2ND DAY AIR A.M.";
 				break;
 			case "02": 	case "36":	case "35":	case "A6":	case "NY": case "T3":
 				this.labelInfo.upssData.orderSMDesc = "UPS Surepost 2ND DAY AIR";
 				break;
 			case "12":	case "40":	case "39":	case "A7":
 				this.labelInfo.upssData.orderSMDesc = "UPS Surepost 3 DAY SELECT";
 				break;
 			case "03": case "43": case "42": case "A8": case "P2":
 				this.labelInfo.upssData.orderSMDesc = "UPS Surepost GROUND";
 				break;
 			case "32": case "A9":
				this.labelInfo.upssData.orderSMDesc = "UPS Surepost EARLY A.M.";
				break;
			case "33": case "AA":
				this.labelInfo.upssData.orderSMDesc = "UPS Surepost EARLY A.M.";
				break;
			case "59": case "AC":
				this.labelInfo.upssData.orderSMDesc = "UPS Surepost NEXT DAY AIR";
				break;
			case "60": case "AD":
				this.labelInfo.upssData.orderSMDesc = "UPS Surepost NEXT DAY AIR";
				break;
			case "62": case "AE":
				this.labelInfo.upssData.orderSMDesc = "UPS Surepost NEXT DAY AIR SAVER";
				break;
			case "65": case "AF":
				this.labelInfo.upssData.orderSMDesc = "UPS Surepost 2ND DAY AIR A.M.";
				break;
			case "70": case "AG": case "PW": case "T1":
				this.labelInfo.upssData.orderSMDesc = "UPS Surepost 2ND DAY AIR";
				break;
			case "71": case "AH":
				this.labelInfo.upssData.orderSMDesc = "UPS Surepost 3 DAY SELECT";
				break;
			case "72": case "AJ":
				this.labelInfo.upssData.orderSMDesc = "UPS Surepost GROUND";
				break;
			case "15": case "A0":
				this.labelInfo.upssData.orderSMDesc = "UPS Surepost EARLY A.M.";
				break;
			case "41": case "A1":
				this.labelInfo.upssData.orderSMDesc = "UPS Surepost EARLY A.M.";
				break;
			case "54": case "G1": case "G5":
				this.labelInfo.upssData.orderSMDesc = "UPS Surepost EXPRESS PLUS";
				break;
			case "34": case "G4": case "G8":
				this.labelInfo.upssData.orderSMDesc = "UPS Surepost EXPRESS PLUS";
				break;
			case "66": case "D3": case "D4":
				this.labelInfo.upssData.orderSMDesc = "UPS Surepost EXPRESS";
				break;
			case "69": case "D6": case "D7":
				this.labelInfo.upssData.orderSMDesc = "UPS Surepost EXPRESS";
				break;
			case "67": case "DG": case "DH":
				this.labelInfo.upssData.orderSMDesc = "UPS Surepost EXPEDITED";
				break;
			case "68": case "DK": case "DL":
				this.labelInfo.upssData.orderSMDesc = "UPS Surepost STANDARD";
				break;
			case "NP": case "PA":
				this.labelInfo.upssData.orderSMDesc = "UPS Surepost EARLY A.M.";
				break;
			case "NT": case "P4": case "PG": case "PN":
				this.labelInfo.upssData.orderSMDesc = "UPS Surepost NEXT DAY AIR";
				break;
			case "NW": case "PS":
				this.labelInfo.upssData.orderSMDesc = "UPS Surepost NEXT DAY AIR SAVER";
				break;
			case "PO": case "P7":
				this.labelInfo.upssData.orderSMDesc = "UPS Surepost 2ND DAY AIR A.AM.";
				break;
			case "NY": case "T3": case "T7": case "P6":
				this.labelInfo.upssData.orderSMDesc = "UPS Surepost 2ND DAY AIR";
				break;
			case "P1": case "P8":
				this.labelInfo.upssData.orderSMDesc = "UPS Surepost 3 DAY SELECT";
				break;
			case "P2": case "P9":
				this.labelInfo.upssData.orderSMDesc = "UPS Surepost GROUND";
				break;
			case "14": case "D2": case "D3": case "D4": case "69": case "D5": case "D6": case "D7":
				this.labelInfo.upssData.orderSMDesc = "UPS Surepost EXPRESS";
				break;
			case "04": case "D8": case "D9": case "DA": case "DC": case "DD": case "DE":
				this.labelInfo.upssData.orderSMDesc = "UPS Surepost SAVER";
				break;
			case "17": case "DF": case "DG": case "DH":
				this.labelInfo.upssData.orderSMDesc = "UPS Surepost EXPEDITED";
				break;
			case "20": case "DJ": case "DK": case "DL":
				this.labelInfo.upssData.orderSMDesc = "UPS Surepost STANDARD";
				break;
			case "08":
				this.labelInfo.upssData.orderSMDesc = "UPS Surepost ECONOMY";
				break;
			//default is read in on OBJ already orders.smdesc
		}//switch

		//set service icon
		switch(srvID){
			case "01": case "25": case "24": case "A2": case "NT": case "59": case "AC": case "66": case "D3": case "D4": case "P4": case "14": case "D2":
				this.labelInfo.upssData.serviceIcon = "1";
				break;
			case "44": case "47": case "58": case "A3": case "PG": case "60": case "AD": case "PN": case "69": case "D5": case "D6": case "D7":
				this.labelInfo.upssData.serviceIcon = "1 S";
				break;
			case "PW": case "T1": case "PY": case "T0": case "T3": case "T7":
			     this.labelInfo.upssData.serviceIcon = "2 S";
				break;
			case "13": case "30": case "29": case "A4": case "62": case "AE": case "NW": case "PS": case "04": case "D8": case "D9": case "DA":
				this.labelInfo.upssData.serviceIcon = "1P";
				break;
			case "07": case "18": case "19": case "A5": case "65": case "AF": case "PO": case "P7":
				this.labelInfo.upssData.serviceIcon = "2A";
				break;
			case "02": case "36": case "35": case "A6": case "NY": case "70": case "AG": case "67": case "DG": case "DH": case "P6": case "17": case "DF":
				this.labelInfo.upssData.serviceIcon = "2";
				break;
			case "12": case "40": case "39": case "A7": case "71": case "AH": case "P1": case "P8":
				this.labelInfo.upssData.serviceIcon = "3";
				break;
			case "03": case "43": case "42": case "A8": case "P2": case "72": case "AJ": case "68": case "DK": case "DL": case  "P9": case "20": case "DJ": case "SUREPOST": case "YH" : case "YW": case "YN": case "YT":
				this.labelInfo.upssData.serviceIcon = "#";
				break;
 			case "32": case "A9": case "15": case "A0": case "54": case "G1": case "G5": case "NP":
				this.labelInfo.upssData.serviceIcon = "1+";
				break;
			case "33": case "AA": case "41": case "A1": case "34": case "G4": case "G8": case "PA":
				this.labelInfo.upssData.serviceIcon = "1+S";
				break;
			case "DC": case "DD": case "DE":
				this.labelInfo.upssData.serviceIcon = "1PS";
				break;
			default:
				this.labelInfo.upssData.serviceIcon = "";
		}//swtich

		//set formatted tracking no
		var tfmt = this.labelInfo.trackingNumber.ljust(23).substr(0,23);
		this.labelInfo.trackingFormatted = 
			tfmt.substr(0,2) + " " +
			tfmt.substr(2,3) + " " +
			tfmt.substr(5,3) + " " +
			tfmt.substr(8,2) + " " +
			tfmt.substr(10,4) + " " +
			tfmt.substr(14,4);
 
 		//set URC version date
		var urcM = "";
		var urcY = "";
		/*console.log("making date out of " + this.labelInfo.upssData.urcDate);
		var urcDateObj = new Date(this.labelInfo.upssData.urcDate);
		 console.info("URC DATE OBJ: " + urcDateObj);
		if( ! isNaN(urcDateObj.getFullYear()) ){
			urcM = urcDateObj.getMonth() + 1;
			urcY = urcDateObj.getFullYear();
		}*/
		urcM = this.labelInfo.upssData.urcDate.split("-")[1];
		urcY = this.labelInfo.upssData.urcDate.split("-")[0];
		this.labelInfo.upssData.urcVersionDate = 
			this.labelInfo.upssData.urcVersion + " " 
			+ urcM.toString().rjust(2,"0") +
			 "/" + urcY;

		//set adult sig text:
		switch(this.labelInfo.upssData.carrierSM){
			case "A4": case "A2": case "A6": case "A3": case "A8":
				this.labelInfo.upssData.adultSignature = "ADULT SIGNATURE REQUIRED -- MIN 21";
				break;
			default:
				this.labelInfo.upssData.adultSignature = "";
		}//switch adult
 
	    /*bullseye moved to print as it contains different information
        TODO: create separate load functions
        */

 	    //format address as last bold
		var newArr, strout;
		newArr = compressAddressParts(this.labelInfo.shipTo);
		strout = "";
		for (var i = 0; i < newArr.length; ++i) {
		    if (i == newArr.length - 1)
		        newArr[i] = "<span style='font-size:14pt; font-weight:bold;'>" + newArr[i] + "</span>";

		    strout += newArr[i] + "<br/>";
		}
		this.labelInfo.shipToFormatted = strout;
		
		if (this.labelInfo.upssData.ref == null || this.labelInfo.upssData.ref == "")
		    this.labelInfo.upssData.refPrinted = this.labelInfo.orderNo;
		else
		    this.labelInfo.upssData.refPrinted = this.labelInfo.upssData.ref;
	
 	}//load UPSS data
 	this.loadDataUSPS = function(){
 		//load service stuff - defaults
 		this.labelInfo.uspsData.serviceLvlDesc = "USPS First-Class Pkg";
 		this.labelInfo.uspsData.serviceIcon = "P";

 		//check for null weight, set to 1 if so
 		if (isNaN(this.labelInfo.weight) || this.labelInfo.weight == "" )
 			this.labelInfo.weight = "1";

 		switch(this.labelInfo.uspsData.carrierSM){
 			case "055":
 				this.labelInfo.uspsData.serviceLvlDesc = "USPS Priority Mail";
 				this.labelInfo.uspsData.serviceIcon = "P";
 				this.labelInfo.weight = ConvertToPoundsOunces(this.labelInfo.weight);
 				break;
 			case "001":
 				this.labelInfo.uspsData.serviceLvlDesc = "USPS First-Class Pkg";
 				this.labelInfo.uspsData.serviceIcon = "F";
 				this.labelInfo.weight = ConvertToOuncesOnly(this.labelInfo.weight);
 				break;
 			case "612":
 				this.labelInfo.uspsData.serviceLvlDesc = "USPS Parcel Select";
 				this.labelInfo.uspsData.serviceIcon = "<img src="+this.labelInfo.imgLocaton+"/shared/assets/blank.gif' style='width:1.1in;height:1.1in;' alt='blank' />";
 				this.labelInfo.weight = ConvertToOuncesOnly(this.labelInfo.weight);
 				break;
 		}//switch

 		//set mailed from as return zip
		
 		var i = this.labelInfo.returnToAddress.length-1;
 		var wasfound = false;
		if(!this.labelInfo.uspsData.shipFromZip)
		{
			while( i >= 0 &&  !wasfound ){
				var matches = this.labelInfo.returnToAddress[i].match(/[0-9]{5}(?:-[0-9]{4})?/);
				if (matches && matches.length > 0){
					this.labelInfo.uspsData.shipFromZip = matches[0].split(" ").pop();
					wasfound = true;
				}
				i--;
			}//while not found
			if (!wasfound) this.labelInfo.uspsData.shipFromZip = "";
		}

		//format zip for barcode
		if (this.labelInfo.uspsData.shipToZip.length != 5 && this.labelInfo.uspsData.shipToZip.StZip != 9) 
			this.labelInfo.uspsData.shipToZip = this.labelInfo.uspsData.shipToZip.substring(0,5);

		var newArr, strout;
		newArr = compressAddressParts(this.labelInfo.shipTo);
		strout = "";
		for (var i = 0; i < newArr.length; ++i) {
		    if (i == newArr.length - 1)
		        newArr[i] = "<span style='font-size:14pt; font-weight:bold;'>" + newArr[i] + "</span>";

		    strout += newArr[i] + "<br/>";
		}
		this.labelInfo.shipToFormatted = strout;	
			
		//format tracking number
		var trk = this.labelInfo.trackingNumber; //for readability
		this.labelInfo.trackingFormatted = 
			trk.substr( 0, 4 ) + " " + 
			trk.substr( 4, 4 ) + " " + 
			trk.substr( 8, 4 ) + " " + 
			trk.substr( 12, 4 ) + " " +
			trk.substr( 16, 4 ) + " " + 
			trk.substr( 20 );
 	}//load data USPS

 	this.loadDataPurolator = function () {
 
 	    this.labelInfo.purlData.shipToPhone = this.labelInfo.purlData.shipToPhone.replace(/\D/g, "");

        //if the shipToPhones are blank, use retailer phone
 	    if (this.labelInfo.purlData.shipToPhone.trim() == "")
 	    {
 	        this.labelInfo.purlData.shipToPhone = this.labelInfo.retailerPhone;
 	    }

        //if shiptophone starts with a 1, remove it
 	    if (this.labelInfo.purlData.shipToPhone.substr(0, 1) == "1") {
 	        this.labelInfo.purlData.shipToPhone = this.labelInfo.purlData.shipToPhone.substr(1);
 	    }

		var outshipArray = [];
		for(var i = 0; i < this.labelInfo.shipTo.length-1; ++i){
			outshipArray.push(this.labelInfo.shipTo[i]);
		}
		var addparts = this.labelInfo.shipTo[this.labelInfo.shipTo.length-1].split(' '); //expected to be len 3
		var zip = addparts[addparts.length-1];
		zip = zip.substr(0, 3) + " " + zip.substr(3);
		var lastline = "";
		for (var i = 0; i < addparts.length - 1; ++i)
		    lastline += addparts[i] + " ";
		outshipArray.push(lastline + "  &nbsp;&nbsp;" + zip);
		this.labelInfo.purlData.displayShip = outshipArray;
		
        //replace all whitespace in zip, make uppercase
 	    this.labelInfo.purlData.shipToZip = this.labelInfo.purlData.shipToZip.replace(/\s/g, "").toUpperCase();

        //create an encoded zip code
 	    this.labelInfo.purlData.shipToZipEncode = encodeZip(this.labelInfo.purlData.shipToZip);

        //encode ship date
 	    this.labelInfo.purlData.deliveryDate = encodePurlDate(this.labelInfo.purlData.deliveryDate);

        //if service level is nothing, set to 0, else 1
 	    this.labelInfo.purlData.serviceLevel = (this.labelInfo.purlData.destIATA == "" ? "0" : "1");
		
		//set label header and serviceIcon based on the service name
		var serviceType;
		//pre-pending labelheader with div width 55%
		this.labelInfo.purlData.labelHeader = '<div class="header"></div>';
		
		if(this.labelInfo.purlData.serviceName == "PRI")
		{
			this.labelInfo.purlData.servIcon = "Purolator_P.PNG";
			this.labelInfo.purlData.labelHeader = '<div class="header">PRIORITY <br/> PRIORIT&#201;</div>';
			serviceType = "P";
		}	
		else if(this.labelInfo.purlData.serviceName == "XPP" || this.labelInfo.purlData.serviceName == "Xpresspost Certified")
		{
			this.labelInfo.purlData.servIcon = "Purolator_1.PNG";
			this.labelInfo.purlData.labelHeader = '<div class="header">XPRESSPOST <br/> XPRESSPOST</div>';
			serviceType = "1";
		}
		else if(this.labelInfo.purlData.serviceName == "EXPP")
		{
			this.labelInfo.purlData.servIcon = "Purolator_2.PNG";
			this.labelInfo.purlData.labelHeader = '<div class="expHeader">EXPEDITED PARCEL<br/>COLIS ACC&#201;L&#201;R&#201;S</div>';
			serviceType = "2";
		}
		else if(this.labelInfo.purlData.serviceName == "REGP")
		{
			this.labelInfo.purlData.servIcon = "Purolator_3.PNG";
			this.labelInfo.purlData.labelHeader = '<div class="header">REGULAR PARCEL <br/> COLIS STANDARD</div>';
			serviceType = "3";
		}
		else
	    {
			this.labelInfo.purlData.servIcon = "Unkown Service <br/>Level";
			this.labelInfo.purlData.labelHeader = "Unkown Service <br/>Level";
			serviceType = "";
		}
		
		//building barcode
		this.labelInfo.purlData.barcodeNo = BuildBarcode(serviceType, this.labelInfo.purlData.shipToZip, this.labelInfo.purlData.trackNo);
		
		function BuildBarcode(stype, shipno, trackno)
		{
			//servicetype+postalcode (sort by alpha and numberic in the order that they come)+ tracking number + 00000
			if(stype == "" )
			{
				console.warn("Could not build barcode service type is empty");
			}
			if(shipno == "")
			{
				console.warn("Could not build barcode shiptozip is empty");
			}
			if(trackno == "" )
			{
				console.warn("Could not build barcode tracking number is empty");
			}
			
			var result, left = "", right="", num ="0123456789";

			for(var i=0; i<shipno.length; i++)
			{
				if(num.indexOf(shipno.charAt(i)) > 0 || shipno.charAt(i) == '0')
				{
					right+=shipno.charAt(i);
				}
				else
				{
					left+= shipno.charAt(i);
				}
			}
			
			result = left + right;
			
			return stype+result+trackno+"00000";
		}
		
		//grabbing the first three chars of shiptozip to lookup airportCode
		var postalCode = "";
		if(this.labelInfo.purlData.shipToZip.length >= 3)
			postalCode = this.labelInfo.purlData.shipToZip.substring(0,3);
		else
			postalCode = this.labelInfo.purlData.shipToZip;
		
		switch(postalCode.toUpperCase())
		{
			case "FSA": 
			 this.labelInfo.purlData.airportCode= "Airport"; 
			 break;
			case "A0A": case "A0B": case "A0C": case "A0E": case "A0G": case "A0H": case "A0J": case "A0K": case "A0L": case "A0M": case "A0N": case "A1A": case "A1B": case "A1C": case "A1E": case "A1G": case "A1H": case "A1K": case "A1L": case "A1M": case "A1N": case "A1S": case "A1V": case "A1W": case "A1X": case "A1Y": case "A2A": case "A2B": case "A2H": case "A2N": case "A5A": case "A8A": 
			 this.labelInfo.purlData.airportCode= "YYT"; 
			 break;
			case "A0P": 
			 this.labelInfo.purlData.airportCode= "YYR"; 
			 break;
			case "A0R": case "A2V": 
			 this.labelInfo.purlData.airportCode= "YWK"; 
			 break;
			case "B0C": case "B0E": case "B0H": case "B0J": case "B0K": case "B0L": case "B0M": case "B0N": case "B0P": case "B0R": case "B0S": case "B0T": case "B0V": case "B0W": case "B1A": case "B1B": case "B1C": case "B1E": case "B1G": case "B1H": case "B1J": case "B1K": case "B1L": case "B1M": case "B1N": case "B1P": case "B1R": case "B1S": case "B1T": case "B1V": case "B1W": case "B1X": case "B1Y": case "B2A": case "B2C": case "B2E": case "B2G": case "B2H": case "B2J": case "B2N": case "B2R": case "B2S": case "B2T": case "B2V": case "B2W": case "B2X": case "B2Y": case "B2Z": case "B3A": case "B3B": case "B3E": case "B3G": case "B3H": case "B3J": case "B3K": case "B3L": case "B3M": case "B3N": case "B3P": case "B3R": case "B3S": case "B3T": case "B3V": case "B3Z": case "B4A": case "B4B": case "B4C": case "B4E": case "B4G": case "B4H": case "B4N": case "B4P": case "B4R": case "B4V": case "B5A": case "B6L": case "B9A": 
			 this.labelInfo.purlData.airportCode= "YHZ"; 
			 break;
			case "C0A": case "C0B": case "C1A": case "C1B": case "C1C": case "C1E": case "C1N": 
			 this.labelInfo.purlData.airportCode= "YYG"; 
			 break;
			case "E1A": case "E1B": case "E1C": case "E1E": case "E1G": case "E1H": case "E1J": case "E1N": case "E1V": case "E1W": case "E1X": case "E2A": case "E2E": case "E2G": case "E2H": case "E2J": case "E2K": case "E2L": case "E2M": case "E2N": case "E2P": case "E2R": case "E2S": case "E2V": case "E3L": case "E3N": case "E3Y": case "E3Z": case "E4H": case "E4J": case "E4K": case "E4L": case "E4M": case "E4N": case "E4P": case "E4R": case "E4S": case "E4T": case "E4V": case "E4W": case "E4X": case "E4Y": case "E4Z": case "E5A": case "E5B": case "E5C": case "E5E": case "E5G": case "E5H": case "E5J": case "E5K": case "E5L": case "E5M": case "E5N": case "E5P": case "E5R": case "E5S": case "E5T": case "E5V": case "E8A": case "E8B": case "E8C": case "E8E": case "E8G": case "E8J": case "E8K": case "E8L": case "E8M": case "E8N": case "E8P": case "E8R": case "E8S": case "E8T": case "E9A": case "E9B": case "E9C": case "E9E": case "E9G": case "E9H": 
			 this.labelInfo.purlData.airportCode= "YQM"; 
			 break;
			case "E3A": case "E3B": case "E3C": case "E3E": case "E3G": case "E6A": case "E6B": case "E6C": case "E6E": case "E6G": case "E6H": case "E6J": case "E6K": case "E6L": 
			 this.labelInfo.purlData.airportCode= "YFC"; 
			 break;
			case "E3V": case "E4A": case "E4B": case "E4C": case "E4E": case "E4G": case "E7A": case "E7B": case "E7C": case "E7E": case "E7G": case "E7H": case "E7J": case "E7K": case "E7L": case "E7M": case "E7N": case "E7P": 
			 this.labelInfo.purlData.airportCode= "YSJ"; 
			 break;
			case "G0A": case "G0C": case "G0E": case "G0G": case "G0H": case "G0J": case "G0K": case "G0L": case "G0M": case "G0N": case "G0P": case "G0R": case "G0S": case "G0T": case "G0V": case "G0W": case "G0X": case "G0Y": case "G0Z": case "G1A": case "G1B": case "G1C": case "G1E": case "G1G": case "G1H": case "G1J": case "G1K": case "G1L": case "G1M": case "G1N": case "G1P": case "G1R": case "G1S": case "G1T": case "G1V": case "G1W": case "G1X": case "G1Y": case "G2A": case "G2B": case "G2C": case "G2E": case "G2G": case "G2J": case "G2K": case "G2L": case "G2M": case "G2N": case "G3A": case "G3B": case "G3C": case "G3E": case "G3G": case "G3H": case "G3J": case "G3K": case "G3L": case "G3M": case "G3N": case "G3Z": case "G4A": case "G4R": case "G4S": case "G4T": case "G4V": case "G4W": case "G4X": case "G4Z": case "G5A": case "G5B": case "G5C": case "G5H": case "G5J": case "G5L": case "G5M": case "G5N": case "G5R": case "G5T": case "G5V": case "G5X": case "G5Y": case "G5Z": case "G6A": case "G6B": case "G6C": case "G6E": case "G6G": case "G6H": case "G6J": case "G6K": case "G6L": case "G6P": case "G6R": case "G6S": case "G6T": case "G6V": case "G6W": case "G6X": case "G6Y": case "G6Z": case "G7A": case "G7B": case "G7G": case "G7H": case "G7J": case "G7K": case "G7N": case "G7P": case "G7S": case "G7T": case "G7X": case "G7Y": case "G7Z": case "G8A": case "G8B": case "G8C": case "G8E": case "G8G": case "G8H": case "G8J": case "G8K": case "G8L": case "G8M": case "G8N": case "G8P": case "G8T": case "G8V": case "G8W": case "G8Y": case "G8Z": case "G9A": case "G9B": case "G9C": case "G9H": case "G9N": case "G9P": case "G9R": case "G9T": case "G9X": case "H1A": case "H1B": case "H1C": case "H1E": case "H1G": case "H1H": case "H1J": case "H1K": case "H1L": case "H1M": case "H1N": case "H1P": case "H1R": case "H1S": case "H1T": case "H1V": case "H1W": case "H1X": case "H1Y": case "H1Z": case "H2A": case "H2B": case "H2C": case "H2E": case "H2G": case "H2H": case "H2J": case "H2K": case "H2L": case "H2M": case "H2N": case "H2P": case "H2R": case "H2S": case "H2T": case "H2V": case "H2W": case "H2X": case "H2Y": case "H2Z": case "H3A": case "H3B": case "H3C": case "H3E": case "H3G": case "H3H": case "H3J": case "H3K": case "H3L": case "H3M": case "H3N": case "H3P": case "H3R": case "H3S": case "H3T": case "H3V": case "H3W": case "H3X": case "H3Y": case "H3Z": case "H4A": case "H4B": case "H4C": case "H4E": case "H4G": case "H4H": case "H4J": case "H4K": case "H4L": case "H4M": case "H4N": case "H4P": case "H4R": case "H4S": case "H4T": case "H4V": case "H4W": case "H4X": case "H4Y": case "H4Z": case "H5A": case "H5B": case "H7A": case "H7B": case "H7C": case "H7E": case "H7G": case "H7H": case "H7J": case "H7K": case "H7L": case "H7M": case "H7N": case "H7P": case "H7R": case "H7S": case "H7T": case "H7V": case "H7W": case "H7X": case "H7Y": case "H8N": case "H8P": case "H8R": case "H8S": case "H8T": case "H8Y": case "H8Z": case "H9A": case "H9B": case "H9C": case "H9E": case "H9G": case "H9H": case "H9J": case "H9K": case "H9P": case "H9R": case "H9S": case "H9W": case "H9X": case "J0A": case "J0B": case "J0C": case "J0E": case "J0G": case "J0H": case "J0J": case "J0K": case "J0L": case "J0M": case "J0N": case "J0P": case "J0R": case "J0S": case "J0T": case "J0V": case "J0W": case "J0Y": case "J0Z": case "J1A": case "J1C": case "J1E": case "J1G": case "J1H": case "J1J": case "J1K": case "J1L": case "J1M": case "J1N": case "J1R": case "J1S": case "J1T": case "J1X": case "J1Z": case "J2A": case "J2B": case "J2C": case "J2E": case "J2G": case "J2H": case "J2J": case "J2K": case "J2L": case "J2M": case "J2N": case "J2R": case "J2S": case "J2T": case "J2W": case "J2X": case "J2Y": case "J3A": case "J3B": case "J3E": case "J3G": case "J3H": case "J3L": case "J3M": case "J3N": case "J3P": case "J3R": case "J3T": case "J3V": case "J3X": case "J3Y": case "J3Z": case "J4B": case "J4G": case "J4H": case "J4J": case "J4K": case "J4L": case "J4M": case "J4N": case "J4P": case "J4R": case "J4S": case "J4T": case "J4V": case "J4W": case "J4X": case "J4Y": case "J4Z": case "J5A": case "J5B": case "J5C": case "J5J": case "J5K": case "J5L": case "J5M": case "J5R": case "J5T": case "J5V": case "J5W": case "J5X": case "J5Y": case "J5Z": case "J6A": case "J6E": case "J6J": case "J6K": case "J6N": case "J6R": case "J6S": case "J6T": case "J6V": case "J6W": case "J6X": case "J6Y": case "J6Z": case "J7A": case "J7B": case "J7C": case "J7E": case "J7G": case "J7H": case "J7J": case "J7K": case "J7L": case "J7M": case "J7N": case "J7P": case "J7R": case "J7T": case "J7V": case "J7W": case "J7X": case "J7Y": case "J7Z": case "J8A": case "J8B": case "J8C": case "J8E": case "J8G": case "J8H": case "J9E": case "J9L": case "J9P": case "J9T": case "J9V": case "J9X": case "J9Y": case "J9Z": case "X0A": 
			 this.labelInfo.purlData.airportCode= "YMX"; 
			 break;
			case "H0M": case "J0X": case "J8L": case "J8M": case "J8N": case "J8P": case "J8R": case "J8T": case "J8V": case "J8X": case "J8Y": case "J8Z": case "J9A": case "J9B": case "J9H": case "J9J": case "K0A": case "K0B": case "K0C": case "K0E": case "K0G": case "K0J": case "K1A": case "K1B": case "K1C": case "K1E": case "K1G": case "K1H": case "K1J": case "K1K": case "K1L": case "K1M": case "K1N": case "K1P": case "K1R": case "K1S": case "K1T": case "K1V": case "K1W": case "K1X": case "K1Y": case "K1Z": case "K2A": case "K2B": case "K2C": case "K2E": case "K2G": case "K2H": case "K2J": case "K2K": case "K2L": case "K2M": case "K2P": case "K2R": case "K2S": case "K2T": case "K2V": case "K2W": case "K4A": case "K4B": case "K4C": case "K4K": case "K4M": case "K4P": case "K4R": case "K6A": case "K6H": case "K6J": case "K6K": case "K6T": case "K6V": case "K7A": case "K7C": case "K7H": case "K7S": case "K7V": case "K8A": case "K8B": case "K8H": 
			 this.labelInfo.purlData.airportCode= "YOW"; 
			 break;
			case "K0H": case "K0K": case "K0L": case "K0M": case "K7G": case "K7K": case "K7L": case "K7M": case "K7N": case "K7P": case "K7R": case "K8N": case "K8P": case "K8R": case "K8V": case "K9A": case "K9H": case "K9J": case "K9K": case "K9L": case "K9V": case "L0A": case "L0B": case "L0C": case "L0E": case "L0G": case "L0H": case "L0J": case "L0K": case "L0L": case "L0M": case "L0N": case "L0P": case "L1A": case "L1B": case "L1C": case "L1E": case "L1G": case "L1H": case "L1J": case "L1K": case "L1L": case "L1M": case "L1N": case "L1P": case "L1R": case "L1S": case "L1T": case "L1V": case "L1W": case "L1X": case "L1Y": case "L1Z": case "L3P": case "L3R": case "L3S": case "L3T": case "L3V": case "L3X": case "L3Y": case "L3Z": case "L4A": case "L4B": case "L4C": case "L4E": case "L4G": case "L4H": case "L4J": case "L4K": case "L4L": case "L4M": case "L4N": case "L4P": case "L4R": case "L4S": case "L4T": case "L4V": case "L4W": case "L4X": case "L4Y": case "L4Z": case "L5A": case "L5B": case "L5C": case "L5E": case "L5G": case "L5H": case "L5J": case "L5K": case "L5L": case "L5M": case "L5N": case "L5P": case "L5R": case "L5S": case "L5T": case "L5V": case "L5W": case "L6A": case "L6B": case "L6C": case "L6E": case "L6G": case "L6H": case "L6J": case "L6K": case "L6L": case "L6M": case "L6P": case "L6R": case "L6S": case "L6T": case "L6V": case "L6W": case "L6X": case "L6Y": case "L6Z": case "L7A": case "L7B": case "L7C": case "L7E": case "L7G": case "L7J": case "L7K": case "L9J": case "L9L": case "L9M": case "L9N": case "L9P": case "L9R": case "L9S": case "L9T": case "L9V": case "L9W": case "L9Y": case "L9Z": case "M1B": case "M1C": case "M1E": case "M1G": case "M1H": case "M1J": case "M1K": case "M1L": case "M1M": case "M1N": case "M1P": case "M1R": case "M1S": case "M1T": case "M1V": case "M1W": case "M1X": case "M2H": case "M2J": case "M2K": case "M2L": case "M2M": case "M2N": case "M2P": case "M2R": case "M3A": case "M3B": case "M3C": case "M3H": case "M3J": case "M3K": case "M3L": case "M3M": case "M3N": case "M4A": case "M4B": case "M4C": case "M4E": case "M4G": case "M4H": case "M4J": case "M4K": case "M4L": case "M4M": case "M4N": case "M4P": case "M4R": case "M4S": case "M4T": case "M4V": case "M4W": case "M4X": case "M4Y": case "M5A": case "M5B": case "M5C": case "M5E": case "M5G": case "M5H": case "M5J": case "M5K": case "M5L": case "M5M": case "M5N": case "M5P": case "M5R": case "M5S": case "M5T": case "M5V": case "M5W": case "M5X": case "M6A": case "M6B": case "M6C": case "M6E": case "M6G": case "M6H": case "M6J": case "M6K": case "M6L": case "M6M": case "M6N": case "M6P": case "M6R": case "M6S": case "M7A": case "M7R": case "M7Y": case "M8V": case "M8W": case "M8X": case "M8Y": case "M8Z": case "M9A": case "M9B": case "M9C": case "M9L": case "M9M": case "M9N": case "M9P": case "M9R": case "M9V": case "M9W": case "P0A": case "P0B": case "P0C": case "P0E": case "P0G": case "P0H": case "P0J": case "P0K": case "P0L": case "P0M": case "P0N": case "P0P": case "P0R": case "P0S": case "P1A": case "P1B": case "P1C": case "P1H": case "P1L": case "P1P": case "P2A": case "P2B": case "P2N": case "P3A": case "P3B": case "P3C": case "P3E": case "P3G": case "P3L": case "P3N": case "P3P": case "P3Y": case "P4N": case "P4P": case "P4R": case "P5A": case "P5E": case "P5N": case "P6A": case "P6B": case "P6C": 
			 this.labelInfo.purlData.airportCode= "YYZ"; 
			 break;
			case "L0R": case "L0S": case "L2A": case "L2E": case "L2G": case "L2H": case "L2J": case "L2M": case "L2N": case "L2P": case "L2R": case "L2S": case "L2T": case "L2V": case "L2W": case "L3B": case "L3C": case "L3K": case "L3M": case "L7L": case "L7M": case "L7N": case "L7P": case "L7R": case "L7S": case "L7T": case "L8B": case "L8E": case "L8G": case "L8H": case "L8J": case "L8K": case "L8L": case "L8M": case "L8N": case "L8P": case "L8R": case "L8S": case "L8T": case "L8V": case "L8W": case "L9A": case "L9B": case "L9C": case "L9E": case "L9G": case "L9H": case "L9K": case "N0A": case "N0B": case "N0C": case "N0E": case "N0G": case "N0H": case "N0J": case "N0K": case "N0L": case "N0M": case "N0N": case "N0P": case "N0R": case "N1A": case "N1C": case "N1E": case "N1G": case "N1H": case "N1K": case "N1L": case "N1M": case "N1P": case "N1R": case "N1S": case "N1T": case "N2A": case "N2B": case "N2C": case "N2E": case "N2G": case "N2H": case "N2J": case "N2K": case "N2L": case "N2M": case "N2N": case "N2P": case "N2R": case "N2T": case "N2V": case "N2Z": case "N3A": case "N3B": case "N3C": case "N3E": case "N3H": case "N3L": case "N3P": case "N3R": case "N3S": case "N3T": case "N3V": case "N3W": case "N3Y": case "N4B": case "N4G": case "N4K": case "N4L": case "N4N": case "N4S": case "N4T": case "N4V": case "N4W": case "N4X": case "N4Z": case "N5A": case "N5C": case "N5H": case "N5L": case "N5P": case "N5R": case "N5V": case "N5W": case "N5X": case "N5Y": case "N5Z": case "N6A": case "N6B": case "N6C": case "N6E": case "N6G": case "N6H": case "N6J": case "N6K": case "N6L": case "N6M": case "N6N": case "N6P": case "N7A": case "N7G": case "N7L": case "N7M": case "N7S": case "N7T": case "N7V": case "N7W": case "N7X": case "N8A": case "N8H": case "N8M": case "N8N": case "N8P": case "N8R": case "N8S": case "N8T": case "N8V": case "N8W": case "N8X": case "N8Y": case "N9A": case "N9B": case "N9C": case "N9E": case "N9G": case "N9H": case "N9J": case "N9K": case "N9V": case "N9Y": 
			 this.labelInfo.purlData.airportCode= "YHM"; 
			 break;
			case "P0T": case "P0V": case "P0W": case "P0X": case "P7A": case "P7B": case "P7C": case "P7E": case "P7G": case "P7J": case "P7K": case "P7L": case "P8N": case "P8T": case "P9A": case "P9N": 
			 this.labelInfo.purlData.airportCode= "YQT"; 
			 break;
			case "P0Y": case "R0A": case "R0B": case "R0C": case "R0E": case "R0G": case "R0H": case "R0J": case "R0K": case "R0L": case "R0M": case "R1A": case "R1B": case "R1C": case "R1N": case "R2C": case "R2E": case "R2G": case "R2H": case "R2J": case "R2K": case "R2L": case "R2M": case "R2N": case "R2P": case "R2R": case "R2V": case "R2W": case "R2X": case "R2Y": case "R3A": case "R3B": case "R3C": case "R3E": case "R3G": case "R3H": case "R3J": case "R3K": case "R3L": case "R3M": case "R3N": case "R3P": case "R3R": case "R3S": case "R3T": case "R3V": case "R3W": case "R3X": case "R3Y": case "R4A": case "R4G": case "R4H": case "R4J": case "R4K": case "R4L": case "R5A": case "R5G": case "R5H": case "R6M": case "R6W": case "R7A": case "R7B": case "R7C": case "R7N": case "R8A": case "R8N": case "R9A": case "S0P": case "X0C": 
			 this.labelInfo.purlData.airportCode= "YWG"; 
			 break;
			case "S0A": case "S0C": case "S0G": case "S0H": case "S0N": case "S2V": case "S3N": case "S4A": case "S4H": case "S4L": case "S4M": case "S4N": case "S4P": case "S4R": case "S4S": case "S4T": case "S4V": case "S4W": case "S4X": case "S4Y": case "S4Z": case "S6H": case "S6J": case "S6K": case "S9H": 
			 this.labelInfo.purlData.airportCode= "YQR"; 
			 break;
			case "S0E": case "S0J": case "S0K": case "S0L": case "S0M": case "S6V": case "S6W": case "S6X": case "S7H": case "S7J": case "S7K": case "S7L": case "S7M": case "S7N": case "S7P": case "S7R": case "S7S": case "S7T": case "S7V": case "S7W": case "S9A": case "S9V": case "S9X": case "T9V": 
			 this.labelInfo.purlData.airportCode= "YXE"; 
			 break;
			case "T0A": case "T0B": case "T0C": case "T0E": case "T0G": case "T0H": case "T0P": case "T0V": case "T4J": case "T4L": case "T4V": case "T4X": case "T5A": case "T5B": case "T5C": case "T5E": case "T5G": case "T5H": case "T5J": case "T5K": case "T5L": case "T5M": case "T5N": case "T5P": case "T5R": case "T5S": case "T5T": case "T5V": case "T5W": case "T5X": case "T5Y": case "T5Z": case "T6A": case "T6B": case "T6C": case "T6E": case "T6G": case "T6H": case "T6J": case "T6K": case "T6L": case "T6M": case "T6N": case "T6P": case "T6R": case "T6S": case "T6T": case "T6V": case "T6W": case "T6X": case "T7A": case "T7E": case "T7N": case "T7P": case "T7S": case "T7V": case "T7X": case "T7Y": case "T7Z": case "T8A": case "T8B": case "T8C": case "T8E": case "T8G": case "T8H": case "T8L": case "T8N": case "T8R": case "T8S": case "T8T": case "T8V": case "T8W": case "T8X": case "T9A": case "T9C": case "T9E": case "T9G": case "T9H": case "T9J": case "T9K": case "T9M": case "T9N": case "T9S": case "T9W": case "T9X": case "X0B": case "X0G": 
			 this.labelInfo.purlData.airportCode= "YEG"; 
			 break;
			case "T0J": case "T0K": case "T0L": case "T0M": case "T1A": case "T1B": case "T1C": case "T1G": case "T1H": case "T1J": case "T1K": case "T1L": case "T1M": case "T1P": case "T1R": case "T1S": case "T1V": case "T1W": case "T1X": case "T1Y": case "T1Z": case "T2A": case "T2B": case "T2C": case "T2E": case "T2G": case "T2H": case "T2J": case "T2K": case "T2L": case "T2M": case "T2N": case "T2P": case "T2R": case "T2S": case "T2T": case "T2V": case "T2W": case "T2X": case "T2Y": case "T2Z": case "T3A": case "T3B": case "T3C": case "T3E": case "T3G": case "T3H": case "T3J": case "T3K": case "T3L": case "T3M": case "T3N": case "T3P": case "T3R": case "T3S": case "T3Z": case "T4A": case "T4B": case "T4C": case "T4E": case "T4G": case "T4H": case "T4N": case "T4P": case "T4R": case "T4S": case "T4T": 
			 this.labelInfo.purlData.airportCode= "YYC"; 
			 break;
			case "V0A": case "V0E": case "V0K": case "V1E": case "V1K": case "V1S": case "V2B": case "V2C": case "V2E": case "V2H": 
			 this.labelInfo.purlData.airportCode= "YKA"; 
			 break;
			case "V0B": case "V0G": case "V0L": case "V0M": case "V0N": case "V0T": case "V0X": case "V1A": case "V1C": case "V1L": case "V1M": case "V1N": case "V1R": case "V2G": case "V2P": case "V2R": case "V2S": case "V2T": case "V2V": case "V2W": case "V2X": case "V2Y": case "V2Z": case "V3A": case "V3B": case "V3C": case "V3E": case "V3G": case "V3H": case "V3J": case "V3K": case "V3L": case "V3M": case "V3N": case "V3R": case "V3S": case "V3T": case "V3V": case "V3W": case "V3X": case "V3Y": case "V3Z": case "V4A": case "V4B": case "V4C": case "V4E": case "V4G": case "V4K": case "V4L": case "V4M": case "V4N": case "V4P": case "V4R": case "V4S": case "V4W": case "V4X": case "V4Z": case "V5A": case "V5B": case "V5C": case "V5E": case "V5G": case "V5H": case "V5J": case "V5K": case "V5L": case "V5M": case "V5N": case "V5P": case "V5R": case "V5S": case "V5T": case "V5V": case "V5W": case "V5X": case "V5Y": case "V5Z": case "V6A": case "V6B": case "V6C": case "V6E": case "V6G": case "V6H": case "V6J": case "V6K": case "V6L": case "V6M": case "V6N": case "V6P": case "V6R": case "V6S": case "V6T": case "V6V": case "V6W": case "V6X": case "V6Y": case "V6Z": case "V7A": case "V7B": case "V7C": case "V7E": case "V7G": case "V7H": case "V7J": case "V7K": case "V7L": case "V7M": case "V7N": case "V7P": case "V7R": case "V7S": case "V7T": case "V7V": case "V7W": case "V7X": case "V7Y": case "V8A": case "V8B": 
			 this.labelInfo.purlData.airportCode= "YVR"; 
			 break;
			case "V0C": case "V1G": case "V1J": 
			 this.labelInfo.purlData.airportCode= "YXS (Prince George)"; 
			 break;
			case "V0H": case "V1B": case "V1H": case "V1P": case "V1T": case "V1V": case "V1W": case "V1X": case "V1Y": case "V1Z": case "V2A": case "V4T": case "V4V": 
			 this.labelInfo.purlData.airportCode= "YLW"; 
			 break;
			case "V0J": case "V0V": case "V2J": case "V2K": case "V2L": case "V2M": case "V2N": case "V8C": case "V8G": case "V8J": 
			 this.labelInfo.purlData.airportCode= "YXS"; 
			 break;
			case "V0P": case "V9H": case "V9R": case "V9S": case "V9T": case "V9V": case "V9W": case "V9X": 
			 this.labelInfo.purlData.airportCode= "YCD"; 
			 break;
			case "V0R": case "V0S": case "V8K": case "V8L": case "V8M": case "V8N": case "V8P": case "V8R": case "V8S": case "V8T": case "V8V": case "V8W": case "V8X": case "V8Y": case "V8Z": case "V9A": case "V9B": case "V9C": case "V9E": case "V9G": case "V9J": case "V9K": case "V9L": case "V9M": case "V9N": case "V9P": case "V9Y": case "V9Z": 
			 this.labelInfo.purlData.airportCode= "YYJ"; 
			 break;
			case "V0W": case "Y0A": case "Y0B": case "Y1A": 
			 this.labelInfo.purlData.airportCode= "YXY"; 
			 break;
			case "X0E": case "X1A": 
			 this.labelInfo.purlData.airportCode= "YZF"; 
			 break;
			default:
				this.labelInfo.purlData.airportCode = "";
		}

		//updating airportCode property to include div
		if(this.labelInfo.purlData.airportCode != "")
			this.labelInfo.purlData.airportCode = '<div class="airport"><span style="display:block; width:100%; font-size:8pt;">Airport/A&#233;roport</span>' + this.labelInfo.purlData.airportCode + '</div>';
		
		//exception if the service level is expedited parcel
		if(this.labelInfo.purlData.serviceName == "EXPP")
			this.labelInfo.purlData.airportCode = '';
					
        function encodeZip(zipin) {
            var letters = ["|","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
            var zout = "";

            for (var i = 0; i < zipin.length; ++i) {
                if (letters.indexOf(zipin.charAt(i)) > 0)
                    zout += (letters.indexOf(zipin.charAt(i)).toString()).rjust(2, "0");
                else
                    zout += zipin[i].toString(); //else is an int
            }

            return zout;
        }

        function encodePurlDate(dateIn) {
            var odatein = new Date(); //set backup to current date
            var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

            //if date is parseable set it
            if (dateIn != "" && dateIn.indexOf("»") <= 0)
                odatein = Date.parse(dateIn);
                       
            var day = odatein.getDate().toString().rjust(2, "0");
            var month = months[odatein.getMonth()];
            var year = odatein.getFullYear();

            return day + "/" + month + "/" + year;
        }

	}
	this.printLabelFedex = function(){
		this.CheckMissingFedex(); 
		//this.labelInfo in scope
		this.defaultErrorMessage = "Fedex " + this.defaultErrorMessage + "<br/>";
		//console.log(this.labelInfo);

		var fedexInfo = this.labelInfo.fedexData; //shortcut for referencing fedex data

		if (this.missingData.length > 0){
			for (var i = 0; i < this.missingData.length; i++) {
			    this.defaultErrorMessage += this.missingData[i] + ", ";
			}//for

			document.write(this.defaultErrorMessage);
		}else{
		//no missing data
		this.loadDataFedex();

		var outputBuffer ="";

		var cssClass = "inner fedex";
		var rotateBarcode = "";
		if (isIE() == 8)
		{
		    cssClass = "fedexie8' style='width:6in;";
			rotateBarcode = "&rotate=true";
		}
		
		var webNo = "";
		
		if(typeof this.labelInfo.webOrderNo === "undefined"){
			//console.log("webOrderNo property of labelInfo does not exist");
		}
		else{
			webNo = this.labelInfo.webOrderNo;
			
			if(webNo != ""){
				webNo = "<br/>REF#:" + webNo;
			}
		}
		
		outputBuffer +=
		"<div class='" + cssClass + "'> " +
		//"<div class='inner " + cssClass + "'> " +
			"<div class='row1'>" + //fedex-new-reg-
				"<div class='from-address' >" + //
					"ORIGIN ID:" + fedexInfo.originID + "<span style='margin-left:25%;'>" + this.labelInfo.csPhone + "</span><br />" +
					addressFormatStr(this.labelInfo.returnToAddress) + //function from packslipbase.js
				"</div>" +
				"<div class='ship-info'>" +
					"SHIP DATE: " + fedexInfo.shipDate + "<br />" +
					"ACTWGT: " + this.labelInfo.weight + "&nbsp;" + fedexInfo.weightUOM + "<br />" +
					"CAD: " + fedexInfo.meterNo + "/" + fedexInfo.fxrsVersion + "<br />";
		if (!isNaN(fedexInfo.dryIce) && parseFloat(fedexInfo.dryIce) != 0) {
		    outputBuffer += "DRY ICE:" + fedexInfo.dryIce + "&nbsp;" + fedexInfo.WeightUOM + "<br />";
		}
		outputBuffer += "&nbsp;<br />" +
        fedexInfo.payType +
    "</div>" +
"</div>" +
"<div class='row2'>" +
    "<div class='to'>TO:</div>" +
    "<div class='toaddress'>" +
        "<div class='shiptoaddress'>" +
            addressFormatStr(this.labelInfo.shipTo) +
			"<span style='font-size:10pt;'><b>" + fedexInfo.shipToPhone + "</b></span>" +
			 "<span style='font-weight: normal!important;'>" +webNo+ "</span>"+
        "</div>" +
        "<div class='tocountry'>" +
            "<div class='ref' style=''>";
//                "<span style='font-size:10pt;'><b>" + fedexInfo.shipToPhone + "</b></span>";

		if (this.labelInfo.REF) {
		    outputBuffer += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;REF#:" + this.labelInfo.REF;
		}
		if (this.labelInfo.INV) {
		    outputBuffer += "<br/> INV " + this.labelInfo.INV;
		}
		if (this.labelInfo.PO) {
		    outputBuffer += "<br/> PO " + this.labelInfo.PO.substring(0, 8);
		}
		if (!this.labelInfo.PO && !this.labelInfo.INV) {
		    outputBuffer += "<br/>";
		}
		if (this.labelInfo.DEPT) {
		    outputBuffer += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DEPT " + this.labelInfo.DEPT;
		}
		outputBuffer +=
        "</div>" +
        " <div class='country'>(";
		if (fedexInfo.shipToCountry.trim() == "USA") {
		    outputBuffer += "US";
		}
		else {
		    outputBuffer += fedexInfo.shipToCountry;
		}
		outputBuffer += ")" +
                    "</div>" + //country
                "</div>" + //tocountry
            "</div>" + //toaddress
        "</div>" + //row2
        "<div class='row3'>";
		if (fedexInfo.serviceDesc.trim() == "Express") {
		    outputBuffer += "" +
            "<div class='deliverybarcode'>";
		    outputBuffer += "<img src='" + this.labelInfo.barcodeLocation + "/Barcode.ashx?Code=" + fedexInfo.addrBarcode + "&Type=128B&X=2.6&Y=0.1&round=2" + rotateBarcode + "' alt='FX_AddrBarcode: " + fedexInfo.addrBarcode + "' />";
		    outputBuffer +=
            "</div>";
		}
		outputBuffer +=
        "<div class='two-d-barcode'>" +
            "<img src='" + this.labelInfo.imgLocaton + fedexInfo.pdf417 + "' alt='FedEx 2D Barcode' />" +
        "</div>" +
        "<div class='extras'>" +
            "<div class='logo'>" + fedexInfo.logo + "</div>" +
            "<div class='cls'>" +
                "<div class='clsinner'>" + fedexInfo.CLS + "</div>" +
            "</div>" +
            "<div class='letter-box'>" +
                "<div class='letter' >" + fedexInfo.serviceLetter + "</div>" +
            "</div>" +
        "</div>";
		if (fedexInfo.productName == "HAZ") {
		    outputBuffer +=
            "<div class='emergency'>Emergency Contact #<br />" + fedexInfo.shipToPhone + "</div>";
		}
		outputBuffer +=
        "</div>" + //row 3
        "<div class='row4'>";
		if (fedexInfo.serviceDesc == "Express") {
		    outputBuffer +=
            "<div class='leftExpress'>";
		    // show form id - express
		    outputBuffer +=
            "<div class='label'>" + "TRK#";
		    outputBuffer +=
            "<div class='formID'>" + fedexInfo.formID + "</div>";
		    outputBuffer +=
            "</div>" + //label
            "<div class='trackingno'>" +
                this.labelInfo.trackingFormatted.replace(/\s/g, "&nbsp;") +
            "</div>" + //trackinno
            "<div class='ursa30'>";
		    outputBuffer += fedexInfo.ursa30;
		    outputBuffer +=
            "</div>"; //ursa30
		}
		else {
		    outputBuffer +=
            "<div class='leftGround'>";
		}
		outputBuffer +=
        "</div>"; //if express close leftexpress, close leftGround 

		if (fedexInfo.serviceDesc == "Express") {
		    outputBuffer +=
            "<div class='rightExpress'>";
		    outputBuffer +=
            "<div class='text'>" +
                fedexInfo.deliveryDate + "&nbsp;" +
            "</div>" +
            "<div class='text'>" +
                fedexInfo.productName + "&nbsp;" +
            "</div>" +
            "<div class='text'>" + fedexInfo.handleCode + "&nbsp;</div>" +
            "<div class='lasttext'>" + fedexInfo.shipToZip + "&nbsp;<br />" +
                 "<span style='font-size:6pt;'>" + fedexInfo.stateUS + "</span>&nbsp;" + fedexInfo.rampID + "&nbsp;" +
            "</div>";
		}
		else {
		    outputBuffer +=
            "<div class='rightGround'>";
		}

		outputBuffer +=
        "</div>" + //close right ground or right express

        "<div class='bottombarcode'>";
		outputBuffer += "<img src='" + this.labelInfo.barcodeLocation + "/Barcode.ashx?Code=" + fedexInfo.barcode1D + "&Type=128C&X=3.52&Y=0.75" + rotateBarcode + "'  alt='1D Barcode: " + fedexInfo.barcode1D + "' />";
		//outputBuffer += "<img src='" + this.labelInfo.barcodeLocation + "/Barcode.ashx?Code=" + fedexInfo.barcode1D + "&Type=128C&X=4.62&Y=0.75" + rotateBarcode + "'  alt='1D Barcode: " + fedexInfo.barcode1D + "' />";

		if (fedexInfo.serviceDesc != "Express") {
		    outputBuffer +=
            "<div class='readable96div' style='text-align:left;/*margin:.4in 0in 0in .1in;*/' > " + fedexInfo.readable96 + "</div>";
		    outputBuffer +=
            "<div class='gndHomediv' style='font-size:10pt;font-weight:bold;text-align:left;/*margin-top:.2in;*/' >" +
                "<span style='font-size:12pt'>" + fedexInfo.gndHome + "</span><br/>3rd Party" +
            "</div>";
		}

		outputBuffer +=
        "</div>" + //bottom barcode
    "</div>" + //row 4
"</div>"; //inner not needed -></div>";
			document.write(  outputBuffer);
			
		}//else write label
	}

	this.printLabelUPS = function(){
		this.CheckMissingUPS();
		this.defaultErrorMessage = "UPS " + this.defaultErrorMessage + "<br/>";
		 //ljust from packslipbase.js
		
		//console.log(this.labelInfo);
		var upsInfo = this.labelInfo.upsData;
		var tempZip = formatUSZip(upsInfo.shipToZip).replace(/\s/g, "");
		if(tempZip == "fail"){
			upsInfo.shipToZip = formatCAZip(upsInfo.shipToZip).replace(/\s/g, "");
		}
		else{
			upsInfo.shipToZip = tempZip;
		}
		
		if(upsInfo.shipToZip == "fail")
			this.missingData.push("shipToZip");
			
		if (this.missingData.length > 0){
			for (var i = 0; i < this.missingData.length; i++) {
			    this.defaultErrorMessage += this.missingData[i] + ", ";
			}//for

			document.write(this.defaultErrorMessage);

		}else{
			this.loadDataUPS();

			var billingtext, phoneNumberExt = "";
			
			var cssClass = "inner ups";
		    var rotateBarcode = "";
		    if (isIE() == 8) {
		        cssClass = "upsie8' style='width:6in;";
		        rotateBarcode = "&rotate=true";
		    }
			
			if(upsInfo.phoneNumberExt === "undefined"){
				console.warn("phoneNumberExt property was not found in the ups object...phone number will not show under customer name");
			}
			else{
				if(upsInfo.phoneNumberExt != "")
					phoneNumberExt = upsInfo.phoneNumberExt;
			}
	
		    sOutputBuffer = "<div class='" + cssClass + "'> " +
			"	<div class='row1'>" + 
			"		<div class='left'>" + 
						addressFormatStr(this.labelInfo.returnToAddress).toUpperCase() +
			"		</div>" + 
			"		<div class='right'>" + 
						"<span class='weight'>" + FormatWeight(this.labelInfo.weight) + " </span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span class='o1'>1 OF 1</span> " +
			"		</div>" + 
			"	</div>" + 
			"	<div class='row2'>" + 
			"		<div class='label'>" + 
			"			<b>SHIP TO:</b><br/>" + 
			"		</div>" + 
			"		<div class='address'>" +
						this.labelInfo.shipToFormatted +  
			"		</div>" + 
			"	</div>" + 
			"	<div class='row3'>" + 
			"		<div class='bullseye'>" + 
			"				<img src='" + upsInfo.bullseye + "' alt='Bullseye'>" + 
			"		</div>" + 
			"		<div class='urc-wrapper'>" + 
			"			<div class='urc'>" + upsInfo.urc + "</div>" + 
			"			<div class='barcode' >" + 
			"				<img src='" + this.labelInfo.barcodeLocation + "/barcode.ashx?Code=420" + upsInfo.shipToZip + "&Type=128Auto&ml=19" + rotateBarcode + "' class='' alt='URC'/>" + 
			"			</div>" + 
			"		</div>" + 
			"	</div>" + 
			"	<div class='row4'>" + 
			"		<div class='tracking-wrapper'>" + 
			"			<span>" + upsInfo.orderSMDesc.toUpperCase() + "</span><br/>" +  
			"			TRACKING#: " + this.labelInfo.trackingFormatted + 
			"		</div>" + 
			"		<div class='icon'>";
			if(upsInfo.serviceIcon == "#")
				sOutputBuffer+=	"<img src='" + this.labelInfo.imgLocaton + "/shared/assets/UPSServiceIcon.gif' alt='G' />";
			else
				sOutputBuffer+=	upsInfo.serviceIcon;
			sOutputBuffer +=
			"		</div>" +
			"	</div>" +
			"	<div class='row5'>" +
            "       <div class='track'>" +
			"		    <img src='" + this.labelInfo.barcodeLocation + "/barcode.ashx?Code=" + this.labelInfo.trackingNumber + "&Type=1Z&ml=19" + rotateBarcode + "'  alt='Tracking Barcode'>" +
			"	    </div>" +
            "   </div>" +
			"	<div class='row6'>" +
			"		<div class='billing'>" + upsInfo.billingtext + "</div>" +
			"		<div class='urc-date'>" + upsInfo.urcVersionDate + "</div>" +
                ((upsInfo.adultSignature == null || upsInfo.adultSignature == "") ? "" : "<div class='adult'>" + upsInfo.adultSignature + "</div>") +
			    ((upsInfo.invPrinted == null || upsInfo.invPrinted == "") ? "" : "<div class='adult'>" + upsInfo.invPrinted + "</div>") +
			"     <div class='ref'>" + 
                ((upsInfo.refPrinted == null || upsInfo.refPrinted == "") ? "" : " REF: # " + upsInfo.refPrinted) +
                ((upsInfo.shipDate == null || upsInfo.shipDate == "") ? "" : " Ship Date: " + upsInfo.shipDate) +
                 "</div>" +
			"	</div>	" +
			" </div>";  

			document.write(sOutputBuffer);
		}//else
	}//print label

	this.printLabelUSPS = function(){
		this.CheckMissingUSPS();
		this.defaultErrorMessage = "USPS " + this.defaultErrorMessage + "<br/>";
		 //ljust from packslipbase.js
		
		//console.log(this.labelInfo);
		var upsInfo = this.labelInfo.upsData;
		upsInfo.shipToZip = formatUSZip(upsInfo.shipToZip);
		
		if(upsInfo.shipToZip == "fail")
			this.missingData.push("shipToZip");
			
		if (this.missingData.length > 0){
			for (var i = 0; i < this.missingData.length; i++) {
			    this.defaultErrorMessage += this.missingData[i] + ", ";
			}//for

			document.write(this.defaultErrorMessage);

		}else{
			this.loadDataUSPS();

			var uspsInfo = this.labelInfo.uspsData;
			

			var cssClass = "inner usps";
			var rotateBarcode = "";
			if (isIE() == 8) {
			    cssClass = "uspsie8' style='width:6in;";
			    rotateBarcode = "&rotate=true";
			}
			var webNo = "";
		
			if(typeof this.labelInfo.webOrderNo === "undefined"){
				//console.log("webOrderNo property of labelInfo does not exist");
			}
			else{
				webNo = this.labelInfo.webOrderNo;
				
				if(webNo != ""){
					webNo = "REF#:" + webNo;
				}
			}
		
			var outputBuffer ="";
			outputBuffer += '' +
				"<div class='" + cssClass + "'> " +
			    '<div class="row1">' +
				    '<div class="icon">' + uspsInfo.serviceIcon + '</div>' +
				    '<div class="top-box">' + 
					     uspsInfo.serviceLvlDesc.toUpperCase().replace("USPS", "") + 
					     '<br />US POSTAGE PAID<br />' + uspsInfo.companyName + '<br />ePostage' +
				    '</div>' +
			    '</div>' +
			    '<div class="svc-banner">' + uspsInfo.serviceLvlDesc.toUpperCase() + '</div>' + // PRIORITY MAIL, FIRST-CLASS PKG
			    '<div class="from">' +
				    '<div class="address">' +
					    addressFormatStr( this.labelInfo.returnToAddress ) +						
				    '</div>' +
				    //'<div class="usps-weight">WT&nbsp;' + USPS_FormatWeight( oLabelInfo.Weight ) + '&nbsp;lb</div>' +
				    '<div class="weight">' + 
					    uspsInfo.shipDate + "<br />" +
					    "Mailed From " + uspsInfo.shipFromZip + "<br />" +
					    this.labelInfo.weight + "<br />" +
				    '</div>' +
			    '</div>' +
			    '<div class="ref"></div>' +
			    '<div class="ship-to">' +

				    '<div class="address">' +
					    this.labelInfo.shipToFormatted.toUpperCase() +
				    '</div>' +
			    '</div>' +
			    '<div class="barcode">' +
				    'USPS TRACKING # EP<br />' +
				    '<img src="' + this.labelInfo.barcodeLocation + 
					    '/barcode.ashx?Zip=' + upsInfo.shipToZip + 
					    '&Track=' + this.labelInfo.trackingNumber + 
					    '&Construct=' + uspsInfo.construct + 
					    '&Type=USPS&ml=19' + rotateBarcode + '" ' +
					    'alt="420 ' + uspsInfo.shipToZip + ' ' + this.labelInfo.trackingNumber + '" />' +
					    '<br />' +
					    this.labelInfo.trackingFormatted + 
			    '</div>' + 
				 '<br/> <div style="width:100%; text-align: right; font-size:8pt;"><span style="padding-right: 0.0625in;">'+webNo+'</span></div>'+
			'</div><!-- closing usps -->';

		document.write(outputBuffer);
		}//else print label
	}//print label USPS
	
	this.printLabelUPSS = function(){
		this.CheckMissingUPSS();
		this.defaultErrorMessage = "upss " + this.defaultErrorMessage + "<br/>";
		 //ljust from packslipbase.js
		
		//console.log(this.labelInfo);
		var upssInfo = this.labelInfo.upssData;
		upssInfo.shipToZip = formatUSZip(upssInfo.shipToZip);
		
		if(upssInfo.shipToZip == "fail")
			this.missingData.push("shipToZip");
			
		if (this.missingData.length > 0){
			for (var i = 0; i < this.missingData.length; i++) {
			    this.defaultErrorMessage += this.missingData[i] + ", ";
			}//for

			document.write(this.defaultErrorMessage);

		}else{
			this.loadDataUPSS();

			var billingtext, phoneNumberExt = "";
			if (upssInfo.isThirdParty === true)
				billingtext = "BILLING: 3RD PARTY";
			else
				billingtext = "BILLING: P/P"
			
			if(upssInfo.phoneNumberExt === "undefined"){
				console.warn("phoneNumberExt property was not found in the ups object...phone number will not show under customer name");
			}
			else{
				if(upssInfo.phoneNumberExt != "")
					phoneNumberExt = upssInfo.phoneNumberExt;
			}
			
			var message = "";
			//if( this.labelInfo.surepostSvcIndicator == "YH" ||  this.labelInfo.surepostSvcIndicator == "YT")
				message = "ATTENTION UPS DRIVER: SHIPPER RELEASE";
			
			var urcDate = new Date(upssInfo.urcDate);
			console.info("URC DATE: " + urcDate);
			var month = this.labelInfo.upssData.urcDate.split("-")[1];
			var urcYear = this.labelInfo.upssData.urcDate.split("-")[0];

		    //set bullseye
			var url;
			if (this.labelInfo.upssData.bullDomain === undefined)
			    url = "/images/bullseye.ashx"; //if undefined assume relative path
			else
			    url = this.labelInfo.imgLocaton + "/images/bullseye.ashx";
			var bullDateObj = new Date(this.labelInfo.upssData.orderEstDate);

			var bullDateFormat =
                bullDateObj.getFullYear() + "-" +
                (bullDateObj.getMonth() + 1).toString().rjust(2, "0") + "-" +
                bullDateObj.getDate().toString().rjust(2, "0");

			this.labelInfo.upssData.bullseye =
               url + "?" +
               "PostalCode=" + this.labelInfo.upssData.shipToZip + "&" +
               "TrackingNo=" + this.labelInfo.upssData.trackingNumber.trim() + "&" +
               "Pickup=" + bullDateFormat + "&" +
               "Weight=" + Math.ceil(parseFloat(this.labelInfo.weight)).toString() + "&" +
               "City=" + this.labelInfo.upssData.shipToCity + "&" +
               "State=" + this.labelInfo.upssData.shipToState + "&" +
               "Country=" + this.labelInfo.upssData.shipToCountry;
		
			var cssClass = "inner ups";
			var rotateBarcode = "";
			if (isIE() == 8) {
			    cssClass = "upsie8' style='width:6in;";
			    rotateBarcode = "&rotate=true";
			}

			sOutputBuffer = "<div class='" + cssClass + "'> " +
			"	<div class='row1'>" + 
			"		<div class='left'>" + 
						addressFormatStr(this.labelInfo.returnToAddress).toUpperCase() +
			"		</div>" + 
			"		<div class='right' style='font-size:15pt;'>" + 
						"<span class='weight'>" + FormatWeight(this.labelInfo.weight) + "</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='o1'> 1 of 1 </span>" +
			"		</div>" + 
			"	</div>" + 
			"	<div class='row2'>" + 
			"		<div class='label' style  ='text-align: right;'>" + 
			"			<b>SHIP <br/> TO:</b><br/>" + 
			"		</div>" + 
			"		<div class='address'>" +
						//AddPhoneNumberToShipTo(
						this.labelInfo.shipToFormatted.toUpperCase() + //,phoneNumberExt) +
			"		</div>" + 
			"	</div>" + 
			"	<div class='row3'>" + 
			"		<div class='bullseye'>" + 
			"				<img src='" + upssInfo.bullseye + "' style='font-size:30pt; padding-left:.05in;' alt='Bullseye'>" + 
			"		</div>" + 
			"		<div class='urc-wrapper'>" + 
			"			<div class='urc' style='font-size:25pt;' >" + upssInfo.urc + "</div>" + //set urc text to 30pt
			"			<div class='barcode' >" + 
			"				<img src='" + this.labelInfo.barcodeLocation + "/barcode.ashx?Code=420" + upssInfo.shipToZip + "&Type=128C&X=1.75&Y=0.5" + ("") + "' class='ups-urc-barcode' alt='URC'/>" +
			"			</div>" + 
			"		</div>" + 
			"	</div>" + 
			"	<div class='row4'>" + 
			"		<div class='tracking-wrapper'>" + 
			"			<span style='font-size:16pt;'>" + "UPS SUREPOST"+ "</span>" + //this.labelInfo.shipMethodDesc.toUpperCase() + "</span><br/>" + 
			"			 <br/>TRACKING#: " + this.labelInfo.trackingFormatted + 
			"		</div>" + 
			"		<div class='icon'>";
			if(upssInfo.serviceIcon == "#")
				sOutputBuffer+=	"<img src='" + this.labelInfo.imgLocaton + "/shared/assets/upsServiceIcon.gif' alt='G' />";
			else
				sOutputBuffer+=	upssInfo.serviceIcon;
			sOutputBuffer +=
			"		</div>" +
			"	</div>" +
			"	<div class='row5'>" +
            "       <div class='track'>" +
			"		    <img src='" + this.labelInfo.barcodeLocation + "/barcode.ashx?Code=" + upssInfo.trackingNumber + "&Type=1Z&X=3.8&Y=1'  alt='Tracking Barcode' style='margin-bottom: .05in;'>" +
			"	    </div>" +
            "   </div>" +
			"	<div class='row6'>" +
			"		<div class='billing'>" + billingtext + "</div>" +
			"		<div class='urc-date'>" + "" + "</div>" +
			"		<div class='adult' style ='margin-top : .25in; margin-bottom: .2in;'>" + message + " &nbsp;</div>" +
			//"		<div class='ref'>REF: # " + upssInfo.refPrinted + " 	<div style='float:right; font-size:6pt;'> " + upssInfo.urcVersion +" "+  month+ "/" + urcDate.getFullYear() + "  </div></div>" +
			"		<div class='ref'>REF: # " + upssInfo.refPrinted + " 	<div style='float:right; font-size:6pt;'> " + upssInfo.urcVersion +" "+  month + "/" + urcYear + "  </div></div>" +
			"	</div>	" +
			" </div>"; // close inner upss div
			//"</div></div>"; //extra?

			document.write(sOutputBuffer);
		}//else
	}
	
	this.printLabelUSPSS = function(){
		this.CheckMissingUSPSS();
		this.defaultErrorMessage = "upss " + this.defaultErrorMessage + "<br/>";

		var upssInfo = this.labelInfo.upssData;
		upssInfo.shipToZip = formatUSZip(upssInfo.shipToZip);
		
		if(upssInfo.shipToZip == "fail")
			this.missingData.push("shipToZip");
			
		if (this.missingData.length > 0){
			for (var i = 0; i < this.missingData.length; i++) {
			    this.defaultErrorMessage += this.missingData[i] + ", ";
			}//for

			document.write(this.defaultErrorMessage);

		}else{
			//they use the same information
			this.loadDataUPSS();

			var isUPSDelivered = CheckIfUPSDelivered( upssInfo.surePostSvcInd );
			var surePostIndicia = CheckForSurepostIndicia(upssInfo.surePostSvcInd, upssInfo.carrierSM);
			
			var billingtext;
			
			if (upssInfo.isThirdParty === true)
				billingtext = "BILLING: 3RD PARTY";
			else
				billingtext = "BILLING: P/P"
			
			var urcAdd = "";
			
			if( !isUPSDelivered ) {
				urcAdd = (( this.labelInfo.surepostSvcIndicator == "YN" ) ? " C" : " X" );
			}
			
			//var finalZipCode = GetZipCode();
			var urcZip = upssInfo.surePostPOZip;
			//[upssInfo.surePostPOAdress, upssInfo.surePostPOCity + ", "+ upssInfo.surePostPOState + ", "+ upssInfo.surePostPOZip]
			if(urcZip == ""){
				console.warn("<surePostPOZip> is empty...");
				urcZip = upssInfo.shipToBarcode;
			}
			
			var surePostPOZ = upssInfo.surePostPOZip;
			
			if(surePostPOZ.length > 5){
				var res = surePostPOZ.substring(0, 5);
				res = res + "-" + surePostPOZ.substring(5,surePostPOZ.length);
				surePostPOZ = res;
			}
			
			var shipToCaps = this.labelInfo.shipTo;
			for(var i = 0; i<shipToCaps.length; i++)
			{
				shipToCaps[i] = shipToCaps[i].toUpperCase();
			}

		    //set bullseye
			var url;
			if (this.labelInfo.upssData.bullDomain === undefined)
			    url = "/images/bullseye.ashx"; //if undefined assume relative path
			else
			    url = this.labelInfo.imgLocaton + "/images/bullseye.ashx";
			var bullDateObj = new Date(this.labelInfo.upssData.orderEstDate);

			var bullDateFormat =
                bullDateObj.getFullYear() + "-" +
                (bullDateObj.getMonth() + 1).toString().rjust(2, "0") + "-" +
                bullDateObj.getDate().toString().rjust(2, "0");

			this.labelInfo.upssData.bullseye =
               url + "?" +
               "PostalCode=" + this.labelInfo.upssData.surePostPOZip + "&" +
               "TrackingNo=" + this.labelInfo.upssData.trackingNumber.trim() + "&" +
               "Pickup=" + bullDateFormat + "&" +
               "Weight=" + Math.ceil(parseFloat(this.labelInfo.weight)).toString() + "&" +
               "City=" + this.labelInfo.upssData.shipToCity + "&" +
               "State=" + this.labelInfo.upssData.shipToState + "&" +
               "Country=" + this.labelInfo.upssData.shipToCountry;
			
			sOutputBuffer =   
			"<div class='inner upsSure' > " + 
			"	<div class='row1' >" + 
			"		<div class='left' >" + 			
						addressFormatStr(this.labelInfo.returnToAddress).toUpperCase() +
			"		</div>" + 
			"		<div class='right' >" + 
						"<span class='weight'>" + FormatWeight(upssInfo.weight) + "</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span class='o1'> 1 of 1 </span> " +
			"		</div>" + 
			"	</div>" + 
			"	<div class='row2' >" + 
			"		<div class='label' >" + 
			"			<b>SHIP <br/> TO:</b><br/>" + 
			"		</div>" + 
			"		<div class='address'>" +
			"USPS "+ upssInfo.shipToZip+ "<br/>"+
						addressFormatStr([upssInfo.surePostPOAdress, "<b>"+upssInfo.surePostPOCity + " "+ upssInfo.surePostPOState + " "+ surePostPOZ +"</b>"]).toUpperCase() +
			"		</div>" + 
			"	</div>" + 
			"	<div class='row3'>" + 
			"		<div class='bullseye'>" + 
			"				<img class='bull' src='" + upssInfo.bullseye + "' alt='Bullseye' />" + 
			"		</div>" + 
			"		<div class='urc-wrapper'>" + 
			"			<div class='urc' >" + upssInfo.urc + urcAdd + "</div>" + 
			"			<div class='barcode' >" + 
			"				<img src='" + this.labelInfo.barcodeLocation + "/barcode.ashx?Code=420" + urcZip + "&Type=128C&X=1.75&Y=0.5' alt='URC' />" + 
			"			</div>" + 
			"		</div>" + 
			"	</div>" + 
			"	<div class='row4'>" + 
			"		<div class='tracking-wrapper'>" + 
			"			<span>" + "UPS SUREPOST" + "</span>" + //this.labelInfo.shipMethodDesc.toUpperCase() + "</span><br/>" + 
			"			 <br/> TRACKING#: " + this.labelInfo.trackingFormatted + 
			"		</div>" + 
			"		<div class='icon'>";
			if(upssInfo.serviceIcon == "#")
				sOutputBuffer+=	"<img src='" + this.labelInfo.imgLocaton + "/shared/assets/upsServiceIcon.gif' alt='G' />";
			else
				sOutputBuffer+=	upssInfo.serviceIcon;
			sOutputBuffer +=
			"		</div>" +
			"	</div>" +
			"	<div class='row5' style ='height:1in; margin-top:0in; margin-bottom: 0in;'>" +
            "       <div class='track'>" +
			"		    <img src='" + this.labelInfo.barcodeLocation + "/barcode.ashx?Code=" + upssInfo.trackingNumber + "&Type=1Z&X=3.8&Y=1' style='height:.7in; margin-top:.15in; margin-bottom: .15in;'  alt='Tracking Barcode' />" +
			"	    </div>" +
            "   </div>" +
			"	<div class='row6' style ='margin-top:0in; margin-bottom: 0in;'>" +
            "       <div class='track'>" +
			"			<div class='carrier'>Carrier - Leave If No Response</div>"+
			"		<div class='deliver'>"+
			"			<b>USPS DELIVER TO:</b><br />"+ compressAddressParts(shipToCaps).join("<br/>") +
			"		</div>"+
			"		  <div class='box'>" +
			"			<div class='wrap'>"+
			"				<p class='indica'>" + surePostIndicia + "</p></div>" +
			"		  </div>" +
			"	    </div>" +
            "   </div>" +
			"	<div class='row7'>" +
			"		<div class='tracklabel'>USPS TRACKING # eVS</div>"+
            "       <div class='track'>" +
			"		    <img src='" + this.labelInfo.barcodeLocation + "/barcode.ashx?Zip=" + GetZipCode(this.labelInfo.shipTo)[0].substring(0,5)  + "&Track="+upssInfo.surePostTrackingNo+"&Construct=C02&Type=USPS&X=3.3&Y=1' alt='Tracking Barcode' />" +
			//"		<br/>" +
			"		<div style='width:100%; text-align:center;font-weight:bold;'>"+humanReadTrackingNo(upssInfo.surePostTrackingNo)+"</div>"+
			"	</div>" +
			" </div>" +
			" </div>"; // close inner upss div
			//"</div></div>"; //extra?

			document.write(sOutputBuffer);
			//console.log(sOutputBuffer);
		}
	}//USPSS

	this.printLabelPurolator = function(label){
			
			/*TODO:
				1- this.CheckMissingPurolator();
			*/

			this.loadDataPurolator();
			var puroInfo = this.labelInfo.purlData;
			
			var buffer = "";
			var header = "";
			
			if(label == 1){
				var postalCode;
				if(puroInfo.shipToZip.length == 6)
					postalCode = [puroInfo.shipToZip.substring(0,3), puroInfo.shipToZip.substring(3,6)];
				else
					postalCode = ["", ""];
				
				var trackNo;
				
				if(puroInfo.trackNo.length == 16)
				{
					trackNo = puroInfo.trackNo.match(/.{1,4}/g);
					trackNo = trackNo.join("&nbsp;&nbsp;&nbsp;");
				}	
				else
					trackNo = puroInfo.trackNo;
				
				var heavy = "HEAVY/LOURD";
				
				if(puroInfo.weight <= '50.04')
					heavy = "";
				
				buffer = String()
				+ '<div class="inner CAPost" >'
					+'<div class="row1">'
						+puroInfo.airportCode
						+puroInfo.labelHeader

						+'<div class="iconwrapper">' 
                        + ' <img src="' + this.labelInfo.imgLocaton + '/shared/assets/' + puroInfo.servIcon + '" /> '
                        +'</div>'
					+'</div>'
					+'<div class="row2">'
						+'<div class="left">'
							+'<span class="texth">CANADA POST/POSTES CANADA</span><br/>'
							+ '<span class="texti" ><b>From/De:</b><br/>' + addressFormatStr(puroInfo.returnAddress) + '</span>'
							+ '<span class="texti" stlye="margin-top:.2in;"><b>To/&#192;:</b><br/>' + addressFormatStr(puroInfo.displayShip).toUpperCase().replace(/[,]/, '').replace(/&NBSP;/gi, "&nbsp;") + '</span>'
						+'</div>'
						+'<div class="right">'
							+'<span class="texth">Payer/Factur&#233; &#224;:<br/>'+puroInfo.accountNo.replace(/^[0]+/g,"")+'</span>'
							+'<span class="texti">Method of Payment/<br/>Mode de paiment:<br/><b>Account/Compte</b></span>'
							+ '<span class="texti">Manifest required<br/>Manifest requis</span>'
						+'</div>'
					+'</div>'
					+'<div class="row3">'
						+'<div class="right">'
							+'<span > CPC Tracking Number/Num&#233;ro de rep&#232;rage de la SCP </span>'
							+'<div class="postal">'
								+'<div class="p1">'+postalCode[1]+'</div>'
								+'<div class="p2">'+postalCode[0]+'</div>'
								+'<div class="track">'+trackNo +'</div>'
							+'</div>'
							+'<div class="trkbarcode" >'
								+ '<img src="' + this.labelInfo.barcodeLocation + '/barcode.ashx?Code=' + puroInfo.barcodeNo + '&Type=128Auto&ml=15" />'
							+'</div>'
							+'<div class="verbiage" >'
								+ 'Sender warrants that this item does not contain dangerous goods.<br/> L\'expéditeur garantit que cet envoi ne contient pas de matières dangereuses'
							+'</div>'
						+'</div>'
						+'<div class="left">'
							+ '<div class="sigwrapl">'
								+'<div class="r1" style=""></div>'
								+'<div class="r2">Signature Required<br/>Signature requis</div>'	
							    +'<div class="r3">ATTENTION</div>'
							+'</div>'
							+'<div class="signwrapr" >'
								+'<div class="r1">&nbsp;</div>'
								+'<div class="r2">&nbsp;</div>'		
							+'</div>'
						+'</div>'
						+'<div class="bottom">'
								+'<div class="vin" style="">VIN/NIF '+puroInfo.vendorVIN+' </div>'
								+'<div class="vin2" style="">SPEC 3509 V14</div>'
								+'<div class="heavy">'+heavy+'</div>'	
						+'</div>'
					+'</div>'
				+'</div>'
			}
			else if(label == 2){
				var element = document.querySelectorAll(".landscapeLeft")[0];
				element.style.height= '11in'
				element.style.width='7.5in';
				
				buffer = String()
				+'<div class="shell" style="width: 7.5in; height:11in; font-size:8pt;">'
					+'<div class="purolator-head" style="width:7.5in; height:2in;">' //header
						+'<div class="purolator-head-left" style="width:54%; float:left; height:2in; border:1pt solid black;">'
							+'<span style="display: block; font-weight:bold; font-size:7pt; width:100%; height:.15in;">CANADA POST / POSTES CANADA</span>'
							+'<span style="display: block; font-size:8pt; width:100%; height:.15in; text-decoration: underline;"> Mailer/Exp. : 1234567 Behalf/Au nom de : 3130932 Payer/Facture a : 1234567</span>'
							+'<div style="width:100%; height:.7in;">'
								+'<div style="width:20%; float:left; font-weight: bold;">From/De : </div>'
								+'<div style="width:80%; float:left;">G Raymond <br/> Address / Addresses -2 <br/> 100 Alfred Kuehne Blvd Unit 108 <br/> Brampton ON L6T 4K4 </div>'
							+'</div>'
							+'<div style="width:100%; height:.15in; font-weight:bold;">Manifest not required / Manifest non requis</div>'
							+'<div style="width:100%; height:.5in; margin-top:.1in;">'
								+'<div style="width:49%; float:left;">Weight/Poids:<br/> 2KG(CU) </div>'
								+'<div style="width:49%; float:left;">Size/Dim.:<br/> aa X cc X cc cm</div>'
								+'<div style="width:100%; height:.15in; margin-top:.1in; float:left;">[fill]/Surd. </div>'
							+'</div>'
						+'</div>'
						+'<div class="purolator-head-right" style="width:45%; float:right; height:2in; border:1pt solid black;">'
							+'<div class="purolator-head-right-top" style="width:100%; height:.36in; border-bottom:2pt solid black;">'
								+'<div style="height:.35in; width:32%; float:left;">'
									+'<span style="display:block; width:100%; font-size:5pt;">Airport/Aeroport</span><span style="font-weight:bold; font-size:19pt;">YHZ</span>'
								+'</div>'
								+'<div style="height:.35in; width:32%; float:left; font-size:12pt; font-weight:bold;">PRIORITY <br/> PRIORITE</div>'
								+'<div style="height:.35in; width:32%; float:right; text-align:right;"><img src="/shared/assets/Purolator_P.png" style="height:.35in;"></div>'
							+'</div>'
							+'<div style="margin-top:.1in; width:100%; height:1in; border:1pt solid black;"><div style="width:70%; height:.5in; margin: 0 auto; border:1pt solid red; margin-top:.2in;">[PlaceHolder]</div></div>'
						+'</div>'
					+'</div>'
					+'<div class="purolator-body" style="width:7.5in; height:3.1in;">' //mid-section
						+'<div class="purolator-body-left" style="width:49%; float:left; height:1.9in; border:1pt solid black;"'
							+'<span style="display: block; font-size:7pt; width:100%; height:.15in;">Method of Payment/Mode de paiement : Account/Complete</span>'
							+'<span style="display: block; font-size:7pt; width:100%; height:.15in;">Authorization Number/ N d\'autorisation: 042999</span>'
							+'<span style="display: block; font-size:7pt; width:100%; height:.15in;">ORder No./N de commanded : 9012345</span>'
							+'<span style="display: block; font-size:7pt; width:100%; height:.15in; margin-top:.2in; color:#C6C6C6;">Ref/Ref. 1: ABSDFKASDJFHASDFKHADSKFASDF</span>'
							+'<span style="display: block; font-size:7pt; width:100%; height:.15in; color:#C6C6C6;">Ref/Ref. 2: ABSDFKASDJFHASDFKHADSKFASDF</span>'
							+'<div style="width:100%;">'
								+'<span style="display: block; font-size:8pt; float:left; width:40%; height:.9in; margin-top:.1in; text-align: left;">'
									+'<b> To/A:</b><br/> M BLUE <br/>  ENGINEERING DEPT <br/> CAMP HILL HOSPITAL <br/><span style="color:#C6C6C6;">ADDRESS/ADRESSES - 2</span><br/> 1763 ROBIE ST<br/>HALIFAX NS B3H 3Q2'
								+'</span>'
								+'<span style="display: block; font-size:7pt; float:right; width:40%; height:.15in; margin-top:.1in; text-align: right;">Tel/Tel. : 555-555-1212</span>'
							+'</div>'
						+'</div>'
						+'<div class="purolator-body-right" style="width:49%; float:right; height:1.8in; margin:0 auto; border:5pt dashed black;">'
							+'<span style="width:100%; line-height:1; text-align:center; display:block;"> CPC Tracking Number/Numero de reperage de la SCP </span>'
							+'<div style="width:90%; height:.4in; margin:0 auto;">'
								+'<div style="width:15%; height:.17in; text-align:right; font-weight:bold; font-size:15pt;float:right; margin-top:.19in;">3G2</div>'
								+'<div style="width:30%; height:.4in; text-align:center; font-weight:bold; font-size:27pt; float:right;">B3H</div>'
								+'<div style="width:40%; height:.17in; text-align:center; margin-left: .2in;float:left; font-weight:bold; font-size:8pt; margin-top:.23in;">1234 &nbsp 5678 &nbsp 9012 &nbsp 3452</div>'
							+'</div>'
							+'<div style="width:95%; height:1in; margin:0 auto;">'
								+'<img src="http://www.barcodesinc.com/generator/image.php?code=12345&style=69&type=C128B&width=115&height=50&xres=1&font=3" style="width:100%; height:1in;"/>'
							+'</div>'
							+'<div style="width:95%; text-align:center; font-size:6.5pt; margin: 0 auto;">'
								+'Sender warrants that this item does not contain dangerous goods.<br/> L\'expediteur garrantit que cet acrticle ne contient pas de materielle dangereuse'
							+'</div>'
						+'</div>'
						+'<div style="width:100%; height:.8in; float:left;">'
							+'<div style="width:60%; height:.4in; float:left; font-size:7pt; font-weight:bold; padding-top:.1in;">In case of non-delivery, return at sender\'s expense at counter rates <br/> En case the non-livraison, renvoyer aux frais de l\'expediteur aux tarifs du comptoir</div>'
							+'<div style="width:40%; float:right; margin-top:.05in;">'
								+'<div style="float:left; font-size:19pt; font-weight:bold; width:50%; height:.22in;">ATTENTION</div>'
								+'<div style="height:.3in; width:.3in; border:5pt solid black; font-size:20pt; font-weight:bold; text-align:center; float:right;">X</div>'
								+'<div style="float:right; font-size:6.5pt; font-weight:bold; width:30%; height:.2in;">Signature Required<br/>Signature requise</div>'						
							+'</div>'
							+'<div style="width:100%; height:.3in; float:right; font-size:6.5pt;">'
								+'<div style="width:24%; float:right; height:.3in;">PREUVE D\'AGE OBLIGATOIRE (19 ANS)/<br/> ACCNOUNCER PAR CARTE/<br/>NE PAS LAISSER EN LIEU SUR/</div>'
								+'<div style="width:24%; float:right; height:.3in;">PROOF OF AGE REQUIRED (19 YEARS)/<br/> CARD FOR PICK UP/<br/>DO NOT SAFE DROP/</div>'
							+'</div>'
						+'</div>'
						+'<div style="width:100%; float:left;">'
								+'<div style="width:49%; float:left; font-weight:bold; font-size:7pt;">VIN/NIF 000 &nbsp&nbsp&nbsp&nbsp SPEC 3509 VXX</div>'
								+'<div style="width:49%; float:right; text-align:right; padding-right:.1in; font-size:10pt; font-weight:bold;">HEAVY/LOURD</div>'
								+'<div style="width:100%; border:1pt solid re	d;height:.2in; margin-top:.2in;">------------------------------&#x2702;--CUT HERE/DECOUPER--&#x2702;---------------------------------------------------&#x2702;--CUT HERE/DECOUPER--&#x2702;--------</div>'
						+'</div>'
					+'</div>'
					+'<div class="purolator-bottom" style="width:7.5in; height:4in;border:1pt solid green; margin-top:.1in;">' //bottom
						+'<div style="width:50%; height:3.5in; float:left; border:1pt solid green;">'
							+'<span style="width:100%; height:.15in; border:1pt solid blue;text-align:left; font-size:12pt; font-weight:bold;">Instructions</span>'
							+'<ol>'
								+'<li>Choose a box designed for shipping.</li>'
								+'<li>Wrap your items so that they are secure int he box and seal the box using proper shipping tape</li>'
								+'<li>Cut the label on the dotted line and retain the bottom half for tracking purposes.</li>'
								+'<li>Tape the label so it appears</li>'
								+'<li></li>'
								+'<li></li>'
								+'<li></li>'
								+'<li></li>'
								+'<li></li>'
								+'<li></li>'
								+'<li></li>'
								+'<li></li>'
								+'<li></li>'
							+'</ol>'
						+'</div>'
						+'<div style="width:50%; height:3.5in; float:left; border:1pt solid green;">'
						
						+'</div>'
					+'</div>'
				+'</div>';
			}
			

		document.write(buffer);
	}
}//end of all label definition


	

function CarrierLabel(labelInfoIn){
	this.labelInfo = labelInfoIn;

	this.orientation = labelInfoIn.orientation || "P";

	this.selectLabelType = selectLabelType;

	var self = this;
	function selectLabelType(){
		var outerclass;
		
		var isSurePost = (self.labelInfo.carrier == "UPSN" && self.labelInfo.carrierSM == "SUREPOST");

		if (self.labelInfo.orientation == "P"){
			outerclass = "portrait";
		}else if(self.labelInfo.orientation == "L"){
			if(isSurePost)
				outerclass = "landscapeLeftSurepost";
			else
			outerclass = "landscapeLeft";
		}else if(self.labelInfo.orientation == "R"){
			if(isSurePost)
				outerclass = "landscapeRightSurepost";
		else
				outerclass = "landscapeRight";
		}else
			outerclass = "portrait";

		document.write("<div class='" + outerclass + "'>");
			

			if(self.labelInfo.carrier == "FDXN"){
				self.printLabelFedex();
			}else if(self.labelInfo.carrier == "UPSN" && !isSurePost){
				self.printLabelUPS();
			}else if(self.labelInfo.carrier == "USPS"){
				self.printLabelUSPS();
			}
			else if(self.labelInfo.carrier == "UPSN" && isSurePost){
				
				if(self.labelInfo.upssData.trackingNumber.indexOf("YW") >-1 
				|| self.labelInfo.upssData.trackingNumber.indexOf("YN")>-1){
					//USPS SurePost
					self.printLabelUSPSS();
				}
				else if(self.labelInfo.upssData.trackingNumber.indexOf("YT") >-1 
				|| self.labelInfo.upssData.trackingNumber.indexOf("YH")>-1){
					//UPS Surepost
					self.printLabelUPSS();
				}
				else{
					console.warn("Tracking Number does not contain any of these values: YW, YT,YH, YN"+ "-- TrackingNo ["+self.labelInfo.upssData.trackingNumber+"]");
				}
			}

			else if(self.labelInfo.carrier == "PURL"){
				self.printLabelPurolator(1);
			}
		document.write("</div>");
	}//select label type

}//carrierLabel

CarrierLabel.prototype = new allLabelDefinitions();
