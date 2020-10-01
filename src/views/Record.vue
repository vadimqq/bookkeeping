<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>
    <Preloader v-if="loading"/>
    <p class="center" v-else-if="!categories.length">Категорий пока что нет.<router-link to="/сategories">Добавьте новую категорию</router-link></p>
    <form class="form" v-else>
      <div class="input-field" >
        <select ref="select" v-model="category">
          <option v-for="item in categories" :key="item.id" :value="item.id">{{item.title}}</option>
        </select>
        <label>Выберите категорию</label>
      </div>
      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="income" v-model="type"/>
          <span>Доход</span>
        </label>
      </p>
      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome" v-model="type"/>
          <span>Расход</span>
        </label>
      </p>
      <div class="input-field">
        <input id="amount" type="number" v-model.number="amount"/>
        <label for="amount">Сумма</label>
        <span class="helper-text invalid">amount пароль</span>
      </div>
      <div class="input-field">
        <input id="description" type="text" v-model="description">
        <label for="description">Описание</label>
        <span class="helper-text invalid">description пароль</span>
      </div>
      <button class="btn waves-effect waves-light" type="submit"> Создать <i class="material-icons right">send</i></button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'Record',
  data: () => ({
    loading: true,
    select: null,
    categories: [],
    category: null,
    type: 'outcome',
    amount: 1,
    description: ''
  }),
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
    if (this.categories.length) {
      this.category = this.categories[0].id
    }
    setTimeout(() => {
      this.select = window.M.FormSelect.init(this.$refs.select)
    }, 0)
  },
  destroyed () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>
