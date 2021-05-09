<template>
  <div>
    <slot/>
    <div class="demo-image__preview images" style="width: 1200px; height: 450px">
      <div class="imageItem" v-for="(item) in images.slice((currentPage-1)*pagesize,currentPage*pagesize)">
        <div class="name">{{item.name}}</div>
        <el-image
            style="width: 140px; height: 140px"
            :src="item.url"
            v-loading="item.url == ''"
            :preview-src-list="[item.url]">
        </el-image>
        <div class="title">{{item.detail}}</div>
      </div>

    </div>
    <div class="block">
      <el-pagination
          layout="prev, pager, next"
          :total="total"
          :current-page="currentPage"
          :page-size="pagesize"
          @current-change="current_change"
      >
      </el-pagination>
    </div>
  </div>

</template>

<script>
  import {getImages} from 'network/getData.js'

  export default {
    name: "images",
    props: {
      detailData: {
        type: Array,
        default: [],
      },
    },
    computed: {
      total() {
        return this.images.length;
      }
    },
    watch: {
      detailData: {
        deep: true,
        immediate: true,
        handler(val, oldVal) {
          this.currentPage = 1;
          let tempImages = [];
          let tempUnImages = [];
          val.forEach((e) => {
            if (typeof e.detail == 'object') {
              e.detail.forEach((eD) => {
                tempImages.push({
                  url: '',
                  name: e.user,
                  detail: eD.imag_detail,
                })
                tempUnImages.push(eD.imag_path)
              })
            }
          })
          if (tempImages.length > 0) {
            this.images = tempImages;
            const that = this
            new Promise(function (resolve) {
              getImages(tempUnImages, resolve, that)
            }).then((data) => {
              data.forEach((e, i) => {
                tempImages[i].url = e.download_url;
              })
              this.images = tempImages;
            })
          }
        }
      },
    },
    data() {
      return {
        pagesize: 12,
        currentPage: 1,
        images: [],
      }
    },
    methods: {
      current_change: function (currentPage) {
        this.currentPage = currentPage;
      },
    }
  }
</script>

<style scoped lang="scss">
  .block {
    text-align: center;
  }

  .images {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .imageItem {
    width: 150px;
    height: 190px;
    margin: 10px;
    border-radius: 10px;
    border: 2px solid cadetblue;
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title {
    width: 150px;
    text-align: center;
    font-size: small;
  @include t-overflow;
    margin-top: 5px;
  }

  .name {
    font-size: large;
  @extend .title
  }

</style>