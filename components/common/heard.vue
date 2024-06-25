<template>
	<div class="wrapChead">
		<header class="tChead">
			<h2 class="userName" @click="homeH()">
				<i class="el-icon-s-custom"></i>物商易购<span>卖家工作台</span>
			</h2>
			<div class="evaluate" v-if="userInfrom">
        <span class="span1" v-if="msgNum > 0" @click="magPage">{{msgNum}}</span>
        <i class="el-icon-bell msg_i" :class="msgNum > 0 ? 'color_i_active':'color_i'" @click="magPage"></i>
				<img :src="userInfrom.shop_logo" alt="" />
				<span>{{userInfrom.mobile}}</span>
				<span @click="signOut">退出</span>
			</div>
		</header>
	</div>
</template>

<script>

	export default{
		name: 'heard',
		data(){
			return {
				userInfrom: {},  // 头部用户信息
        msgNum: '0',  // 信息数量
        msgType: '',  // 消息类型
			}
		},
		created(){
			// 登录信息获取调用
			this.signIn();

      this.getAccountMsg();
		},
		methods:{
			// 退出
			signOut(){
				this.$confirm('您确定退出吗, 是否继续?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning',
				  center: true
				}).then(() => {

					//退出登录调用接口
					this.$sendHttp({
						method: 'post',
						url: `${process.env.VUE_APP_ACCOUNT}sellerlogin/logout`,
						data: {},
					}).then( res => {
						if(res.code == '0'){
							this.$message({
								type: 'success',
								message: '退出成功!',
							});

              // 退出成功
              localStorage.setItem("exit", '1');

							// 删除token
							localStorage.removeItem('token');

							// 调到登录页面页面
							this.$router.push({
								path: '/login'
							})

						}
						else{
							this.$message({
								type: 'success',
								message: `${res.msg}`,
							});
						}
					})
				})
			},

			// 跳到首页
			homeH(){
				this.$router.push({
					path: '/'
				})
			},

			// 获取登录信息
			signIn(){
				this.userInfrom = JSON.parse(window.localStorage.getItem("userInfrom"));

        // 传值给父组件
        this.$emit('shopIfon', this.userInfrom);
			},

      // 获取消息
      getAccountMsg(){
        this.$sendHttp({
          method: 'POST',
          url: `${process.env.VUE_APP_URL}messageinfo/accountmsg`,
          data: {},
        }).then( res => {
          //console.log(res)
          if(res.code == '0'){
            let arr = [];
            arr.push(res.data.account_message.num)
            arr.push(res.data.preferential_promotion.num)
            arr.push(res.data.system_announcement.num)
            arr.push(res.data.transaction_logistics.num)

            let num = 0;
            arr.forEach( item => {
              num += item - 0;
            });
            this.msgNum = num;

          }
        })
      },

      // 点击消息
      magPage(){

        let url = this.$route.path;
        if(url != '/systemMessage'){
          this.$router.push('/systemMessage')
        }

      },

		}
	}
</script>

<style scoped lang="less">
	// 头部样式
	.wrapChead{
		width: 1600px;
		height: 80px;
		background: #687BFF;
		margin: 0 auto;
	}
	.tChead{
		width: 1400px;
		height: 100%;
		margin: 0 auto;
		position: relative;
	}
	.userName{
		line-height: 80px;
		color: #fff;
		width: 200px;
		position: absolute;
		cursor: pointer;
	}
	.userName span{
		font-size: 14px;
		margin-left: 5px;
	}

	// 用户信息
	.evaluate{
		position: absolute;
		right: 140px;
		height: 80px;
		line-height: 80px;

	}
	.evaluate img{
		width: 20px;
		height: 20px;
		border-radius: 50%;
		position: relative;
		top: 5px;
		background-size: contain;
	}
	.evaluate span{
		margin-left: 14px;
		color: #fff;
	}
	.evaluate span:nth-of-type(2){
		cursor: pointer;
	}


  .msg_i{
    font-size: 24px;
    position: relative;
    top: 4px;
    right: 10px;
  }

  .span1{
    color: #fff;
    padding: 2px 6px;
    background-color: #FF0000;
    border-radius: 50%;
    text-align: center;
    font-size: 12px;
    position: relative;
    top: -16px;
    cursor: pointer;
  }

  .color_i_active{
    color: #FF0000;
    cursor: pointer;
  }
  .color_i{
    color: #FFF;
  }


</style>
