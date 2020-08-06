import { getDevice, getInspectLine, getInspectCycles } from '@/services/device';
import { getDeviceInspectItems } from '@/services/device';
import { getInspectItems } from '@/services/device';
import { getInspect } from '@/services/device';
import { getUser } from '@/services/device';
import { getInspectItemTree} from '@/services/device';

const DeviceModel = {
    namespace: 'device',
    state: {
        deviceData: [],
        deviceInspectItemsData: [],
        inspectItemsData: [],
        inspectData: [],
        userData: [],
        inspectItemTreeData:[],
        inspectLineData: [],
        inspectCyclesData: [],
    },

    effects: {
        *fetchDeviceData(_, { call, put }) {
            const response = yield call(getDevice);
            yield put({
                type: 'saveReducerDeviceData',
                payload: response,
            });
        },

        *fetchDeviceInspectItemsData({ payload }, { call, put }) {
            const response = yield call(getDeviceInspectItems, payload);
            yield put({
                type: 'saveReducerDeviceInspectItems',
                payload: response,
            });
        },

        *fetchInspectItemsData(_, { call, put }) {
            const response = yield call(getInspectItems);
            yield put({
                type: 'saveReducerInspectItems',
                payload: response,
            });
        },

        *fetchInspectData(_, { call, put }) {
            const response = yield call(getInspect);
            yield put({
                type: 'saveReducerInspectData',
                payload: response,
            });
        },
        *fetchUserData(_, { call, put }) {
            const response = yield call(getUser);
            yield put({
                type: 'saveReducerUserData',
                payload: response,
            });
        },
        *fetchInspectItemTreeData(_, { call, put }) {
            const response = yield call(getInspectItemTree);
            yield put({
                type: 'saveReducerInspectItemTreeData',
                payload: response,
            });
        },
        *fetchInspectLineData(_, { call, put }) {
            const response = yield call(getInspectLine);
            yield put({
                type: 'saveReducerInspectLineData',
                payload: response,
            });
        },
        *fetchInspectCyclesData(_, { call, put }) {
            const response = yield call(getInspectCycles);
            yield put({
                type: 'saveReducerInspectCyclesData',
                payload: response,
            });
        },
    },

    reducers: {
        saveReducerDeviceData(state, action) {
            return {
                ...state,
                deviceData: action.payload || []
            };
        },
        saveReducerDeviceInspectItems(state, action) {
            return {
                ...state,
                deviceInspectItemsData: action.payload || [],
            };
        },
        saveReducerInspectItems(state, action) {
            return {
                ...state,
                inspectItemsData: action.payload || {}
            };
        },
        saveReducerInspectData(state, action) {
            return {
                ...state,
                inspectData: action.payload || {}
            };
        },
        saveReducerUserData(state, action) {
            return {
                ...state,
                userData: action.payload || {}
            };
        },
        saveReducerInspectItemTreeData(state, action) {
            return {
                ...state,
                inspectItemTreeData: action.payload || {}
            };
        },
        saveReducerInspectLineData(state, action) {
            return {
                ...state,
                inspectLineData: action.payload || {}
            };
        },
        saveReducerInspectCyclesData(state, action) {
            return {
                ...state,
                inspectCyclesData: action.payload || {}
            };
        },
    },
};
export default DeviceModel;
