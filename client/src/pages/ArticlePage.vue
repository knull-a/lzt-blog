<script setup lang="ts">
import * as yup from 'yup'
import type { ArticleData, ArticleDataDto } from '@/services/article/types'
import { onMounted, provide, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ArticleService from '@/services/article'
import ArticleContent from '@/components/article/ArticleContent.vue'
import ArticleComments from '@/components/article/comment/ArticleComments.vue'
import Button from '@/components/ui/button/Button.vue'
import { toast } from 'vue-sonner'
import { useUserStore } from '@/store/userStore'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import Input from '@/components/ui/input/Input.vue'
import Label from '@/components/ui/label/Label.vue'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'vee-validate'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const article = ref<ArticleData>()
const isLoading = ref(false)
const closeButton = ref<HTMLDivElement>()

const initialValues = reactive({
  title: article.value?.title,
  text: article.value?.title
})

const { handleSubmit } = useForm<Partial<ArticleDataDto>>({
  initialValues,
  validationSchema: {
    title: yup.string().required(),
    text: yup.string().required()
  }
})

async function getArticle() {
  article.value = await ArticleService.getArticleById(Number(route.params.id))
}

async function deleteArticle() {
  try {
    if (article.value) {
      isLoading.value = true
      await ArticleService.deleteArticle(article.value?.id)
      router.replace('/')
      toast('Successfully deleted!')
    } else {
      console.error('No article!')
    }
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const onSubmit = handleSubmit(async (values) => {
  await ArticleService.updateArticle(Number(article.value?.id), values)
  closeButton.value?.click()
  await getArticle()
})

provide('getArticle', getArticle)

onMounted(getArticle)
</script>

<template>
  <template v-if="article">
    <div class="flex flex-col gap-4">
      <div class="box">
        <ArticleContent :article />
        <div class="mt-4 pt-4 flex gap-4 border-t" v-if="userStore.role === 'ADMIN'">
          <Dialog>
            <DialogTrigger as-child>
              <Button variant="outline"> Edit </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Article</DialogTitle>
                <DialogDescription>
                  Fill the form below. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <form @submit="onSubmit" class="grid gap-4 py-4">
                <div class="flex flex-col gap-2 items-start">
                  <Label for="name" class="text-right"> Title </Label>
                  <Input :default-value="article.title" id="name" name="title" class="col-span-3" />
                </div>
                <div class="flex flex-col gap-2 items-start">
                  <Label for="username" class="text-right"> Text </Label>
                  <Textarea :default-value="article.text" id="username" name="text" class="col-span-3" />
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
          <Button variant="destructive" @click="deleteArticle"> Delete </Button>
        </div>
      </div>

      <div>
        <ArticleComments :article />
      </div>
    </div>
  </template>
</template>
