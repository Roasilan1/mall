<template>
    <a :title="title">
        <el-button v-bind="$attrs" v-on="$listeners">
            <slot></slot>
        </el-button>
    </a>
</template>

<script>

export default {
    props:{
        title:String
    }
}
</script>

<style>

</style>