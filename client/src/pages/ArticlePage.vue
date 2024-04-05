<script setup lang="ts">
import type { ArticleData } from '@/services/article/types'
import { onMounted, provide, ref } from 'vue'
import { useRoute } from 'vue-router'
import ArticleService from '@/services/article'
import ArticleContent from '@/components/article/ArticleContent.vue'
import ArticleComments from '@/components/article/comment/ArticleComments.vue'

const route = useRoute()

const article = ref<ArticleData>()

async function getArticle() {
  article.value = await ArticleService.getArticleById(Number(route.params.id))
}

provide('getArticle', getArticle)

onMounted(getArticle)
</script>

<template>
  <template v-if="article">
    <div class="flex flex-col gap-4">
      <div class="box">
        <ArticleContent :article />
      </div>

      <div>
        <ArticleComments v-if="article.comments.length" :comments="article.comments" />
      </div>
    </div>
  </template>
</template>
