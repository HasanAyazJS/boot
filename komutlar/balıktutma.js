const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message) => {
   message.channel.send('Balık tuttun ıhh-hıhh balık geliyor!!').then(message => {
   var baliklar = ['``Sazan Tuttun!`` 🐟' ,'``Köpek Balığı Tuttun Maşallah kasların fenaymış`` :D' ,'``Uskumru Tuttun!`` 🐟' ,'``Mezgit Tuttun! Havyarıda varmış afiyet olsun bize yok mu ?`` 🙂 🐟' ,'``Japon Balığı Tuttun Yemeyi Düşünmüyorsun Herhalde?``' ,'``Hamsi Tuttun!`` 🐟' ,'``Levrek Tuttun!`` 🐟' ,'``Hiçbirşey Tutamadın Maalesef!`` 🗑️' ,'``Alabalık Tuttun!`` 🐟' ,'``Maalesef Balık Oltadan Kaçtı!`` 🗑️' ,'``İstavrit Tuttun!`` 🐟'];
      var balik = baliklar[Math.floor(Math.random() * baliklar.length)];
            message.edit(`${balik}`);
 });
  }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['balık', 'balıktut', 'balık-tut'],
  permLevel: 0 , kategori:"eğlence"
};
exports.help = {
  komut: 'balıktut',
  description: 'Balık Tutarsın.',
  usage: 'balıktut'
};