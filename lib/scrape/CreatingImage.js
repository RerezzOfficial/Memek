/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

const fetch = require('node-fetch')

async function animedif(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/Ojimi/anime-kawai-diffusion",
    {
      headers: { Authorization: "Bearer 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" },
      method: "POST",
      body: JSON.stringify(data),
    }
  )
  const result = await response.blob();
  let arrayBuffer = await result.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer, 'base64')
  return buffer
}
async function animedif2(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/stablediffusionapi/anime-model-v2",
    {
      headers: { Authorization: "Bearer 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" },
      method: "POST",
      body: JSON.stringify(data),
    }
  )
  const result = await response.blob();
  let arrayBuffer = await result.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer, 'base64')
  return buffer
}
async function animedif3(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/digiplay/CoffeeMix_v2",
    {
      headers: { Authorization: "Bearer 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" },
      method: "POST",
      body: JSON.stringify(data),
    }
  )
  const result = await response.blob();
  let arrayBuffer = await result.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer, 'base64')
  return buffer
}
async function stabledif(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/stablediffusionapi/lyrielv16",
    {
      headers: { Authorization: "Bearer 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" },
      method: "POST",
      body: JSON.stringify(data),
    }
  )
  const result = await response.blob();
  let arrayBuffer = await result.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer, 'base64')
  return buffer
}
async function stabledif2(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/stablediffusionapi/dreamshaper-v6",
    {
      headers: { Authorization: "Bearer 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" },
      method: "POST",
      body: JSON.stringify(data),
    }
  )
  const result = await response.blob();
  let arrayBuffer = await result.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer, 'base64')
  return buffer
}
async function text2img(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/Yntec/Ninja-Diffusers",
    {
      headers: { Authorization: "Bearer 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" },
      method: "POST",
      body: JSON.stringify(data),
    }
  )
  const result = await response.blob();
  let arrayBuffer = await result.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer, 'base64')
  return buffer
}

module.exports = {
  animedif,
  animedif2,
  animedif3,
  stabledif,
  stabledif2,
  text2img,
}