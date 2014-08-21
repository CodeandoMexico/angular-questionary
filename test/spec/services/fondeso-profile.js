'use strict';

describe('Service: fondesoSpecialCase', function () {

  // load the service's module
  beforeEach(module('questionaryApp'));

  // instantiate service
  var fondesoSpecialCase;
  beforeEach(inject(function (_fondesoSpecialCase_) {
    fondesoSpecialCase = _fondesoSpecialCase_;
  }));

  it('should do something', function () {
    expect(!!fondesoSpecialCase).toBe(true);
  });

});
