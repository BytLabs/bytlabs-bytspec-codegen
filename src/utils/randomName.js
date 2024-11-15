import Chance from "chance";


/**
 * Description placeholder
 *
 * @export
 * @returns {string}
 */
export default function randomName() {
    const chance = new Chance();
    const randomName = chance.word({ syllables: 3 })
    return randomName;
}