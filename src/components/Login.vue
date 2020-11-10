<template>
  <div >
    <div  label-width="80px">
      <div class="title">用户管理系统</div>
      <el-form>
        <el-form-item>
          <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="user.password" type="password"  placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <img :src="'data:image/png;base64,'+url" alt=""><br>
          <a href="javascript:;" @click="getImg">换一张</a><br><br>
        </el-form-item>
        <el-form-item>
          <el-button class="button-ys" @click="login" type="primary">登录</el-button>
        </el-form-item>
        <el-form-item>
          <a @click="register">注册</a>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>


<script scoped>

    export default {
        name: "Login",
        props: {},
        components: {},
        computed: {},
        data() {
            return {
              user: {},//用来保存用户数据
              url: "",
              code: "",
              timer: false,
            }
        },
        methods: {
          register(){
            this.$router.push("/register");//切换路由
          }
          ,
          getImg(){
            this.getSrc();
          },
          //获取验证码的
          getSrc(){
            var _this = this;
            this.$http.get("http://localhost:8080/monitor/user/getImage?time="+Math.random()).then(res=>{
              console.log(res.data);
              _this.url = res.data;
            });
          },

          login(){
            this.$http.post("http://localhost:8080/monitor/user/login?code="+this.code,this.user).then(res=>{
              if(res.data.state){
                alert(res.data.msg+",点击确定跳转");
                // location.href="/monitor/index.html";
                this.$router.push("/index");//切换路由
              }else{
                alert(res.data.msg);
              }
            });
          },
          indexhref(){
            this.timer=setTimeout(function () {
              this.$http.get("http://localhost:8080/monitor/user/indexhref").then(res => {
                console.log(res.data);
                // location.href = "/monitor/index.html";
                if (res.data.state) {
                  alert(res.data.msg + ",点击确定跳转");
                  //location.href = "/monitor/index.html";
                  this.$router.push("/index");//切换路由
                } else {
                  alert(res.data.msg);
                }
              });
            },500);
          }
        },
        mounted() {
        },
        created() {
          //获取验证码
          this.getSrc();
        }
    }
</script>

<style>

</style>
