<template>
  <div>

    <el-button type="primary" @click="cancelEditing()">返回</el-button>

    <div style="background-color: #fff; padding: 30px 0;">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
<!--        <div v-for="item in colour1Data.spec_info" :key="item.id" class="specifications">
          <el-form-item :label="`${item.spec_name}：`" label-width="140px">
            <el-input v-model="item.spec_value" :placeholder="`请输入${item.spec_name}信息`" class="longInput"></el-input>
          </el-form-item>
        </div> -->
        <div class="good_details">
          <div class="good_title"></div>
          <div class="good_content">
            <div>
              <p class="article_one" prop="price">
                <el-form-item label="价格：" label-width="80px" prop="prices">
                  <el-input v-model="ruleForm.prices" placeholder="最多保留两位小数" class="miniInputs"></el-input>
                </el-form-item>
              </p>
              <p class="article_one">
                <el-form-item label="库存：" label-width="80px" prop="stocks">
                  <el-input v-model="ruleForm.stocks" placeholder="整数" class="miniInputs"></el-input>
                </el-form-item>
              </p>
              <p class="article_one">
                <el-form-item label="进货价：" label-width="80px" prop="purchase_price">
                  <el-input v-model="ruleForm.purchase_price" placeholder="最多保留两位小数" class="miniInputs"></el-input>
                </el-form-item>
              </p>
            </div>
            <div class="vip_price_wrap" v-if="setVipPrice">
              <h4 class="vip_price_title">会员VIP价：<span>(不填写或部分设置VIP价格,将全部默认使用系统VIP价)</span></h4>
              <div>
                <p class="price_set_one">
                  <el-form-item label="mplus会员价：" label-width="120px" prop="mplus_vip_price3">
                    <el-input v-model.trim="ruleForm.mplus_vip_price3" placeholder="最多保留两位小数" class="miniInputs"></el-input>
                  </el-form-item>
                </p>
                <p class="price_set_one">
                  <el-form-item label="智能用户价格：" label-width="120px" prop="smartUser_vip_price4">
                    <el-input v-model.trim="ruleForm.smartUser_vip_price4" placeholder="最多保留两位小数" class="miniInputs"></el-input>
                  </el-form-item>
                </p>
              </div>

              <div>
                <p class="price_set_one">
                  <el-form-item label="智能普通家庭会员价格：" label-width="176px" prop="normalFamily_vip_price1">
                    <el-input v-model.trim="ruleForm.normalFamily_vip_price1" placeholder="最多保留两位小数" class="miniInputs"></el-input>
                  </el-form-item>
                </p>
                <p class="price_set_one">
                  <el-form-item label="智慧套装家庭会员价格：" label-width="176px" prop="comboFamily_vip_price2">
                    <el-input v-model.trim="ruleForm.comboFamily_vip_price2" placeholder="最多保留两位小数" class="miniInputs"></el-input>
                  </el-form-item>
                </p>
              </div>

              <div>
                <p class="price_set_one">
                  <el-form-item label="五好家庭会员价格：" label-width="150px" prop="honorFamily_vip_price5">
                    <el-input v-model.trim="ruleForm.honorFamily_vip_price5" placeholder="保留两位小数" class="miniInputs"></el-input>
                  </el-form-item>
                </p>
              </div>
            </div>

            <div class="healthy" v-if="healthServicesBtn">
              <p class="healthy_one">
                <el-form-item label="健康服务1：" label-width="100px">
                  <el-input v-model.trim="ruleForm.healthServices_one" placeholder="请输入健康服务备用字段" class="miniInputs" @blur="priceTesting(item.price, index)"></el-input>
                </el-form-item>
              </p>
            </div>

            <div>
              <el-form-item label="标题：" label-width="80px" prop="title">
                <el-input v-model="ruleForm.title" placeholder="默认:商品标题+销售规格属性组合+型号" class="longInput_s"></el-input>
              </el-form-item>
            </div>
            <div>
              <div class="seller_img_tips">
                <p>建议上传375x240,小于500KB的图片</p>
              </div>
              <p class="master_graph">主图：</p>
              <ul class="master_graph_ul">
                <li v-for="(item, index) in formationData" :key="index">
                  <el-upload :action="$upImg" :on-remove="onRemove" ref="upload" :limit="1" :before-upload="beforeAvatarUpload"
                    :on-success="uploadSuccess" :data="imageData" :show-file-list="true" list-type="picture">
                    <!-- <i class="el-icon-plus" @click="upImgFn(index)"></i> -->
                    <el-button title="建议上传375x240,小于500KB的图片" size="small" type="primary" @click="upImgFn(index)" class="button_centered">{{item.title}}</el-button>
                  </el-upload>
                  <p class="service_return_img" v-if="item.serviceImg && item.url">
                    <span @click="deleteFn(item, index)">X</span>
                    <img :src="item.url.small_url" alt="">
                  </p>
                </li>
              </ul>
            </div>
            <div class="good_label">
              <el-form-item label="商品标签：" label-width="100px" prop="labels">
                <el-input v-model="ruleForm.labels" placeholder="商品标签,多个以',' 逗号隔开" class="longInput_s"></el-input>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="submission">
          <el-form-item>
            <el-button type="primary" @click="cancelEditing()">取消编辑</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">保存修改</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import Qs from 'qs'
  export default {
    name: 'goodSkuEdit',
    props: ['goodSkuId', 'parentFrom'],
    data() {
      return {
        goto: true,
        ruleForm: {
          title: '', //头部标题
          prices: '', // 价格,
          stocks: '', // 库存
          purchase_price: '', // 进货价
          normalFamily_vip_price1: '', //
          comboFamily_vip_price2: '',
          mplus_vip_price3: '',
          smartUser_vip_price4: '',
          honorFamily_vip_price5: '',
          names: '', // 标题
          labels: '', // 商品标签
          healthServices_one: '',  // 健康服务1
        },
        // 验证信息
        rules: {
          title: [{
            required: true,
            message: '标题不能为空',
            trigger: 'blur'
          }, ],
          prices: [{
              required: true,
              message: '请输入价格',
              trigger: 'blur'
            },
            {
              pattern: /^[0-9]+(.[0-9]{1,2})?$/,
              message: '最多两位小数的数字'
            }
          ],
          purchase_price: [{
            pattern: /^[0-9]+(.[0-9]{1,2})?$/,
            message: '最多两位小数的数字'
          }],
          normalFamily_vip_price1: [{
            pattern: /^[0-9]+(.[0-9]{1,2})?$/,
            message: '最多两位小数的数字'
          }],
          comboFamily_vip_price2: [{
            pattern: /^[0-9]+(.[0-9]{1,2})?$/,
            message: '最多两位小数的数字'
          }],
          mplus_vip_price3: [{
            pattern: /^[0-9]+(.[0-9]{1,2})?$/,
            message: '最多两位小数的数字'
          }],
          smartUser_vip_price4: [{
            pattern: /^[0-9]+(.[0-9]{1,2})?$/,
            message: '最多两位小数的数字'
          }],
          honorFamily_vip_price5: [{
            pattern: /^[0-9]+(.[0-9]{1,2})?$/,
            message: '最多两位小数的数字'
          }],
          stocks: [{
              required: true,
              message: '请输入库存',
              trigger: 'blur'
            },
            {
              pattern: /^\+?[1-9][0-9]*$/,
              message: '请输入正整数'
            }
          ],
          names: [{
            required: true,
            message: '标题不能为空',
            trigger: 'blur'
          }, ],
          labels: [{
            required: true,
            message: '商品标签不能为空',
            trigger: 'blur'
          }, ],
        },
        colour1Data: [], // 商品sku数组
        formationData: [{
            title: '上传主图',
            url: '',
            serviceImg: true
          },
          {
            title: '点击上传',
            url: '',
            serviceImg: true
          },
          {
            title: '点击上传',
            url: '',
            serviceImg: true
          },
          {
            title: '点击上传',
            url: '',
            serviceImg: true
          },
          {
            title: '点击上传',
            url: '',
            serviceImg: true
          }
        ], // 生成按钮
        salesInformationData: [], // 图片数组
        dialogVisible: false, // 图片上传的，做什么不知道
        imageData: {
          'ratio': '110x84,375x240',
          'rootPath': 'gg'
        }, // 上传图片时携带的参数和上传到哪里
        shakeAnti: true, // 防抖
        imgIndex: null, // 图片上传的索引
        healthServicesBtn: false,  // 健康服务是否显示
        setVipPrice: false,  // 是否有权限设置vip价格默认没有
      }
    },
    created() {
      // 店铺信息
      this.getResident();
    },
    mounted() {
      // 通过携带过来的id获取数据
      this.obtainGoodSkuDataFn();
    },
    components: {

    },
    methods: {

      // 店铺信息
      getResident() {
        const userInfrom = JSON.parse(window.localStorage.getItem("userInfrom"));
        let { set_vip_price } = userInfrom;

        // 是否有设置VIP价格权限
        if(set_vip_price == '1'){
          this.setVipPrice = true;
        }

      },

      // 获取sku数据
      obtainGoodSkuDataFn() {
        let goodSkuObj = {
          id: this.goodSkuId,
        };
        this.$sendHttp({
          method: 'post',
          url: `${process.env.VUE_APP_URL2}goods/getsku`,
          data: goodSkuObj,
        }).then(res => {
          console.log(res)
          if (res.code == '0') {
            this.colour1Data = res.data;

            this.ruleForm.title = this.colour1Data.title;
            this.ruleForm.prices = this.colour1Data.price;
            this.ruleForm.stocks = this.colour1Data.inventory;
            this.ruleForm.labels = this.colour1Data.sku_tag;
            this.ruleForm.purchase_price = this.colour1Data.purchase_price;

            // 做一个容错处理，后台表示 vipprice 为空时，是一个数组
            if (this.colour1Data.vipprice.normal_family_price) {
              this.ruleForm.normalFamily_vip_price1 = this.colour1Data.vipprice.normal_family_price;
              this.ruleForm.comboFamily_vip_price2 = this.colour1Data.vipprice.combo_family_price;
              this.ruleForm.mplus_vip_price3 = this.colour1Data.vipprice.mplus_price;
              this.ruleForm.smartUser_vip_price4 = this.colour1Data.vipprice.smart_user_price;
              this.ruleForm.honorFamily_vip_price5 = this.colour1Data.vipprice.honor_family_price;
            }

            for (let i = 0; i < this.colour1Data.image.length; i++) {
              this.$set(this.formationData[i], 'url', this.colour1Data.image[i]);
            }

            // sku 健康服务显示和字段
            if(this.colour1Data.type_spell == 'health_service'){
              this.healthServicesBtn = true;
              this.ruleForm.healthServices_one = this.colour1Data.spare_one;
            }

          }
        })
      },

      // 点击上传图片
      upImgFn(index) {
        this.imgIndex = index;
      },

      // 点击删除服务器返回的图片
      deleteFn(item, index) {
        item.serviceImg = false;
        this.formationData[index].url = '';
      },

      // 删除文件时的钩子函数
      onRemove(file) {
        this.formationData[this.imgIndex].url = '';
      },

      // 上传前的钩子函数
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 1;
        if (!isLt2M) {
          this.$message({
            message: '上传图片大小不能超过 10MB!',
            type: 'warning',

          });
          return;
        }
        return isLt2M
      },

      // 图片上传成功
      uploadSuccess(response, file, fileList) {
        console.log(response, file);

        this.formationData[this.imgIndex].serviceImg = false;

        this.$set(this.formationData[this.imgIndex], 'url', response);

      },

      // 最后提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            if (this.colour1Data.spec_info) {
              for (let i = 0; i < this.colour1Data.spec_info.length; i++) {
                if (this.colour1Data.spec_info[i].spec_value == '') {
                  this.$alert(`${this.colour1Data.spec_info[i].spec_name}信息不能为空`, {
                    confirmButtonText: '确定',
                    center: true,
                    callback: action => {}
                  });
                  return
                }
              }

            }

            let serviceUpImg = [];

            this.formationData.forEach(item => {
              serviceUpImg.push(item.url)
            })


            let skuObj = {
              spec_info: JSON.stringify(this.colour1Data.spec_info),
              price: this.ruleForm.prices,
              title: this.ruleForm.title,
              sku_tag: this.ruleForm.labels,
              inventory: this.ruleForm.stocks,
              purchase_price: this.ruleForm.purchase_price,
              normal_family_price: this.ruleForm.normalFamily_vip_price1,
              combo_family_price: this.ruleForm.comboFamily_vip_price2,
              mplus_price: this.ruleForm.mplus_vip_price3,
              smart_user_price: this.ruleForm.smartUser_vip_price4,
              honor_family_price: this.ruleForm.honorFamily_vip_price5,
              spare_one: this.ruleForm.healthServices_one,
              id: this.colour1Data.id,
              img: JSON.stringify(serviceUpImg),
            };

            if (this.shakeAnti) {
              this.shakeAnti = false;

              // 发数据请求
              this.$sendHttp({
                method: 'post',
                url: `${process.env.VUE_APP_URL2}goods/editSku`,
                data: skuObj,
              }).then(res => {
                if (res.code == '0') {
                  this.$message({
                    message: `${res.msg}`,
                    type: 'success'
                  });
                  if (this.parentFrom == 'sell') {
                    this.$parent.skuSellEditSuccessFn();
                  } else {
                    this.$parent.skuWarehouseEditSuccessFn();
                  }

                } else {
                  this.$message({
                    message: `${res.msg}`,
                    type: 'warning'
                  });
                }

                this.shakeAnti = true;

              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      // 取消编辑 调用父级方法
      cancelEditing() {
        this.$confirm('系统可能不会保存您所做的更改，确定离开吗。', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$parent.skuCancelEditing();
        }).catch(() => {

        });
      },
    },
  }
