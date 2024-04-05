<script setup lang="ts">
import { Button } from '@/components/ui/button'
import LogoTextIcon from '@/components/icons/LogoITextcon.vue'
import { LogIn, LogOut } from 'lucide-vue-next'
import { useUserStore } from '@/store/userStore'
import { onMounted } from 'vue'
import user from '@/services/user'
import router from '@/router'

const userStore = useUserStore()

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

function logout() {
  userStore.logOut()
  router.replace('/')
}

onMounted(userStore.initialize)
</script>

<template>
  <div class="max-w-screen-xl m-auto p-4">
    <div class="flex items-center gap-4">
      <RouterLink to="/"><LogoTextIcon /></RouterLink>
      <nav class="m-auto">
        <ul class="flex items-center justify-center gap-2">
          <li v-for="route in routes" :key="route.id">
            <RouterLink :to="route.link">
              <Button variant="link">
                {{ route.name }}
              </Button>
            </RouterLink>
          </li>
        </ul>
      </nav>
      <RouterLink to="/login" v-if="!userStore.isAuthenticated">
        <Button variant="outline">
          <LogIn class="mr-2 w-4 h-4" />
          Login
        </Button>
      </RouterLink>
      <Button v-else variant="outline" @click="logout">
        <LogOut class="mr-2 w-4 h-4" />
        {{ userStore.email }}
      </Button>
    </div>
  </div>
</template>
