<template>
  <div>
    <slot/>
    <div id="pie" style="width: 1200px; height: 450px"></div>
  </div>
</template>

<script>
  export default {
    name: "pie",
    props: {
      detailData: {
        type: Object,
        default: {},
      },
    },
    mounted() {
      this.drawLine();
    },
    computed: {
      optionName() {
        return Object.keys(this.detailData)
      }
    },
    methods: {
      drawLine() {
        const chartDom = document.getElementById('pie');
        const myChart = this.$echarts.init(chartDom);
        let option;
        const that = this;

        const data = genData();

        option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 20,
            top: 30,
            bottom: 20,
            data: Object.keys(this.detailData),

            selected: data.selected
          },
          series: [
            {
              name: '选项',
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              data: data.seriesData,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };

        function genData() {
          const seriesData = [];
          for (let key in that.detailData) {
            seriesData.push({
              name: key,
              value: that.detailData[key],
            });
          }
          return {
            seriesData: seriesData
          };
        }

        option && myChart.setOption(option);
      }
    }
  }
</script>

<style scoped>

</style>