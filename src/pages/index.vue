<script setup lang="ts">
const customerIds = ref([
  '1234',
])
</script>

<template>
  <n-card title="Customers">
    <router-link v-for="customerId of customerIds" :key="customerId" :to="{ name: 'customer', params: { customerId } }">
      <span class="ico-mdi-open-in-new" />
      <span>{{ customerId }}</span>
    </router-link>
  </n-card>
</template>

<style>

</style>
