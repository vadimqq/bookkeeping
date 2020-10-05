<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>
    <form class="form" @submit="onSubmit">
      <div class="input-field">
        <input id="name" type="text" v-model="name" :class="{invalid: $v.name.$dirty && !$v.name.required}">
        <label for="name">Имя</label>
        <span class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.required">Поле не должно быть пустым</span>
      </div>
      <button class="btn waves-effect waves-light" type="submit">Обновить<i class="material-icons right">send</i></button>
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'Profile',
  data: () => ({
    name: ''
  }),
  validations: {
    name: { required }
  },
  methods: {
    async onSubmit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
      }
      try {
        const infoData = {
          name: this.name
        }
        await this.$store.dispatch('updateName', infoData)
        this.$message('Имя успешно обновлено')
        this.$emit('updated', infoData)
      } catch (e) {}
    }
  }
}
</script>
