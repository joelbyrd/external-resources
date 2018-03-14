// define a document-wide options object
Radial = {
	Debug: false,
	Print: true,
	Startup: { Methods: [] },
	AddStartupMethod: function (name, callBack/*, args*/) {
		var args = [].slice.call(arguments, 2)
		Radial.Startup.Methods.push({ Func: callBack, Name: name, Args: args });
	}
};

/* registers a call back to be called when the document has finished loading;
* this works for modern and old browsers by checking the window.addEventListener
* property for existance and calling the correct methods
*/
Radial.OnStartup = function () {

	var methods = Radial.Startup.Methods;

	for (var i = 0; i < methods.length; ++i) {
		var startup = methods[i];
		try {
			startup.Func.apply(null, startup.Args);
		} catch (e) {
			console.log("Could not execute Startup Method: " + startup.Name + ": " + e);
		}
	}

	if (Radial.Print)
		window.print();

};

// defines a 1x1 White Image; use as img.setAttribute("src", Radial.WhiteImageDataUri) or
// if constructing img tag manually: var i = "<img src='" + Radial.WhiteImageDataUri + "' >";
// or in an images onerror:  <img src="..." onerror="this.src=Radial.WhiteImageDataUri;" >
Object.defineProperty(Radial, "WhiteImageDataUri", {
        value: "data:image/gif;base64,R0lGODlhAQABAIAAAP7//wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
        enumerable: true,
        configurable: false,
        writable: false
});

// defines a 1x1 Transparent Image; see above
Object.defineProperty(Radial, "TransparentImageDataUri", {
    value: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
    enumerable: true,
    configurable: false,
    writable: false
});


// trim spaces and NBSP's
String.prototype.trim = function () { return this.replace(/^(\s|&nbsp;)+|(\s|&nbsp;)+$/g, ""); };

// replace ALL occurrences of a string, rather than just the first
String.prototype.replaceAll = function (str1, str2, ignore) {
	return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
};

Date.prototype.NoFormat = function () {
	return this.getFullYear().toString() +
		(this.getMonth() + 1).toString().padStart(2,"0") +
		this.getDay().toString().padStart(2,"0") +
		this.getHours().toString().padStart(2,"0") +
		this.getMinutes().toString().padStart(2,"0") +
		this.getSeconds().toString().padStart(2,"0");
}

// trims spaces, NBSPs and anything deemed "whitespace"
String.prototype.trimAll = function (nbspOnBlank) {
	var temp = this.replace(/^([\s\uFEFF\xA0]|&nbsp;)+|([\s\uFEFF\xA0]|&nbsp;)+$/g, "");
	if (nbspOnBlank && !temp) return "&nbsp;";
	return temp;
}

// trims spaces, NBSP and anything deemed "whtiespace" and STRIPS out anything that still remains in a VendorNet print tag
String.prototype.trimAndStrip = function (nbspOnBlank) {
	var temp = this.replace(/^(&nbsp;|[\s\uFEFF\xA0])+|([\s\uFEFF\xA0]|&nbsp;)+$|«[^»«]*»/g, "");
	if (nbspOnBlank && !temp) return "&nbsp;";
	return temp;
}

String.prototype.toMoney = function () {
	var len = arguments[0] || 2;						 // regex here removes anything preceding the first digit "$ 1.00" removes "$ "
	var val = parseFloatIgnoreCommas(0 + this.replace(/^\D+((?=\d*\.?\d{0,2})?)/g, "$1"));
	val = val.toFixed(len);						  // to 2 decimal places
	val = val.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // add back in the commas every 3 digits
	return (arguments[1] || "$") + val;
};


Number.prototype.toMoney = function() {
	var len = arguments[0] || 2;
	var val = this.toFixed(len);
	val = val.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // add back in the commas every 3 digits
	return (arguments[1] || "$") + val;
}

Function.prototype.fixMulti = function () {
	return this.toString().match(/[^]*\/\*([^]*)\*\/\s*\}$/)[1].trim();
}

// strips commas (,) and returns float
function parseFloatIgnoreCommas(number) {
	if (typeof number === "string") {
		var numberNoCommas = number.replace(/,/g, '');
		return parseFloat(numberNoCommas);
	} else if (typeof number === "number") {
		return parseFloat(number);
	}
	return 0;
}

