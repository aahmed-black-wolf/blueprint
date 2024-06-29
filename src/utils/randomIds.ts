/**
 * Generates a random numeric ID of a specified length.
 *
 * @param {number} length - The length of the random ID to generate.
 * @returns {string} A string containing the generated random numeric ID.
 */

export const generateRandomId = (length: number): string => {
  let result = "";
  const characters = "123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};
