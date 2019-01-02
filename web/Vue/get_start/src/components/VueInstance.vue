<template>

<div id="VueInstance">

    {{message}}

    <br />

    <span v-once>这个将不会改变：{{once}}</span>

    <br />

<!-- default text -->
    <p>Using mustaches: {{ rawHtml }}</p>
    <!-- translate it to html -->
    <p>Using v-html directive: <span v-html="rawHtml"></span></p>

    <br />

<!-- use javascript expression -->
    {{number + 1}} <br /> 
    
    {{number ? "yes" : "no"}} <br />
    
    {{ message.split('').reverse().join('') }}

    <br />

<!-- directives -->

    <!-- bind drective : bind js attr to model -->
    <button v-bind:disabled="isButtonDisabled">Button</Button>

    <!-- if 指令 -->
    <p v-if="seen">现在你看到我了</p>

    <!-- 带参数指令 : 绑定属性 -->
    <a v-bind:href="url">attr</a>

    <br />

    <!-- 带参数指定 ： 监听事件 -->
    <a v-on:click="doSomething">{{event}}</a>


    <!-- modifiers : 修饰符, 以半角句号 . 指明特殊后缀 -->
    <!-- <form v-on:submit:prevent="onSubmit">...</form>-->
    
<!-- computed(计算属性) : 任何复杂的逻辑，你都应该使用计算属性 -->

    <!--
        计算属性缓存 VS 方法 ：这次的计算属性可以通过reversedMessage()方法来实现，
        其与方法不同的是，计算属性是基于他们的以来进行缓存的。即只要message没有改变，
        多次访问 reversedMessage 计算属性会立即返回之前的结果, 这也同样意味着下面的
        计算属性将不再更新。

            computed: {
                now: function () {
                    return Date.now()
                }
            }

        结果就是：当计算属性的依赖是一个很大的数组的时候，这种缓存是有很大的性能提升的。

        计算属性默认只有getter，不过在你需要的时候也可以提供一个setter：

            computed: {
                fullName: {
                    get: function () {
                        return this.firstName + ' ' + this.lastName
                    },
                    set: function (newValue) {
                        var names = newValue.split(' ')
                        this.firstName = names[0]
                        this.lastName = names[names.length - 1]
                    }
                }
            }
     -->

    <p>Computerd reversed message: "{{reversedMessage}}"</p>

<!-- 侦听器 -->
    <br />

    <p>
        Ask a yes/no question:
        <input v-model="question">
    </p>
    <p>{{ answer }}</p>

<!-- html 与 css绑定 -->

    <!--对象语法：通过属性动态切换对象class，非常有用 -->
    <div v-bind:class="{ active: isActive }">属性对象规定对象所属类+开关</div>

        <!-- 绑定一个对象数组 -->
    <div v-bind:class="classObject">对象属性规定对象所属类+开关</div>

        <!-- 绑定一个计算属性 -->
    <div v-bind:class="classComputedObject">计算属性规定对象所属类</div>

    <!-- 数组语法 -->
    <div v-bind:class="[activeClass, errorClass]">数组属性规定对象所属类</div>

    <div v-bind:class="[isActive?activeClass:'', errorClass]">三元组调整对象所属类</div>
    <div v-bind:class="[{active : isActive}, errorClass]">数组嵌套对象调整对象所属类</div>

<!-- 用在组件上 -->

    <!-- 
        
        当在一个自定义组建上使用class属性时，这些类将被添加到该组建的根元素上面。
        这些元素上已存在在的类不会被覆盖掉。

     -->
     <my-component class="baz boo">my-component</my-component>

<!-- 绑定内联样式 -->
    <div v-bind:style="{color: activeColor, fontSize: fontSize + 'px'}">
        model内属性的对象规定Dom对象样式
    </div>

    <div v-bind:style="StyleObject">
        model内对象规定Dom对象样式
    </div>

<!-- 条件渲染 -->
    <!-- 
        
        v-if是一个指令，所以必须将它添加到一个元素上。但是如果想切换多个元素，
        此时可以把一个<template>元素当作不可见的包裹元素.

    -->
<template v-if="ok">
    <h1>Title</h1>
    <p>Paragraph 1</p>
    <p>Paragraph 2</p>
</template>

<div v-if="Math.random() > 0.5">
    Now you see me
</div>
<div v-else>
    Now you don't
</div>
<div>
    <!-- 默认两个模版使用同一个input元素，切换时仅placeholder切换 -->
    <template v-if="loginType === 'username'">
        <label>Username</label>
        <input placeholder="Enter your username">
    </template>
    <template v-else>
        <label>Email</label>
        <input placeholder="Enter your email address">
    </template>

    <br />
    <!-- 通过key将两个模版的input元素区分开, label元素没有key，仍会被重复使用 -->
    <template v-if="loginType === 'username'">
        <label>Username</label>
        <input placeholder="Enter your username" key="username-input">
    </template>
    <template v-else>
        <label>Email</label>
        <input placeholder="Enter your email address" key="email-input">
    </template>

    <br />
    <button v-on:click="switchLoginType">Toggole login type</button>

</div>

<div>
    <!-- v-if是销毁重建元素，v-show 切换元素css disabled属性 -->
    <h1 v-show="ok">Hello!</h1>
</div>

<!-- 列表渲染 -->

    <!-- list渲染 -->
<div>
    <ul id="example-1">
        <li v-for="item in sortedItems" :key="item.id">
            {{item.message}}
        </li>
    </ul>

    <ul id="example-2">
        <li v-for="(item, index) in items">
            {{ parentMessage }} - {{ index }} - {{ item.message }}
        </li>
    </ul>
