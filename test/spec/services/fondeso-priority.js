'use strict';

describe('Service: fondesoPriority', function () {

  // load the service's module
  beforeEach(module('questionaryApp'));

  // instantiate service
  var fondesoPriority;
  beforeEach(inject(function (_fondesoPriority_) {
    fondesoPriority = _fondesoPriority_;
  }));

  it('should do something', function () {
    expect(!!fondesoPriority).toBe(true);
  });

});
