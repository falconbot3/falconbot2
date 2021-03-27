const {
     WAConnection,
     Tipo de mensagem,
     Presença,
     Mimetype,
     GroupSettingChange
 } = requer ('@ adiwajshing / baileys')
 const {color, bgcolor} = require ('./ lib / color')
 const {help} = require ('./ src / help')
 const {wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close} = require ('./ lib / functions')
 const {fetchJson} = require ('./ lib / fetcher')
 const {reconhecer} = exigir ('./ lib / ocr')
 const fs = require ('fs')
 momento const = requer ('fuso horário do momento')
 const {exec} = requer ('child_process')
 const fetch = require ('node-fetch')
 const tiktod = require ('tiktok-scraper')
 const ffmpeg = require ('fluent-ffmpeg')
 const {removeBackgroundFromImageFile} = require ('remove.bg')
 const lolis = require ('lolis.life')
 const loli = novo lolis ()
 const welkom = JSON.parse (fs.readFileSync ('./ src / welkom.json'))
 const nsfw = JSON.parse (fs.readFileSync ('./ src / nsfw.json'))
 const samih = JSON.parse (fs.readFileSync ('./ src / simi.json'))
 prefixo = '.'
 bloqueado = []

 function kyun (segundos) {
   pad (s) de função {
     return (s <10? '0': '') + s;
   }
   var horas = Math.floor (segundos / (60 * 60));
   var minutos = Math.floor (segundos% (60 * 60) / 60);
   var segundos = Math.floor (segundos% 60);

   // retorna pad (horas) + ':' + pad (minutos) + ':' + pad (segundos)
   return `$ {pad (horas)} Jam $ {pad (minutos)} Menit $ {pad (segundos)} Detik`
 }

 função assíncrona inicia () {
 const client = new WAConnection ()
 client.logger.level = 'warn'
 console.log (banner.string)
 client.on ('qr', () => {
 console.log (color ('[', 'white'), color ('!', 'red'), color (']', 'white'), color ('Leia o código qr acima'))
 })

 fs.existsSync ('./ BarBar.json') && client.loadAuthInfo ('./ BarBar.json')
 client.on ('conectando', () => {
 iniciar ('2', 'Conectando ...')
 })
 client.on ('abrir', () => {
 sucesso ('2', 'Conectado')
 })
 aguarde client.connect ({timeoutMs: 30 * 1000})
         fs.writeFileSync ('./ BarBar.json', JSON.stringify (client.base64EncodedAuthInfo (), null, '\ t'))

 client.on ('grupo-participantes-atualização', async (anu) => {
 if (! welkom.includes (anu.jid)) return
 tentar {
 const mdata = await client.groupMetadata (anu.jid)
 console.log (anu)
 if (anu.action == 'add') {
 num = anu.participantes [0]
 tentar {
 ppimg = await client.getProfilePicture (`$ {anu.participants [0] .split ('@') [0]} @ c.us`)
 } pegar {
 ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
 }
 teks = `olá @ $ {num.split ('@') [0]} 😄 seja bem vindo ao * $ {mdata.subject} *`
 let buff = await getBuffer (ppimg)
 client.sendMessage (mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"givenJid": [num]}})
 } else if (anu.action == 'remove') {
 num = anu.participantes [0]
 tentar {
 ppimg = await client.getProfilePicture (`$ {num.split ('@') [0]} @ c.us`)
 } pegar {
 ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
 }
 teks = `tchau @ $ {num.split ('@') [0]} foi bom ter você aqui😅😅`
 let buff = await getBuffer (ppimg)
 client.sendMessage (mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"givenJid": [num]}})
 }
 } catch (e) {
 console.log ('Erro:% s', cor (e, 'vermelho'))
 }
 })

 client.on ('CB: Blocklist', json => {
             if (blocks.length> 2) return
 para (deixe i de json [1] .blocklist) {
 Block.push (i.replace ('c.us', 's.whatsapp.net'))
 }
 })

 client.on ('chat-update', async (mek) => {
 tentar {
                         if (! mek.hasNewMessage) return
                         mek = JSON.parse (JSON.stringify (mek)). mensagens [0]
 if (! mek.message) return
 if (mek.key && mek.key.remoteJid == 'status @ broadcast') return
 if (mek.key.fromMe) return
 global.prefix
 global.blocked
 const content = JSON.stringify (mek.message)
 const from = mek.key.remoteJid
 const type = Object.keys (mek.message) [0]
 const apiKey = 'Your-Api-Key'
 const {text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product} = MessageType
 const time = moment.tz ('Asia / Jakarta'). format ('DD / MM HH: mm: ss')
 body = (digite === 'conversa' && mek.message.conversation.startsWith (prefixo))?  mek.message.conversation: (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith (prefixo)?  mek.message.imageMessage.caption: (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith (prefixo)?  mek.message.videoMessage.caption: (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith (prefixo)?  mek.message.extendedTextMessage.text: ''
 budy = (digite === 'conversa')?  mek.message.conversation: (type === 'extendedTextMessage')?  mek.message.extendedTextMessage.text: ''
 comando const = body.slice (1) .trim (). split (/ + /). shift (). toLowerCase ()
 const args = body.trim (). split (/ + /). slice (1)
 const isCmd = body.startsWith (prefixo)

 bagunça = {
 aguarde: '⌛ ​​* EM PROCESSO AMIGO, TOME UM SUCO DE CAJU POR ENQUANTO * 😜 ⌛',
 sucesso: '* PRONTO, VALEU A PENA ESPERAR? * 😏 ️',
 erro: {
 stick: '❌ * FALHA AO CONVERTER IMAGENS EM ADESIVOS * ❌',
 Iv: '❌ * LINK INVÁLIDO * ❌'
 },
 só: {
 grupo: '❌ * ESTE COMANDO SÓ PODE SER USADO EM GRUPOS * ❌',
 proprietárioG: '❌ * ESTE COMANDO SÓ PODE SER USADO PELO GRUPO DO PROPRIETÁRIO * ❌',
 proprietárioB: '❌ * ESTE COMANDO SÓ PODE SER USADO PELO PROPRIETÁRIO * ❌',
 admin: '❌ * ESTE COMANDO SÓ PODE SER USADO POR ADMINISTRADORES * ❌',
 Badmin: '❌ * ESTE COMANDO SÓ PODE SER USADO QUANDO O BOT SE TORNAR ADM * ❌'
 }
 }

 const botNumber = client.user.jid
 const ownerNumber = ["21993471668@s.whatsapp.net"] // substitua pelo seu número
 const isGroup = from.endsWith ('@ g.us')
 const sender = isGroup?  mek.participant: mek.key.remoteJid
 const groupMetadata = isGroup?  aguarde client.groupMetadata (from): ''
 const groupName = isGroup?  groupMetadata.subject: ''
 const groupId = isGroup?  groupMetadata.jid: ''
 const groupMembers = isGroup?  groupMetadata.participants: ''
 const groupAdmins = isGroup?  getGroupAdmins (groupMembers): ''
 const isBotGroupAdmins = groupAdmins.includes (botNumber) ||  falso
 const isGroupAdmins = groupAdmins.includes (remetente) ||  falso
 const isWelkom = isGroup?  welkom.includes (from): false
 const isNsfw = isGroup?  nsfw.includes (de): falso
 const isSimi = isGroup?  samih.includes (from): false
 const isOwner = ownerNumber.includes (sender)
 const isUrl = (url) => {
 return url.match (new RegExp (/ https?: \ / \ / (www \.)? [- a-zA-Z0-9 @:% ._ + ~ # =] {1,256} \. [a-zA  -Z0-9 ()] {1,6} \ b ([- a-zA-Z0-9 () @:% _ +. ~ #? & / =] *) /, 'Gi'))
 }
 resposta const = (teks) => {
 client.sendMessage (from, teks, text, {quoted: mek})
 }
 const sendMess = (hehe, teks) => {
 client.sendMessage (hehe, teks, texto)
 }
 const menções = (teks, memberr, id) => {
 (id == null || id == undefined || id == false)?  client.sendMessage (from, teks.trim (), extendedText, {contextInfo: {"givenJid": memberr}}): client.sendMessage (from, teks.trim (), extendedText, {quoted: mek, contextInfo: {"  mencionadoJid ": membro}})
 }

 cores = ['vermelho', 'branco', 'preto', 'azul', 'amarelo', 'verde']
 const isMedia = (type === 'imageMessage' || type === 'videoMessage')
 const isQuotedImage = type === 'extendedTextMessage' && content.includes ('imageMessage')
 const isQuotedVideo = type === 'extendedTextMessage' && content.includes ('videoMessage')
 const isQuotedSticker = type === 'extendedTextMessage' && content.includes ('stickerMessage')
 if (! isGroup && isCmd) console.log ('\ x1b [1; 31m ~ \ x1b [1; 37m>', '[\ x1b [1; 32mEXEC \ x1b [1; 37m]', tempo, cor (comando  ), 'de', cor (sender.split ('@') [0]), 'args:', cor (args.length))
 if (! isGroup &&! isCmd) console.log ('\ x1b [1; 31m ~ \ x1b [1; 37m>', '[\ x1b [1; 31mRECV \ x1b [1; 37m]', tempo, cor (  'Message'), 'from', color (sender.split ('@') [0]), 'args:', color (args.length))
 if (isCmd && isGroup) console.log ('\ x1b [1; 31m ~ \ x1b [1; 37m>', '[\ x1b [1; 32mEXEC \ x1b [1; 37m]', hora, cor (comando)  , 'from', color (sender.split ('@') [0]), 'in', color (groupName), 'args:', color (args.length))
 if (! isCmd && isGroup) console.log ('\ x1b [1; 31m ~ \ x1b [1; 37m>', '[\ x1b [1; 31mRECV \ x1b [1; 37m]', tempo, cor ('  Message '),' from ', color (sender.split (' @ ') [0]),' in ', color (groupName),' args: ', color (args.length))
 switch (comando) {
 case 'help':
 case 'menu':
 client.sendMessage (de, ajuda (prefixo), texto)
 intervalo
 caso 'info':
 me = client.user
 uptime = process.uptime ()
 teks = `* Nome do bot *: $ {me.name} \ n * Número do bot *: @ $ {me.jid.split ('@') [0]} \ n * Prefixo *: $ {prefix}  \ n * Total de contatos bloqueados *: $ {blocks.length} \ n * bot ativo desde *: $ {kyun (uptime)} `
 buffer = await getBuffer (me.imgUrl)
 client.sendMessage (from, buffer, image, {caption: teks, contextInfo: {associatedJid: [me.jid]}})
 intervalo
 case 'listablock':
 teks = 'essa é uma lista de números bloqueados: \ n'
 para (deixe bloquear de bloqueado) {
 teks + = `~> @ $ {block.split ('@') [0]} \ n`
 }
 teks + = `Total: $ {blocks.length}`
 client.sendMessage (from, teks.trim (), extendedText, {quoted: mek, contextInfo: {"associatedJid": locked}})
 intervalo
 case 'ocr':
 if ((isMedia &&! mek.message.videoMessage || isQuotedImage) && args.length == 0) {
 const encmedia = isQuotedImage?  JSON.parse (JSON.stringify (mek) .replace ('quotedM', 'm')). Message.extendedTextMessage.contextInfo: mek
 const media = await client.downloadAndSaveMediaMessage (encmedia)
 responder (mess.wait)
 aguardar reconhecer (media, {lang: 'eng + ind', oem: 1, psm: 3})
 .então (teks => {
 responder (teks.trim ())
 fs.unlinkSync (mídia)
 })
 .catch (err => {
 responder (err.mensagem)
 fs.unlinkSync (mídia)
 })
 } outro {
 responder ('Foto aja mas')
 }
 intervalo
 case 'stiker':
 estojo 'adesivo':
 if ((isMedia &&! mek.message.videoMessage || isQuotedImage) && args.length == 0) {
 const encmedia = isQuotedImage?  JSON.parse (JSON.stringify (mek) .replace ('quotedM', 'm')). Message.extendedTextMessage.contextInfo: mek
 const media = await client.downloadAndSaveMediaMessage (encmedia)
 ran = getRandom ('. webp')
 aguardar ffmpeg (`./$ {media}`)
 .input (mídia)
 .on ('iniciar', função (cmd) {
 console.log (`Iniciado: $ {cmd}`)
 })
 .on ('erro', função (errar) {
 console.log (`Erro: $ {err}`)
 fs.unlinkSync (mídia)
 responder (mess.error.stick)
 })
 .on ('fim', função () {
 console.log ('Concluir')
 client.sendMessage (de, fs.readFileSync (executado), adesivo, {quoted: mek})
 fs.unlinkSync (mídia)
 fs.unlinkSync (executado)
 })
 .addOutputOptions ([`-vcodec`,` libwebp`, `-vf`,` scale = 'min (320, iw)': min '(320, ih)': force_original_aspect_ratio = diminuir, fps = 15, pad = 320  : 320: -1: -1: color=white@0.0, split [a] [b]; [a] palettegen = reserve_transparent = on: transparent_color = ffffff [p]; [b] [p] paletteuse`])
 .toFormat ('webp')
 .save (executado)
 } else if ((isMedia && mek.message.videoMessage.seconds <11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds <11) && args.length == 0) {
 const encmedia = isQuotedVideo?  JSON.parse (JSON.stringify (mek) .replace ('quotedM', 'm')). Message.extendedTextMessage.contextInfo: mek
 const media = await client.downloadAndSaveMediaMessage (encmedia)
 ran = getRandom ('. webp')
 responder (mess.wait)
 aguardar ffmpeg (`./$ {media}`)
 .inputFormat (media.split ('.') [1])
 .on ('iniciar', função (cmd) {
 console.log (`Iniciado: $ {cmd}`)
 })
 .on ('erro', função (errar) {
 console.log (`Erro: $ {err}`)
 fs.unlinkSync (mídia)
 tipe = media.endsWith ('. mp4')?  'video': 'gif'
 responder (`❌ Gagal, pada saat mengkonversi $ {tipe} ke stiker`)
 })
 .on ('fim', função () {
 console.log ('Concluir')
 client.sendMessage (de, fs.readFileSync (executado), adesivo, {quoted: mek})
 fs.unlinkSync (mídia)
 fs.unlinkSync (executado)
 })
 .addOutputOptions ([`-vcodec`,` libwebp`, `-vf`,` scale = 'min (320, iw)': min '(320, ih)': force_original_aspect_ratio = diminuir, fps = 15, pad = 320  : 320: -1: -1: color=white@0.0, split [a] [b]; [a] palettegen = reserve_transparent = on: transparent_color = ffffff [p]; [b] [p] paletteuse`])
 .toFormat ('webp')
 .save (executado)
 } else if ((isMedia || isQuotedImage) && args [0] == 'nobg') {
 const encmedia = isQuotedImage?  JSON.parse (JSON.stringify (mek) .replace ('quotedM', 'm')). Message.extendedTextMessage.contextInfo: mek
 const media = await client.downloadAndSaveMediaMessage (encmedia)
 ranw = getRandom ('. webp')
 ranp = getRandom ('. png')
 responder (mess.wait)
 keyrmbg = 'Your-ApiKey'
 aguarde removeBackgroundFromImageFile ({path: media, apiKey: keyrmbg, size: 'auto', type: 'auto', ranp}). then (res => {
 fs.unlinkSync (mídia)
 let buffer = Buffer.from (res.base64img, 'base64')
 fs.writeFileSync (ranp, buffer, (err) => {
 if (err) retornar a resposta ('Gagal, Terjadi kesalahan, silahkan coba beberapa saat lagi.')
 })
 exec (`ffmpeg -i $ {ranp} -vcodec libwebp -filter: v fps = fps = 20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512: 512 $ {ranw}`, (err)  => {
 fs.unlinkSync (ranp)
 if (err) retornar resposta (mess.error.stick)
 client.sendMessage (de, fs.readFileSync (ranw), adesivo, {quoted: mek})
 })
 })
 / *} else if ((isMedia || isQuotedImage) && colors.includes (args [0])) {
 const encmedia = isQuotedImage?  JSON.parse (JSON.stringify (mek) .replace ('quotedM', 'm')). Message.extendedTextMessage.contextInfo: mek
 const media = await client.downloadAndSaveMediaMessage (encmedia)
 ran = getRandom ('. webp')
 aguardar ffmpeg (`./$ {media}`)
 .on ('iniciar', função (cmd) {
 console.log ('Iniciado:', cmd)
 })
 .on ('erro', função (errar) {
 fs.unlinkSync (mídia)
 console.log ('Erro:', err)
 })
 .on ('fim', função () {
 console.log ('Concluir')
 fs.unlinkSync (mídia)
 client.sendMessage (de, fs.readFileSync (executado), adesivo, {quoted: mek})
 fs.unlinkSync (executado)
 })
 .addOutputOptions ([`-vcodec`,` libwebp`, `-vf`,` scale = 'min (320, iw)': min '(320, ih)': force_original_aspect_ratio = diminuir, fps = 15, pad = 320  : 320: -1: -1: color = $ {args [0]} @ 0.0, dividir [a] [b]; [a] palettegen = reserve_transparent = off; [b] [p] paletteuse`])
 .toFormat ('webp')
 .save (executado) * /
 } outro {
 responder (`Kirim gambar dengan caption $ {prefix} adesivo atau tag gambar yang sudah dikirim`)
 }
 intervalo
 case 'gtts':
 if (args.length <1) return client.sendMessage (from, 'Kode bahasanya mana om?', texto, {quoted: mek})
 const gtts = require ('./ lib / gtts') (args [0])
 if (args.length <2) return client.sendMessage (from, 'Textnya mana om', text, {quoted: mek})
 dtt = body.slice (9)
 ranm = getRandom ('. mp3')
 dtt.length> 600
 ?  responder ('Textnya kebanyakan om')
 : gtts.save (ranm, dtt, function () {
 client.sendMessage (from, fs.readFileSync (ranm), audio, {quoted: mek, mimetype: 'audio / mp4', ptt: true})
 fs.unlinkSync (ranm)
 })
 intervalo
 caso 'meme':
 meme = await fetchJson ('https // kagchi-api.glitch.me / meme / memes', {método: 'get'})
 buffer = await getBuffer (`https://imgur.com/$ {meme.hash} .jpg`)
 client.sendMessage (de, buffer, imagem, {quoted: mek, caption: '.......'})
 intervalo
 / * case 'memeindo':
 memein = espera kagApi.memeindo ()
 buffer = await getBuffer (`https://imgur.com/$ {memein.hash} .jpg`)
 client.sendMessage (de, buffer, imagem, {quoted: mek, caption: '.......'})
 intervalo*/
 case 'setprefix':
 if (args.length <1) return
 if (! isOwner) return reply (mess.only.ownerB)
 prefixo = args [0]
 reply (`Prefix berhasil di ubah menjadi: $ {prefix}`)
 intervalo
 / * case 'loli':
 loli.getSFWLoli (async (err, res) => {
 if (err) return reply ('❌ * ERROR * ❌')
 buffer = await getBuffer (res.url)
 client.sendMessage (from, buffer, image, {quoted: mek, caption: 'Ingat! Citai Lolimu'})
 })
 intervalo
 case 'nsfwloli':
 if (! isNsfw) retornar a resposta ('❌ * FALSE * ❌')
 loli.getNSFWLoli (assíncrono (err, res) => {
 if (err) return reply ('❌ * ERROR * ❌')
 buffer = await getBuffer (res.url)
 client.sendMessage (from, buffer, image, {quoted: mek, caption: 'Jangan jadiin bahan buat comli om'})
 })
 intervalo*/
 case 'hilih':
 if (args.length <1) retornar a resposta ('Teksnya mana um?')
 anu = await fetchJson (`https://mhankbarbars.herokuapp.com/api/hilih?teks=$ {body.slice (7)}`, {method: 'get'})
 responder (anu.result)
 intervalo
 case 'yt2mp3':
 if (args.length <1) return reply ('Urlnya mana um?')
 if (! isUrl (args [0]) &&! args [0] .includes ('youtu')) retornar a resposta (mess.error.Iv)
 anu = await fetchJson (`https://mhankbarbar.tech/api/yta?url=$ {args [0]} & apiKey = $ {apiKey}`, {method: 'get'})
 if (anu.error) return reply (anu.error)
 teks = `* Título *: $ {anu.title} \ n * Tamanho do arquivo *: $ {anu.filesize}`
 thumb = await getBuffer (anu.thumb)
 client.sendMessage (de, polegar, imagem, {quoted: mek, caption: teks})
 buffer = await getBuffer (anu.result)
 client.sendMessage (from, buffer, audio, {mimetype: 'audio / mp4', nome do arquivo: `$ {anu.title} .mp3`, citado: mek})
 intervalo
 case 'ytsearch':
 if (args.length <1) return reply ('Yang mau di cari apaan? titit?')
 anu = await fetchJson (`https://mhankbarbar.tech/api/ytsearch?q=$ {body.slice (10)} & apiKey = $ {apiKey}`, {method: 'get'})
 if (anu.error) return reply (anu.error)
 teks = '================= \ n'
 para (deixe i de anu.result) {
 teks + = `* Título *: $ {i.title} \ n * Id *: $ {i.id} \ n * Publicado *: $ {i.publishTime} \ n * Duração *: $ {i.duration}  \ n * Visualizações *: $ {h2k (i.views)} \ n ================= \ n`
 }
 responder (teks.trim ())
 intervalo
 case 'tiktok':
 if (args.length <1) return reply ('Urlnya mana um?')
 if (! isUrl (args [0]) &&! args [0] .includes ('tiktok.com')) retornar a resposta (mess.error.Iv)
 responder (mess.wait)
 anu = await fetchJson (`https://mhankbarbar.tech/api/tiktok?url=$ {args [0]} & apiKey = $ {apiKey}`, {método: 'get'})
 if (anu.error) return reply (anu.error)
 buffer = await getBuffer (anu.result)
 client.sendMessage (de, buffer, vídeo, {quoted: mek})
 intervalo
 case 'tiktokstalk':
 tentar {
 if (args.length <1) return client.sendMessage (from, 'Usernamenya mana um?', texto, {quoted: mek})
 deixe {usuário, estatísticas} = esperar tiktod.getUserProfileInfo (args [0])
 responder (mess.wait)
 teks = `* ID *: $ {user.id} \ n * Nome de usuário *: $ {user.uniqueId} \ n * Apelido *: $ {user.nickname} \ n * Seguidores *: $ {stats.followerCount} \  n * Seguintes *: $ {stats.followingCount} \ n * Postagens *: $ {stats.videoCount} \ n * Amor *: $ {stats.heart} \ n`
 buffer = await getBuffer (user.avatarLarger)
 client.sendMessage (de, buffer, imagem, {quoted: mek, caption: teks})
 } catch (e) {
 console.log (`Erro:`, cor (e, 'vermelho'))
 responder ('nome de usuário Kemungkinan tidak válido')
 }
 intervalo
 case 'nulis':
 case 'tulis':
 if (args.length <1) retornar a resposta ('Yang mau di tulis apaan?')
 teks = body.slice (7)
 responder (mess.wait)
 anu = await fetchJson (`https://mhankbarbar.tech/nulis?text=$ {teks} & apiKey = $ {apiKey}`, {method: 'get'})
 if (anu.error) return reply (anu.error)
 buff = await getBuffer (anu.result)
 client.sendMessage (de, buff, imagem, {quoted: mek, caption: mess.success})
 intervalo
 case 'url2img':
 tipelist = ['desktop', 'tablet', 'celular']
 if (args.length <1) retornar a resposta ('Tipenya apa um?')
 if (! tipelist.includes (args [0])) return reply ('Tipe desktop | tablet | mobile')
 if (args.length <2) retornar resposta ('Urlnya mana um?')
 if (! isUrl (args [1])) resposta de retorno (mess.error.Iv)
 responder (mess.wait)
 anu = await fetchJson (`https://mhankbarbar.tech/api/url2image?tipe=$ {args [0]} & url = $ {args [1]} & apiKey = $ {apiKey}`, {método: 'get'  })
 if (anu.error) return reply (anu.error)
 buff = await getBuffer (anu.result)
 client.sendMessage (de, buff, imagem, {quoted: mek})
 intervalo
 case 'tstiker':
 case 'tsticker':
 if (args.length <1) return reply ('Textnya mana um?')
 ranp = getRandom ('. png')
 rano = getRandom ('. webp')
 teks = body.slice (9) .trim ()
 anu = await fetchJson (`https://mhankbarbar.tech/api/text2image?text=$ {teks} & apiKey = $ {apiKey}`, {method: 'get'})
 if (anu.error) return reply (anu.error)
 exec (`wget $ {anu.result} -O $ {ranp} && ffmpeg -i $ {ranp} -vcodec libwebp -filter: v fps = fps = 20 -lossless 1 -loop 0 -preset default -an -vsync 0  -s 512: 512 $ {rano} `, (err) => {
 fs.unlinkSync (ranp)
 if (err) retornar resposta (mess.error.stick)
 client.sendMessage (de, fs.readFileSync (rano), adesivo, {quoted: mek})
 fs.unlinkSync (rano)
 })
 intervalo
 case 'tagall':
 if (! isGroup) retornar resposta (mess.only.group)
 if (! isGroupAdmins) retornar resposta (mess.only.admin)
 members_id = []
 teks = (args.length> 1)?  body.slice (8) .trim (): ''
 teks + = '\ n \ n'
 para (deixe mem de groupMembers) {
 teks + = `* # * @ $ {mem.jid.split ('@') [0]} \ n`
 members_id.push (mem.jid)
 }
 menções (teks, members_id, true)
 intervalo
                                 case 'tagall2':
 members_id = []
 teks = (args.length> 1)?  body.slice (8) .trim (): ''
 teks + = '\ n \ n'
 para (deixe mem de groupMembers) {
 teks + = `╠➥ @ $ {mem.jid.split ('@') [0]} \ n`
 members_id.push (mem.jid)
 }
 responder (teks)
 intervalo
                                 case 'tagall3':
 members_id = []
 teks = (args.length> 1)?  body.slice (8) .trim (): ''
 teks + = '\ n \ n'
 para (deixe mem de groupMembers) {
 teks + = `╠➥ https://wa.me/$ {mem.jid.split ('@') [0]} \ n`
 members_id.push (mem.jid)
 }
 client.sendMessage (from, teks, text, {detectLinks: false, quoted: mek})
 intervalo
 case 'clearall':
 if (! isOwner) return reply ('Kamu siapa?')
 anu = await client.chats.all ()
 client.setMaxListeners (25)
 para (deixe _ de anu) {
 client.deleteChat (_. jid)
 }
 responder ('Sukses delete all chat :)')
 intervalo
 case 'bc':
 if (! isOwner) return reply ('Kamu siapa?')
 if (args.length <1) retornar resposta ('.......')
 anu = await client.chats.all ()
 if (isMedia &&! mek.message.videoMessage || isQuotedImage) {
 const encmedia = isQuotedImage?  JSON.parse (JSON.stringify (mek) .replace ('quotedM', 'm')). Message.extendedTextMessage.contextInfo: mek
 buff = await client.downloadMediaMessage (encmedia)
 para (deixe _ de anu) {
 client.sendMessage (_. jid, buff, imagem, {legenda: `[Ini Broadcast] \ n \ n $ {body.slice (4)}`})
 }
 responder ('transmissão de Suksess')
 } outro {
 para (deixe _ de anu) {
 sendMess (_. jid, `[Ini Broadcast] \ n \ n $ {body.slice (4)}`)
 }
 responder ('transmissão de Suksess')
 }
 intervalo
                                 caso 'promover':
 if (! isGroup) retornar resposta (mess.only.group)
 if (! isGroupAdmins) retornar resposta (mess.only.admin)
 if (! isBotGroupAdmins) retornar resposta (mess.only.Badmin)
 if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
 mencionado = mek.message.extendedTextMessage.contextInfo.mentionedJid
 if (mencionado. comprimento> 1) {
 teks = 'Berhasil Promova \ n'
 para (deixe _ de mencionado) {
 teks + = `@ $ {_. split ('@') [0]} \ n`
 }
 menções (de, mencionado, verdadeiro)
 client.groupRemove (de, mencionado)
 } outro {
 menções (`Berhasil Promover @ $ {mencionado [0] .split ('@') [0]} Grupo de administração Sebagai!`, mencionado, verdadeiro)
 client.groupMakeAdmin (de, mencionado)
 }
 intervalo
 caso 'rebaixar':
 if (! isGroup) retornar resposta (mess.only.group)
 if (! isGroupAdmins) retornar resposta (mess.only.admin)
 if (! isBotGroupAdmins) retornar resposta (mess.only.Badmin)
 if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
 mencionado = mek.message.extendedTextMessage.contextInfo.mentionedJid
 if (mencionado. comprimento> 1) {
 teks = 'Rebaixamento de Berhasil \ n'
 para (deixe _ de mencionado) {
 teks + = `@ $ {_. split ('@') [0]} \ n`
 }
 menções (teks, mencionado, verdadeiro)
 client.groupRemove (de, mencionado)
 } outro {
 menções (`Berhasil Demote @ $ {mencionado [0] .split ('@') [0]} Grupo de membros Menjadi!`, mencionado, verdadeiro)
 client.groupDemoteAdmin (de, mencionado)
 }
 intervalo
 caso 'adicionar':
 if (! isGroup) retornar resposta (mess.only.group)
 if (! isGroupAdmins) retornar resposta (mess.only.admin)
 if (! isBotGroupAdmins) retornar resposta (mess.only.Badmin)
 if (args.length <1) return reply ('Yang mau di add jin ya?')
 if (args [0] .startsWith ('08 ')) resposta de retorno (' Gunakan kode negara mas ')
 tentar {
 num = `$ {args [0] .replace (/ / g, '')} @ s.whatsapp.net`
 client.groupAdd (de, [num])
 } catch (e) {
 console.log ('Erro:', e)
 responder ('Gagal menambahkan target, mungkin karena di private')
 }
 intervalo
 case 'kick':
 if (! isGroup) retornar resposta (mess.only.group)
 if (! isGroupAdmins) retornar resposta (mess.only.admin)
 if (! isBotGroupAdmins) retornar resposta (mess.only.Badmin)
 if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply ('Tag target yang ingin di tendang!')
 mencionado = mek.message.extendedTextMessage.contextInfo.mentionedJid
 if (mencionado. comprimento> 1) {
 teks = 'Perintah di terima, mengeluarkan: \ n'
 para (deixe _ de mencionado) {
 teks + = `@ $ {_. split ('@') [0]} \ n`
 }
 menções (teks, mencionado, verdadeiro)
 client.groupRemove (de, mencionado)
 } outro {
 menções (`Perintah di terima, mengeluarkan: @ $ {mencionado [0] .split ('@') [0]}`, mencionado, verdadeiro)
 client.groupRemove (de, mencionado)
 }
 intervalo
 case 'listadmins':
 if (! isGroup) retornar resposta (mess.only.group)
 teks = `Lista admin do grupo * $ {groupMetadata.subject} * \ nTotal: $ {groupAdmins.length} \ n \ n`
 não = 0
 para (vamos advertir de groupAdmins) {
 não + = 1
 teks + = `[$ {no.toString ()}] @ $ {admon.split ('@') [0]} \ n`
 }
 menções (teks, groupAdmins, true)
 intervalo
                                 case 'linkgroup':
                                         if (! isGroup) retornar resposta (mess.only.group)
                                         if (! isGroupAdmins) retornar resposta (mess.only.admin)
                                         if (! isBotGroupAdmins) retornar resposta (mess.only.Badmin)
                                         linkgc = await client.groupInviteCode (de)
                                         responder ('https://chat.whatsapp.com/'+linkgc)
                                         intervalo
                                 case 'leave':
                                         if (! isGroup) retornar resposta (mess.only.group)
                                         if (isGroupAdmins || isOwner) {
                                             client.groupLeave (de)
                                         } outro {
                                             responder (mess.only.admin)
                                         }
                                         intervalo
 case 'toimg':
 if (! isQuotedSticker) return reply ('❌ reply stickernya um ❌')
 responder (mess.wait)
 encmedia = JSON.parse (JSON.stringify (mek) .replace ('quotedM', 'm')). message.extendedTextMessage.contextInfo
 media = await client.downloadAndSaveMediaMessage (encmedia)
 ran = getRandom ('. png')
 exec (`ffmpeg -i $ {media} $ {ran}`, (err) => {
 fs.unlinkSync (mídia)
 if (err) return reply ('❌ Gagal, pada saat mengkonversi sticker ke gambar ❌')
 buffer = fs.readFileSync (executado)
 client.sendMessage (de, buffer, imagem, {quoted: mek, caption: '> // <'})
 fs.unlinkSync (executado)
 })
 intervalo
 case 'simi':
 if (args.length <1) return reply ('Textnya mana um?')
 teks = body.slice (5)
 anu = await simih (teks) // fetchJson (`https://mhankbarbars.herokuapp.com/api/samisami?text=$ {teks}`, {method: 'get'})
 // if (anu.error) return reply ('Simi ga tau kak')
 responder (anu)
 intervalo
 case 'simih':
 if (! isGroup) retornar resposta (mess.only.group)
 if (! isGroupAdmins) retornar resposta (mess.only.admin)
 if (args.length <1) resposta de retorno ('Hmmmm')
 if (Número (args [0]) === 1) {
 if (isSimi) return reply ('Mode simi sudah aktif')
 samih.push (de)
 fs.writeFileSync ('./ src / simi.json', JSON.stringify (samih))
 responder ('Sukses mengaktifkan mode simi di group ini ✔️')
 } else if (Number (args [0]) === 0) {
 samih.splice (de, 1)
 fs.writeFileSync ('./ src / simi.json', JSON.stringify (samih))
 responder ('Sukes menonaktifkan mode simi di group ini ✔️')
 } outro {
 responder ('1 untuk mengaktifkan, 0 untuk menonaktifkan')
 }
 intervalo
 case 'bem-vindo':
 if (! isGroup) retornar resposta (mess.only.group)
 if (! isGroupAdmins) retornar resposta (mess.only.admin)
 if (args.length <1) resposta de retorno ('Hmmmm')
 if (Número (args [0]) === 1) {
 if (isWelkom) return reply ('Udah aktif um')
 welkom.push (de)
 fs.writeFileSync ('./ src / welkom.json', JSON.stringify (welkom))
 responder ('Sukses mengaktifkan fitur welcome di group ini ✔️')
 } else if (Number (args [0]) === 0) {
 welkom.splice (de, 1)
 fs.writeFileSync ('./ src / welkom.json', JSON.stringify (welkom))
 responder ('Sukses menonaktifkan fitur welcome di group ini ✔️')
 } outro {
 responder ('1 untuk mengaktifkan, 0 untuk menonaktifkan')
 }
                                       intervalo
 caso 'clone':
 if (! isGroup) retornar resposta (mess.only.group)
 if (! isGroupAdmins) retornar resposta (mess.only.admin)
 if (args.length <1) return reply ('Tag target yang ingin di clone')
 if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply ('Tag cvk')
 mencionado = mek.message.extendedTextMessage.contextInfo.mentionedJid [0]
 deixe {jid, id, notificar} = groupMembers.find (x => x.jid === mencionado)
 tentar {
 pp = await client.getProfilePicture (id)
 buffer = await getBuffer (pp)
 client.updateProfilePicture (botNumber, buffer)
 menções (`Foto profile Berhasil di perbarui menggunakan foto profile @ $ {id.split ('@') [0]}`, [jid], true)
 } catch (e) {
 responder ('Gagal om')
 }
 intervalo
 caso 'esperar':
 if ((isMedia &&! mek.message.videoMessage || isQuotedImage) && args.length == 0) {
 responder (mess.wait)
 const encmedia = isQuotedImage?  JSON.parse (JSON.stringify (mek) .replace ('quotedM', 'm')). Message.extendedTextMessage.contextInfo: mek
 media = await client.downloadMediaMessage (encmedia)
 esperar, esperar (mídia). então (res => {
 client.sendMessage (de, res.video, vídeo, {quoted: mek, caption: res.teks.trim ()})
 }). catch (err => {
 responder (errar)
 })
 } outro {
 responder ('*SÓ UMA FOTO POW*')
 }
 intervalo
 predefinição:
 if (isGroup && isSimi && budy! = undefined) {
 console.log (amigo)
 muehe = espera simih (amigo)
 console.log (muehe)
 responder (muehe)
 } outro {
 return //console.log(color('[WARN]','red '),' Comando não registrado de ', color (sender.split (' @ ') [0]))
 }
                            }
 } catch (e) {
 console.log ('Erro:% s', cor (e, 'vermelho'))
 }
 })
 }
 começa ()