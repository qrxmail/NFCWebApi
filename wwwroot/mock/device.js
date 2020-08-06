// eslint-disable-next-line import/no-extraneous-dependencies
import { parse } from 'url';

// mock tableListDataSource
const genList = (current, pageSize) => {
  const tableListDataSource = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push({
      gId: index,
      site: '站点',
      region: '区域',
      deviceNo: `设备编号 ${index}`,
      deviceName: `设备编号 ${index}`,
      inspectNo: '巡检点编号',
      deviceType: '设备类别',
      longitude: '经度',
      latitude: '纬度',
      baiduLongitude: '百度经度',
      baiduLatitude: '百度纬度',
      remark: '这是备注',
      lastUpdateTime: new Date(),
      lastUpdateUser: '最后修改人',
    });
  }

  tableListDataSource.reverse();
  return tableListDataSource;
};

let tableListDataSource = genList(1, 100);

function getDevice(req, res, u) {
  let realUrl = u;

  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query;
  let dataSource = [...tableListDataSource].slice((current - 1) * pageSize, current * pageSize);
  const sorter = JSON.parse(params.sorter);

  if (sorter) {
    dataSource = dataSource.sort((prev, next) => {
      let sortNumber = 0;
      Object.keys(sorter).forEach(key => {
        if (sorter[key] === 'descend') {
          if (prev[key] - next[key] > 0) {
            sortNumber += -1;
          } else {
            sortNumber += 1;
          }

          return;
        }

        if (prev[key] - next[key] > 0) {
          sortNumber += 1;
        } else {
          sortNumber += -1;
        }
      });
      return sortNumber;
    });
  }

  if (params.filter) {
    const filter = JSON.parse(params.filter);

    if (Object.keys(filter).length > 0) {
      dataSource = dataSource.filter(item =>
        Object.keys(filter).some(key => {
          if (!filter[key]) {
            return true;
          }

          if (filter[key].includes(`${item[key]}`)) {
            return true;
          }

          return false;
        }),
      );
    }
  }

  if (params.deviceName) {
    dataSource = dataSource.filter(data => data.deviceName.includes(params.deviceName || ''));
  }

  const result = {
    data: dataSource,
    total: tableListDataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.currentPage}`, 10) || 1,
  };
  return res.json(result);
}

function postDevice(req, res, u, b) {
  let realUrl = u;

  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, gId, site, region, deviceNo, deviceName, inspectNo, deviceType, longitude, latitude, baiduLongitude, baiduLatitude, remark } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => gId.indexOf(item.gId) === -1);
      break;

    case 'post':
      (() => {
        const newDevice = {
          gId: tableListDataSource.length,
          site,
          region,
          deviceNo,
          deviceName,
          inspectNo,
          deviceType,
          longitude,
          latitude,
          baiduLongitude,
          baiduLatitude,
          remark,
          lastUpdateTime: new Date(),
          lastUpdateUser: '最后修改人',
          createTime: new Date(),
          createUser: '创建人',
        };
        tableListDataSource.unshift(newDevice);
        return res.json(newDevice);
      })();

      return;

    case 'update':
      (() => {
        let newDevice = {};
        tableListDataSource = tableListDataSource.map(item => {
          if (item.gId === gId) {
            newDevice = { ...item, site, region, deviceNo, deviceName, inspectNo, deviceType, longitude, latitude, baiduLongitude, baiduLatitude, remark };
            return { ...item, site, region, deviceNo, deviceName, inspectNo, deviceType, longitude, latitude, baiduLongitude, baiduLatitude, remark };
          }

          return item;
        });
        return res.json(newDevice);
      })();

      return;

    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };
  res.json(result);
}

export default {
  'GET /api/device': getDevice,
  'POST /api/device': postDevice,
};
