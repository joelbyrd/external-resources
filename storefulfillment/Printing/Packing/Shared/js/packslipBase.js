//fix to console.log for ie8<
if(!window.console)  window.console = function(){};
if (!window.console) window.console = {};
if (!window.console.log) console.log = function () { };

//fix to !Array.indexof for ie8<
if (!Array.prototype.indexOf){
  Array.prototype.indexOf = function(elt /*, from*/)  {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++) {
      if (from in this && this[from] === elt)
        return from;
    }
    return -1;
  };
}

//trim function
String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}

String.prototype.ljust = function(num){
	var defaultPad = " ";
	//nothing was passed, return string
	if ('undefined' === typeof num){
		return this;
	}
	if (arguments.length == 2){
		defaultPad = arguments[1];
	}
	var out = this;
	while( out.length < num){
		out = out + defaultPad;
	}
	
	return out;
}

String.prototype.rjust = function(num){
	var defaultPad = " ";
	//nothing was passed, return string
	if ('undefined' === typeof num){
		return this;
	}
	if (arguments.length == 2){
		defaultPad = arguments[1];
	}
	var out = this;
	while( out.length < num){
		out = defaultPad + out;
	}
	
	return out;
}

String.prototype.takeR = function(num){
	if ('undefined' === typeof num){
		return this;
	}
	return this.substr(this.length-num,this.length);
}



/**
 * Calculates the Mod36 Check Digit for a given string; Originally this method was named
 * mod36() but has been changed in order to avoid conflicts for clients with this 
 * functionality already in their custom packing slip library
 *
 * @param {string} val - string base for mod36 check digit
 * @returns {string} - The Mod36 Check Digit, or "ERR" upon error
 */
function calculateMod36(val) {

	if (!(val && typeof val === "string")) return "ERR";

	var grid =  [["0", "1", "2", "3"],
				 ["4", "5", "6", "7"],
				 ["8", "9", "A", "B"],
				 ["C", "D", "E", "F"],
				 ["G", "H", "I", "J"],
				 ["K", "L", "M", "N"],
				 ["O", "P", "Q", "R"],
				 ["S", "T", "U", "V"],
				 ["W", "X", "Y", "Z"]];
	
    var Sprime = "", Sdblprime = "", thisdigit;
	
    for (var i = 0; i < val.length; ++i) {
        thisdigit = getCoord36(val.charAt(i));
        Sprime = Sprime + thisdigit.substring(0, 1);
        Sdblprime = Sdblprime + thisdigit.substring(1);
    }
    var Cprime = getCprime(Sprime); //getting correct value up until 21, need to account for the 0mod9 logic

    var Cdblprime = getCdblprime(Sdblprime); //tested, returning correct Cdblprime value, should yield 0

    return grid[Cprime][Cdblprime];

    //private functions to calculate mod 36 check digit
    function getCdblprime(value) {
		
		var addgrid = [[0, 1, 2, 3],
					   [1, 0, 3, 2],
					   [2, 3, 0, 1],
					   [3, 2, 1, 0]];
		
		var multgrid = [[0, 0, 0, 0],
			            [0, 1, 2, 3],
			            [0, 2, 3, 1],
						[0, 3, 1, 2]];
        
		var i, total = 0,
			addstring = "c'': ",
			resstr = "res: ",
			numbersToAdd = [];
			
        for (i = 0; i < value.length; ++i) {
            if (((value.length + 1) - i) % 2 === 0) {
                addstring += "(" + value.charAt(i) + "*1)+";
                numbersToAdd.push(cdpo("M", parseInt(value.charAt(i)), 2));
            }
            else {
                addstring += "(" + value.charAt(i) + "*2)+";
                numbersToAdd.push(cdpo("M", parseInt(value.charAt(i)), 1));
            }
        }//for each number in S''
 
		var numbersToAddNew;
        while (numbersToAdd.length > 1) {
            addstring = "c'' ";
            numbersToAddNew = [];
            for (i = 0; i < numbersToAdd.length; i += 2) {
                if (i + 2 <= numbersToAdd.length) {
                    addstring += "(" + numbersToAdd[i] + "+" + numbersToAdd[i + 1] + ")+";
                    numbersToAddNew.push(cdpo("A", numbersToAdd[i], numbersToAdd[i + 1]));
                } else {
                    addstring += numbersToAdd[i].toString();
                    numbersToAddNew.push(numbersToAdd[i]);
                }
            }//for each numberstoAdd
            numbersToAdd = numbersToAddNew;
    
        }//while still numbers to add

        return numbersToAdd[0]; //should be base c''

        /**
         * Returns a character from the appropriate grid, based on the operator
         * 
         * @param {String|char} oin - Operator to use 
         * @param {Number} int1 - Index 1
         * @param {Number} int2 - Index 2
         * @returns {Number}
         */
        function cdpo(oin, int1, int2) { //C double prime operand function
            if (oin === "A") //a for "use addition"
                return addgrid[int1][int2];
            else
                return multgrid[int1][int2];
        }//private function for c double prime operand
    }//get double prime c

    /**
     * Calculates C Prime of specified value
     * 
     * @param {String} value - Value 
     * @returns {Number} - CPrime Number calculated from Value
     */
    function getCprime(value) {
        var total = 0, thisint, i;

        for (i = 0; i < value.length; ++i) {
            thisint = parseInt(value.charAt(i));
            if (((value.length + 1) - i) % 2 === 0)
                total += thisint * 2;
            else
                total += thisint;
        }//for each number
        total = (9 - (total % 9)) % 9;
        return total;
    } //getCprime



    /**
     * Gets Coordinate in the main grids for the specified character
     * 
     * @param {String|char} value - character to calculate coordinate of
     * @returns {String} - Two digit string encapsulation of coordinates
     */
    function getCoord36(value) { //working
        var flag = false, r, c;
        for (r = 0; r <= 8; ++r) {
            for (c = 0; c <= 3; ++c) {
                if (grid[r][c] === value.toUpperCase()) {
                    flag = true;
                    return r.toString() + c.toString();
                }
            }//for each colum
        }//for each row
        if (!flag)
            return "00";
    }//func
}//mod 36


