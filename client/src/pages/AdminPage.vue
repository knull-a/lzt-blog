<script setup lang="ts">
import type { AuthorData } from '@/services/user/types'
import { onBeforeMount, onMounted, ref } from 'vue'
import UserService from '@/services/user'
import ArticleService from '@/services/article'
import LayoutSection from '@/components/layout/LayoutSection.vue'
import type { ArticleData, ArticleDataDto } from '@/services/article/types'
import Button from '@/components/ui/button/Button.vue'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import DialogClose from '@/components/ui/dialog/DialogClose.vue'
import Textarea from '@/components/ui/textarea/Textarea.vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useUserStore } from '@/store/userStore'
import router from '@/router'

const users = ref<AuthorData[]>()
const articles = ref<ArticleData[]>()
const closeButton = ref<HTMLDivElement>()

const { handleSubmit } = useForm<ArticleDataDto>({
  validationSchema: {
    title: yup.string().required(),
    text: yup.string().required()
  }
})

const userStore = useUserStore()

async function getArticles() {
  articles.value = await ArticleService.getArticles({limit: 100})
}

const onSubmit = handleSubmit(async (values) => {
  await ArticleService.createArticle(values)
  closeButton.value?.click()
  await getArticles()
})

onMounted(async () => {
  users.value = await UserService.getUsers()
  await getArticles()
})

onBeforeMount(() => {
  if (!userStore.isAuthenticated) router.replace('/login')
  if (userStore.role !== 'ADMIN') router.replace('/')
})
</script>

<template>
  <LayoutSection title="Articles">
    <div>
      <Dialog>
        <DialogTrigger as-child>
          <Button> New Article + </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Article</DialogTitle>
            <DialogDescription>
              Fill the form below. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form @submit="onSubmit" class="grid gap-4 py-4">
            <div class="flex flex-col gap-2 items-start">
              <Label for="name" class="text-right"> Title </Label>
              <Input id="name" name="title" class="col-span-3" />
            </div>
            <div class="flex flex-col gap-2 items-start">
              <Label for="username" class="text-right"> Text </Label>
              <Textarea id="username" name="text" class="col-span-3" />
            </div>
            <DialogFooter>
              <Button type="submit"> Save changes </Button>
              <DialogClose>
                <div ref="closeButton" />
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
    <div class="flex flex-col gap-4">
      <RouterLink
        :to="`/articles/${article.id}`"
        v-for="article in articles"
        :key="article.id"
        class="box"
      >
        <p>
          <b>Title: </b>
          {{ article.title }}
        </p>
        <p>
          <b>Author: </b>
          {{ article.author.email }}
        </p>
        <p>
          <b>Created At: </b>
          {{ new Date(article.createdAt).toLocaleString() }}
        </p>
      </RouterLink>
    </div>
  </LayoutSection>

  <LayoutSection title="Users">
    <div class="flex flex-col gap-4">
      <div v-for="user in users" :key="user.id" class="box">
        <p>
          <b>Email: </b>
          {{ user.email }}
        </p>
        <p>
          <b>Role: </b>
          {{ user.role }}
        </p>
      </div>
    </div>
  </LayoutSection>
</template>
