<template>
    <div>
        <slot/>
        <div id="bar" style="width: 1200px;height: 450px"></div>
    </div>
</template>

<script>
    export default {
        name: "bar",
        props:{
            detailData: {
                type: Object,
                default:{},
            },
        },
        data() {
            return {
            }
        },
        mounted(){
            this.drawLine();
        },
        computed:{
            optionNumber(){
                return Object.values(this.detailData);
            },
            optionName(){
                return Object.keys(this.detailData)
            }
        },
        methods: {
            drawLine() {
                let myChart = this.$echarts.init(document.getElementById('bar'))
                // 绘制图表
                myChart.setOption({
                    tooltip: {},
                    xAxis: {
                        data: this.optionName
                    },
                    yAxis: {},
                    series: [{
                        name: '选项',
                        type: 'bar',
                        data:  this.optionNumber
                    }]
                });
            }
        }
    }
</script>

<style scoped>

</style>