<script lang="ts">
//import {api} from "@/api";
import axios from "axios";
import type {Product} from "@/api/types";


export default {
  data() {
    return {
      products: []
    };
  },
  mounted() {
    this.fetchProducts('http://localhost:3000/api/products/all')
  },
  methods: {
    async fetchProducts(url: string) {
      return new Promise((resolve, reject) => {
        axios.get(url)
            .then(response => {
              this.products = response.data;
              resolve('all good');
            })
            .catch(error => {
              console.error('Error al obtener la lista de personajes:', error);
              reject( error);
            });
      })

    },
  },
}
;
</script>

<template>
  <section>
    <div class="flex-container">
      <div id="flex-box1">Аптека</div>
      <div id="flex-box2">
        <div class="parts" id="part1">1</div>
        <div class="parts" id="part2">2</div>
        <div class="parts" id="part3">3</div>
      </div>
    </div>
    <div class="container-cards">
      <ul class="card-list">
        <li v-for="product in products" :key="product.id" class="card">


          <div class="image">
            <img :src="product.image" :alt="product.name">
          </div>


          <span>{{ product.price }}</span>

          <span>{{ product.name }}</span>


          <div class="information">
            <span>Price: {{ product.price }}</span>
          </div>


        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>

.flex-container {
  width: 100%;
  height: 400px;
  display: flex;
}

#flex-box1 {
  background: #B8D9C0;
  height: 100%;
  width: 50%;
  align-content: center;
}

#flex-box2 {
  background: #DAEFDC;
  height: 100%;
  width: 50%;
  flex-direction: row;
  flex-wrap: wrap;
}

.parts {
  height: 100px;
  width: 100px;
}

</style>