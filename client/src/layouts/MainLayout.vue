<script setup lang="ts">
import LayoutHeader from '@/components/layout/LayoutHeader.vue'
</script>

<template>
  <div class="min-h-screen">
    <div class="border-b border-gray-200">
      <LayoutHeader />
    </div>
    <div class="max-w-screen-xl m-auto p-4">
      <slot />
    </div>
  </div>
</template>
