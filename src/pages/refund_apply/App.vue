<style type="text/less" lang="less">
  @import '../../common';

  .refund_apply-ul {
    margin-top: .1rem;
    .row-container(1rem, .28rem);
    > li.row {
      &.no-border-bottom {
        &:after {
          width: 0;
          height: 0;
        }
      }
      > .title {
        width: 1.4rem;
      }
      > input {
        font-size: .28rem;
        ::placeholder {
          color: @light;
        }
      }
    }
    > li.images {
      background-color: #fff;
      padding-bottom: .3rem;
      > span {
        margin-bottom: .2rem;
        margin-left: .38rem;
        width: 1.4rem;
        height: 1.4rem;
        line-height: 2rem;
        text-align: center;
        font-size: .2rem;
        color: @light;
        background: url(../../assets/img/upload_pic.png) no-repeat center .4rem;
        background-size: .44rem .36rem;
        border: .5px solid #979797;
        box-sizing: border-box;
      }
    }
  }
</style>
<template>
  <div>
    <goods-list v-if="goods" :goods="[goods]" cantOpenGoods></goods-list>
    <ul class="refund_apply-ul">
      <li class="row">
        <span class="title">退款原因</span>
        <input v-model="reason" placeholder="请输入退款原因">
      </li>
      <li class="row">
        <span class="title">退款金额</span>
        <input v-model="money" placeholder="不可超过商品价格">
        <span class="right">元</span>
      </li>
      <li class="row no-border-bottom">
        <span class="title">上传凭证</span>
      </li>
      <li class="images">
        <span v-for="image in images">

        </span><!--
        --><span v-show="images.length < 6">{{images.length + 1}}/6</span>
      </li>
    </ul>
    <div class="btn-big" style="margin-top:.7rem;" @click="apply">提交</div>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  import GoodsList from '@c/GoodsList.vue'
  export default {
    data () {
      return {
        content:null,
        goods: null,
        type: 1,
        order_sn: null,
        refund_sn:null,
        reason: '',
        money: '',
        images: [],
      }
    },
    computed: {
      params(){
        const params = {
          type: this.type,
          goods_id: this.goods.goods_id,
          option_id: this.goods.option_id,
          reason: this.reason,
          money: this.money,
        };
        if(this.order_sn) {
          params.order_sn = this.order_sn
        }else{
          params.refund_sn = this.refund_sn;
        }
        if(this.images.length)
            params.images = this.images.join(',');
        return params;
      }
    },
    methods: {
      apply(){
        if(!this.reason.trim()){
          toast('请输入退款原因');
          return;
        }

        if(Number(this.money) > this.content.refund_amount) {
          toast('可退款最大金额为' + this.content.refund_amount + '元');
          return;
        }
        let url = this.order_sn ? URL.refund : URL.reapplyRefund;
        this.$post(url, this.params)
          .then( res => {
            console.log(res)
            if(res.errcode == 0) {
              alert('提交成功！交由后台审核，三个工作室日内反馈结果');
              history.go(-1);
            }else{
              errback(res);
            }
          })
      },
      getRefundMoney(){
        this.$post(URL.getRefundMoney, {order_sn:this.order_sn, goods_id:this.goods.goods_id, option_id: this.goods.option_id})
          .then ( res=> {
            console.log(res)
            if(res.errcode == 0) {
              this.content = res.content;
            }else{
              errback(res);
            }
          })
      },
    },
    created(){
      document.title = '申请退款';
      console.log(getSearchParams(location.search));
      const {goods, order_sn, refund_sn} = getSearchParams(location.search);
      this.goods = goods;
      this.order_sn = order_sn;
      this.refund_sn = refund_sn;
      this.getRefundMoney();
    },
    components: {
      AppPermanent,
      GoodsList,
    }
  }
</script>
