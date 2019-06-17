describe('A spec suite', function() {
    it('contains a passing spec', function() {
        console.log("Hello Karma");
    });
});

describe('加法函数的测试', function() {
    it('1 加 1 应该等于 2', function() {
        assert.equal(add(1, 1), 3);
    });
});
