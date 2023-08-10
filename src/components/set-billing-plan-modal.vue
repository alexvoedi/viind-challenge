<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { useMessage } from 'naive-ui'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useForm } from 'vee-validate'
import type { Billing } from '../interfaces/Billing'

const props = defineProps<{
  billing: Billing
  token: string
}>()

const emit = defineEmits<{
  (event: 'setBillingPlan', billingPlan: {
    customerId: string
    monthlyCredits: number
  }): void
}>()

const message = useMessage()

const schema = toTypedSchema(
  z.object({
    customerId: z.string(),
    monthlyCredits: z.number().int().min(0),
  }),
)

const { errors, defineInputBinds, handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    customerId: props.billing.customerId,
    monthlyCredits: props.billing.monthlyCredits,
  },
})

const monthlyCredits = defineInputBinds('monthlyCredits')

const setBillingPlanMutation = gql`
  mutation setBillingPlanMutation(
    $customerId: String!
    $monthlyCredits:Int!
  ) {
    setBillingPlan(setBillingInput: { customerId: $customerId, monthlyCredits: $monthlyCredits}) {
      customerId
      monthlyCredits
    }
  }
`

const { loading, mutate } = useMutation<{ billing: Pick<Billing, 'monthlyCredits' | 'customerId'> }>(setBillingPlanMutation, {
  context: {
    headers: {
      authorization: `Bearer ${props.token}`,
    },
  },
})

const show = ref(false)

function showModal() {
  show.value = true
}

function hideModal() {
  resetForm()
  show.value = false
}

const submit = handleSubmit(async (values) => {
  try {
    await mutate(values)
    emit('setBillingPlan', values)
    message.success('Billing plan updated')
    hideModal()
  }
  catch (error) {
    if (error instanceof Error)
      message.error(error.message)
  }
})
</script>

<template>
  <n-button strong type="primary" @click="showModal()">
    Set Billing Plan
  </n-button>

  <n-modal v-model:show="show" closable :loading="loading">
    <div>
      <n-form @submit.prevent="submit()">
        <n-card class="w-360px" title="Set Billing Plan" role="dialog" aria-modal="true">
          <div>
            <n-form-item label="Monthly Credits" :feedback="errors.monthlyCredits">
              <n-input-number
                :value="monthlyCredits.value"
                :min="0"
                :status="errors.monthlyCredits ? 'error' : undefined"
                @blur="monthlyCredits.onBlur"
                @update:value="monthlyCredits.onChange"
              />
            </n-form-item>
          </div>

          <template #action>
            <div class="flex justify-between">
              <n-button strong secondary @click="hideModal()">
                Cancel
              </n-button>

              <n-button strong type="primary" attr-type="submit">
                Submit
              </n-button>
            </div>
          </template>
        </n-card>
      </n-form>
    </div>
  </n-modal>
</template>

<style>

</style>
