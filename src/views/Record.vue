<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>
    <Preloader v-if="loading"/>
    <p class="center" v-else-if="!categories.length">Записей пока что нет.<router-link to="/сategories">Добавьте новую категорию</router-link></p>
    <CreateRecord :categories="categories" v-else/>
  </div>
</template>

<script>
import CreateRecord from '@/components/record/CreateRecord'

export default {
  name: 'Record',
  components: {
    CreateRecord
  },
  data: () => ({
    loading: true,
    categories: []
  }),
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  }
}
</script>