</div>

    <!-- object渲染 -->
<div id="v-for-object" class="demo">
    <li v-for="value in object">
        {{ value }}
    </li>
</div>

<div v-for="(value, key) in object">
  {{ key }}: {{ value }}
</div>

    <!-- 显示过滤，排序结果 -->
<li v-for="n in evenNumbers">{{ n }}</li>

    <!-- v-for in template -->
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>

    <!-- v-for with v-if -->
<li v-for="(todo,index) in todos" v-if="!todo.isComplete">
  {{ index }}
</li>

<ul v-if="Object.keys(todos).length">
  <li v-for="(todo,index) in todos">
    {{ index }}
  </li>
</ul>
<p v-else>No todos left!</p>

    <!-- 一个组件v-for -->

<form v-on:submit.prevent="addNewToDo">
<label for="new-todo">Add a todo</label>
<input
    v-model="newToDoText"
    id="new-todo"
    placeholder="E.g. Feed the cat"
>
<button>Add</button>
</form>
<ul>
<li
    is="todo-item"
    v-for="(todo, index) in todos_list"
    v-bind:key="todo.id"
    v-bind:title="todo.title"
    v-on:remove="todos_list.splice(index, 1)"
></li>
</ul>

<!-- 监听事件 -->
<div id="example-1">
  <button v-on:click="counter += 1">Add 1</button>
  <p>The button above has been clicked {{ counter }} times.</p>
</div>

    <!-- 事件处理方法 -->
<div id="example-2">
    <button v-on:click="greet">Greet</button>
</div>

    <!-- 内联处理器中的方法 -->
<div>
    <button v-on:click="say('hi')">Say Hi</button>
    <button v-on:click="say('what')">Say What</button>
</div>

<div>
    <button v-on:click="warn('Form cannot be submitted yet.', $event)">
        Submit
    </button>
</div>

</div>
</template>

<script>

import Vue from 'vue'

var data = {

  ok: false,
  name: 'hello name',
  message: 'Hello Vue Instance',
  created: 'created...',
  once: 'onced',
  rawHtml: '<span style="color:red">This should be red.</span>',
  isButtonDisabled: true,
  number: 0,
  seen: true,
  url: 'http://www.baidu.com',
  event: 0,
  question: '',
  answer: 0,
  isActive: true,
  error: null,

  classObject: {
    active: true,
    'text-danger': false
  },

  activeClass: 'active',
  errorClass: 'text-danger',
  activeColor: 'red',
  fontSize: 30,
  StyleObject: {
      color: 'red',
      fontSize: '13px',
  },
  loginType: "username",
  parentMessage: 'Parent',
  items: [
      {message: 'Foo', id: 2},
      {message: 'Bar', id: 1},
  ],
  object: {
      firstName: 'John',
      lastName: 'Doe',
      age: 30
  },
  numbers : [1,2,3,4,5],
  todos: {
      task_one: {isComplete: false},
      task_two: {isComplete: true},
  },
  newToDoText: '',
  todos_list: [
      {
          id: 1,
          title: "Do the dishes",
      },
      {
          id: 2,
          title: "Take out the trash",
      },
      {
          id: 3,
          title: "Now the lawn"
      }
  ],
  nextToDoId: 4,
  counter: 0,

}

export default {

  name: 'VueInstance',
  data () {
    return data
  },

  computed: {
    
    
    reversedMessage: function() {
        return this.message.split('').reverse().join('')
    },
    classComputedObject: function() {
        return {
            active: this.isActive && !this.error,
            'text-danger' : this.error && this.error.type === "fatal"
        }
    },
    sortedItems: function() {
        return this.items.sort(function (a, b) {
            return a.id - b.id
        })
    },
    evenNumbers: function () {
        return this.numbers.filter(function (number) {
            return number % 2 === 0
        })
    } 
  },

  watch: {
      question: function (newQuestion, oldQuestion) {
        this.answer = newQuestion.length
      }
  },

  methods: { 
    doSomething : function () {
     if (this.event == 0){
         this.event = 1;
     }
     else{
         this.event = 0;
     }
    },
    onSubmit: function () {
        console.log("OnSubmit")
    },
    switchLoginType: function () {
        if(this.loginType=="username"){
            this.loginType = "email"
        }else{
            this.loginType = "username"
        }
    },
    addNewToDo: function () { 
        console.log("addNewToDo.....")
        this.todos_list.push({
           id: this.nextToDoId++,
           title: this.newToDoText
        })
        this.newToDoText = ''
    },
    greet: function (event) {
        alert('Hello ' + this.name + '!')
        if (event) {
            alert(event.target.tagName)
        }
    },
    say: function (message) {
        alert(message)
    },
    warn: function (message, event) {
        if (event) event.preventDefault()
        alert(message)
    }
  },

  created: function () {
    console.log('created...')
    console.log(this.created)
  },

  mounted: function() {
    console.log('mounted...')
  },

  beforeUpdate: function() {
    console.log('before updated...')
  },

  updated: function() {
    console.log('updated...')
  },

  destroyed: function () {
    console.log('destroyed...')
  }

}


Vue.component('my-component', {

    template: '<p class="baz boo">Hi</p>'

})

Vue.component('todo-item', {
  template: '\
    <li>\
      {{ title }}\
      <button v-on:click="$emit(\'remove\')">Remove</button>\
    </li>\
  ',
  props: ['title']
})

</script>

<style>
#vueinstance {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
