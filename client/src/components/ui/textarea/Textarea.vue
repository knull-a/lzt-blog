<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { useField } from 'vee-validate'

const props = defineProps<{
  class?: HTMLAttributes['class']
  defaultValue?: string | number
  name?: string
}>()

const { errorMessage, handleBlur, handleChange, value } = useField<string>(
  props.name ?? '',
  {},
  {
    initialValue: (props.defaultValue as string) || ''
  }
)
</script>

<template>
  <textarea
    :value
    :name
    :class="
      cn(
        'flex min-h-20 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300',
        props.class
      )
    "
    @input="handleChange"
    @blur="handleBlur"
  />
  <p v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</p>
</template>
