<template>
  <div id="app">
    <Setting @changeData="changeData" :versionsNumber="versionsNumber">
      <div class="select">
        <i class="el-icon-s-operation" style="margin-bottom: 10px;"></i>
        <span>数 据 筛 选</span>
      </div>
    </Setting>

    <div class="main">
      <Top :userNumb="userNumb" :requestNumb="requestNumb"/>
      <!--<SlideVerify/>-->
      <div class="middle">
        <div @click="jump(index)" v-for="(item, index) in question" :class="index == current ? 'choose': ''">{{index + 1}}</div>
      </div>
      <div class="bottom">
        <transition :name="transitionName">
            <Bar :detailData="showData" v-if="question[current].type == '单选'">
              <div class="requestTitle">{{title}}</div>
            </Bar>
            <Pie :detailData="showData" v-else-if="question[current].type == '多选'">
              <div class="requestTitle">{{title}}</div>
            </Pie>
            <TextTable  :tableData="showData" v-else-if="question[current].type == '短文本' || question[current].type == '长文本' || question[current].type == '短文本(主标题)'">
              <div class="requestTitle">{{title}}</div>
            </TextTable>
        </transition>

      </div>
    </div>



  </div>
</template>

<script>
import Setting from 'components/Setting.vue'
import Top from 'components/Top.vue'
import initData from 'common/data'
import filterData from 'common/filterData'
import SlideVerify from 'components/SlideVerify.vue'
import Bar from 'components/charts/Bar.vue'
import Pie from 'components/charts/Pie.vue'
import TextTable from 'components/charts/TextTable.vue'

let totalData = initData;

export default {
  name: 'app',
  data() {
    return {
        current:0,
        showData:[],
        transitionName:'slide-left',
        userNumb:0,
        requestNumb:0,
        versionsNumber: 0,
        title:'',
        question:[{
            type:'',
        }],
    };
  },
    mounted() {
        this.getDate(totalData);
    },
  methods:{
      initChar(){
          this.title = this.question[this.current].title
          this.showData = this.question[this.current].detail
      },
    jump(current){
      this.current = current;
      this.initChar();
    },
      getDate(data, startTime, endTime, state, version){
        let result = filterData(data, startTime, endTime, state, version)
        this.userNumb = result.userNumb
        this.requestNumb = result.requestNumb
        this.versionsNumber = result.versionsNumber
        this.question = result.question
          this.initChar();
      },
      changeData(data){
        data.startTime = data.startTime == '' ?  '': new Date(data.startTime)
        data.endTime =  data.endTime == '' ?  '': new Date(data.endTime)
          this.current = 0;
          this.getDate(totalData, data.startTime, data.endTime, data.state, data.version)

      }
  },
  components: {
      Setting,
      Top,
      SlideVerify,
      Bar,
      Pie,
      TextTable,
  },
    watch:{
        $route(to, from) {
            //如果to索引大于from索引,判断为前进状态,反之则为后退状态
            if (to.meta.index < from.meta.index) {
                //设置动画名称
                this.transitionName = 'slide-left';
            } else if (to.meta.index > from.meta.index) {
                this.transitionName = 'slide-right';
            } else if (to.meta.index == 99) {
                this.transitionName = ""
            }
        }
    }
}
</script>

<style lang="scss">
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all 500ms;
    position: absolute;
    width: 100%;
  }
  .slide-right-enter {
    left: 200%;
    transform: translate3d(-100%, 0, 0);
  }
  .slide-right-enter-to{
    left: 0;
  }
  .slide-right-leave {
    left: 0;
  }
  .slide-right-leave-to{
    left: -100%;
  }
  .slide-left-enter {
    left: -100%;
  }
  .slide-left-enter-to{
    left: 0;
  }
  .slide-left-leave{
    left:0
  }
  .slide-left-leave-to{
    left: 200%;
  }

  body{
    overflow: hidden;
  }

  .select{
    position: fixed;
    left: 0;
    writing-mode: tb-rl;
    background-color: $primaryColor;
    color: white;
    width: 40px;
    height: 180px;
    text-align: center;
    line-height: 40px;
    border-radius: 0 50px 50px 0;
    margin-top: 50px;
  }

  .main{
    margin: auto;
    height: 100vh;
    width: 1200px;

  }

  .middle{
    width: 100%;
    height: 20px;
    margin-top: 50px;
    @include flex-center;
    color: white;
    div{
      margin: 0 20px;
      text-align: center;
      background-color: $primaryColor;
      height: 20px;
      border-radius: 20px;
      padding: 2px;
      min-width: 20px;
      line-height: 20px;
    }
    .choose{
      background-color: $accentColor;
    }
  }



  .bottom{
    width: 1200px;
    height: 500px;
    position: absolute;
    /*z-index: -1;*/
    bottom: 5px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .requestTitle{
    font-weight: bold;
    font-size: larger;
    color: $primaryColor;
  }
</style>


