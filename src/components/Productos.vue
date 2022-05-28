<template>
    <div>
        <Carrito :productos="this.carrito"/>
        <div class="row">
            <div class="col centrado" v-for="(item) in productos" :key="item.id">
                <Producto :producto="item" @cambiar-carrito="cambiarCarrito" @cambiar-fav="cambiarFavorito" @sumar-stock-producto="sumarStockProducto" @restar-stock-producto="restarStockProducto"/>
            </div>
        </div>
    </div>
</template>

<script>
import Producto from './CartaProducto.vue';
import Carrito from './Carrito.vue';
import axios from 'axios';

export default {
    name: 'App',
    components: { Producto, Carrito },
    data() {
        return {
            productos:[],
            carrito:[],
        }
    },
    mounted(){
        this.getProductos();
    },
    methods:{
        async getProductos() {
            try {
                const result = await axios.get(process.env.VUE_APP_API_URL + '/products');
                this.productos = result.data;
            } catch (err) {
                console.log(err);
            }
        },
        sumarStockProducto(id) {
            let result = this.productos.find((prod) => {
                return prod.id == id;
            });
            result.stock += 1;
        },
        restarStockProducto(id) {
            let result = this.productos.find((prod) => {
                return prod.id == id;
            });
            result.stock -= 1;
        },
        cambiarFavorito(id){
            let result = this.productos.find((prod) => {
                return prod.id == id;
            });
            if (result) {
                result.favorito = !result.favorito;
            }
        },
        cambiarCarrito(id, cant){
            let productoStock = this.productos.find((prod) => {
                return prod.id == id;
            });
            let productoCarrito = this.carrito.find((p) => {
                return p.id == id;
            });
            if (productoCarrito) {
                if (cant != 0){
                    productoCarrito.stock = cant;
                } else {
                    let i = this.carrito.indexOf(productoCarrito);
                    this.carrito.splice(i, 1);
                }
            } else {
                let nuevoProducto = {...productoStock};
                nuevoProducto.stock = cant;
                this.carrito.push(nuevoProducto);
            }
        },
    },
}
</script>

<style>

.centrado{
    text-align: center;
}

</style>
