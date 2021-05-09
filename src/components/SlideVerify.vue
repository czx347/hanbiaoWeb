<template>
  <!-- 拼图验证码 -->
  <div class="testCode">
    <slide-verify
        :l="42"
        :r="20"
        :w="362"
        :h="140"
        slider-text="向右滑动"
        @success="onSuccess"
        @fail="onFail"
        @refresh="onRefresh"
        style="{width:362px}"
        ref="slideBlock"
    ></slide-verify>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        msg: '',
      }
    },
    methods: {
      // 拼图成功
      onSuccess() {
        this.$emit("verifySuccess")
      },
      // 拼图失败
      onFail() {
        this.msg = '请重新验证！'
      },
      // 拼图刷新
      onRefresh() {
        this.msg = ''
      },
      handleClick() {
        // 父组件直接可以调用刷新方法
        this.$refs.slideBlock.reset();
      },
    }
  }
</script>

<style scoped>

</style>