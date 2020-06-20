using System;
using System.ComponentModel.DataAnnotations;

namespace NFCWebApi.Models
{

    /// <summary>
    /// 巡检项目
    /// </summary>
    public class InspectItems
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
        /// 巡检项目名称
        /// </summary>
        public string InspectItemName { get; set; }

        /// <summary>
        /// 值类型
        /// </summary>
        public string ValueType { get; set; }

        /// <summary>
        /// 数量单位
        /// </summary>
        public string Unit { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        public string Remark { get; set; }


    }
}
