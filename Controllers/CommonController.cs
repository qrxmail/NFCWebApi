using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NFCWebApi.Models;

namespace NFCWebApi.Controllers
{
    // 通用接口
    [Route("api/common")]
    [ApiController]
    public class CommonController : ControllerBase
    {
        private readonly NFCContext _context;

        public CommonController(NFCContext context)
        {
            _context = context;
        }

        // 获取巡检点下拉框数据
        [Route("getinspect")]
        [HttpGet]
        public List<Inspect> GetInspect()
        {
            return _context.Inspect.ToList();
        }
        
        // 获取巡检人员下拉选框数据
        [Route("getinspectuser")]
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

        // 获取巡检项目下拉选框树的数据
        [Route("getinspectitemtree")]
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
    }
}
