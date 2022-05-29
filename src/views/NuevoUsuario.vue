<template>
    <div class="container">
        <h1>Nuevo Usuario</h1>
        <form class="form" action="">
            <div class="row">
                <div class="col-3">
                    <label for="username">Usuario: </label>
                </div>
                <div class="col-9">
                    <input type="text" id="username" placeholder="Tu Usuario" class="form-control" @keyup="validateUsername" v-model="usuario.username"/>
                </div>
            </div>
            <div class="row" v-if='validUsername != ""'>
                <p class="errorForm">{{ validUsername }}</p>
            </div>
            <div class="row">
                <div class="col-3">
                    <label for="nombre">Nombre y Apellido: </label>
                </div>
                <div class="col-9">
                    <input type="text" id="nombre" placeholder="Tu nombre y apellido" class="form-control" @keyup="validateNombre" v-model="usuario.name"/>
                </div>
            </div>
            <div class="row" v-if='validNombre != ""'>
                <p class="errorForm">{{ validNombre }}</p>
            </div>
            <div class="row">
                <div class="col-3">
                    <label for="email">Mail: </label>
                </div>
                <div class="col-9">
                    <input type="text" id="email" placeholder="Tu email" class="form-control" @keyup="validateEmail" v-model="usuario.email"/>
                </div>
            </div>
            <div class="row" v-if='validMail != ""'>
                <p class="errorForm">{{ validMail }}</p>
            </div>
            <div class="row">
                <div class="col-3">
                    <label for="edad">Edad: </label>
                </div>
                <div class="col-9">
                    <input type="number" id="edad" placeholder="Tu edad" class="form-control" @keyup="validateEdad" v-model="usuario.edad"/>
                </div>
            </div>
            <div class="row" v-if='validEdad != ""'>
                <p class="errorForm">{{ validEdad }}</p>
            </div>
            <div class="row">
                <div class="col-3">
                    <label for="password">Contraseña: </label>
                </div>
                <div class="col-9">
                    <input type="password" id="password" placeholder="Tu contraseña" class="form-control" @keyup="validatePassword" v-model="usuario.password"/>
                </div>
            </div>
            <div class="row" v-if='validPassword != ""'>
                <p class="errorForm">{{ validPassword }}</p>
            </div>
            <div class="row">
                <input type="button" class="btn btn-agregar" value="Agregar" @click="agregarUsuario"/>
            </div>
        </form>
        <div class="btnVolverDiv">
            <router-link to="/"><button class="btn btn-danger">Volver</button></router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            usuario: {
                username: "",
                name: "",
                password: "",
                email: "",
                edad: "",
                isAdmin: false,
            },
            validUsername: "",
            validNombre: "",
            validPassword: "",
            validMail: "",
            validEdad: "",
        }
    },
    methods: {
        async agregarUsuario() {
            if (this.checkForm()){
                try {
                    const result = await axios.post(process.env.VUE_APP_API_URL + "/users", this.usuario);
                    console.log(result);
                } catch (err) {
                    console.error(err)
                }
                this.usuario.username = "";
                this.usuario.name = "";
                this.usuario.password = "";
                this.usuario.email = "";
                this.usuario.edad = "";
            } else {
                alert("Por favor, corrija los errores del formulario y vuelva a intentarlo");
            }
        },
        checkForm () {
            return (this.validateUsername() && this.validateNombre() && this.validateEmail() && this.validateEdad() && this.validatePassword())
            },
        validateUsername(){
            let reg_ex_username = /[a-zA-Z]{4,}/;
            if (reg_ex_username.test(this.usuario.username)){
                this.validUsername = "";
                return true;
            } else {
                this.validUsername = "Su nombre de usuario debe tener al menos 4 letras";
                return false;
            }
        },
        validateNombre(){
            let reg_ex_nombre = /[a-zA-Z]{2,}/g;
            if (reg_ex_nombre.test(this.usuario.nombre)){
                this.validNombre = "";
                return true;
            } else {
                this.validNombre = "Nombres y apellidos tienen mas de dos letras cada uno";
                return false;
            }
        },
        validateEmail(){
            let reg_ex_mail = /^[^@]+@[^@]+.[a-zA-Z]{2,}$/;
            if (reg_ex_mail.test(this.usuario.email)){
                this.validMail = "";
                return true;
            } else {
                this.validMail = "Mail inválido";
                return false;
            }
        },
        validateEdad(){
            if (this.usuario.edad >= 18 && this.usuario.edad <= 100){
                this.validEdad = "";
                return true;
            } else {
                this.validEdad = "Debe ingresar una edad entre 18 y 100 años.";
                return false;
            }
        },
        validatePassword(){
            let reg_ex_password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
            if (reg_ex_password.test(this.usuario.password)){
                this.validPassword = "";
                return true;
            } else {
                this.validPassword = "La contraseña debe contener al menos 8 caracteres, una mayúscula, un caracter especial y un número."
                return false;
            }
        }
    }
}
</script>

<style scoped>

    input{
        width: 100%;
    }

    .col-3{
        text-align: right;
    }

    .form{
        border: 1px solid #88B6CB;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .errorForm{
        color: red;
        font-size: small;
    }

    .btn-agregar{
        background-color: #88B6CB;
    }

    .btnVolverDiv {
        text-align: right;
        margin-top: 5px;
    }
</style>