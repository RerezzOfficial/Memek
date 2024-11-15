const fetch = require("node-fetch")

let Arya = {
    constructor: async function(baseURL = 'https://nexra.aryahcr.cc') {
        this.baseURL = baseURL;
    },

    extractJson: async function(str) {
        const match = str.match(/({.*})/);
        return match ? JSON.parse(match[1]) : null;
    },

   postData: async function(decode, endpoint, data) {
        try {
            const url = `${this.baseURL}/${endpoint}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const text = await response.text();
            return Buffer.isBuffer(text) ? text.toString() : (decode ? JSON.parse(text) : this.extractJson(text));
        } catch (error) {
            console.error("Error in postData:", error);
            throw error;
        }
    },

    complementImage: async function(model, prompt, additionalData = {}) {
        const defaultPrompt = "An serene sunset landscape where a river winds through gentle hills covered in trees. The sky is tinged with warm and soft tones, with scattered clouds reflecting the last glimmers of the sun.";
        const requestData = {
            prompt: prompt || defaultPrompt,
            model,
            ...additionalData
        };
        return await this.postData(false, 'api/image/complements', requestData);
    },

   stablediffusion15: async function(prompt, model) {
        return await this.complementImage(model ?? "stablediffusion-1.5", prompt);
    },

   stablediffusion21: async function(prompt, model) {
        return await this.complementImage(model ?? "stablediffusion-2.1", prompt, {
            data: {
                prompt_negative: "",
                guidance_scale: 9
            }
        });
    },

    stablediffusionXL: async function(prompt, model, style) {
        return await this.complementImage(model ?? "stablediffusion-xl", prompt, {
            data: {
                prompt_negative: "",
                image_style: style ?? "(No style)",
                guidance_scale: 7.5
            }
        });
    },

   pixartA: async function(prompt, model, style) {
        return await this.complementImage(model ?? "pixart-a", prompt, {
            data: {
                prompt_negative: "",
                sampler: "DPM-Solver",
                image_style: style ?? "Anime",
                width: 1024,
                height: 1024,
                dpm_guidance_scale: 4.5,
                dpm_inference_steps: 14,
                sa_guidance_scale: 3,
                sa_inference_steps: 25
            }
        });
    },

   pixartLcm: async function(prompt, model) {
        return await this.complementImage(model ?? "pixart-lcm", prompt, {
            data: {
                prompt_negative: "",
                image_style: "Fantasy art",
                width: 1024,
                height: 1024,
                lcm_inference_steps: 9
            }
        });
    },

   dalle: async function(prompt, model) {
        return await this.complementImage(model ?? "dalle", prompt);
    },

   dalleMini: async function(prompt, model) {
        return await this.complementImage(model ?? "dalle-mini", prompt);
    },

   prodia: async function(prompt, modelA, modelB) {
        return await this.complementImage(modelA ?? "prodia", prompt, {
            data: {
                model: modelB ?? "absolutereality_V16.safetensors [37db0fc3]",
                steps: 25,
                cfg_scale: 7,
                sampler: "DPM++ 2M Karras",
                negative_prompt: ""
            }
        });
    },

    prodiaStablediffusion: async function(prompt, modelA, modelB) {
        return await this.complementImage(modelA ?? "prodia-stablediffusion", prompt, {
            data: {
                prompt_negative: "",
                model: modelB ?? "absolutereality_v181.safetensors [3d9d4d2b]",
                sampling_method: "DPM++ 2M Karras",
                sampling_steps: 25,
                width: 512,
                height: 512,
                cfg_scale: 7
            }
        });
    },

   prodiaStablediffusionXL: async function(prompt, modelA, modelB) {
        return await this.complementImage(modelA ?? "prodia-stablediffusion-xl", prompt, {
            data: {
                prompt_negative: "",
                model: modelB ?? "sd_xl_base_1.0.safetensors [be9edd61]",
                sampling_method: "DPM++ 2M Karras",
                sampling_steps: 25,
                width: 1024,
                height: 1024,
                cfg_scale: 7
            }
        });
    },

   emi: async function(prompt, model) {
        return await this.complementImage(model ?? "emi", prompt);
    },

   chatGPT: async function(assistant, user, prompt, model) {
        return await this.postData(true, 'api/chat/gpt', {
            messages: [{
                role: "assistant",
                content: assistant ?? "Hello! How are you today?"
            }, {
                role: "user",
                content: user ?? "Hello, my name is Yandri."
            }, ],
            prompt: prompt ?? "Can you repeat my name?",
            model: model ?? "GPT-4",
            markdown: false
        });
    },

   chatComplements: async function(assistant, user, model, conversation_style) {
        return await this.postData(true, 'api/chat/complements', {
            messages: [{
                role: "assistant",
                content: assistant ?? "Hello! How are you today?"
            }, {
                role: "user",
                content: user ?? "Hello, my name is Yandri."
            }, ],
            conversation_style: conversation_style ?? "Balanced",
            markdown: false,
            stream: false,
            model: model ?? "Bing"
        });
    },

   translate: async function(text, source, target) {
        return await this.postData(true, 'api/translate/', {
            text,
            source,
            target
        });
    }
}

module.exports = {
    Arya
}