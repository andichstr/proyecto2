<template>
  <div class="container">
        <form class="form" action="">
            <div class="row">
                <div class="col-3">
                    <label for="username">Usuario: </label>
                </div>
                <div class="col-9">
                    <input type="text" id="username" placeholder="Tu usuario" class="form-control" v-model="usuario.username"/>
                </div>
            </div>
            <div class="row">
                <div class="col-3">
                    <label for="password">Contraseña: </label>
                </div>
                <div class="col-9">
                    <input type="password" id="password" placeholder="Tu contraseña" class="form-control" v-model="usuario.password"/>
                </div>
            </div>
            <div class="row">
                <input type="button" class="btn btn-primary" value="Login" @click="Login"/>
            </div>
            <div class="row">
                <router-link to="/register">¿No estas registrado? ¡Registrate haciendo click aquí!</router-link>
            </div>
        </form>
    </div>
</template>

<script>

const axios = require('axios');

export default {
    data() {
        return {
            usuario: {
                username: "",
                password: ""
            }
        }
    },
    methods: {
        async Login(){
            const users = await axios.get(process.env.VUE_APP_API_URL + "/users");
            for (const element of users.data){
                if (element.username == this.usuario.username){
                    var user = element;
                }
            }
            if (user){
                localStorage.setItem('user', JSON.stringify(user));
                if (user.password == this.usuario.password){
                    if(user.isAdmin){
                        this.$router.push('/admin');
                    }else{
                        this.$router.push('/index');
                    }
                } else {
                    console.log("Contraseña incorrecta");
                }
            }
        }
    }
}
</script>

<style scoped>

    .container{
        width: 50%;
        padding-top: 200px;
    }
</style>