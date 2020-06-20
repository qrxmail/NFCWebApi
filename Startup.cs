using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NFCWebApi.Models;

namespace NFCWebApi
{
    public class Startup
    {
        private readonly string AllowSpecificOrigin = "AllowSpecificOrigin";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
       

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc(options => { options.EnableEndpointRouting = false; });
            services.AddDbContext<NFCContext>(option => option.UseNpgsql(Configuration.GetConnectionString("PostgreSql")));
            services.AddControllers();

            #region 跨域
            services.AddCors(options =>
            {
                options.AddPolicy(AllowSpecificOrigin,
                    builder =>
                    {
                        builder.AllowAnyMethod()
                            .AllowAnyOrigin()
                            .AllowAnyHeader();
                    });
            });
            #endregion

        }
        public void Configure(IApplicationBuilder app)
        {
            app.UseRouting();
            //CORS 中间件必须配置为在对 UseRouting 和 UseEndpoints的调用之间执行。 配置不正确将导致中间件停止正常运行。
            app.UseCors(AllowSpecificOrigin);
            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });

            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseMvc();
        }

    }
}
