<template>

<!-- Vue的修饰符是一个很重要的概念，能够丰富 对元素 事件，渲染 的处理能力 -->

<div id="VueEvent">
<!-- 

    事件修饰符 ：

    在事件处理程序中调用 event.preventDefault() 或 event.stopPropagation() 是
    非常常见的需求。尽管我们可以在方法中轻松实现这点，但更好的方式是：方法只有纯粹的数据
    逻辑，而不是去处理DOM事件细节。

    vue提供了事件修饰符：（修饰符可以串联）

        *.stop         阻止单击事件继续传播
        *.prevent      提交事件不再重载页面
        
        添加事件监听器时使用事件捕获模式
        即元素自身触发的事件先在此处理，然后才交由内部元素进行处理
        *.capture      

        只当在 event.target 是当前元素自身时触发处理函数
        即事件不是从内部元素触发的
        *.self


        *.once          单机事件将只会触发一次
        *.passive       能够提升移动端性能

-->

<!-- 
    按键别名：

        .enter
        .tab
        .delete (捕捉删除和退格键)
        .esc
        .space
        .up
        .down
        .left
        .right
-->

<button v-on:keyup="keyEvent($event)">keyEvent</button>

<!-- 
    表单输入绑定: 
    
    你可以用v-model指令在表单中对输入元素创建双向数据绑定

-->

    <!-- 文本 -->
<div>
    <input v-model="message" placeholder="edit me">
    <p>Message is: {{ message }}</p>
</div>

    <!-- 多文本 -->
<div>
    <span>Multiline message is:</span>
    <p style="white-space: pre-line;">{{ message }}</p>
    <br>
    <textarea v-model="message" placeholder="add multiple lines"></textarea>
</div>

    <!-- 复选框 -->
<div>
    <input type="checkbox" id="checkbox" v-model="checked">
    <label for="checkbox">{{ checked }}</label>
</div>

    <!-- 多个复选框，绑定到一个数组 -->
<div id='example-3'>
  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
  <label for="jack">Jack</label>
  <input type="checkbox" id="john" value="John" v-model="checkedNames">
  <label for="john">John</label>
  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
  <label for="mike">Mike</label>
  <br>
  <span>Checked names: {{ checkedNames }}</span>
</div>

<br />

    <!-- 单选按钮 -->
<div id="example-4">
  <input type="radio" id="one" value="One" v-model="picked">
  <label for="one">One</label>
  <br>
  <input type="radio" id="two" value="Two" v-model="picked">
  <label for="two">Two</label>
  <br>
  <span>Picked: {{ picked }}</span>
</div>

<br /><br />
    <!-- 选择框 -->

<!--
<div id="example-5">
  <select v-model="selected">
    <option disabled value="">请选择</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>Selected: {{ selected }}</span>
</div>
-->

    <!-- 选择框 + v-for动态渲染选项 -->
<select v-model="selected">
  <option v-for="option in options" v-bind:value="option.value" :key="option.text">
    {{ option.text }}
  </option>
</select>
<span>Selected: {{ selected }}</span>

<br />
    <!-- 多选 选择框 -->
<div id="example-6">
  <select v-model="multi_selected" multiple style="width: 50px;">
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <br>
  <span>Multi Selected: {{ multi_selected }}</span>
</div>

</div>

</template>

<script>

var data = {
    message: "message",
    checked: true,
    checkedNames: [],
    picked: '',
    options: [
      { text: 'One', value: 'A' },
      { text: 'Two', value: 'B' },
      { text: 'Three', value: 'C' }
    ],
    selected: '',
    multi_selected: []
}

export default {
  name: 'VueEvent',
  data () {
      return data
  },

  methods: {
      keyEvent: function (event) {
          if (event.key == 1) {
            alert(event.key)
          }
      }
  }
}
</script>

<style>
#VueEvent {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