// strips commas (,) and dollar sign ($) and returns float
function parseFloatIgnoreCommaDollars(number) {
	var tmpNumber = "";
	
	tmpNumber = number || "";
	tmpNumber = tmpNumber.trimAndStrip() || "0";
	
	if (typeof tmpNumber === "string") {
		var numberNoCommas = tmpNumber.replace(/[$,]/g, '');
		return parseFloat(numberNoCommas);
	} else if (typeof tmpNumber === "number") {
		return parseFloat(tmpNumber);
	}
	return 0;
}

function addPageBreaks(selector, before, breakClass) {

	before = !!before;

	var elements = document.querySelectorAll(selector || ".wrapper");
  var visible = [].filter.call(elements, Element.IsVisible);


	var start = 0, end = visible.length - 1;
	if (before) {
		start++;
		breakClass = breakClass || "pagebreakbefore";
	}
	else {
		end--;
		breakClass = breakClass || "pagebreakafter";
	}

	for (var i = start; i <= end; ++i) { // don't add to the _last_ one
		var thisEl = visible[i];
		thisEl.classList.add(breakClass);	// classList requires polyfill.io for old browser support
	}

}

// takes a given template, replaces all .col classes with &nbsp;, then repeats that result (builds blank lines) based on numBlankLines
function renderBlank(templateEl,numBlankLines) { /* don't populate an element, return the data back */
	//console.log("rendering " + numBlankLines + " blank line(s)");
	if (typeof templateEl === "string")
		templateEl = document.querySelectorAll(templateEl);

	// create a copy of the node so the div contents can be replaced with &nbsp; without modifying the template
	var templateCopy = templateEl.cloneNode(true);
	templateCopy.removeAttribute("id")
	
	// replace all column (class="col") contents with &nbsp;
	var cols = templateCopy.querySelectorAll(".col");
	for (var i = 0; i < cols.length; i++) { cols[i].innerHTML = "&nbsp;"; }

	// use the new blank template to build as many lines as needed
	var template = "";
	for (var i = 0; i < numBlankLines; i++) { template += templateCopy.innerHTML; }

	return template;
} //renderBlank



// apply first page only chrome fix bug to the project
// we could do this with CSS using first-child, last-child etc, but then we have to be careful
// about how we place the divs into the document. Ex, if any divs came before the first wrapper (like the template
// div, we'd have to change the css to be nth-child(2); this seems more efficient than constantly updating that stuff
function addChromeFix(selector, chromeFix) {
	var element = selector || ".wrapper";
	if (typeof element === "string"){
		// find first VISIBLE element
		var els = document.querySelectorAll(element);
    element = [].filter.call(els, Element.IsVisible)[0];
	}

	if (element) {
		element.classList.add(chromeFix || "chromefix");
	}
}

function redirectDocumentWrite(funcToCall /*, args*/) {
	// save the existing document.write function
	var save = document.write, buffer = "";
	try {
		// create a new one, that instead of writing to the page,
		// puts all the text in our buffer
		document.write = function(s) {
			buffer += s;
		};

		// execute the function that should have been called, passing it whatever arguments
		// we passed into _this_ function, minus the first argument (which is the function itself)
		funcToCall.apply(null, [].slice.call(arguments, 1));

		// return the text that would've been document.write'd
		return buffer;
	} catch (e) {
		console.log("Error capturing document manipulation: " + e);
	} finally {
		//set it back to the original function
		document.write = save;
	}
}

(function() {
	if (window.addEventListener)
		window.addEventListener("load", Radial.OnStartup);
	else
		window.attachEvent("onload", Radial.OnStartup);

	Radial.AddStartupMethod("ChromeFix", addChromeFix);
})();

function addStyle(siteURL,relLink) {
		var styleElement = document.createElement("link");
		styleElement.rel = "stylesheet";
		styleElement.type = "text/css"
		styleElement.charset = "utf-8";
		styleElement.href = siteURL + relLink;
		
		document.getElementsByTagName('head')[0].appendChild(styleElement);
}

