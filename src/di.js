import * as awilix from 'awilix';
import { pascalCase } from 'change-case';

export async function createContainer() {

    const container = awilix.createContainer({
        injectionMode: awilix.InjectionMode.PROXY,
        strict: true,
    })

    await autoloadModules(container, 'src/resolvers/project', (name) => `project${pascalCase(name)}Resolver`);
    await autoloadModules(container, 'src/resolvers/schema', (name) => `schema${pascalCase(name)}Resolver`);

    const PROJECT_TEMPLATE = "./src/templates/project";
    const SCHEMA_TEMPLATE = "./src/templates/schema";

    container.register({
        projectTemplate: awilix.asValue(PROJECT_TEMPLATE),
        schemaTemplate: awilix.asValue(SCHEMA_TEMPLATE),
    })

    return container;
}

async function autoloadModules(container, dir, formatName) {
    await container.loadModules(
        [
            `${dir}/**/*.js`
        ],
        {
            formatName: formatName,
            resolverOptions: {
                lifetime: awilix.Lifetime.SINGLETON,
                register: awilix.asFunction
            },
            esModules: true
        }
    );
}