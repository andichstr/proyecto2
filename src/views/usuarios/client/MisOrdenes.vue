<template>
    <div>
        {{ ordenes }}
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'MisOrdenes',
    data() {
        return {
            userId: 0,
            ordenes: []
        }
    },
    methods: {
        async getOrdenes() {
            const result = await axios.get(process.env.VUE_APP_API_URL + 'users/' + userId + '/orders');
            this.ordenes = result.data;
        }
    },
    mounted() {
        this.userId = this.$route.params.id;
        const result = axios.get(process.env.VUE_APP_API_URL + 'users/' + this.userId + '/orders');
        this.ordenes = result.data;
    }
}
</script>

<style>

</style>