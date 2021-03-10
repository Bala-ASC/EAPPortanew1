using EAPAccess.Common.Classes;
using Microsoft.AspNetCore.Builder;

namespace EAPAccess.Common.Extensions
{
    public static class ExceptionMiddlewareExtensions
    {
        public static void ConfigureCustomExceptionMiddleware(this IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionMiddleware>();
        }
    }
}
