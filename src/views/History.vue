<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>
    <div class="history-chart">
      <canvas></canvas>
    </div>
    <Preloader v-if="loading"/>
    <p class="center" v-else-if="!records.length">Записей пока что нет.</p>
    <section v-else>
      <Table :records="records"/>
    </section>
  </div>
</template>

<script>
import Table from '@/components/history/Table'

export default {
  name: 'history',
  components: {
    Table
  },
  data: () => ({
    loading: true,
    records: [],
    categories: []
  }),
  async mounted () {
    const records = await this.$store.dispatch('fetchRecord')
    this.categories = await this.$store.dispatch('fetchCategories')
    this.records = records.map(record => {
      return {
        ...record,
        categoryName: this.categories.find(category => category.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'доход' : 'расход'
      }
    })
    this.loading = false
  }
}
</script>
