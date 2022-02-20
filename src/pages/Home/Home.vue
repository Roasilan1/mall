<template>
<div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="item in floors" :key="item.id" :list="item"></Floor>
    <Brand/>
</div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer/ListContainer'
import Recommend from "@/pages/Home/Recommend/Recommend";
import Rank from "@/pages/Home/Rank/Rank";
import Like from "@/pages/Home/Like/Like";
import Floor from "@/pages/Home/Floor/Floor";
import Brand from "@/pages/Home/Brand";

import {mapState} from "vuex";
export default {
  components: { ListContainer,Recommend,Rank,Like,Floor,Brand},
    name:"Home",
    mounted(){
      this.$store.dispatch("getFloors");
    },
    computed:{
      ...mapState({
        floors(){
          return this.$store.state.home.floors;
        }
      })
    }
}
</script>

<style lang="less" scoped>

</style>