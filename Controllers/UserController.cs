using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace NFCWebApi.Controllers
{
    [Route("api")]
    [ApiController]
    public class UserController : ControllerBase
    {
        /// <summary>
        /// 获取当前登录用户
        /// </summary>
        /// <returns></returns>
        [Route("currentUser")]
        [HttpGet]
        public ActionResult<User> GetCurrentUser()
        {
            User currentUser = new User();
            currentUser.name = "admin";
            currentUser.avatar = "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png";
            currentUser.userid = "00000001";
            currentUser.email = "qrxmail@126.com";
            currentUser.title = "全栈";
            currentUser.group = "清铭宇自动化";

            return currentUser;
        }

        /// <summary>
        /// 登录功能
        /// </summary>
        /// <param name="loginUser"></param>
        /// <returns></returns>
        [Route("login/account")]
        [HttpPost]
        public ActionResult<User> Login(LoginUser loginUser)
        {
            User user = new User();
            user.status = "ok";
            user.type = "account";
            user.currentAuthority = "admin";
            return user;
        }

        /// <summary>
        /// 获取菜单
        /// </summary>
        /// <returns></returns>
        [Route("system/menu")]
        [HttpGet]
        public ActionResult<MenuData> GetMenu()
        {
            MenuItem item1 = new MenuItem();
            item1.authority = new string[] { "admin", "user" };
            item1.component = "./Device";
            item1.name = "设备管理";
            item1.path = "/base/device";
            List<MenuItem> routes = new List<MenuItem>();
            routes.Add(item1);

            MenuItem menuData = new MenuItem();
            menuData.name = "基础设置";
            menuData.path = "/base";
            menuData.routes = routes;

            List<MenuItem> menuDatas = new List<MenuItem>();
            menuDatas.Add(menuData);

            MenuData menus = new MenuData();
            menus.menuData = menuDatas;
            return menus;
        }
    }

    /// <summary>
    /// 菜单模型
    /// </summary>
    public class MenuData
    {
        public List<MenuItem> menuData { get; set; }
    }

    /// <summary>
    /// 菜单项
    /// </summary>
    public class MenuItem
    {
        public string path { get; set; }
        public string name { get; set; }
        public string component { get; set; }
        public string[] authority { get; set; }
        public List<MenuItem> routes { get; set; }
    }

    /// <summary>
    /// 登录账户模型
    /// </summary>
    public class LoginUser
    {
        public string password { get; set; }
        public string userName { get; set; }
        public string type { get; set; }
    }

    /// <summary>
    /// 用户信息
    /// </summary>
    public class User
    {
        public string name { get; set; }
        public string avatar { get; set; }
        public string userid { get; set; }
        public string email { get; set; }
        public string signature { get; set; }
        public string title { get; set; }
        public string group { get; set; }
        public string status { get; set; }
        public string type { get; set; }
        public string currentAuthority { get; set; }

    }
}