function addJs(siteURL,relLink) {
		var jsElement = document.createElement("script");
		jsElement.type = 'text/javascript';
		jsElement.charset = "utf-8";
		jsElement.src = siteURL + relLink;
		
		console.log("adding link for " + siteURL + relLink);
		
		document.getElementsByTagName('head')[0].appendChild(jsElement);
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// support for classList.add(...list), classList.remove(...list) and classList.toggle(val, force) for IE.  
// Not required in IE11 on Windows 10 Machines only (not fixed in other IE11 versions)
// without polyfill, only supports classList.add(val), classList.remove(val) and classList.toggle(val)
// PolyFill.IO does not support IE10/IE11 for class list (but oddly does for 8 and 9)
(function () {

    if (typeof (window.DOMTokenList) === 'undefined')
        return;

    var originalRemove = DOMTokenList.prototype.remove,
        originalAdd = DOMTokenList.prototype.add,
        originalToggle = DOMTokenList.prototype.toggle;

    DOMTokenList.prototype.remove = function () {
        var that = this;
        [].slice.call(arguments).forEach(function (x) {
            originalRemove.call(that, x);
        });
    };

    DOMTokenList.prototype.add = function () {
        var that = this;
        [].slice.call(arguments).forEach(function (x) {
            originalAdd.call(that, x);
        });
    }

    DOMTokenList.prototype.toggle = (function () {
        var el = document.createElement("div");
        el.classList.add("t");
        var retAdd = el.classList.toggle("t", true),
            retRem = el.classList.toggle("o", false);

        var required = retAdd !== true ||
            retRem !== false ||
            !el.classList.contains("t") ||
            el.classList.contains("o");

        return !required ? originalToggle : function (val, force) {

            // toggle accepts a single class an optional force 
            // only call the original prototypes since we know we don't have
            // multiples
            if (force === true) {
                originalAdd.call(this, val);
            } else if (force === false) {
                originalRemove.call(this, val);
            } else {
                return originalToggle.call(this, val);
            }
            return this.contains(val);
        }
    })();
})();

// for ExportData
// highlight all text when the user clicks on it for eacy copy / paste
function selectText(id) {
	var sel, range;
	var el = document.getElementById(id); //get element id
	if (window.getSelection && document.createRange) { //Browser compatibility
		sel = window.getSelection();
		if (sel.toString() == '') { //no text selection
			window.setTimeout(function () {
				range = document.createRange(); //range object
				range.selectNodeContents(el); //sets Range
				sel.removeAllRanges(); //remove all ranges from selection
				sel.addRange(range);//add Range to a Selection.
			}, 1);
		}
	} else if (document.selection) { //older ie
		sel = document.selection.createRange();
		if (sel.text == '') { //no text selection
			range = document.body.createTextRange();//Creates TextRange object
			range.moveToElementText(el);//sets Range
			range.select(); //make selection.
		}
	}
}

Object.defineProperty(Array.prototype, 'chunk', {
    value: function (chunkSize) {
        var R = [];
        for (var i = 0; i < this.length; i += chunkSize)
            R.push(this.slice(i, i + chunkSize));
        return R;
    }
});

Object.defineProperty(Element, "IsVisible", { value: function (t) { return !!t.offsetParent } });
Object.defineProperty(Element.prototype, "Visible", { get: function () { return Element.IsVisible(this); } });

function isValidBase64(str) {
    try {
        str = window.atob(str)
        return true;
    } catch (ee) {
        return false;
    }
}

function createImage(src, opts) {

    opts = opts || {};

    var imgSrc = Radial.WhiteImageDataUri;
    if (typeof src === "string")
        imgSrc = src;
    else if (typeof src === "object") {
        if (src.url )
            imgSrc = src.url;
        else if (src.data)
            imgSrc = "data:image/png; base64," + src.data
    }

    var image = document.createElement('img');

    var onError = function () {
        image.src = Radial.WhiteImageDataUri;
        if (opts.onError && typeof opts.onError === "function") opts.onError.call(image);
    };
    if (image.addEventListener)
        image.addEventListener("error", onError);
    else
        image.attachEvent("onerror", onError);

    image.src = imgSrc; 

    if (opts.width) {
        if (typeof opts.width === "string" && !isNumeric(opts.width))
            image.style.width = opts.width;
        else if (typeof opts.width === "number" || isNumeric(opts.width))
            image.style.width = opts.width + "in";
    }

    if (opts.height) {
        if (typeof opts.height === "string" && !isNumeric(opts.height))
            image.style.height = opts.height;
        else if (typeof opts.height === "number" || isNumeric(opts.height))
            image.style.height = opts.height + "in";
    }

    if (opts.classes) {
        var classes = opts.classes.split(" ").filter(function(c) { return !!c; });
        classes.forEach(function(c) { image.classList.add(c); });
    }

    return image;
}