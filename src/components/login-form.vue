<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useMessage } from 'naive-ui'
import { useForm } from 'vee-validate'
import { z } from 'zod'

const emit = defineEmits<{
  (event: 'login', token: string): void
}>()

const message = useMessage()

const schema = toTypedSchema(
  z.object({
    token: z.string(),
  }),
)

const { errors, defineInputBinds, handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    token: '',
  },
})

const token = defineInputBinds('token')

const submit = handleSubmit(({ token }) => {
  try {
    emit('login', token)
    resetForm()
  }
  catch (error) {
    if (error instanceof Error)
      message.error(error.message)
  }
})
</script>

<template>
  <n-form @submit.prevent="submit()">
    <n-card class="w-360px" title="Login Form">
      <n-form-item label="Bearer Token">
        <n-input
          :value="token.value"
          :min="0"
          :status="errors.token ? 'error' : undefined"
          @blur="token.onBlur"
          @update:value="token.onChange"
        />
      </n-form-item>

      <template #action>
        <div class="flex justify-between">
          <div />
          <n-button strong type="primary" attr-type="submit">
            Login
          </n-button>
        </div>
      </template>
    </n-card>
  </n-form>
</template>

<style>

</style>
