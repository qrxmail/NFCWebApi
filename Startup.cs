using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NFCWebApi.Models;
using System;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.Unicode;

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
            // ���ʱ����8Сʱ������
            services.AddControllers().AddJsonOptions(opt =>
            {
                opt.JsonSerializerOptions.Encoder = JavaScriptEncoder.Create(UnicodeRanges.All);
                opt.JsonSerializerOptions.Converters.Add(new JsonDateTimeConvert());

            }).SetCompatibilityVersion(CompatibilityVersion.Version_3_0);

            #region ����
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
            //CORS �м����������Ϊ�ڶ� UseRouting �� UseEndpoints�ĵ���֮��ִ�С� ���ò���ȷ�������м��ֹͣ�������С�
            app.UseCors(AllowSpecificOrigin);
            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });

            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseMvc();

            DefaultFilesOptions defaultFilesOptions = new DefaultFilesOptions();
            defaultFilesOptions.DefaultFileNames.Clear();
            defaultFilesOptions.DefaultFileNames.Add("index.html");
            app.UseDefaultFiles(defaultFilesOptions);

            StaticFileOptions staticFileOptions = new StaticFileOptions();
            staticFileOptions.FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(@"D:\webapi\NFCInspectServer\wwwroot");
            app.UseStaticFiles(staticFileOptions);//������̬�ļ�
        }

    }

    /// <summary>
    /// ��ǰ�˴�������ʱ��ת��Ϊ����ʱ�䣨���ʱ����8Сʱ�����⣩
    /// </summary>
    public class JsonDateTimeConvert : JsonConverter<DateTime>
    {
        public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            var paramString = reader.GetString();

            var localDateTime = Convert.ToDateTime(paramString);

            return localDateTime;
        }

        public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value.ToString("yyyy-MM-dd HH:mm:ss"));
        }
    }
}
