<template>
	<div class="application">
		<div class="headTitle">
			<h2>我的应用</h2>
			<i class="el-icon-arrow-right"></i>
		</div>

		<div class="commonly_used">
			<h3>常用操作</h3>
			<div class="two_menu">
				<p v-for="(item, index) in commonly" :key="index" @click="twoMenuUrlJump(item)">{{item.title}}</p>
			</div>
		</div>

		<div class="operation_category">
			<div class="one_menu" @click="transactionShow = !transactionShow">
        <img src="../../assets/imgs/home/transaction.png" alt="" class="marketing" />
        <h3>交易管理</h3>
        <i class="el-icon-arrow-right after" :class="transactionShow ? 'menu_arrow_show': 'menu_arrow_hide'"></i>
      </div>
			<div class="operation_two_menu" v-if="transactionShow">
				<p v-for="(item, index) in transaction" :key="index" @click="twoMenuUrlJump(item)" :class="{'active': item.activeClass}">{{item.title}}</p>
			</div>
		</div>

    <div class="operation_category">
    	<div class="one_menu" @click="walletShow = !walletShow">
        <p class="icon-qiandaijinbi iconfont icon_img"></p>
        <h3>钱包</h3>
        <i class="el-icon-arrow-right after" :class="walletShow ? 'menu_arrow_show': 'menu_arrow_hide'"></i>
      </div>
    	<div class="operation_two_menu" v-if="walletShow">
    		<div v-for="(item, index) in wallet" :key="index">
          <p :class="{'active': item.activeClass}" @click="twoMenuUrlJump(item)">{{item.title}}</p>
        </div>
    	</div>
    </div>

		<div class="operation_category">
			<div class="one_menu" @click="goodsShow = !goodsShow">
        <i class="el-icon-goods befor"></i>
        <h3>商品管理</h3>
        <i class="el-icon-arrow-right after" :class="goodsShow ? 'menu_arrow_show': 'menu_arrow_hide'"></i>
      </div>
			<div class="operation_two_menu" v-if="goodsShow">
				<div v-for="(item, index) in goods" :key="index">
          <p v-if="item.show" :class="{'active': item.activeClass}" @click="twoMenuUrlJump(item)">{{item.title}}</p>
        </div>
			</div>
		</div>

    <div class="operation_category" v-if="shopType > 1">
      <div class="one_menu" @click="distributionMarketShow = !distributionMarketShow">
        <p class="iconfont icon-iconfenxiao icon_img"></p>
        <h3>分销市场</h3>
        <i class="el-icon-arrow-right after" :class="distributionMarketShow ? 'menu_arrow_show': 'menu_arrow_hide'"></i>
      </div>
    	<div class="operation_two_menu" v-if="distributionMarketShow">
    		<p v-for="(item, index) in distributionMarket" :key="index" :class="{'active': item.activeClass}" @click="twoMenuUrlJump(item)">{{item.title}}</p>
    	</div>
    </div>

		<div class="operation_category">
			<div class="one_menu" @click="marketingCenterShow = !marketingCenterShow">
        <img src="../../assets/imgs/home/marketing.png" alt="" class="marketing" />
        <h3>营销中心</h3>
        <i class="el-icon-arrow-right after" :class="marketingCenterShow ? 'menu_arrow_show': 'menu_arrow_hide'"></i>
      </div>
			<div class="operation_two_menu" v-if="marketingCenterShow">
				<div v-for="(item, index) in marketingCenter" :key="index">
          <p v-if="item.show" :class="{'active': item.activeClass}" @click="twoMenuUrlJump(item)">{{item.title}}</p>
        </div>
			</div>
		</div>

    <div class="operation_category">
    	<div class="one_menu" @click="afterSaleShow = !afterSaleShow">
        <img src="../../assets/imgs/home/afte.png" alt="" class="marketing" />
        <h3>售后处理</h3>
        <i class="el-icon-arrow-right after" :class="afterSaleShow ? 'menu_arrow_show': 'menu_arrow_hide'"></i>
      </div>
    	<div class="operation_two_menu" v-if="afterSaleShow">
    		<p v-for="(item, index) in afterSale" :key="index" :class="{'active': item.activeClass}" @click="twoMenuUrlJump(item)">{{item.title}}</p>
    	</div>
    </div>

    <div class="operation_category">
    	<div class="one_menu" @click="shopTubeShow = !shopTubeShow">
        <p class="iconfont icon-icondianpu icon_img"></p>
        <h3>店铺管理</h3>
        <i class="el-icon-arrow-right after" :class="shopTubeShow ? 'menu_arrow_show': 'menu_arrow_hide'"></i>
      </div>
    	<div class="operation_two_menu" v-if="shopTubeShow">
        <div v-for="(item, index) in shopTube" :key="index">
          <p v-if="item.show" @click="twoMenuUrlJump(item)" :class="{'active': item.activeClass}">{{item.title}}</p>
        </div>
    	</div>
    </div>

    <div class="operation_category">
      <div class="one_menu" @click="distributionMenuShow = !distributionMenuShow">
        <p class="iconfont icon-iconfenxiao icon_img"></p>
        <h3>分销管理</h3>
        <i class="el-icon-arrow-right after" :class="distributionMenuShow ? 'menu_arrow_show': 'menu_arrow_hide'"></i>
      </div>
    	<div class="operation_two_menu" v-if="distributionMenuShow">
    		<p v-for="(item, index) in distribution" :key="index" :class="{'active': item.activeClass}" @click="twoMenuUrlJump(item)">{{item.title}}</p>
    	</div>
    </div>

    <div class="operation_category">
    	<div class="one_menu" @click="setAccountShow = !setAccountShow">
        <img src="../../assets/imgs/home/user.png" alt="" class="marketing" />
        <h3>账号管理</h3>
        <i class="el-icon-arrow-right after" :class="setAccountShow ? 'menu_arrow_show': 'menu_arrow_hide'"></i>
      </div>
    	<div class="operation_two_menu" v-if="setAccountShow">
        <div v-for="(item, index) in setAccount" :key="index">
          <p v-if="item.show" @click="twoMenuUrlJump(item)" :class="{'active': item.activeClass}">{{item.title}}</p>
        </div>
    	</div>
    </div>

    <div class="operation_category">
    	<div class="one_menu" @click="configCoreShow = !configCoreShow">
        <i class="el-icon-refresh befor"></i>
        <h3>配置中心管理</h3>
        <i class="el-icon-arrow-right after" :class="configCoreShow ? 'menu_arrow_show': 'menu_arrow_hide'"></i>
      </div>
    	<div class="operation_two_menu" v-if="configCoreShow">
    		<p v-for="(item, index) in configCore" :key="index" :class="{'active': item.activeClass}" @click="twoMenuUrlJump(item)">{{item.title}}</p>
    	</div>
    </div>

    <div class="operation_category">
    	<div class="one_menu" @click="msgManageShow = !msgManageShow">
        <i class="el-icon-bell befor"></i>
        <h3>消息管理</h3>
        <i class="el-icon-arrow-right after" :class="msgManageShow ? 'menu_arrow_show': 'menu_arrow_hide'"></i>
      </div>
    	<div class="operation_two_menu" v-if="msgManageShow">
    		<p v-for="(item, index) in msgManage" :key="index" :class="{'active': item.activeClass}" @click="twoMenuUrlJump(item)">{{item.title}}</p>
    	</div>
    </div>

    <div class="operation_category">
    	<div class="one_menu" @click="serviceShow = !serviceShow">
        <i class="icon-fuwu iconfont icon_img"></i>
        <h3>服务</h3>
        <i class="el-icon-arrow-right after" :class="serviceShow ? 'menu_arrow_show': 'menu_arrow_hide'"></i>
      </div>
    	<div class="operation_two_menu" v-if="serviceShow">
        <div v-for="(item, index) in service" :key="index">
          <p v-if="item.show"  :class="{'active': item.activeClass}" @click="twoMenuUrlJump(item)">{{item.title}}</p>
        </div>
    	</div>
    </div>

	</div>
