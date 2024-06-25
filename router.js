import Vue from 'vue'
import Router from 'vue-router'


import Home from './views/Home.vue'
import Login from './views/Login'


Vue.use(Router)

const $router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: "/",
      redirect: "/home",
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/setAccount',
      name: 'setAccount',
      component: () => import('./views/account/setAccount')
    },
    {
      path: '/setPassword',
      name: 'setPassword',
      component: () => import('./views/account/setPassword')
    },
    {
      path: '/afterAdderList',
      name: 'afterAdderList',
      component: () => import('./views/account/afterAdderList')
    },
    {
      path: '/afterAddress',
      name: 'afterAddress',
      component: () => import('./views/account/afterAddress')
    },
    {
      path: '/creSubAccount',
      name: 'creSubAccount',
      component: () => import('./views/account/creSubAccount'),
      meta: {
        sonAccount: true,
      }
    },
    {
      path: '/departmentList',
      name: 'departmentList',
      component: () => import('./views/account/departmentList'),
      meta: {
        sonAccount: true,
      }
    },
    {
      path: '/creDepartment',
      name: 'creDepartment',
      component: () => import('./views/account/creDepartment'),
      meta: {
        sonAccount: true,
      }
    },
    {
      path: '/roleList',
      name: 'roleList',
      component: () => import('./views/account/roleList'),
      meta: {
        sonAccount: true,
      }
    },
    {
      path: '/creRole',
      name: 'creRole',
      component: () => import('./views/account/creRole'),
      meta: {
        sonAccount: true,
      }
    },
    {
      path: '/sonAccountList',
      name: 'sonAccountList',
      component: () => import('./views/account/sonAccountList'),
      meta: {
        sonAccount: true,
      }
    },
    {
      path: '/sonJurisdiction',
      name: 'sonJurisdiction',
      component: () => import('./views/account/sonJurisdiction'),
      meta: {
        sonAccount: true,
      }
    },
    {
      path: '/modifySonPasw',
      name: 'modifySonPasw',
      component: () => import('./views/account/modifySonPasw'),
      meta: {
        sonAccount: true,
      }
    },
    {
      path: '/categoryS',
      name: 'category',
      component: () => import('./views/goods/categoryS')
    },
    {
      path: '/supplier',
      name: 'supplier',
      component: () => import('./views/goods/supplier')
    },
    {
      path: '/afterSale',
      name: 'afterSale',
      component: () => import('./views/goods/afterSale')
    },
    {
      path: '/logistics',
      name: 'logistics',
      component: () => import('./views/goods/logistics')
    },
    {
      path: '/newAfterSale',
      name: 'newAfterSale',
      component: () => import('./views/goods/newAfterSale')
    },
    {
      path: '/newLogistics',
      name: 'newLogistics',
      component: () => import('./views/goods/newLogistics')
    },
    {
      path: '/newSupplier',
      name: 'newSupplier',
      component: () => import('./views/goods/newSupplier')
    },
    {
      path: '/inSale',
      name: 'inSale',
      component: () => import('./views/goods/inSale'),
    },
    {
      path: '/warehouse',
      name: 'warehouse',
      component: () => import('./views/goods/warehouse'),
    },
    {
      path: '/subheading',
      name: 'subheading',
      component: () => import('./views/goods/subheading'),
    },
    {
      path: '/batchRevPrice',
      name: 'batchRevPrice',
      component: () => import('./views/goods/batchRevPrice'),
    },
    {
      path: '/batchOffShelf',
      name: 'batchOffShelf',
      component: () => import('./views/goods/batchOffShelf'),
    },
    {
      path: '/vipPriceMaintain',
      name: 'vipPriceMaintain',
      component: () => import('./views/goods/vipPriceMaintain'),
    },
    {
      path: '/examineGoodsList',
      name: 'examineGoodsList',
      component: () => import('./views/goods/examineGoodsList'),
      meta: {
        goodsToExamine: true,
      }
    },
    {
      path: '/examineGoodDetail',
      name: 'examineGoodDetail',
      component: () => import('./views/goods/examineGoodDetail'),
      meta: {
        goodsToExamine: true,
      }
    },
    {
      path: '/newAddSku',
      name: 'newAddSku',
      component: () => import('./views/goods/newAddSku'),
    },
    {
      path: '/coupon',
      name: 'coupon',
      component: () => import('./views/marketing/coupon'),
    },
    {
      path: '/newCoupon',
      name: 'newCoupon',
      component: () => import('./views/marketing/newCoupon'),
    },
    {
      path: '/spike',
      name: 'spike',
      component: () => import('./views/marketing/spike'),
    },
    {
      path: '/newSpike',
      name: 'newSpike',
      component: () => import('./views/marketing/newSpike'),
    },
    {
      path: '/spikeGoodsList',
      name: 'spikeGoodsList',
      component: () => import('./views/marketing/spikeGoodsList'),
    },
    {
      path: '/spikeGoods',
      name: 'spikeGoods',
      component: () => import('./views/marketing/spikeGoods'),
    },
    {
      path: '/cSSpread',
      name: 'cSSpread',
      component: () => import('./views/marketing/cSSpread'),
    },
    {
      path: '/communityCoupon',
      name: 'communityCoupon',
      component: () => import('./views/marketing/communityCoupon'),
      meta: {
        communityShop: true,
      }
    },
    {
      path: '/applyCommunityCoupon',
      name: 'applyCommunityCoupon',
      component: () => import('./views/marketing/applyCommunityCoupon'),
      meta: {
        communityShop: true,
      }
    },
    {
      path: '/preSale',
      name: 'preSale',
      component: () => import('./views/marketing/preSale'),
    },
    {
      path: '/newPreSale',
      name: 'newPreSale',
      component: () => import('./views/marketing/newPreSale'),
    },
    {
      path: '/preSaleAddGoods',
      name: 'preSaleAddGoods',
      component: () => import('./views/marketing/preSaleAddGoods'),
    },
    {
      path: '/associatedGoods',
      name: 'associatedGoods',
      component: () => import('./views/marketing/associatedGoods'),
    },
    {
      path: '/homeApplyDeyail',
      name: 'homeApplyDeyail',
      component: () => import('./views/marketing/homeApplyDeyail'),
    },
    {
      path: '/fullReductionList',
      name: 'fullReductionList',
      component: () => import('./views/marketing/fullReductionList'),
    },
    {
      path: '/pullNewList',
      name: 'pullNewList',
      component: () => import('./views/marketing/pullNewList'),
    },
    {
      path: '/newPullNew',
      name: 'newPullNew',
      component: () => import('./views/marketing/newPullNew'),
    },
    {
      path: '/pullNewAddGoods',
      name: 'pullNewAddGoods',
      component: () => import('./views/marketing/pullNewAddGoods'),
    },
    {
      path: '/pullNewGoodsList',
      name: 'pullNewGoodsList',
      component: () => import('./views/marketing/pullNewGoodsList'),
    },
    {
      path: '/modifyFullReduction',
      name: 'modifyFullReduction',
      component: () => import('./views/marketing/modifyFullReduction'),
    },
    {
      path: '/fullReductionGoodsList',
      name: 'fullReductionGoodsList',
      component: () => import('./views/marketing/fullReductionGoodsList'),
    },
    {
      path: '/fullReductionGoods',
      name: 'fullReductionGoods',
      component: () => import('./views/marketing/fullReductionGoods'),
    },
    {
      path: '/groupBuyingList',
      name: 'groupBuyingList',
      component: () => import('./views/marketing/groupBuyingList'),
    },
    {
      path: '/newGroupBuying',
      name: 'newGroupBuying',
      component: () => import('./views/marketing/newGroupBuying'),
    },
    {
      path: '/groupGoodsList',
      name: 'groupGoodsList',
      component: () => import('./views/marketing/groupGoodsList'),
    },
    {
      path: '/groupAddGood',
      name: 'groupAddGood',
      component: () => import('./views/marketing/groupAddGood'),
    },
    {
      path: '/wanJiaGroupList',
      name: 'wanJiaGroupList',
      component: () => import('./views/marketing/wanJiaGroupList'),
    },
    {
      path: '/transactionOrder',
      name: 'transactionOrder',
      component: () => import('./views/transaction/transactionOrder'),
    },
    {
      path: '/transactionDetails',
      name: 'transactionDetails',
      component: () => import('./views/transaction/transactionDetails'),
    },
    {
      path: '/evaluateList',
      name: 'evaluateList',
      component: () => import('./views/transaction/evaluateList'),
    },
    {
      path: '/evaluatePro',
      name: 'evaluatePro',
      component: () => import('./views/transaction/evaluatePro'),
    },
    {
      path: '/recognition',
      name: 'recognition',
      component: () => import('./views/transaction/recognition'),
    },
    {
      path: '/drawBillList',
      name: 'drawBillList',
      component: () => import('./views/transaction/drawBillList'),
    },
    {
      path: '/invoiceDetail',
      name: 'invoiceDetail',
      component: () => import('./views/transaction/invoiceDetail'),
    },
    {
      path: '/refund',
      name: 'refund',
      component: () => import('./views/afterSale/refund')
    },
    {
      path: '/onlyRefund',
      name: 'onlyRefund',
      component: () => import('./views/afterSale/onlyRefund')
    },
    {
      path: '/salesDetails',
      name: 'salesDetails',
      component: () => import('./views/afterSale/salesDetails')
    },
    {
      path: '/shopInfo',
      name: 'shopInfo',
      component: () => import('./views/shopPipe/shopInfo')
    },
    {
      path: '/setShopInfo',
      name: 'setShopInfo',
      component: () => import('./views/shopPipe/setShopInfo')
    },
    {
      path: '/renovation',
      name: 'renovation',
      component: () => import('./views/shopPipe/renovation'),
      meta: {
        nonSelfShop: true,
      }
    },
    {
      path: '/shopClass',
      name: 'shopClass',
      component: () => import('./views/shopPipe/shopClass'),
      meta: {
        nonSelfShop: true,
      }
    },
    {
      path: '/setShopClass',
      name: 'setShopClass',
      component: () => import('./views/shopPipe/setShopClass'),
      meta: {
        nonSelfShop: true,
      }
    },
    {
      path: '/shopArticle',
      name: 'shopArticle',
      component: () => import('./views/shopPipe/shopArticle'),
      meta: {
        nonSelfShop: true,
      }
    },
    {
      path: '/shopArticleList',
      name: 'shopArticleList',
      component: () => import('./views/shopPipe/shopArticleList'),
      meta: {
        nonSelfShop: true,
      }
    },
    {
      path: '/shopRecomList',
      name: 'shopRecomList',
      component: () => import('./views/shopPipe/shopRecomList'),
      meta: {
        nonSelfShop: true,
      }
    },
    {
      path: '/shopRecom',
      name: 'shopRecom',
      component: () => import('./views/shopPipe/shopRecom'),
      meta: {
        nonSelfShop: true,
      }
    },
    {
      path: '/recommRelaGoods',
      name: 'recommRelaGoods',
      component: () => import('./views/shopPipe/recommRelaGoods'),
      meta: {
        nonSelfShop: true,
      }
    },
    {
      path: '/goodsRelaOper',
      name: 'goodsRelaOper',
      component: () => import('./views/shopPipe/goodsRelaOper'),
      meta: {
        nonSelfShop: true,
      }
    },
    {
      path: '/setGoodsRelaOper',
      name: 'setGoodsRelaOper',
      component: () => import('./views/shopPipe/setGoodsRelaOper'),
      meta: {
        nonSelfShop: true,
      }
    },
    {
      path: '/mapImgList',
      name: 'mapImgList',
      component: () => import('./views/shopPipe/mapImgList'),
      meta: {
        nonSelfShop: true,
      }
    },
    {
      path: '/newMapPlate',
      name: 'newMapPlate',
      component: () => import('./views/shopPipe/newMapPlate'),
      meta: {
        nonSelfShop: true,
      }
    },
    {
      path: '/setMapImage',
      name: 'setMapImage',
      component: () => import('./views/shopPipe/setMapImage'),
      meta: {
        nonSelfShop: true,
      }
    },
    {
      path: '/newImage',
      name: 'newImage',
      component: () => import('./views/shopPipe/newImage'),
      meta: {
        nonSelfShop: true,
      }
    },
    {
      path: '/pageModularList',
      name: 'pageModularList',
      component: () => import('./views/shopPipe/newStandard/pageModularList'),
      meta: {
        nonSelfShop: true,
      }
    },
    {
      path: '/newModular',
      name: 'newModular',
      component: () => import('./views/shopPipe/newStandard/newModular'),
      meta: {
        nonSelfShop: true,
      }
    },
    {
      path: '/modularContentList',
      name: 'modularContentList',
      component: () => import('./views/shopPipe/newStandard/modularContentList'),
      meta: {
        nonSelfShop: true,
      }
    },
    {
      path: '/newModularContent',
      name: 'newModularContent',
      component: () => import('./views/shopPipe/newStandard/newModularContent'),
      meta: {
        nonSelfShop: true,
      }
    },
    {
      path: '/distributionList',
      name: 'distributionList',
      component: () => import('./views/distribution/distributionList')
    },
    {
      path: '/inviteDistribution',
      name: 'inviteDistribution',
      component: () => import('./views/distribution/inviteDistribution'),
    },
    {
      path: '/distributionPartnerList',
      name: 'distributionPartnerList',
      component: () => import('./views/distribution/distributionPartnerList'),
    },
    {
      path: '/setCommission',
      name: 'setCommission',
      component: () => import('./views/distribution/setCommission')
    },
    {
      path: '/partnerDetalis',
      name: 'partnerDetalis',
      component: () => import('./views/distribution/partnerDetalis')
    },
    {
      path: '/contributionList',
      name: 'contributionList',
      component: () => import('./views/distribution/contributionList')
    },
    {
      path: '/systemMessage',
      name: 'systemMessage',
      component: () => import('./views/message/systemMessage')
    },
    {
      path: '/myDistribution',
      name: 'myDistribution',
      component: () => import('./views/distributionMarket/myDistribution'),
      meta: {
        nonSelfShop: true,
      }
    },
    {
      path: '/distributionMarket',
      name: 'distributionMarket',
      component: () => import('./views/distributionMarket/distributionMarket'),
      meta: {
        nonSelfShop: true,
      }
    },
    {
      path: '/helpCenter',
      name: 'helpCenter',
      component: () => import('./views/service/helpCenter')
    },
    {
      path: '/operationLog',
      name: 'operationLog',
      component: () => import('./views/service/operationLog'),
      meta: {
        sonAccount: true,
      }
    },
    {
      path: '/serveTwoMenu',
      name: 'serveTwoMenu',
      component: () => import('./views/service/serveTwoMenu')
    },
    {
      path: '/helpFileDetails',
      name: 'helpFileDetails',
      component: () => import('./views/service/helpFileDetails')
    },
    {
      path: '/salesRevenue',
      name: 'salesRevenue',
      component: () => import('./views/wallet/salesRevenue')
    },
    {
      path: '/distributionRevenue',
      name: 'distributionRevenue',
      component: () => import('./views/wallet/distributionRevenue')
    },
  ]
});


