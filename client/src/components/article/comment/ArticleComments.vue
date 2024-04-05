<script setup lang="ts">
import type { CommentData } from '@/services/comment/types'
import ArticleCommentsItem from './ArticleCommentsItem.vue'
import ArticleCommentsItemAdd from './ArticleCommentsItemAdd.vue';

type Props = {
  comments: CommentData[]
}

defineProps<Props>()
</script>

<template>
  <div class="box">
    <h2 class="text-xl font-bold mb-4">Comments</h2>
    <div class="flex flex-col gap-4">
      <ArticleCommentsItem :comment v-for="comment in comments" :key="comment.id" />
      <ArticleCommentsItemAdd />
    </div>
  </div>
</template>
