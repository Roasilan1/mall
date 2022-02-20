<template>
  <div class="pagination" @click="changePage">
    <button :data-page="last">上一页</button>
    <button :data-page="1" v-if="pageNo>1+halfContinuous">1</button>

    <button v-if="pageNo>1+halfContinuous+1">···</button>

    <button :data-page="num" :class="{curPage:pageNo===num}" v-for="(num,index) in startAndEnd.end" :key="index" v-show="num>=startAndEnd.start">{{num}}</button>

    <button v-if="pageNo<totalPages-halfContinuous-1">···</button>
    <!-- 最后一页 -->
    <button :data-page="totalPages" v-if="pageNo<totalPages-halfContinuous">{{ totalPages }}</button>
    <button :data-page="next">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
  
</template>

<script>
export default {
  name: "Pagination",
  props: {
    //一共有几页
    totalPages: {
      type: Number,
    },
    //先在是第几页
    pageNo: {
      type: Number,
    },
    //共多少条数据
    total: {
      type: Number,
    },
    //连续的页数
    continuous: {
      type: Number,
    },

    //还需要传入一个pageChange事件 
  },

  computed:{
    last(){
      return this.pageNo===1? 1:this.pageNo-1;
    },
    next(){
      return this.pageNo===this.totalPages? this.totalPages:this.pageNo+1;
    },
    startAndEnd(){
      const {continuous,pageNo,totalPages}=this;
      if(!pageNo)
        return {start:0,end:0};
      
      const halfContinuous=parseInt(continuous/2);
      let start,end=0;

      // 连续页码大于总页数  说明连续页码能把所有页面显示出来
      if(continuous>totalPages){
        start=1;
        end=totalPages;
      }else{
        start=pageNo-halfContinuous;
        end=pageNo+halfContinuous;
        //这里开始错误纠正
        if(start<1){
          start=1;
          end=continuous;
        }else if(end>totalPages){
          start=totalPages-continuous+1;
          end=totalPages;
        }
      }

      return {
        start,end
      }
    },
    halfContinuous(){
      return parseInt(this.continuous/2);
    }
  },
  methods:{
    changePage(e){
      const targetPage=e.target.dataset.page;
      
      if(targetPage==this.pageNo)
        return;
      if(!targetPage)
        return;
        //返回要去第几页
        
      this.$emit("pageChange",parseInt(e.target.dataset.page));
    }
  }
};
</script>

<style lang="less" scoped>
.pagination {
  .curPage {
    background: skyblue;
  }
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>