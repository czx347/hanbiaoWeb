<template>
  <div>
    <div class="cover"></div>
    <div class="login">
      <div @click="close" class="close">
        <i class="el-icon-close" style="color: white"></i>
      </div>
      <div class="main">
        <div class="input-class">
          <label for="hanma">涵码</label>
          <input id="hanma" v-model="hanma"/>
        </div>
        <div class="input-class">
          <label for="password">密码</label>
          <input type="password" id="password" v-model="password"/>
        </div>
        <div>
          <SlideVerify @verifySuccess="verifySuccess" ref="slideVerify"/>
        </div>
        <button @click="login" class="loginButton">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
  import SlideVerify from 'components/SlideVerify.vue'
  import {hanbiao} from 'network/getData.js'

  export default {
    name: "login",
    data() {
      return {
        verify: false,
        hanma: '',
        password: '',
      }
    },
    methods: {
      close() {
        this.$parent.showLogin = false;
      },
      verifySuccess() {
        this.verify = true;
      },
      login() {
        let loading;
        const that = this
        if (this.verify === true) {
          this.$refs.slideVerify.handleClick();
          this.verify = false;
          if (that.hanma == '' || that.password == '') {
            this.$message({
              message: '请填写完整信息！',
              center: true,
              showClose: true,
              type: 'warning',
            });
            return
          }
          loading = this.$loading({
            lock: true,
            text: '登录中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          new Promise(function (resolve) {
            hanbiao(that.hanma, that.password, resolve, that)
          }).then((data) => {
            loading.close();
            if (data == "-1") {
              this.$message.error('请填写正确的账号');
            } else if (data == "-2") {
              this.$message.error('请填写正确的密码');
            } else {
              that.$emit("getHanmaData", data, that.hanma)
              that.$emit("recover")
            }

          })
        } else {
          this.$message({
            message: '请滑动滑块验证！',
            center: true,
            showClose: true,
            type: 'warning',
          });
        }
      }
    },
    components: {
      SlideVerify,
    },
  }
</script>

<style scoped lang="scss">
  .cover {
    background: #000;
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    filter: alpha(opacity=30);
    opacity: 0.3;
    z-index: 2;
  }

  .login {
    position: fixed;
    z-index: 3;
    margin: auto;
    left: 0;
    right: 0;
    top: 20%;
    opacity: 1;
    background-color: white;
    width: 400px;
    height: 400px;
    border-radius: 10px;
  }

  .close {
    background-color: $darkerAccentColor;
    width: 20px;
    float: right;
    border-radius: 5px;
    text-align: center;
    height: 20px;
    margin: 5px;
    line-height: 20px;
  }

  .main {
    height: 350px;
    width: 400px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
  }

  .loginButton {
  @include removeButton;
    height: 40px;
    width: 370px;
    background-color: $primaryColor;
    color: white;
    border-radius: 30px;
  }

  .input-class {
    height: 40px;
    font-size: 20px;
    width: 370px;

  input {
    width: 270px;
    margin: 0 20px;
  }

  }
</style>