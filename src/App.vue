<template>
  <div id="app">
    <el-container>
      <!-- 頭部區域 -->
      <el-header>
        <!-- bars in phone -->
        <el-row class="hidden-md-and-up" type="flex" justify="start">
          <el-col style="width: 28px; height: 29px"> </el-col>
        </el-row>
        <!-- logo -->
        <router-link :to="{ name: 'Home' }" tag="a">
          <img src="./assets/img/logo_hen.png" alt="">
          <span class="platform">FIDOLIVE Equipment adjustment</span>
        </router-link>
        <template v-if="$root.me.id !== ''">
          <!-- logout in phone -->
          <el-row class="hidden-md-and-up" type="flex" justify="start">
            <el-col>
              <i class="el-icon-thirdlogout logout" @click="logout"></i>
            </el-col>
          </el-row>
          <!-- logout -->
          <el-row class="hidden-sm-and-down" type="flex" justify="end">
            <el-col style="text-align: right;">
              <el-link type="primary" @click="logout">Logout</el-link>
            </el-col>
          </el-row>
        </template>
        <template v-else>
          <el-row class="hidden-md-and-up" type="flex" justify="end">
            <el-col style="width: 28px; height: 29px"> </el-col>
          </el-row>
        </template>
      </el-header>
      <!-- 頁面主體區域 -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>
/* eslint-disable */
<script>
import { Base64 } from 'js-base64'
export default {
  created() {
    if (sessionStorage.getItem('id')) {
      var id = Base64.decode(sessionStorage.getItem('id'))
      var ids = id.split(',')
      this.$root.me.id = ids[0]
      this.$root.me.no = ids[1]
      this.$root.me.mac = ids[2]
    }
  },
  methods: {
    logout() {
      sessionStorage.removeItem('id')
      this.$root.me.id = ''
      this.$root.me.no = ''
      this.$root.me.mac = ''
      location.reload()
    }
  }
}

</script>
<style lang="scss">
body {
  margin: 0;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.iconfont,
[class^="el-icon-third"],
[class^=" el-icon-third"] {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #121820;
  height: 80px !important;

  a {
    display: flex;
    align-items: center;
    color: inherit;
    text-decoration: none;
    cursor: pointer;

    .platform {
      font-size: 1.25rem;
      margin-left: 15px;
    }
  }

  img {
    height: 50px;
  }
}

.main-container {

  .el-main {
    padding: 1.25rem .75rem;
  }
}

.text-danger {
  span {
    color: #f56c6c !important;
  }

  &:hover span {
    color: #c55353 !important;
  }
}

.text-warning {
  span {
    color: #E6A23C !important;
  }

  &:hover span {
    color: #c38425 !important;
  }
}

.el-table {
  .cell {
    text-align: center;
  }
}

.el-breadcrumb {
  margin-bottom: 15px;
}

canvas {
  max-width: 100% !important;
  max-height: 100% !important;
}

@media (min-width: 40px) and (max-width: 575.98px) {
  .el-header {

    .logout {
      font-size: 1.75rem;
      cursor: pointer;
    }

    a {
      justify-content: center;
      flex-direction: column;

      img {
        height: 32px;
      }

      .platform {
        margin-top: .25rem;
        font-size: .75rem;
        display: block;
        margin-left: 0;
      }
    }
  }

  .el-breadcrumb {
    display: flex;
    justify-content: center;
    /* font-size: 1rem; */
  }
}

</style>
/* eslint-enable */
