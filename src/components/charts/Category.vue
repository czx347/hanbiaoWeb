<template>
  <div>
    <slot/>
    <div id="category" style="width: 1200px; height: 450px;"></div>
  </div>
</template>

<script>
  export default {
    name: "" ,
    props: {
      detailData: {
        type: Array,
        default: [],
      },
    },
    computed: {
      timeData() {
        let tempTimeData = [];
        let check = [];
        this.detailData.forEach((e) => {
          let time = e.split(":");
          time[1] = parseInt(time[1]/5);
          let tempCheck = time[1] + time[0];
          const number = check.indexOf(tempCheck);
          if(number === -1) {
            check.push(tempCheck);
            tempTimeData.push([time[1], time[0] * 1, 1]);
          }else {
            tempTimeData[number][2] ++;
          }
        })
        return tempTimeData;
      },
      maxValue: {
        get() {
          let tempMaxValue = 0;
          this.timeData.forEach((e) => {
            if(e[2] > tempMaxValue) {
              tempMaxValue = e[2]
            }
          })
          return tempMaxValue;
        },
        set(newValue) {
          return newValue;
        },
      }
    },
    methods: {
      drawLine() {
        const chartDom = document.getElementById('category');
        const echarts = this.$echarts;
        const myChart = echarts.init(chartDom);
        let option;

        const minute = ['00～04分', '05～09分', '10～14分', '15～19分', '20～24分', '25～29分', '30～34分', '35～39分', '40～44分', '45～49分','50～54分','55～59分'];
        const hours = ['0点', '1点', '2点', '3点', '4点', '5点', '6点', '7点', '8点', '9点', '10点', '11点', '12点', '13点', '14点', '15点', '16点', '17点', '18点', '19点', '20点', '21点', '22点', '23点'];

        // let data = [[0,0,5],[0,1,1],[0,2,0],[0,3,0],[0,4,0],[0,5,0],[0,6,0],[0,7,0],[0,8,0],[0,9,0],[0,10,0],[0,11,2],[0,12,4],[0,13,1],[0,14,1],[0,15,3],[0,16,4],[0,17,6],[0,18,4],[0,19,4],[0,20,3],[0,21,3],[0,22,2],[0,23,5],[1,0,7],[1,1,0],[1,2,0],[1,3,0],[1,4,0],[1,5,0],[1,6,0],[1,7,0],[1,8,0],[1,9,0],[1,10,5],[1,11,2],[1,12,2],[1,13,6],[1,14,9],[1,15,11],[1,16,6],[1,17,7],[1,18,8],[1,19,12],[1,20,5],[1,21,5],[1,22,7],[1,23,2],[2,0,1],[2,1,1],[2,2,0],[2,3,0],[2,4,0],[2,5,0],[2,6,0],[2,7,0],[2,8,0],[2,9,0],[2,10,3],[2,11,2],[2,12,1],[2,13,9],[2,14,8],[2,15,10],[2,16,6],[2,17,5],[2,18,5],[2,19,5],[2,20,7],[2,21,4],[2,22,2],[2,23,4],[3,0,7],[3,1,3],[3,2,0],[3,3,0],[3,4,0],[3,5,0],[3,6,0],[3,7,0],[3,8,1],[3,9,0],[3,10,5],[3,11,4],[3,12,7],[3,13,14],[3,14,13],[3,15,12],[3,16,9],[3,17,5],[3,18,5],[3,19,10],[3,20,6],[3,21,4],[3,22,4],[3,23,1],[4,0,1],[4,1,3],[4,2,0],[4,3,0],[4,4,0],[4,5,1],[4,6,0],[4,7,0],[4,8,0],[4,9,2],[4,10,4],[4,11,4],[4,12,2],[4,13,4],[4,14,4],[4,15,14],[4,16,12],[4,17,1],[4,18,8],[4,19,5],[4,20,3],[4,21,7],[4,22,3],[4,23,0],[5,0,2],[5,1,1],[5,2,0],[5,3,3],[5,4,0],[5,5,0],[5,6,0],[5,7,0],[5,8,2],[5,9,0],[5,10,4],[5,11,1],[5,12,5],[5,13,10],[5,14,5],[5,15,7],[5,16,11],[5,17,6],[5,18,0],[5,19,5],[5,20,3],[5,21,4],[5,22,2],[5,23,0],[6,0,1],[6,1,0],[6,2,0],[6,3,0],[6,4,0],[6,5,0],[6,6,0],[6,7,0],[6,8,0],[6,9,0],[6,10,1],[6,11,0],[6,12,2],[6,13,1],[6,14,3],[6,15,4],[6,16,0],[6,17,0],[6,18,0],[6,19,0],[6,20,1],[6,21,2],[6,22,2],[6,23,6]];

        // data = data.map(function (item) {
        //   return [item[1], item[0], item[2] || '-'];
        // });

        option = {
          tooltip: {
            position: 'top'
          },
          grid: {
            height: '75%',
            top: '5%'
          },
          xAxis: {
            type: 'category',
            data: minute,
            splitArea: {
              show: true
            }
          },
          yAxis: {
            type: 'category',
            data: hours,
            splitArea: {
              show: true
            }
          },
          visualMap: {
            min: 0,
            max: this.maxValue,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '0%'
          },
          series: [{
            type: 'heatmap',
            data: this.timeData,
            label: {
              show: true
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        };

        option && myChart.setOption(option);
      }
    },
    mounted() {
      this.drawLine();
    },
  }
</script>

<style scoped>

</style>