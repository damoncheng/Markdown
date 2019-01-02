<template>

<div id="GetStart">
  <img src="../assets/logo.png"> 

  {{ message }}
  <div id="title">
    <span v-bind:title="title">
      鼠标悬停几秒钟查看此处动态绑定的提示信息！
    </span>
  </div>
  <div id="if">
    <span v-if="seen">现在你看到我了</span>
  </div>

  <div id="for">
    <ol>
      <li v-for="todo in todos" :key="todo.id">
        {{todo.text}}
      </li>
    </ol>
  </div>

  <div id="on">
     <button v-on:click="reverseMessage">逆转消息</button>
  </div>

  <div id="model">
     <p>{{ model }}</p>
     <input v-model="model">
  </div>

  <div id="components">
    <!-- 创建一个 todo-item 组件的实例 -->
    <!-- <ol>
    <todo-item></todo-item>
    </ol>
    -->
    <ol>
    <!--
      现在我们为每个 todo-item 提供 todo 对象
      todo 对象是变量，即其内容可以是动态的。
      我们也需要为每个组件提供一个“key”，稍后再
      作详细解释。
    -->
    <todo-item
      v-for="item in groceryList"
      v-bind:todo="item"
      v-bind:key="item.id">
    </todo-item>
    </ol>
  </div>
</div>
</template>
<script>

import Vue from 'vue'

export default {
  name: 'GetStart',
  data () {
    return {
      message: 'Hello World!',
      title: '页面加载于 ' + new Date().toLocaleString(),
      seen: true,
      todos: [
        { id: 0, text: '学习 JavaScript' },
        { id: 1, text: '学习 Vue' },
        { id: 2, text: '整个牛项目' }
      ],
      model: 'hello model!',
      groceryList: [
        { id: 0, text: '蔬菜' },
        { id: 1, text: '奶酪' },
        { id: 2, text: '随便其它什么人吃的东西' }
      ]
    }
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
}

/** Vue.component('todo-item', {
  template: '<li>这是个待办项</li>'
})
*/

Vue.component('todo-item', {
  // todo-item 组件现在接受一个
  // "prop"，类似于一个自定义特性。
  // 这个 prop 名为 todo。
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})

</script>

<style>
#GetStart {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
