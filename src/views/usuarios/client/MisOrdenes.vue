<template>
    <div class="container">
        <h1>Mis Ordenes</h1>
        <table class="table">
            <thead>
                <th>N° Orden</th>
                <th>Productos</th>
                <th>Fecha</th>
                <th>Total</th>
            </thead>
            <tbody>
                <tr v-for="item in ordenes" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>
                        <p v-for="prod in item.products" :key="prod.id"><img :src="prod.img" :alt="prod.name" class="imgProd"/> {{ prod.stock }} {{ prod.name }}</p>
                    </td>
                    <td>{{ item.datetime }}</td>
                    <td>{{ item.total }}</td>
                </tr>
            </tbody>
        </table>
        <router-link to="/index" class="btn btn-danger">Volver</router-link>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'MisOrdenes',
    data() {
        return {
            userId: 0,
            ordenes: [],
            productos: [],
        }
    },
    methods: {
        async getOrdenes() {
            const result = await axios.get(process.env.VUE_APP_API_URL + 'users/' + this.userId + '/orders');
            this.ordenes = result.data;
        },
        async getProductos() {
            const result = await axios.get(process.env.VUE_APP_API_URL + 'products');
            this.productos = result.data;
        },
        
    },
    mounted() {
        this.userId = this.$route.params.id;
        this.getOrdenes();
        this.getProductos();
    },
}
</script>

<style scoped>
    .container {
        margin-top: 50px;
        text-align: center;
    }
    .imgProd {
        height: 40px;
        width: 40px;
    }
</style>