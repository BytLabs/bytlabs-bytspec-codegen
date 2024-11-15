using BytLabs.Api.Graphql;
using Microsoft.AspNetCore.WebSockets;
using BytLabs.Api;
using BytLabs.MicroserviceTemplate.Infrastructure;

var builder = WebApplication.CreateBuilder(args);
var webAppBuilder = ApiServiceBuilder.CreateBuilder(builder)
        .WithHttpContextAccessor()
        .WithMultiTenantContext()
        .WithAuthentication()
        .WithLogging()
        .WithMetrics()
        .WithTracing()
        .WithHealthChecks()
        .WithServiceConfiguration(services =>
        {
            services
                .AddRouting()                    
                .AddWebSockets(op => op.KeepAliveInterval = TimeSpan.FromSeconds(30));

            services
                .AddMemoryCache()
                .AddBytLabsGraphQLServer()
                .AddCommandTypes();

            services.AddInfrastructure(builder.Configuration);
        });

WebApplication app = webAppBuilder.BuildWebApp(app =>
{
    app.UseRouting();
    app.UseWebSockets();
    app.MapGraphQL();
});

app.Run();
