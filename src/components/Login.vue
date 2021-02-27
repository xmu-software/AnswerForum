<template>
  <div class="content">
    <div class="form sign-in">
      <h2>欢迎回来</h2>
      <label>
        <span>账号</span>
        <input type="text" v-model="userForm.account"/>
      </label>
      <label>
        <span>密码</span>
        <input type="password" v-model="userForm.password"/>
      </label>
      <p class="forgot-pass"><a href="javascript:">忘记密码？</a></p>
      <button type="button" class="submit"  @click="login">登 录</button>
      <button type="button" class="fb-btn"  @click="adminLogin">管理员登录</button>
    </div>
    <div class="sub-cont">
      <div class="img">
        <div class="img__text m--up">
          <h2>还未注册？</h2>
          <p>立即注册，发现大量机会！</p>
        </div>
        <div class="img__text m--in">
          <h2>已有帐号？</h2>
          <p>有帐号就登录吧，好久不见了！</p>
        </div>
        <div class="img__btn">
          <span class="m--up">注 册</span>
          <span class="m--in">登 录</span>
        </div>
      </div>
      <div class="form sign-up">
        <h2>立即注册</h2>
        <label>
          <span>用户名</span>
          <input type="text" v-model="userForm.username"/>
        </label>
        <label>
          <span>账号</span>
          <input type="text" v-model="userForm.account"/>
        </label>
        <label>
          <span>密码</span>
          <input type="password" v-model="userForm.password"/>
        </label>
        <button type="button" class="submit" @click="register">注 册</button>
        <button type="button" class="fb-btn">使用 <span>QQ</span> 帐号注册</button>
      </div>
    </div>
  </div>
</template>

<script>
  // import getToken from '../../main.js'
  export default {
    name: 'Login',
    data: function () {
      return{
        showErr:false,
        showSuc:false,
        userForm:{
          username:'',
          // e-mail:'',
          account: '',
          password:'',
        },
        // token:'',
      }
    },
    methods:{
      register:function(){
        if (this.userForm.username===''){
          this.$message.warning("请输入用户名")
        }
        else if (this.userForm.account===''){
          this.$message.warning("请输入账号")
        }
        else if (this.userForm.password === '') {
          // alert('输入密码!');
          this.$message.warning("请输入密码");
        } else if(this.userForm.username!=''&& this.userForm.account!=''&&this.userForm.password!== ''){
          this.axios({
            headers:{
              "Access-Control-Allow-Origin": "*",
              'Content-Type':'application/json'
            },
            url:'/api/register',
            crossDomain:true,
            method:'post',
            data: this.userForm,
            withCredentials : true
          }).then(res=>{
            console.log(res)
            if(res.data===1){
              this.$message.warning("注册成功，赶快登录吧")
            }
          })
        }
      },
      adminLogin: function(){
        window.open("http://8.129.163.25:81/")
        // let _this=this;
        // let _id=-1;
        // let admin ={
        //   account: _this.userForm.account,
        //   password: _this.userForm.password,
        // }
        // if (this.userForm.password === '') {
        //   alert('输入密码!');
        // } else {
        //   this.axios({
        //     method: 'post',
        //     url: _this.host+'/admin/login',
        //     // contentType: 'application/json',
        //     data:admin
        //   }).then(res=>{
        //     console.log(admin)
        //     console.log(res.data)
        //     if(res.data > 0){
        //       // _id=res.data.data.id;
        //       // _this.token=res.data.data.token;
        //       _this.$router.push({name: 'OwnerManage'})
        //       _this.showErr=false;
        //     }
        //     else {
        //       _this.showErr = true;
        //     }
        //   }).catch(error=>{
        //     alert('账号或密码错误');
        //     console.log(error);
        //   })
        // }
      },
      login:function () {
        let _this=this;
        let _id=-1;
        let user={
          account: _this.userForm.account,
          password: _this.userForm.password,
        }

        if (this.userForm.account===''){
          this.$message.warning("请输入账号")
        }
        if (this.userForm.password === '') {
          // alert('输入密码!');
          this.$message.warning("请输入密码");
        } else {
          // console.log("gaogao")
          this.axios({
            headers:{
              "Access-Control-Allow-Origin": "*",
              'Content-Type':'application/json'
            },
            method: 'post',
            url: '/api/login',
            data: user,
          }).then(res=>{
            console.log(res)
            let id=res.data
            if(res.data===-2){
              this.$message.warning("您的账号已被封禁，请联系管理员")
            }
            else if(res.data > 0){
              this.$message.success("登陆成功")
              localStorage.setItem('id',res.data)

              // console.log(getToken())
              // session.getAttribute("USER_SESSION")

              // _this.$store.dispatch('getUser',id)
              _this.$router.push({name: 'Home'})
            }

            else if(res.data===-1){
              this.$message.warning("账号密码错误，请检查后重新输入");
              // _this.showErr = true;
            }
          }).catch(error=>{
            this.$message.warning("请检查网络连接")
            console.log(error);
          })
        }
      }
    },
    mounted() {
      document.querySelector('.img__btn').addEventListener('click', function() {
        document.querySelector('.content').classList.toggle('s--signup')
      })
    },
    created () {
      // window.document.body.style.backgroundColor = 'rgba(254, 237, 186, 0.64)';
    },
    // beforeDestroy () {
    //   window.document.body.style.removeProperty('backgroundColor')
    // }

  }
</script>

<style scoped>
  @import "../../css/Loginstyle.css";


</style>
