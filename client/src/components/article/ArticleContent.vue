<script setup lang="ts">
import ru from 'javascript-time-ago/locale/ru'
import TimeAgo from 'javascript-time-ago'
import type { ArticleData } from '@/services/article/types';

type Props = {
  article: ArticleData
}

TimeAgo.addLocale(ru)

const timeAgo = new TimeAgo('ru-RU')

defineProps<Props>()
</script>

<template>
  <div class="flex gap-2 items-center">
    <span>{{ article.author.email }}</span>
    <span class="text-gray-500 text-sm">{{ timeAgo.format(new Date(article.createdAt)) }}</span>
  </div>
  <b class="text-2xl">
    {{ article.title }}
  </b>
  <p>
    {{ article.text }}
  </p>
</template>
