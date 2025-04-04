const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs")


module.exports = {
 config: {
 name: "fuck4",
 aliases: ["chikai"],
 version: "1.0",
 author: "AceGun",
 countDown: 5,
 role: 0,
 shortDescription: "",
 longDescription: "",
 category: "18+",
 guide: "{pn}"
 },



 onStart: async function ({ message, event, args }) {
 const mention = Object.keys(event.mentions);
 if (mention.length == 0) return message.reply("Please mention someone");
 else if (mention.length == 1) {
 const one = event.senderID, two = mention[0];
 bal(one, two).then(ptth => { message.reply({ body: "「 Harder daddy 🥵💦 」", attachment: fs.createReadStream(ptth) }) })
 } else {
 const one = mention[1], two = mention[0];
 bal(one, two).then(ptth => { message.reply({ body: "", attachment: fs.createReadStream(ptth) }) })
 }
 }


};

async function bal(one, two) {

 let avone = await jimp.read(``)
 avone.circle()
 let avtwo = await jimp.read(``)
 avtwo.circle()
 let pth = "fucked.png"
 let img = await jimp.read("https://i.ibb.co/YpR7Bpv/image.jpg")

 img.resize(639,  480).composite(avone.resize(90, 90), 23, 320).composite(avtwo.resize(100, 100), 110, 60);

 await img.writeAsync(pth)
 return pth
}
