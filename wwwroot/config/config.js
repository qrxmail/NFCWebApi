// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/user/login',
            },
            {
              path: '/index.html',
              redirect: '/user/login',
            },
            {
              path: '/base',
              name: '基础设置',
              icon: 'smile',
              authority: ['admin', 'user'],
              routes: [
                {
                  path: '/base/inspect',
                  name: '巡检点管理',
                  icon: 'smile',
                  component: './Inspect',
                  authority: ['admin', 'user'],
                },
                {
                  path: '/base/inspectItems',
                  name: '巡检项目管理',
                  icon: 'smile',
                  component: './InspectItems',
                  authority: ['admin', 'user'],
                },
                {
                  path: '/base/device',
                  name: '设备管理',
                  icon: 'smile',
                  component: './Device',
                  authority: ['admin', 'user'],
                },
                {
                  path: '/base/nfc',
                  name: 'NFC卡管理',
                  icon: 'smile',
                  component: './NFCCard',
                  authority: ['admin', 'user'],
                },
                {
                  path: '/base/inspectline',
                  name: '巡检线路管理',
                  icon: 'smile',
                  component: './InspectLine',
                  authority: ['admin', 'user'],
                },
                // {
                //   path: '/base/inspectcylcles',
                //   name: '巡检周期管理',
                //   icon: 'smile',
                //   component: './InspectCycles',
                //   authority: ['admin', 'user'],
                // },
              ],
            },
            {
              path: '/task',
              name: '巡检任务',
              icon: 'crown',
              authority: ['admin', 'user'],
              routes: [
                {
                  path: '/task/inspectTask',
                  name: '任务管理',
                  icon: 'smile',
                  component: './inspectTask',
                  authority: ['admin', 'user'],
                },
                {
                  path: '/task/inspectTaskDetail',
                  name: '任务详情',
                  icon: 'smile',
                  component: './inspectTaskDetail',
                  authority: ['admin', 'user'],
                  hideInMenu: true,
                },
              ],
            },
            {
              path: '/stat',
              name: '查询统计',
              icon: 'crown',
              authority: ['admin', 'user'],
              routes: [
                {
                  path: '/stat/inspectData',
                  name: '巡检结果查询',
                  icon: 'smile',
                  component: './inspectData',
                  authority: ['admin', 'user'],
                },
              ],
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: false,

  // 使用mock接口
  //proxy: proxy[REACT_APP_ENV || 'dev'],

  // 使用后端接口（nmp start:可以同时访问mock和后台接口，但会优先调用mock接口。npm run start:no-mock 不用mock接口）
  proxy: {
    '/api/': { // 代理前缀
      //target: 'http://localhost:8090/', // 发布环境代理目标地址
      target: 'http://192.168.1.109:59645/',//调试环境
      changeOrigin: true, // 是否跨域访问
      pathRewrite: {
        '^': '',
      },
    },
  },

  manifest: {
    basePath: '/',
  },
});
