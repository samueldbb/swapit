const routes = [
  {
    path: '/',
    component: ()=>import('layouts/EmptyLayout.vue'),
    children: [
      { path: '/', name: 'root', beforeEnter: (to, from, next) => { next({name: 'MatchList', replace: true}); } },
      {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
          { path: '/Match', name: "Match", component: () => import('pages/Match.vue') },
          { path: '/ProfilePage', name: "ProfilePage", component: () => import('pages/ProfilePage')},
          { path: '/MatchList', name: "MatchList", component: () => import('pages/MatchList') },
          { path: '/Matches', name: 'Matches', component: () => import('pages/Matches')},
          { path: '/Messages', name: 'Messages', component: () => import('pages/Messages')},
          { path: '/ProductPage', name: 'ProductPage', component: () => import('pages/ProductPage')},
          { path: '/ProductCreation', name: 'ProductCreation', component: () => import('pages/ProductCreation')},
          { path: '/UserCreation', name: 'UserCreation', component: () => import('pages/UserCreation')},
          { path: '/LoginPage', name: 'LoginPage', component: () => import('pages/LoginPage')},
        ]
      }
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
