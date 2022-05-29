<template>
    <div class="container">
        <div>
            <Carrito :productos="this.carrito" @eliminar-producto-carrito="eliminarProductoEnCarrito"/>
        </div>
        <div class="container">
            <img :alt="producto.name" :src="producto.img"/>
                <h1>{{ producto.name }}</h1>
                <h4>{{ producto.desc }}</h4>
                <div>Disponibles: {{ producto.stock }}</div>
                <div>$ {{ producto.price }}</div>
                <input type="number" v-model="contador" @keyup="checkContador()"/>
                <input type="button" :disabled="botonProductoDeshabilitado" class="botonCambiarCarrito" @click="cambiarCarrito()" :value="valorBotonProducto"/>
        </div>
            <router-link to="/index">
                <input type="button" class="btn btn-danger" value="Volver"/>
            </router-link>
    </div>
</template>

<script>
import axios from 'axios';
import Carrito from '@/components/Carrito.vue';

export default {
    name: 'Producto',
    components: { Carrito },
    data() {
        return {
            contador: 0,
            carrito: [],
            producto: {
                id: 0,
                name: "",
                img: "",
                price: 0,
                stock: 0,
            },
            botonProductoDeshabilitado: true,
            valorBotonProducto: "Agregar al Carrito"
        };
    },
    methods: {
        async getProducto(id) {
            const result = await axios.get(process.env.VUE_APP_API_URL + "products/" + id);
            this.producto = result.data;
        },
        agregarCarrito(id, cant){
            let productoCarrito = this.carrito.find((p) => {
                return p.id == id;
            });
            if (productoCarrito) {
                productoCarrito.stock += cant;
                localStorage.setItem('carrito', JSON.stringify(this.carrito));
                } else {
                let nuevoProducto = {...this.producto};
                nuevoProducto.stock = cant;
                this.carrito.push(nuevoProducto);
                localStorage.setItem('carrito', JSON.stringify(this.carrito));
            }
        },
        cambiarCarrito() {
            this.agregarCarrito(this.producto.id, Number(this.contador));
            this.producto.stock -= this.contador;
            this.contador = 0;
            this.checkStock();
        },
        checkContador() {
            if (this.contador > this.producto.stock){
                this.contador = this.producto.stock;
            } else if (this.contador < 0) {
                this.contador = 0;
            }
            this.checkStock();
        },
        checkStock() {
            if (this.producto.stock == 0){
                this.botonProductoDeshabilitado = true;
                this.valorBotonProducto = "Sin stock";
            } else if (this.producto.stock != 0 && this.contador == 0) {
                this.botonProductoDeshabilitado = true;
                this.valorBotonProducto = "Agregar";
            } else {
                this.botonProductoDeshabilitado = false;
                this.valorBotonProducto = "Agregar";
            }
        },
        eliminarProductoEnCarrito(id) {
            const prod = (element) => element = id;
            let indexProducto = this.carrito.findIndex(prod);
            console.log(indexProducto);
            if (indexProducto!=-1){
                const cant = this.carrito[indexProducto].stock;
                this.producto.stock += cant;
                this.carrito.splice(indexProducto, 1);
                localStorage.setItem('carrito', JSON.stringify(this.carrito));
            }
        },
    },
    mounted() {
        this.getProducto(this.$route.params.id);
        this.carrito = JSON.parse(localStorage.getItem('carrito'));
        this.carrito.forEach(element => {
            if (element.id == this.producto.id){
                console.log("2");
                this.producto.stock -= element.stock;
            }
        });
    },
}

</script>

<style scoped>
    .container {
        margin-top: 50px;
        text-align: center;
    }
    .btn-danger {
        margin-top: 5px;
    }
</style>