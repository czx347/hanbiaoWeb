<template>
    <el-calendar v-model="value">
    </el-calendar>
</template>

<script>
    export default {
        name: "",
        data() {
            return {
                value: new Date()
            };
        },
        methods: {
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            }
        }
    }
</script>

<style scoped>

</style>