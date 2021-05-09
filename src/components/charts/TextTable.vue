<template>
  <div>
    <slot/>
    <div>
      <el-table
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          stripe
          style="width: 1200px; height: 450px">
        <el-table-column
            type="index"
            width="100">
        </el-table-column>
        <el-table-column
            prop="user"
            label="用户"
            width="200">
        </el-table-column>
        <el-table-column
            v-if="tableData.length > 0 && Object.keys(tableData[0]).length > 3"
            prop="time"
            label="时间">
        </el-table-column>
        <el-table-column
            prop="detail"
            label="内容">
        </el-table-column>
        <el-table-column
            v-if="tableData.length > 0 && Object.keys(tableData[0]).length > 3"
            prop="state"
            label="状态">
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="pagesize"
          :current-page="currentPage"
          @current-change="current_change"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "textTable",
    props: {
      tableData: {
        type: Array,
        default: [],
      },
    },
    data() {
      return {
        pagesize: 8,
        currentPage: 1,
      }
    }, watch: {
      tableData: {
        deep: true,
        immediate: true,
        handler() {
          this.currentPage = 1;
        }
      },
    },
    computed: {
      total() {
        let total = this.tableData.length;
        this.currentPage = 1;
        return total;
      }
    },
    methods: {
      current_change: function (currentPage) {
        this.currentPage = currentPage;
      },
    }
  }
</script>

<style scoped>
  .block {
    text-align: center;
  }

</style>