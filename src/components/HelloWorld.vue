<template>
  <div class="hello">
    <p>vuex的状态:{{isLogin}}</p>
    <p>
      <button @click="setIsLogin(true)">改变vuex数值</button>
    </p>
    <button @click="getMock">MOCK的get请求</button>
    <p>getInfo:{{getInfo}}</p>
    <button @click="postMock">MOCK的post请求</button>
    <p>postInfo:{{postInfo}}</p>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'HelloWorld',
  data () {
    return {
      getInfo: '没有请求',
      postInfo: '没有请求'
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  methods: {
    ...mapActions(['setIsLogin']),
    async getMock () {
      this.getInfo = await window._https.get.userInfo({'userName': '大名', 'userPassword': '123456.'})
    },
    async postMock () {
      this.postInfo = await window._https.post.userInfo({'userName': '大名', 'userPassword': '123456.'})
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
