<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import WelcomePage from './components/WelcomePage.vue'
</script>

<template>
  <header>

    <div class="wrapper">
      <WelcomePage msg="You did it!" />

<!--      <nav>-->
<!--        <RouterLink to="/">Home</RouterLink>-->
<!--        <RouterLink to="/about">About</RouterLink>-->
<!--      </nav>-->
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
