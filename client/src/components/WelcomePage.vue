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
              console.error('Error', error);
              reject(error);
            });
      })

    },
  },
}
;
</script>

<template>
  <section>
    <div class="flex-container mx-auto px-16 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div class="flex-box1 font-nanum">
        <div class="welcome-text">Welcome to Pharmacy</div>
        <div class="circle1"></div>
        <button class="button1"><p class="text1">Go to cart</p></button>
      </div>
      <div class="flex-box2 ">
        <img src="E:\zxc\delivery-service\client\public\serpent.png" alt="Serpent Image" class="frontline-image">
        <div class="parts" id="part1"></div>
        <div class="parts" id="part2"></div>
        <div class="parts" id="part3"></div>

      </div>
    </div>

    <div class="bg-white">
      <div class="bg-lighter rounded-lg mx-auto max-w-xl px-4  py-16 sm:px-6 sm:py-24 lg:max-w-4xl lg:px-2">
        <h2 class="sr-only">Products</h2>

        <div class="grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          <a v-for="product in products" :key="product.id" class="group">
            <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <img :src="'http://localhost:3000/api/images/' + product.name + '.png'" alt="product.name" class="h-full w-full object-cover object-center group-hover:opacity-75" />
            </div>
            <h3 class="mt-4 text-sm text-gray-700 font-nanum text-16px">{{ product.name }}</h3>
            <p class="text-lg font-medium text-gray-900 font-nanum flex items-center">
              <span class="inline-block w-1/2">{{ product.price }}.00$</span>
              <!-- Replace with your element that should be 50% width -->
              <button class="button2 relative inset-0 flex items-center justify-center rounded-lg bg-blue-500 w-1/2 border border-black text-[#23B680] transition duration-300 ease-in-out hover:bg-blue-600 hover:text-white">Add to cart</button>
            </p>
          </a>
        </div>
      </div>
    </div>


<!--    <div class="container-cards">-->
<!--      <ul class="card-list">-->
<!--        <li v-for="product in products" :key="product.id" class="card">-->
<!--          <div class="image">-->
<!--            <img v-bind:src="'http://localhost:3000/api/images/' + product.name + '.png'" alt="product.name"/>-->
<!--          </div>-->
<!--          <div class="information">-->
<!--            <span>Name: {{ product.name }}</span>-->
<!--            <br>-->
<!--            <span>Price: {{ product.price }}</span>-->
<!--          </div>-->
<!--        </li>-->
<!--      </ul>-->
<!--    </div>-->
  </section>
</template>

<style scoped>


.flex-container {
  width: 1202px;
  display: flex;

}

.flex-box1 {
  background: #B8D9C0;
  height: 629px;
  width: 601px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative
}
.welcome-text {
  font-size: 20px;
  position: absolute;
}
.circle1 {
  margin-top: 442px;
  margin-bottom: 120px;
  height: 67px;
  width: 73px;
  background-color: #ffffff;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  background-image: url('public/basket.png');
  background-size: 55px 55px;
  background-position: center;
  background-repeat: no-repeat;
}
.button1 {
  background-color: #ffffff;
  height: 39px;
  width: 99px;
  margin-top: 525px;
  margin-bottom: 65px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  border: 1px solid black;
}
.button1:hover {
  background-color: #23B680;
  color: white;
border: white;

}
.button2:hover {
  background-color: #23B680;
  color: white;
  border: white;
}
.text1 {
  margin: 0;
}

.flex-box2 {
  background: #DAEFDC;
  height: 629px;
  width: 601px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  position: relative;
}


.parts {
  height: 628px;
  width: 200px;
}

#part1 {
  background-color: #DAEFDC; /* Красный */
}

#part2 {
  background-color: #CEE8CE; /* Зеленый */
}

#part3 {
  background-color: #B8D9C0; /* Синий */
}
.frontline-image {
  width: 345px;
  height: 345px;
  object-fit: cover;
  position: absolute; /* Position image absolutely */
  top: 50%; /* Center vertically */
  left: 50%; /* Center horizontally */
  transform: translate(-50%, -50%); /* Adjust to center the image */
}

</style>