<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Preloader v-if="loading"/>
      <div class="row" v-else>
        <CreateCategory @created="addNewCategory" class="mr30"/>
        <EditCategory v-if="categories.length" :categories="categories" @updated="updateCategory" :key="categories.length + updateCount"/>
        <p class="center" v-else>Добавть первую категорию ¯\_(ツ)_/¯</p>
      </div>
    </section>
  </div>
</template>

<script>
import CreateCategory from '@/components/categories/CreateCategory'
import EditCategory from '@/components/categories/EditCategory'

export default {
  name: 'Categories',
  components: {
    CreateCategory,
    EditCategory
  },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  methods: {
    addNewCategory (category) {
      this.categories.push(category)
    },
    updateCategory (category) {
      const idx = this.categories.findIndex(item => item.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++
    }
  }
}
</script>
