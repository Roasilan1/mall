<template>
<header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>尚品汇欢迎您！</p>
                    
                    <p v-if="userInfo.nickName">
                        <span>欢迎</span>
                        <span>{{userInfo.nickName}}</span>
                        <span class="register" @click="logout">退出登录</span>
                    </p>
                    <p v-else>
                        <span>请</span>
                        <router-link href="###" to="/login">登录</router-link>
                        <router-link href="###" class="register" to="/register">免费注册</router-link>
                    </p>
                    
                </div>
                <div class="typeList">
                    <router-link to="/center">我的订单</router-link>
                    <a href="###">我的购物车</a>
                    <a href="###">我的尚品汇</a>
                    <a href="###">尚品汇会员</a>
                    <a href="###">企业采购</a>
                    <a href="###">关注尚品汇</a>
                    <a href="###">合作招商</a>
                    <a href="###">商家后台</a>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <a class="logo" title="尚品汇" href="###" target="_blank">
                    <img src="@/assets/images/logo.png" alt="">
                </a>
            </h1>
            <div class="searchArea">
                <form action="###" class="searchForm">
                    <input type="text" id="autocomplete" v-model="keyword" class="input-error input-xxlarge" @input="keywordChange"/>
                    <button class="sui-btn btn-xlarge btn-danger" type="button" @click="search">搜索</button>
                </form>
            </div>
        </div>
    </header>
</template>

<script>
import debounce from "@/utils/debounce.js";

export default {
    name:"Header",
    data(){
        return{
            keyword:'',
            //防抖函数初始化
            searchFn:debounce(this.search,500)
        }
    },
    mounted(){
        this.$bus.$on("clearKeyword",this.clearKeyword);
    },
    methods:{
        search(){
            //搜索携带的是params参数  要将query参数与params参数合并
            let query={};
            if(this.$route.query)
                query=this.$route.query;
            this.$router.push({
                name:"search",
                params:{
                    keyword:this.keyword
                },
                query
            })
        },
        clearKeyword(){
            this.keyword="";
        },
        keywordChange(){
            //调用防抖函数
            this.searchFn();
        },
        // 退出登录后跳转到主页
        logout(){
            if(confirm("你确定要退出登录吗？")){
                this.$store.dispatch("logout");
                this.$router.push("/home");
            }
        }
    },
    beforeDestroy(){
        this.$bus.$off("clearKeyword");
    },
    computed:{
        userInfo(){
            return this.$store.state.user.userInfo;
        }
    }
}
</script>
<style lang="less" scoped>
    .header{
        &>.top{
            background-color: #eaeaea;
            height: 30px;
            line-height: 30px;
            .container{
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;
                .loginList{
                    float: left;
                    p{
                        float: left;
                        margin-right: 10px;
                        .register{
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                } 
                .typeList{
                    float: right;
                    a{
                        padding: 0 10px;
                        & + a{
                            border-left: 1px solid #b3aeae;
                        }
                    }
                    
                }
                
            }
        }
        &>.bottom{
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;
            .logoArea{
                float: left;
                .logo{
                    img{
                        width: 175px;
                        margin: 25px 45px;
                    }
                }
            }
            .searchArea{
                float: right;
                margin-top: 35px;
                .searchForm{
                    overflow: hidden;
                    input{
                        box-sizing: border-box;
                        width: 490px;
                        height: 32px;
                        padding: 0px 4px;
                        border: 2px solid #ea4a36;
                        float: left;
                        &:focus{
                            outline: none;
                        }
                    }
                    button{
                        height: 32px;
                        width: 68px;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;
                        &:focus{
                            outline: none;
                        }
                    }
                }
            }
        }
    }
</style>