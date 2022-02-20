<template>
    <div class="container">
        <div class="circle"></div>
        <p>加载中,请等待...</p>
    </div>
    
</template>

<script>
export default {
 
}
</script>

<style lang="less" scoped>
    .container{
        position: absolute;
        z-index: 999;
        left: 50%;
        top: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: translateX(-50%);
        .circle{
            width: 80px;
            height: 80px;
            background: transparent;
            border-radius: 50%;
            border-top: 15px solid royalblue;
            border-bottom: 15px solid lightgray;
            border-left: 15px solid lightgray;
            border-right: 15px solid lightgray;
            animation: rtt linear 1s infinite;
            
        }
        p{
            margin-top: 20px;
            font-size: 20px;
            color: royalblue;
        }
        @keyframes rtt {
            0%{
                transform: rotate(0deg);
            }
            100%{
                transform: rotate(360deg);
            }
        }
    }

</style>