'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var monosvcCtrlStub = {
  index: 'monosvcCtrl.index',
  show: 'monosvcCtrl.show',
  create: 'monosvcCtrl.create',
  update: 'monosvcCtrl.update',
  destroy: 'monosvcCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var monosvcIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './monosvc.controller': monosvcCtrlStub
});

describe('Monosvc API Router:', function() {

  it('should return an express router instance', function() {
    expect(monosvcIndex).to.equal(routerStub);
  });

  describe('GET /api/monosvc', function() {

    it('should route to monosvc.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'monosvcCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/monosvc/:id', function() {

    it('should route to monosvc.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'monosvcCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/monosvc', function() {

    it('should route to monosvc.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'monosvcCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/monosvc/:id', function() {

    it('should route to monosvc.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'monosvcCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/monosvc/:id', function() {

    it('should route to monosvc.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'monosvcCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/monosvc/:id', function() {

    it('should route to monosvc.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'monosvcCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
