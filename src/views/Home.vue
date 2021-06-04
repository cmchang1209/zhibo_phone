<template>
  <div class="home">
    <el-breadcrumb separator=" ">
      <el-breadcrumb-item>{{ $root.me.no }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="tableData" border>
      <el-table-column fixed prop="usb_id" label="Port" width="50">
      </el-table-column>
      <el-table-column prop="dev_name" label="Name">
      </el-table-column>
      <el-table-column label="Function">
        <template slot-scope="scope">
          <span v-html="functionName(scope.row.usb_id)"></span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="type" label="Type">
      </el-table-column> -->
      <el-table-column fixed="right" label="Operating" width="90">
        <template slot-scope="scope">
          <el-button v-if="scope.row.usb_id === 4 && scope.row.mute === 1" @click="audio(scope.row)" type="text" size="small">audio</el-button>
          <el-button v-if="scope.row.usb_id === 4 && scope.row.mute === 0" @click="mute(scope.row)" type="text" size="small">mute</el-button>
          <el-button v-if="scope.row.usb_id !== 3 && scope.row.dev_name !=='-'" @click="handleClick(scope.row)" type="text" size="small">view</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
/* eslint-disable */
<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {},
  sockets: {
    equipmentListEcho(val) {
      this.tableData = val
    }
  },
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.$socket.client.emit('getEquipmentList', this.$root.me)
  },
  methods: {
    handleClick(row) {
      if (row.dev_name !== '-') {
        this.$router.push({ name: 'View', query: { port: row.port_no, usb: row.usb_id } })
      }
    },
    functionName(usb_id) {
      switch(usb_id) {
        case 1:
          return '機台螢幕'
        break
        case 2:
          return '靶'
        break
        case 3:
          return '分配器電源'
        break
        case 4:
          return '人'
        break
      }
    },
    audio(row) {
      this.$socket.client.emit('setMute', { id: row.pi_id, mute: 0 })
    },
    mute(row) {
      this.$socket.client.emit('setMute', { id: row.pi_id, mute: 1 })
    }
  }
}

</script>
/* eslint-enable */
