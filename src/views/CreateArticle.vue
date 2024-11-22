<template>
  <div class="mw-100 container mt-4 mx-5">
    <h2>New Article</h2>
    <form @submit.prevent="submitArticle">
      <div class="row">
        <!-- Left Column: Form Inputs -->
        <div class="col-md-8">
          <!-- Title Field -->
          <div class="form-group">
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
          <div class="form-group">
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
          <div class="form-group">
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

          <!-- Submit Button -->
          <button
            type="submit"
            class="btn btn-primary mt-4"
            :disabled="loading || !form.title || !form.body"
          >
            <span v-if="loading" class="spinner-border spinner-border-sm mr-2"></span>
            Submit
          </button>
        </div>

        <!-- Right Column: Tags Logic -->
        <div class="col-md-4">
          <label for="newTag">Tags</label>
          <!-- New Tag Input -->
          <div class="d-flex mb-3">
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

          <!-- Tags List -->
          <div class="border rounded p-2" style="max-height: 300px; overflow-y: auto">
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
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { createNewArticle, getArticleBySlug } from '@/services/api/articles'
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
const fetchTags = async () => {
  try {
    const { tags: allTags } = await getAllTags()
    tags.value = allTags
  } catch (error) {
    console.error('Error fetching tags:', error)
  }
}

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
    await createNewArticle(form.value)

    router.push('/')
    toast.success('Well Done! Article created successfully')
  } catch (error: any) {
    toast.error(createMessageFromError(error))
  } finally {
    loading.value = false
  }
}

// Fetch tags on component mount
const route = useRoute()
onMounted(async () => {
  fetchTags()

  const slug = route.query.slug as string
  if (slug) {
    const { article } = await getArticleBySlug(slug)
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
