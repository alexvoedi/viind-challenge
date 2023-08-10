<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { useAccountStore } from '../store/account'
import type { Billing } from '@/interfaces/Billing'

const props = defineProps<{
  customerId: string
}>()

const accountStore = useAccountStore()

const billingQuery = gql`
  query billingQuery(
    $customerId: String!
  ) {
    billing(customerId: $customerId) {
      id
      customerId
      monthlyCredits
      usedCredits
      additionalCredits
      remainingCredits
      debtLimit
    }
  }
`

const { result, error, loading, refetch } = useQuery<{ billing: Billing }>(billingQuery, {
  customerId: props.customerId,
}, {
  context: {
    headers: {
      authorization: `Bearer ${accountStore.token}`,
    },
  },
})
</script>

<template>
  <n-button text @click="$router.go(-1)">
    <template #icon>
      <span class="ico-mdi-arrow-left" />
    </template>

    <span>Back</span>
  </n-button>

  <div v-if="loading">
    <p>Loading...</p>
  </div>

  <n-card v-else-if="result && result.billing" :title="`Customer ${customerId}`">
    <template #header-extra>
      <set-billing-plan-modal :billing="result.billing" :token="accountStore.token" @set-billing-plan="refetch()" />
    </template>

    <div class="flex gap-12">
      <n-statistic label="Monthly Credits" :value="result.billing.monthlyCredits">
        <template #prefix>
          <n-icon class="ico-mdi-attach-money" />
        </template>
      </n-statistic>

      <n-statistic label="Remaining Credits" :value="result.billing.remainingCredits">
        <template #prefix>
          <n-icon class="ico-mdi-attach-money" />
        </template>
      </n-statistic>

      <n-statistic label="Additional Credits" :value="result.billing.additionalCredits">
        <template #prefix>
          <n-icon class="ico-mdi-attach-money" />
        </template>
      </n-statistic>
    </div>
  </n-card>

  <n-card v-else-if="error">
    <n-result status="error" title="Error" :description="error.message" />
  </n-card>

  <div v-else>
    <p>Customer not found</p>
  </div>
</template>

<style>
</style>
