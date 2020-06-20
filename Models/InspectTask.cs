using System;
using System.ComponentModel.DataAnnotations;

namespace NFCWebApi.Models
{
    /// <summary>
    /// 巡检任务
    /// </summary>
    public class InspectTask
    {
        /// <summary>
        /// 主键
        /// </summary>
        [Key]
        public Guid GId { get; set; }

        /// <summary>
        /// 巡检点编号
        /// </summary>
        public string InspectNo { get; set; }

        /// <summary>
        /// 设备编号
        /// </summary>
        public string DeviceNo { get; set; }

        /// <summary>
        /// 巡检项目名称
        /// </summary>
        public string InspectItemName { get; set; }

        /// <summary>
        /// 任务顺序号
        /// </summary>
        public string TaskOrderNo { get; set; }

        /// <summary>
        /// 任务名称
        /// </summary>
        public string TaskName { get; set; }

        /// <summary>
        /// 巡检时间
        /// </summary>
        public DateTime InspectTime { get; set; }

        /// <summary>
        /// 巡检人
        /// </summary>
        public string InspectUser { get; set; }

        /// <summary>
        /// 是否完成
        /// </summary>
        public string IsComplete { get; set; }

        /// <summary>
        /// 巡检完成时间
        /// </summary>
        public DateTime InspectCompleteTime { get; set; }

        /// <summary>
        /// 巡检完成人
        /// </summary>
        public string InspectCompleteUser { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        public string Remark { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CreateTime { get; set; }

        /// <summary>
        /// 创建人
        /// </summary>
        public string CreateUser { get; set; }

        /// <summary>
        /// 最后更新时间
        /// </summary>
        public DateTime LastUpdateTime { get; set; }

        /// <summary>
        /// 更新人
        /// </summary>
        public string LastUpdateUser { get; set; }


    }
}
