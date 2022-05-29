<template>
  <div class="container">
        <table class="table" v-if="this.productos.length != 0">
            <thead>
                <th>#</th>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Editar</th>
                <th>Borrar</th>
            </thead>
            <tbody>
                <tr v-for="(product, i) in productos" :key="product.id">
                    <td>{{ product.id }}</td>
                    <td><img :src="product.img" :alt="product.name" class="imgProd"></td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.price }}</td>
                    <td>{{ product.stock }}</td>
                    <td><input type="button" class="btn btn-warning" @click="editarProducto(i)" value="Editar"/></td>
                    <td><input type="button" class="btn btn-danger" @click="borrarProducto(product.id)" value="Borrar"/></td>
                </tr>
            </tbody>
        </table>
        <router-link to="/nuevoProducto" class="btn btn-primary">Agregar nuevo producto</router-link>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            productos: [],
            producto:{
                name: "",
                img: "",
                price: 0,
                stock: 0,
            },
        }
    },
    methods:{
        async getProductos(){
            const products = await axios.get(process.env.VUE_APP_API_URL + '/products');
            this.productos = products.data;
        },
        editarProducto(id){
            localStorage.setItem('productoAEditar', JSON.stringify(this.productos[id]));
            this.$router.push('/editarProducto/' + id);
        },
        async borrarProducto(id) {
            await axios.delete(process.env.VUE_APP_API_URL + '/products/' + id);
        }
    },
    mounted(){
        this.getProductos();
    }
}
</script>

<style scoped>
    .container{
        padding-top: 80px;
    }
    .imgProd {
        height: 100px;
    }
</style>