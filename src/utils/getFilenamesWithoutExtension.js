import { readdir } from 'fs/promises';
import { basename, extname } from 'path';


/**
 * Description placeholder
 *
 * @export
 * @async
 * @param {string} directory
 * @returns {Promise<string[]>}
 */
export default async function getFilenamesWithoutExtension(directory) {
    try {
        const files = await readdir(directory);
        return files
            .filter(file => file !== '.' && file !== '..') // Filter out '.' and '..' if present
            .map(file => basename(file, extname(file))); // Remove extensions
    } catch (error) {
        console.error('Error reading directory:', error);
        return [];
    }
}