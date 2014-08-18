define([
  '<%= proj() %>/models/<%= model %>'
], function (<%= ctor() %>) {

  describe('<%= proj() %>/models/<%= model %>', function () {

    beforeEach(function () {
      //add common test functions here
    });

    describe('initialize', function () {

      it('describe the behavior', function () {
        expect('this').toBe('that');
      });

    })
    
  });
});