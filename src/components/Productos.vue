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
        };
        setTimeout(()=>{this.calcularStockProductos()}, 2000);
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
            let indexProducto = -1;
            let indexProductoCarrito = -1;
            for(var i = 0; i < this.carrito.length; i++) {
                if (this.carrito[i].id == id) {
                    indexProductoCarrito = i;
                }
            };
            for(var a = 0; a < this.productos.length; a++) {
                if (this.productos[a].id == id) {
                    indexProducto = a;
                }
            }
            if (indexProducto!=-1){
                const cant = this.carrito[indexProductoCarrito].stock;
                this.productos[indexProducto].stock += cant;
                this.carrito.splice(indexProductoCarrito, 1);
                localStorage.setItem('carrito', JSON.stringify(this.carrito));
            }
        },
        async createOrder(total) {
            let id;
            let user = JSON.parse(localStorage.getItem('user'));
            let products = [];
            this.carrito.forEach(element => {
                products.push(element);
                for(var i = 0; i < this.productos.length; i++) {
                    if(this.productos[i].id == element.id) {
                        id = i;
                    }
                }
                try {
                    const urlAPI=`${process.env.VUE_APP_API_URL}products/${element.id}`;
                    axios.put(urlAPI, this.productos[id]);
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
            try {
                await axios.post(process.env.VUE_APP_API_URL + 'users/' + user.id + '/orders', order);
            } catch (err) {
                console.log(err);
            };
            this.carrito = [];
            localStorage.setItem('carrito', JSON.stringify(this.carrito));
        },
        calcularStockProductos() {
            this.carrito.forEach(productoCarrito => {
                this.productos.forEach(producto => {
                    if (productoCarrito.id == producto.id) {
                        producto.stock -= productoCarrito.stock;
                    }
                });
            });
        }
    },
}
</script>

<style scoped>

.centrado{
    text-align: center;
}

</style>
