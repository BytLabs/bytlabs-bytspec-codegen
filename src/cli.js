import { program } from "commander"

// Define command-line options
program
  .option('-t, --template <path>', 'Path to the JSON template file')
  .option('-cn, --container-namespace <namespace>', 'Your docker username/organisation')
  .option('-cr, --container-registry <registry>', 'Your docker registry url (without https://)')
  .parse(process.argv) // Parse the arguments

const options = program.opts()

// // Check if the template argument is provided
// if (!options.template) {
//   console.error('Error: Please provide a valid --template path.')
//   process.exit(1)
// }

// if (!options.containerNamespace) {
//   console.error('Error: Please provide a valid --docker-namespace.')
//   process.exit(1)
// }

// if (!options.containerRegistry) {
//   console.error('Error: Please provide a valid --docker-registry.')
//   process.exit(1)
// }

export default options;
