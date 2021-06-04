<template>
  <el-row type="flex" justify="center" class="login">
    <el-col :span="$root.touchDevice? 24 : 12">
      <h1 style="text-align: center;">Sign in</h1>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-position="top">
        <el-form-item label="S/N" prop="account">
          <el-input v-model="ruleForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off" @keyup.enter.native="submitForm"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">submit</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
/* eslint-disable */
<script>
export default {
  sockets: {
    loginEcho(val) {
      if (val.length === 0) {
        this.ruleForm.error = true
        this.$refs['ruleForm'].clearValidate()
        this.$refs['ruleForm'].validateField('pass', (valid) => {
          this.ruleForm.pass = ''
          setTimeout(() => {
            this.$refs['ruleForm'].clearValidate()
            this.ruleForm.error = false
          }, 3000)
        })
      } else {
        sessionStorage.setItem('id', val[0].id)
        location.reload()
      }
    }
  },
  data() {
    var validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('please enter your account'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('please enter your password'))
      } else {
        if(this.ruleForm.error === true) {
          callback(new Error('Incorrect account and password'))
        }
        callback()
      }
    }
    return {
      ruleForm: {
        account: 'v-2118-0001',
        pass: '',
        error: false
      },
      rules: {
        account: [
          { validator: validateAccount, required: true, trigger: 'no' }
        ],
        pass: [
          { validator: validatePass, required: true, trigger: 'no' }
        ]
      }
    }
  },
  computed: {},
  created() {
  	//console.log(this.$root.touchDevice)
  },
  methods: {
    submitForm() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$socket.client.emit('login', this.ruleForm)
        } else {
          return false
        }
      })
    },
  }
}

</script>
<style scoped lang="scss">
.login {
  height: calc(100vh - 186px);
  align-items: center;
}

.el-form-item {
  margin-top: 35px !important;
}

</style>
/* eslint-enable */