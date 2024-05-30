import router from './router';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { Local } from '@/utils/storage';
import pinia from './stores';
import useUserStore from '@/stores/modules/user';
import useRoutesList from '@/stores/modules/routesList';

const userStore = useUserStore(pinia);
const routesList = useRoutesList();
const whiteList = ['/login'];
nprogress.configure({ showSpinner: false });

router.beforeEach(async (to, from, next) => {
  nprogress.start();
  const token = Local.get('token');
  const username = userStore.username;
  if (token) {
    if (to.path === '/login') {
      next('/');
    } else {
      if (!username) {
        try {
          const { roles } = await userStore.userInfo();
          const accessedRoutes = await routesList.generateRoutes(roles);
          accessedRoutes.forEach((r) => router.addRoute(r));
          next({ ...to, replace: true });
        } catch (__) {
          next({ path: '/login' });
        }
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next({ path: '/login' });
    }
  }
});

router.afterEach(() => {
  nprogress.done();
});
