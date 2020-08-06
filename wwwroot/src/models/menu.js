import { getMenuData } from '@/services/menu';

const Model = {
  namespace: 'menu',
  state: {
    menuData: [],
  },
  effects: {
    *fetchMenuData(_, { call, put }) {
      const response = yield call(getMenuData);
      yield put({
        type: 'saveReducer',
        payload: response.menuData,
      });
    },
  },

  reducers: {
    saveReducer(state, { payload }) {
      return {
        ...state,
        menuData: payload || [],
      };
    },
  },
};
export default Model;