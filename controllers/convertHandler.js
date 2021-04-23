function ConvertHandler() {
  
  let possibleUnits = ['gal','L','mi','km','lbs','kg'];
  
  this.getNum = function(input) {
    let result;
    let numRegex = /[^A-Za-z]/g;
    let num = input.match(numRegex);
    if (num === null) {
      result = 1;
    } else if (input.match(/\/+/g) && input.match(/\/+/g).length>1) {
      result = "error"
    } else {
      result = eval(num.join(''));
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    let unitRegex = /[A-Za-z]/g;
    let unit  = input.match(unitRegex).join('');
    if(unit!=="L"){
      unit = unit.toLowerCase();
    }
    if (unit==='l'){
      unit = unit.toUpperCase();
    }
    if (possibleUnits.indexOf(unit) < 0){
      result = "error"
    } else {
      result = unit;
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    let index = possibleUnits.indexOf(initUnit);
    if (index%2===0){
      result = possibleUnits[index+1];
    } else {
      result = possibleUnits[index-1];
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    unit = unit.toLowerCase();
    switch(unit){
      case "gal":
        result = "gallons";
        break;
      case "l":
        result = "liters";
        break;
      case "mi":
        result = "miles";
        break;
      case "km":
        result = "kilometers";
        break;
      case "lbs":
        result = "pounds";
        break;
      case "kg":
        result = "kilograms";
        break;
    };
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    initUnit = initUnit.toLowerCase();
    switch(initUnit){
      case "gal":
        result = initNum*galToL;
        break;
      case "l":
        result = initNum/galToL;
        break;
      case "mi":
        result = initNum*miToKm;
        break;
      case "km":
        result = initNum/miToKm;
        break;
      case "lbs":
        result = initNum*lbsToKg;
        break;
      case "kg":
        result = initNum/lbsToKg;
        break;
    };
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    let input = initNum+initUnit;
    result = initNum + " " + this.spellOutUnit(initUnit)+" converts to "+returnNum+" "+this.spellOutUnit(returnUnit);
    return result;
  };
  
}

module.exports = ConvertHandler;
