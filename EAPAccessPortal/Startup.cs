using EAPAccess.BAL;
using EAPAccess.BAL.Interfaces;
using EAPAccess.Common.Classes;
using EAPAccess.Common.Interface;
using EAPAccess.DAL;
using EAPAccess.DAL.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Serialization;
using System;

namespace EAPAccessPortal
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IConfiguration>(Configuration);
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IUserRepository, UserRepository>();

            //services.AddTransient<IClientOrganisationService, ClientOrganisationService>();
            //services.AddTransient<IClientOrganisationRepository, ClientOrganisationRepository>();

            //services.AddTransient<IContentAreaService, ContentAreaService>();
            //services.AddTransient<IContentAreaRepository, ContentAreaRepository>();

            //services.AddTransient<IContentTopicService, ContentTopicService>();
            //services.AddTransient<IContentTopicRepository, ContentTopicRepository>();

            //services.AddTransient<IContentModuleService, ContentModuleService>();
            //services.AddTransient<IContentModuleRepository, ContentModuleRepository>();

            //services.AddTransient<IContentModuleVedioService, ContentModuleVedioService>();
            //services.AddTransient<IContentModuleVedioRepository, ContentModuleVedioRepository>();

            //services.AddTransient<IFAQService, FAQService>();
            //services.AddTransient<IFAQRepository, FAQRepository>();

            //services.AddTransient<IQuestionService, QuestionService>();
            //services.AddTransient<IQuestionRepository, QuestionRepository>();

            //services.AddTransient<ICMSPageService, CMSPageService>();
            //services.AddTransient<ICMSPageRepository, CMSPageRepository>();

            //services.AddTransient<IRoleService, RoleService>();
            //services.AddTransient<IRoleRepository, RoleRepository>();

            services.AddTransient<ICommonService, CommonService>();

            //////////Moblie Dependencies/////////
            //services.AddTransient<IMobileUserService, MobileUserService>();
            //services.AddTransient<IMobileUserRepository, MobileUserRepository>();

            //services.AddTransient<IMobileHomeService, MobileHomeService>();
            //services.AddTransient<IMobileHomeRepository, MobileHomeRepository>();

            services.AddTransient<IEmail, Email>();
            services.AddTransient<ISendSmsService, SendSmsBL>();

            //services.AddTransient<IMobileAreaService, MobileAreaService>();
            //services.AddTransient<IMobileAeraRepository, MobileAeraRepository>();

            //services.AddTransient<IMobileQuestionsService, MobileQuestionsService>();
            //services.AddTransient<IMobileQuestionsRepository, MobileQuestionsRepository>();

            //services.AddTransient<IDashBoardService, DashBoardService>();
            //services.AddTransient<IDashBoardRepository, DashBoardRepository>();
            services.AddTransient<IAceService, AceService>();
            services.AddTransient<IAceRepository, AceRepository>();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
            .AddJsonOptions(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            string[] origins = new string[] { "*" }; app.UseCors(b => b.AllowAnyMethod().AllowAnyHeader().WithOrigins(origins));

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });
            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";
                spa.Options.StartupTimeout = new TimeSpan(0, 0, 120);
                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
