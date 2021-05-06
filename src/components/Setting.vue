<template>
    <div>
        <transition name="el-zoom-in-left">
            <div @click=" show = !show, drawer = true" v-show="show">
                <slot></slot>
            </div>
        </transition>


        <el-drawer
                :visible.sync="drawer"
                :direction="direction"
                :with-header="false"
                :before-close="handleClose"
                size="200px"
        >
            <div class="background">
                <div class="main">
                    <div class="item hanma">
                        <div class="title">涵码:</div>
                        <div>{{hanma}}</div>
                        <button  class="change">更换</button>
                    </div>
                    <div class="item">
                        <div class="title">版本</div>
                        <select @change="changeVersion" v-model="version">
                            <option :value="index" v-for="(item,index) in getVersion">第{{index + 1}}版</option>
                        </select>
                    </div>
                    <div class="item">
                        <div class="title">开始时间</div>
                        <div>
                            <input type="date" @change="startInput" :max="endTime" :value="startTime"/>
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">结束时间</div>
                        <div>
                            <input type="date" @change="endInput" :min="startTime" :value="endTime"/>
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">审核进度</div>
                        <div class="state">
                            <button :class="wait ? 'choose son':'son' " @click="changeState('wait')">未审核</button>
                            <button :class="pass ? 'choose son':'son'" @click="changeState('pass')">已通过</button>
                            <button :class="reject ? 'choose son':'son'" @click="changeState('reject')">已驳回</button>
                        </div>
                    </div>
                    <button class="item recover" @click="recover">恢复</button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
    export default {
        name: "Setting",
        props:{
            versionsNumber: {
                type: Number,
                default: 0,
            },
        },
        data() {
            return {
                drawer: false,
                direction: 'ltr',
                show:true,
                hanma:'123',
                startTime:'',
                endTime:'',
                wait:true,
                pass:true,
                reject:true,
                version:0,
            };
        },
        computed:{
            getState(){
                let tempState = []
                if(this.wait === true){
                    tempState.push(2)
                }
                if(this.pass === true){
                    tempState.push(4)
                }
                if(this.reject === true){
                    tempState.push(3)
                }
                return tempState
            },
            getVersion(){
                let temp = [];
                for(let i = 0; i < this.versionsNumber; i++ ){
                    temp.push(0);
                }
                this.version = temp.length - 1;
                return temp
            }
        },
        methods: {
            handleClose() {
                this.show = true;
                this.drawer = false;
            },
            changeVersion() {
                const data = {
                    startTime:this.startTime,
                    endTime:this.endTime,
                    state:this.getState,
                    version: this.version,
                }
                this.$emit("changeData",data)
            },
            startInput($event){
                const value = $event.target.value
                this.startTime = value
                const data = {
                    startTime:value,
                    endTime:this.endTime,
                    state:this.getState,
                    version: this.version,
                }
                this.$emit("changeData",data)
            },
            endInput($event){
                const value = $event.target.value
                this.endTime = value
                const data = {
                    startTime:this.startTime,
                    endTime:value,
                    state:this.getState,
                    version: this.version,
                }
                this.$emit("changeData",data)
            },
            changeState(state){
                this[state] = !this[state]

                const data = {
                    startTime:this.startTime,
                    endTime:this.endTime,
                    state:this.getState,
                    version: this.version,
                }
                this.$emit("changeData",data)
            },
            recover(){
                const data = {
                    startTime:'',
                    endTime:'',
                    state:'',
                    version: '',
                }
                this.$emit("changeData",data)
                this.startTime=''
                this.endTime=''
                this.wait=true
                this.pass=true
                this.reject=true
                this.version = this.getVersion.length - 1
            }
        }
    }
</script>

<style scoped lang="scss">
    .background{
        background-color: $primaryColor;
        width: 100%;
        height: 100%;
        padding-top: 20px;
    }
    .main{
        color: white;
        margin: auto;
        width: 90%;
    }
    .item{
        margin-top: 20px;
    }

    .title{
        margin-bottom: 10px;

    }

    .hanma{
        display: flex;
        justify-content: space-between;
        line-height: 25px;
        flex-direction: row;
        .change{
            @include removeButton;
            color: white;
            width: 50px;
            height: 25px;
            line-height: 25px;
            text-align: center;
            border-radius: 20px;
            font-size: small;
            background-color: $accentColor;
        }
    }

    .state{
        display: flex;
        justify-content: space-around;
        flex-direction: row;
    }

    .son{
        @include removeButton;
        width: 50px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        border-radius: 20px;
        font-size: small;
        background-color: white;
        color: black;
    }

    .choose{
        background-color: $accentColor;
        color: white;
    }

</style>