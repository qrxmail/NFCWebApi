using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using NFCWebApi.Models;

namespace NFCWebApi.Controllers
{
    // 设备相关接口
    [Route("nfc/device")]
    [ApiController]
    public class DeviceController : ControllerBase
    {
        private readonly NFCContext _context;

        public DeviceController(NFCContext context)
        {
            _context = context;

            //if (_context.Device.Count() == 0)
            //{
            //    _context.Device.Add(new Device { DeviceName = "测试设备" });
            //    _context.SaveChanges();
            //}
        }

        // 带多个查询条件的查询
        [Route("query")]
        [HttpGet]
        public ActionResult<List<Device>> Query(string queryStr)
        {
            var queryObj = new Device();
            // 将传入的json字符串转换为对象
            if (string.IsNullOrEmpty(queryStr) ==false)
            {
                queryObj = JsonConvert.DeserializeObject<Device>(queryStr);
            }

            //防止查询条件都不满足，先生成一个空的查询
            var where = _context.Device.Where(p => true);

            if (!String.IsNullOrEmpty(queryObj.DeviceName))
            {
                where = where.Where(p => p.DeviceName.Contains(queryObj.DeviceName));
            }

            if (!String.IsNullOrEmpty(queryObj.DeviceNo) == false)
            {
                where = where.Where(p => p.DeviceNo.Contains(queryObj.DeviceNo));
            }
           
            int pageSize = 1;
            int pageNum = 1;

            //统计总记录数
            int count = where.Count();
            //结果按照ID倒序排序
            where = where.OrderByDescending(p => p.GId);
            //跳过翻页的数量
            where = where.Skip(pageSize * (pageNum - 1));
            //获取结果，返回
            return where.Take(pageSize).ToList();
        }

        // 根据id查询
        [Route("getbyid")]
        [HttpGet(Name = "GetObj")]
        public ActionResult<Device> GetById(Guid gid)
        {
            var item = _context.Device.Find(gid);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }

        // 新增
        [Route("add")]
        [HttpPost]
        public IActionResult Add(Device obj)
        {
            _context.Device.Add(obj);
            _context.SaveChanges();

            return CreatedAtRoute("GetObj", new { gid = obj.GId }, obj);
        }

        // 修改
        [Route("update")]
        [HttpPost]
        public IActionResult Update(Device newObj)
        {
            var obj = _context.Device.Find(newObj.GId);
            if (obj == null)
            {
                return NotFound();
            }

            obj.DeviceName = newObj.DeviceName;
            obj.LastUpdateTime = DateTime.Now;

            _context.Device.Update(obj);
            _context.SaveChanges();
            return NoContent();
        }

        // 删除
        [Route("delete")]
        [HttpPost]
        public IActionResult Delete(Device device)
        {
            var obj = _context.Device.Find(device.GId);
            if (obj == null)
            {
                return NotFound();
            }

            _context.Device.Remove(obj);
            _context.SaveChanges();
            return NoContent();
        }


    }
}
