<script setup lang="ts">
type Props = {
  title: string
}

defineProps<Props>()
</script>

<template>
  <div>
    <h2 class="text-xl font-bold my-2">{{ title }}</h2>
    <div class="flex flex-col gap-4">
      <slot />
    </div>
  </div>
</template>
