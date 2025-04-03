const axios = require('axios');
const fs = require('fs'); 
const path = require('path');

module.exports = {
  config: {
    name: "kakashi",
    version: "1.0.0",
    permission: 0,
    credits: "nayan",
    description: "talk with kakashi",
    prefix: 'awto',
    category: "talk",
    usages: "hi",
    cooldowns: 5,
  },

  handleReply: async function ({ api, event }) {
    try {

      const apiData = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN/Nayan/main/api.json');
      const apiUrl = apiData.data.sim;
      const kl = await axios.get(`https://raw.githubusercontent.com/MOHAMMAD-NAYAN/Nayan/main/api.json`);
      const apiUrl2 = kl.data.api2;
      const response = await axios.get(`${apiUrl}/sim?type=ask&ask=${encodeURIComponent(event.body)}`);
      console.log(response.data);
      const result = response.data.data.msg;

      const textStyles = loadTextStyles();
      const userStyle = textStyles[event.threadID]?.style; 

      const fontResponse = await axios.get(`${apiUrl2}/bold?text=${result}&type=${userStyle}`);
      const text = fontResponse.data.data.bolded;

      api.sendMessage(text, event.threadID, (error, info) => {
        if (error) {
          console.error('Error replying to user:', error);
          return api.sendMessage('An error occurred while processing your request. Please try again later.', event.threadID, event.messageID);
        }
        global.client.handleReply.push({
          type: 'reply',
          name: this.config.name,
          messageID: info.messageID,
          author: event.senderID,
          head: event.body
        });
      }, event.messageID);

    } catch (error) {
      console.error('Error in handleReply:', error);
      api.sendMessage('An error occurred while processing your request. Please try again later.', event.threadID, event.messageID);
    }
  },

  start: async function ({ nayan, events, args, Users }) {
    try {
      const msg = args.join(" ");
      const apiData = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN/Nayan/main/api.json');
      const apiUrl = apiData.data.sim;


      if (!msg) {
        const greetings = [
  "___(♥︎)𝐔𝐟𝐟𝐟𝐟'𝐬___⎯͢⎯⃝🩵🌸♡শয়তানে লাড়া দিতাছে_//-😑|🩶🫶",
  "♡︎✺̶𝄞⋆⃝🥹আ্ঁমি্ঁ ফে্ঁম্ঁ ক্ঁর্ঁমু্ঁ tmR lØge ◎⃝♡︎✺̶𝄞⋆⃝_//-🥹",
  "๛⃝kÎre  ম্ঁয়্ঁদা্ঁ ছু্ঁন্দ্ঁলি্ঁ__³<🐰🥺🌺🔐",
  "🍒)⎯⃝ 𝐩𝐫𝐞𝐦ক্ঁর্ঁবা্ঁ না্ঁকি্ঁ কা্ঁই্ঁন্দা্ঁ দি্ঁমু্ঁ🥺🤞",
  "-•|•-ত্ঁরে্ঁ  🫵 YouTube এ ক্ঁয়্ঁ বা্ঁর্ঁ 😾😼ফো্ঁন্ঁ দি্ঁচ্ছি্ঁ ধ্ঁর্ঁলি্ঁ না্ঁ কে্ঁন্ঁ _//-🫵🏻😾",
  "•┈✤⋆⃝🥵 tUî লু্ঁচ্চা্ঁ সঁর্ এ্ঁনঁতে্ঁ'⋆⃝💚😘",
  "𝐴𝑠𝑠𝑎𝑙𝑎𝑚𝑢𝑎𝑙𝑎𝑖𝑘𝑢𝑚,𝑘𝑚𝑛 𝑎𝑠𝑒𝑛 𝑎𝑝𝑛𝑖_//-😊🥰",
  "_কিরে বিলাই মুইখা_//-🐸😾",
  "__প্রেম নয় হাঙ্গা তে বিশ্বাসী -!😅",
  "🫣__ছু মন্তর ছু আই লাভ ইউ টু_//-🫶",
  "__⍣⃝✿─𝐏𝐫𝐨𝐩𝐨𝐬𝐞 করবি নাকি থাপ্পাড় -😇🤦‍♀️___⍣⃝★─মাইরা দৌড় দিমু__🏃‍♀😾",
  "★- গাঁজা খেয়ে আইছি I love You__🤦🏻‍♂️😹_",
  "___ ক..আমি তোর🫵 কী লাগি!> 🔪😾",
  "__⍣⃝✿─মেয়ে সুন্দর কিন্তু  'imo' চালায় __🏃‍♀😾",
  "_মনডায় চায় চিল্লাইয়া 🥱\n°I Love you কই♡🥴But_\n-ভয় লাগে🥺🤭",
  "🤦🏻‍♂️_হি'সু'তে ধোঁয়া দেখা গেছে...😌🔪\n__এর মানে বুঝছো Sadia...??🐸",
  "🏍️..!🖤🙈🤭\n__sorry ড্রেনে পড়ে যাবেন_//-🤭😁"
        ];
        const name = await Users.getNameUser(events.senderID);
        const rand = greetings[Math.floor(Math.random() * greetings.length)];
        return nayan.reply({
          body: `${name}, ${rand}`,
          mentions: [{ tag: name, id: events.senderID }]
        }, events.threadID, (error, info) => {
          if (error) {
            return nayan.reply('An error occurred while processing your request. Please try again later.', events.threadID, events.messageID);
          }

          global.client.handleReply.push({
            type: 'reply',
            name: this.config.name,
            messageID: info.messageID,
            author: events.senderID,
            head: msg,
          });
        }, events.messageID);
      }

      else if (msg.startsWith("textType")) {
        const selectedStyle = msg.split(" ")[1];
        const options = ['serif', 'sans', 'italic', 'italic-sans', 'medieval', 'normal'];

        if (options.includes(selectedStyle)) {
          saveTextStyle(events.threadID, selectedStyle);
          return nayan.reply({ body: `Text type set to "${selectedStyle}" successfully!` }, events.threadID, events.messageID);
        } else {
          return nayan.reply({ body: `Invalid text type! Please choose from: ${options.join(", ")}` }, events.threadID, events.messageID);
        }
      }

      else if (msg.startsWith("delete")) {
        const deleteParams = msg.replace("delete", "").trim().split("&");
        const question = deleteParams[0].replace("ask=", "").trim();
        const answer = deleteParams[1].replace("ans=", "").trim();

        
        const data = await deleteEntry(question, answer, events, apiUrl);
        const replyMessage = d
