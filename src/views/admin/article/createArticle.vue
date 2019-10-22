<template>
    <div>
    <Form :model="articleForm" label-position="right" :label-width="100">
        <FormItem label="标题">
            <Input v-model="articleForm.title" placeholder="请输入标题"></Input>
        </FormItem>
        <Row :gutter="20">
            <Col :span="6">
                <FormItem label="标签"  >
                    <Select v-model="articleForm.tags" multiple>
                        <Option value="Vue">Vue</Option>
                        <Option value="Javascript">Javascript</Option>
                        <Option value="Web前端">Web前端</Option>
                        <Option value="Css">Css</Option>
                        <Option value="Html">Html</Option>
                    </Select>
                </FormItem>
            </Col>
            <Col :span="6">
                <FormItem label="个人分类"  >
                    <Select v-model="articleForm.customType" multiple>
                        <Option v-for="(item, index) in customType" :key="index" :value="item.name">{{item.name}}</Option>
                    </Select>
                </FormItem>
            </Col>
            <Col :span="6">
                <FormItem label="博客分类">
                    <Select v-model="articleForm.classify" >
                        <Option v-for="(item, index) in blogType" :key="index" :value="item.name">{{item.name}}</Option>
                    </Select>
                </FormItem>
            </Col>
            <Col :span="6">
                <FormItem label="发布类型">
                    <Select v-model="articleForm.releaseType" >
                        <Option value="原创">原创</Option>
                        <Option value="转载">转载</Option>
                        <Option value="翻译">翻译</Option>
                    </Select>
                </FormItem>
            </Col>
        </Row>
        <FormItem label="正文">
            <mavon-editor 
                @imgAdd="handleUpdateImage"
                ref="md"
                @imgDel="handleImageDel"
                v-model="articleForm.rawContent" 
                @change="change" 
                style="min-height: 600px"
            />
        </FormItem>
        <FormItem>
            <Button type="primary" @click="save">保存</Button>
            <Button style="margin-left: 8px" @click="saveDraft">保存草稿</Button>
            <Button style="margin-left: 8px" @click="back">取消</Button>
        </FormItem>
    </Form>
    </div>
</template>



<script>
import {mavonEditor} from 'mavon-editor'
import {getAllType, createArticle, getArticle, updateArticle} from '@/api/ArticleApi'
import {uploadImage} from '@/api/CommonApi'
import * as utils from '@/utils/'
export default {
    // 注册
    components: {
        mavonEditor,
    },
    data() {
        return {
            articleForm: {},
            content:'', // 输入的markdown
            customType: [],
            blogType: [],
            id: ''
        }
    },
    mounted() {
        this.getAllType();
        this.id = this.$route.params.id
        if(this.id){
            this.getArticleDetail();
        }
    },
    methods: {
        async handleUpdateImage(pos, file){
            let formData = new FormData();
            formData.append('imgFile', file)
            let result = await uploadImage(formData);
            this.$refs.md.$img2Url(pos, result.data)
        },
        handleImageDel(){

        },
        getArticleDetail(){
            getArticle(this.id).then((res) => {
                this.articleForm = res.data
            })
        },
        change(value, render){
            this.articleForm.content = render;
            this.articleForm.rawContent = value;
        },
        getAllType(){
            getAllType().then((res) => {
                this.customType = res.data.filter((val, index, arr) => {
                    return val.type == 1
                })
                this.blogType = res.data.filter((val, index, arr) => {
                    return val.type == 0
                })
            })
        },
        back(){
            this.$router.push({name: 'managerArticle'})
        },
        saveDraft(){
            this.articleForm.status = 0
            this.createOrUpdate();
            
        },
        save(){
            this.articleForm.status = 1
            this.createOrUpdate()
        },
        createOrUpdate(){
            if(this.id){
                this.udpateArticle();
            }else{
                this.createArticle();
            }
        },
        udpateArticle(){
            updateArticle(this.articleForm).then((res) => {
                this.$Message.success('更新成功');
                this.$router.push({name: 'managerArticle'})
            }).catch((err) => {
                console.log(err)
            })
        },
        createArticle(){
            createArticle(this.articleForm).then((res) => {
                this.$Message.success('添加成功');
                this.$router.push({name: 'managerArticle'})
            })
        }
    }
    
}
</script>
<style lang="less" scoped>
    .v-note-wrapper{
        z-index: 0 !important;
    }
</style>
