using System;
using System.ComponentModel.DataAnnotations;

namespace NFCWebApi.Models
{
    /// <summary>
    /// 巡检周期
    /// </summary>
    public class InspectCycles
    {
        /// <summary>
        /// 主键
        /// </summary>
        [Key]
        public Guid GId { get; set; }

        /// <summary>
        /// 周期名称
        /// </summary>
        public string CycleName { get; set; }

        /// <summary>
        /// 周期类型
        /// </summary>
        public string CycleType { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        public string Remark { get; set; }
    }
}
