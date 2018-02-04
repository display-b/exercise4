describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          // es6方法里的this指向的是定义时所在的对象
          this.should.equal(obj)
          done()
        }, 0)
      }
    }
    obj.say()
  }) 

  it('global', function () {
    function test() {
      // this 是什么？想想为什么？
      // 这里this指的是window
      console.log(this == window)
      //this.should.equal为什么是undefined
      // this.should.equal(window)
      // should.equal( this , window )
    }
    test()
  })

  describe('bind', function () {
    it('bind undefined', function () {
      var obj = {
        say: function () {
          function _say() {
            // this 是什么？想想为什么？
            // 指定了_say的调用对象，但是由于say是立即执行函数，和变量提升的原因，
            // 所以在定义与赋值obj的时候就执行了匿名函数返回一个方法给say，导致在匿名函数里面读取到的obj是undefined
            this.should.equal(undefined)
          }
          return _say.bind(obj)
        }()
      }
      obj.say()
    })

    it('bind normal', function () {
      var obj = {}
      obj.say = function () {
        function _say() {
          // this 是什么？想想为什么？
            // 指定了_say的调用对象，但是由于say是立即执行函数，和变量提升的原因，
            // 所以在obj定义方法say的时候（obj已经先定义了并赋值为{}）,所以在匿名函数里面读取到的this是obj
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})