<template>
    <div class="container">
        <h1>Bienvenido, {{ usuario.name }}</h1>
        <ProductosAdmin/>
    </div>
</template>

<script>
import ProductosAdmin from '../../../components/ProductosAdmin.vue';

export default {
    components:{ ProductosAdmin },
    data() {
        return {
            usuario: {},
        }
    },
    mounted() {
        this.usuario = JSON.parse(localStorage.getItem('user'));
    }
        
}
</script>

<style>
    .container{
        text-align: center;
    }
    h1{
        margin-top: 50px;
    }
</style>