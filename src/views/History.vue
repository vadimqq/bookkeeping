<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>
    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>
    <Preloader v-if="loading"/>
    <p class="center" v-else-if="!records.length">Записей пока что нет.</p>
    <section v-else>
      <HistoryTable :records="items"/>
      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="PageChengeClick"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"/>
    </section>
  </div>
</template>

<script>
import HistoryTable from '@/components/history/HistoryTable'
import PaginationMixin from '@/mixins/pagination.mixin'
import { Pie } from 'vue-chartjs'

export default {
  name: 'history',
  extends: Pie,
  mixins: [PaginationMixin],
  components: {
    HistoryTable
  },
  data: () => ({
    loading: true,
    records: [],
    categories: []
  }),
  async mounted () {
    this.records = await this.$store.dispatch('fetchRecord')
    this.categories = await this.$store.dispatch('fetchCategories')
    this.setup()
    this.loading = false
  },
  methods: {
    async setup () {
      this.setupPagination(this.records = this.records.map(record => {
        return {
          ...record,
          categoryName: this.categories.find(category => category.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'доход' : 'расход'
        }
      }))
      this.renderChart({
        labels: this.categories.map(item => item.title),
        datasets: [{
          label: 'Расходы по категориям',
          data: this.categories.map(item => {
            return this.records.reduce((total, record) => {
              if (record.categoryId === item.id && record.type === 'outcome') {
                total += +record.amount
              }
              return total
            }, 0)
          }),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      })
    }
  }
}
</script>
