module.exports = {
  config: {
    name: "pending",
    version: "1.0",
    author: "KAKASHI 🥷🏻",
    countDown: 5,
    role: 2,
    shortDescription: {
      vi: "",
      en: ""
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "NIROB"
  },

langs: {
    en: {
        invaildNumber: "%1 is not an invalid number",
        cancelSuccess: "Refused %1 thread!",
        approveSuccess: "Approved successfully %1 threads!",

        cantGetPendingList: "Can't get the pending list!",
        returnListPending: "»「PENDING」«❮ The whole number of threads to approve is: %1 thread ❯\n\n%2",
        returnListClean: "「PENDING」There is no thread in the pending list"
    }
  },

onReply: async function({ api, event, Reply, getLang, commandName, prefix }) {
    if (String(event.senderID) !== String(Reply.author)) return;
    const { body, threadID, messageID } = event;
    var count = 0;

    if (isNaN(body) && body.indexOf("c") == 0 || body.indexOf("cancel") == 0) {
        const index = (body.slice(1, body.length)).split(/\s+/);
        for (const NIROBIndex of index) {
            console.log(NIROBIndex);
            if (isNaN(NIROBIndex) || NIROBIndex <= 0 || NIROBIndex > Reply.pending.length) return api.sendMessage(getLang("invaildNumber", NIROBIndex), threadID, messageID);
            api.removeUserFromGroup(api.getCurrentUserID(), Reply.pending[NIROBIndex - 1].threadID);
            count+=1;
        }
        return api.sendMessage(getLang("cancelSuccess", count), threadID, messageID);
    }
    else {
        const index = body.split(/\s+/);
        for (const NIROBIndex of index) {
            if (isNaN(NIROBIndex) || NIROBIndex <= 0 || NIROBIndex > Reply.pending.length) return api.sendMessage(getLang("invaildNumber", NIROBIndex), threadID, messageID);
            api.sendMessage(`♦⪼  𝗖óก𝕟૯τ૯𝕕  ⪻♦ 
╭──────────────⭓
│‣ 𝐆𝐥𝐨𝐛𝐚𝐥 𝐩𝐫𝐞𝐟𝐢𝐱: . 
│‣ 𝐘𝐨𝐮𝐫 𝐠𝐫𝐨𝐮𝐩 𝐩𝐫𝐞𝐟𝐢𝐱: . 
╰──────────────⭓
╭──────────────⭓
│➜ 𝐎𝐭𝐡𝐞𝐫 𝐃𝐞𝐭𝐚𝐢𝐥𝐬⚠️
│Owner : NI R OB
│FB : Yung Zhen
╰──────────────⭓`, Reply.pending[NIROBIndex - 1].threadID);
            count+=1;
        }
        return api.sendMessage(getLang("approveSuccess", count), threadID, messageID);
    }
},

onStart: async function({ api, event, getLang, commandName }) {
  const { threadID, messageID } = event;

    var msg = "", index = 1;

    try {
    var spam = await api.getThreadList(100, null, ["OTHER"]) || [];
    var pending = await api.getThreadList(100, null, ["PENDING"]) || [];
  } catch (e) { return api.sendMessage(getLang("cantGetPendingList"), threadID, messageID) }

  const list = [...spam, ...pending].filter(group => group.isSubscribed && group.isGroup);

    for (const NIROB of list) msg += `${index++}/ ${NIROB.name}(${ArYan.threadID})\n`;

    if (list.length != 0) return api.sendMessage(getLang("returnListPending", list.length, msg), threadID, (err, info) => {
    global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            pending: list
        })
  }, messageID);
    else return api.sendMessage(getLang("returnListClean"), threadID, messageID);
}
};
