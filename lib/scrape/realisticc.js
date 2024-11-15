/**
 * DannTeam
 * Instagram: @dannalwaysalone
*/

const { G4F } = require("g4f")

const g4f = new G4F()

async function realistic(prompt) {
  const imageGenerator = await g4f.imageGeneration(prompt, {
    debug: true,
    providers: g4f.providers.Pixart,
    providersOptions: {
      height: 512,
      width: 512,
      samplingMethod: "SA-Solver"
    }
  });
  
  return imageGenerator
}

module.exports = { realistic }