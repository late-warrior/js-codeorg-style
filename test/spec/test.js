(function () {
  'use strict';

  describe('Give it some context', function () {
    describe('maybe a bit more context here', function () {
      it('should run here few assertions', function () {
        expect(true).toBe(true);
      });
      it('second test here', function () {
        expect(true).toBe(false);
      });
    });
  });
})();
