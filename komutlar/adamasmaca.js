const { stripIndents } = require('common-tags');
let durum = new Set();
const kelime = [
"kabus",
"ayakkabı",
"ev",
  "televizyon",
  "bilgisayar",
  "klavye",
  "mouse",
  "arda",
  "bot",
  "codare",
  "deneme",
  "glitch",
"github",  
]

module.exports.run = async (client, msg, args) => {

        if (durum.has(msg.channel.id)) return msg.reply('Kanal başına sadece bir adam asmaca oyunu meydana gelebilir.');

        try {
            const cevap = kelime[Math.floor(Math.random() * kelime.length)].toLowerCase();
            let puan = 0;
            let displayText = null;
            let tahmin = false;
            const onay = [];
            const yanlış = [];
            const display = new Array(cevap.length).fill('_');
            while (cevap.length !== onay.length && puan < 6) {
                await msg.channel.send(stripIndents`
                    ${displayText === null ?  msg.author.username : displayText ? '**Çok iyisin!**' : '**Yanlış Harf!**'}
                         **Kelime:**    \`${display.join(' ')}\`
                    **Yanlış Harfler:** ${yanlış.join(', ') || 'Yok'}
                    \`\`\`
                    __________
                    |    |
                    |    ${puan > 0 ? '😵' : ''}
                    |   ${puan > 2 ? '┌' : ' '}${puan > 1 ? '()' : ''}${puan > 3 ? '┐' : ''}
                    |    ${puan > 4 ? '/' : ''} ${puan > 5 ? '\\' : ''}
                    |
                                   
                    \`\`\`
                `);
                const filter = res => {
                    const choice = res.content.toLowerCase();
                    return res.author.id === msg.author.id && !onay.includes(choice) && !yanlış.includes(choice);
                };
                const guess = await msg.channel.awaitMessages(filter, {
                    max: 1,
                    time: 300000
                });
                if (!guess.size) {
                    await msg.reply(`30 saniyen doldu!`);
                    break;
                }
                const choice = guess.first().content.toLowerCase();
                if (choice === 'end') break;
                if (choice.length > 1 && choice === cevap) {
                    tahmin = true;
                    break;
                } else if (cevap.includes(choice)) {
                    displayText = true;
                    for (let i = 0; i < cevap.length; i++) {
                        if (cevap.charAt(i) !== choice) continue; 
                        onay.push(cevap.charAt(i));
                        display[i] = cevap.charAt(i);
                    }
                } else {
                    displayText = false;
                    if (choice.length === 1) yanlış.push(choice);
                    puan++;
                }
            }
            durum.delete(msg.channel.id);
            if (cevap.length === onay.length || tahmin) return msg.channel.send(`:tada: Tebrikler, kelimeyi buldun \nİşte kelimen: **${cevap}!**`);
            return msg.channel.send(`Bilemediğin Kelime; **${cevap}**`);
        } catch (err) {
            durum.delete(msg.channel.id);
            return msg.reply(`Hata Destek sunucusuna gelerek yekililere bildirin \`${err.message}\``);
        }
    

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["adam-asmaca"],
  permlevel: 0 ,
  kategori:"eğlence"
};
exports.help = {
  komut: 'adamasmaca',
  description: 'adam Asmaca oynarsınız',
  usage: 'adamasmaca'
};