$router.beforeEach((to, from, next) => {
  const userInfrom = JSON.parse(window.localStorage.getItem("userInfrom"));

  // 如果用户清除了缓存或缓存不存在
  if(!userInfrom){
    // 重新做登录(主要是为修改后第一次登录，用户还没有店铺信息缓存，但是是登录状态，token存在)
    localStorage.setItem("exit", '1');
    let token = window.localStorage.getItem('token');
    if(token){
      localStorage.removeItem('token');
    }

    if(to.path != '/login'){
      next({path: '/login'});
    }
    else{
      next();
    }
  }
  else{
    const {shop_type, is_own, sku_check} = userInfrom;

    // 判断非自营店铺
    if (to.meta.nonSelfShop) {
      if (shop_type == '1') {
        next({
          path: '/home'
        });
      } else {
        next();
      }
    };

    // 判断非自营子账号
    if (to.meta.sonAccount) {
      if (is_own == '0') {
        next({
          path: '/home'
        });
      } else {
        next();
      }
    };

    // 根据账号类型判断商品上传是否需要审核
    if(to.meta.goodsToExamine){
      if(sku_check != '1'){
        next({
          path: '/home'
        });
      }
      else{
        next();
      }
    };

    // 判断是否是社区店铺
    if(to.meta.communityShop){
      if(shop_type != '3'){
        next({
          path: '/coupon'
        });
      }
      else{
        next();
      }
    }

  }

  // 其它正常放行
  next();

})

export default $router;
