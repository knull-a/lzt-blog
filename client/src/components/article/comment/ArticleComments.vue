<script setup lang="ts">
import ArticleCommentsItem from './ArticleCommentsItem.vue'
import ArticleCommentsItemAdd from './ArticleCommentsItemAdd.vue';
import { useUserStore } from '@/store/userStore';
import type { ArticleData } from '@/services/article/types';

type Props = {
  article: ArticleData
}

defineProps<Props>()

const userStore = useUserStore()
</script>

<template>
  <div class="box">
    <h2 class="text-xl font-bold mb-4">Comments</h2>
    <div class="flex flex-col gap-4">
      <template v-if="article.comments.length">
        <ArticleCommentsItem :comment v-for="comment in article.comments" :key="comment.id" />
      </template>
      <ArticleCommentsItemAdd v-if="userStore.isAuthenticated" />
    </div>
  </div>
</template>
