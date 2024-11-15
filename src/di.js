import * as awilix from 'awilix';
import { pascalCase } from 'change-case';
import ProjectResolver from './resolvers/project/ProjectResolver.js';

export async function createContainer() {

    const container = awilix.createContainer({
        injectionMode: awilix.InjectionMode.PROXY,
        strict: true,
    })

    container.register({
        projectResolver : awilix.asClass(ProjectResolver).transient()
      })

    await container.loadModules(
        [
            `src/resolvers/**/*.js`
        ],
        {
            formatName: 'camelCase',
            resolverOptions: {
                lifetime: awilix.Lifetime.TRANSIENT,
                register: awilix.asClass
            },
            esModules: true
        }
    );

    const PROJECT_TEMPLATE = "./src/templates/project";
    const SCHEMA_TEMPLATE = "./src/templates/schema";

    container.register({
        projectTemplate: awilix.asValue(PROJECT_TEMPLATE),
        schemaTemplate: awilix.asValue(SCHEMA_TEMPLATE),
    })

    return container;
}

