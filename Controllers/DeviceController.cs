using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NFCWebApi.Models;

namespace NFCWebApi.Controllers
{
    // 设备相关接口
    [Route("api/device")]
    [ApiController]
    public class DeviceController : ControllerBase
    {
        private readonly NFCContext _context;

        public DeviceController(NFCContext context)
        {
            _context = context;
        }

        // 带多个查询条件的查询
        [Route("query")]
        [HttpGet]
        public ActionResult<TableDataDevice> Query(string queryStr)
        {

            //var queryObj = new Device();
            //// 将传入的json字符串转换为对象
            //if (string.IsNullOrEmpty(queryStr) == false)
            //{
            //    queryObj = JsonConvert.DeserializeObject<Device>(queryStr);
            //}

            JObject jObject = new JObject();
            if (string.IsNullOrEmpty(queryStr) == false)
            {
                jObject = JsonConvert.DeserializeObject<JObject>(queryStr);
            }

            int current = jObject.Value<int>("current") == 0 ? 1 : jObject.Value<int>("current");
            int pageSize = jObject.Value<int>("pageSize") == 0 ? 20 : jObject.Value<int>("pageSize");
            string deviceName = jObject.Value<string>("deviceName");
            string deviceNo = jObject.Value<string>("deviceNo");
            string inspectName = jObject.Value<string>("inspectName");

            //防止查询条件都不满足，先生成一个空的查询
            var where = (from device in _context.Device
                         join inspect in _context.Inspect on device.InspectNo equals inspect.InspectNo
                         select new DeviceView
                         {
                             GId = device.GId,
                             DeviceNo = device.DeviceNo,
                             Site = device.Site,
                             Region = device.Region,
                             InspectNo = device.InspectNo,
                             DeviceType = device.DeviceType,
                             DeviceName = device.DeviceName,
                             Longitude = device.Longitude,
                             Latitude = device.Latitude,
                             BaiduLongitude = device.BaiduLongitude,
                             BaiduLatitude = device.BaiduLatitude,
                             Remark = device.Remark,
                             CreateTime = device.CreateTime,
                             CreateUser = device.CreateUser,
                             LastUpdateTime = device.LastUpdateTime,
                             LastUpdateUser = device.LastUpdateUser,

                             InspectName = inspect.InspectName,
                         }).Where(p => true);

            if (string.IsNullOrEmpty(deviceName) == false)
            {
                where = where.Where(p => p.DeviceName.Contains(deviceName));
            }

            if (string.IsNullOrEmpty(deviceNo) == false)
            {
                where = where.Where(p => p.DeviceNo.Contains(deviceNo));
            }

            if (string.IsNullOrEmpty(inspectName) == false)
            {
                where = where.Where(p => p.InspectName.Contains(inspectName));
            }

            //统计总记录数
            int total = where.Count();

            // 解析排序规则
            string sorterKey = "";
            string sortRule = "";
            JObject sorterObj = jObject.Value<JObject>("sorter");
            IEnumerable<JProperty> properties = sorterObj.Properties();
            foreach (JProperty item in properties)
            {
                sorterKey = item.Name;
                sortRule = item.Value.ToString();
            }
            if (string.IsNullOrEmpty(sorterKey) == false && string.IsNullOrEmpty(sortRule) == false)
            {
                // 按照设备编号排序
                if (sorterKey.Equals("deviceNo") && sortRule.Equals("descend"))
                {
                    where = where.OrderByDescending(p => p.DeviceNo);
                }
                else if (sorterKey.Equals("deviceNo") && sortRule.Equals("ascend"))
                {
                    where = where.OrderBy(p => p.DeviceNo);
                }
                // 按照最后更新时间排序
                if (sorterKey.Equals("lastUpdateTime") && sortRule.Equals("descend"))
                {
                    where = where.OrderByDescending(p => p.LastUpdateTime);
                }
                else if (sorterKey.Equals("lastUpdateTime") && sortRule.Equals("ascend"))
                {
                    where = where.OrderBy(p => p.LastUpdateTime);
                }
            }
            else
            {
                //结果按照最后修改时间倒序排序
                where = where.OrderByDescending(p => p.LastUpdateTime);
            }
           
            //跳过翻页的数量
            where = where.Skip(pageSize * (current - 1));
            //获取结果
            List<DeviceView> dataList = where.Take(pageSize).ToList();

            TableDataDevice resultObj = new TableDataDevice();
            resultObj.Data = dataList;
            resultObj.Current = current;
            resultObj.Success = true;
            resultObj.PageSize = pageSize;
            resultObj.Total = total;

            return resultObj;
        }

