'use strict';

describe('Component: MicroComponent', function() {
  // load the controller's module
  beforeEach(module('techzoneApp'));

  var MicroComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    MicroComponent = $componentController('micro', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
