import Handlebars from "handlebars"
import { readFile } from 'fs/promises';



/**
 * Description placeholder
 *
 * @export
 * @async
 * @param {string} path
 * @param {Object} context
 * @returns {Promise<string>}
 */
export default async function compileTemplate (path, context) {
    const template = Handlebars.compile(await readFile(path, 'utf-8'));
    const content = template(context);
    return content;
}