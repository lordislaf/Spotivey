var assert = require('assert');
var control = require('../index.js');
var value = require('component-value');
var form = document.getElementById('test');

describe('control(root, name)', function () {
  after(function () {
    form.parentNode.removeChild(form);
  });

  it('should retrieve the username field', function () {
    var input = control(form, 'user[name]');

    assert.equal(input.name, 'user[name]');
    assert.equal(value(input), 'dominicbarnes');
  });

  it('should retrieve the password field', function () {
    var input = control(form, 'user[password]');

    assert.equal(input.name, 'user[password]');
    assert.equal(value(input), '123456');
  });

  it('should retrieve a nodelist for radio fields', function () {
    var inputs = control(form, 'gender');
    assert.equal(inputs.length, 2);
  });

  it('should retrieve the age field', function () {
    var input = control(form, 'age');

    assert.equal(input.name, 'age');
    assert.equal(value(input), '76-100');
  });

  it('should retrieve a nodelist for checkbox fields', function () {
    var inputs = control(form, 'tags');
    assert.equal(inputs.length, 4);
  });

  it('should throw a TypeError when not given an element', function () {
    assert.throws(function () {
      control(null);
    }, TypeError);
  });

  it('should return a fieldset if it has a name', function () {
    var fieldset = control(form, 'user');

    assert(fieldset.getAttribute('name') === 'user');
    assert(fieldset instanceof HTMLFieldSetElement);
  });

  describe('when used with a fieldset', function () {
    var fieldset = control(form, 'user');

    it('should return an element nested in the fieldset', function () {
      var input = control(fieldset, 'user[name]');
      assert(input.name === 'user[name]');
    });

    it('should not find an element outside it\'s hierarchy', function () {
      var input = control(fieldset, 'age');
      assert(!input);
    });
  });

  describe('when used with arbitrary root elements', function () {
    var root = form.querySelector('#test');

    it('should return an element nested in the fieldset', function () {
      var input = control(root, 'age');
      assert(input.name === 'age');
    });

    it('should not find an element outside it\'s hierarchy', function () {
      var input = control(root, 'gender');
      assert(!input);
    });
  });
});
