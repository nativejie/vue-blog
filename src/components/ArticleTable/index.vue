<template>
    <div>
        <Table stripe :columns="columns" :data="artileList">
            <template slot-scope="{row}" slot="modifiedTime">
                {{row.modifiedTime}}
            </template>
        </Table>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {getAllArticle} from '../../api/ArticleApi';
import * as utils from '@/utils/';
export default Vue.extend({
    data(){
        return {
            columns: [
                {
                    title: '标题',
                    key: 'title'
                },
                {
                    title: '发布类型',
                    key: 'releaseType'
                },
                {
                    title: '个人分类',
                    key: 'customType'
                },
                {
                    title: '阅读量',
                    key: 'readCount'
                },
                {
                    title: '创建时间',
                    key: 'createTime'
                },
                {
                    title: '最后修改时间',
                    slot: 'modifiedTime',
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 120,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                on: {
                                    click: ()=>{
                                        this.$router.push({path: `/admin/article/edit/${params.row.id}`})
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: ()=>{

                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            artileList: []
        }
    },
    mounted(){
        this.getAllArticle()
    },
    methods: {
        getAllArticle(){
            getAllArticle().then((res) => {
                this.artileList = res.data;
            })
        }
    }
})
</script>
<style lang="less" scoped>
    
</style>