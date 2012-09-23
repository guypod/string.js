
(function() {
  'use strict';

  var S = null;

  if (module && module.exports)
    S = require('../lib/string');
  else {
    S = window.S;
  }

  function T(v) { if (!v) { throw new Error('Should be true.'); } };
  function F(v) { if (v) { throw new Error('Should be false.'); } };


    

  /*if (typeof window !== "undefined" && window !== null) {
    S = window.S;
  } else {
    S = require('../lib/string');
  }*/

  describe('string.js', function() {
    
    describe('- constructor', function() {
      it('should should set the internal "s" property', function() {
        T (S('helo').s === 'helo')
        T (S(5).s === '5')
        T (S(new Date(2012, 1, 1)).s.indexOf('2012') != -1)
        T (S(new RegExp()).s.substr(0,1) === '/') 
        T (S({}).s === '[object Object]')
        T (S(null).s === null)
        T (S(undefined).s === undefined)
      })
    })

    describe('- camelize()', function() {
      it('should remove any underscores or dashes and convert a string into camel casing', function() {
        T (S('data_rate').camelize().s === 'dataRate');
        T (S('background-color').camelize().s === 'backgroundColor');
        T (S('-moz-something').camelize().s === 'MozSomething');
        T (S('_car_speed_').camelize().s === 'CarSpeed');
        T (S('yes_we_can').camelize().s === 'yesWeCan');
      })
    })
    
    describe('- capitalize()', function() {
      it('should capitalize the string', function() {
        T (S('jon').capitalize().s === 'Jon');
        T (S('JP').capitalize().s === 'Jp');
      })
    })

    describe('- chars()', function() {
      it('should return an array of chars', function() {
        T (S('jon').capitalize().s === 'Jon');
        T (S('JP').capitalize().s === 'Jp');
      })
    })

    describe('+ clobberPrototype()', function() {
      it('should extend the String prototype with the extra methods', function() {
        S.clobberPrototype();
        T (" hello!".endsWith('!'));
        S.restorePrototype();
      })
    })

    describe('- collapseWhitespace()', function() {
      it('should convert all adjacent whitespace characters to a single space and trim the ends', function() {
        T (S('  Strings   \t are   \n\n\t fun\n!  ').collapseWhitespace().s === 'Strings are fun !');
      })
    })

    describe('- contains(substring)', function() {
      it('should return true if the string contains the specified input string', function() {
        T (S('JavaScript is one of the best languages!').contains('one'));
        F (S('What do you think?').contains('YES!'));
      })
    })

    describe('- dasherize()', function() {
      it('should convert a camel cased string into a string delimited by dashes', function() {
        T (S('dataRate').dasherize().s === 'data-rate');
        T (S('CarSpeed').dasherize().s === '-car-speed');
        T (S('yesWeCan').dasherize().s === 'yes-we-can');
        T (S('backgroundColor').dasherize().s === 'background-color');
      })
    })

    describe('- decodeHtmlEntities()', function() {
      it('should decode HTML entities into their proper string representation', function() {
        T (S('Ken Thompson &amp; Dennis Ritchie').decodeHtmlEntities().s === 'Ken Thompson & Dennis Ritchie');
        T (S('3 &lt; 4').decodeHtmlEntities().s === '3 < 4');
      })
    })

    describe('- endsWith(suffix)', function() {
      it("should return true if the string ends with the input string", function() {
        T (S("hello jon").endsWith('jon'));
        F (S('ffffaaa').endsWith('jon'));
        T (S("").endsWith(''));
        T (S("hi").endsWith(''));
        T (S("hi").endsWith('hi'));
      })
    })

    describe('- include(substring)', function() {
      it('should return true if the string contains the specified input string', function() {
        T (S('JavaScript is one of the best languages!').include('one'));
        F (S('What do you think?').include('YES!'));
      })
    })

    describe('- isAlpha()', function() {
      it("should return true if the string contains only letters", function() {
        T (S("afaf").isAlpha());
        T (S("FJslfjkasfs").isAlpha());
        F (S("adflj43faljsdf").isAlpha());
        F (S("33").isAlpha());
        F (S("TT....TTTafafetstYY").isAlpha());
      })
    })

    describe('- isAlphaNumeric()', function() {
      it("should return true if the string contains only letters and digits", function() {
        T (S("afaf35353afaf").isAlphaNumeric());
        T (S("FFFF99fff").isAlphaNumeric());
        T (S("99").isAlphaNumeric());
        T (S("afff").isAlphaNumeric());
        T (S("Infinity").isAlphaNumeric());
        F (S("-Infinity").isAlphaNumeric());
        F (S("-33").isAlphaNumeric());
        F (S("aaff..").isAlphaNumeric());
      })
    })

    describe('- isEmpty()', function() {
     it('should return true if the string is solely composed of whitespace or is null', function() {
        T (S(' ').isEmpty());
        T (S('\t\t\t    ').isEmpty());
        T (S('\n\n ').isEmpty());
        F (S('hey').isEmpty())
        T (S(null).isEmpty())
        T (S(null).isEmpty())
      })
    })

    describe('- isLower()', function() {
     it('should return true if the character or string is lowercase', function() {
        T (S('a').isLower());
        T (S('z').isLower());
        F (S('B').isLower());
        T (S('hijp').isLower());
        F (S('hi jp').isLower());
        F (S('HelLO').isLower());
      })
    })

    describe('- isNumeric()', function() {
      it("should return true if the string only contains digits, this would not include Infinity or -Infinity", function() {
        T (S("3").isNumeric());
        F (S("34.22").isNumeric());
        F (S("-22.33").isNumeric());
        F (S("NaN").isNumeric());
        F (S("Infinity").isNumeric());
        F (S("-Infinity").isNumeric());
        F (S("JP").isNumeric());
        F (S("-5").isNumeric());
        T (S("000992424242").isNumeric());
      })
    })

    describe('- isUpper()', function() {
      it('should return true if the character or string is uppercase', function() {
        F (S('a').isUpper());
        F (S('z').isUpper());
        T (S('B').isUpper());
        T (S('HIJP').isUpper());
        F (S('HI JP').isUpper());
        F (S('HelLO').isUpper());
      })
    })

    describe('- length', function() {
      it('should return the length of the string', function() {
        T (S('hello').length === 5);
        T (S('').length === 0);
        T (S(null).length === -1);
        T (S(undefined).length === -1);
      })
    })

    describe('- left(N)', function() {
      it('should return the substring denoted by N positive left-most characters', function() {
        T (S('My name is JP').left(2).s === 'My');
        T (S('Hi').left(0).s === '');
        T (S('Hello').left(1).s === 'H');
      })
      it('should return the substring denoted by N negative left-most characters, equivalent to calling right(-N)', function() {
        T (S('My name is JP').left(-2).s === 'JP');
      })
    })

    describe('- repeat(n)', function() {
      it('should return a string with that is concatenated n times', function() {
        T (S(' ').repeat(5).s === '     ');
        T (S('*').repeat(3).s === '***');
      })
    })

    describe('- replaceAll(substring, replacement)', function() {
      it('should return the new string with all occurrences of substring replaced with the replacment string', function() {
        T (S(' does IT work? ').replaceAll(' ', '_').s === '_does_IT_work?_');
        T (S('Yes it does!').replaceAll(' ', '').s === 'Yesitdoes!');
      })
    })

    describe('+ restorePrototype()', function() {
      it('should restore the original String prototype', function() {
        T (typeof ' hi'.endsWith === 'undefined');
        S.clobberPrototype();
        T (' hi'.endsWith('hi'));
        S.restorePrototype();
        T (typeof ' hi'.endsWith === 'undefined');
      })
    })

    describe('- right(N)', function() {
      it('should return the substring denoted by N positive right-most characters', function() {
        T (S('I AM CRAZY').right(2).s === 'ZY');
        T (S('Does it work?  ').right(4).s === 'k?  ');
        T (S('Hi').right(0).s === '');
      })
      it('should return the substring denoted by N negative right-most characters, equivalent to calling left(-N)', function() {
        T (S('My name is JP').right(-2).s === 'My');
      })
    })
    
    describe('- s', function() {
      it('should return the native string', function() {
        T (S('hi').s === 'hi');
        T (S('hi').toString() === S('hi').s);
      })
    })
    
    describe('- startsWith(prefix)', function() {
      it("should return true if the string starts with the input string", function() {
        T (S("JP is a software engineer").startsWith("JP"));
        F (S('wants to change the world').startsWith("politicians"));
        T (S("").startsWith(""));
        T (S("Hi").startsWith(""));
        T (S("JP").startsWith("JP"));
      })
    })

    describe('- times(n)', function() {
      it('should return a string with that is concatenated n times', function() {
        T (S(' ').times(5).s === '     ');
        T (S('*').times(3).s === '***');
      })
    })

    describe('- toString()', function() {
      it('should return the native string', function() {
        T (S('hi').toString() === 'hi');
        T (S('hi').toString() === S('hi').s);
      })
    })

    describe('- toInt()', function() {
      it('should return the integer value, wraps parseInt', function() {
        T (S('5').toInt() === 5);
        T (S('5.3').toInt() === 5);
        T (S(5.3).toInt() === 5);
        T (S('-10').toInt() === -10);
        T (S('55 adfafaf').toInt() === 55)
        T (S('afff 44').toInt().toString() === 'NaN')
        T (S('0xff').toInt() == 255)
      })
    })

    describe('- toFloat()', function() {
      it('should return the float value, wraps parseFloat', function() {
        T (S('5').toFloat() === 5);
        T (S('5.3').toFloat() === 5.3);
        T (S(5.3).toFloat() === 5.3);
        T (S('-10').toFloat() === -10);
        T (S('55.3 adfafaf').toFloat() === 55.3)
        T (S('afff 44').toFloat().toString() === 'NaN')
      })
    })

    describe('- trim()', function() {
      it('should return the string with leading and trailing whitespace removed', function() {
        T (S('hello ').trim().s === 'hello');
        T (S(' hello ').trim().s === 'hello');
        T (S('\nhello').trim().s === 'hello');
        T (S('\nhello\r\n').trim().s === 'hello');
        T (S('\thello\t').trim().s === 'hello');
      })
    })

    describe('- trimLeft()', function() {
      it('should return the string with leading whitespace removed', function() {
        T (S('  How are you?').trimLeft().s === 'How are you?');
        T (S(' JP ').trimLeft().s === 'JP ');
      })
    })

    describe('- trimRight()', function() {
      it('should return the string with trailing whitespace removed', function() {
        T (S('How are you?  ').trimRight().s === 'How are you?');
        T (S(' JP ').trimRight().s === ' JP');
      })
    })

    describe('- underscore()', function() {
      it('should convert a camel cased string into a string separated by underscores', function() {
        T (S('dataRate').underscore().s === 'data_rate');
        T (S('CarSpeed').underscore().s === '_car_speed');
        T (S('yesWeCan').underscore().s === 'yes_we_can');
      })
    })

    describe('- valueOf()', function() {
      it('should return the primitive value of the string, wraps native valueOf()', function() {
        T (S('hi').valueOf() === 'hi')
      })
    })

    describe('+ VERSION', function() {
      it('should exist', function() {
        T (S.VERSION)
      })
    })

    it('should import native JavaScript string methods', function() {
      T (S('hi    ').charAt(0).trimRight().startsWith('h'));
      T (S('hello ').concat('jp').indexOf('jp') === 6);
      T (S('this is so cool').substr(0, 4).s === 'this');
    })

  })
}).call(this);