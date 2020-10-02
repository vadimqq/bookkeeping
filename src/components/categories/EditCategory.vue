<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>
      <form @submit.prevent="onSubmit">
        <div class="input-field" >
          <select ref="select" v-model="current">
            <option v-for="item in categories" :key="item.id" :value="item.id">{{item.title}}</option>
          </select>
          <label>Выберите категорию</label>
        </div>
        <div class="input-field">
          <input id="name" type="text" v-model="title" :class="{invalid: $v.title.$dirty && !$v.title.required}">
          <label for="name">Название</label>
          <span class="helper-text invalid" v-if="$v.title.$dirty && !$v.title.required">Введите название категории</span>
        </div>
        <div class="input-field">
          <input id="limit" type="number" v-model="limit" :class="{invalid: $v.limit.$dirty && !$v.limit.required}">
          <label for="limit">Лимит</label>
          <span class="helper-text invalid" v-if="$v.limit.$dirty && !$v.limit.minValue">Минимальная величина {{$v.limit.$params.minValue.min}}</span>
        </div>
        <button class="btn waves-effect waves-light" type="submit">Обновить<i class="material-icons right">send</i></button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'

export default {
  name: 'EditCategories',
  data: () => ({
    select: null,
    title: '',
    limit: 100,
    current: null
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(100) }
  },
  watch: {
    current (categoryId) {
      const { title, limit } = this.categories.find(item => item.id === categoryId)
      this.title = title
      this.limit = limit
    }
  },
  created () {
    const { id, title, limit } = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  mounted () {
    this.select = window.M.FormSelect.init(this.$refs.select)
    window.M.updateTextFields()
  },
  destroyed () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  methods: {
    async onSubmit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
      }
      try {
        const categoryDate = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch('updateCategory', categoryDate)
        this.$message('Категория успешно обновлена')
        this.$emit('updated', categoryDate)
      } catch (e) {}
    }
  }
}
</script>
