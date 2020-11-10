<template>
<div>
  <h1 class="index-title">后台管理系统</h1>

  <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>用户</span>
      </template>
      <el-menu-item-group v-for="(user,index1) in userName" :key="index1">
        <a href="javascript:;" @click="findbyusername(user);Init()">
          <el-menu-item index="1-1">{{user}}</el-menu-item>
        </a>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>

  <div class="main-box">
    <img class="main-box-img" :src="'data:image/png;base64,'+encoding">
    <div class="main-box-option">
      <el-button-group>
        <el-button type="primary" icon="el-icon-video-play" @click="autoplay">自动播放</el-button>
        <el-button type="primary" icon="el-icon-video-pause" @click="stopautoplay">停止播放</el-button>
        <el-button type="primary" icon="el-icon-refresh" @click="Init">刷新</el-button>
        <el-button type="primary" icon="el-icon-document-delete" @click="deleteall">删除用户信息</el-button>
        <el-button type="primary" icon="el-icon-circle-close" @click="logout">退出登录</el-button>
      </el-button-group>
    </div>
    <table class="table" align="center">
      <tr v-for="(picture,index) in pictures" :key="picture.id">
        <td>
          <a href="javascript:;" @click="getImage(picture.id);getMessage(picture.id);getErr(picture.id);getIndex(index)">
            {{picture.time}}
          </a>&nbsp;
        </td>
      </tr>
    </table>
    <el-input class="textarea-box" type="textarea" :rows="3" placeholder="请输入内容" v-model="message"></el-input>
  </div>

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
      pictures: [], //用来保存用户数据
      picture: {
        id: "",
        time: "",
        pic: "",
        message: ""
      },
      encoding: "",
      message: "",
      err: "",
      Id: "",
      timer: null,
      timer1: null,
      timer2: null,
      timer3: null,
      index: "",
      count: "",
      userName: []
    }
  },
  methods: {
    select() {
      var _this = this;
      this.$http.get("http://localhost:8080/monitor/pic/select").then(res => {
        console.log(res.data);
        _this.pictures = res.data;
      });
    },
    findusername() {
      var _this = this;
      this.$http.get("http://localhost:8080/monitor/pic/findusername").then(res => {
        console.log(res.data);
        _this.userName = res.data;
      });
    },

    findbyusername(username) {
      var _this = this;
      this.$http.get("http://localhost:8080/monitor/pic/findbyusername?username=" + username).then(res => {
        console.log(res.data);
        _this.pictures = res.data;
      });
    },
    deleteall() {
      var _this = this;
      this.$http.get("http://localhost:8080/monitor/pic/deleteall").then(res => {
        if (res.data.state) {
          alert(res.data.msg);
          _this.Init();
        } else {
          alert(res.data.msg);
        }
      });
    },
    getImage(id) {
      var _this = this;
      this.$http.get("http://localhost:8080/monitor/pic/getImage?id=" + id).then(res => {
        _this.encoding = res.data;
      });
    },
    getMessage(id) {
      var _this = this;
      this.$http.get("http://localhost:8080/monitor/pic/getMessage?id=" + id).then(res => {
        _this.message = res.data;
      });
    },
    getErr(id) {
      var _this = this;
      this.$http.get("http://localhost:8080/monitor/pic/getErr?id=" + id).then(res => {
        _this.err = res.data.msg;
        if (_this.err != null && _this.err != "无黑名单关键词") {
          _this.stopautoplay();
          this.$confirm("发现关键词：" + _this.err + "!");
          //window.alert("发现关键词："+_this.err+"!");
        }
      });
    },
    getIndex(index) {
      var _this = this;
      _this.index = index;
    },
    //自动播放
    autoplay() {
      var _this = this;
      _this.count = _this.pictures.length;
      console.log("_this.count:" + _this.count);
      this.timer = setInterval(function () {
        if (_this.index < _this.count) {
          _this.picture = _this.pictures[_this.index];
          console.log(_this.picture);
          _this.getImage(_this.picture.id);
          _this.getMessage(_this.picture.id);
          _this.getErr(_this.picture.id);
          _this.index++;
        }
      }, 1500)
    },
    //停止播放
    stopautoplay() {
      window.clearInterval(this.timer);
    },
    Init() {
      let _this = this;
      this.timer = setTimeout(function () {
        _this.count = _this.pictures.length;
        if (_this.count >= 1) {
          _this.index = 0;
        }
        console.log("_this.count:" + _this.count);
        if (_this.count > 0) {
          _this.picture = _this.pictures[0];
          _this.getImage(_this.picture.id);
          _this.getMessage(_this.picture.id);
          _this.getErr(_this.picture.id);
        } else {
          _this.encoding = "";
          _this.message = "";
          _this.err = "";
        }
      }, 1000)
    },

    logout() {
      this.$http.get("http://localhost:8080/monitor/user/logout1").then(res => {
        if (res.data.state) {
          alert(res.data.msg);
          this.$router.push("/login"); //切换路由
        } else {
          alert(res.data.msg);
        }
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted() {},
  created() {
    this.findusername();
  },
  beforeDestroy() {
    window.clearInterval(this.timer);
    this.timer = null;
    window.clearTimeout(this.timer1);
    this.timer1 = null;
  }
}
</script>

<style lang="less" scoped>
.index-title {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  text-align: center;
  line-height: 60px;
  background-color: rgb(84, 92, 100);
  color: #FFF;
  font-size: 28px;
  letter-spacing: 6px;
  z-index: 10;
}

.el-menu-vertical-demo {
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  width: 240px;
  z-index: 10;
}

.main-box {
  margin: 60px 0 0 240px;
  padding: 18px;

  &-img {
    display: block;
    width: auto;
    height: 500px;
    margin: 0 auto;
  }

  &-option {
    margin: 16px auto;
    text-align: center;
  }

  .textarea-box {
    display: block;
    width: 582px;
    margin: 0 auto;
  }
}
</style>
