<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>
    <Preloader v-if="loading"/>
    <p class="center" v-else-if="!categories.length">Записей пока что нет.<router-link to="/сategories">Добавьте новую категорию</router-link></p>
    <div class="row" v-else>
      <div class="col s6">
        <h4>Расход</h4>
        <CreateRecord :categories="categoriesOutcome" type="outcome"/>
      </div>
      <div class="col s6">
        <h4>Доход</h4>
        <CreateRecord :categories="categoriesIncome" type="income"/>
      </div>
    </div>
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
    this.categoriesOutcome = this.categories.filter(category => category.type === 'outcome')
    this.categoriesIncome = this.categories.filter(category => category.type === 'income')
    this.loading = false
  }
}
</script>
