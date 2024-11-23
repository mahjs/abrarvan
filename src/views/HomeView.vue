<template>
  <section class="w-100">
    <h1 class="py-3 px-4">All Posts</h1>

    <!-- Desktop Table View -->
    <div class="table-responsive d-none d-lg-block">
      <table class="table">
        <thead>
          <tr class="bg-light">
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Tags</th>
            <th>Excerpt</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="border-bottom border-light article-row"
            v-for="(item, index) in paginatedArticles"
            :key="index"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ item.title.substring(0, 12) }}...</td>
            <td>{{ item.author.username }}</td>
            <td>
              <span>{{ item.tagList.join(', ') }}</span>
            </td>
            <td>{{ item.description.substring(0, 30) }}...</td>
            <td class="d-flex justify-content-between">
              {{ formatDate(item.createdAt) }}
              <ArticleActions
                :item="item"
                @edit="handleEditArticle"
                @delete="deletingArticleSlug = $event"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile/Tablet Card View -->
    <div class="d-lg-none">
      <div v-for="(item, index) in paginatedArticles" :key="index" class="article-card">
        <div class="card mb-3">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <h5 class="card-title mb-0">{{ item.title }}</h5>
              <ArticleActions
                :item="item"
                @edit="handleEditArticle"
                @delete="deletingArticleSlug = $event"
              />
            </div>
            <h6 class="card-subtitle mb-2 text-muted">By {{ item.author.username }}</h6>
            <p class="card-text">{{ item.description.substring(0, 100) }}...</p>
            <div class="mt-2">
              <span class="text-muted small">Created: {{ formatDate(item.createdAt) }}</span>
            </div>
            <div class="mt-2">
              <span
                v-for="(tag, tagIndex) in item.tagList"
                :key="tagIndex"
                class="badge bg-light text-dark me-1"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <nav aria-label="Page navigation" class="mt-4">
      <ul class="pagination justify-content-center flex-wrap">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="changePage(currentPage - 1)">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </button>
        </li>
        <li
          v-for="page in totalPages"
          :key="page"
          class="page-item"
          :class="{ active: currentPage === page }"
        >
          <button class="page-link" @click="changePage(page)">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="changePage(currentPage + 1)">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </button>
        </li>
      </ul>
    </nav>
  </section>

  <!-- Delete Modal -->
  <div
    class="modal fade"
    id="exampleModalCenter"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Delete Article</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">Are you sure to delete Article?</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
          <button @click="deleteArticleHandler" type="button" class="btn btn-danger">Yes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { deleteArticle, getAllArticles } from '@/services/api/articles'
import { type Article } from '@/services/api/interfaces'
import { computed, onMounted, ref, type ComputedRef } from 'vue'
import { useToast } from 'vue-toastification'
import $ from 'jquery'
import { useRouter } from 'vue-router'
import ArticleActions from '@/components/ArticleActions.vue'

const toast = useToast()
const router = useRouter()

const articles = ref<Article[]>([])
const currentPage = ref(1)
const totalPages = ref(0)
const deletingArticleSlug = ref<string | null>(null)

onMounted(async () => {
  const { articles: allArticles, articlesCount } = await getAllArticles()
  articles.value = allArticles
  totalPages.value = Math.ceil(articlesCount / 10)
})

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const paginatedArticles: ComputedRef<Article[]> = computed(() => {
  const start = (currentPage.value - 1) * 10
  const end = start + 10
  return articles.value.slice(start, end)
})

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const deleteArticleHandler = async () => {
  if (!deletingArticleSlug.value) return
  try {
    await deleteArticle(deletingArticleSlug.value)
  } catch (error: any) {
    toast.error(error?.message)
  } finally {
    // @ts-ignore
    $('#exampleModalCenter').modal('hide')
  }
}

const handleEditArticle = (slug: string) => {
  router.push({
    path: '/new-article',
    query: { slug },
  })
}
</script>

<style scoped>
.article-card {
  transition: transform 0.2s;
}

.article-card:hover {
  transform: translateY(-2px);
}

.card {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.pagination {
  gap: 0.25rem;
}

@media (max-width: 768px) {
  .pagination .page-link {
    padding: 0.375rem 0.75rem;
  }
}

.dropdown-toggle::after {
  display: none;
}

.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
