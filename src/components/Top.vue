<template>
  <div class="top">
    <div class="main">
      <div>提交人数</div>
      <div class="number">{{userNumb}}</div>
    </div>
    <div class="main">
      <div>请求数量</div>
      <div class="number">{{requestNumb}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "top",
    props: {
      userNumb: {
        type: Number,
        default: 0,
      },
      requestNumb: {
        type: Number,
        default: 0,
      },
    }
  }
</script>

<style scoped lang="scss">
  .top {
    width: 100%;
    height: 100px;
    border-radius: 20px;
  @include flex-center;
    justify-content: space-around;
    color: $primaryColor;
    font-size: 20px;
    font-weight: bold;

  .main {
    width: 150px;
    height: 90px;
    line-height: 40px;
    text-align: center;
    background-color: $lighterPrimaryColor;
    border-radius: 10px;
    margin-top: 20px;
    transform: translate(0, 0);
    box-shadow: -5px 5px 0px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: all 0.5s;
  }

  .main:hover {
    transform: translate(calc(0 + 3px), calc(0 - 3px));
    box-shadow: -10px 10px 0px rgba(0, 0, 0, 0.2);
  }

  .number {
    font-size: 30px;
    font-weight: bolder;
  }

  }


</style>