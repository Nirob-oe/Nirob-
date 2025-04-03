const axios = require("axios");

const prefixes = ["bby", "janu", "babe", "xan", "sona", "bbu", "jaan"];

module.exports = {
  config: {
    name: "bot",
    version: "1.6.9",
    author: "xos Eren",
    role: 0,
    description: {
      en: "No prefix command.",
    },
    category: "ai",
    guide: {
      en: "Just type a prefix like 'bby' followed by your message.",
    },
  },

  onStart: async function () {
    console.log("Bot command initialized.");
  },

  // Helper function to remove a prefix
  removePrefix: function (str, prefixes) {
    for (const prefix of prefixes) {
      if (str.startsWith(prefix)) {
        return str.slice(prefix.length).trim();
      }
    }
    return str;
  },

  onReply: async function ({ api, event }) {
    if (event.type === "message_reply") {
      try {
        let reply = event.body.toLowerCase();
        reply = this.removePrefix(reply, prefixes) || "bby";

        // Updated URL instead of global.GoatBot.config.api
        const response = await axios.get(
          `https://www.noobs-api.rf.gd/dipto/baby?text=${encodeURIComponent(reply)}&senderID=${event.senderID}&font=1`
        );

        const message = response.data.reply;
        if (response.data.react) {
          setTimeout(() => {
            api.setMessageReaction(response.data.react, event.messageID, () => {}, true);
          }, 400);
        }

        api.sendMessage(message, event.threadID, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName: "bot",
            type: "reply",
            messageID: info.messageID,
            author: event.senderID,
            text: message,
          });
        }, event.messageID);
      } catch (err) {
        console.error(err.message);
        api.sendMessage(" An error occurred.", event.threadID, event.messageID);
      }
    }
  },

  onChat: async function ({ api, event }) {
    const randomReplies = ["Bolo jaan ki korte pari tmr jonno 🥹", "আর কত বার ডাকবা ,শুনছি তো 🤷🏻‍♀", "আম গাছে আম নাই ঢিল কেন মারো, তোমার সাথে প্রেম নাই বেবি কেন ডাকো 😒🫣", "দূরে যা, তোর কোনো কাজ নাই, শুধু 𝗯𝗯𝘆 𝗯𝗯𝘆 করিস 😉", "Hop beda😾,", "𝗕𝗯𝘆 𝗯𝗼𝗹𝗹𝗮 𝗽𝗮𝗽 𝗵𝗼𝗶𝗯𝗼,,😒😒", "𝗕𝗯𝘆 বলে অসম্মান করচ্ছিছ,😰😿", "ki kobi ko😒", "তোর বিয়ে হয় নি 𝗕𝗯𝘆 হইলো কিভাবে,,🙄", "𝗕𝗯𝘆 বললে চাকরি থাকবে না", "বার বার ডাকলে মাথা গরম হয় কিন্তু 😑😒", "বলো ফুলটুশি😘", "ভুলে জাও আমাকে 😞😞", "Ato gulo bby k samlate parsi nah 😫😫"];
    const rand = randomReplies[Math.floor(Math.random() * randomReplies.length)];

    const messageBody = event.body ? event.body.toLowerCase() : "";
    const words = messageBody.split(" ");
    const wordCount = words.length;

    if (event.type !== "message_reply") {
      let messageToSend = messageBody;
      messageToSend = this.removePrefix(messageToSend, prefixes);

      if (prefixes.some((prefix) => messageBody.startsWith(prefix))) {
        setTimeout(() => {
          api.setMessageReaction("😍", event.messageID, () => {}, true);
        }, 400);

        api.sendTypingIndicator(event.threadID, true);

        if (event.senderID === api.getCurrentUserID()) return;

        const msg = { body: rand };

        if (wordCount === 1) {
          setTimeout(() => {
            api.sendMessage(msg, event.threadID, (err, info) => {
              global.GoatBot.onReply.set(info.messageID, {
                commandName: "bot",
                type: "reply",
                messageID: info.messageID,
                author: event.senderID,
                link: msg,
              });
            }, event.messageID);
          }, 400);
        } else {
          words.shift(); // Removing the prefix
          const remainingText = words.join(" ");

          try {
            // Updated URL instead of global.GoatBot.config.api
            const response = await axios.get(
              `https://www.noobs-api.rf.gd/dipto/baby?text=${encodeURIComponent(remainingText)}&senderID=${event.senderID}&font=1`
            );
            const message = response.data.reply;

            if (response.data.react) {
              setTimeout(() => {
                api.setMessageReaction(
                  response.data.react,
                  event.messageID,
                  () => {},
                  true
                );
              }, 500);
            }

            api.sendMessage({ body: message }, event.threadID, (error, info) => {
              global.GoatBot.onReply.set(info.messageID, {
                commandName: this.config.name,
                type: "reply",
                messageID: info.messageID,
                author: event.senderID,
                link: message,
              });
            }, event.messageID);
          } catch (err) {
            console.error(err.message);
            api.sendMessage(" An error occurred.", event.threadID, event.messageID);
          }
        }
      }
    }

    // Handling reaction triggers based on certain text patterns
    const reactions = ["haha"] 
