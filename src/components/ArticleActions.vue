<!-- ArticleActions.vue -->
<template>
  <div class="dropdown z-3">
    <button
      class="btn btn-primary dropdown-toggle"
      type="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      ...
    </button>
    <div class="dropdown-menu dropdown-menu-right">
      <button type="button" @click="$emit('edit', item.slug)" class="dropdown-item">Edit</button>
      <button
        type="button"
        @click="$emit('delete', item.slug)"
        data-target="#exampleModalCenter"
        data-toggle="modal"
        class="dropdown-item"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Article } from '@/services/api/interfaces'

defineProps<{
  item: Article
}>()

defineEmits<{
  edit: [slug: string]
  delete: [slug: string]
}>()
</script>
