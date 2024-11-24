<template>
  <div class="container-fluid container-md mt-4 px-4">
    <h2>{{ isEditing ? 'Edit Article' : 'New Article' }}</h2>
    <form @submit.prevent="submitArticle">
      <!-- Main content wrapper -->
      <div class="row g-4">
        <!-- Left Column: Form Inputs -->
        <div class="col-12 col-lg-8 order-0 order-lg-0">
          <!-- Title Field -->
          <div class="form-group mb-3">
            <label for="title">Title</label>
            <input
              v-model="form.title"
              type="text"
              id="title"
              class="form-control"
              :class="{ 'is-invalid': !form.title }"
              placeholder="Title"
              required
            />
            <div v-if="!form.title" class="invalid-feedback">Required field</div>
          </div>

          <!-- Description Field -->
          <div class="form-group mb-3">
            <label for="description">Description</label>
            <input
              v-model="form.description"
              type="text"
              id="description"
              class="form-control"
              placeholder="Description"
            />
          </div>

          <!-- Body Field -->
          <div class="form-group mb-3">
            <label for="body">Body</label>
            <textarea
              v-model="form.body"
              id="body"
              class="form-control"
              rows="5"
              placeholder="Body"
              required
            ></textarea>
          </div>
        </div>

        <!-- Right Column: Tags Logic -->
        <div class="col-12 col-lg-4 order-0 order-lg-1">
          <label for="newTag">Tags</label>
          <!-- New Tag Input -->
          <div class="d-flex mb-3 gap-2">
            <input
              v-model="newTag"
              type="text"
              id="newTag"
              class="form-control"
              placeholder="New tag"
            />
            <button type="button" class="btn btn-primary ml-2" @click="addTag" :disabled="!newTag">
              Add
            </button>
          </div>

          <template v-if="loadingTags">
            <TagsSkeletonLoader :count="8" />
          </template>
          <template v-else>
            <div class="border rounded p-2 mb-4" style="max-height: 300px; overflow-y: auto">
              <div class="form-check" v-for="tag in tags" :key="tag">
                <input
                  type="checkbox"
                  class="form-check-input"
                  :id="`tag-${tag}`"
                  :value="tag"
                  v-model="form.tagList"
                />
                <label class="form-check-label" :for="`tag-${tag}`">{{ tag }}</label>
              </div>
            </div>
          </template>
        </div>

        <!-- Submit Button Container -->
        <div class="col-12 my-2 order-2">
          <button
            type="submit"
            class="btn btn-primary w-lg-auto"
            :disabled="loading || !form.title || !form.body"
          >
            <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
            Submit
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import TagsSkeletonLoader from '@/components/skeleton/TagsSkeletonLoader.vue'
import { useLoading } from '@/composable/useLoading'
import { createNewArticle, editArticle, getArticleBySlug } from '@/services/api/articles'
import { getAllTags } from '@/services/api/tags'
import createMessageFromError from '@/utils/createMessageFromError'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const toast = useToast()
const router = useRouter()

const form = ref({
  title: '',
  description: '',
  body: '',
  tagList: [] as string[],
})
const tags = ref<string[]>([])
const newTag = ref('')
const loading = ref(false)

// Fetch available tags
const { loading: loadingTags, withLoading } = useLoading()
const fetchTags = async () => {
  withLoading(async () => {
    try {
      const { tags: allTags } = await getAllTags()
      tags.value = allTags
    } catch (error) {
      console.error('Error fetching tags:', error)
    }
  })
}
// const fetchTags = async () => {
//   try {
//     const { tags: allTags } = await getAllTags()
//     tags.value = allTags
//   } catch (error) {
//     console.error('Error fetching tags:', error)
//   }
// }

// Add a new tag
const addTag = () => {
  if (newTag.value && !tags.value.includes(newTag.value)) {
    tags.value.push(newTag.value)
    form.value.tagList.push(newTag.value)
    newTag.value = ''
  }
}

// Submit the article
const submitArticle = async () => {
  loading.value = true

  try {
    if (isEditing.value && slug.value) await editArticle(slug.value, form.value)
    else await createNewArticle(form.value)

    router.push('/')
    toast.success(`Well Done! Article ${slug.value ? 'Edited' : 'created'} successfully`)
  } catch (error: any) {
    toast.error(createMessageFromError(error))
  } finally {
    loading.value = false
  }
}

// Fetch tags on component mount
const isEditing = ref(false)
const slug = ref<string | null>(null)
const route = useRoute()
onMounted(async () => {
  fetchTags()

  slug.value = route.query.slug as string
  if (slug.value) {
    isEditing.value = true
    const { article } = await getArticleBySlug(slug.value)
    form.value = {
      title: article.title,
      description: article.description,
      body: article.body,
      tagList: article.tagList,
    }
  }
})
</script>

<style>
.container {
  max-width: 900px;
}
</style>
