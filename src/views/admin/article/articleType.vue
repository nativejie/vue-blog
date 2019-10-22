<template>
    <div id="managerArticle">
        <div class="operate_top">
            <Button type="primary" @click="showTypeModel = true">添加个人分类</Button>
            
        </div>
        <Row :gutter="20">
            <Col :span="4" v-for="(item, index) in types" :key="index">
                <Card>
                    <div style="text-align:center">
                        <h3>{{item.name}}</h3>
                    </div>
                </Card>
            </Col>
        </Row>
        <Modal title="添加分类" 
            v-model="showTypeModel" 
            @on-ok="addType">
            <Form :model="typeForm" inline>
                <FormItem label="分类名">
                    <Input type="text" v-model="typeForm.name" placeholder="分类名">
                    </Input>
                </FormItem>
                <FormItem label="类型">
                    <Select v-model="typeForm.type">
                        <Option value="1">个人分类</Option>
                        <Option value="0">博客分类</Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Modal } from 'iview'
import { getAllType,createType } from '@/api/ArticleApi'
export default Vue.extend({
    data(){
        return {
            showTypeModel: false,
            types: [],
            typeForm: {}
        }
    },
    mounted(){
        this.getAllType();
    },
    methods: {
        addType(){
            createType(this.typeForm).then((res) => {
                this.$Message.success('添加成功');
                this.getAllType();
            })
        },
        showModel(){
            this.showTypeModel = true
        },
        getAllType(){
            getAllType().then((res) => {
                this.types = res.data
            })
        }
    }    
})
</script>
<style lang="less" scoped>
    .operate_top{
        text-align: left;
        margin-bottom: 15px;
    }
</style>
