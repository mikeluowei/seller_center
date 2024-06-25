<template>
  <div>
    <div class="wrap">
      <div class="form_spacing">
        <div class="div1">
          <span>分类:</span>
          <el-select v-model="relaValue" clearable filterable placeholder="请选择" @change="searchFn">
            <el-option v-for="item in relaClassifi" :key="item.id" :label="item.cat_name" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="div1">
          <span>品牌:</span>
          <el-select v-model="brandValue" clearable filterable placeholder="请选择" @change="searchFn">
            <el-option v-for="item in brandData" :key="item.id" :label="item.brand_name" :value="item.id"></el-option>
          </el-select>
        </div>
      </div>
      <div class="form_spacing">
        <div class="div1">
          <span>关键字:</span>
          <el-input class="mall_input" v-model.trim="keyword" placeholder="商品关键字" @keyup.enter.native="searchFn()">
          </el-input>
        </div>
        <div class="div1">
          <span>价格区间:</span>
          <el-input class="min_input" v-model.trim="priceSectionStart" placeholder="价格区间"></el-input>
          <i class="section">一</i>
          <el-input class="min_input" v-model.trim="priceSectionEnd" placeholder="价格区间"></el-input>
        </div>

        <div>
          <el-button size="small" type="primary" @click="searchFn()">搜索</el-button>
        </div>

      </div>
    </div>
    <div class="pop">
      <p>{{tips}}</p>
    </div>

    <div>
      <el-table :data="shopGoodsData" @selection-change="handleSelectionChange" class="tb-edit" height="400"
        style="width: 100%" highlight-current-row>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="date" label="商品图片" width="100" align="center">
          <template slot-scope="scope">
            <img class="scope_img" :src="scope.row.image" alt="" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="商品标题" align="center"></el-table-column>
        <el-table-column prop="spec_value_name" label="商品规格" align="center"></el-table-column>
        <el-table-column prop="store_price" label="商品价格" align="center">
          <template slot-scope="scope">
            <p>￥{{scope.row.store_price}}</p>
          </template>
        </el-table-column>
        <el-table-column v-if="show" prop="purchase_price" label="商品进货价" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.purchase_price">￥{{scope.row.purchase_price}}</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination @current-change="currentChange" :current-page="currentPage1" :total="total"></el-pagination>
    </div>
    <div>
      <el-button v-if="single=='many'" size="small" type="primary" @click="keepFn()">保存关联</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'shopGoodsPop',
    props: ['single'],
    data() {
      return {
        relaGodds: [], // 关联商品数组
        goodsData: [], // 商品接收数组
        shopGoodsData: [], // 店铺商品数组
        currentPage1: 1, // 页码
        total: 0, // 当前总条数
        keyword: '', // 搜索关键字
        priceSectionStart: '', // 价格区间开始
        priceSectionEnd: '', // 价格区间结束
        priceFieldServe: '', // 价格区间提交服务器
        tips: '', // 关联商品时报错
        relaClassifi: [], // 商品分类接收数组
        relaValue: '', // 商品分类
        brandData: [], // 品牌接收数组
        brandValue: '', // 品牌
        InterfaceType: 1, // 调用哪个接口，默认1调用获取店铺内商品接口，搜索时调用搜索接口
        show: true,  // 进货价是否显示, 默认显示
      }
    },
    created() {
      // 获取店铺所有商品
      this.getShopGoods();

      // 获取商品分类函数调用
      this.getCatFn();

      // 获取店铺品牌
      this.acquisitionGoods();

    },
    components: {

    },
    methods: {
      // 获取店铺分类
      getCatFn() {
        this.$sendHttp({
          method: 'post',
          url: `${process.env.VUE_APP_ACCOUNT}shopset/getcat`,
          data: {}
        }).then(res => {
          if (res.code == '0') {
            this.relaClassifi = res.data;
          }
        })
      },

      // 获取店铺品牌
      acquisitionGoods() {
        this.$sendHttp({
          method: 'post',
          url: `${process.env.VUE_APP_ACCOUNT}shopset/getsellerbrand`,
          data: {},
        }).then(res => {
          if (res.code == '0') {
            this.brandData = res.data;
          }
        })
      },

      // 获取店铺所有商品
      getShopGoods() {
        this.$sendHttp({
          method: 'post',
          url: `${process.env.VUE_APP_ACCOUNT}shopset/shopskulist`,
          data: {
            page: this.currentPage1,
          }
        }).then(res => {
          if (res.code == '0') {
            this.show = true;
            console.log(res)
            this.total = res.count;
            this.shopGoodsData = res.data;

            this.shopGoodsData.forEach( item => {
              item.store_price = item.price;
            });

          }
        })
      },

      // 搜索商品
      goodsSearch() {

        const userInfrom = JSON.parse(window.localStorage.getItem("userInfrom"));

        this.$sendHttp({
          method: 'POST',
          url: `${process.env.VUE_APP_URL2}search`,
          data: {
            page: this.currentPage1,
            shop_id: userInfrom.shop_id,
            keyword: this.keyword,
            cat_id: this.relaValue,
            brand_id: this.brandValue,
            price_field: this.priceFieldServe,
            num: '10',
          }
        }).then(res => {
          if (res.code == '0') {

            // 进货价是否屏蔽
            this.show = false;

            // 由于字段不一致所以处理一下返回的数据
            this.shopGoodsData = res.data.map(item => {
              item.title = item.sku_name;
              item.image = item.sku_master_image;
              item.spec_value_name = item.sku_spec;
              item.id = item.sku_id;

              return item;
            })
            this.total = res.count;
          } else {
            this.$message.error(res.msg);
          }
        })


      },

      // 搜索调用
      searchFn() {

        // 是否有搜索
        if(this.keyword == '' && this.relaValue == '' && this.brandValue == '' && this.priceSectionStart == '' && this.priceSectionEnd == ''){
          this.getShopGoods();
        }
        else{
          const number = /^[0-9]+(.[0-9]{1,2})?$/;
          // 判断价格区间是否是数字
          if (this.priceSectionStart) {
            if (!number.test(this.priceSectionStart)) {
              this.$message.error('价格，只能是数字，最多保留两位小数');
              return
            }
          }

          if (this.priceSectionEnd) {
            if (!number.test(this.priceSectionEnd)) {
              this.$message.error('价格，只能是数字，最多保留两位小数');
              return
            }
          }

          if (this.priceSectionStart && this.priceSectionEnd) {
            this.priceFieldServe = `${this.priceSectionStart},${this.priceSectionEnd}`
          } else if (this.priceSectionStart) {
            this.priceFieldServe = this.priceSectionStart;
          } else if (this.priceSectionEnd) {
            this.priceFieldServe = this.priceSectionEnd;
          } else {
            this.priceFieldServe = '';
          }

          this.currentPage1 = 1;
          this.InterfaceType = 2;

          this.goodsSearch();
        }

      },

      // 翻页
      currentChange(val) {
        if (this.relaGodds.length > 0) {
          this.$emit('getRelaGoods', this.relaGodds);
        }
        this.currentPage1 = val;

        if (this.InterfaceType == 1) {
          this.getShopGoods();
        } else {
          this.goodsSearch();
        }
      },

      // 关联单个商品
      handleSelectionChange(val) {
        console.log(val)
        if (this.single == 'single') {
          if (val.length > 1) {
            this.tips = '只能关联一个商品';
          } else if (val.length == 1) {
            this.tips = '';
            this.relaGodds = [];
            this.relaGodds.push({
              id: val[0].id,
              title: val[0].title,
              price: val[0].price,
              image: val[0].image,
              spec_value_name: val[0].spec_value_name,
            })
            this.$emit('getRelaGoods', this.relaGodds);
            this.$emit('popClose');
          } else {
            this.tips = '';
          }
        }

        if (this.single == 'many') {
          this.relaGodds = val;

        }

      },

      // 点击保存关联多个商品
      keepFn() {
        if (this.relaGodds.length == '0') {
          return;
        }
        this.$emit('getRelaGoods', this.relaGodds);
        this.$emit('popClose');
      },

    },
  }
</script>

<style scoped lang="less">
  .wrap {
    position: relative;
  }

  .mall_input {
    width: 150px;
    margin-right: 10px;
  }

  .form_spacing {
    margin-top: 10px;

    div {
      display: inline-block;
      vertical-align: top;
      margin-right: 10px;
      line-height: 50px;

      span {
        font-size: 14px;
        color: #606266;
        margin-right: 10px;
      }

      .min_input {
        width: 120px;
      }

      .section {
        margin-right: 13px;
      }
    }
  }



  .pop {
    position: absolute;
    top: 170px;
    left: 150px;
    z-index: 2;

    p {
      font-size: 16px;
      color: #DE1919;
      font-weight: bold;
    }
  }

  .scope_img {
    width: 60px;
    height: 60px;
  }
</style>
