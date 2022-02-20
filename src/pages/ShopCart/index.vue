<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cartItem,index) in shopCartList" :key="index">
          <li class="cart-list-con1">
            <input type="checkbox" @change="checkboxChange(cartItem)" :value="1" v-model="cartItem.isChecked" name="chk_list">
          </li>
          <li class="cart-list-con2">
            <img :src="cartItem.imgUrl">
            <div class="item-msg">{{cartItem.skuName}}</div>
          </li>
  
          <li class="cart-list-con4">
            <span class="price">{{cartItem.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" @click="handler('reduce',-1,cartItem)" class="mins">-</a>
            <input autocomplete="off" type="text" @change="handler('alter',$event.target.value,cartItem)"  :value="cartItem.skuNum" minnum="1" class="itxt">
            <a href="javascript:void(0)" class="plus" @click="handler('add',1,cartItem)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cartItem.skuPrice*cartItem.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCart(cartItem)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>


      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" ref="selectAll" :checked="selectAllChecked" @change="selectAll()">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="goSettle">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

  export default {
    name: 'ShopCart',
    created(){
      this.getCart();
    },
    computed:{
      ...mapGetters(["shopCartList"]),
      totalPrice(){
        let sum=0;
        this.shopCartList.forEach(item=>{
          if(item.isChecked==1)
            sum+=item.skuNum*item.skuPrice;
        })
        return sum;
      },
      selectAllChecked(){
        return this.shopCartList.every(item=>{
          return item.isChecked==1;
        })
      }
    },
    methods:{
      getCart(){
        this.$store.dispatch("shopCart");
      },
      add(item){
        item.skuNum++;
      },
      reduce(item){
        item.skuNum--;
      },
      //当购买的商品数量 由用户编辑 或者由用户自行点击添加或减少 需要触发防抖
      handler(type,value,item){
        value=parseInt(value)
        if(isNaN(value))
        {
            item.skuNum=1;
            return;
        }
        const params={skuId:item.skuId}
        switch(type){
          case 'add':
            params.skuNum=1;
            item.skuNum++;
            break;
          case 'reduce':
            if(item.skuNum<=1)return;
            params.skuNum=-1;
            item.skuNum--;
            break;
          case 'alter':
            params.skuNum=value-item.skuNum;
            item.skuNum=value;
            break;
        };
        this.$store.dispatch("addTocart",params);
      },
      checkboxChange(item){
        const check=item.isChecked==1? true:false;
        const targetChecked=check? 1:0;
        item.isChecked=targetChecked;
        const params={skuId:item.skuId};
        params.isChecked=targetChecked;
        this.$store.dispatch("checkCart",params);

      },
      selectAll(){
        const checked=this.$refs.selectAll.checked;
        this.shopCartList.forEach(item=>{
          const params={skuId:item.skuId};
          const target_checked=checked? 1:0;
          params.isChecked=target_checked;
          item.isChecked=target_checked;
            this.$store.dispatch("checkCart",params);

        });
      },
      //删除购物车单项
      deleteCart(item){
        if(confirm("你确定要删除本项吗"))
        {
          this.$store.dispatch("deleteCart",item.skuId);
          this.getCart();
        }
      },
      //删除选中的条目
      deleteChecked(item){
        if(confirm("你确定要删除选中的条目吗?")){
          try{
            this.$store.dispatch("deleteAllCheckedCart");
            this.getCart();
          }catch(error){
            alert(error.message);
          }
        }
      },
      //购物车结算
      goSettle(){
        this.$router.push("/trade");
      }
    },
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con3 {
            width: 20.8333%;

            .item-txt {
              text-align: center;
            }
          }

          .cart-list-con4 {
            width: 12.5%;

          }

          .cart-list-con5 {
            width: 12.5%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 12.5%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 12.5%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>