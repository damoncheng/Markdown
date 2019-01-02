import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import GetStart from '@/components/GetStart'
import VueInstance from '@/components/VueInstance'
import VueEvent from '@/components/VueEvent'
import VueComponent from '@/components/VueComponent'
import Bpmn from '@/components/VueBPMN'
import BpmnStart from '@/components/VueBPMNStart'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/getStart',
      name: 'GetStart',
      component: GetStart
    },
    {
      path: '/vueInstance',
      name: 'VueInstance',
      component: VueInstance
    },
    {
      path: '/vueEvent',
      name: 'VueEvent',
      component: VueEvent
    },
    {
      path: '/vueComponent',
      name: 'VueComponent',
      component: VueComponent
    },
    {
      path: '/bpmn',
      name: 'bpmn',
      component: Bpmn
    },
    {
      path: '/bpmnStart',
      name: 'BpmnStart',
      component: BpmnStart
    },
  ]
})
