<script setup lang="ts">
import type { CommentData } from '@/services/comment/types'
import TimeAgo from 'javascript-time-ago'
import ru from 'javascript-time-ago/locale/ru'

type Props = {
  comment: CommentData
}

defineProps<Props>()

TimeAgo.addLocale(ru)

const timeAgo = new TimeAgo('ru-RU')
</script>

<template>
  <div>
    <div class="flex gap-2 items-center">
      <b>userId:{{ comment.authorId }}</b>
      <span class="text-gray-500 text-sm">{{ timeAgo.format(new Date(comment.createdAt)) }}</span>
    </div>
    <p class="pr-12">{{ comment.text }}</p>
  </div>
</template>
