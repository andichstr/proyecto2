<template>
    <div>
        <Carrito :productos="this.carrito" @eliminar-producto-carrito="eliminarProductoEnCarrito" @create-order="createOrder"/>
        <div class="row">
            <div class="col centrado" v-for="(item) in productos" :key="item.id">
                <Producto :producto="item" @agregar-carrito="agregarCarrito"/>
            </div>
        </div>
    </div>
</template>

<script>
import Producto from './CartaProducto.vue';
import Carrito from './Carrito.vue';
import axios from 'axios';

export default {
    name: 'Products',
    components: { Producto, Carrito },
    data() {
        return {
            productos:[],
            carrito:[],
        }
    },
    mounted(){
        this.getProductos();
        if (localStorage.getItem('carrito')){
            this.carrito = JSON.parse(localStorage.getItem('carrito'));
        }
    },
    methods:{
        async getProductos() {
            try {
                const result = await axios.get(process.env.VUE_APP_API_URL + '/products');
                this.productos = result.data;
                this.productos.forEach(element => {
                    element.stock = Number(element.stock);
                    element.price = Number(element.price);
                });
            } catch (err) {
                console.log(err);
            }
        },
        agregarCarrito(id, cant){
            let productoStock = this.productos.find((prod) => {
                return prod.id == id;
            });
            let productoCarrito = this.carrito.find((p) => {
                return p.id == id;
            });
            if (productoCarrito) {
                productoCarrito.stock += cant;
                localStorage.setItem('carrito', JSON.stringify(this.carrito));
                } else {
                let nuevoProducto = {...productoStock};
                nuevoProducto.stock = cant;
                this.carrito.push(nuevoProducto);
                localStorage.setItem('carrito', JSON.stringify(this.carrito));
            }
        },
        eliminarProductoEnCarrito(id) {
            const prod = (element) => element = id;
            let indexProducto = this.carrito.findIndex(prod);
            if (indexProducto){
                const cant = this.carrito[indexProducto].stock;
                this.producto.stock += cant;
                this.carrito.splice(indexProducto, 1);
                localStorage.setItem('carrito', JSON.stringify(this.carrito));
            }
        },
        async createOrder(total) {
            console.log(total);
            let p;
            let user = JSON.parse(localStorage.getItem('user'));
            let products = [];
            this.carrito.forEach(element => {
                products.push(element.id);
                try {
                    axios.put(process.env.VUE_APP_API_URL + 'products/' + element.id,this.productos[this.productos.indexOf(element)]);
                } catch (err) {
                    console.log(err);
                }
            });
            const order = {
                userId: user.id,
                products: products,
                datetime: Date(),
                total: total
            };
            console.log(order);
            try {
                await axios.post(process.env.VUE_APP_API_URL + 'users/' + user.id + '/orders', order);
            } catch (err) {
                console.log(err);
            };
            this.carrito = [];
            localStorage.setItem('carrito', JSON.stringify(this.carrito));
        }
    },
}
</script>

<style scoped>

.centrado{
    text-align: center;
}

</style>
