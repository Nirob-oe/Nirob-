const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs")

module.exports = {
	config: {
		name: "fuck",
		aliases: ["fuck"],
		version: "1.0",
		author: "milan-says",
		countDown: 5,
		role: 2,
		shortDescription: "make fucking image",
		longDescription: "",
		category: "18+",
		guide:  {
			vi: "{pn} @tag ",
			en: "{pn} @tag "
		}
	},
	onStart: async function ({ message, args, event, api }) {
        const mention = Object.keys(event.mentions);
        if (mention.length == 0) return message.reply("Please mention someone");
        else if (mention.length == 1) {
            const one = event.senderID, two = mention[0];
            bal(one, two).then(ptth => { message.reply({ body: "Ughhh🥵", attachment: fs.createReadStream(ptth) }) })
        } else {
            const one = mention[1], two = mention[0];
            bal(one, two).then(ptth => { message.reply({ body: "Ughhh🥵", attachment: fs.createReadStream(ptth) }) })
        }
    }
};
async function bal(one, two) {
    let avone = await jimp.read(`https://i.imgur.com/DOw76Kd.jpeg'`)
    avone.circle()
    let avtwo = await jimp.read(`https://i.imgur.com/mWdzlPR.jpeg`)
    avtwo.circle()
    let pth = "abcd.png"
    let img = await jimp.read("https://i.imgur.com/my71Hjk.png")
    img.resize(1280, 720).composite(avone.resize(150, 150), 250, 100).composite(avtwo.resize(150, 150), 680, 40);
    await img.writeAsync(pth)
    return pth
}
