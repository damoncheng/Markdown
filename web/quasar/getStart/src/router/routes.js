
/*
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  }
]
*/

const routes = [
  {
    path: '/',
    redirect: '/product_list',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      {
        path: 'product_list',
        name: 'product_list',
        component: () => import('layouts/ProductLayout.vue')
      },
      {
        path: 'product/:product',
        name: 'module_preview',
        component: () => import('layouts/ModulePreviewLayout.vue'),
      },
      {
        path: 'product/:product/',
        name: 'module',
        component: () => import('layouts/ModuleLayout.vue'),

        children: [
          {
            path: 'apply',
            name: 'module_apply',
            component: () => import('layouts/ApplyLayout.vue')
          },
          {
            path: 'config',
            name: 'module_administrator',
            component: () => import('layouts/AdministratorLayout.vue')
          }
        ]
      },
      
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
