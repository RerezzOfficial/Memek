const WebSocket = require("ws");
let wss = "wss://prodia-fast-stable-diffusion.hf.space/queue/join";
const speed = require("performance-now");
    
exports.realistic = async (model, prompt, negative_prompt, width, height) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = {};
      let send_has_payload = {
        fn_index: 0,
        session_hash: "jdst0oac4mo",
      };
      let send_data_payload = {
        data: [
          prompt, 
          negative_prompt ? negative_prompt : "",
          model, 
          25, 
          "DPM++ 2M", 
          7, 
          width ? width : 720, 
          height ? height: 1024, 
          -1
        ],
        event_data: null,
        fn_index: 0,
        session_hash: "jdst0oac4mo",
      };

      const ws = new WebSocket(wss);
      ws.onopen = function () {
        console.log("Connected to websocket");
      };

      ws.onmessage = async function (event) {
        let message = JSON.parse(event.data);

        switch (message.msg) {
          case "send_hash":
            ws.send(JSON.stringify(send_has_payload));
            break;

          case "estimation":
            console.log("Waiting in line: ️" + message.rank);
            break;

          case "send_data":
            console.log("Processing your image....");
            ws.send(JSON.stringify(send_data_payload));
            break;
          case "process_completed":
            var timestamp = speed();
            var latensi = speed() - timestamp;
            result.secondSpeed = latensi.toFixed(4);
            result.model = model;
            result.prompt = prompt
            result.negative_prompt = negative_prompt ? negative_prompt : false;
            result.width = width ? width : 720,
            result.height = height ? height: 1024,
            result.resultImage = message.output.data[0].replace(
              "data:image/png;base64,",
              "",
            );
            break;
        }
      };

      ws.onclose = function (event) {
        if (event.code === 1000) {
          console.log("Process completed️");
        } else {
          msg.reply("Err : WebSocket Connection Error:\n");
        }
        resolve(result);
      };
    } catch (e) {
      console.log(e);
    }
  });
};