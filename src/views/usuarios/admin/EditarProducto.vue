<template>
    <div class="container">
        <form action="">
            <div class="row">
                <div class="col-3">
                    <label for="nombre">Nombre:</label>
                </div>
                <div class="col-9">
                    <input class="form-control" type="text" id="nombre" placeholder="Nombre del producto" v-model="producto.name"/>
                </div>
            </div>
            <div class="row">
                <div class="col-3">
                    <label for="imagen">Imagen:</label>
                </div>
                <div class="col-9">
                    <input class="form-control" type="text" id="imagen" placeholder="Url de la imagen" v-model="producto.img">
                </div>
            </div>
            <div class="row">
                <div class="col-3">
                    <label for="descripcion">Descripcion:</label>
                </div>
                <div class="col-9">
                    <textarea class="form-control" id="descripcion" placeholder="Descrpición del producto" v-model="producto.desc"></textarea>
                </div>
            </div>
            <div class="row">
                <div class="col-3">
                    <label for="precio">Precio:</label>
                </div>
                <div class="col-9">
                    <input class="form-control" type="number" id="precio" v-model="producto.price">
                </div>
            </div>
            <div class="row">
                <div class="col-3">
                    <label for="stock">Stock:</label>
                </div>
                <div class="col-9">
                    <input class="form-control" type="number" id="stock" v-model="producto.stock">
                </div>
            </div>
            <div class="divBotones">
                <input type="button" class="btn btn-primary btnEdit" @click="editarProducto()" value="Editar Producto"/>
                <router-link to="/admin" class="btn btn-warning btnVolver">Volver</router-link>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            producto: {
                id: 0,
                name: "",
                desc: "",
                img: "",
                price: 0,
                stock: 0,
            },
        }
    },
    mounted() {
        this.producto = JSON.parse(localStorage.getItem('productoAEditar'));
    },
    methods: {
        async editarProducto() {
            try {
                await axios.put(process.env.VUE_APP_API_URL + '/products/' + this.producto.id, this.producto);
                alert("Producto " + this.producto.name + " fue editado exitosamente");
                localStorage.removeItem('productoAEditar');
                this.$router.push('/admin');
            } catch (err) {
                console.log(err);
            }
        }
    }


}
</script>

<style scoped>
    input {
        width: 70%;
    }
    textarea {
        width: 70%;
    }
    .btnEdit {
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
        text-align: center;
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