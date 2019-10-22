<template>
    <div id="managerArticle">
        <Row :gutter="16" class-name="top_row">
            <Col :span="12">
                <Input search enter-button="搜索" placeholder="标题/内容" />
            </Col>
            <Col :span="12" class-name="text_right">
                <Button type="primary" @click="addArticle()">添加文章</Button>
            </Col>
        </Row>
        <ArticlTable></ArticlTable>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import ArticlTable from '@/components/ArticleTable'
export default Vue.extend({
    components: {
        ArticlTable
    },
    data(){
        return {

        }
    },
    methods: {
        addArticle(){
            this.$router.push({path: '/admin/article/create'})
        }
    }    
})
</script>
<style lang="less" scoped>
    .text_right{
        text-align: right
    }
    .top_row{
        margin-bottom: 15px;
    }
</style>
