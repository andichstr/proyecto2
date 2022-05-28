<template>
  <div class="divContador">
      <button class="contador" @click="restar()">-</button>
      <input type="text" class="contador" v-model="contador" readonly/>
      <button class="contador" @click="sumar()">+</button>
  </div>
</template>

<script>
export default {
    data() {
        return {
            contador: 0
        }
    },
    props: {
        stock:{
            type: Number,
            required: true,
        }
    },
    methods:{
        restar(){
            if(this.contador > 0){
                this.contador -=1;
                this.$emit('sumar-stock');
                this.$emit('mi-contador', this.contador);
            }
        },
        sumar(){
            if(this.stock > 0){
                this.contador +=1;
                this.$emit('restar-stock');
                this.$emit('mi-contador', this.contador);
            }
        }
    },
}
</script>

<style scoped>

.contador{
    width: 100%;
    border-radius: 10px;
    text-align: center;
}

</style>