const mentionedUsers = new Map(); // মেনশন করা ব্যক্তিদের ট্র্যাক রাখার জন্য

module.exports = {
    config: {
        name: "mentionReply",
        aliases: ["mr"],
        version: "1.0",
        author: "Ullash ッ ☆𝐀𝐁𝐇𝐑𝐀𝐍𝐈𝐋☆",
        role: 2,
        category: "fun",
        shortDescription: "মেনশন করা ইউজারদের রিপ্লাই দেয়",
        longDescription: "যখন তুমি কাউকে মেনশন করবে, বট কিছুক্ষণের জন্য তাদের মেসেজে রিপ্লাই দেবে।",
        guide: {
            en: "{p}mentionReply @user"
        }
    },

    onStart: async function ({ api, event }) {
        let mention = Object.keys(event.mentions)[0];
        if (!mention) return api.sendMessage("অনুগ্রহ করে একজনকে মেনশন করুন!", event.threadID, event.messageID);

        let name = event.mentions[mention]; // মেনশন করা ইউজারের নাম নেওয়া
        mentionedUsers.set(mention, { name, time: Date.now() });

        api.sendMessage(`হ্যালো ${name}, তুমি এখন বটের বিশেষ তালিকায় আছো!`, event.threadID, event.messageID);

        // ৫ মিনিট পর ইউজারকে তালিকা থেকে সরিয়ে ফেলবে
        setTimeout(() => {
            mentionedUsers.delete(mention);
        }, 5 * 60 * 1000);
    },

    onChat: async function ({ api, event }) {
        let userId = event.senderID;

        if (mentionedUsers.has(userId)) {
            let replies = [
                "ঠাপের নাম যদি হয় চুদা-- তোর মার ভোদায় দিমু এক বস্তা জুতা--- জুতায় আছে ময়লা-- তোর মার ভোদা চুইদা বাহির করমু এক বস্তা কয়লা💦💨😊",
                "তোর মার ভোদা চুইদা ➖ তোর বোনের ভোদায় ভরমু এক বালতি বিচিরা ➖ বিচিরা রং হয় সাদা ➖তোর মার ভোদা চুইদা বানামু ভারচুয়াল জগতের গাধা❎",
                "খাম্বা হয় শক্ত, তোর মার বোদা চুইদা বার করমু রক্ত--রক্তের রং যদি হয় লাল, তোর মারে চুদবো চিরকাল ❎",
                "তোর মার কালা ভোদা চুদমু আমি ঘরের এক কনে 👒শুয়ারের বাচ্চা ❎",
                "তোর মার ভোদা চুইদা করমু ১০০ইনচি ফাঁকা---💦💦 😃",
                "ডিপ্রেশন থেকেও তোর মাইরে চু*** দি 🤬 বান্ধির পোলা",
                "খানকির পোলা, আর একটা টেক্সট করলে তুই তোর মায়ের মাসিক খাস \n ধন্যবাদ 🫰🏼",
                "ব্যাস্যার পোলা, কথা শুন, তোর আম্মু রে চুদি গামছা পেচিয়ে🐰",
                "হিজলা মাগির পোলা, হাতির ল্যাওড়া দিয়া তোর মায়েরে চুদুম",
                "টুকাই মাগির পোলা, তোর মার ভোদায় পাব্লিক টয়লেট।🤟",
                "তোর টেক্সট কামলার মায়রে চু*দি 🤡",
                "খানকির পোলা, টেক্সট না করে আমার ধন চুষে দে😂, টাকা দিমু",
                "তোর মুখে হাইগ্যা দিমু। ভুস্কি মাগির পোলা 🤣",
                "-𝐃𝐨𝐧'𝐭 𝐌𝐢𝐧𝐝, তোরেও চুদি সাথে তোর মারে ও চুদি 😪💋🫂",
                "____________𝐃𝐨𝐧'𝐭 𝐌𝐢𝐧𝐝 তোমার মারে চুদি!😴🤏🍆🐱🍒",
                "ধোন চিন চিন করছে, হায় তোর আম্মুকে আমি চোদতে চাই! আমরা দুজন দুজনারি চোদার দুনিয়ার, তোর আম্মুরে ছুঁয়ে দিলে তোর কচি বোন প্রেগনেন্ট হয়ে যায় 🤣💃🤸‍♂️🫶",
                "তোর আম্মুর বোদায় তালগাছ দিমু, খানকির পোলা!",
                "আব্বু ডাক, মাপ করে দিমু!",
                "তোর মায়রে বোদায় চেড়া সেন্ডেল দিয়া পিটামু, খানকির পোলা!",
                "হাত মারা মাগির পোলা, ঘু খাইয়া মইরা যা 🫶🏼 🫵🏼 🤣",
                "তোর মায়রে তোর বাপের কান্দে উপর পালাই চুদি 🤣💔🫤",
                "তোর কচি বোনেরে তোর কোলে তুইলা চুদি 🙂 🐸 🤝",
                "চিল্লাচিল্লি না কইরা তোর মায়ের ভোঁদার ছবি দে 🫰🏼, হাত মাইরা ঘুয়াইয়া পড়মু",
                "তোর মায়ের ভোদা কালা😂😂",
                "তোর মায়রে ছেড়া পলিথিন ব্যাগ দিয়া চু*দি 🤡🫶🏼😂😂",
                "আমি তোর মায়রে চুদলাম, শুধুমাত্র মুহূর্তটাকে সুন্দর করার জন্য!🙂💔",
                "এক আকাশ পরিমাণ কষ্ট নিয়ে তোর মারে চুদি 🙂💔💯",
                "___ পুটকি মারার জন্য তোর আম্মুকে চাই😚💚🍢",
                "-আমার নুনু ছাড়া, তোর আম্মুর ভুদা 🥵 এতিম ..!!!🤫🫦💦"
            ];
            
            let randomReply = replies[Math.floor(Math.random() * replies.length)];
            api.sendMessage(randomReply, event.threadID, event.messageID);
        }
    }
};
