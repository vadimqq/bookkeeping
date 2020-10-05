<template>
  <form class="form" @submit.prevent="onSubmit">
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
      <input id="amount" type="number" v-model.number="amount" :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"/>
      <label for="amount">Сумма</label>
      <span class="helper-text invalid" v-if="$v.amount.$dirty && !$v.amount.minValue">Введите минимальную сумму</span>
    </div>
    <div class="input-field">
      <input id="description" type="text" v-model="description" :class="{invalid: $v.description.$dirty && !$v.description.required}">
      <label for="description">Описание</label>
      <span class="helper-text invalid" v-if="$v.description.$dirty && !$v.description.required">Введите описание</span>
    </div>
    <button class="btn waves-effect waves-light" type="submit"> Создать <i class="material-icons right">send</i></button>
  </form>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
  name: 'CreateRecord',
  data: () => ({
    select: null,
    categories: [],
    category: null,
    type: 'outcome',
    amount: 1,
    description: ''
  }),
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  validations: {
    amount: { minValue: minValue(1) },
    description: { required }
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord () {
      if (this.type === 'income') {
        return true
      }
      return this.info.bill >= this.amount
    }
  },
  methods: {
    async onSubmit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
      }
      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })
          const bill = this.type === 'income'
            ? this.info.bill + this.amount
            : this.info.bill - this.amount
          await this.$store.dispatch('updateInfo', { bill })
          this.$message('Запись успешно добавлена')
          this.$v.$reset()
          this.amount = 1
          this.description = ''
        } catch (e) {}
      } else {
        this.$message(`Не достаточтно средств на счете (${this.amount - this.info.bill})`)
      }
    }
  },
  mounted () {
    if (this.categories.length) {
      this.category = this.categories[0].id
    }
    setTimeout(() => {
      this.select = window.M.FormSelect.init(this.$refs.select)
      window.M.updateTextFields()
    }, 0)
  },
  destroyed () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>
