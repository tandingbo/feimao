<style type="text/less" lang="less">
  @import '../../common';

  .categorys {
    height:1.7rem;
    >ul{
      width:100%;
      height:1.7rem;
      background-color: #fff;
      overflow: hidden;
      box-sizing: border-box;
      padding-top: .24rem;
      .border-bottom-1px;
      &.fixed{
        position:fixed;
        top:.9rem;
        left:0;
        z-index:10;
      }
      > li {
        float: left;
        width: 16.66%;
        text-align: center;
        overflow: hidden;
        img {
          width: .88rem;
          height: .88rem;
        }
        dd {
          font-size: .24rem;
        }
      }
    }
  }

  .seckill_goods {
    margin-top: .2rem;
    background-color: #fff;
    > .seckill_goods-time {
      height: 1rem;
      line-height: 1rem;
      padding: 0 .26rem;
      .border-bottom-1px;
      > .time {
        width: .6rem;
        height: .48rem;
        border-radius: .06rem;
        text-align: center;
        line-height: .48rem;
        background-color: #FFB305;
        &:nth-child(2) {
          margin-left: .1rem;
        }
      }
      > span:last-child {
        float: right;
        .span-bg-icon(.24rem, right);
        color: @light;
        background-image: url(../../assets/img/direction_right_gray.png);
      }
    }
  }

  .seckill_goods-goods {
    width: 100%;
    height: 3.8rem;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    font-size: 0;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
    > li {
      display: inline-block;
      width: 33.33%;
      height: 100%;
      text-align: center;
      vertical-align: top;
      > img {
        margin-top: .26rem;
        width: 2.2rem;
        height: 2.2rem;
      }
      > div.name {
        white-space: normal;
        text-align: left;
        margin: .1rem .1rem 0;
        min-height:.6rem;
        font-size: .24rem;
        line-height: .3rem;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      > div.price {
        overflow: hidden;
        text-align: left;
        > span {
          &:nth-child(1) {
            float: left;
            margin-left: .1rem;
          }
          &:nth-child(2) {
            float: right;
            margin-right: .2rem;
          }
          &.activity_price {
            font-size: .28rem;
            color: #D0021B;
          }
          &.price {
            font-size: .24rem;
            color: @light;
            text-decoration: line-through;
            &:before {
              content: '';
              font-size: .28rem;
            }
          }
          &.activity_content {
            font-size: .28rem;
            color: #D0021B;
          }
        }
      }
    }
  }

  .sepcial {
    margin-top: .2rem;
    background-color: #fff;
    > img {
      display: block;
      height: 3rem;
    }
  }

  .goods {
    display: block;
    margin-top: .2rem;
    background-color: #fff;
    > div {
      height: .8rem;
      line-height: .8rem;
      text-align: center;
      font-size: .26rem;
      > hr {
        display: inline-block;
        margin: .2rem;
        width: .6rem;
        height: 1px;
        background-color: #000;
        vertical-align: middle;
      }
    }
  }
</style>
<template>
  <div class="bottom-container" style="padding-top:.9rem;" ref="container">
    <search-input v-href="'search'" disabled ref="searchInput">
      <span v-if="message_count">{{message_count > 9 ? '9+' : message_count}}</span>
      <img v-href.stop="'message'" src="../../assets/img/nav_message.png">
    </search-input>
    <swiper
      :list="banner.list"
      v-model="banner.index"
      @on-index-change="bannerIndexChange"
      :aspect-ratio="8/15"
      dots-position="center"
      auto
      loop
    ></swiper>
    <div class="categorys">
      <ul :class="{fixed:isCategorysFixed}" ref="categorys">
        <li v-for="category in categorys" @click="openCategorys(category.category_id)">
          <dl>
            <dt>
              <img :src="category.cover">
            </dt>
            <dd>{{category.name}}</dd>
          </dl>
        </li>
      </ul>
    </div>
    <scroll-notice v-if="notices.length" :notices="notices"></scroll-notice>
    <div class="seckill_goods" v-if="seckill_goods.time && seckill_goods.time.length">
      <div class="seckill_goods-time" v-for="time in seckill_goods.time">
        <span>{{time.activity_name}}</span>
        <span class="time">{{seckill_goods_D_time | countdown | countdown_h}}</span>
        :
        <span class="time">{{seckill_goods_D_time | countdown | countdown_m}}</span>
        :
        <span class="time">{{seckill_goods_D_time | countdown | countdown_s}}</span>
        <span
          style="font-size:.24rem;color:#030303;vertical-align: top;">后{{ifStarted.seckill_goods ? '结束' : '开始'}}</span>
        <span v-href="['activity_goods', {type:1, name:time.activity_name}]">查看全部</span>
      </div>
      <ul class="seckill_goods-goods">
        <li v-for="item in seckill_goods.goods">
          <img :src="item.cover">
          <div class="name">{{item.name}}</div>
          <div class="price">
            <span class="activity_price">¥{{item.activity_price}}</span>
            <span class="price">¥{{item.price}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="seckill_goods" v-if="coupon_goods.time && coupon_goods.time.length">
      <div class="seckill_goods-time" v-for="time in coupon_goods.time">
        <span>{{time.activity_name}}</span>
        <span class="time">{{coupon_goods_D_time | countdown | countdown_h}}</span>
        :
        <span class="time">{{coupon_goods_D_time | countdown | countdown_m}}</span>
        :
        <span class="time">{{coupon_goods_D_time | countdown | countdown_s}}</span>
        <span
          style="font-size:.24rem;color:#030303;vertical-align: top;">后{{ifStarted.coupon_goods ? '结束' : '开始'}}</span>
        <span v-href="['activity_goods', {type:2, name:time.activity_name}]">查看全部</span>
      </div>
      <ul class="seckill_goods-goods">
        <li v-for="item in coupon_goods.goods">
          <img :src="item.cover">
          <div class="name">{{item.name}}</div>
          <div class="price">
            <span class="price">¥{{item.activity_price}}</span>
            <span class="activity_content">{{item.activity_content}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="sepcial">
      <img v-for="item in sepcial.cover" :src="item.image">
      <ul class="seckill_goods-goods">
        <li v-for="item in sepcial.goods">
          <img :src="item.cover" v-href="['goods_detail', {goods_id:item.goods_id}]">
          <div class="name">{{item.name}}</div>
          <div class="price">
            <span class="activity_price">¥{{item.price}}</span>
          </div>
        </li><!--
        --><li v-if="sepcial.goods && sepcial.goods.length > 3" @click="toGoods">
          <img src="../../assets/img/goods_more.png">
          <div style="font-size:.24rem;margin-top:.1rem;">查看全部</div>
        </li>
      </ul>
    </div>
    <div class="goods" ref="goods">
      <div>
        <hr>
        全部商品
        <hr>
      </div>
      <goods-container style="padding-top:0;" :goods="goods"></goods-container>
    </div>
    <the-footer current="1"></the-footer>
    <app-permanent type="2"></app-permanent>
  </div>
</template>
<script>
  import AppPermanent from '@c/AppPermanent.vue'
  import SearchInput from '@c/SearchInput.vue'
  import TheFooter from '@c/TheFooter.vue'
  import ScrollNotice from '@c/ScrollNotice.vue'
  import GoodsContainer from '@c/GoodsContainer.vue'
  import {Swiper} from 'vux'

  export default {
    data () {
      return {
        clientWidth:document.documentElement.clientWidth,
        message_count: 0,
        banner: {
          list: [],
          index: 0,
        },
        categorys: [],
        notices: [],
        seckill_goods: {},
        coupon_goods: {},
        sepcial: {},
        goods: [],
        seckill_goods_D_time: 0,
        coupon_goods_D_time: 0,
        isCategorysFixed:false,
      }
    },
    computed: {
      seckill_goods_time(){
        const time = this.seckill_goods.time[0];
        if(!time) return;
        return {
          time: time,
          start: Number(time.date_start),
          end: Number(time.date_end)
        }
      },
      coupon_goods_time(){
        const time = this.coupon_goods.time[0];
        if(!time) return;
        return {
          time:time,
          start:Number(time.date_start),
          end:Number(time.date_end),
        };
      },
      ifStarted(){
        return {
          seckill_goods: this.seckill_goods_time ? Date.parse(new Date()) / 1000 > this.seckill_goods_time.start : undefined,
          coupon_goods:this.coupon_goods_time ? Date.parse(new Date()) / 1000 > this.coupon_goods_time.start : undefined,
        }
      }
    },
    methods: {
      toGoods(){
        const goodsTop = this.$refs.goods.offsetTop;
        const categorysHeight = this.$refs.categorys.clientHeight;
        const searchInputHeight = this.$refs.searchInput.$el.clientHeight;
        window.scrollTo(0, goodsTop - searchInputHeight - categorysHeight);
      },
      bannerIndexChange (index) {
        this.banner.index = index
      },
      getD_timestamp(){
        const now = Date.parse(new Date()) / 1000;
        if(this.seckill_goods_time){
          this.seckill_goods_D_time = now < this.seckill_goods_time.start
            ? this.seckill_goods_time.start - now
            : this.seckill_goods_time.end - now;
        }
        if(this.coupon_goods_time){
          this.coupon_goods_D_time = now < this.coupon_goods_time.start
            ? this.coupon_goods_time.start - now
            : this.coupon_goods_time.end - now;
        }
        setTimeout(this.getD_timestamp, 1000);
      },
      openCategorys(category_id){
        openPage('categorys', {category_id, categorys:this.categorys})
      },
      fetch(){
        this.$post(URL.getGoodsHomeData)
          .then(res => {
            if (res.errcode == 0) {
              console.log(res)
              const content = res.content;
              const banners = content.banners;
              for (let i in banners) {
                banners[i].img = banners[i].image
              }
              this.banner.list = banners;
              this.categorys = content.categorys;
              this.notices = content.notices;
              this.seckill_goods = content.seckill_goods;
              this.coupon_goods = content.coupon_goods;
              this.sepcial = content.sepcial;
              this.goods = content.goods;
              this.getD_timestamp();
            } else {
              errback(res)
            }
          });
        this.fetchMsgCount();
      },
      fetchMsgCount(){
        this.$post(URL.getInitData)
          .then(res => {
            this.message_count = res.content.message_count;
          })
      }
    },
    created(){
      this.fetch();
      window.addEventListener('scroll', () => {
        this.isCategorysFixed = window.scrollY > this.clientWidth * 8 / 15;
      })
    },
    components: {
      AppPermanent,
      SearchInput,
      TheFooter,
      Swiper,
      ScrollNotice,
      GoodsContainer,
    }
  }
</script>
