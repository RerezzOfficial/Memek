const fetch = require('node-fetch');

const LABSURL = process.env.LABSURL || "https://api.elevenlabs.io";
const LABSKEY = process.env.LABSKEY || "2a0050b5932ff8d79f54418fa370d1c1";

const labsVoiceID = {
    "rachel": {
        "voice_id": "21m00Tcm4TlvDq8ikWAM"
    },
    // Rest of the object...
};

const PAULCA_VOICE = 'EcOnXAJ3e2odu7bmr9M9';
const YOUTUBE_VOICE = 'LQj2X4OpUuX9YFC5sCDw';
const MICHAEL_VOICE = 'flq6f7yk4E4fJM5XTYuZ';
const MATTHEW_VOICE = 'Yko7PKHZNXotIFUBG7I9';

const DEFAULT_VOICE = MICHAEL_VOICE;
const DEFAULT_MODEL = 'eleven_multilingual_v2';
const DEFAULT_URL = "https://api.elevenlabs.io";
let apiURL = LABSURL || DEFAULT_URL;
let apiKey = LABSKEY;

function init(url = apiURL, key = apiKey) {
    apiURL = url;
    apiKey = key;
    return {
        apiURL,
        apiKey
    };
}

const FORMATS = [
    'mp3_44100_64', 'mp3_44100_96', 'mp3_44100_128', 'mp3_44100_192',
    'pcm_16000', 'pcm_22050', 'pcm_24000', 'pcm_44100'
];

async function apiCall(method, relativeURL, _headers, body) {
    try {
        const headers = {
            "Content-Type": "application/json",
            "xi-api-key": apiKey,
            ..._headers
        };
        const options = {
            method: method || "GET",
            headers: headers,
            body: body ? (typeof body === 'string' ? body : JSON.stringify(body)) : null
        };
        const response = await fetch(apiURL + relativeURL, options);

        return response;
    } catch (err) {
        throw new Error("apiCall: " + err.message);
    }
}

async function getUser() {
    try {
        const response = await apiCall("GET", "/v1/user", []);
        const data = await response.json();
        return data;
    } catch (err) {
        throw new Error("getUser: " + err.message);
    }
    return null;
}

async function getUserInfo() {
    try {
        const response = await apiCall("GET", "/v1/user/subscription");
        return await response.json();
    } catch (err) {
        console.log("getUserInfo: " + err.message);
        throw err;
    }
}

async function isValidVoice(voiceId) {
    try {
        const response = await apiCall("GET", `/v1/voices/${voiceId}`);
        const voice = await response.json();
        return voice.voice_id === voiceId;
    } catch (e) {
        console.log("isValidVoice: " + e.message);
        return false;
    }
}

async function listVoices() {
    try {
        const response = await apiCall("GET", "/v1/voices", []);
        const data = await response.json();
        return data;
    } catch (err) {
        console.log("listVoices: " + err.message);
    }
    return null;
}

async function synthesize(ttsOptions) {
    try {
        const user = await getUser();
        const tierLevel = user?.subscription?.tier || 'free';
        const isMP3 = ttsOptions.output_format.startsWith("mp3_");

        if (tierLevel === 'free' && ttsOptions.output_format === 'mp3_44100_192') {
            console.log("Free tier is limited to mp3_44100_128 format.");
            ttsOptions.output_format = 'mp3_44100_128';
        }

        const acceptType = isMP3 ? 'audio/mpeg' : 'audio/wav';
        const headers = {
            "Accept": acceptType
        };
        const output_format = ttsOptions.output_format;

        const modelMappings = {
            'e1': 'eleven_monolingual_v1',
            'e2': 'eleven_monolingual_v2',
            'm1': 'eleven_multilingual_v1',
            'm2': 'eleven_multilingual_v2',
        };

        const model_id = modelMappings[ttsOptions.model_id] || DEFAULT_MODEL;

        console.log("Using model: " + model_id);

        const requestBody = {
            ...ttsOptions,
            model_id: model_id,
            voice_settings: {
                "stability": 0.75,
                "similarity_boost": 0.75,
                "style": 0.0,
            }
        };

        delete requestBody.output_format;

        const response = await apiCall(
            "POST",
            `/v1/text-to-speech/${ttsOptions?.voice_id}/stream?output_format=${output_format}`,
            headers,
            requestBody
        );

        const contentType = response.headers.get('content-type');
        const responseData = contentType && contentType.includes('application/json') ? await response.json() : await response.arrayBuffer();

        return responseData;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    LABSURL,
    LABSKEY,
    FORMATS,
    DEFAULT_VOICE,
    PAULCA_VOICE,
    YOUTUBE_VOICE,
    labsVoiceID,
    init,
    getUser,
    getUserInfo,
    isValidVoice,
    listVoices,
    synthesize,
};