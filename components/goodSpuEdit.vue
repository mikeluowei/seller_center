<template>
  <div>
    <el-button type="primary" @click="cancelEditing()">返回</el-button>
    <div class="upperShelf">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
        <div class="information">
          <h4>基础信息</h4>
          <div class="information_subject">
            <div class="current_class">
              <p v-if="goodsSpuData.category">当前分类：{{goodsSpuData.category}}</p>
            </div>
            <el-form-item label="商品标识：" prop="goodsLabelID" label-width="140px">
              <el-select v-model="ruleForm.goodsLabelID" placeholder="请选择" @change="changeGoodsLabel">
                <el-option v-for="(item, index) in goodsLabel" :key="index" :label="item.label_name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="healthHousekeeperBtn" label="管家电话：" prop="healthHousekeeper">
              <el-input v-model.trim="ruleForm.healthHousekeeper" maxlength="13" class="shortInput"></el-input>
            </el-form-item>
            <el-form-item :label="healthGoodsName + '：'" prop="name">
              <el-input v-model="ruleForm.name" class="longInput"></el-input>
            </el-form-item>
            <el-form-item label="品牌：" prop="brand" label-width="140px">
              <el-select v-model="ruleForm.brand" filterable placeholder="请选择">
                <el-option v-for="item in brandData" :key="item.id" :label="item.brand_name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品计量单位：" prop="unit">
              <el-input v-model.trim="ruleForm.unit" class="shortInput"></el-input>
            </el-form-item>
            <el-form-item v-if="goodsTypeShow" label="商品类型：" label-width="140px">
              <el-select v-model="goodsTypeValue" placeholder="请选择">
                <el-option v-for="item in goodsTypeData" :key="item.id" :label="item.title" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-else label="商品类型：" label-width="140px">
              <el-cascader v-model="goodsTypeValue" :options="healthGoodsTypeData" :show-all-levels="false" @change="changeGoodsType"></el-cascader>
            </el-form-item>
            <el-form-item v-if="butlerServiceShow" label="服务类型：" label-width="140px" prop="type">
              <el-checkbox-group v-model="ruleForm.type" @change="changeServiceItems">
                <el-checkbox v-for="(item, index) in goodsTagData" :key="index" :label="item.tag"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <div v-if="goodsSpuData.attr_value != ''">
              <p class="routine_left">常规参数：</p>
              <div class="routine_right">
                <div v-for="(item, index) in goodsSpuData.attr_value" :key="index">
                  <h4>{{item.attr_name}}</h4>
                  <div class="basics">
                    <div v-for="option in item.child" :key="option.id" class="basics_left">
                      <el-form-item :label="option.attr_name + '：'" :prop="option.attr_value" label-width="120px">
                        <el-input v-model.trim="option.attr_value" class="shortInput"></el-input>
                      </el-form-item>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="video_wrap">
              <div class="video_up">
                <el-upload :action="$upVideo" :limit="1" :on-success="videoUploadSuccess" :on-error="videoUploadError"
                  :show-file-list="false" list-type="picture" ref="videoUp">
                  <el-button title="建议上传375x240,小于500KB的图片" size="medium" type="primary" round>视频上传</el-button>
                </el-upload>
                <p class="tips">用于上传商品主图视频,请不要上传过大的视频</p>
              </div>
              <div class="video_play" v-if="videoShow">
                <p class="video_delete" @click.stop="videoDelete">x</p>
                <video :src="videoShowPlay" controls width="100%" height="100%" style="object-fit:fill"></video>
              </div>
            </div>
            <div class="code_list">
              <el-form-item label="商品编码:" label-width="140px">
                <el-input v-model="ruleForm.goodCode" placeholder="商品编码" class="longInput_s"></el-input>
              </el-form-item>
              <el-form-item label="包装清单:" label-width="140px" prop="goodPacking">
                <el-input type="textarea" :rows="2" placeholder="包装清单" v-model="ruleForm.goodPacking" class="longInput_s"></el-input>
              </el-form-item>
            </div>
          </div>
        </div>

        <!-- 富文本 -->
        <vue-ueditor-wrap v-model="content" :config="myConfig"></vue-ueditor-wrap>

        <div class="information">
          <h4>物流信息</h4>
          <div class="information_subject">
            <el-form-item label="物流模板：" prop="logisticsRules">
              <el-select v-model="ruleForm.logisticsRules" filterable placeholder="请选择物流模板">
                <el-option v-for="(item, index) in logisticsData" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-button type="primary" class="new_logistics" @click="newLogistics()">新建物流模板</el-button>
          </div>
        </div>

        <div class="information">
          <h4>供应商信息</h4>
          <div class="information_subject">
            <el-form-item label="供应商选择：" prop="supplier">
              <el-select v-model="ruleForm.supplier" filterable placeholder="请选择供应商">
                <el-option v-for="(item, index) in supplierData" :key="index" :label="item.supplier_name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-button type="primary" class="new_logistics" @click="newSupplier()">新建供应商模板</el-button>
          </div>
        </div>

        <div class="information">
          <h4>售后服务</h4>
          <div class="information_subject">
            <el-form-item label="售后政策：" prop="afterSalePolicy">
              <el-select v-model="ruleForm.afterSalePolicy" filterable placeholder="请选择售后政策模板">
                <el-option v-for="(item, index) in afterSalePolicyData" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-button type="primary" class="new_logistics" @click="newLafterSalePolicy()">新建售后模板</el-button>

            <div class="service_sell">
              <div>
                <h5><span>*</span>售后服务：</h5>
                <div class="all_election">
                  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                  <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="(item, index) in cities" :key="index" :label="item.id">{{item.name}}</el-checkbox>
                  </el-checkbox-group>
                </div>
                <div class="invoice">
                  <el-form-item label="是否支持开发票：" prop="invoice" label-width="140px">
                    <el-radio-group v-model="ruleForm.invoice">
                      <el-radio label="1">支持</el-radio>
                      <el-radio label="2">不支持</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </div>
                <!-- <div class="shelf_time">
									<el-form-item label="上架时间：" prop="resource" label-width="100px">
										<el-radio-group v-model="ruleForm.resource">
											<el-radio v-model="radioUpper" label="1">立即上架</el-radio>
											<el-radio v-model="radioUpper" label="2">放入仓库</el-radio>
										</el-radio-group>
									</el-form-item>
								</div> -->
              </div>
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
  import VueUeditorWrap from 'vue-ueditor-wrap'
  import Qs from 'qs'
  export default {
    name: 'goodSpuEdit',
    props: ['goodsSpuId', 'parentFrom'],
    data() {
      return {
        // 表单数据
        ruleForm: {
          name: '', //商品标题
          logisticsRules: '', //物流信息
          afterSalePolicy: '', //售后
          goodCode: '', //商品编码
          goodPacking: '', //包装清单
          invoice: '', //是否支持开发票
          supplier: '', // 供应商数据
          //resource: '',     //上架时间
          goodsLabelID: '', // 商品标识
          brand: '', // 品牌
          unit: '', // 計量單位
          healthHousekeeper: '',  // 健康管家电话
          type: [],
        },
        // 验证信息
        rules: {
          name: [{
            required: true,
            message: '请输入商品标题',
            trigger: 'blur'
          }],
          logisticsRules: [{
            required: true,
            message: '物流信息不能为空',
            trigger: 'change'
          }],
          afterSalePolicy: [{
            required: true,
            message: '售后政策信息不能为空',
            trigger: 'change'
          }],
          goodPacking: [{
            required: true,
            message: '包装清单不能为空',
            trigger: 'blur'
          }],
          resource: [{
            required: true,
            message: '请选择立即上架或放入仓库',
            trigger: 'change'
          }],
          invoice: [{
            required: true,
            message: '请选择是否支持开发票',
            trigger: 'change'
          }],
          supplier: [{
            required: true,
            message: '请选择供应商',
            trigger: 'change'
          }],
          brand: [{
            required: true,
            message: '品牌信息不能为空',
            trigger: 'blur'
          }],
          unit: [{
            required: true,
            message: '请输入商品计量单位',
            trigger: 'blur'
          }],
          goodsLabelID: [{
            required: true,
            message: '商品标识不能为空',
            trigger: 'blur'
          }],
          healthHousekeeper: [
            {
              required: true,
              message: '管家电话不能为空',
              trigger: 'blur'
            },
            {
              pattern: /(^0\d{2,3}\-\d{7,8}$)|(^1[3|4|5|6|7|8][0-9]{9}$)/,
              message: '管家电话有误'
            },
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个服务项目', trigger: 'change' }
          ],
        },
        logisticsData: [], // 物流模板的数据
        supplierData: [], // 供应商模板数据
        afterSalePolicyData: [], // 售后政策数据
        cities: [{
          'name': '7天无理由退换货',
          'id': 1
        }, {
          'name': '免费安装服务',
          'id': 2
        }, {
          'name': '保修服务',
          'id': 3
        }], //售后服务是否全选数据数据
        checkAll: false, //是否全选
        isIndeterminate: false, //单个选择
        checkedGameId: [], //售后全选空数组
        checkedCities: [], //售后服务数据接收数组
        saleService: [], //售后服务提交给后台的数据
        radioUpper: '', //上架和放入仓库单选
        MainData: [], // 主要参数接收属性数组
        secondaryData: [], //次要参数接收属性数组
        basicsData: [], //基础参数合并成一个数组提交给后端
        basicsDataAdopt: false, // 基础信息验证通过
        goodsSpuData: [], // 页面跳转过来接收数组
        myConfig: {
          serverUrl: this.$upload, //上传功能后面是接口
          UEDITOR_HOME_URL: '/ueditor/', // 下载的文件存放路径
          autoHeightEnabled: false, // 编辑器不自动被内容撑高
          autoFloatEnabled: false, // 工具栏是否可以浮动
          initialFrameHeight: 340, // 初始容器高度
          initialFrameWidth: '100%', // 初始容器宽度
          enableAutoSave: true, // 关闭自动保存
        }, // 富文本编辑器
        content: '', // 富文本编辑器数据双向绑定
        shakeAnti: true, // 防抖
        brandData: [], // 品牌数据
        goodsLabel: [], // 商品标识數組
        labelServeID: '', // 商品标识数组传值给后端
        videoShow: '', // 视频
        videoShowPlay: '', // 用于视频播放(因为后台返回的带http,自己重新上传的不带)
        goodsTypeShow: true,  // 健康服务类型显示(默认显示普通)
        goodsTypeData: [],  // 商品类型
        healthGoodsTypeData: [],  // 健康服务商品类型
        goodsTypeValue: '', // 商品类型绑定
        healthHousekeeperBtn: false,  // 健康管家电话是否显示
        goodsTagData: [],  // 商品类型等于健康管家时接收管家选项
        goodsTagServe: [],  // 商品类型等于健康管家时提交给后端
        butlerServiceShow: false,  // 健康管家服务项是否显示
        healthGoodsName: '商品标题', // 商品标题
      }
    },
    created() {

    },
    mounted() {
      // 页面跳转进来根据Id 获取数据
      this.obtainGoodSpuDataFn();

      // 全选数据函数调用
      this.electionAll();

    },
    computed: {

    },
    components: {
      VueUeditorWrap,
    },
    methods: {
      // 根据id 获取数据
      obtainGoodSpuDataFn() {
        let goodSpuObj = {
          goods_id: this.goodsSpuId
        }
        this.$sendHttp({
          method: 'post',
          url: `${process.env.VUE_APP_URL2}goods/getspu`,
          data: goodSpuObj,
        }).then(res => {
          console.log(res)
          if (res.code == '0') {
            this.goodsSpuData = res.data;

            // 获取品牌
            this.brandDataFn(this.goodsSpuData.cat_id);

            // 获取商品标识
            this.getGoodsLabel();

            // 获取商品类型
            this.callGoodsType();

            // 获取物流模板数据调用
            this.logisticsTemplate();

            // 获取供应商列表数据调用
            this.supplierTemplate();

            // 获取售后政策模板数据
            this.saleAfterPolicy(res.data.brand_id, res.data.cat_id);

            this.ruleForm.name = this.goodsSpuData.goods_name;
            this.ruleForm.goodPacking = this.goodsSpuData.goods_pack;
            this.ruleForm.invoice = this.goodsSpuData.involce_enable;
            this.ruleForm.goodCode = this.goodsSpuData.goods_sn;
            this.ruleForm.unit = this.goodsSpuData.unit;
            this.content = this.goodsSpuData.goods_body;
            this.videoShow = this.goodsSpuData.video;
            this.videoShowPlay = this.goodsSpuData.video;
            this.ruleForm.healthHousekeeper = this.goodsSpuData.manager_mobile;

            if(this.goodsSpuData.goods_tag){
              this.ruleForm.type = this.goodsSpuData.goods_tag.split(',')
            }

            if (this.goodsSpuData.goods_type && this.goodsSpuData.goods_type != '0') {
              this.goodsTypeValue = this.goodsSpuData.goods_type;
            }

            if (this.goodsSpuData.service_tag) {
              this.goodsSpuData.service_tag = this.goodsSpuData.service_tag.split(',');

              if (this.goodsSpuData.service_tag.length >= this.cities.length) {
                this.checkAll = true;
              }

              this.goodsSpuData.service_tag.forEach(item => {
                this.checkedCities.push(parseInt(item));
              })
            }


          } else {
            this.$message.error(`${res.msg}`);
          }
        })
      },

      // 区分商品类型调用
      callGoodsType(){
        const userInfrom = JSON.parse(window.localStorage.getItem("userInfrom"));

        if(userInfrom.is_healthservice){
          this.goodsTypeShow = false;
          this.getHealthGoodsType()
        }
        else{
          this.goodsTypeShow = true;
          this.getGoodsType();
        }

      },

      // 获取商品类型
      getGoodsType() {
        this.$sendHttp({
          method: 'POST',
          url: `${process.env.VUE_APP_URL2}healthgoods/getgoodstype`,
          data: {}
        }).then(res => {
          if (res.code == '0') {
            this.goodsTypeData = res.data;
          }
        })
      },

      // 健康服务获取商品类型
      getHealthGoodsType(){
        this.$sendHttp({
          method: 'POST',
          url: `${process.env.VUE_APP_URL2}healthgoods/gethealthgoodstype`,
          data: {}
        }).then( res => {
          if(res.code == '0'){
            // 处理返回的数据
            this.healthGoodsTypeData = res.data.map( item => {
              item.label = item.title;
              item.value = item.id;
              item.children = item.child.map( child => {
                child.label = child.title;
                child.value = child.id;

                return child;
              });
              return item;
            });

            // 是否显示管家服务项函数封装
            this.butlerServiceFn()

            // 健康服务商品类型选择健康管家时获取管家选项
            this.getGoodsTag();
          }
        })
      },

      // 健康服务商品选择
      changeGoodsType(value){
        this.goodsTypeValue = value[1];

        // 是否显示管家服务项函数封装
        this.butlerServiceFn()

      },

      // 是否显示管家服务项函数封装
      butlerServiceFn(){
        // 当选择健康管家时需要显示服务项
        this.healthGoodsTypeData.forEach( item => {
          item.child.forEach( childs => {
            if(this.goodsTypeValue == childs.id){
              if(childs.title == '健康管家'){
                this.butlerServiceShow = true;
              }
              else{
                this.butlerServiceShow = false;
              }
            }
          })
        })
      },

      // 健康服务商品类型选择健康管家时获取管家选项
      getGoodsTag(){
        this.$sendHttp({
          method: 'POST',
          url: `${process.env.VUE_APP_URL2}healthgoods/getgoodstag`,
          data: {}
        }).then( res => {
            console.log(res)
            if(res.code == '0'){
              this.goodsTagData = res.data;
            }

        })
      },

      // 服务项目选项改变时
      changeServiceItems(val){
        this.goodsTagServe = val.join(',');
        console.log(this.goodsTagServe)
      },

      // 根据3级分类获取品牌数据
      brandDataFn(cat_id) {
        this.$sendHttp({
          method: 'post',
          url: `${process.env.VUE_APP_URL2}goods/getbrand`,
          data: {
            id: cat_id,
          },
        }).then(res => {
          console.log(res)
          if (res.code == '0') {
            if (res.data.length) {
              this.brandData = res.data;
              this.ruleForm.brand = this.goodsSpuData.brand_id;
            }
          }

        })

      },

      // 获取物流模板数据
      logisticsTemplate() {
        this.$sendHttp({
          method: 'post',
          url: `${process.env.VUE_APP_URL2}logistics/list`,
          data: {},
        }).then(res => {
          if (res.code == '0') {
            this.logisticsData = res.data;

            let logisticsBoon = this.logisticsData.find(item => {
              return item.id == this.goodsSpuData.logistics_id;
            })
            if (logisticsBoon) {
              this.ruleForm.logisticsRules = logisticsBoon.id;
            }

          }
        })
      },

      // 获取供应商列表数据
      supplierTemplate() {
        this.$sendHttp({
          method: 'post',
          url: `${process.env.VUE_APP_URL2}goods/getPolicy`,
          data: {},
        }).then(res => {
          if (res.code == '0') {
            this.supplierData = res.data;

            let supplierBoon = this.supplierData.find(item => {
              return item.id == this.goodsSpuData.supplier_id;
            })
            if (supplierBoon) {
              this.ruleForm.supplier = supplierBoon.id;
            }
          }
        })
      },

      // 获取售后政策模板数据
      saleAfterPolicy(brandID, catID) {
        this.$sendHttp({
          method: 'post',
          url: `${process.env.VUE_APP_URL2}policy/policylist`,
          data: {
            brand_id: brandID,
            cat_id: catID,
          },
        }).then(res => {
          console.log(res)
          if (res.code == '0') {
            this.afterSalePolicyData = res.data;

            let afterSaleBoon = this.afterSalePolicyData.find(item => {
              return item.id == this.goodsSpuData.after_sale_id;
            })

            if (afterSaleBoon) {
              this.ruleForm.afterSalePolicy = afterSaleBoon.id;
            }
          }
        })
      },

      // 获取商品标识
      getGoodsLabel() {
        this.$sendHttp({
          method: 'POST',
          url: `${process.env.VUE_APP_URL2}goods/labellist`,
          data: {}
        }).then(res => {
          console.log(res)
          if (res.code == '0') {
            this.goodsLabel = res.data;

            let labelBoon = this.goodsLabel.find(item => {
              return item.id == this.goodsSpuData.label_id;
            })

            if (labelBoon) {
              this.ruleForm.goodsLabelID = labelBoon.id;

              // 是否健康服务
              if(labelBoon.label_spell == 'health_manager'){
                this.healthHousekeeperBtn = true;
              }

            }

          }
        })
      },

      // 选择商品标识时
      changeGoodsLabel(value){
        this.goodsLabel.forEach( item => {
          if(item.id == value){
            // 健康管家
            if(item.label_spell == 'health_manager'){
              this.healthHousekeeperBtn = true;
              this.healthGoodsName = '管家姓名';
            }
            else{
              this.healthHousekeeperBtn = false;
              this.healthGoodsName = '商品标题';
            }
          }
        })

      },

      // 点击全选数据获取
      electionAll() {
        for (let i = 0; i < this.cities.length; i++) {
          this.checkedGameId.push(this.cities[i].id)
        }
      },

      // 点击全选
      handleCheckAllChange(val) {
        this.checkedCities = val ? this.checkedGameId : [];
        this.isIndeterminate = false;
        if (val) {
          this.saleService = this.checkedGameId
        }
      },

      // 点击当个选择
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.checkedGameId.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkedGameId.length;
        this.saleService = value;
      },

      // 最后点击提交
      submitForm(formName) {

        this.$refs[formName].validate((valid) => {

          if (this.goodsSpuData.attr_value) {
            for (let i = 0; i < this.goodsSpuData.attr_value.length; i++) {
              if (this.goodsSpuData.attr_value[i].child) {
                for (let j = 0; j < this.goodsSpuData.attr_value[i].child.length; j++) {
                  if (this.goodsSpuData.attr_value[i].child[j].attr_value == '' || this.goodsSpuData.attr_value[i].child[
                      j].attr_value == null) {
                    this.$alert(`${this.goodsSpuData.attr_value[i].child[j].attr_name}信息不能为空`, {
                      confirmButtonText: '确定',
                      center: true,
                      callback: action => {
                        //可以为空，但是不写这一层回调会报错
                      }
                    });
                    return
                  }
                }
              }
            }
          }

          if (!this.content) {
            this.$message({
              message: `商品详情不能为空，请使用富文本编辑器上传`,
              type: 'warning'
            });
            return;
          }

          if (!this.ruleForm.goodPacking) {
            this.$message({
              message: `请填写包装清单`,
              type: 'warning'
            });
            return;
          }

          if (valid) {
            let afterSaleMany = '';
            if (this.checkedCities.length == 0) {
              this.$alert('请选择售后服务', {
                confirmButtonText: '确定',
                center: true,
                callback: action => {
                  //可以为空，但是不写这一层回调会报错
                }
              });
              return;
            } else if (this.checkedCities.length > 0) {
              afterSaleMany = this.checkedCities.join(',');
            } else {
              afterSaleMany = this.goodsSpuData.service_tag;
            }


            let spuObj = {
              attr_value: JSON.stringify(this.goodsSpuData.attr_value),
              goods_name: this.ruleForm.name,
              goods_pack: this.ruleForm.goodPacking,
              involce_enable: this.ruleForm.invoice,
              goods_body: this.content,
              supplier_id: this.ruleForm.supplier,
              logistics_id: this.ruleForm.logisticsRules,
              after_sale_id: this.ruleForm.afterSalePolicy,
              goods_id: this.goodsSpuData.goods_id,
              service_tag: afterSaleMany,
              cat_id: this.goodsSpuData.cat_id,
              goods_spec_name: this.goodsSpuData.goods_spec_name,
              brand_id: this.goodsSpuData.brand_id,
              goods_sn: this.ruleForm.goodCode,
              label_id: this.ruleForm.goodsLabelID,
              unit: this.ruleForm.unit,
              video: this.videoShow,
              goods_type: this.goodsTypeValue,
              goods_tag: this.goodsTagServe,
              manager_mobile: this.ruleForm.healthHousekeeper,
            };

            if (this.shakeAnti) {
              this.shakeAnti = false;

              // 发数据请求
              this.$sendHttp({
                method: 'post',
                url: `${process.env.VUE_APP_URL2}goods/editspu`,
                data: spuObj,
              }).then(res => {
                if (res.code == '0') {
                  this.$message({
                    message: `${res.msg}`,
                    type: 'success'
                  });

                  if (this.parentFrom == 'sell') {
                    this.$parent.spuSellEditSuccessFn();
                  } else {
                    this.$parent.spuWarehouseEditSuccessFn();
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
            this.$message({
              message: '请完整填写信息',
              type: 'warning'
            });
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
          this.$parent.spuCancelEditing();
        }).catch(() => {

        });
      },

      // spu视频上传成功
      videoUploadSuccess(response, file, fileList) {
        // 处理上传成功
        if (response.source) {
          this.videoShow = response.source;
          this.videoShowPlay = `${this.$videoShowHttp}${response.source}`
        }

        // 这里是我们自己后台返回上传失败的问题
        if (response.error) {
          this.$message.error(`视频上传失败：${response.error}`);
        }

      },

      // spu视频上传失败(这里是处理插件上传失败的问题)
      videoUploadError(err, file, fileList) {
        this.$message.error(`视频上传失败：${err}`);
      },

      // 删除视频
      videoDelete() {
        // 清除已上传的视频列表
        this.$refs.videoUp.clearFiles();
        this.videoShow = '';
        this.videoShowPlay = '';
      },


    },
  }
</script>

<style scoped lang="less">
  .upperShelf {}

  .titleH {
    font-size: 24px;
    font-weight: 600;
  }

  .previousStep {
    margin-top: 10px;
  }

  .previousStep span {
    font-size: 16px;
  }

  .butt {
    margin-left: 30px;
  }

  // 信息公共样式 css
  .information {
    margin: 20px 0;
    border: 1px solid #ccc;
  }

  .information h4 {
    text-indent: 10px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
  }

  .information_subject {
    padding: 10px;
    position: relative;
  }

  .current_class{
    height: 44px;
    line-height: 44px;
    margin: 0 0 10px 58px;
    p{
      font-size: 15px;
      color: #333;
    }
  }

  .Sp_attribute {
    margin-bottom: 20px;
  }

  // 长的input 尺寸
  .longInput {
    width: 600px;
  }

  // 短的input尺寸
  .shortInput {
    width: 200px
  }

  .basics_left {
    width: 360px;
    display: inline-block;
    vertical-align: top;
  }

  .submission {
    margin: 20px 0 20px 200px;
  }

  .routine_right,
  .routine_left {
    display: inline-block;
    vertical-align: top;
  }

  .routine_left {
    width: 130px;
    height: 40px;
    line-height: 40px;
    text-align: right;
    font-size: 14px;
    color: #606266;
  }

  .routine_right {
    border: 1px solid #ccc;
    width: 740px;
    margin-left: 10px;
  }

  .routine_right h4 {
    height: 40px;
    line-height: 40px;
    background: #fff;
    text-indent: 10px;
    font-size: 14px;
  }

  .basics {
    background: #eceff7;
    padding: 6px;
  }

  // 可选 可写的输入框
  .my-autocomplete li {
    line-height: normal;
    padding: 7px;
  }

  .my-autocomplete .name {
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .my-autocomplete .addr {
    font-size: 12px;
    color: #b4b4b4;
  }

  .my-autocomplete .highlighted .addr {
    color: #ddd;
  }

  .model_left {
    margin-left: 50px;
  }

  .listTop {
    margin-top: 10px;
  }

  .temporary {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 14px;
    margin: 10px 0 10px 200px;
    cursor: pointer;
  }

  .new_logistics {
    position: absolute;
    left: 400px;
    top: 10px;
  }

  // 售后服务css
  .service_sell {
    margin-left: 60px;

    h5 {
      margin-left: -10px;

      span {
        color: red;
        margin-right: 4px;
      }
    }
  }

  .all_election {
    margin-left: 80px;
    position: relative;
    top: -14px;
  }


  // 销售信息css
  .input-with-select {
    width: 400px;
    margin-left: 10px;
  }

  .miniInput {
    width: 100px;
    margin-left: 10px;
  }

  .upload_pictures {
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;
  }

  .upload_pictures .el-upload__tip {
    margin-top: 0;
  }

  .colour_left,
  .colour_right {
    display: inline-block;
    vertical-align: top;
  }

  .colour_left {
    width: 86px;
    line-height: 60px;
    text-align: center;
  }

  .new_input {
    margin: 10px 0;
  }

  .el_upload {
    margin-top: 4px;
  }

  // 商品发布详情
  .good_details {
    width: 780px;
    margin: 20px auto;
  }

  .good_title {
    height: 40px;
    line-height: 40px;
    background: #cbd9ef;
    position: relative;
  }

  .good_title span {
    margin-left: 16px;
  }

  .good_title div {
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 40px;
    text-indent: 16px;
    font-size: 20px;
  }

  .good_title div:hover {
    background: skyblue;
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
    width: 776px;
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
    width: 120px;
    margin-left: 10px;
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

  .code_list {
    margin-top: 20px;
  }

  .shelf_time {
    margin-left: -22px;
  }

  .mode_Input {
    width: 360px;
    margin-left: 10px;
  }

  .mode_Input1 {
    width: 440px;
    margin-left: 10px;
  }

  // 富文本编辑器
  .edit_container_height {
    height: 400px;
  }

  .edit_container {
    height: 480px;
  }

  .information_border {
    border: none;
  }

  // 是否支持开发票
  .invoice {
    margin-left: -62px;
  }

  // 视频
  .video_wrap {
    margin: 20px 0 0 20px;

    .video_up,
    .video_play {
      display: inline-block;
      vertical-align: middle;
    }

    .video_up {
      margin-right: 20px;

      .tips {
        font-size: 12px;
        color: #000;
        width: 100px;
      }
    }

    .video_play {
      width: 375px;
      height: 375px;
      position: relative;

      .video_delete {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 9;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: #E72E4D;
        line-height: 22px;
        text-align: center;
        color: #fff;
        font-size: 18px;
        cursor: pointer;
      }
    }

  }
</style>
