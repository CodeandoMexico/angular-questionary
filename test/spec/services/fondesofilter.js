'use strict';

describe('Service: fondesoFilter', function () {

  // load the service's module
  beforeEach(module('questionaryApp'));

  // instantiate service
  var fondesoFilter;
  beforeEach(inject(function (_fondesoFilter_) {
    fondesoFilter = _fondesoFilter_;
  }));

  it('should do something', function () {
    expect(!!fondesoFilter).toBe(true);
  });

});
