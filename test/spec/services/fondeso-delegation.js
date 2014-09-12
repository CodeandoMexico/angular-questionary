'use strict';

describe('Service: fondesoDelegation', function () {

  // load the service's module
  beforeEach(module('questionaryApp'));

  // instantiate service
  var fondesoDelegation;
  beforeEach(inject(function (_fondesoDelegation_) {
    fondesoDelegation = _fondesoDelegation_;
  }));

  it('should do something', function () {
    expect(!!fondesoDelegation).toBe(true);
  });

});
