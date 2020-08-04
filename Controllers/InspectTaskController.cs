using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NFCWebApi.Models;

namespace NFCWebApi.Controllers
{
    // 巡检任务相关接口
    [Route("api/inspecttask")]
    [ApiController]
    public class InspectTaskController : ControllerBase
    {
        private readonly NFCContext _context;

        public InspectTaskController(NFCContext context)
        {
            _context = context;
        }

        // 带多个查询条件的查询
        [Route("query")]
        [HttpGet]
        public ActionResult<TableDataInspectTask> Query(string queryStr)
        {

            JObject jObject = new JObject();
            if (string.IsNullOrEmpty(queryStr) == false)
            {
                jObject = JsonConvert.DeserializeObject<JObject>(queryStr);
            }

            int current = jObject.Value<int>("current") == 0 ? 1 : jObject.Value<int>("current");
            int pageSize = jObject.Value<int>("pageSize") == 0 ? 20 : jObject.Value<int>("pageSize");
            string taskName = jObject.Value<string>("taskName");
            string taskNo = jObject.Value<string>("taskNo");
            string deviceName = jObject.Value<string>("deviceName");
            string inspectName = jObject.Value<string>("inspectName");
            string inspectItemName = jObject.Value<string>("inspectItemName");
            string inspectTime = jObject.Value<string>("inspectTime");
            string inspectUser = jObject.Value<string>("inspectUser");
            string isComplete = jObject.Value<string>("isComplete");

            //防止查询条件都不满足，先生成一个空的查询
            var where = (from task in _context.InspectTask
                        join inspect in _context.Inspect on task.InspectNo equals inspect.InspectNo
                        join device in _context.Device on task.DeviceNo equals device.DeviceNo
                        join nfcCard in _context.NFCCard on device.DeviceNo equals nfcCard.DeviceNo
                        join inspectItem in _context.InspectItems on task.InspectItemNo equals inspectItem.InspectItemNo
                        select new InspectTaskView
                        {
                            GId = task.GId,
                            InspectNo = task.InspectNo,
                            DeviceNo = task.DeviceNo,
                            InspectItemNo = task.InspectItemNo,
                            TaskOrderNo = task.TaskOrderNo,
                            TaskNo = task.TaskNo,
                            TaskName = task.TaskName,
                            InspectTime = task.InspectTime,
                            InspectUser = task.InspectUser,
                            IsComplete = task.IsComplete,
                            InspectCompleteTime = task.InspectCompleteTime,
                            InspectCompleteUser = task.InspectCompleteUser,
                            Remark = task.Remark,
                            CreateTime = task.CreateTime,
                            CreateUser = task.CreateUser,
                            LastUpdateTime = task.LastUpdateTime,
                            LastUpdateUser = task.LastUpdateUser,

                            InspectName = inspect.InspectName,
                            DeviceName = device.DeviceName,
                            InspectItemName = inspectItem.InspectItemName,
                            NfcCardNo = nfcCard.NFCCardNo,
                            Unit = inspectItem.Unit,
                            ItemRemark = inspectItem.Remark,

                        }).Where(p => true);

            if (string.IsNullOrEmpty(taskNo) == false)
            {
                where = where.Where(p => p.TaskNo.Contains(taskNo));
            }
            if (string.IsNullOrEmpty(taskName) == false)
            {
                where = where.Where(p => p.TaskName.Contains(taskName));
            }
            if (string.IsNullOrEmpty(inspectName) == false)
            {
                where = where.Where(p => p.InspectName.Contains(inspectName));
            }
            if (string.IsNullOrEmpty(deviceName) == false)
            {
                where = where.Where(p => p.DeviceName.Contains(deviceName));
            }
            if (string.IsNullOrEmpty(inspectItemName) == false)
            {
                where = where.Where(p => p.InspectItemName.Contains(inspectItemName));
            }
            if (string.IsNullOrEmpty(inspectTime) == false)
            {
                DateTime inpectDate = DateTime.Parse(DateTime.Parse(inspectTime).ToShortDateString());
                DateTime startTime = inpectDate.AddDays(0);
                DateTime endTime = inpectDate.AddDays(1);
                where = where.Where(p => p.InspectTime >= startTime && p.InspectTime <= endTime);
            }
            if (string.IsNullOrEmpty(inspectUser) == false)
            {
                where = where.Where(p => p.InspectUser.Contains(inspectUser));
            }
            if (string.IsNullOrEmpty(isComplete) == false)
            {
                where = where.Where(p => p.IsComplete.Equals(isComplete));
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
                // 按照巡检时间排序
                if (sorterKey.Equals("inspectTime") && sortRule.Equals("descend"))
                {
                    where = where.OrderByDescending(p => p.InspectTime);
                }
                else if (sorterKey.Equals("inspectTime") && sortRule.Equals("ascend"))
                {
                    where = where.OrderBy(p => p.InspectTime);
                }
                // 按照巡检完成时间排序
                if (sorterKey.Equals("inspectCompleteTime") && sortRule.Equals("descend"))
                {
                    where = where.OrderByDescending(p => p.InspectCompleteTime);
                }
                else if (sorterKey.Equals("inspectCompleteTime") && sortRule.Equals("ascend"))
                {
                    where = where.OrderBy(p => p.InspectCompleteTime);
                }
            }
            else
            {
                //默认结果按照任务编号、任务顺序号正序排序
                where = where.OrderBy(p => p.TaskNo).ThenBy(p => p.TaskOrderNo);
            }
           
            //跳过翻页的数量
            where = where.Skip(pageSize * (current - 1));
            //获取结果
            List<InspectTaskView> dataList = where.Take(pageSize).ToList();

            TableDataInspectTask resultObj = new TableDataInspectTask();
            resultObj.Data = dataList;
            resultObj.Current = current;
            resultObj.Success = true;
            resultObj.PageSize = pageSize;
            resultObj.Total = total;

            return resultObj;
        }

