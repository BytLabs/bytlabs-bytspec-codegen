
using BytLabs.Application.CQS.Commands;
using BytLabs.Application.DataAccess;
using BytLabs.Application.UserContext;
using BytLabs.{{project.name}}.Domain.Entities;

public class {{command.name}}Command : ICommand{{#if command.returnType}}<{{command.returnType}}>{{/if}}
{
{{#each command.properties}}
    {{>propTemplate this}}
{{/each}}


{{#each command.subTypes}}
    public class {{this.class.name}}
    {
        {{#each this.class.properties}}
            {{>propTemplate this}}
        {{/each}}
    }
{{/each}}

}

public class {{command.name}}Handler : ICommandHandler<{{command.name}}Command{{#if command.returnType}}, {{command.returnType}}{{/if}}>
{

    {{#each command.deps}}
    private readonly {{{this.type}}} {{this.name}};
    {{/each}}

    public {{command.name}}Handler(
        {{#each command.deps}}
            {{{this.type}}} {{this.name}} {{#unless @last}},{{/unless}}
        {{/each}})
    {
        {{#each command.deps}}
            this.{{this.name}} = {{this.name}};
        {{/each}}
    }

    public async Task{{#if command.returnType}}<{{command.returnType}}>{{/if}} Handle({{command.name}}Command input, CancellationToken cancellationToken)
    {
        {{#each command.body}}
            {{{this}}}
        {{/each}}
    }
}