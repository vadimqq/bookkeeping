<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{info.bill | currency('RUB')}}</h4>
    </div>
    <Preloader v-if="loading"/>
      <p class="center" v-else-if="!categoriesIncome.length && !categoriesOutcome.length">Категорий пока что нет.<router-link to="/categories"> Добавьте новую категорию</router-link></p>
    <section v-else>
      <h4>Доход</h4>
      <div v-for="category in categoriesIncome" :key="category.id">
        <p>
          <strong>{{category.title}}</strong>
          {{category.spend | currency}} из {{category.limit | currency}}
        </p>
        <div class="progress" v-tooltip="category.tooltip">
          <div class="determinate" :style="{width: category.progressPercent + '%'}" :class="[category.progressColor]"></div>
        </div>
      </div>
      <h4>Расход</h4>
      <div v-for="category in categoriesOutcome" :key="category.id">
        <p>
          <strong>{{category.title}}</strong>
          {{category.spend | currency}} из {{category.limit | currency}}
        </p>
        <div class="progress" v-tooltip="category.tooltip">
          <div class="determinate" :style="{width: category.progressPercent + '%'}" :class="[category.progressColor]"></div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import currencyFilter from '@/filters/currency.filter'

export default {
  name: 'planning',
  data: () => ({
    loading: true,
    categoriesOutcome: [],
    categoriesIncome: []
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted () {
    const records = await this.$store.dispatch('fetchRecord')
    const categories = await this.$store.dispatch('fetchCategories')
    this.categoriesOutcome = categories.filter(category => category.type === 'outcome').map(category => {
      const spend = records
        .filter(record => record.categoryId === category.id)
        .filter(record => record.type === 'outcome')
        .reduce((total, record) => {
          return total + record.amount
        }, 0)
      const percent = 100 * spend / category.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'
      const tooltipValue = category.limit - spend
      const tooltip = `${tooltipValue < 0 ? 'превышение на' : 'осталось'} ${currencyFilter(Math.abs(tooltipValue))}`
      return {
        ...category,
        progressPercent,
        progressColor,
        spend,
        tooltip
      }
    })
    this.categoriesIncome = categories.filter(category => category.type === 'income').map(category => {
      const spend = records
        .filter(record => record.categoryId === category.id)
        .filter(record => record.type === 'income')
        .reduce((total, record) => {
          return total + record.amount
        }, 0)
      const percent = 100 * spend / category.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 40 ? 'red' : percent < 80 ? 'yellow' : 'green'
      const tooltipValue = category.limit - spend
      const tooltip = `${tooltipValue < 0 ? 'превышение на' : 'осталось'} ${currencyFilter(Math.abs(tooltipValue))}`
      return {
        ...category,
        progressPercent,
        progressColor,
        spend,
        tooltip
      }
    })
    this.loading = false
  }
}
</script>
