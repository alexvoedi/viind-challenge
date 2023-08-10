<script setup lang="ts">
import { lightTheme } from 'naive-ui'

import { useAccountStore } from '@/store/account'

const accountStore = useAccountStore()

useHead({
  title: 'Account Billing App',
  meta: [
    {
      name: 'description',
      content: 'A simple account billing app built with Vue.js and GraphQL.',
    },
  ],
})
</script>

<template>
  <n-config-provider :theme="lightTheme">
    <n-message-provider>
      <main class="container mx-auto p-6">
        <div v-if="accountStore.isLoggedIn" class="grid space-y-4">
          <n-button
            @click="accountStore.logout()"
          >
            Logout
          </n-button>

          <router-view />
        </div>

        <login-form v-else @login="accountStore.login" />
      </main>
    </n-message-provider>
  </n-config-provider>
</template>

<style lang="postcss"></style>
