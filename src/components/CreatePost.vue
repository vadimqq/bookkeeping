<template>
  <div class="col s12 m6">
    <div class="page-subtitle">
      <h4>Создать</h4>
    </div>
    <form @submit.prevent="onSubmit">
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
      <button class="btn waves-effect waves-light" type="submit">Создать<i class="material-icons right">send</i></button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'

export default {
  name: 'CreatePost',
  data: () => ({
    title: '',
    limit: 100
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(100) }
  },
  mounted () {
    window.M.updateTextFields()
  },
  methods: {
    onSubmit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
      }
    }
  }
}
</script>
