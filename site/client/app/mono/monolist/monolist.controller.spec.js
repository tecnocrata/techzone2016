'use strict';

describe('Component: MonolistComponent', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var MonolistComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    MonolistComponent = $componentController('MonolistComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
