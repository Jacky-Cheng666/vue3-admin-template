import Layout from '@/layout/index.vue';

/**
 * 常量路由
 * 不需要用户任何权限，所有用户可访问的路由
 */
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'HomeFilled',
          roles: ['admin', 'common'],
        },
      },
    ],
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    isHide: true,
    children: [
      {
        path: '/profile/index',
        name: 'Profile',
        component: () => import('@/views/user/profile/index.vue'),
        meta: { title: '个人中心', icon: 'User' },
      },
    ],
  },

  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'Login',
    isHide: true,
    meta: {
      title: '登录',
      icon: 'Platform',
    },
  },
  {
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    name: 'Screen',
    meta: {
      title: '数据大屏',
      icon: 'Platform',
    },
  },
  {
    path: '/401',
    name: 'NoPower',
    component: () => import('@/views/error/401.vue'),
    isHide: true,
    meta: {
      title: '页面无权限',
    },
  },
  {
    path: '/:path(.*)*',
    component: () => import('@/views/error/404.vue'),
    isHide: true,
    meta: {
      title: '页面找不到',
    },
  },
];

/**
 * 异步加载路由
 * 根据用户角色权限动态注入router中
 */
export const asyncRoutes = [
  {
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '权限管理',
      icon: 'Lock',
      roles: ['admin'],
    },
    redirect: '/acl/user',
    children: [
      {
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        name: 'AclUser',
        meta: {
          title: '用户管理',
          icon: 'User',
          roles: ['admin'],
        },
      },
      {
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        name: 'AclRole',
        meta: {
          title: '角色管理',
          icon: 'UserFilled',
          roles: ['admin'],
        },
      },
      {
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        name: 'AclPermission',
        meta: {
          title: '菜单管理',
          icon: 'Menu',
          roles: ['admin'],
        },
      },
    ],
  },

  {
    path: '/product',
    component: Layout,
    meta: {
      title: '商品管理',
      icon: 'Goods',
      roles: ['shop'],
    },
    redirect: '/product/brand',
    children: [
      {
        path: '/product/brand',
        component: () => import('@/views/product/brand/index.vue'),
        name: 'Brand',
        meta: {
          title: '品牌管理',
          icon: 'ShoppingCartFull',
          roles: ['shop'],
        },
      },
      {
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        name: 'Attr',
        meta: {
          title: '属性管理',
          icon: 'ChromeFilled',
          roles: ['shop'],
        },
      },
      {
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        name: 'Spu',
        meta: {
          title: 'SPU管理',
          icon: 'Calendar',
          roles: ['shop'],
        },
      },
      {
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        name: 'Sku',
        meta: {
          title: 'SKU管理',
          icon: 'Orange',
          roles: ['shop'],
        },
      },
    ],
  },
];
