import Vue from 'vue'
const echarts = require('echarts')
import {TitleComponent, TooltipComponent, LegendComponent, GridComponent} from 'echarts/components';
import {PieChart, BarChart} from 'echarts/charts';
import {CanvasRenderer} from 'echarts/renderers';

echarts.use(
    [GridComponent, BarChart, TooltipComponent, LegendComponent, PieChart, CanvasRenderer, TitleComponent]
);
Vue.prototype.$echarts = echarts