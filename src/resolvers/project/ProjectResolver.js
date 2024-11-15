import fs from "fs-extra";
import { Provider } from "../../def/provider.js";

class ProjectResolver {

    /**
    * Container
    * @type {Provider}
    */
    provider
  
    /**
    * Creates an instance of index.
    * @param {Provider} provider
    */
    constructor(provider) {
      this.provider = provider;
    }
  
    
    /**
     * Description placeholder
     *
     * @async
     * @param {{ spec: any; outputDirectory: string; deleteExistingFiles: boolean; }} param
     * @returns {Promise}
     */
    async execute({ spec, outputDirectory, deleteExistingFiles}) {
      console.log("Generating application...");
    
      const fileResolvers = [
        this.provider.commandFileResolver,
        this.provider.entitiesFileResolver,
        this.provider.miscFileResolver
      ];
    
      for (let resolvers of fileResolvers)
        await resolvers.execute({ spec, outputDirectory });
    
      console.log("Application generated successfully!");
    }
  }

  export default ProjectResolver;