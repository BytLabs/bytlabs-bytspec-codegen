using System;
using System.Collections.Generic;
using BytLabs.Domain.Entities;

namespace BytLabs.{{project.name}}.Domain.Entities
{
    public class {{class.name}} : {{#if class.aggregate }}AggregateRootBase{{else}}Entity{{/if}}{{#if class.idType}}<{{class.idType}}>{{/if}}
    {
        public {{class.name}}({{class.idType}} id) : base(id)
        {
        }

        {{#each class.properties}}
        {{>propTemplatePrivateSetter this}}
        {{/each}}

        {{#each class.methods}}
        {{>methodTemplate this}}
        {{/each}}
    }
}
