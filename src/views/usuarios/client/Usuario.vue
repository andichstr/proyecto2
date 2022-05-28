<template>
    <div>
        <h1>Bienvenido/a {{ usuario.name }}</h1>
        <Productos/>
    </div>
</template>

<script>
import Productos from '../../../components/Productos.vue';

export default {
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
    },
    methods: {

    }
}
</script>

<style>

</style>