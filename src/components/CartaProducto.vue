<template>
    <div>
        <div class="grillaProducto">
            <img
                v-if="producto.favorito"
                src="https://imgur.com/AIB3m4K"
                alt="favorito"
                class="favorito"
                @click="cambiarFav()"
            />
            <img
                v-if="!producto.favorito"
                src="https://imgur.com/eWbb8jw"
                alt="favorito"
                class="favorito"
                @click="cambiarFav()"
            />
            <img
                :alt="producto.name"
                :src="producto.img"
                class="imgGrilla"
            />
            <h4>{{ producto.name }}</h4>
            <div>Stock: {{ producto.stock }}</div>
            <div>$ {{ producto.price }}</div>
            <ContadorProducto :stock="producto.stock" @mi-contador="miContador" @sumar-stock="sumarStock" @restar-stock="restarStock"/>
            <input type="button" :disabled="botonProductoDeshabilitado" class="botonCambiarCarrito" @click="cambiarCarrito()" :value="valorBotonProducto"/>
        </div>
    </div>

</template>

<script>
import ContadorProducto from '@/components/ContadorProducto.vue';

export default {
    components:{ ContadorProducto },
    data() {
        return {
            valorBotonProducto: "Sin seleccionar",
            contador: 0,
            contadorCarrito: 0,
            botonProductoDeshabilitado: true,
        }
    },
    props:{
        producto: {
            type: Object,
            required: true
        },
    },
    methods: {
        cambiarCarrito() {
            this.$emit("cambiar-carrito", this.producto.id, this.contador);
            this.contadorCarrito = this.contador;
            if (this.contador != 0) {
                this.valorBotonProducto = "En carrito";
                this.botonProductoDeshabilitado = true;
            } else {
                this.valorBotonProducto = "Sin seleccionar";
                this.botonProductoDeshabilitado = true;
            }
        },
        cambiarFav() {
            this.$emit("cambiar-fav", this.producto.id);
        },
        sumarStock(){
            this.$emit('sumar-stock-producto', this.producto.id)
        },
        restarStock(){
            this.$emit('restar-stock-producto', this.producto.id)
        },
        miContador(cont){
            this.contador = cont;
        }
    },
    watch: {
        contador(val){
            if (val == this.contadorCarrito){
                if (this.contadorCarrito != 0){
                this.valorBotonProducto = "En carrito";
                this.botonProductoDeshabilitado = true;
                }else{
                    this.valorBotonProducto = "Sin seleccionar";
                    this.botonProductoDeshabilitado = true;
                }
            } else if (val < this.contadorCarrito){
                this.valorBotonProducto = "Restar";
                this.botonProductoDeshabilitado = false;
            } else {
                this.valorBotonProducto = "Agregar";
                this.botonProductoDeshabilitado = false;
            }
        }
    }

}
</script>

<style scoped>

.grillaProducto{
    position: relative;
    width: 300px;
    max-height: 380px;
    box-shadow: 0 0 10px rgba(45, 75, 100, 0.7);
    background-color: rgba(149, 184, 214, 0.7);
    color: black;
    padding: 5px;
    margin: auto;
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    z-index: 1;
}

.favorito {
    position: absolute;
    top: 5px;
    left: 5px;
    width: 40px;
}

.imgGrilla {
    max-width: 100%;
    height: 150px;
}

.grillaProducto:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.7);
}

.botonCambiarCarrito {
    background-color: #01d9ffd7;
    width: 130px;
    border-radius: 10px;
    margin-top: 10px;
    font-size: 1.1em;
    padding: 5px 0;
    border: 1px solid rgba(0, 0, 0, 0.5);
    cursor: pointer;
}

.botonAgregarCarrito:hover {
    background-color: #0aa19ad0;
}

</style>