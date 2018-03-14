var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

if (!String.prototype.encodeHTML) {
    String.prototype.encodeHTML = function () {
        return this.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    };
}

function toXml(fieldName, fieldValue) {
    var attribs = "";
    if (arguments.length == 3) {
        var attribObj = arguments[2];
        for (var key in attribObj) {
            if (attribObj.hasOwnProperty(key)) {
                attribs += (" " + key + "=\"" + attribObj[key] + "\"");
            }
        }
    }
    return (fieldValue == undefined) ? '<' + fieldName + ' />' : '<' + fieldName + attribs + '>' + fieldValue.encodeHTML() + '</' + fieldName + '>';
}


var ReferenceField = (function () {
    function ReferenceField(Code, Value) {
        this.Code = Code;
        this.Value = Value;
    }
    ReferenceField.prototype.toXml = function () {
        var xml = '';
        xml += '<ReferenceField Code="' + this.Code + '">';
        xml += '<Value>' + this.Value.encodeHTML() + '</Value>';
        xml += '</ReferenceField>';
        return xml;
    };
    return ReferenceField;
})();

var EntityAddress = (function () {
    function EntityAddress(AddressLine, City, StateProvinceCode, PostalCode, CountryCode) {
        this.AddressLine = AddressLine;
        this.City = City;
        this.StateProvinceCode = StateProvinceCode;
        this.PostalCode = PostalCode;
        this.CountryCode = CountryCode;
    }
    EntityAddress.prototype.toXml = function () {
        var xml = '';
        xml += '<Address>';
        for (var addcnt = 0; addcnt < this.AddressLine.length; ++addcnt) {
            if (this.AddressLine[addcnt].search(/\S/) != "-1" && this.AddressLine[addcnt].indexOf('»') <= 0) {
                if (this.AddressLine[addcnt].length > 35) {
                    xml += toXml('AddressLine', this.AddressLine[addcnt].substring(0, 34));
                    xml += toXml('AddressLine', this.AddressLine[addcnt].substr(34));
                } else {
                    xml += toXml('AddressLine', this.AddressLine[addcnt]);
                }
            }//if address exists
        }// for each address
        xml += toXml('City', this.City);
        xml += toXml('StateProvinceCode', this.StateProvinceCode);
        xml += toXml('PostalCode', this.PostalCode);
        xml += toXml('CountryCode', this.CountryCode);
        xml += '</Address>';
        return xml;
    };
    return EntityAddress;
})();

var Weight = (function () {
    function Weight(UnitOfMeasurement, Weight) {
        this.UnitOfMeasurement = UnitOfMeasurement;
        this.Weight = Weight;
    }
    Weight.prototype.toXml = function (name) {
        var tag = (name == undefined) ? 'Weight' : name;
        var xml = '';
        xml += '<' + tag + '>';
        xml += toXml('UnitOfMeasurement', this.UnitOfMeasurement);
        xml += toXml('Weight', this.Weight);
        xml += '</' + tag + '>';
        return xml;
    };
    return Weight;
})();

var Dimension = (function () {
    function Dimension(UnitOfMeasurement, Length, Width, Height) {
        this.UnitOfMeasurement = UnitOfMeasurement;
        this.Length = Length;
        this.Width = Width;
        this.Height = Height;
    }
    Dimension.prototype.toXml = function (name) {
        var tag = (name == undefined) ? 'Dimension' : name;
        var xml = '';
        xml += '<' + tag + '>';
        xml += toXml('UnitOfMeasurement', this.UnitOfMeasurement);
        xml += toXml('Length', this.Length);
        xml += toXml('Width', this.Width);
        xml += toXml('Height', this.Height);
        xml += '</' + tag + '>';
        return xml;
    };
    return Dimension;
})();

