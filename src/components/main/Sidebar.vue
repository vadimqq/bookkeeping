<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">
    <router-link tag="li" active-class="active" :to="link.href" :exact="link.exact" v-for="link in links" :key="link.url">
      <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: [
    'value'
  ],
  data: () => ({
    links: [
      {
        title: 'счет',
        href: '/',
        exact: true
      },
      {
        title: 'История',
        href: '/history'
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
      }
    ]
  })
}
</script>
