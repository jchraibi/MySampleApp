<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://www.openshift.com/" target="_blank">OpenShift</a></li>
      <li><a href="https://github.com/" target="_blank">GitHub</a></li>
      <li><a href="https://probot.github.io" target="_blank">Probot</a></li>
      <li><a href="https://github.com/github/gh-ost" target="_blank">gh-ost</a></li>
      <li><a href="https://github.com/github/scientist" target="_blank">Scientist</a></li>
      <li><a href="https://github.com/jnunemaker/flipper" target="_blank">Flipper</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
