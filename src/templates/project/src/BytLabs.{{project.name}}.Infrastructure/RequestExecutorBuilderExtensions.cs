using HotChocolate.Execution.Configuration;
using BytLabs.Api.Graphql;
using BytLabs.MicroserviceTemplate.Application;

namespace BytLabs.MicroserviceTemplate.Infrastructure
{
    public static class RequestExecutorBuilderExtensions
    {

        public static IRequestExecutorBuilder AddCommandTypes(this IRequestExecutorBuilder requestExecutorBuilder)
        {
            return requestExecutorBuilder
                .AddCommandType<CreateInvoiceCommand>();
        }
    }
}
