describe('A spec suite', function() {

	var specs = 0;

	beforeEach(function(){
		specs += 1;
	});

    it('contains a passing spec', function() {
        console.log("specs one");
    });

    it('contains a passing spec', function() {
        console.log("specs two");
    });

	afterAll(function(){
		console.log("specs : " + specs)
	});

});
