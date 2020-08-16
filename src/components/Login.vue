<template>
    <div class="container">
        <div class="col-lg-8 col-md-10 mx-auto loginBox">
        <form class="was-validated">
            <div class="form-group">
                <label for="uname">Username:</label>
                <input type="text" class="form-control" id="uname" placeholder="Enter username" v-model="name" name="uname" required/>
                <div class="valid-feedback">Valid.</div>
                <div class="invalid-feedback">Please fill out this field.</div>
            </div>
            <div class="form-group">
                <label for="pwd">Password:</label>
                <input type="password" class="form-control" id="pwd" placeholder="Enter password" v-model="password" name="pswd" required/>
                <div class="valid-feedback">Valid.</div>
                <div class="invalid-feedback">Please fill out this field.</div>
            </div>
            <div class="alert">
                {{info}}
            </div>
            <button @click="confirm(name, password)" class="btn btn-primary">Submit</button>
        </form>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {mapState, mapActions, mapMutations} from 'vuex'

export default {
    data () {
        return {
            name: '',
            password: '',
            info: ''
        }
    },
    methods: {
        ...mapActions(['login']),
        ...mapMutations(['set_user']),
        confirm (name, password) {
            this.login({name: name, password: password}).then((res) => {
                this.info = 'Logining...'
                this.set_user(res.data)
                this.$router.push({name: 'post'})
            }).catch((err) => {
                console.log(err)
                this.info = 'Please check account and password.'
            })
        }
    },
    watch: {
        name () {
            this.info = ''
        },
        password () {
            this.info = ''
        }
    }
}
</script>

<style>
.loginBox {
    margin-top: 40px;
    margin-bottom: 20px;
}
</style>