        // 手机端获取任务数据
        [Route("gettasklist")]
        [HttpGet]
        public List<InspectTaskView> GetTaskList(string queryStr)
        {

            JObject jObject = new JObject();
            if (string.IsNullOrEmpty(queryStr) == false)
            {
                jObject = JsonConvert.DeserializeObject<JObject>(queryStr);
            }
         
            string taskName = jObject.Value<string>("taskName");
            string taskNo = jObject.Value<string>("taskNo");
            string deviceName = jObject.Value<string>("deviceName");
            string inspectName = jObject.Value<string>("inspectName");
            string inspectItemName = jObject.Value<string>("inspectItemName");
            string inspectTime = jObject.Value<string>("inspectTime");
            string inspectUser = jObject.Value<string>("inspectUser");

            //防止查询条件都不满足，先生成一个空的查询
            var where = (from task in _context.InspectTask
                         join inspect in _context.Inspect on task.InspectNo equals inspect.InspectNo
                         join device in _context.Device on task.DeviceNo equals device.DeviceNo
                         join nfcCard in _context.NFCCard on device.DeviceNo equals nfcCard.DeviceNo
                         join inspectItem in _context.InspectItems on task.InspectItemNo equals inspectItem.InspectItemNo
                         select new InspectTaskView
                         {
                             GId = task.GId,
                             InspectNo = task.InspectNo,
                             DeviceNo = task.DeviceNo,
                             InspectItemNo = task.InspectItemNo,
                             TaskOrderNo = task.TaskOrderNo,
                             TaskNo = task.TaskNo,
                             TaskName = task.TaskName,
                             InspectTime = task.InspectTime,
                             InspectUser = task.InspectUser,
                             IsComplete = task.IsComplete,
                             InspectCompleteTime = task.InspectCompleteTime,
                             InspectCompleteUser = task.InspectCompleteUser,
                             Remark = task.Remark,
                             CreateTime = task.CreateTime,
                             CreateUser = task.CreateUser,
                             LastUpdateTime = task.LastUpdateTime,
                             LastUpdateUser = task.LastUpdateUser,

                             InspectName = inspect.InspectName,
                             DeviceName = device.DeviceName,
                             InspectItemName = inspectItem.InspectItemName,
                             NfcCardNo = nfcCard.NFCCardNo,
                             Unit = inspectItem.Unit,
                             ItemRemark = inspectItem.Remark,

                         }).Where(p => p.IsComplete.Equals("0"));

            if (string.IsNullOrEmpty(taskNo) == false)
            {
                where = where.Where(p => p.TaskNo.Contains(taskNo));
            }
            if (string.IsNullOrEmpty(taskName) == false)
            {
                where = where.Where(p => p.TaskName.Contains(taskName));
            }
            if (string.IsNullOrEmpty(inspectName) == false)
            {
                where = where.Where(p => p.InspectName.Contains(inspectName));
            }
            if (string.IsNullOrEmpty(deviceName) == false)
            {
                where = where.Where(p => p.DeviceName.Contains(deviceName));
            }
            if (string.IsNullOrEmpty(inspectItemName) == false)
            {
                where = where.Where(p => p.InspectItemName.Contains(inspectItemName));
            }
            if (string.IsNullOrEmpty(inspectTime) == false)
            {
                DateTime inpectDate = DateTime.Parse(DateTime.Parse(inspectTime).ToShortDateString());
                DateTime startTime = inpectDate.AddDays(0);
                DateTime endTime = inpectDate.AddDays(1);
                where = where.Where(p => p.InspectTime >= startTime && p.InspectTime <= endTime);
            }
            if (string.IsNullOrEmpty(inspectUser) == false)
            {
                where = where.Where(p => p.InspectUser.Contains(inspectUser));
            }

            //默认结果按照任务编号、任务顺序号正序排序
            where = where.OrderBy(p => p.TaskNo).ThenBy(p => p.TaskOrderNo);
            //获取结果
            List<InspectTaskView> dataList = where.ToList();

            return dataList;
        }

