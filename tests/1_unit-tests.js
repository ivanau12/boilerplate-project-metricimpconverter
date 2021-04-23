const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('Functional convertHandler', function(){
    
    // convertHandler should correctly read a whole number input.
    test('Whole number input',function(done){
      var input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    // convertHandler should correctly read a decimal number input.
    test('Decimal number input',function(done){
      var input = '0.32L';
      assert.equal(convertHandler.getNum(input),0.32);
      done();
    });
    // convertHandler should correctly read a fractional input.
    test('Fractional input',function(done){
      var input = '1/2L';
      assert.equal(convertHandler.getNum(input),0.5);
      done();
    });
    // convertHandler should correctly read a fractional input with a decimal.
    test('Fractional input with a decimal',function(done){
      var input = '1/2+0.5L';
      assert.equal(convertHandler.getNum(input),1);
      done();
    });
    // convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).
    test('Double-Fraction',function(done){
      var input = '3/2/3L';
      assert.equal(convertHandler.getNum(input),"error");
      done();
    });
    // convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.
    test('No numerical input',function(done){
      var input = 'kg';
      assert.equal(convertHandler.getNum(input),1);
      done();
    });
    // convertHandler should correctly read each valid input unit.
    let possibleUnits = ['gal','L','mi','km','lbs','kg'];
    test('Valid input unit',function(done){
      possibleUnits.forEach((e)=>assert.notEqual(convertHandler.getUnit(e),"error"));
      done();
    });
    // convertHandler should correctly return an error for an invalid input unit.
    let invalidUnits = ['m','cm','mm','feet','yard','g','cups'];
    test('Invalid input unit',function(done){
      invalidUnits.forEach((e)=>assert.equal(convertHandler.getUnit(e),"error"));
      done();
    });
    // convertHandler should return the correct return unit for each valid input unit.
    test('Return correct unit',function(done){
      possibleUnits.forEach((e)=>assert.equal(
        convertHandler.getReturnUnit(e),
        possibleUnits.indexOf(e)%2===0 ? 
            possibleUnits[possibleUnits.indexOf(e)+1]
          : possibleUnits[possibleUnits.indexOf(e)-1]
      ));
      done();
    });
    
    // convertHandler should correctly return the spelled-out string unit for each valid input unit.
    test('Return spelled out string unit',function(done){
      var spelledOut = {
        "gal":"gallons",
        "L":"liters",
        "mi":"miles",
        "km":"kilometers",
        "lbs":"pounds",
        "kg":"kilograms"
      };
      possibleUnits.forEach((e)=>assert.equal(convertHandler.spellOutUnit(e),spelledOut[e]));
      done();
    });

    // convertHandler should correctly convert gal to L.
    test ('convert gal to L',function(done){
      var input = '5gal';
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      var expected = parseFloat((initNum*3.78541).toFixed(5));
      assert.equal(convertHandler.convert(initNum,initUnit),expected);
      done();
    });
    
    // convertHandler should correctly convert L to gal.
    test ('convert l to gal',function(done){
      var input = '5l';
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      var expected = parseFloat((initNum/3.78541).toFixed(5));
      assert.equal(convertHandler.convert(initNum,initUnit),expected);
      done();
    });
    // convertHandler should correctly convert mi to km.
    test ('convert mi to km',function(done){
      var input = '5mi';
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      var expected = parseFloat((initNum*1.60934).toFixed(5));
      assert.equal(convertHandler.convert(initNum,initUnit),expected);
      done();
    });
    // convertHandler should correctly convert km to mi.
    test ('convert km to mi',function(done){
      var input = '5km';
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      var expected = parseFloat((initNum/1.60934).toFixed(5));
      assert.equal(convertHandler.convert(initNum,initUnit),expected);
      done();
    });
    // convertHandler should correctly convert lbs to kg.
    test ('convert lbs to kg',function(done){
      var input = '5lbs';
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      var expected = parseFloat((initNum*0.453592).toFixed(5));
      assert.equal(convertHandler.convert(initNum,initUnit),expected);
      done();
    });
    // convertHandler should correctly convert kg to lbs.
    test ('convert kg to lbs',function(done){
      var input = '5kg';
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      var expected = parseFloat((initNum/0.453592).toFixed(5));
      assert.equal(convertHandler.convert(initNum,initUnit),expected);
      done();
    });
    
    
  })
});