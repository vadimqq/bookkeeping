<template>
  <ul class="sidenav app-sidenav" :class="{'open': isOpen}">
    <router-link tag="li" active-class="active" :to="link.href" :exact="link.exact" v-for="link in links" :key="link.url" :class="link.class">
      <a href="#" class="waves-effect waves-orange pointer" @click="$emit('click')">{{link.title}}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean
    }
  },
  data: () => ({
    links: [
      {
        title: 'История',
        href: '/',
        exact: true
      },
      {
        title: 'Планирование',
        href: '/planning'
      },
      {
        title: 'Новая запись',
        href: '/record'
      },
      {
        title: 'Категории',
        href: '/categories'
      },
      {
        title: 'Профиль',
        href: '/profile',
        class: 'link--visible'
      }
    ]
  })
}
</script>
