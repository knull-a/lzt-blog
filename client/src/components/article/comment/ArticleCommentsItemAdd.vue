<script setup lang="ts">
import * as yup from 'yup'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useForm } from 'vee-validate'
import CommentService from '@/services/comment'
import { useRoute } from 'vue-router'
import type { CommentDto } from '@/services/comment/types'
import { inject, ref } from 'vue'

const route = useRoute()

const articleId = Number(route.params.id)
const isLoading = ref(false)

const validationSchema = {
  text: yup.string().required()
}

const { handleSubmit } = useForm<CommentDto>({
  validationSchema
})

const getArticle = inject<() => Promise<void>>('getArticle')

const onSubmit = handleSubmit(async (values) => {
  try {
    isLoading.value = true
    await CommentService.createComment({
      ...values,
      articleId
    })
    if (getArticle !== undefined) await getArticle()
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="-mx-4 -mb-4 bg-gray-50 border-t">
    <div class="p-4">
      <p class="font-medium pb-2">Your comment</p>
      <form @submit="onSubmit" class="flex flex-col gap-4">
        <Textarea :disabled="isLoading" name="text" />
        <Button :disabled="isLoading" class="self-start"> Send </Button>
      </form>
    </div>
  </div>
</template>
