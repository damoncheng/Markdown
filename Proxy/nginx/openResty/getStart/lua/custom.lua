module = {}

--[[ 

   官方不建议使用全局变量，因为nginx缓存机制，其生命周期和request handler一样,
   不重启，不重置，这会导致，并发问题，执行性能开销，以及因为输入错误难以定位.

--]]
module.glo = 3;

module.printGlobalVar = function()

    print("glo:", module.glo);

end

module.access = function()

    ngx.say("xianyu")

    ngx.exit(404)

end

return module
