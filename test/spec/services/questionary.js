'use strict';

describe('Service: Questionary', function () {

  // load the service's module
  beforeEach(module('questionaryApp'));

  // instantiate service
  var Questionary;
  beforeEach(inject(function (_Questionary_) {
    Questionary = _Questionary_;
  }));

  it('should do something', function () {
    expect(!!Questionary).toBe(true);
  });

});
