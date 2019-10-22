<template>
    <div>
        <Card :dis-hover="true" class="article_card" v-for="(item, index) in articleList" :key="index">
            <div slot="title" >
                <div class="type_tag">{{item.releaseType}}</div>&nbsp;
                <span class="article_title"><router-link :to="'/article/detail/'+ item.id"><h3>{{item.title}}</h3></router-link></span>
            </div>
            <!-- <a href="#" slot="extra">
                <Icon type="ios-loop-strong"></Icon>
                Change
            </a> -->
            <div class="article_content">{{item.rawContent}}</div>
            <div class="footer_info">
                {{item.createTime|formatDate}} | 阅读数&nbsp;&nbsp;{{item.readCount?item.readCount:0}}
                <div class="footer_info_right">
                    <Icon class="footer_tag" type="ios-pricetags" size="20" />
                    <span class="article_tag" v-for="(tag, index) in item.tags" :key="index">{{tag}}</span>
                    <!-- <Tag v-for="(tag, index) in item.tags" type="border" :key="index">{{tag}}</Tag> -->
                </div>
            </div>
        </Card>
    </div>
</template>
<script>
import {getNewArticle} from '@/api/ArticleApi'
export default {
    data() {
        return {
            articleList: []
        }
    },
    mounted() {
        this.getAllArticle()
    },
    methods: {
        getAllArticle(){
            getNewArticle().then((res) => {
                this.articleList = res.data
            })
        }
    },
}
</script>
<style lang="less" scopes>
    .article_card{
        width: 100%;
        height: 200px;
        margin-bottom: 15px;
        position: relative;
        opacity: .8;
        .type_tag{
            position: absolute;
            left: -9px;
            top: 7px;
            width: 40px;
            line-height: 30px;
            text-align: right;
            height: 30px;
            background: #ee7600;
            color: #fff;
            &::before{
                position: absolute;
                z-index: 1;
                height: 0;
                left: 40px;
                color: #000;
                border: 15px solid #ee7600;
                border-right-color: transparent;
                content: '';
                // box-shadow: 0 5px 5px -5px #000;
            }
            &::after{
                content: '';
                position: absolute;
                top: 30px;
                left: 0;
                border: 4px solid #e9b46b;
                border-left-color: transparent;
                border-bottom-color: transparent
            }
        }
        .article_content{
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            overflow: hidden;
            color: #666;
        }
        .footer_info{
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            padding: 15px 15px 5px 15px;
            line-height: 26px;
            color: #a09e9e;
            .footer_info_right{
                @media screen and (max-width: 720px){
                    float: left;
                    text-align: left;
                }
                float: right;
                text-align: right;
                .footer_tag{
                    transform: rotate(270deg);
                    margin-right: 5px;
                }
                .article_tag{
                    display: inline-block;
                    text-decoration: underline;
                    cursor: pointer;
                }
            }
        }
        .article_title{
            margin-left: 50px;
            h3{
                display: inline-block;
            }
            a{
                color: #5b5959;
                &:hover{
                    color: #2d8cf0 !important;
                }
            }
        }
    }
</style>