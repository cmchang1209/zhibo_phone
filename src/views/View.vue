<template>
  <div class="view">
    <el-breadcrumb separator=" ">
      <el-breadcrumb-item>
        <a @click="goBack"><i class="el-icon-arrow-left"></i> Back</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>Port {{ usb }}</el-breadcrumb-item>
    </el-breadcrumb>
    <Player :port="port" :usb="usb" />
  </div>
</template>
/* eslint-disable */
<script>
import Player from '@/components/Player.vue'
export default {
  name: 'View',
  props: ['port', 'usb'],
  components: {
    Player
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    goBack() {
      this.$router.push({ name: 'Home' })
    }
  }
}

</script>
<style scoped lang="scss">
</style>
/* eslint-enable */
