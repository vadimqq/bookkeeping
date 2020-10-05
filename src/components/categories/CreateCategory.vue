<template>
  <div class="col s12 m6">
    <div class="page-subtitle">
      <h4>Создать</h4>
    </div>
    <form @submit.prevent="onSubmit">
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
        <input id="name" type="text" v-model="title" :class="{invalid: $v.title.$dirty && !$v.title.required}">
        <label for="name">Название</label>
        <span class="helper-text invalid" v-if="$v.title.$dirty && !$v.title.required">Введите название категории</span>
      </div>
      <div class="input-field">
        <input id="limit" type="number" v-model="limit" :class="{invalid: $v.limit.$dirty && !$v.limit.required}">
        <label for="limit">Планируется потратить/заработать</label>
        <span class="helper-text invalid" v-if="$v.limit.$dirty && !$v.limit.minValue">Минимальная величина {{$v.limit.$params.minValue.min}}</span>
      </div>
      <button class="btn waves-effect waves-light" type="submit">Создать<i class="material-icons right">send</i></button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'

export default {
  name: 'CreateCategory',
  data: () => ({
    title: '',
    limit: 100,
    type: 'outcome'
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(100) }
  },
  mounted () {
    window.M.updateTextFields()
  },
  methods: {
    async onSubmit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
      }
      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit,
          type: this.type
        })
        this.title = ''
        this.limit = 100
        this.type = ''
        this.$v.$reset()
        this.$message('категория была создана')
        this.$emit('created', category)
      } catch (e) {}
    }
  }
}
</script>