var Entity = (function () {
    function Entity(Name, Phone, Address) {
        this.Name = Name;
        this.Phone = Phone;
        this.Address = Address;
    }
    Entity.prototype.toXml = function (name) {
        var xml = '';
        xml += '<' + name + '>';
        xml += toXml('Name', this.Name);
        xml += toXml('Phone', this.Phone);
        xml += (this.Address == undefined) ? '<Address />' : this.Address.toXml();

        xml += '</' + name + '>';

        return xml;
    };
    return Entity;
})();

var EntityWithEmail = (function (_super) {
    __extends(EntityWithEmail, _super);
    function EntityWithEmail(Name, Phone, Address, EmailAddress) {
        _super.call(this, Name, Phone, Address);
        this.Name = Name;
        this.Phone = Phone;
        this.Address = Address;
        this.EmailAddress = EmailAddress;
    }
    EntityWithEmail.prototype.toXml = function (name) {
        var xml = '';
        xml += '<' + name + '>';
        xml += toXml('Name', this.Name);
        xml += toXml('Phone', this.Phone);
        xml += (this.Address == undefined) ? '<Address />' : this.Address.toXml();
        xml += toXml('EmailAddress', this.EmailAddress);
        xml += '</' + name + '>';

        return xml;
    };
    return EntityWithEmail;
})(Entity);

var LineItem = (function () {
    function LineItem(LineItemId, SKUID, SKUDescription, Quantity, SKUDimensions, SKUWeight) {
        this.LineItemId = LineItemId;
        this.SKUID = SKUID;
        this.SKUDescription = SKUDescription;
        this.Quantity = Quantity;
        this.SKUDimensions = SKUDimensions;
        this.SKUWeight = SKUWeight;
    }
    LineItem.prototype.toXml = function () {
        var xml = '';
        xml += '<LineItem LineItemId="' + this.LineItemId + '">';
        xml += toXml('SKUID', this.SKUID);
        xml += toXml('SKUDescription', this.SKUDescription);
        xml += toXml('Quantity', this.Quantity);
        xml += (this.SKUDimensions == undefined) ? '' : this.SKUDimensions.toXml('SKUDimensions');
        xml += (this.SKUWeight == undefined) ? '' : this.SKUWeight.toXml('SKUWeight');
        xml += '</LineItem>';
        return xml;
    };
    return LineItem;
})();

var Package = (function () {
    function Package(PackageId, ReturnWareHouseId, LabelType, Program, LabelCode, WareHouseInfo, CustomerInfo, LineItems, ShippingMethod, Dimension,
        PackageWeight, ReferenceFields, toRotate, InvoiceAmount, LabelFee) {
        this.PackageId = PackageId;
        this.ReturnWareHouseId = ReturnWareHouseId;
        this.LabelType = LabelType;
        this.Program = Program;
        this.LabelCode = LabelCode;
        this.WareHouseInfo = WareHouseInfo;
        this.CustomerInfo = CustomerInfo;
        this.LineItems = LineItems;
        this.ShippingMethod = ShippingMethod;
        this.Dimension = Dimension;
        this.PackageWeight = PackageWeight;
        this.ReferenceFields = ReferenceFields;
        this.RotateOption = toRotate;
        this.InvoiceAmount = InvoiceAmount;
        this.LabelFee = LabelFee;
    }
    Package.prototype.toXml = function () {
        var xml = '';
        xml += '<Package>';
        xml += toXml('ReturnWareHouseId', this.ReturnWareHouseId);
        xml += toXml('LabelType', this.LabelType);
        if (this.RotateOption) xml += toXml('RotateImage', 'true');
        xml += toXml('Program', this.Program);
        // xml += toXml('LabelCode', this.LabelCode);
        xml += (this.WareHouseInfo == undefined) ? '' : this.WareHouseInfo.toXml('WareHouseInfo');
        xml += (this.CustomerInfo == undefined) ? '<CustomerInfo />' : this.CustomerInfo.toXml('CustomerInfo');
        if (this.LineItems == undefined) {
            xml += '<LineItems />';
        } else {
            xml += '<LineItems>';
            for (var i = 0; i < this.LineItems.length; i++) {
                xml += this.LineItems[i].toXml();
            }
            xml += '</LineItems>';
        }
        xml += toXml("InvoiceAmount", this.InvoiceAmount);
        xml += toXml('ShippingMethod', this.ShippingMethod);
        xml += (this.Dimension == undefined) ? '' : this.Dimension.toXml();
        xml += (this.PackageWeight == undefined) ? '' : this.PackageWeight.toXml('PackageWeight');
        xml += (this.LabelFee == undefined || this.LabelFee == "") ? '' : toXml('LabelFee', this.LabelFee);
        if (this.ReferenceFields != undefined) {
            for (var j = 0; j < this.ReferenceFields.length; j++) {
                xml += this.ReferenceFields[j].toXml();
            }
        }

        xml += '</Package>';
        return xml;
    };
    return Package;
})();