</template>

<script>
	export default{
		name: 'leftSidebar',
		data(){
			return {
				commonly: [
          {title: '发布商品', path: '/categorys'},
          {title: '优惠券活动', path: '/coupon'}
        ],   //常用操作数据
        transaction: [
          {title: '交易订单', activeClass: false, path: '/transactionOrder', meun: 1},
          {title: '转账认款', activeClass: false, path: '/recognition', meun: 1},
          {title: '评价管理', activeClass: false, path: '/evaluateList', meun: 1},
          {title: '开发票管理', activeClass: false, path: '/drawBillList', meun: 1},
        ],   // 交易管理数组
				goods: [
          {title: '发布商品', show: true, activeClass: false, path: '/categorys', meun: 2},
          {title: '出售中的商品', show: true, activeClass: false, path: '/inSale', meun: 2},
          {title: '仓库中的商品', show: true, activeClass: false, path: '/warehouse', meun: 2},
          {title: '商品审核列表', show: false, activeClass: false, path: '/examineGoodsList', meun: 2},
          {title: '副标题管理', show: true, activeClass: false, path: '/subheading', meun: 2},
          {title: '批量改价', show: true, activeClass: false, path: '/batchRevPrice', meun: 2},
          {title: '批量上下架', show: true, activeClass: false, path: '/batchOffShelf', meun: 2},
        ],  //商品管理数据
				marketingCenter: [
          {title: '优惠券活动', show: true, activeClass: false, path: '/coupon', meun: 3},
          {title: '社区优惠券活动', show: true, activeClass: false, path: '/communityCoupon', meun: 3},
          {title: '促销活动', show: true, activeClass: false, path: '/spike', meun: 3},
          {title: '预售活动', show: true, activeClass: false, path: '/preSale', meun: 3},
          {title: '满减活动', show: true, activeClass: false, path: '/fullReductionList', meun: 3},
          {title: '拉新活动', show: true, activeClass: false, path: '/pullNewList', meun: 3},
          {title: '团购活动', show: true, activeClass: false, path: '/groupBuyingList', meun: 3},
          {title: '万家团活动', show: true, activeClass: false, path: '/wanJiaGroupList', meun: 3},
        ],   // 营销中心数据
        afterSale: [
          {title: '退货退款', activeClass: false, path: '/refund', meun: 4},
          {title: '仅退款', activeClass: false, path: '/onlyRefund', meun: 4},
          {title: '售后地址管理', activeClass: false, path: '/afterAdderList', meun: 4},
        ],  // 售后处理
        shopTube: [
          {title: '店铺信息', show: true, activeClass: false, path: '/shopInfo', meun: 5},
          {title: '店铺装修', show: false, activeClass: false, path: '/renovation', meun: 5},
          {title: '店铺分类', show: false, activeClass: false, path: '/shopClass', meun: 5},
          {title: '店铺推荐', show: false, activeClass: false, path: '/shopRecomList', meun: 5},
          {title: '店铺资讯', show: false, activeClass: false, path: '/shopArticleList', meun: 5}
        ], // 店铺管理
        distributionMarket: [
          {title: '分销市场', activeClass: false, path: '/distributionMarket', meun: 10},
          {title: '我的分销', activeClass: false, path: '/myDistribution', meun: 10},
        ],  // 分销市场
        distribution: [
          {title: '分销商品列表', activeClass: false, path: '/distributionList', meun: 6},
          {title: '邀请分销合伙人', activeClass: false, path: '/inviteDistribution', meun: 6},
          {title: '我的分销合伙人', activeClass: false, path: '/distributionPartnerList', meun: 6},
        ],  // 分销管理
        setAccount: [
          {title: '修改账号', show: true, activeClass: false, path: '/setAccount', meun: 7},
          {title: '修改密码', show: true, activeClass: false, path: '/setPassword', meun: 7},
          {title: '创建子账号', show: true, activeClass: false, path: '/creSubAccount', meun: 7},
          {title: '子账号列表', show: true, activeClass: false, path: '/sonAccountList', meun: 7},
          {title: '创建部门', show: true, activeClass: false, path: '/departmentList', meun: 7},
          {title: '角色管理', show: true, activeClass: false, path: '/roleList', meun: 7},
        ],    // 账号管理数组
        configCore: [
          {title: '物流服务模板', activeClass: false, path: '/logistics', meun: 8},
          {title: '售后政策管理', activeClass: false, path: '/afterSale', meun: 8},
          {title: '供应商管理', activeClass: false, path: '/supplier', meun: 8},
        ],   // 配置中心管理
        msgManage: [
          {title: '系统通知', activeClass: false, path: '/systemMessage', meun: 9},
        ],  // 休息管理
        service: [
          {title: '帮助中心', show: true, activeClass: false, path: '/helpCenter', meun: 11},
          {title: '操作日志', show: true, activeClass: false, path: '/operationLog', meun: 11},
        ],  // 服务
        wallet: [
          {title: '销售收入', activeClass: false, path: '/salesRevenue', meun: 12},
          {title: '分销收入', activeClass: false, path: '/distributionRevenue', meun: 12},
        ],  // 钱包
        transactionShow: false,  // 交易管理二级菜单是否显示
        goodsShow: false,  // 商品管理二级菜单是否显示
        marketingCenterShow: false,  // 营销中心二级菜单是否显示
        setAccountShow: false,  // 账号管理二级菜单是否显示
        afterSaleShow: false,   // 售后处理二级菜单是否显示
        distributionMarketShow: false, // 分销市场二级菜单是否显示
        distributionMenuShow: false,  // 分销商品二级菜单是否显示
        shopTubeShow: false,  // 店铺管理二级菜单是否显示
        configCoreShow: false, // 配置中心管理二级菜单是否显示
        msgManageShow: false,  // 消息管理二级菜单是否显示
        serviceShow: false,  // 服务管理二级菜单
        walletShow: false,  // 钱包二级菜单
        shopType: '',  // 店铺类型
			}
		},

    created() {

    },
    mounted() {
      // 左侧导航高亮
      this.clickActive();

      // 根据登录信息做菜单导航条控制
      this.signIn();
    },
		methods:{
      // 根据登录信息做菜单导航条控制
      signIn(){
      	let {shop_type, is_own, sku_check} = JSON.parse(window.localStorage.getItem("userInfrom"));

        // 判断是否自营店铺
        this.shopType = shop_type;

      	// 账户管理如果是子账户登录就隐藏创建子账户，部门和角色
      	if(is_own == '0'){
      	  this.setAccount[2].show = false;
      	  this.setAccount[3].show = false;
      	  this.setAccount[4].show = false;
          this.setAccount[5].show = false;
		  this.service[1].show = false;
      	};

        // 店铺管理
      	if(shop_type != '1'){
      	   // 店铺管理
      	  this.shopTube[1].show = true;
      	  this.shopTube[2].show = true;
      	  this.shopTube[3].show = true;
      	  this.shopTube[4].show = true;
      	}
      	else{
      	  // 店铺管理
      	  this.shopTube[1].show = false;
      	  this.shopTube[2].show = false;
      	  this.shopTube[3].show = false;
      	  this.shopTube[4].show = false;
      	};

        // 商品审核列表
        if(sku_check == '1'){
          this.goods[3].show = true;
        }

        // 社区店铺才显示
        if(shop_type != '3'){
          this.marketingCenter[1].show = false;
        }

      },

      // 二级菜路由跳转
      twoMenuUrlJump(item){
        this.$router.push({
        	path: item.path,
        })
      },

      // 左侧导航高亮事件处理
      clickActive(){
        let oneMenu = null;
        let twoMenu = this.$route.path;
        let arr = [this.goods, this.marketingCenter, this.transaction, this.setAccount, this.afterSale, this.distribution, this.shopTube, this.configCore, this.msgManage,
          this.distributionMarket, this.service, this.wallet,
        ]

        // 二级高亮
        for(let i=0; i<arr.length; i++){
        	for(let j=0; j<arr[i].length; j++){
        		if(arr[i][j].path == twoMenu){
        			arr[i][j].activeClass = true;
              oneMenu = arr[i][j].meun;
        		}
        		else{
        			arr[i][j].activeClass = false;
        		}
        	}
        }

        // 处理2级以下菜单
        if(oneMenu == null){
          // 交易管理二级已下菜单
          let menuArr1 = ['/transactionDetails', '/evaluatePro', '/invoiceDetail'];
          // 商品管理二级已下菜单
          let menuArr2 = ['/examineGoodDetail', '/vipPriceMaintain', '/newAddSku'];
          // 营销中心二级已下菜单
          let menuArr3 = ['/newCoupon', '/cSSpread', '/newSpike', '/spikeGoodsList', '/spikeGoods', '/applyCommunityCoupon', '/newPreSale',
                  '/preSaleAddGoods', '/associatedGoods', '/homeApplyDeyail', '/modifyFullReduction', '/fullReductionGoodsList', '/fullReductionGoods',
                   '/newGroupBuying', '/groupGoodsList', '/groupAddGood', '/newPullNew', '/pullNewGoodsList', '/pullNewAddGoods'
                ];
          // 售后处理二级已下菜单
          let menuArr4 = ['/salesDetails', '/afterAddress'];
          // 店铺管理二级已下菜单
          let menuArr5 = ['/setShopInfo', '/mapImgList', '/newMapPlate', '/setMapImage', '/newImage', '/setShopClass', '/shopRecom', '/goodsRelaOper', '/setGoodsRelaOper', '/recommRelaGoods', '/shopArticle', '/pageModularList', '/newModular', '/modularContentList', '/newModularContent'];
          // 分销管理二级已下菜单
          let menuArr6 = ['/setCommission', '/partnerDetalis', '/contributionList'];
          // 账号管理二级已下菜单
          let menuArr7 = ['/creDepartment', '/roleList', '/creRole', '/sonJurisdiction', '/modifySonPasw'];
          // 配置中心管理二级已下菜单
          let menuArr8 = ['/newSupplier', '/newLogistics', '/newAfterSale'];
          // 消息管理二级已下菜单
          let menuArr9 = [''];
          // 分销市场
          let menuArr10 = [''];
          // 服务
          let menuArr11 = ['/serveTwoMenu', '/helpFileDetails'];

          let menuThree = [menuArr1, menuArr2, menuArr3, menuArr4, menuArr5, menuArr6, menuArr7, menuArr8, menuArr9, menuArr10, menuArr11];

          for(let k=0; k<menuThree.length; k++){
          	for(let t=0; t<menuThree[k].length; t++){
          		if(menuThree[k][t] == twoMenu){
                oneMenu = (k + 1);
          		}
          	}
          }
        }

        // 一级展示
        switch (oneMenu) {
        	  case 1:
        		  this.transactionShow = true;
        		  break;
        	  case 2:
        	    this.goodsShow = true;
        	    break;
            case 3:
              this.marketingCenterShow = true;
              break;
            case 4:
              this.afterSaleShow = true;
              break;
            case 5:
              this.shopTubeShow = true;
              break;
            case 6:
              this.distributionMenuShow = true;
              break;
            case 7:
              this.setAccountShow = true;
              break;
            case 8:
              this.configCoreShow = true;
              break;
            case 9:
              this.msgManageShow = true;
              break;
            case 10:
              this.distributionMarketShow = true;
              break;
            case 11:
              this.serviceShow = true;
              break;
            case 12:
              this.walletShow = true;
              break;
        }

      },

		}
	}
