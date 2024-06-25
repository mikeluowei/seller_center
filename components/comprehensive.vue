<template>
	<div>

		<div class="userIf" v-if="userName">
			<div class="logo">
				<img :src="userName.shop_logo"/>
				<span>{{userName.shop_name}}</span>
			</div>
			<div class="user_enterprise">
				<p><span v-if="userName.mobile">账号：{{userName.mobile}}</span><!-- <span class="contacts">联系人：{{contacts}}</span> --></p>
				<p v-if="userName.shop_name">企业：{{userName.shop_name}}</p>
			</div>
		</div>
    
		<div class="state">
			<ul>
				<li v-for="(item, index) in information" :key="index">
					<p :class="(index == 5) ? 'active' : 'green' ">{{item.num}}</p>
					<p class="text">{{item.title}}</p>
				</li>
			</ul>
		</div>
    
		<div class="operate">
			<div class="user_operate">
				<h4 class="hTitle">用户运营</h4>
			</div>
			<div class="good_operate">
				<h4 class="hTitle">商品运营</h4>
			</div>
		</div>
    
	</div>
</template>

<script>
	export default{
		name: 'comprehansive',
		data(){
			return {
				information: [
					{num: 0, title: '待付款'},
					{num: 0, title: '待发货'},
					{num: 0, title: '待退款售后'},
					{num: 0, title: '待评价'},
					{num: 0, title: '物流异常'},
					{num: 0, title: '违规提醒'}
				],
				account: '13888888888',
				contacts: '肖长春',
				company: '深圳多智云科技有限公司',
				userName: {},  // 用户信息
			}
		},
		created(){
			// 获取登录信息调用
			this.signIn();
		},
		components: {

		},
		methods: {
			// 获取登录信息
			signIn(){
				this.$sendHttp({
					method: 'post',
					url: `${process.env.VUE_APP_ACCOUNT}seller/sellerinfo`,
					data: {}
				}).then( res => {

					if(res.code == '0'){
						this.userName = res.data;
					}
					else{
						this.$message({
							type: 'warning',
							message: `${res.msg}`,
						});
					}
				})
			},
		},
	}
</script>

<style scoped lang="less">

	// 用户信息css
	.userIf{
		width: 100%;
		height: 140px;
		background: #fff;
		margin-bottom: 20px;
		padding-top: 14px;
	}
	.logo{
		margin-left: 20px;
		height: 64px;
		line-height: 64px;
		color: #a30014;
	}
	.logo img{
		width: 64px;
		height: 64px;
		border-radius: 50%;
		background: #aaa;
	}
	.logo span{
		vertical-align: top;
		margin-left: 20px;
	}

	.user_enterprise{
		height: 60px;
		margin-left: 100px;
	}
	.user_enterprise p{
		height: 32px;
		line-height: 32px;
		color: #aaa;
	}
	.contacts{
		margin-left: 40px;
	}

	// 店铺信息css
	.state{
		width: 100%;
		height: 100px;
		background: #fff;
	}
	.state li{
		width: 143px;
		display: inline-block;
		text-align: center;
		height: 100px;
		padding: 30px 0;
	}
	.state li:last-child{
		width: 145px;
	}
	.state li:hover{
		cursor: pointer;
		background: lightyellow;
	}

	.active{
		color: #f23c3c;
	}
	.green{
		color: #3386f1;
	}
	.text{
		color: #626262;
	}

	// 运营信息，css
	.operate{
		margin-top: 20px;
		width: 100%;
	}

	.user_operate,
	.good_operate{
		display:inline-block;
		width: 476px;
		height: 400px;
		background: #fff;
		border-radius: 6px;
		padding: 16px;
	}

	.user_operate{
		margin-right: 20px;
	}

	.hTitle{
		font-size: 18px;
	}
</style>