</script>

<style scoped lang="less">
  .good_details {
    width: 810px;
    margin: 20px auto;
  }

  .good_title {
    height: 40px;
    background: #cbd9ef;

  }

  .good_title p {
    color: #fc563b;
  }

  .good_title p:hover {
    width: 40px;
    height: 40px;
    cursor: pointer;
    transform: rotateZ(360deg);
    transition: 0.6s;
  }

  .good_content {
    padding-top: 20px;
    width: 806px;
    border: 1px solid #ccc;
    border-top: none;
    margin-left: 1px;
  }

  .article_one {
    display: inline-block;
    vertical-align: top;
    margin-left: 30px;
  }

  .article_one_2 {
    margin-left: 60px;
  }

  .miniInputs {
    width: 150px;
  }

  .longInput_s {
    width: 600px;
  }

  .master_graph_ul,
  .master_graph {
    display: inline-block;
    vertical-align: middle;
  }

  .master_graph {
    width: 80px;
    text-indent: 30px;
    font-size: 14px;
  }

  .master_graph_ul li {
    display: inline-block;
    vertical-align: top;
    width: 120px;
    margin: 10px 5px;
  }

  .button_centered {
    margin-left: 18px;
  }

  .good_label {
    margin-top: 20px;
  }

  .submission {
    margin: 20px 0 20px 200px;
  }

  // 头部规格css
  .specifications {
    display: inline-block;
    width: 400px;
    margin-right: 60px;
  }

  .specifications .longInput {
    width: 260px;
  }

  // 接收后台返回的图片css
  .service_return_img {
    width: 118px;
    height: 90px;
    margin-top: 10px;
    border: 1px solid #ccc;
    position: relative;
    border-radius: 6px;

    img {
      width: 110px;
      height: 80px;
      margin: 4px;
    }

    span {
      position: absolute;
      right: 2px;
      top: 0;
      z-index: 9;
      cursor: pointer;
    }
  }

  // vip 价格 css
  .vip_price_wrap {
    width: 796px;
    margin: 0 auto 20px;
    border: 1px solid #eee;
    box-sizing: border-box;

    .vip_price_title {
      height: 40px;
      line-height: 40px;
      font-size: 12px;
      color: #3CADE7;
      border-bottom: 1px solid #eee;
      margin-bottom: 20px;

      span {
        font-size: 12px;
        color: #E72E4D;
        margin-left: 8px;
      }
    }

    .price_set_one,
    .price_set_two {
      display: inline-block;
      vertical-align: top;

    }

    .price_set_one {
      margin-left: 10px;
    }

    .price_set_two {
      margin-left: 30px;
    }
  }

  .healthy{
    padding-left: 10px;
  }
  .healthy_one{
    display: inline-block;
    vertical-align: top;
    margin-left: 4px;
  }


</style>