</script>

<style scoped lang="less">
	// 左侧应用
	.application{
		width: 188px;
		background: #fff;
		padding: 0 6px 20px;
	}
	// 左侧应用公共css
	.operation_two_menu p{
		text-indent: 30px;
		font-size: 14px;
		color: #555;
		height: 30px;
		line-height: 30px;
	}
	.two_menu p{
		text-indent: 16px;
		font-size: 14px;
		color: #555;
		height: 30px;
		line-height: 30px;
	}
	.two_menu p:hover,
	.operation_two_menu p:hover{
		cursor: pointer;
		background: #d2def3;
	}

  .one_menu:hover{
    cursor: pointer;
  }

	.headTitle{
		height: 36px;
		line-height: 36px;
		position: relative;
		border-bottom: 2px solid #eff0f4;
	}
	.headTitle h2{
		color: #333;
		font-size: 18px;
		font-weight: 600;
	}
	.headTitle i{
		position: absolute;
		right: 0;
		top: 10px;
	}

	.commonly_used h3{
		color: #333;
		font-size: 16px;
		margin-top: 8px;
		font-weight: 600;
	}
	.operation_category{
		position: relative;
		line-height: 40px;
	}
	.operation_category h3{
		color: #333;
		font-size: 16px;
		margin-left: 26px;
		font-weight: 600;
	}
	.befor{
		position: absolute;
		top: 12px;
		color: #008ae5;
	}

	.after{
		position: absolute;
		right: 0;
		top: 12px;
	}

	.marketing{
		position: absolute;
		top: 10px;
	}

  .icon_img{
    position: absolute;
    top: 0;
    color: #008ae5;
    font-size: 16px;
  }

  // 左侧高亮
  .active{
    background: #d2def3;
  }

  // 菜单箭头
  .menu_arrow_show{
    transform: rotate(90deg);
    transition: 0.5s;
  }
  .menu_arrow_hide{
    transform: rotate(0deg);
    transition: 0.5s;
  }

</style>
