const { Telegraf } = require('telegraf');
const bot = new Telegraf('1789096338:AAGIgiFs1tyuskjjqv0MaNYKGykRWLqQbAY');

var herf;
var isPlaying;
var player;

bot.start(ctx => {
  bot.telegram.sendMessage(
    ctx.chat.id,
    `${String.fromCodePoint(
      0x1f48e
    )} Oyun botuna xoş gəldiniz.\n${String.fromCodePoint(
      0x2753
    )} Botu necə işlətməli olduğunuzu öyrənmək istəyirsinizsə /help yazın.\n\n${String.fromCodePoint(
      0x00a9
    )} Bot @Fariz_hesenof tərəfindən yaradılıb.\n${String.fromCodePoint(
      0x1f4ee
    )} Kanal:@Black_stagram`
  );
});

bot.help(ctx => {
  ctx.reply(
    `${String.fromCodePoint(
      0x1f3af
    )} Bu bot son hərfə uyğun söz tapma oyunudur. Botu aşağıda yazılan şəkildə işlədə bilərsiniz:\n\n${String.fromCodePoint(
      0x0031
    )}${String.fromCodePoint(0xfe0f)}${String.fromCodePoint(
      0x20e3
    )}. /start - Botu başlatmaq üçün\n${String.fromCodePoint(
      0x0032
    )}${String.fromCodePoint(0xfe0f)}${String.fromCodePoint(
      0x20e3
    )}. /help - Botu necə işlətməli olduğunuzu öyrənmək üçün\n${String.fromCodePoint(
      0x0032
    )}${String.fromCodePoint(0xfe0f)}${String.fromCodePoint(
      0x20e3
    )}. /gstart {söz} - Yazılan sözlə oyunu başlatmaq.\n${String.fromCodePoint(
      0x0033
    )}${String.fromCodePoint(0xfe0f)}${String.fromCodePoint(
      0x20e3
    )}. /gstop - Oyunu bitirmək üçün\n\n${String.fromCodePoint(
      0x2705
    )} Botda oyun başlatdıqdan sonra istəyən insan onun son hərfi ilə söz yaza bilər. Digər insan isə son sözün son hərfiylə söz yazmalıdır. Səhv söz yazıldıqda oyun bitir.`
  );
});

bot.command('gstart', ctx => {
  if (ctx.chat.type == 'private') {
    bot.telegram.sendMessage(
      ctx.chat.id,
      `${String.fromCodePoint(
        0x26d4
      )} Bu bot qrupda oynamaq üçün düzəldilib. Botu işlətmək üçün qrupa əlavə edib admin edin.`
    );
  } else {
    player = ctx.update.message.from.username;
    isPlaying = true;
    const message = ctx.update.message.text;
    const soz = message.slice(8, 100);
    const last = message.charAt(message.length - 1).toLowerCase();
    if (soz == '') {
      bot.telegram.sendMessage(
        ctx.chat.id,
        `${String.fromCodePoint(
          0x26a0
        )} Zəhmət olmasa /gstart komandasından sonra söz daxil edin.`
      );
    } else {
      bot.telegram.sendMessage(
        ctx.chat.id,
        `${String.fromCodePoint(0x1f587)} Oyun başladı.\n${String.fromCodePoint(
          0x1f4cc
        )} Söz tapılmalı olan hərf: ${last}`
      );
      herf = last;
    }
  }
});

bot.command('gstop', ctx => {
  herf = '';
  player = '';

  if (isPlaying) {
    ctx.reply(`${String.fromCodePoint(0x2714)} Oyun bitdi.`);
    isPlaying = false;
  } else {
    ctx.reply(`${String.fromCodePoint(0x2714)} Oyun onsuz da bitib.`);
  }
});

bot.on('message', ctx => {
  if (herf == '') {
  } else {
    if (player == ctx.update.message.from.username) {
      bot.telegram.sendMessage(
        ctx.chat.id,
        `${String.fromCodePoint(0x26a0)} ${
          ctx.update.message.from.first_name
        } öz növbənizi gözləyin.`
      );
      isPlaying = true;
    } else {
      const msg = ctx.update.message.text.charAt(0).toLowerCase();
      player = ctx.update.message.from.username;
      switch (msg) {
        case herf:
          const message = ctx.update.message.text;
          const last = message.charAt(message.length - 1);
          if (last == 'ı' || last == 'ğ') {
            herf = '';
            isPlaying = false;
            bot.telegram.sendMessage(
              ctx.chat.id,
              `${String.fromCodePoint(0x1f4ab)} ${
                ctx.update.message.from.first_name
              } sonu "${last}" hərfi ilə bitən söz yazaraq qalib oldu.`
            );
          } else {
            bot.telegram.sendMessage(
              ctx.chat.id,
              `${String.fromCodePoint(0x1f4ab)} ${
                ctx.update.message.from.first_name
              } doğru yazdınız.\n${String.fromCodePoint(
                0x1f4cc
              )} Söz tapılmalı olan hərf: ${last}`
            );
            herf = last;
          }
          break;
        default:
          bot.telegram.sendMessage(
            ctx.chat.id,
            `${String.fromCodePoint(0x1f4a2)} ${
              ctx.update.message.from.first_name
            } yanlış yazdınız və məğlub oldunuz. Başdan başlayın.`
          );
          herf = '';
          isPlaying = false;
          break;
      }
    }
  }
});

bot.launch();