        // 根据id查询
        [Route("getbyid")]
        [HttpGet(Name = "GetInspectTaskObj")]
        public ActionResult<InspectTask> GetById(Guid gid)
        {
            var item = _context.InspectTask.Find(gid);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }

        // 判断是否存在相同编号的巡检任务
        [Route("isexistsameno")]
        public bool IsExistSameNo(InspectTask obj)
        {
            var where = _context.InspectTask.Where(p => p.TaskNo == obj.TaskNo);
            if (obj.GId != null)
            {
                where = where.Where(p => p.GId != obj.GId);
            }
            List<InspectTask> list = where.ToList();
            if (list.Count > 0)
            {
                return true;
            }
            return false;
        }

        // 新增
        [Route("add")]
        [HttpPost]
        public ResultObj Add(InspectTask obj)
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

            _context.InspectTask.Add(obj);
            _context.SaveChanges();

            resultObj.IsSuccess = true;
            return resultObj;
        }


        // 新增批量巡检任务
        [Route("addbatchtask")]
        [HttpPost]
        public ResultObj AddBatchTask(InspectTask obj)
        {
            //// 先获取所有的巡检点(根据巡检点的顺序号生成)
            //List<Inspect> inspectList = _context.Inspect.OrderBy(p => p.InspectOrderNo).ToList();

            //// 巡检顺序编号
            //int taskOrderNo = 0;
            //// 遍历巡检点，获取巡检点下的设备
            //for (int i = 0; i < inspectList.Count; i++)
            //{
            //    Inspect inspectObj = inspectList[i];
            //    List<Device> deviceList = _context.Device.Where(p => p.InspectionNo.Equals(inspectObj.InspectNo)).OrderBy(p => p.DeviceNo).ToList();

            //    // 遍历设备，获取设备的巡检项目
            //    for (int j = 0; j < deviceList.Count; j++)
            //    {
            //        Device deviceObj = deviceList[j];
            //        List<DeviceInspectItem> deviceInspectItemList = _context.DeviceInspectItem.Where(p => p.DeviceNo.Equals(deviceObj.DeviceNo)).OrderBy(p => p.InspectItemNo).ToList();

            //        // 遍历设备的巡检项目，新增任务
            //        for (int k = 0; k < deviceInspectItemList.Count; k++)
            //        {
            //            taskOrderNo++;
            //            string inspectItemNo = deviceInspectItemList[k].InspectItemNo;
            //            InspectTask inspectTaskObj = new InspectTask();
            //            inspectTaskObj.InspectNo = inspectObj.InspectNo;
            //            inspectTaskObj.DeviceNo = deviceObj.DeviceNo;
            //            inspectTaskObj.InspectItemNo = inspectItemNo;
            //            inspectTaskObj.TaskOrderNo = taskOrderNo.ToString();
            //            inspectTaskObj.TaskName = obj.TaskName;
            //            inspectTaskObj.TaskNo = obj.TaskNo;
            //            inspectTaskObj.InspectTime = obj.InspectTime;
            //            inspectTaskObj.InspectUser = obj.InspectUser;
            //            inspectTaskObj.IsComplete = "0";
            //            inspectTaskObj.Remark = obj.Remark;
            //            inspectTaskObj.CreateUser = obj.CreateUser;
            //            inspectTaskObj.CreateTime = DateTime.Now;
            //            inspectTaskObj.LastUpdateUser = obj.LastUpdateUser;
            //            inspectTaskObj.LastUpdateTime = DateTime.Now;
            //            _context.InspectTask.Add(obj);
            //            _context.SaveChanges();
            //        }
            //    }
            //}

            ResultObj resultObj = new ResultObj();

            // 根据设备巡检项目表，先查询需要生成的任务数据
            var query = from deviceInspectItem in _context.DeviceInspectItem
                        join device in _context.Device on deviceInspectItem.DeviceNo equals device.DeviceNo
                        join nfcCard in _context.NFCCard on device.DeviceNo equals nfcCard.DeviceNo
                        join inspect in _context.Inspect on device.InspectNo equals inspect.InspectNo
                        orderby inspect.InspectOrderNo, device.DeviceNo, deviceInspectItem.InspectItemNo
                        select new InspectTask
                        {
                            InspectNo = device.InspectNo,
                            DeviceNo = device.DeviceNo,
                            InspectItemNo = deviceInspectItem.InspectItemNo
                        };

            //// 根据巡检点表，查询需要生成的任务数据
            //var query = from inspect in _context.Inspect
            //            join device in _context.Device on inspect.InspectNo equals device.InspectionNo
            //            join deviceInspectItem in _context.DeviceInspectItem on device.DeviceNo equals deviceInspectItem.DeviceNo
            //            join InspectItems in _context.InspectItems on deviceInspectItem.InspectItemNo equals InspectItems.InspectItemNo
            //            orderby inspect.InspectOrderNo, device.DeviceNo, InspectItems.InspectItemNo
            //            select new InspectTask
            //            {
            //                InspectNo = inspect.InspectNo,
            //                DeviceNo = device.DeviceNo,
            //                InspectItemNo = InspectItems.InspectItemNo
            //            };
            List<InspectTask> taskList = query.ToList();

            // 巡检顺序编号
            int taskOrderNo = 0;
            for (int i = 0;i< taskList.Count; i++)
            {
                
                taskOrderNo++;
                InspectTask inspectTaskObj = new InspectTask();
                inspectTaskObj.InspectNo = taskList[i].InspectNo;
                inspectTaskObj.DeviceNo = taskList[i].DeviceNo;
                inspectTaskObj.InspectItemNo = taskList[i].InspectItemNo;
                inspectTaskObj.TaskOrderNo = taskOrderNo;
                inspectTaskObj.TaskName = obj.TaskName;
                inspectTaskObj.TaskNo = string.Format("{0:yyyyMMddHHmmss}", DateTime.Now);
                inspectTaskObj.InspectTime = obj.InspectTime;
                inspectTaskObj.InspectUser = obj.InspectUser;
                inspectTaskObj.IsComplete = "0";
                inspectTaskObj.Remark = obj.Remark;
                inspectTaskObj.CreateUser = obj.CreateUser;
                inspectTaskObj.CreateTime = DateTime.Now;
                inspectTaskObj.LastUpdateUser = obj.LastUpdateUser;
                inspectTaskObj.LastUpdateTime = DateTime.Now;
                _context.InspectTask.Add(inspectTaskObj);
                _context.SaveChanges();
            }

            resultObj.IsSuccess = true;
            return resultObj;
        }

