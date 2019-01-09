<template>
  <main class="login" @click="footer">


    <section class="footer">

      <p>@COPYRIGHT 2017 MAYWIDE</p>
    </section>

  </main>
</template>

<script>
  export default {
    data() {
      return {
        selected:'',
        form: {},
        account: '',//WGYX_INTERTEST
        password: '',//123456
        departmentList: [],//部门
        department: '',

      }
    },
    created() {

    },
    methods: {
      footer(){
        console.log(this.selected);
      },
      isLogin() {//登录

        this.$request.loginGet(this.API.HTTP.login, {
          username: this.account,
          password: this.password,
        }, res => {
          console.log(res.code)

          if (res.code = '0000') {
            this.$message({
              message: res.msg,
              type: 'success'
            });
            if (res.statu == '0') {
              localStorage.setItem('isLogin',0);
              localStorage.setItem('token', res.data.token);
              localStorage.setItem('userInfo', JSON.stringify(res.data.userdata));
              this.$router.push({path:'/index/myActive'});
            } else {
              this.$message.error(res.msg);
            }

          } else {
            this.$message.error('res.msg');
          }




        });
      }
    },
  }
</script>
<style type="text/scss" lang="scss">
  body {
    background-attachment: fixed;
    background-size: cover;
  }

  .login {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .loginK {
      .img {
        margin-top:40px;
        width: auto;
      }
      .from {
        width: 60%;
        margin: 0px auto;
        padding-top: 40px;
        .user {
          width: 100%;
          height: 55px;
          line-height: 55px;
          border-bottom: 1px solid #E8E8E8;
        }
        .el-input, .el-select {
          width: 80%;
          float: right;
        }
        .el-input--suffix {
          width: 100%;
        }
        .el-input__inner {
          height: 25px;
          font-size: 16px;
          border: 0;
          border-radius: 0px;
        }
        img {
          width: 20px;
          margin-left: 30px;
          margin-top: 15px;
          float: left;
        }
      }
      .el-button {
        width: 100%;
        height: 55px;
        border: 0;
        border-radius: 30px;
        background: #5e90f6;
        position: absolute;
        bottom: -90px;
        left: 0;
        box-shadow: #3585df 2px 3px 5px 2px;
      }
      text-align: center;
      position: relative;
      width: 480px;
      height: 366px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 3px 16px 0px rgba(91,144,246, 0.8);
      border-radius: 10px;
      opacity: 0.9007999999999999;
      border: 1px solid rgba(91,144,246, 1);
      margin: 0 auto;
      margin-top: 13%;
    }
    .footer {
      padding-top: 120px;
      text-align: center;
      img {
        width: 108px;
        height: 28px;
      }
      p {
        padding-top: 6px;
        line-height: 30px;
        color: #666;
        font-size: 12px;
      }
    }
  }
</style>
