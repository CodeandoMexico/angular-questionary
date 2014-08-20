'use strict';

describe('Service: fondesoProfile', function () {

  // load the service's module
  beforeEach(module('questionaryApp'));

  // instantiate service
  var fondesoProfile;
  beforeEach(inject(function (_fondesoProfile_) {
    fondesoProfile = _fondesoProfile_;
  }));

  it('should do something', function () {
    expect(!!fondesoProfile).toBe(true);
  });

});