        // 新增巡检任务(选择巡检周期、巡检路线)
        [Route("addlinetask")]
        [HttpPost]
        public ResultObj AddLineTask(InspectTask obj)
        {
            ResultObj resultObj = new ResultObj();

            // 根据巡检周期，周期起始、结束时间，计算需要生成的任务条数

            // 根据巡检路线，计算出巡检任务的巡检项目

            // 根据设备巡检项目表，先查询需要生成的任务数据
            var query = from deviceInspectItem in _context.DeviceInspectItem
                        join device in _context.Device on deviceInspectItem.DeviceNo equals device.DeviceNo
                        join nfcCard in _context.NFCCard on device.DeviceNo equals nfcCard.DeviceNo
                        join inspect in _context.Inspect on device.InspectNo equals inspect.InspectNo
                        orderby inspect.InspectOrderNo, device.DeviceNo, deviceInspectItem.InspectItemNo
                        select new InspectTask
                        {
                            InspectNo = device.InspectNo,
                            DeviceNo = device.DeviceNo,
                            InspectItemNo = deviceInspectItem.InspectItemNo
                        };
            List<InspectTask> taskList = query.ToList();

            // 巡检顺序编号
            int taskOrderNo = 0;
            for (int i = 0; i < taskList.Count; i++)
            {

                taskOrderNo++;
                InspectTask inspectTaskObj = new InspectTask();
                inspectTaskObj.InspectNo = taskList[i].InspectNo;
                inspectTaskObj.DeviceNo = taskList[i].DeviceNo;
                inspectTaskObj.InspectItemNo = taskList[i].InspectItemNo;
                inspectTaskObj.TaskOrderNo = taskOrderNo;
                inspectTaskObj.TaskName = obj.TaskName;
                inspectTaskObj.TaskNo = string.Format("{0:yyyyMMddHHmmss}", DateTime.Now);
                inspectTaskObj.InspectTime = obj.InspectTime;
                inspectTaskObj.InspectUser = obj.InspectUser;
                inspectTaskObj.IsComplete = "0";
                inspectTaskObj.Remark = obj.Remark;
                inspectTaskObj.CreateUser = obj.CreateUser;
                inspectTaskObj.CreateTime = DateTime.Now;
                inspectTaskObj.LastUpdateUser = obj.LastUpdateUser;
                inspectTaskObj.LastUpdateTime = DateTime.Now;
                _context.InspectTask.Add(inspectTaskObj);
                _context.SaveChanges();
            }

            resultObj.IsSuccess = true;
            return resultObj;
        }

