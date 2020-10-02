<template>
  <div>
    <Preloader v-if="loading"/>
    <div class="app-main-layout" v-else>
      <v-sidebar v-model="isOpen"/>
      <v-navbar @click="isOpen= !isOpen"/>
      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <router-view/>
        </div>
      </main>
      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/ui-kit/Sidebar.vue'
import Navbar from '@/components/ui-kit/Navbar.vue'
import messages from '@/utils/messages'

export default {
  name: 'MainLayout',
  data: () => ({
    isOpen: true,
    loading: true
  }),
  components: {
    'v-sidebar': Sidebar,
    'v-navbar': Navbar
  },
  async mounted () {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.loading = false
  },
  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    error (fbError) {
      console.log(fbError)
      this.$error(messages[fbError.code] || 'что-то пошло не так')
    }
  }
}
</script>