//replaces all html encoded BR tags with actual BRs
function swapBR(textIn){
	textIn = textIn.replace(/&lt;br\/?&gt;/gi, "<br/>");
	return textIn;
}

//returns bool if the arrays passed in don't match, used for determining if orders are gifts
function isGift(ShipToArrayIn, BillToArrayIn){
	shipToString = ShipToArrayIn.join();
	billToString = BillToArrayIn.join();
	//console.log("bts: " + billToString + "; sts:" + shipToString)

	if(billToString.toLowerCase() != shipToString.toLowerCase()){
		return true;
	}
	else{
		return false;
	}
}

function pageBreak(boolIn){
	if (boolIn){
		document.write("<div style='page-break-before:always;height:1px;font-size:2pt;'> &nbsp;</div>");
	}
}

/* address functions */

/* compresses all non white space elemnets of an array into a new array */
function compressAddressParts(arrayIn) {
    var arrOut = [];

    for (var i = 0; i < arrayIn.length; i++) {
        if (arrayIn[i].search(/\S/) != "-1") { arrOut.push(arrayIn[i]); }
    }//for
    
    return arrOut;
}

function addressFormatStr(arrayIn){
	var breaker = "";
	var prebreaker = "";
	var strOut = "";

	if(arguments.length >= 2){
		breaker = arguments[1];
	}else
	    breaker = "<br/>";

	if(arguments.length >= 3){
		prebreaker = arguments[2];
	}

	newArr = compressAddressParts(arrayIn);

	for (var i = 0; i < newArr.length; ++i) {
	    strOut += prebreaker + newArr[i] + breaker;
	}
    
	return strOut;
}//addressFormat

addressFormat = function (arrayIn){
	var breaker = "";
	var prebreaker = "";

	if(arguments.length >= 2){
		breaker = arguments[1];
	}else
	    breaker = "<br/>";

	if(arguments.length >= 3){
		prebreaker = arguments[2];
	}

	document.write(addressFormatStr(arrayIn, breaker, prebreaker));
        
}//addressFormat

