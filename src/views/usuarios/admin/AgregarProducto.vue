<template>
    <div class="container">
        <form action="">
            <div class="row">
                <div class="col-3">
                    <label for="nombre">Nombre:</label>
                </div>
                <div class="col-9">
                    <input type="text" id="nombre" placeholder="Nombre del producto" v-model="producto.name"/>
                </div>
            </div>
            <div class="row">
                <div class="col-3">
                    <label for="imagen">Imagen:</label>
                </div>
                <div class="col-9">
                    <input type="text" id="imagen" placeholder="Url de la imagen" v-model="producto.img"/>
                </div>
            </div>
            <div class="row">
                <div class="col-3">
                    <label for="precio">Precio:</label>
                </div>
                <div class="col-9">
                    <input type="number" id="precio" v-model="producto.price"/>
                </div>
            </div>
            <div class="row">
                <div class="col-3">
                    <label for="stock">Stock:</label>
                </div>
                <div class="col-9">
                    <input type="number" id="stock" v-model="producto.stock"/>
                </div>
            </div>
            <div class="divBotones">
                <input type="button" class="btn btn-primary btnGuardar" @click="guardarProducto()" value="Guardar producto">
                <router-link to="/admin" class="btn btn-warning btnVolver">Volver</router-link>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            producto: {
                name: "",
                img: "",
                price: 0,
                stock: 0,
            }
        }
    },
    methods:{
        inicializarProducto(){
            this.producto.name = "";
            this.producto.img = "";
            this.producto.price = 0;
            this.producto.stock = 0;
        },
        async guardarProducto(){
            const prod = {...this.producto};
            try {
                await axios.post(process.env.VUE_APP_API_URL + '/products', prod);
                alert("Producto agregado con éxito");
                this.inicializarProducto();
            } catch (err){
                console.log(err);
            }
        }
    },
}
</script>

<style scoped>
    input {
        width: 70%;
    }
    .btnGuardar {
        width: 50%;
    }
    .btnVolver {
        width: 20%;
        margin-left: 15px;
    }
    .container {
        margin-top: 45px;
    }
    .divBotones {
        margin-top: 10px;
    }
    .col-3 {
        text-align: right;
    }
    .col-9 {
        text-align: left;
    }
    div {
        margin-top: 1px;
    }
</style>