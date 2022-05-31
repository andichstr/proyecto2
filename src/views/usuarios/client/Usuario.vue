<template>
<div>
    <div class="divMisOrdenes">
        <router-link :to="{ name: 'MisOrdenes', params: { id: usuario.id }}" class="btn btnMisOrdenes">Mis ordenes</router-link>
    </div>
    <div class="usuarios">
        <h1>Bienvenido/a {{ usuario.name }}</h1>
        <Productos/>
    </div>
</div>
</template>

<script>
import Productos from '../../../components/Productos.vue';

export default {
    name: 'Usuario',
    components: { Productos },
    data() {
        return {
            usuario: {
                id: 0,
                name: "",
                email: "",
                edad: 0,
                isAdmin: false,
            },
        }
    },
    mounted() {
        this.usuario = JSON.parse(localStorage.getItem('user'));
        if(this.usuario.isAdmin) {
            this.$router.push('/');
        }
    },
    methods: {

    }
}
</script>

<style>
    .usuarios {
        margin-top: 50px;
        text-align: center;
    }
    .divMisOrdenes {
        text-align: center;
        top: 0;
    }
    .btnMisOrdenes {
        background-color: chocolate;
        font-weight: bold;
    }
</style>