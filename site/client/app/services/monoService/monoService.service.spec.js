'use strict';

describe('Service: monoService', function() {
  // load the service's module
  beforeEach(module('techzoneApp.monoService'));

  // instantiate service
  var monoService;
  beforeEach(inject(function(_monoService_) {
    monoService = _monoService_;
  }));

  it('should do something', function() {
    expect(!!monoService).to.be.true;
  });
});
