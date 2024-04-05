<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useUserStore } from '@/store/userStore'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import * as yup from 'yup'
import type { UserDto } from '@/services/user/types'
import { useRouter } from 'vue-router'

const currentLoginState = ref<'sign in' | 'sign up'>('sign in')

const router = useRouter()
const authStore = useUserStore()

const validationSchema = {
  email: yup.string().required().email().max(20),
  password: yup.string().required().min(6)
}

const { handleSubmit } = useForm<UserDto>({
  validationSchema
})

const onSubmit = handleSubmit(async (values) => {
  currentLoginState.value === 'sign in'
    ? await authStore.signIn(values)
    : await authStore.signUp(values)
  router.replace('/admin')
})
</script>

<template>
  <div class="flex justify-center items-center min-h-[80vh]">
    <Card class="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">
          {{ currentLoginState === 'sign in' ? 'Login' : 'Sign up' }}
        </CardTitle>
        <CardDescription>
          Enter your email below to {{ currentLoginState === 'sign in' ? 'login' : 'sign up' }} to
          your account
        </CardDescription>
      </CardHeader>
      <form @submit="onSubmit">
        <CardContent>
          <div class="grid gap-4">
            <div class="grid gap-2">
              <Label for="email">Email</Label>
              <Input name="email" id="email" type="email" required />
            </div>
            <div class="grid gap-2">
              <div class="flex items-center">
                <Label for="password">Password</Label>
              </div>
              <Input name="password" id="password" type="password" required />
            </div>
            <Button type="submit" class="w-full">
              {{ currentLoginState === 'sign in' ? 'Login' : 'Sign up' }}
            </Button>
          </div>
          <div class="mt-4 text-center text-sm" v-if="currentLoginState === 'sign in'">
            Don't have an account?
            <a href="#" class="underline" @click="currentLoginState = 'sign up'"> Sign up </a>
          </div>
          <div class="mt-4 text-center text-sm" v-else>
            Already registered?
            <a href="#" class="underline" @click="currentLoginState = 'sign in'"> Log in </a>
          </div>
        </CardContent>
      </form>
    </Card>
  </div>
</template>