        // 根据id查询
        [Route("getbyid")]
        [HttpGet(Name = "GetDeviceObj")]
        public ActionResult<Device> GetById(Guid gid)
        {
            var item = _context.Device.Find(gid);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }


        // 判断是否存在相同编号的设备
        [Route("isexistsameno")]
        public bool IsExistSameNo(Device obj)
        {
            var where = _context.Device.Where(p => p.DeviceNo == obj.DeviceNo);
            if (obj.GId != null)
            {
                where = where.Where(p => p.GId != obj.GId);
            }
            List<Device> list = where.ToList();
            if (list.Count > 0)
            {
                return true;
            }
            return false;
        }

        // 新增
        [Route("add")]
        [HttpPost]
        public ResultObj Add(Device obj)
        {
            ResultObj resultObj = new ResultObj();
            if (IsExistSameNo(obj))
            {
                resultObj.IsSuccess = false;
                resultObj.ErrMsg = "编号已存在。";
                return resultObj;
            }

            obj.CreateUser = obj.CreateUser;
            obj.CreateTime = DateTime.Now;
            obj.LastUpdateUser = obj.LastUpdateUser;
            obj.LastUpdateTime = DateTime.Now;

            _context.Device.Add(obj);
            _context.SaveChanges();

            resultObj.IsSuccess = true;
            return resultObj;
        }

        // 修改
        [Route("update")]
        [HttpPost]
        public ResultObj Update(Device newObj)
        {
            ResultObj resultObj = new ResultObj();

            var obj = _context.Device.Find(newObj.GId);
            if (obj == null)
            {
                resultObj.IsSuccess = false;
                resultObj.ErrMsg = "修改对象不存在。";
                return resultObj;
            }

            if (IsExistSameNo(newObj))
            {
                resultObj.IsSuccess = false;
                resultObj.ErrMsg = "编号已存在。";
                return resultObj;
            }

            obj.Site = newObj.Site;
            obj.Region = newObj.Region;
            obj.DeviceName = newObj.DeviceName;
            obj.DeviceNo = newObj.DeviceNo;
            obj.InspectNo = newObj.InspectNo;
            obj.DeviceType = newObj.DeviceType;
            obj.Longitude = newObj.Longitude;
            obj.Latitude = newObj.Latitude;
            obj.BaiduLatitude = newObj.BaiduLatitude;
            obj.BaiduLongitude = newObj.BaiduLongitude;
            obj.Remark = newObj.Remark;

            obj.LastUpdateTime = DateTime.Now;
            obj.LastUpdateUser = newObj.LastUpdateUser;

            _context.Device.Update(obj);
            _context.SaveChanges();

            resultObj.IsSuccess = true;
            return resultObj;
        }

        // 删除
        [Route("delete")]
        [HttpPost]
        public IActionResult Delete(DelObj delObj)
        {
            for (int i =0;i< delObj.gId.Count(); i++)
            {
                var obj = _context.Device.Find(delObj.gId[i]);
                if (obj == null)
                {
                    return NotFound();
                }

                _context.Device.Remove(obj);
                _context.SaveChanges();
            }
           
            return NoContent();
        }

        // 获取巡检点下拉框数据
        [Route("inspect")]
        [HttpGet]
        public List<Inspect> GetInspect()
        {
            return _context.Inspect.ToList();
        }
        
        [Route("inspectUser")]
        [HttpGet]
        public List<User> GetInspectUser()
        {
            List<User> userList = new List<User>();
            User user1 = new User();
            user1.userid = "00000001";
            user1.name = "admin";
            userList.Add(user1);

            return userList;
        }

        // 获取设备下拉框数据
        [Route("getdevice")]
        [HttpGet]
        public List<Device> GetDevice()
        {
            return _context.Device.ToList();
        }

        // 获取巡检项目下拉框数据
        [Route("getinspectitems")]
        [HttpGet]
        public List<InspectItems> GetInspectItems()
        {
            return _context.InspectItems.ToList();
        }

        // 获取巡检线路下拉框数据
        [Route("getinspectline")]
        [HttpGet]
        public List<InspectLine> GetInspectLine()
        {
            return _context.InspectLine.ToList();
        }

        // 获取巡检周期下拉框数据
        [Route("getinspectcycles")]
        [HttpGet]
        public List<InspectCycles> GetInspectCycles()
        {
            return _context.InspectCycles.ToList();
        }

