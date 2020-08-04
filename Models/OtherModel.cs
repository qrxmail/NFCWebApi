using System;
using System.Collections.Generic;

namespace NFCWebApi.Models
{
    /// <summary>
    /// 前端列表数据的通用参数
    /// </summary>
    public class TableData
    {
        public int Total { get; set; }
        public bool Success { get; set; }
        public int PageSize { get; set; }
        public int Current { get; set; }
    }

    /// <summary>
    /// 用来返回设备的列表数据
    /// </summary>
    public class TableDataDevice : TableData
    {
        public List<DeviceView> Data { get; set; }
    }

    public class DeviceView : Device
    {
        public string InspectName { get; set; }
    }

    

    /// <summary>
    /// 用来返回巡检点的列表数据
    /// </summary>
    public class TableDataInspect : TableData
    {
        public List<Inspect> Data { get; set; }
    }

    /// <summary>
    /// 用来返回巡检线路的列表数据
    /// </summary>
    public class TableDataInspectLine : TableData
    {
        public List<InspectLine> Data { get; set; }
    }

    public class InspectLineView : InspectLine
    {
        public string InspectItemName { get; set; }
    }

    /// <summary>
    /// 用来返回巡检线路的列表数据
    /// </summary>
    public class TableDataInspectCycles : TableData
    {
        public List<InspectCycles> Data { get; set; }
    }

    /// <summary>
    /// 用来返回巡检项目的列表数据
    /// </summary>
    public class TableDataInspectItems : TableData
    {
        public List<InspectItems> Data { get; set; }
    }
    
    /// <summary>
    /// 用来返回NFC卡的列表数据
    /// </summary>
    public class TableDataNFCCard : TableData
    {
        public List<NFCCardView> Data { get; set; }
    }

    /// <summary>
    /// 展示数据模型
    /// </summary>
    public class NFCCardView : NFCCard
    {
        /// <summary>
        /// 新增的展示数据
        /// </summary>
        public string DeviceName { get; set; }
    }

    /// <summary>
    /// 用来返回巡检任务列表数据
    /// </summary>
    public class TableDataInspectTask : TableData
    {
        public List<InspectTaskView> Data { get; set; }
    }

    public class InspectTaskView : InspectTask
    {
        public string InspectName { get; set; }
        public string DeviceName { get; set; }
        public string InspectItemName { get; set; }
        public string NfcCardNo { get; set; }
        public string Unit { get; set; }
        public string ItemRemark { get; set; }
    }


    /// <summary>
    /// 用来返回巡检数据列表数据
    /// </summary>
    public class TableDataInspectData : TableData
    {
        public List<InspectDataView> Data { get; set; }
    }

    public class InspectDataView : InspectData
    {
        public string InspectName { get; set; }
        public string DeviceName { get; set; }
        public string InspectItemName { get; set; }

        public string Unit { get; set; }
    }

    /// <summary>
    /// 用来接收删除参数
    /// </summary>
    public class DelObj
    {
        public List<Guid> gId { get; set; }
    }

    /// <summary>
    /// 返回结果对象
    /// </summary>
    public class ResultObj
    {
        public bool IsSuccess { get; set; }
        public string ErrMsg { get; set; }
    }
   
}
