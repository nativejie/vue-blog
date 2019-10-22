<template>
    <div id="login">
        <div class="login_form">
            <h1>登录</h1>
            <Form ref="loginForm" :model="loginForm" :rules="loginRule">
                <FormItem prop="user">
                    <Input type="text" v-model="loginForm.username" placeholder="Username">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="loginForm.password" placeholder="Password">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" style="width: 100%" @click="handleSubmit('loginForm')">登录</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
import {login} from '@/api/UserApi'
import {setToken} from '@/utils/auth'
export default {
    data(){
        return {
            loginForm: {username: '', password: ''},
            loginRule: {},
        }
    },
    mounted(){

    },
    methods: {
        handleSubmit(){ 
            login(this.loginForm).then((res) => {
                if(res.code == 200){
                    this.$store.commit('user/SET_TOKEN', res.token)
                    this.$store.commit('user/SET_USERNAME', res.data.username)
                    setToken(res.token)
                    this.$router.push('/admin/article/list')
                }
                
            })
        }
    }
}
</script>
<style lang="less" scoped>
    #login{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .login_form{
            width: 350px;
            padding: 15px;
            box-shadow: 1px 2px 5px #dad8d8;
            border-radius: 5px;
        }
    }
</style>
