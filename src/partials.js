import Handlebars from "handlebars"

Handlebars.registerPartial("methodTemplate", `
public {{type}} {{name}}({{#each parameters}}{{type}} {{name}}{{#unless @last}}, {{/unless}}{{/each}})
{
    {{#each body}}
    {{{this}}}
    {{/each}}
}
`);

Handlebars.registerPartial("propTemplate", `
public {{{type}}} {{name}} { get; set; } = {{{default}}};`);


Handlebars.registerPartial("propTemplatePrivateSetter", `
public {{{type}}} {{name}} { get; private set; } = {{{default}}};`);
    