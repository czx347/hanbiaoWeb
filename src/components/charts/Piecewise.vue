<template>
    <div>
        <slot/>
        <div id="piecewise" style="width: 1200px; height: 350px"></div>
        <div class="year">
            <el-radio-group v-model="currentYear">
                <el-radio-button :label="index" v-for="(item,index) in years" :key="index">{{item}}</el-radio-button>
            </el-radio-group>
        </div>
    </div>
</template>

<script>
  let rateChart;
  export default {
    name: "piecewise",
    props: {
      detailData: {
        type: Array,
        default: [],
      },
    },
    data() {
      return {
        currentYear:0,
      }
    },
    computed:{
      years(){
        let tempDetailData = [];
        let tempYears = [];
        this.detailData.forEach((e) => {
          tempDetailData = e.split("-");
          if(tempYears.indexOf(tempDetailData[0]) === -1){
            tempYears.push(tempDetailData[0]);
          }
        })
        this.currentYear = tempYears.length - 1;
        return tempYears.sort();
      },
      dateData() {
        let tempDateData = [];
        let tempYears = [];
        this.detailData.forEach((e) => {
          if(e.slice(0,4) == this.years[this.currentYear]){
            let yearNumber = tempYears.indexOf(e);
            if(yearNumber === -1) {
              tempYears.push(e);
              tempDateData.push([e,1])
            }else {
              tempDateData[yearNumber][1] ++;
            }
          }
        })

        return tempDateData;
      },
      maxValue: {
        get() {
          let tempMaxValue = 0;
          this.dateData.forEach((e) => {
            if(e[1] > tempMaxValue) {
              tempMaxValue = e[1]
            }
          })
          return tempMaxValue;
        },
        set(newValue) {
          return newValue;
        },
      }
    },
    watch: {
      currentYear(){
        this.drawLine();
      }
    },
    methods: {
      drawLine() {
        if (rateChart != null && rateChart != "" && rateChart != undefined) {
          rateChart.dispose();
        }
        const chartDom = document.getElementById('piecewise');
        const echarts = this.$echarts;
        rateChart  = echarts.init(chartDom);
        let option;
        const year = this.years[this.currentYear] || new Date().getFullYear();
        const maxValue = this.maxValue || 0;

        option = {
          tooltip: {},
          visualMap: {
            min: 0,
            max: maxValue,
            type: 'piecewise',
            orient: 'horizontal',
            left: 'center',
            top: 65
          },
          calendar: {
            top: 120,
            left: 30,
            right: 30,
            cellSize: ['auto', 13],
            range: year,
            itemStyle: {
              borderWidth: 0.5
            },
            yearLabel: {show: false}
          },
          series: {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: this.dateData,
          }
        };

        option && rateChart.setOption(option);
      }
    },
    mounted() {
      this.drawLine();
    },

  }
</script>

<style scoped>
    .year{
        width: 1200px;
        height: 100px;
        text-align: center;
    }
</style>