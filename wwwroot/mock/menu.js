export default {
    '/api/system/menu': {
        menuData: [
            {
                path: '/base',
                name: '基础设置',
                //icon: 'smile',
                routes: [
                    {
                        path: '/base/inspect',
                        name: '巡检点管理',
                        //icon: 'smile',
                        component: './Inspect',
                        authority: ['admin', 'user'],
                    },
                    {
                        path: '/base/inspectItems',
                        name: '巡检项目管理',
                        //icon: 'smile',
                        component: './InspectItems',
                        authority: ['admin', 'user'],
                    },
                    {
                        path: '/base/device',
                        name: '设备管理',
                        //icon: 'smile',
                        component: './Device',
                        authority: ['admin', 'user'],
                    },
                    {
                        path: '/base/nfc',
                        name: 'NFC卡管理',
                        //icon: 'smile',
                        component: './NFCCard',
                        authority: ['admin', 'user'],
                    },
                ],
            },
            {
                path: '/task',
                name: '巡检任务',
                //icon: 'crown',
                routes: [
                    {
                        path: '/task/inspectTask',
                        name: '任务管理',
                        //icon: 'smile',
                        component: './inspectTask',
                        authority: ['admin', 'user'],
                    },
                ],
            },
            {
                path: '/stat',
                name: '查询统计',
                //icon: 'crown',
                routes: [
                    {
                        path: '/stat/inspectData',
                        name: '巡检结果查询',
                        //icon: 'smile',
                        component: './inspectData',
                        authority: ['admin', 'user'],
                    },
                ],
            },


        ],
    }
}