        // 修改
        [Route("update")]
        [HttpPost]
        public ResultObj Update(InspectTask newObj)
        {
            ResultObj resultObj = new ResultObj();

            var obj = _context.InspectTask.Find(newObj.GId);
            if (obj == null)
            {
                resultObj.IsSuccess = false;
                resultObj.ErrMsg = "修改对象不存在。";
                return resultObj;
            }

            //obj.TaskNo = newObj.TaskNo;
            obj.TaskName = newObj.TaskName;
            obj.TaskOrderNo = newObj.TaskOrderNo;
            obj.DeviceNo = newObj.DeviceNo;
            obj.InspectItemNo = newObj.InspectItemNo;
            obj.InspectNo = newObj.InspectNo;
            obj.InspectTime = newObj.InspectTime;
            obj.InspectUser = newObj.InspectUser;
            obj.Remark = newObj.Remark;

            obj.LastUpdateTime = DateTime.Now;
            obj.LastUpdateUser = newObj.LastUpdateUser;

            _context.InspectTask.Update(obj);
            _context.SaveChanges();

            resultObj.IsSuccess = true;
            return resultObj;
        }

        // 删除
        [Route("delete")]
        [HttpPost]
        public IActionResult Delete(DelObj delObj)
        {
            for (int i = 0; i < delObj.gId.Count(); i++)
            {
                var obj = _context.InspectTask.Find(delObj.gId[i]);
                if (obj == null)
                {
                    return NotFound();
                }

                _context.InspectTask.Remove(obj);
                _context.SaveChanges();
            }

            return NoContent();
        }
    }
}