function environment(locationIn){
	//futureuse to prototype image and barcode

}

function barcode(locIn, optionsObjIn){

	var displaydomain="";
	var displaypath = "";
	var displayproto = "";
	var displaystyles = "";
	if ('undefined' === typeof optionsObjIn.styles)
		displaystyles = "";
	else
		displaystyles = optionsObjIn.styles.join(";");
	//var displaystyles = (typeof optionsObjIn.styles === 'undefined') ? "" : optionsObjIn.styles.join(";");

	//console.log("sty:" + (typeof optionsObjIn.styles));

	if (locIn.host.toLowerCase().indexOf("impdev") != -1) {
		displaydomain = "C:/Development/ImpDev/Clients";
		displayproto = "file:";
	}else{
		displayproto = locIn.protocol;
		displaydomain = locIn.host;
	}


	var src = " src='" + displayproto + "//" + displaydomain + "/images/barcode.ashx?Code="+(optionsObjIn.code || "" )+
		"&Type="+(optionsObjIn.type || "128Auto" ) + "&X=2.1&Y=0.5" + (optionsObjIn.rotate ? "&rotate=" + optionsObjIn.rotate : "" ) +
		"&round=" + (optionsObjIn.round || "1") + "'";
	var style = " style='" + displaystyles + "'";
	var hideIfBroken = " onerror='this.style.visibility=\"hidden\";'";
	var cssClass = " class='" + (optionsObjIn.cssClass || "") + "'";
	var alt = " alt='" + (optionsObjIn.alt || "") + "'";

	imgcontents = "<img " + cssClass + src + style + hideIfBroken + alt + "/>";
	//console.log("barcode written: " + imgcontents);

	document.write(imgcontents);
    
}

function image(locIn, optionsObjIn){
   
	var displaydomain="";
	var displaypath = "";
	var displayproto = "";
	var displaystyles = "";
	if ('undefined' === typeof optionsObjIn.styles)
		displaystyles = "";
	else
		displaystyles = optionsObjIn.styles.join(";");
	//var displaystyles = (typeof optionsObjIn.styles === 'undefined') ? "" : optionsObjIn.styles.join(";");

	//console.log("sty:" + (typeof optionsObjIn.styles));

	if (locIn.host.toLowerCase().indexOf("impdev") != -1) {
		displaydomain = "C:/Development/ImpDev/Clients";
		displayproto = "file:";
		displaypath = locIn.href.split("/")[7] + "/assets";
	}else{
		displayproto = locIn.protocol;
		displaydomain = locIn.host;
		displaypath = (optionsObjIn.path || "printing/packing/assets");
	}


	var src = " src='" + displayproto + "//" + displaydomain + "/" + displaypath + "/" + (optionsObjIn.name || "" ) +  (optionsObjIn.ext || ".jpg") + "'";
	var style = " style='" + displaystyles + "'";
	var hideIfBroken = " onerror='this.style.visibility=\"hidden\";'";
	var cssClass = " class='" + (optionsObjIn.cssClass || "") + "'";
	var alt = " alt='" + (optionsObjIn.alt || "") + "'";

	imgcontents = "<img " + cssClass + src + style + hideIfBroken + alt + "/>";
	//console.log("img written: " + imgcontents);

	document.write(imgcontents);

}

function checkPrintDialog(){//Use for body onload function. Opens print dialog only when file is not opened locally or via VNSupport.
		var location = window.location.href;//Get the url.
		location = location.toLowerCase();//make all characters in url lowercase.
		if(location.indexOf("file:///") == -1 && location.indexOf("vnsupport") == -1)//If it is not a local file (file:///) and not in vnsupport, open print dialog box.
			window.print();
	}

//Decodes encoded html string 
function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    if (txt.value.indexOf("&#") > -1)
        return decodeHtml(txt.value); //&amp;#39; gets fully decoded in the second call
    else
        return txt.value;
}