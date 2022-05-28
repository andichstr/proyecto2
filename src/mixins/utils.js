import axios from 'axios';

export default {
    methods:{
        async getProductos(){
            try {
                const result = await axios.get(process.env.VUE_APP_API_URL + '/products');
                this.productos = result.data;

            } catch (err) { console.error(err) }
        }
    },
}