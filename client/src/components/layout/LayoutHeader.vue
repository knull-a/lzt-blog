<script setup lang="ts">
import { Button } from '@/components/ui/button'
import LogoTextIcon from '@/components/icons/LogoITextcon.vue'

const routes = [
  {
    id: 0,
    name: 'Home',
    link: '/articles'
  },
  {
    id: 1,
    name: 'Admin Panel',
    link: '/admin'
  }
]
</script>

<template>
  <div class="max-w-screen-xl m-auto p-4">
    <div class="flex items-center gap-4">
      <RouterLink to="/"><LogoTextIcon /></RouterLink>
      <nav class="m-auto">
        <ul class="flex items-center justify-center gap-2">
          <li v-for="route in routes" :key="route.id">
            <Button variant="link">
              <RouterLink :to="route.link">{{ route.name }}</RouterLink>
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
