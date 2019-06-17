<template>
    <p>
        "username" : {{username}}
        "path" : {{path}}
        "hello" : {{hello}}
    </p>
</template>

<script>

import { openURL } from 'quasar'

export default {
  name: 'Home',
  data () {
    return {
      test: 'test'
    }
  },
  computed: {
    hello () {
      // We will see what `params` is shortly
      console.log('this:', this)
      return this.test
    },
    username () {
      // We will see what `params` is shortly
      return this.$route.params.username
    },
    path () {
      return this.$route.path
    }
  },
  methods: {
    openURL,
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  }
}
</script>

<style>
</style>
