<template>

<div id="VueComponent">

   <div id="components-demo">
     <button-counter>component</button-counter>
   </div>

    <!--
        <div>
            <blog-post title="My journey with Vue"></blog-post>
            <blog-post title="Blogging with Vue"></blog-post>
            <blog-post title="Why Vue is so fun"></blog-post>
        </div>
    

        <div>
            <blog-post
                v-for="post in posts"
                v-bind:key="post.id"
                v-bind:title="post.title"
            ></blog-post>
        </div>
    

        <blog-post
            v-for="post in posts"
            v-bind:key="post.id"
            v-bind:post="post"
        ></blog-post>

    <div id="blog-posts-events-demo">
        <div :style="{ fontSize: postFontSize + 'em' }">
            <blog-post
                v-for="post in posts"
                v-bind:key="post.id"
                v-bind:post="post"
                v-on:enlarge-text="postFontSize += $event"
            ></blog-post>
        </div>
    </div>

    -->

    <div id="blog-posts-events-demo">
        <div :style="{ fontSize: postFontSize + 'em' }">
            <blog-post
                v-for="post in posts"
                v-bind:key="post.id"
                v-bind:post="post"
                v-on:onEnlargeText="onEnlargeText"
            ></blog-post>
        </div>
    </div>

    <!-- 
        
        在组建上使用v-model:

        <input v-model="searchText">

        等价于

        <input
            v-bind:value="searchText"
            v-on:input="searchText = $event.target.value"
        > 

        为了让它正常工作，这个组件内的<input>必须：

        将其 value 特性绑定到一个名叫 value 的 prop 上
        在其 input 事件被触发时，将新的值通过自定义的 input 事件抛出
    
    -->
    <div>

        <custom-input v-model="searchText"></custom-input>
        <label>{{searchText}}</label>

    </div>

    <!--
        通过插槽分发内容
     -->

    <alert-box> 这是向插槽添加的内容! </alert-box>

    <!-- 
        动态组件 

        component + vbind:is ：可以动态的切换组件

    -->
    <div id="dynamic-component-demo" class="demo">
        <button
            v-for="tab in tabs"
            v-bind:key="tab"
            v-bind:class="['tab-button', { active: currentTab === tab }]"
            v-on:click="currentTab = tab"
        >{{ tab }}</button>

        <component
            v-bind:is="currentTabComponent"
            class="tab"
        ></component>
    </div>

    <!-- 
        
        解析DOM模版时的注意事项 :

        有些html元素，诸如<ul>, <ol>, <table> 和 <select>, 对于那些元素
        可以出现在其内部是有严格限制的。而有些元素，诸如<li>, <tr> 和 <option>,
        只能出现在其他某些特定的元素内部。

        这会导致我们使用这些约束条件的元素时遇到一些问题。例如：

            <table>
                <blog-post-row></blog-post-row>
            </table>

        这个自定义组件 <blog-post-row> 会被作为无效的内容提升到外部，并导致最终的
        渲染效果出错。 幸好这个特殊的 is 特性给了我们一个变通的方法.

            <table>
                <tr is="blog-post-row"></tr>
            </table>
    
    -->
    



</div>

</template>

<script>

/*
    一个组件的 data 选项必须是一个函数，
    因此每个实例可以维护一份被返回对象的独立的拷贝。

    如果Vue没有这条规则，点击一个按钮就可能会像如下代码一样影响到
    其他所有实例。
*/

/* 

    你可能会有页头，侧边栏，内容区等组件，
    每个组件又包含了像导航链接，博文之类的组建

*/

/*

    //component全局注册
    Vue.component('my-component-name', {
        // ... options ...
    })

    //全局注册的组建可以用在被注册后的的任务(通过new Vue)新创建的Vue根实例，
    //也包括其组建树中所有子组建的模版中。

*/

/* 通过事件向父级组件发送消息, 这个是组件和外界沟通的方式 */



import Vue from 'vue'

var data = {
    count: 0,
    postFontSize: 1,
    searchText: '',
    posts: [
      { 
          id: 1, 
          title: 'My journey with Vue', 
          content: 'journey content',
          publishedAt: 'journey publishedAt',
          comments: 'journey comments'
      },
      { 
          id: 2, 
          title: 'Blogging with Vue',
          content: 'Blogging content',
          publishedAt: 'Blogging publishedAt',
          comments: 'Blogging comments'
      },
      { 
          id: 3, 
          title: 'Why Vue is so fun',
          content: 'Why content',
          publishedAt: 'Why publishedAt',
          comments: 'Why comments'
      }
    ],
    currentTab: 'Home',
    tabs: ['Home', 'Posts', 'Archive'],

}

export default {
  name: 'VueComponent',
  data: function() {
      return data
  },
  methods: {
      onEnlargeText: function (enlargeAmount) {
          this.postFontSize += enlargeAmount
      }
  },
  computed: {
    currentTabComponent: function () {
      return 'tab-' + this.currentTab.toLowerCase()
    }
  }
}

Vue.component('button-counter', {
    data: function () {
        return {
            count: 0
        }
    },
    template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'

})

//通过prop向子组建传递数据
/*
    这儿非常重要的： Vue实例提供了一个自定义事件的系统来解决这个这个问题。

    调用内建的 $emit 方法并传入事件的名字，来向父级组件触发一个事件.

    然后我们可以用 v-on 在博文组件上监听这个事件，就像监听一个原生的DOM事件一样。
*/
Vue.component('blog-post', {
  props: ['post'],
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <button v-on:click="$emit('onEnlargeText', 0.1)">
        Enlarge text
      </button>
      <div v-html="post.content"></div>
    </div>
  `
})


Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
})

Vue.component('alert-box', {
  template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
      <slot></slot>
    </div>
  `
})

Vue.component('tab-home', { 
	template: '<div>Home component</div>' 
})
Vue.component('tab-posts', { 
	template: '<div>Posts component</div>' 
})
Vue.component('tab-archive', { 
	template: '<div>Archive component</div>' 
})

</script>

<style>
#VueComponent {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
