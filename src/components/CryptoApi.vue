<template>
    <div class="container">
        <div class="row">
            <h1>CoinMarket</h1>
            <input type="text" id="search" class="form-control bg-dark text-white rounded-0 border-0 my-4"
                placeholder="Search your coin" v-model="search" v-on:keyup="searchName" autofocus> 
            <table class="table table-dark table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Coin</th>
                        <th>Price</th>
                        <th>Price change</th>
                        <th>24h Volumen</th>
                    </tr>

                </thead>
                <tbody>
                    <tr v-for="(coin, index) in coinsFilter" :key="index">
                        <td class="text-muted">{{index + 1}}</td>
                        <td>
                            <img v-bind:src="coin.image" alt={{coin.name}} class="image">
                            <span>
                                {{coin.name}}
                            </span>
                            <span class="text-muted text-uppercase ms-2">
                                {{coin.symbol}}
                            </span>

                        </td>
                        <td>${{coin.current_price.toLocaleString()}}</td>
                        <td :class="coin.price_change_percentage_24h > 0 ? 'verde' : 'red' ">
                            {{coin.price_change_percentage_24h}}%</td>
                        <td>${{coin.total_volume.toLocaleString()}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script>
    import axios from 'axios'
    export default {

        data() {
            return {
                coins: [],
                search: null,
                coinsFilter: [],
            }
        },
        mounted() {
            this.coinGet();
        },

        computed: {
            searchName() {
                this.coinsFilter = this.coins.filter(coin => 
                coin.name.toLowerCase().includes(this.search.toLowerCase()) || coin.symbol.toLowerCase().includes(this.search.toLowerCase()))
            }

        },

        methods: {
            async coinGet() {
                await this.axios.get(
                        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
                    )
                    .then(
                        response => {
                            this.coins = response.data
                            this.coinsFilter = response.data
                        }
                    )
            },


            // searchName(){

            // }
        },
    }
</script>



<style scoped>
    .image {
        width: 2rem;
    }

    h1{
        margin-top: 2rem;
        text-align: center;
    }

    #search{
        border-radius: 15px;
    }

    .red {
        color: red;
    }

    .verde {
        color: green;
    }
</style>