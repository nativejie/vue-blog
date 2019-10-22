<template>
<div id="index">
    <Row class="top_row">
        <!-- <h1>千羽的博客</h1> -->
    </Row>
    <Row :gutter="20">
        <Col :lg="{span:4 , offset: 1}" :xs="{span: 24}" :md="{span: 24}">
        <div class="user_card">
            <div class="user_info">
                <img src="../../assets/images/avatar.png" />
                <p class="name_font">{{user.nickname}}</p>
                <p class="info_font">
                    <Icon type="ios-briefcase" size="15" />{{user.offer}}</p>
                <p class="info_font">
                    <Icon type="ios-mail" size="15" />{{user.email}}</p>
                <!-- <p class="info_font">{{user.description}}</p> -->
            </div>
        </div>
        <div class="menu_card">
            <div class="menu_title">导航</div>
            <div class="hot_article">
                <ul class="menu">
                    <router-link to="/">
                        <li class="menu_li active">
                            <Icon type="ios-home" size="16" />主页
                        </li>
                    </router-link>
                    <router-link to="/article/list">
                        <li class="menu_li">
                            <Icon size="16" type="ios-list-box" />文章列表
                        </li>
                    </router-link>
                    <router-link to="/article/archive">
                        <li class="menu_li">
                            <Icon size="16" type="ios-paper" />归档
                        </li>
                    </router-link>
                    <router-link to="/about">
                        <li class="menu_li">
                            <Icon size="16" type="md-help-circle" />关于我
                        </li>
                    </router-link>
                </ul>
            </div>
        </div>
        <Card dis-hover class="article_card">
            <p slot="title">热门文章</p>
            <div class="hot_article">
                <router-link to="#" v-for="(item, index) in hotArticle" :key="index">
                    <p>{{item.title}}</p>
                    <span class="read_count">阅读数：{{item.readCount?item.readCount:0}}</span>
                </router-link>
            </div>
        </Card>
        </Col>
        <Col :xs="{span: 24}" :lg="{span:13}" :md="{ span: 24}" class="content">
            <router-view></router-view>
        </Col>

    </Row>
</div>
</template>

<script>
import {
    getUser
} from '@/api/UserApi'
import {
    getAllType,
    getHotArticle
} from '@/api/ArticleApi'

export default {
    data() {
        return {
            user: '',
            articleList: [],
            customType: [],
            hotArticle: []
        }
    },
    mounted() {
        this.getUser();
        this.getCustomType();
        this.getHotArticle();
    },
    methods: {
        getUser() {
            getUser().then((res) => {
                this.user = res.data;
            })
        },
        getCustomType() {
            getAllType().then((res) => {
                this.customType = res.data.filter((val, index, arr) => {
                    return val.type == 1
                })
            })
        },
        getHotArticle() {
            getHotArticle().then((res) => {
                this.hotArticle = res.data;
            })
        }
    },
}
</script>

<style lang="less" scoped>
#index {
    // background: url('../../assets/images/background_001.jpg') no-repeat right fixed;
    overflow-x: hidden;
    background-color: #fff;

    .content {
        background-color: transparent;

        &::before {
            content: ''
        }

        @media screen and (max-width: 450px) {
            padding: 0 15px !important;

        }

        padding: 0;
    }

    .top_row {
        // height: 70px;
        padding: 20px 0;
        margin-bottom: 20px;
        background-color: #fff
    }

    .menu_col {
        margin-bottom: 15px;
    }

    .menu_card {
        height: 200px;
        width: 100%;
        // background-color: #fff;
        margin-bottom: 15px;
        border: 1px solid #e8eaec;
        position: relative;

        .menu_title {
            padding: 10px;
            width: 100%;
            border: 0;
            border-bottom: 1px;
            border-color: #e8eaec;
            border-style: solid;
        }

        .menu {
            margin-top: 5px;
            a{
                color: #000;
            }
            .router-link-active {
                color: #000;

                &:hover {
                    color: #000;

                    :after {
                        width: 100%;
                        border-bottom: 1px solid #666;
                    }
                }

                &:after {
                    content: '';
                    display: block;
                    width: 0;
                    transition: width 0.5s ease;
                    position: absolute;
                    top: 14px;
                    bottom: 0;
                    left: 0;

                }
            }

            .router-link-exact-active>li {
                background-color: #f9f9f9;
            }

            .menu_li {
                @media screen and (max-width: 350px) {}

                padding: 10px 15px;
                display: block;

                &:hover {
                    background-color: #f9f9f9;
                }

            }
        }
    }

    .user_card {
        width: 100%;
        height: 250px;
        background-color: #fff;
        margin-bottom: 15px;
        text-align: center;
        border: 1px solid #e8eaec;
        position: relative;

        .user_info {
            width: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -40%);

            img {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                transition: 0.5s;

                &:hover {
                    transform: rotate(180deg);
                    transition: 0.5s
                }
            }

            .name_font {
                font-size: 16px;
                font-weight: 700
            }

            .info_font {
                color: #a7a2a2
            }

        }

    }

    .article_card {
        width: 100%;
        min-height: 250px;
        background-color: #fff;

        @media screen and (max-width: 720px) {
            display: none
        }

        .hot_article {
            a {
                color: #191818 !important;

                :hover {
                    color: #2d8cf0
                }
            }

            p {
                width: 174px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .read_count {
                color: #a3a1a1;
                font-size: 10px !important;
            }

            line-height: 20px;
            font-size: 12px;
        }
    }
}
</style>
<style>
.ivu-card-bordered {
    border-radius: 0;
}
</style>
