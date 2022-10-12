import Vue from 'vue'
import VueRouter from 'vue-router'
import BookShelfView from '../views/BookShelfView.vue'
import BookCityView from '../views/BookCityView.vue'
import RankView from '../views/RankView.vue'
import UpDateView from '../views/UpDateView.vue'
import AllBooksView from '../views/AllBooksView.vue'
import SearchView from '../views/SearchView.vue'
import SearchResultView from '../views/SearchResultView.vue'
import ComicDetailsView from '../views/ComicDetailsView.vue'
import ComicView from '../views/ComicView.vue'

Vue.use(VueRouter)
const routes = [
  {
    path: '/shelf',
    name: 'shelf',
    component: BookShelfView
  },
  {
    path: '/city',
    name: 'city',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: BookCityView
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/rank',
    name: 'rank',
    component: RankView
  },
  {
    path: '/update',
    name: 'update',
    component: UpDateView
  },
  {
    path: '/allbooks',
    name: 'allbooks',
    component: AllBooksView
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView
  },
  {
    path: '/searchResult',
    name: 'searchResult',
    component: SearchResultView
  },
  {
    path: '/comicdetails',
    name: 'comicdetails',
    component: ComicDetailsView
  },
  {
    path: '/comic',
    name: 'comic',
    component: ComicView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
