<script setup lang="ts">
import type { ArticleData } from '@/services/article/types'
import ArticleService from '@/services/article'
import { onMounted, ref } from 'vue'

import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev
} from '@/components/ui/pagination'

import { Button } from '@/components/ui/button'
import ArticleContent from '@/components/article/ArticleContent.vue'

const articles = ref<ArticleData[]>()

onMounted(async () => {
  articles.value = await ArticleService.getArticles()
})
</script>

<template>
  <main>
    <div v-if="articles?.length" class="flex flex-col gap-4">
      <RouterLink
        class="border p-4 rounded-md"
        :to="`/articles/${article.id}`"
        v-for="article in articles"
        :key="article.id"
      >
        <ArticleContent :article />
      </RouterLink>
    </div>

    <div v-else>
      No articles. Page is empty.
    </div>

    <Pagination
      class="mt-4 m-auto justify-center flex"
      v-if="articles && articles.length >= 10"
      v-slot="{ page }"
      :total="100"
      :sibling-count="1"
      show-edges
      :default-page="2"
    >
      <PaginationList v-slot="{ items }" class="flex items-center gap-1">
        <PaginationFirst />
        <PaginationPrev />

        <template v-for="(item, index) in items">
          <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
            <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis v-else :key="item.type" :index="index" />
        </template>

        <PaginationNext />
        <PaginationLast />
      </PaginationList>
    </Pagination>
  </main>
</template>
