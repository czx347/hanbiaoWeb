import Vue from 'vue'
const echarts = require('echarts')
import {TitleComponent, TooltipComponent, LegendComponent, GridComponent, CalendarComponent, VisualMapComponent} from 'echarts/components';
import {PieChart, BarChart, HeatmapChart,ScatterChart, EffectScatterChart} from 'echarts/charts';
import {CanvasRenderer} from 'echarts/renderers';
import 'echarts/extension/bmap/bmap'

echarts.use(
    [GridComponent, BarChart, TooltipComponent, LegendComponent, PieChart, CanvasRenderer, TitleComponent, CalendarComponent,  HeatmapChart, VisualMapComponent, ScatterChart, EffectScatterChart]
);
Vue.prototype.$echarts = echarts