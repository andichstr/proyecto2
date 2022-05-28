<template>
    <div>
        <div class="carrito" v-if="!desplegado" @click="desplegarCarrito()">
            {{ cantidadTotal }}
        </div>
        <div class="carritoDesplegado" v-else>
            <img :src="imagenCerrar" alt="Cerrar" class="cerrar" @click="desplegarCarrito()">
            <h2>Tu carrito</h2>
            <div v-if="productos.length != 0">
                <table class="table">
                    <thead>
                        <tr>
                            <th class="tituloTabla col-2" scope="col">Cantidad</th>
                            <th class="tituloTabla col-5" scope="col">Descripción</th>
                            <th class="tituloTabla col-5" scope="col">Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item) in productos" :key="item.id">
                            <td class="col-2">{{ item.cantidad }}</td>
                            <td class="col-5">{{ item.nombre }}</td>
                            <td class="col-5">$ {{ item.precio * item.cantidad }}</td>
                        </tr>
                    </tbody>
                </table>
                <h4>Total: $ {{ precioTotal }}</h4>
                <div class="finalizarCompraDiv">
                    <button class="finalizarCompraButton">Finalizar Compra</button>
                </div>
            </div>
            <div v-else>
                <h4>Tu carrito esta vacío!</h4>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            desplegado: false,
            imagenCerrar: "https://imgur.com/JyKCGKd",
        };
    },
    props:{
        productos:{
            type: Array,
            required: true,
        }
    },
    computed:{
        cantidadTotal() {
            let cantidadTotal = 0;
            this.productos.forEach(element => {
                cantidadTotal = cantidadTotal + element.cantidad;
            });
            return cantidadTotal;
        },
        precioTotal() {
            let precioTotal = 0;
            this.productos.forEach(element => {
                precioTotal = precioTotal + (element.precio * element.cantidad);
            });
            return precioTotal;
        },
    },
    methods: {
        desplegarCarrito() {
            this.desplegado = !this.desplegado;
        },
    },
}
</script>

<style scoped>

h2 {
    text-decoration: underline;
}

.carrito {
    position: fixed;
    top: 0;
    right: 0;
    padding-right: 6px;
    background-color: #008ea7d7;
    color: black;
    font-size: 1.2em;
    font-weight: bold;
    width: 40px;
    height: 40px;
    border-radius: 0 0 0 40px;
    text-align: right;
    z-index: 2;
}

.carrito:hover{
    cursor: pointer;
}

.carritoDesplegado {
    position: absolute;
    top: 0;
    right: 0;
    text-align: center;
    z-index: 3;
    background-color: #008ea7d7;
    color: black;
    font-weight: bold;
    border-radius: 10px;
}

.finalizarCompraDiv {
    text-align: center;
}

.finalizarCompraButton {
    background-color: #01d9ffd7;
    width: 100%;
    border-radius: 10px;
    margin-top: 10px;
    font-size: 0.9em;
    padding: 5px 0;
    border: 1px solid rgba(0, 0, 0, 0.5);
    cursor: pointer;
}

.finalizarCompraButton:hover {
    background-color: #0aa19ad0;
}

.cerrar{
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
}

.cerrar:hover{
    cursor: pointer;
}

.productoCarrito{
    display: flex;
}

.restarButton{
    background-color: red;
    text-align: right;
    align-content: center;
    font-weight: bold;
}

.restarButton:hover{
    background-color: rgb(136, 0, 0);
}

</style>