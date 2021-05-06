<template>
    <!-- 拼图验证码 -->
    <div v-show="flag" class="testCode">
        <p class="closeBtn"><i class="el-icon-close" @click="flag=!flag"></i></p>
        <slide-verify
                :l="42"
                :r="20"
                :w="362"
                :h="140"
                slider-text="向右滑动"
                @success="onSuccess"
                @fail="onFail"
                @refresh="onRefresh"
                :style="{width:'362px'}"
                class="slide-box"
                ref="slideBlock"
                v-show="flag"
        ></slide-verify>
    </div>
</template>

<script>
    export default {
        name: "",
        data() {
            return {
                msg: '',
                flag: true,
            }
        },
        methods: {
            // 拼图成功
            onSuccess (){
                this.getLogin()
            },
            // 拼图失败
            onFail (){
                this.msg = ''
            },
            // 拼图刷新
            onRefresh (){
                this.msg = ''
            },
            // 登录请求接口
            getLogin () {
                const loginData = {
                    account: '',
                    phone: this.ruleForm.userName,
                    // Password: sha3.sha3_256(md5(this.ruleForm.password)), // 加密
                    password: this.ruleForm.password,
                    email: '',
                    accountType: 2, // 登录类型手机号
                    checkCode: ''
                }
                // 接口
                userLogin(loginData)
                    .then(res => {
                        console.log(res)
                    })
                    .catch(res => {
                        console.log(res)
                    })
            },
            // 点击登录校验-拼图出现
            submitForm (formName) {
                // 表单校验
                this.$refs[formName].validate((valid) => {
                    // 验证通过
                    if (valid) {
                        // 拼图出现
                        this.flag = true
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>