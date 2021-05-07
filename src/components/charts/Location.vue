<template>
    <div>
        <slot/>
        <div id="location" style="width: 1200px; height: 450px;"></div>
    </div>
</template>

<script type="text/javascript" src="https://api.map.baidu.com/api?v=3.0&ak=S4KKfPTez9LKGm4DtoY2BQ5527qxQ3QE"></script>
<script>
  export default {
    name: "",
    props: {
      detailData: {
        type: Array,
        default: [],
      },
    },
    computed: {
      geoCoordMap() {
        let tempGeoCoordMap = new Object();
        this.detailData.forEach((e) => {
          if (e.detail != '') {
            tempGeoCoordMap[e.user] = [e.detail.longitude, e.detail.latitude];
          }
        })
        return tempGeoCoordMap
      },
      userData() {
        let tempUserData = [];
        this.detailData.forEach((e) => {
          if (e.detail != '') {
            tempUserData.push({name: e.user, value: ' '})
          }
        })
        return tempUserData
      }
    },
    methods: {
      drawLine() {
        const chartDom = document.getElementById('location');
        const echarts = this.$echarts;
        const myChart = echarts.init(chartDom);
        let option;

        let data = this.userData;
        let geoCoordMap = this.geoCoordMap;

        let convertData = function (data) {
          let res = [];
          for (let i = 0; i < data.length; i++) {
            let geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
              });

            }
          }
          return res;
        };

        option = {
          tooltip: {
            trigger: 'item'
          },
          bmap: {
            center: [104.114129, 37.550339],
            zoom: 5,
            roam: true,
            mapStyle: {
              styleJson: [{
                'featureType': 'water',
                'elementType': 'all',
                'stylers': {
                  'color': '#d1d1d1'
                }
              }, {
                'featureType': 'land',
                'elementType': 'all',
                'stylers': {
                  'color': '#f3f3f3'
                }
              }, {
                'featureType': 'railway',
                'elementType': 'all',
                'stylers': {
                  'visibility': 'off'
                }
              }, {
                'featureType': 'highway',
                'elementType': 'all',
                'stylers': {
                  'color': '#fdfdfd'
                }
              }, {
                'featureType': 'highway',
                'elementType': 'labels',
                'stylers': {
                  'visibility': 'off'
                }
              }, {
                'featureType': 'arterial',
                'elementType': 'geometry',
                'stylers': {
                  'color': '#fefefe'
                }
              }, {
                'featureType': 'arterial',
                'elementType': 'geometry.fill',
                'stylers': {
                  'color': '#fefefe'
                }
              }, {
                'featureType': 'poi',
                'elementType': 'all',
                'stylers': {
                  'visibility': 'off'
                }
              }, {
                'featureType': 'green',
                'elementType': 'all',
                'stylers': {
                  'visibility': 'off'
                }
              }, {
                'featureType': 'subway',
                'elementType': 'all',
                'stylers': {
                  'visibility': 'off'
                }
              }, {
                'featureType': 'manmade',
                'elementType': 'all',
                'stylers': {
                  'color': '#d1d1d1'
                }
              }, {
                'featureType': 'local',
                'elementType': 'all',
                'stylers': {
                  'color': '#d1d1d1'
                }
              }, {
                'featureType': 'arterial',
                'elementType': 'labels',
                'stylers': {
                  'visibility': 'off'
                }
              }, {
                'featureType': 'boundary',
                'elementType': 'all',
                'stylers': {
                  'color': '#fefefe'
                }
              }, {
                'featureType': 'building',
                'elementType': 'all',
                'stylers': {
                  'color': '#d1d1d1'
                }
              }, {
                'featureType': 'label',
                'elementType': 'labels.text.fill',
                'stylers': {
                  'color': '#999999'
                }
              }]
            }
          },
          series: [
            {
              type: 'scatter',
              coordinateSystem: 'bmap',
              data: convertData(data),
              // symbolSize: function (val) {
              //     return val[2] / 10;
              // },
              symbolSize: 20,
              encode: {
                value: 2
              },
              label: {
                formatter: '{b}',
                position: 'right',
                show: false
              },
              // emphasis: {
              //     label: {
              //         show: true
              //     }
              // }
            },
          ]
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