        // 获取设备的巡检项目下拉框数据
        [Route("getdeviceinspectitems")]
        [HttpGet]
        public List<string> GetDeviceInspectItems(string queryStr)
        {
            List<DeviceInspectItem> resultList = new List<DeviceInspectItem>();
            JObject jObject = new JObject();
            if (string.IsNullOrEmpty(queryStr) == false)
            {
                jObject = JsonConvert.DeserializeObject<JObject>(queryStr);
            }
            string deviceNo = jObject.Value<string>("deviceNo");
            if (string.IsNullOrEmpty(deviceNo) == false)
            {
                resultList =  _context.DeviceInspectItem.Where(p => p.DeviceNo.Equals(deviceNo)).ToList();
            }

            List<string> itemsArr = new List<string>();
            for (int i = 0; i < resultList.Count; i++)
            {
                itemsArr.Add(resultList[i].InspectItemNo);
            }

            return itemsArr;
        }

        // 获取设备的巡检项目下拉框数据(初始值+下拉选框数据源)
        [Route("getdeviceinspectitemsddl")]
        [HttpGet]
        public DeviceInspectItemsDDLData GetDeviceInspectItemsDDLData(string queryStr)
        {
            DeviceInspectItemsDDLData data = new DeviceInspectItemsDDLData();
            data.InspectItems = GetInspectItems();
            data.DeviceInspectItemNos = GetDeviceInspectItems(queryStr);
            return data;
        }


        // 获取巡检项目下拉框数据
        [Route("inspectitemtree")]
        [HttpGet]
        public dynamic GetInspectItemtree()
        {
            // 先根据设备巡检项目表查出所有巡检项目
            var query = from deviceInspectItem in _context.DeviceInspectItem
                        join device in _context.Device on deviceInspectItem.DeviceNo equals device.DeviceNo
                        join nfcCard in _context.NFCCard on device.DeviceNo equals nfcCard.DeviceNo
                        join inspect in _context.Inspect on device.InspectNo equals inspect.InspectNo
                        join inspectItems in _context.InspectItems on deviceInspectItem.InspectItemNo equals inspectItems.InspectItemNo
                        orderby inspect.InspectOrderNo, device.DeviceNo, deviceInspectItem.InspectItemNo
                        select new InspectTaskView
                        {
                            InspectNo = device.InspectNo,
                            InspectName = inspect.InspectName,
                            DeviceNo = device.DeviceNo,
                            DeviceName = device.DeviceName,
                            InspectItemNo = inspectItems.InspectItemNo,
                            InspectItemName = inspectItems.InspectItemName,
                            GId = deviceInspectItem.GId,
                        };
            List<InspectTaskView> itemList = query.ToList();

            // 根据巡检点分组，再根据设备分组
            var queryGroup = from a in itemList.GroupBy(t => new { t.InspectNo, t.InspectName })
                             select new
                             {
                                 Title = a.Key.InspectName,
                                 Value = a.Key.InspectNo,
                                 Key = a.Key.InspectNo,
                                 //Checkable = false,
                                 //Selectable = false,
                                 Children = from b in itemList.Where(p => p.InspectNo.Equals(a.Key.InspectNo)).GroupBy(t => (t.DeviceNo, t.DeviceName))
                                            select new
                                            {
                                                Title = b.Key.DeviceName,
                                                Value = a.Key.InspectNo + "-" + b.Key.DeviceNo,
                                                Key = a.Key.InspectNo + "-" + b.Key.DeviceNo,
                                                //Checkable = false,
                                                //Selectable = false,
                                                Children = from c in itemList.Where(p => p.DeviceNo.Equals(b.Key.DeviceNo))
                                                           select new
                                                           {
                                                               Title = c.InspectItemName,
                                                               Value = c.GId,
                                                               Key = c.GId,
                                                               //Checkable = true,
                                                               //Selectable = true,
                                                           }
                                            }
                             };
            return queryGroup;
        }

        // 设置设备的巡检项目
        [Route("setdeviceinspectitems")]
        [HttpPost]
        public IActionResult SetDeviceInspectItems(DeviceInspectItemAddModel obj)
        {
            string deviceNo = obj.DeviceNo;
            if (string.IsNullOrEmpty(deviceNo) == false)
            {
                List<DeviceInspectItem> list = _context.DeviceInspectItem.Where(p => p.DeviceNo.Equals(deviceNo)).ToList();
                // 先删除原有的巡检项目
                _context.DeviceInspectItem.RemoveRange(list);
                _context.SaveChanges();

                // 再新增新的巡检项目
                for (int i = 0; i < obj.InspectItemNos.Length; i++)
                {
                    DeviceInspectItem item = new DeviceInspectItem();
                    item.DeviceNo = obj.DeviceNo;
                    item.InspectItemNo = obj.InspectItemNos[i];
                    item.CreateUser = obj.CreateUser;
                    item.CreateTime = DateTime.Now;
                    _context.DeviceInspectItem.Add(item);
                    _context.SaveChanges();
                }
            }

            return NoContent();
        }
        
    }
}
