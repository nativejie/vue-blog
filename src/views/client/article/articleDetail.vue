<template>
    <div id="articleDetail">
        <div class="article_title">
            <h1>{{article.title}}</h1>
        </div>
        <div class="title_info">
            <p>{{article.createTime|formatDate}}  阅读数：{{article.readCount?article.readCount:0}}</p>
        </div>
        <span class="markdown-body" v-html="article.content"></span>
    </div>
</template>
<script>
import 'mavon-editor/dist/css/index.css'
import {getArticle} from '@/api/ArticleApi'
export default {
    data() {
        return {
            id: "",    
            article: "",
        }
    },
    mounted() {
        this.id = this.$route.params.id;
        this.getArticleById();
    },
    methods: {
        getArticleById(){
            getArticle(this.id).then((res) => {
                this.article = res.data;
            })
        }
    },
}
</script>
<style lang="less" scoped>
    #articleDetail{
        background-color: #fff;
        padding: 15px;
        .article_title{
            text-align: center;
            
        }
        .title_info{
            text-align: left;
            color: #807b7b;
            margin-bottom: 20px;
        }
    }
</style>