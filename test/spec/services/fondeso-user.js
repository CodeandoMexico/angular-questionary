'use strict';

describe('Service: fondesoUser', function () {

  // load the service's module
  beforeEach(module('questionaryApp'));

  // instantiate service
  var fondesoUser;
  beforeEach(inject(function (_fondesoUser_) {
    fondesoUser = _fondesoUser_;
  }));

  it('should do something', function () {
    expect(!!fondesoUser).toBe(true);
  });

});
