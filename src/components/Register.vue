<template>
  <div>
    <div>用户注册</div>
    <form  method="post">
      <input type="text" v-model="user.username" placeholder="请输入用户名" name="username" > <br>
      <input type="text" v-model="user.password" placeholder="请输入密码" name="password"> <br>
      <input type="primary" class="button" @click="register" value="注册">
    </form>
    <a @click="login">登录</a>
  </div>
</template>

<script scoped>
    export default {
        name: "",
        props: {},
        components: {},
        computed: {},
        data() {
            return {
              user:{},//用来保存用户数据
            }
        },
        methods: {
          login(){
            this.$router.push("/login");//切换路由
          },
          //用来注册用户信息
          register(){
            this.$http.post("http://localhost:8080/monitor/user/register",this.user).then(res=>{
              if(res.data.state){
                alert(res.data.msg+",点击确定跳转");
                this.$router.push("/login");//切换路由
              }else{
                alert(res.data.msg);
              }
            });
          }
        },
        mounted() {
        },
        created() {
        }
    }
</script>

<style scoped>

</style>