var ReturnRequest = (function () {
    function ReturnRequest(OrderId, StoreCode, OMSNumber, OrderSource, ShipperWareHouseId, Shipper, Package) {
        this.OrderId = OrderId;
        this.StoreCode = StoreCode;
        this.OMSNumber = OMSNumber;
        this.OrderSource = OrderSource;
        this.ShipperWareHouseId = ShipperWareHouseId;
        this.Shipper = Shipper;
        this.Package = Package;
    }
    ReturnRequest.prototype.toXml = function () {
        var xml = '';
        xml += '<ReturnLabelServiceRequest xmlns="http://schema.gsicommerce.com/services/1.0/">';
        xml += toXml('OrderId', this.OrderId, { "Type": "OMS" });
        xml += toXml('StoreCode', this.StoreCode);
        //xml += toXml('OMSNumber', this.OMSNumber);
        xml += toXml('OrderSource', this.OrderSource);
        // xml += toXml('ShipperWareHouseId', this.ShipperWareHouseId);
        // xml += (this.Shipper == undefined) ? '<Shipper />' : this.Shipper.toXml('Shipper');
        if (this.Package == undefined || this.Package.length == 0) {
            xml += '<Package />';
        } else {
            for (var i = 0; i < this.Package.length; i++) {
                xml += this.Package[i].toXml();
            }
        }

        xml += '</ReturnLabelServiceRequest>';
        return xml;
    };

    ReturnRequest.prototype.toJson = function () {
        return JSON.stringify(this);
    };
    return ReturnRequest;
})();

var Service = (function () {
    function Service(url, method, contentType) {
        this.url = url;
        this.method = method;
        this.contentType = contentType;
        this.client = new XMLHttpRequest();
        this.request = null;
    }
    Service.prototype.GetImage = function (req, crossUrl, crossMethod, crossContentType) {
        var resp = [];

        try {
            this.client.open(this.method, this.url, false);
            this.client.setRequestHeader('Content-Type', this.contentType);

            this.client.setRequestHeader('crossUrl', crossUrl);
            this.client.setRequestHeader('crossMethod', crossMethod);
            this.client.setRequestHeader('crossContentType', crossContentType);

            var xml = req.toXml();
            this.request = xml;

            if (this.method == 'GET' || this.method == 'get')
                this.client.send(); else
                this.client.send(xml);

            var nodes = this.client.responseXML.getElementsByTagName('GraphicImage');

            if (nodes.length > 0) {
                for (var i = 0; i < nodes.length; i++) {
                    var node = nodes[i];
                    if (node.text != undefined) {
                        resp.push(node.text);
                    } else {
                        resp.push(node.textContent);
                    }
                }
            } else {
                var errors = this.client.responseXML.getElementsByTagName('Error');
                if (errors.length > 0) {
                    for (var j = 0; j < errors.length; j++) {
                        var error = errors[j];
                        if (error.text != undefined) {
                            resp.push(error.text);
                        } else {
                            resp.push(error.textContent);
                        }
                    }
                } else {
                    resp.push('unable to get any data from the api');
                }
            }
        } catch (e) {
            resp.push(e.message);
        }

        return resp;
    };
    return Service;
})();
