'use strict';

describe('Service: fondesoTie', function () {

  // load the service's module
  beforeEach(module('questionaryApp'));

  // instantiate service
  var fondesoTie;
  beforeEach(inject(function (_fondesoTie_) {
    fondesoTie = _fondesoTie_;
  }));

  it('should do something', function () {
    expect(!!fondesoTie).toBe(true);
  });

});
