using System;
using System.ComponentModel.DataAnnotations;

namespace NFCWebApi.Models
{

    /// <summary>
    /// 巡检数据
    /// </summary>
    public class InspectData
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
        /// 巡检结果值
        /// </summary>
        public string ResultValue { get; set; }

        /// <summary>
        /// 是否跳检
        /// </summary>
        public string IsJumpInspect { get; set; }

        /// <summary>
        /// 跳检原因
        /// </summary>
        public string JumpInspectReason { get; set; }

        /// <summary>
        /// 巡检时间
        /// </summary>
        public DateTime InspectTime { get; set; }

        /// <summary>
        /// 巡检人
        /// </summary>
        public string InspectUser { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        public string Remark { get; set; }

    }
}
