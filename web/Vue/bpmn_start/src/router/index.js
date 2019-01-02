import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Bpmn from '@/Bpmn'
import Modeler from '@/Modeler'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/bpmn',
      name: 'Bpmn',
      component: Bpmn
    },
    {
      path: '/modeler',
      name: 'Modeler',
      component: Modeler
    }
  ]
})
