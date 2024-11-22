<script setup lang="ts">
import { deleteArticle, getAllArticles } from '@/services/api/articles'
import { type Article } from '@/services/api/interfaces'
import { computed, onMounted, ref, type ComputedRef } from 'vue'
import { useToast } from 'vue-toastification'
import $ from 'jquery'
import { useRouter } from 'vue-router'

const toast = useToast()
const router = useRouter()

const articles = ref<Article[]>([])
const currentPage = ref(1) // The current page
const totalPages = ref(0)

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

// Get the articles for the current page
const paginatedArticles: ComputedRef<Article[]> = computed(() => {
  const start = (currentPage.value - 1) * 10
  const end = start + 10
  return articles.value.slice(start, end)
})

// Change the current page
const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const deletingArticleSlug = ref<string | null>(null)
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
    query: {
      slug,
    },
  })
}
</script>
<script setup lang="ts"></script>

<template>
  <section class="w-100">
    <h1 class="py-3 px-5">All Posts</h1>

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

            <div :key="index" class="dropdown z-3 d-flex align-items-center">
              <button
                class="btn btn-primary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                ...
              </button>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                <button
                  type="button"
                  @click="() => handleEditArticle(item.slug)"
                  class="dropdown-item"
                >
                  Edit
                </button>
                <button
                  type="button"
                  @click="() => (deletingArticleSlug = item.slug)"
                  data-toggle="modal"
                  class="dropdown-item"
                  data-target="#exampleModalCenter"
                >
                  Delete
                </button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
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

<style scoped></style>
