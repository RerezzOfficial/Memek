const _0x542c19=_0x47db;(function(_0x3b512b,_0xeec518){const _0x2270da=_0x47db,_0x99e11f=_0x3b512b();while(!![]){try{const _0x9c65ea=-parseInt(_0x2270da(0x25a))/0x1*(parseInt(_0x2270da(0x266))/0x2)+parseInt(_0x2270da(0x29c))/0x3*(parseInt(_0x2270da(0x28e))/0x4)+-parseInt(_0x2270da(0x225))/0x5*(-parseInt(_0x2270da(0x220))/0x6)+parseInt(_0x2270da(0x241))/0x7+-parseInt(_0x2270da(0x1fd))/0x8*(-parseInt(_0x2270da(0x2a5))/0x9)+-parseInt(_0x2270da(0x29a))/0xa*(parseInt(_0x2270da(0x208))/0xb)+-parseInt(_0x2270da(0x281))/0xc;if(_0x9c65ea===_0xeec518)break;else _0x99e11f['push'](_0x99e11f['shift']());}catch(_0x3016ef){_0x99e11f['push'](_0x99e11f['shift']());}}}(_0x2f12,0xd97ff),process['on'](_0x542c19(0x261),console[_0x542c19(0x24b)]),require(_0x542c19(0x28c)));function _0x47db(_0x4f8306,_0x55972b){const _0x2f1231=_0x2f12();return _0x47db=function(_0x47dbcb,_0x5d4737){_0x47dbcb=_0x47dbcb-0x1f4;let _0x2cec0e=_0x2f1231[_0x47dbcb];return _0x2cec0e;},_0x47db(_0x4f8306,_0x55972b);}const {default:makeWASocket,useMultiFileAuthState,DisconnectReason,fetchLatestBaileysVersion,generateForwardMessageContent,prepareWAMessageMedia,generateWAMessageFromContent,generateMessageID,downloadContentFromMessage,makeInMemoryStore,jidDecode,getAggregateVotesInPollMessage,proto}=require('@whiskeysockets/baileys'),fs=require('fs'),pino=require(_0x542c19(0x298)),chalk=require(_0x542c19(0x257)),color=require(_0x542c19(0x20f)),path=require(_0x542c19(0x296)),axios=require(_0x542c19(0x22e)),FileType=require('file-type'),readline=require('readline'),yargs=require('yargs/yargs'),os=require('os'),{HttpsProxyAgent}=require(_0x542c19(0x240)),agent=new HttpsProxyAgent(_0x542c19(0x28a)),_=require(_0x542c19(0x2b4)),{Boom}=require('@hapi/boom'),PhoneNumber=require(_0x542c19(0x297)),{imageToWebp,imageToWebp3,videoToWebp,writeExifImg,writeExifImgAV,writeExifVid}=require(_0x542c19(0x227)),{smsg,isUrl,generateMessageTag,getBuffer,getSizeMedia,fetchJson,await,sleep}=require('./lib/myfunc'),rl=readline[_0x542c19(0x24a)]({'input':process[_0x542c19(0x26b)],'output':process[_0x542c19(0x205)]}),question=_0x3d0826=>new Promise(_0x4b8656=>rl[_0x542c19(0x259)](_0x3d0826,_0x4b8656));var low;try{low=require(_0x542c19(0x246));}catch(_0x5308f8){low=require('./lib/lowdb');}const {Low,JSONFile}=low,mongoDB=require(_0x542c19(0x1f6)),store=makeInMemoryStore({'logger':pino()[_0x542c19(0x274)]({'level':_0x542c19(0x252),'stream':_0x542c19(0x25b)})});global[_0x542c19(0x285)]=new Object(yargs(process[_0x542c19(0x268)]['slice'](0x2))['exitProcess'](![])['parse']()),global['db']=new Low(/https?:\/\//[_0x542c19(0x25e)](opts['db']||'')?new cloudDBAdapter(opts['db']):/mongodb/[_0x542c19(0x25e)](opts['db'])?new mongoDB(opts['db']):new JSONFile(_0x542c19(0x294))),global[_0x542c19(0x22a)]=global['db'],global['loadDatabase']=async function loadDatabase(){const _0x489ba8=_0x542c19;if(global['db']['READ'])return new Promise(_0x5d91b7=>setInterval(function(){const _0x2059d4=_0x47db;!global['db'][_0x2059d4(0x233)]?(clearInterval(this),_0x5d91b7(global['db'][_0x2059d4(0x1fe)]==null?global[_0x2059d4(0x27d)]():global['db']['data'])):null;},0x1*0x3e8));if(global['db'][_0x489ba8(0x1fe)]!==null)return;global['db']['READ']=!![],await global['db']['read'](),global['db']['READ']=![],global['db']['data']={'users':{},'chats':{},'game':{},'database':{},'settings':{},'setting':{},'others':{},'sticker':{},...global['db'][_0x489ba8(0x1fe)]||{}},global['db'][_0x489ba8(0x1f8)]=_['chain'](global['db'][_0x489ba8(0x1fe)]);},loadDatabase();function _0x2f12(){const _0x42b6a3=['replace','writeFile','fromMe','name','updateBlockStatus','promises','readFileSync','close','14952726sleqlP','\x0a⣿⣯⣿⣟⣟⡼⣿⡼⡿⣷⣿⣿⣿⠽⡟⢋⣿⣿⠘⣼⣷⡟⠻⡿⣷⡼⣝⡿⡾⣿\x0a⣿⣿⣿⣿⢁⣵⡇⡟⠀⣿⣿⣿⠇⠀⡇⣴⣿⣿⣧⣿⣿⡇⠀⢣⣿⣷⣀⡏⢻⣿\x0a⣿⣿⠿⣿⣿⣿⠷⠁⠀⠛⠛⠋⠀⠂⠹⠿⠿⠿⠿⠿⠉⠁⠀⠘⠛⠛⠛⠃⢸⣯\x0a⣿⡇⠀⣄⣀⣀⣈⣁⠈⠉⠃⠀⠀⠀⠀⠀⠀⠀⠀⠠⠎⠈⠀⣀⣁⣀⣀⡠⠈⠉\x0a⣿⣯⣽⡿⢟⡿⠿⠛⠛⠿⣶⣄⠀⠀⠀⠀⠀⠀⠈⢠⣴⣾⠛⠛⠿⠻⠛⠿⣷⣶\x0a⣿⣿⣿⠀⠀⠀⣿⡿⣶⣿⣫⠉⠀⠀⠀⠀⠀⠀⠀⠈⠰⣿⠿⠾⣿⡇⠀⠀⢺⣿\x0a⣿⣿⠻⡀⠀⠀⠙⠏⠒⡻⠃⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠐⡓⢚⠟⠁⠀⠀⡾⢫\x0a⣿⣿⠀⠀⡀⠀⠀⡈⣉⡀⡠⣐⣅⣽⣺⣿⣯⡡⣴⣴⣔⣠⣀⣀⡀⢀⡀⡀⠀⣸\x0a⣿⣿⣷⣿⣟⣿⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢻⢾⣷⣿\x0a⣿⣿⣟⠫⡾⠟⠫⢾⠯⡻⢟⡽⢶⢿⣿⣿⡛⠕⠎⠻⠝⠪⢖⠝⠟⢫⠾⠜⢿⣿\x0a⣿⣿⣿⠉⠀⠀⠀⠀⠈⠀⠀⠀⠀⣰⣋⣀⣈⣢⠀⠀⠀⠀⠀⠀⠀⠀⠀⣐⢸⣿\x0a⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿\x0a⣿⣿⣿⣿⣦⡔⠀⠀⠀⠀⠀⠀⢻⣿⡿⣿⣿⢽⣿⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⣿\x0a⣿⣿⣿⣿⣿⣿⣶⣤⣀⠀⠀⠀⠘⠛⢅⣙⣙⠿⠉⠀⠀⠀⢀⣠⣴⣿⣿⣿⣿⣿\x0a⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣤⣄⣅⠀⠓⠀⠀⣀⣠⣴⣺⣿⣿⣿⣿⣿⣿⣿⣿\x0a','Update\x20','anticall','bgBlack','packname','\x0aCONTAC\x20:\x20','downloadMediaMessage','badSession','sticker','@s.whatsapp.net','\x0a┏━━━━━━━━━━━━━━━┓\x0a\x20\x20LOGIN\x20SUKSES\x20✅\x0a┗━━━━━━━━━━━━━━━┛\x0a\x0aWELCOME\x20TO\x20','categories','Connection\x20Lost\x20from\x20Server,\x20reconnecting...','relayMessage','lodash','existsSync','greenBright','map','*\x20tidak\x20bisa\x20menerima\x20panggilan\x20','length','\x20kamu\x20akan\x20diblokir.\x20Silahkan\x20hubungi\x20Owner\x20membuka\x20blok\x20!','Bad\x20Session\x20File,\x20Please\x20Delete\x20Session\x20and\x20Scan\x20Again','sendFile','text','fromBuffer','6285216955233','\x0a┏━━━━━━━━━━━━━━━━━━━┓\x0a\x20\x20MASUKAN\x20USERNAME\x20!\x0a┗━━━━━━━━━━━━━━━━━━━┛\x0a\x20USERNAME\x20:\x20','copyNForward','\x0a┗━━━━━━━━━━━━━━┛\x0a','withoutContact','./lib/mongoDB','Connection\x20Replaced,\x20Another\x20New\x20Session\x20Opened,\x20Please\x20Restart\x20Bot','chain','connectionClosed','matchAll','writeFileSync','mtype','8yAnyRs','data','\x0a\x0aOWNER\x20:\x20','0@s.whatsapp.net','string','server','Restart\x20Required,\x20Restarting...','push','stdout','resolve','\x0a⣿⡇⠘⡇⢀⣶⣶⠄⠈⣾⡟⢂⣿⣿⣿⣿⣿⣿⡿⢉⢾⢃⣿⣿⡟⣸⢸⣿⣿⣸\x0a⣿⢸⣦⢧⢸⣿⣿⢱⠄⠄⣇⣼⣿⣿⣿⣿⣿⢟⣼⣿⡯⠸⣿⢳⢱⡏⣼⣿⢇⣿\x0a⡏⣾⢽⣼⢸⣿⣿⡘⣆⢀⠛⣿⣿⣿⣿⡿⣫⣾⣿⣿⢇⣿⠂⢌⡾⡇⣿⡿⢸⣿\x0a⢧⣿⠄⢹⢸⣿⣿⣷⣭⢸⡄⣿⣿⣿⢋⣵⣿⣿⡿⠟⡨⡡⠄⣾⣿⡆⣭⡇⣿⣿\x0a⣼⡏⡀⠄⢀⢿⣿⣿⡟⣾⡇⣿⡿⣡⢁⣿⣿⣫⡶⢃⡵⣡⣿⣮⡻⡇⣿⢸⣮⢿\x0a⣿⡇⣧⢠⠸⡎⡍⡭⢾⡏⣧⢋⢾⠏⣼⣿⣿⠿⣵⣾⣕⠿⣿⣿⣷⢡⠏⣾⣿⣿\x0a⣿⠁⣿⠈⠄⠄⢃⢹⡀⠸⢸⢿⠸⢰⢻⢿⣟⢁⣀⠄⠄⠉⠒⢝⢿⠸⣴⣿⣿⣿\x0a⡍⠇⣿⣷⢰⢰⢸⠄⡃⡆⠈⠈⡀⡌⠠⠸⠃⣿⣏⡳⢷⢄⡀⠄⠄⠰⣿⣿⣿⣿\x0a⡇⠄⠸⣿⢸⣿⣶⡄⣇⠃⡇⡄⡇⠁⠃⠄⠈⢊⠻⠿⣿⣿⣿⣦⠄⠘⣿⣿⣿⣿\x0a⡇⠄⠄⢻⣸⣿⣿⠏⡙⢸⣇⣡⢰⢀⠄⠄⠄⠈⡁⢱⢈⢿⣿⡿⡄⣰⣶⣿⣿⣿\x0a⡇⠄⠄⠄⢻⣿⡿⢰⡇⠆⠲⠶⣝⠾⠸⢴⢠⠄⠇⢸⢸⠄⡶⡜⣽⣿⣿⣿⣿⢏\x0a⠁⠄⠄⠄⠄⢿⡇⠧⢣⣸⣦⣄⣀⠁⠓⢸⣄⠸⢀⠄⡀⡀⡪⣽⣿⣿⢿⣿⢟⣬\x0a⠄⠄⠄⠄⠄⠈⢧⠯⢸⣿⣿⣿⡿⠰⣷⠄⣿⣇⡿⠄⡀⠦⣰⣿⡿⣱⣿⡏⢾⣫\x0a⠄⠄⠄⠄⠄⠄⠈⣌⢌⢿⣿⣿⠇⠼⢃⢠⢇⣻⣧⣿⡡⣸⣿⠿⢁⡟⢁⣳⣿⣿\x0a⠄⠄⠄⠄⠄⠄⠄⠄⠳⢝⣒⣒⠰⣘⣴⡧⠿⣿⣛⡯⣱⡿⣫⢎⣪⣎⣿⣧⢻⠿\x0a','11cwFiWZ','conversation','message','requestPairingCode','split','status@broadcast','Error\x20during\x20validation:','./lib/color','video','sendMessage','./RezzHost','exit','viewOnceMessage','Masukan\x20Number\x20Dengan\x20Kode\x20Negara\x0aContoh\x20:\x20','https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60','caption','promote','Ubuntu','Chrome','WhatsApp','document','redBright','trim','subject','12OOROsj','ephemeralMessage','Device\x20Logged\x20Out,\x20Please\x20Delete\x20Folder\x20Session\x20yusril\x20and\x20Scan\x20Again.','action','international','3472090pZQQHa','sendImageAsStickerAV','./lib/exif','mimetype','\x0a⣿⣿⣷⡁⢆⠈⠕⢕⢂⢕⢂⢕⢂⢔⢂⢕⢄⠂⣂⠂⠆⢂⢕⢂⢕⢂⢕⢂⢕⢂\x0a⣿⣿⣿⡷⠊⡢⡹⣦⡑⢂⢕⢂⢕⢂⢕⢂⠕⠔⠌⠝⠛⠶⠶⢶⣦⣄⢂⢕⢂⢕\x0a⣿⣿⠏⣠⣾⣦⡐⢌⢿⣷⣦⣅⡑⠕⠡⠐⢿⠿⣛⠟⠛⠛⠛⠛⠡⢷⡈⢂⢕⢂\x0a⠟⣡⣾⣿⣿⣿⣿⣦⣑⠝⢿⣿⣿⣿⣿⣿⡵⢁⣤⣶⣶⣿⢿⢿⢿⡟⢻⣤⢑⢂\x0a⣾⣿⣿⡿⢟⣛⣻⣿⣿⣿⣦⣬⣙⣻⣿⣿⣷⣿⣿⢟⢝⢕⢕⢕⢕⢽⣿⣿⣷⣔\x0a⣿⣿⠵⠚⠉⢀⣀⣀⣈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣗⢕⢕⢕⢕⢕⢕⣽⣿⣿⣿⣿\x0a⢷⣂⣠⣴⣾⡿⡿⡻⡻⣿⣿⣴⣿⣿⣿⣿⣿⣿⣷⣵⣵⣵⣷⣿⣿⣿⣿⣿⣿⡿\x0a⢌⠻⣿⡿⡫⡪⡪⡪⡪⣺⣿⣿⣿⣿⣿⠿⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃\x0a⠣⡁⠹⡪⡪⡪⡪⣪⣾⣿⣿⣿⣿⠋⠐⢉⢍⢄⢌⠻⣿⣿⣿⣿⣿⣿⣿⣿⠏⠈\x0a⡣⡘⢄⠙⣾⣾⣾⣿⣿⣿⣿⣿⣿⡀⢐⢕⢕⢕⢕⢕⡘⣿⣿⣿⣿⣿⣿⠏⠠⠈\x0a⠌⢊⢂⢣⠹⣿⣿⣿⣿⣿⣿⣿⣿⣧⢐⢕⢕⢕⢕⢕⢅⣿⣿⣿⣿⡿⢋⢜⠠⠈\x0a⠄⠁⠕⢝⡢⠈⠻⣿⣿⣿⣿⣿⣿⣿⣷⣕⣑⣑⣑⣵⣿⣿⣿⡿⢋⢔⢕⣿⠠⠈\x0a⠨⡂⡀⢑⢕⡅⠂⠄⠉⠛⠻⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢋⢔⢕⢕⣿⣿⠠⠈\x0a⠄⠪⣂⠁⢕⠆⠄⠂⠄⠁⡀⠂⡀⠄⢈⠉⢍⢛⢛⢛⢋⢔⢕⢕⢕⣽⣿⣿⠠⠈\x0a','DATABASE','connectionLost','sessionName','remove','axios','@g.us','ignore','from','unlink','READ','messages.upsert','sendTextWithMentions','Unknown\x20DisconnectReason:\x20','desc','isBuffer','packname2','keys','key','\x0aitem1.X-ABLabel:Ponsel\x0aitem2.EMAIL;type=INTERNET:\x20rerezhosting@gmail.com\x0aitem2.X-ABLabel:Email\x0aitem3.URL:https://whatsapp.com/channel/0029VacxTsC8F2p5dshCmq3r\x0aitem3.X-ABLabel:Instagram\x0aitem4.ADR:;;Indonesia;;;;\x0aitem4.X-ABLabel:Region\x0aEND:VCARD','concat','type','public','https-proxy-agent','6314742plbTBh','\x0aitem1.TEL;waid=','timedOut','\x20Kontak','creds','lowdb','getFile','endsWith','sendImage','createInterface','error','sendImageAsStickerAvatar','cache','offer','\x0aFN:','\x0a⠄⠄⠄⢰⣧⣼⣯⠄⣸⣠⣶⣶⣦⣾⠄⠄⠄⠄⡀⠄⢀⣿⣿⠄⠄⠄⢸⡇⠄⠄\x0a⠄⠄⠄⣾⣿⠿⠿⠶⠿⢿⣿⣿⣿⣿⣦⣤⣄⢀⡅⢠⣾⣛⡉⠄⠄⠄⠸⢀⣿⠄\x0a⠄⠄⢀⡋⣡⣴⣶⣶⡀⠄⠄⠙⢿⣿⣿⣿⣿⣿⣴⣿⣿⣿⢃⣤⣄⣀⣥⣿⣿⠄\x0a⠄⠄⢸⣇⠻⣿⣿⣿⣧⣀⢀⣠⡌⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠿⣿⣿⣿⠄\x0a⠄⢀⢸⣿⣷⣤⣤⣤⣬⣙⣛⢿⣿⣿⣿⣿⣿⣿⡿⣿⣿⡍⠄⠄⢀⣤⣄⠉⠋⣰\x0a⠄⣼⣖⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⣿⣿⣿⣿⣿⢇⣿⣿⡷⠶⠶⢿⣿⣿⠇⢀⣤\x0a⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣽⣿⣿⣿⡇⣿⣿⣿⣿⣿⣿⣷⣶⣥⣴⣿⡗\x0a⢀⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠄\x0a⢸⣿⣦⣌⣛⣻⣿⣿⣧⠙⠛⠛⡭⠅⠒⠦⠭⣭⡻⣿⣿⣿⣿⣿⣿⣿⣿⡿⠃⠄\x0a⠘⣿⣿⣿⣿⣿⣿⣿⣿⡆⠄⠄⠄⠄⠄⠄⠄⠄⠹⠈⢋⣽⣿⣿⣿⣿⣵⣾⠃⠄\x0a⠄⠘⣿⣿⣿⣿⣿⣿⣿⣿⠄⣴⣿⣶⣄⠄⣴⣶⠄⢀⣾⣿⣿⣿⣿⣿⣿⠃⠄⠄\x0a⠄⠄⠈⠻⣿⣿⣿⣿⣿⣿⡄⢻⣿⣿⣿⠄⣿⣿⡀⣾⣿⣿⣿⣿⣛⠛⠁⠄⠄⠄\x0a⠄⠄⠄⠄⠈⠛⢿⣿⣿⣿⠁⠞⢿⣿⣿⡄⢿⣿⡇⣸⣿⣿⠿⠛⠁⠄⠄⠄⠄⠄\x0a⠄⠄⠄⠄⠄⠄⠄⠉⠻⣿⣿⣾⣦⡙⠻⣷⣾⣿⠃⠿⠋⠁⠄⠄⠄⠄⠄⢀⣠⣴\x0a⣿⣿⣿⣶⣶⣮⣥⣒⠲⢮⣝⡿⣿⣿⡆⣿⡿⠃⠄⠄⠄⠄⠄⠄⠄⣠⣴⣿⣿⣿\x0a','authState','silent','\x20Kini\x20Menjadi\x20Pejabat\x20Geoup\x20','*[\x20TERHUBUNG\x20KE\x20XYREZZ\x20BOTZ\x20-\x20MD\x20]*','cMod','.\x20Maaf\x20@','chalk','remoteJid','question','1sdZpjT','store','Connection\x20closed,\x20reconnecting....','getNumber','test','open','connection.update','uncaughtException','sendContact','Rerezz','demote','suara','943432WCwOYi','parseMention','argv','msg','participants','stdin','groupMetadata','loggedOut','log','downloadAndSaveMediaMessage','add','image','contacts','isVideo','child','readViewOnce','participant','BAE5','contextInfo','decodeJid','connectionReplaced','notify','\x0a⠄⣾⣿⡇⢸⣿⣿⣿⠄⠈⣿⣿⣿⣿⠈⣿⡇⢹⣿⣿⣿⡇⡇⢸⣿⣿⡇⣿⣿⣿\x0a⢠⣿⣿⡇⢸⣿⣿⣿⡇⠄⢹⣿⣿⣿⡀⣿⣧⢸⣿⣿⣿⠁⡇⢸⣿⣿⠁⣿⣿⣿\x0a⢸⣿⣿⡇⠸⣿⣿⣿⣿⡄⠈⢿⣿⣿⡇⢸⣿⡀⣿⣿⡿⠸⡇⣸⣿⣿⠄⣿⣿⣿\x0a⢸⣿⡿⠷⠄⠿⠿⠿⠟⠓⠰⠘⠿⣿⣿⡈⣿⡇⢹⡟⠰⠦⠁⠈⠉⠋⠄⠻⢿⣿\x0a⢨⡑⠶⡏⠛⠐⠋⠓⠲⠶⣭⣤⣴⣦⣭⣥⣮⣾⣬⣴⡮⠝⠒⠂⠂⠘⠉⠿⠖⣬\x0a⠈⠉⠄⡀⠄⣀⣀⣀⣀⠈⢛⣿⣿⣿⣿⣿⣿⣿⣿⣟⠁⣀⣤⣤⣠⡀⠄⡀⠈⠁\x0a⠄⠠⣾⡀⣾⣿⣧⣼⣿⡿⢠⣿⣿⣿⣿⣿⣿⣿⣿⣧⣼⣿⣧⣼⣿⣿⢀⣿⡇⠄\x0a⡀⠄⠻⣷⡘⢿⣿⣿⡿⢣⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣜⢿⣿⣿⡿⢃⣾⠟⢁⠈\x0a⢃⢻⣶⣬⣿⣶⣬⣥⣶⣿⣿⣿⣿⣿⣿⢿⣿⣿⣿⣿⣿⣷⣶⣶⣾⣿⣷⣾⣾⢣\x0a⡄⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⠘\x0a⣿⡐⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⢠⢃\x0a⣿⣷⡀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠿⠿⢿⣿⣿⣿⣿⣿⣿⣿⡿⠋⢀⠆⣼\x0a⣿⣿⣷⡀⠄⠈⠛⢿⣿⣿⣿⣿⣷⣶⣶⣶⣶⣶⣿⣿⣿⣿⣿⠿⠋⠠⠂⢀⣾⣿\x0a⣿⣿⣿⣧⠄⠄⢵⢠⣈⠛⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⢋⡁⢰⠏⠄⠄⣼⣿⣿\x0a⢻⣿⣿⣿⡄⢢⠨⠄⣯⠄⠄⣌⣉⠛⠻⠟⠛⢋⣉⣤⠄⢸⡇⣨⣤⠄⢸⣿⣿⣿\x0a','loadDatabase','startsWith','author','fromObject','18928572IVrCeO','\x0a┏━━━━━━━━━━━━━━━━┓\x0a\x20\x20USERNAME\x20SALAH\x20!\x0a┗━━━━━━━━━━━━━━━━┛','profilePictureUrl','block','opts','statusCode','base64','status','red','http://proxy:clph123@103.123.63.106:3128','Connection\x20TimedOut,\x20Reconnecting...','./setting','asSticker','545932EtZgsR','0208','sendReact','alloc','getName','Sayonara\x20*@','./src/database.json','user','path','awesome-phonenumber','pino','includes','11488630WRkIXK','BEGIN:VCARD\x0aVERSION:3.0\x0aN:','3yODjQO'];_0x2f12=function(){return _0x42b6a3;};return _0x2f12();}const animas=pickRandom=[_0x542c19(0x250),_0x542c19(0x229),_0x542c19(0x207),_0x542c19(0x2a6),'\x0a⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣀⣠⣤⣶⣶⣶⣤⣄⣀⣀⠄⠄⠄⠄⠄\x0a⠄⠄⠄⠄⠄⠄⠄⠄⣀⣤⣤⣶⣿⣿⣿⣿⣿⣿⣿⣟⢿⣿⣿⣿⣶⣤⡀⠄\x0a⠄⠄⠄⠄⠄⠄⢀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣜⠿⠿⣿⣿⣧⢓\x0a⠄⠄⠄⠄⠄⡠⢛⣿⣿⣿⡟⣿⣿⣽⣋⠻⢻⣿⣿⣿⣿⡻⣧⡠⣭⣭⣿⡧\x0a⠄⠄⠄⠄⠄⢠⣿⡟⣿⢻⠃⣻⣨⣻⠿⡀⣝⡿⣿⣿⣷⣜⣜⢿⣝⡿⡻⢔\x0a⠄⠄⠄⠄⠄⢸⡟⣷⢿⢈⣚⣓⡡⣻⣿⣶⣬⣛⣓⣉⡻⢿⣎⠢⠻⣴⡾⠫\x0a⠄⠄⠄⠄⠄⢸⠃⢹⡼⢸⣿⣿⣿⣦⣹⣿⣿⣿⠿⠿⠿⠷⣎⡼⠆⣿⠵⣫\x0a⠄⠄⠄⠄⠄⠈⠄⠸⡟⡜⣩⡄⠄⣿⣿⣿⣿⣶⢀⢀⣿⣷⣿⣿⡐⡇⡄⣿\x0a⠄⠄⠄⠄⠄⠄⠄⠄⠁⢶⢻⣧⣖⣿⣿⣿⣿⣿⣿⣿⣿⡏⣿⣇⡟⣇⣷⣿\x0a⠄⠄⠄⠄⠄⠄⠄⠄⠄⢸⣆⣤⣽⣿⡿⠿⠿⣿⣿⣦⣴⡇⣿⢨⣾⣿⢹⢸\x0a⠄⠄⠄⠄⠄⠄⠄⠄⠄⢸⣿⠊⡛⢿⣿⣿⣿⣿⡿⣫⢱⢺⡇⡏⣿⣿⣸⡼\x0a⠄⠄⠄⠄⠄⠄⠄⠄⠄⢸⡿⠄⣿⣷⣾⡍⣭⣶⣿⣿⡌⣼⣹⢱⠹⣿⣇⣧\x0a⠄⠄⠄⠄⠄⠄⠄⠄⠄⣼⠁⣤⣭⣭⡌⢁⣼⣿⣿⣿⢹⡇⣭⣤⣶⣤⡝⡼\x0a⠄⣀⠤⡀⠄⠄⠄⠄⠄⡏⣈⡻⡿⠃⢀⣾⣿⣿⣿⡿⡼⠁⣿⣿⣿⡿⢷⢸\x0a⢰⣷⡧⡢⠄⠄⠄⠄⠠⢠⡛⠿⠄⠠⠬⠿⣿⠭⠭⢱⣇⣀⣭⡅⠶⣾⣷⣶\x0a⠈⢿⣿⣧⠄⠄⠄⠄⢀⡛⠿⠄⠄⠄⠄⢠⠃⠄⠄⡜⠄⠄⣤⢀⣶⣮⡍⣴\x0a⠄⠈⣿⣿⡀⠄⠄⠄⢩⣝⠃⠄⠄⢀⡄⡎⠄⠄⠄⠇⠄⠄⠅⣴⣶⣶⠄⣶\x0a','\x0a⡏⠉⠉⠉⠉⠉⠉⠋⠉⠉⠉⠉⠉⠉⠋⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠙⠉⠉⠉⠹\x0a⡇⢸⣿⡟⠛⢿⣷⠀⢸⣿⡟⠛⢿⣷⡄⢸⣿⡇⠀⢸⣿⡇⢸⣿⡇⠀⢸⣿⡇⠀\x0a⡇⢸⣿⣧⣤⣾⠿⠀⢸⣿⣇⣀⣸⡿⠃⢸⣿⡇⠀⢸⣿⡇⢸⣿⣇⣀⣸⣿⡇⠀\x0a⡇⢸⣿⡏⠉⢹⣿⡆⢸⣿⡟⠛⢻⣷⡄⢸⣿⡇⠀⢸⣿⡇⢸⣿⡏⠉⢹⣿⡇⠀\x0a⡇⢸⣿⣧⣤⣼⡿⠃⢸⣿⡇⠀⢸⣿⡇⠸⣿⣧⣤⣼⡿⠁⢸⣿⡇⠀⢸⣿⡇⠀\x0a⣇⣀⣀⣀⣀⣀⣀⣄⣀⣀⣀⣀⣀⣀⣀⣠⣀⡈⠉⣁⣀⣄⣀⣀⣀⣠⣀⣀⣀⣰\x0a⣇⣿⠘⣿⣿⣿⡿⡿⣟⣟⢟⢟⢝⠵⡝⣿⡿⢂⣼⣿⣷⣌⠩⡫⡻⣝⠹⢿⣿⣷\x0a⡆⣿⣆⠱⣝⡵⣝⢅⠙⣿⢕⢕⢕⢕⢝⣥⢒⠅⣿⣿⣿⡿⣳⣌⠪⡪⣡⢑⢝⣇\x0a⡆⣿⣿⣦⠹⣳⣳⣕⢅⠈⢗⢕⢕⢕⢕⢕⢈⢆⠟⠋⠉⠁⠉⠉⠁⠈⠼⢐⢕⢽\x0a⡗⢰⣶⣶⣦⣝⢝⢕⢕⠅⡆⢕⢕⢕⢕⢕⣴⠏⣠⡶⠛⡉⡉⡛⢶⣦⡀⠐⣕⢕\x0a⡝⡄⢻⢟⣿⣿⣷⣕⣕⣅⣿⣔⣕⣵⣵⣿⣿⢠⣿⢠⣮⡈⣌⠨⠅⠹⣷⡀⢱⢕\x0a⡝⡵⠟⠈⢀⣀⣀⡀⠉⢿⣿⣿⣿⣿⣿⣿⣿⣼⣿⢈⡋⠴⢿⡟⣡⡇⣿⡇⡀⢕\x0a⡝⠁⣠⣾⠟⡉⡉⡉⠻⣦⣻⣿⣿⣿⣿⣿⣿⣿⣿⣧⠸⣿⣦⣥⣿⡇⡿⣰⢗⢄\x0a⠁⢰⣿⡏⣴⣌⠈⣌⠡⠈⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣬⣉⣉⣁⣄⢖⢕⢕⢕\x0a⡀⢻⣿⡇⢙⠁⠴⢿⡟⣡⡆⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣵⣵⣿\x0a⡻⣄⣻⣿⣌⠘⢿⣷⣥⣿⠇⣿⣿⣿⣿⣿⣿⠛⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\x0a⣷⢄⠻⣿⣟⠿⠦⠍⠉⣡⣾⣿⣿⣿⣿⣿⣿⢸⣿⣦⠙⣿⣿⣿⣿⣿⣿⣿⣿⠟\x0a⡕⡑⣑⣈⣻⢗⢟⢞⢝⣻⣿⣿⣿⣿⣿⣿⣿⠸⣿⠿⠃⣿⣿⣿⣿⣿⣿⡿⠁⣠\x0a⡝⡵⡈⢟⢕⢕⢕⢕⣵⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣿⣿⣿⣿⣿⠿⠋⣀⣈⠙\x0a⡝⡵⡕⡀⠑⠳⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⢉⡠⡲⡫⡪⡪⡣\x0a',_0x542c19(0x27c)],Username=_0x542c19(0x263),Password=_0x542c19(0x28f),getUserInput=_0x5c5e5d=>{const _0x594233=_0x542c19;return new Promise(_0x2d750a=>rl[_0x594233(0x259)](_0x5c5e5d,_0x2d750a));},validatePassword=(_0x3ccb8b,_0x5cc836)=>{return _0x3ccb8b===_0x5cc836;},validateUsername=(_0x189858,_0x3cf223)=>{return _0x189858===_0x3cf223;};async function validPassword(){const _0x24fd23=_0x542c19;try{const _0x513dc9=await question(chalk[_0x24fd23(0x2a9)](chalk['red'](_0x24fd23(0x2c0))));!validateUsername(_0x513dc9,Username)&&(console['log'](chalk[_0x24fd23(0x289)](_0x24fd23(0x282))),process[_0x24fd23(0x213)](0x1));const _0x1621de=await question(chalk['bgBlack'](chalk[_0x24fd23(0x289)]('\x0a┏━━━━━━━━━━━━━━━━━━━┓\x0a\x20\x20MASUKAN\x20PASSWORD\x20!\x0a┗━━━━━━━━━━━━━━━━━━━┛\x0a\x20PASSWORD\x20:\x0a')));if(validatePassword(_0x1621de,Password))return console[_0x24fd23(0x26e)](chalk[_0x24fd23(0x2b6)](_0x24fd23(0x2b0)+botname+_0x24fd23(0x1ff)+ownername+_0x24fd23(0x2ab)+owner+'\x0a')),!![];else console[_0x24fd23(0x26e)](chalk[_0x24fd23(0x289)]('\x0a┏━━━━━━━━━━━━━━┓\x0a\x20\x20PASSWORD\x20SALAH\x20!\x0a┗━━━━━━━━━━━━━━┛')),process[_0x24fd23(0x213)](0x1);}catch(_0x4a1f65){console[_0x24fd23(0x24b)](_0x24fd23(0x20e),_0x4a1f65),process['exit'](0x1);}};async function connectToWhatsApp(){const _0x3c0e0a=_0x542c19,{state:_0x3005de,saveCreds:_0x4bda7b}=await useMultiFileAuthState(global[_0x3c0e0a(0x22c)]),_0x138963=makeWASocket({'logger':pino({'level':'silent'}),'printQRInTerminal':!usePairingCode,'auth':_0x3005de,'browser':[_0x3c0e0a(0x219),_0x3c0e0a(0x21a),'20.0.04']});if(usePairingCode&&!_0x138963[_0x3c0e0a(0x251)][_0x3c0e0a(0x245)]['registered']){const _0x4c462d=await question(chalk[_0x3c0e0a(0x289)](_0x3c0e0a(0x215)+owner+'\x0a')),_0x202773=await _0x138963[_0x3c0e0a(0x20b)](_0x4c462d[_0x3c0e0a(0x21e)]());console['log'](chalk[_0x3c0e0a(0x289)]('\x0a┏━━━━━━━━━━━━━━┓\x0a\x20\x20YOURPAIRING\x20CODE\x0a┗━━━━━━━━━━━━━━┛\x0a┏━━━━━━━━━━━━━━┓\x0a\x20\x20'+_0x202773+_0x3c0e0a(0x1f4)));}return _0x138963[_0x3c0e0a(0x279)]=_0x88850a=>{const _0x49f078=_0x3c0e0a;if(!_0x88850a)return _0x88850a;if(/:\d+@/gi[_0x49f078(0x25e)](_0x88850a)){let _0x5b8d7b=jidDecode(_0x88850a)||{};return _0x5b8d7b[_0x49f078(0x295)]&&_0x5b8d7b[_0x49f078(0x202)]&&_0x5b8d7b['user']+'@'+_0x5b8d7b[_0x49f078(0x202)]||_0x88850a;}else return _0x88850a;},_0x138963['ev']['on'](_0x3c0e0a(0x234),async _0x3e7f39=>{const _0x41792b=_0x3c0e0a;try{mek=_0x3e7f39['messages'][0x0];if(!mek['message'])return;mek['message']=Object[_0x41792b(0x23a)](mek[_0x41792b(0x20a)])[0x0]===_0x41792b(0x221)?mek[_0x41792b(0x20a)]['ephemeralMessage'][_0x41792b(0x20a)]:mek[_0x41792b(0x20a)];if(mek[_0x41792b(0x23b)]&&mek[_0x41792b(0x23b)][_0x41792b(0x258)]===_0x41792b(0x20d))return;if(!_0x138963[_0x41792b(0x23f)]&&!mek[_0x41792b(0x23b)]['fromMe']&&_0x3e7f39[_0x41792b(0x23e)]==='notify')return;if(mek['key']['id'][_0x41792b(0x27e)](_0x41792b(0x277))&&mek[_0x41792b(0x23b)]['id'][_0x41792b(0x2b9)]===0x10)return;m=smsg(_0x138963,mek,store),require(_0x41792b(0x212))(_0x138963,m,_0x3e7f39,store);}catch(_0x2fe562){console[_0x41792b(0x26e)](_0x2fe562);}}),_0x138963['ev']['on']('call',async _0x4ba997=>{const _0x24bb26=_0x3c0e0a;let _0x1ad149=await _0x138963[_0x24bb26(0x279)](_0x138963[_0x24bb26(0x295)]['id']),_0x57fd06=global[_0x24bb26(0x2a8)];if(!_0x57fd06)return;console[_0x24bb26(0x26e)](_0x4ba997);for(let _0x5cb1ea of _0x4ba997){if(_0x5cb1ea['isGroup']==![]){if(_0x5cb1ea[_0x24bb26(0x288)]==_0x24bb26(0x24e)){let _0x481f3c=await _0x138963['sendTextWithMentions'](_0x5cb1ea[_0x24bb26(0x231)],'*'+_0x138963[_0x24bb26(0x295)][_0x24bb26(0x2a0)]+_0x24bb26(0x2b8)+(_0x5cb1ea[_0x24bb26(0x273)]?_0x24bb26(0x210):_0x24bb26(0x265))+_0x24bb26(0x256)+_0x5cb1ea['from'][_0x24bb26(0x20c)]('@')[0x0]+_0x24bb26(0x2ba));_0x138963[_0x24bb26(0x262)](_0x5cb1ea[_0x24bb26(0x231)],owner[_0x24bb26(0x2b7)](_0xd8b4d3=>_0xd8b4d3['split']('@')[0x0]),_0x481f3c),await sleep(0x1f40),await _0x138963[_0x24bb26(0x2a1)](_0x5cb1ea[_0x24bb26(0x231)],_0x24bb26(0x284));}}}}),_0x138963['ev']['on']('group-participants.update',async _0x2a52ae=>{const _0x94f7fc=_0x3c0e0a;if(!wlcm[_0x94f7fc(0x299)](_0x2a52ae['id']))return;console['log'](_0x2a52ae);try{let _0x79f5b4=await _0x138963['groupMetadata'](_0x2a52ae['id']),_0x2dbf07=_0x2a52ae[_0x94f7fc(0x26a)];for(let _0x964b1 of _0x2dbf07){try{ppuser=await _0x138963[_0x94f7fc(0x283)](_0x964b1,_0x94f7fc(0x271));}catch{ppuser=_0x94f7fc(0x216);}try{ppgroup=await _0x138963[_0x94f7fc(0x283)](_0x2a52ae['id'],_0x94f7fc(0x271));}catch{ppgroup=_0x94f7fc(0x216);}if(_0x2a52ae[_0x94f7fc(0x223)]==_0x94f7fc(0x270))_0x138963[_0x94f7fc(0x211)](_0x2a52ae['id'],{'image':{'url':ppuser},'mentions':[_0x964b1],'caption':'Haii\x20Kak\x20*@'+_0x964b1['split']('@')[0x0]+'*\x0aSelamat\x20Datang\x20Di\x20Group\x20*'+_0x79f5b4[_0x94f7fc(0x21f)]+'*'});else{if(_0x2a52ae[_0x94f7fc(0x223)]==_0x94f7fc(0x22d))_0x138963[_0x94f7fc(0x211)](_0x2a52ae['id'],{'image':{'url':ppuser},'mentions':[_0x964b1],'caption':_0x94f7fc(0x293)+_0x964b1[_0x94f7fc(0x20c)]('@')[0x0]+'*'});else{if(_0x2a52ae['action']==_0x94f7fc(0x218))_0x138963[_0x94f7fc(0x211)](_0x2a52ae['id'],{'image':{'url':ppuser},'mentions':[_0x964b1],'caption':'@'+_0x964b1['split']('@')[0x0]+_0x94f7fc(0x253)+_0x79f5b4[_0x94f7fc(0x21f)]+'\x20'+_0x79f5b4['desc']});else _0x2a52ae[_0x94f7fc(0x223)]==_0x94f7fc(0x264)&&_0x138963[_0x94f7fc(0x211)](_0x2a52ae['id'],{'image':{'url':ppuser},'mentions':[_0x964b1],'caption':'@'+_0x964b1[_0x94f7fc(0x20c)]('@')[0x0]+'\x20Kini\x20Menjadi\x20Rakyat\x20Biasa\x20'+_0x79f5b4[_0x94f7fc(0x21f)]+'\x20'+_0x79f5b4[_0x94f7fc(0x237)]});}}}}catch(_0x91fc63){console[_0x94f7fc(0x26e)](_0x91fc63);}}),_0x138963['ev']['on']('contacts.update',_0x14f2af=>{const _0x2fde58=_0x3c0e0a;for(let _0x194075 of _0x14f2af){let _0x24ea66=_0x138963[_0x2fde58(0x279)](_0x194075['id']);if(store&&store['contacts'])store[_0x2fde58(0x272)][_0x24ea66]={'id':_0x24ea66,'name':_0x194075[_0x2fde58(0x27b)]};}}),_0x138963[_0x3c0e0a(0x292)]=(_0x22eeac,_0x4a1cb8=![])=>{const _0x1a2f85=_0x3c0e0a;id=_0x138963[_0x1a2f85(0x279)](_0x22eeac),_0x4a1cb8=_0x138963[_0x1a2f85(0x1f5)]||_0x4a1cb8;let _0x3808d9;if(id[_0x1a2f85(0x248)](_0x1a2f85(0x22f)))return new Promise(async _0x196da8=>{const _0x2f57bb=_0x1a2f85;_0x3808d9=store[_0x2f57bb(0x272)][id]||{};if(!(_0x3808d9[_0x2f57bb(0x2a0)]||_0x3808d9[_0x2f57bb(0x21f)]))_0x3808d9=_0x138963[_0x2f57bb(0x26c)](id)||{};_0x196da8(_0x3808d9['name']||_0x3808d9[_0x2f57bb(0x21f)]||PhoneNumber('+'+id[_0x2f57bb(0x29d)](_0x2f57bb(0x2af),''))[_0x2f57bb(0x25d)]('international'));});else _0x3808d9=id===_0x1a2f85(0x200)?{'id':id,'name':_0x1a2f85(0x21b)}:id===_0x138963[_0x1a2f85(0x279)](_0x138963['user']['id'])?_0x138963[_0x1a2f85(0x295)]:store[_0x1a2f85(0x272)][id]||{};return(_0x4a1cb8?'':_0x3808d9['name'])||_0x3808d9[_0x1a2f85(0x21f)]||_0x3808d9['verifiedName']||PhoneNumber('+'+_0x22eeac[_0x1a2f85(0x29d)](_0x1a2f85(0x2af),''))['getNumber'](_0x1a2f85(0x224));},_0x138963['sendContact']=async(_0x3b6105,_0x212fd7,_0x98ec97='',_0x336846={})=>{const _0x1b3733=_0x3c0e0a;let _0xeffdda=[];for(let _0x340dab of _0x212fd7){_0xeffdda[_0x1b3733(0x204)]({'displayName':await _0x138963[_0x1b3733(0x292)](_0x340dab+'@s.whatsapp.net'),'vcard':_0x1b3733(0x29b)+await _0x138963[_0x1b3733(0x292)](_0x340dab+_0x1b3733(0x2af))+_0x1b3733(0x24f)+await _0x138963['getName'](_0x340dab+_0x1b3733(0x2af))+_0x1b3733(0x242)+_0x340dab+':'+_0x340dab+_0x1b3733(0x23c)});}_0x138963[_0x1b3733(0x211)](_0x3b6105,{'contacts':{'displayName':_0xeffdda[_0x1b3733(0x2b9)]+_0x1b3733(0x244),'contacts':_0xeffdda},..._0x336846},{'quoted':_0x98ec97});},_0x138963[_0x3c0e0a(0x23f)]=!![],_0x138963['ev']['on']('creds.update',_0x4bda7b),_0x138963[_0x3c0e0a(0x2ac)]=async _0x4b4766=>{const _0x5cdc61=_0x3c0e0a;let _0x52b627=(_0x4b4766[_0x5cdc61(0x269)]||_0x4b4766)[_0x5cdc61(0x228)]||'',_0x3890e=_0x4b4766['mtype']?_0x4b4766[_0x5cdc61(0x1fc)]['replace'](/Message/gi,''):_0x52b627[_0x5cdc61(0x20c)]('/')[0x0];const _0x5b86eb=await downloadContentFromMessage(_0x4b4766,_0x3890e);let _0x482203=Buffer[_0x5cdc61(0x231)]([]);for await(const _0x131996 of _0x5b86eb){_0x482203=Buffer[_0x5cdc61(0x23d)]([_0x482203,_0x131996]);}return _0x482203;},_0x138963[_0x3c0e0a(0x249)]=async(_0x2d7b18,_0x123ba6,_0x3383be='',_0xa8b1dc='',_0x27bb28)=>{const _0x3a2c46=_0x3c0e0a;let _0x367941=Buffer[_0x3a2c46(0x238)](_0x123ba6)?_0x123ba6:/^data:.*?\/.*?;base64,/i['test'](_0x123ba6)?Buffer[_0x3a2c46(0x231)](_0x123ba6['split']`,`[0x1],_0x3a2c46(0x287)):/^https?:\/\//[_0x3a2c46(0x25e)](_0x123ba6)?await await getBuffer(_0x123ba6):fs[_0x3a2c46(0x2b5)](_0x123ba6)?fs[_0x3a2c46(0x2a3)](_0x123ba6):Buffer[_0x3a2c46(0x291)](0x0);return await _0x138963[_0x3a2c46(0x211)](_0x2d7b18,{'image':_0x367941,'caption':_0x3383be,..._0x27bb28},{'quoted':_0xa8b1dc});},_0x138963['sendText']=(_0x269f74,_0xdc7880,_0x5d929b='',_0x43b741)=>_0x138963['sendMessage'](_0x269f74,{'text':_0xdc7880,..._0x43b741},{'quoted':_0x5d929b}),_0x138963[_0x3c0e0a(0x235)]=async(_0x39ec55,_0x152c87,_0x491656,_0xa74aa9={})=>_0x138963[_0x3c0e0a(0x211)](_0x39ec55,{'text':_0x152c87,'contextInfo':{'mentionedJid':[..._0x152c87['matchAll'](/@(\d{0,16})/g)][_0x3c0e0a(0x2b7)](_0x188d96=>_0x188d96[0x1]+'@s.whatsapp.net')},..._0xa74aa9},{'quoted':_0x491656}),_0x138963['sendImageAsSticker']=async(_0x201f6a,_0x1fbdec,_0x2c7c13,_0x5c7317={})=>{const _0xd337d1=_0x3c0e0a;let _0x165382=Buffer[_0xd337d1(0x238)](_0x1fbdec)?_0x1fbdec:/^data:.*?\/.*?;base64,/i[_0xd337d1(0x25e)](_0x1fbdec)?Buffer[_0xd337d1(0x231)](_0x1fbdec['split']`,`[0x1],_0xd337d1(0x287)):/^https?:\/\//[_0xd337d1(0x25e)](_0x1fbdec)?await await getBuffer(_0x1fbdec):fs[_0xd337d1(0x2b5)](_0x1fbdec)?fs[_0xd337d1(0x2a3)](_0x1fbdec):Buffer[_0xd337d1(0x291)](0x0),_0x25fd95;return _0x5c7317&&(_0x5c7317['packname']||_0x5c7317[_0xd337d1(0x27f)])?_0x25fd95=await writeExifImg(_0x165382,_0x5c7317):_0x25fd95=await imageToWebp(_0x165382),await _0x138963[_0xd337d1(0x211)](_0x201f6a,{'sticker':{'url':_0x25fd95},..._0x5c7317},{'quoted':_0x2c7c13}),_0x25fd95;},_0x138963[_0x3c0e0a(0x226)]=async(_0x37a88d,_0x301f51,_0x5170d0,_0x453e66={})=>{const _0x43ff6e=_0x3c0e0a;let _0x1e4060=Buffer[_0x43ff6e(0x238)](_0x301f51)?_0x301f51:/^data:.*?\/.*?;base64,/i[_0x43ff6e(0x25e)](_0x301f51)?Buffer[_0x43ff6e(0x231)](_0x301f51[_0x43ff6e(0x20c)]`,`[0x1],_0x43ff6e(0x287)):/^https?:\/\//[_0x43ff6e(0x25e)](_0x301f51)?await await getBuffer(_0x301f51):fs[_0x43ff6e(0x2b5)](_0x301f51)?fs[_0x43ff6e(0x2a3)](_0x301f51):Buffer[_0x43ff6e(0x291)](0x0),_0x2ed03e;return _0x453e66&&(_0x453e66[_0x43ff6e(0x2aa)]||_0x453e66['author'])?_0x2ed03e=await writeExifImgAV(_0x1e4060,_0x453e66):_0x2ed03e=await imageToWebp2(_0x1e4060),await _0x138963[_0x43ff6e(0x211)](_0x37a88d,{'sticker':{'url':_0x2ed03e},..._0x453e66},{'quoted':_0x5170d0}),_0x2ed03e;},_0x138963[_0x3c0e0a(0x24c)]=async(_0x2de7a3,_0x515def,_0x2c72b8,_0x47b76d={})=>{const _0xa339ad=_0x3c0e0a;let _0x1a4afe=Buffer[_0xa339ad(0x238)](_0x515def)?_0x515def:/^data:.*?\/.*?;base64,/i['test'](_0x515def)?Buffer[_0xa339ad(0x231)](_0x515def['split']`,`[0x1],_0xa339ad(0x287)):/^https?:\/\//[_0xa339ad(0x25e)](_0x515def)?await await getBuffer(_0x515def):fs['existsSync'](_0x515def)?fs[_0xa339ad(0x2a3)](_0x515def):Buffer[_0xa339ad(0x291)](0x0),_0x5f0163;return _0x47b76d&&(_0x47b76d[_0xa339ad(0x2aa)]||_0x47b76d[_0xa339ad(0x27f)])?_0x5f0163=await writeExifImg(_0x1a4afe,_0x47b76d):_0x5f0163=await imageToWebp3(_0x1a4afe),await _0x138963[_0xa339ad(0x211)](_0x2de7a3,{'sticker':{'url':_0x5f0163},..._0x47b76d},{'quoted':_0x2c72b8}),_0x5f0163;},_0x138963['sendVideoAsSticker']=async(_0x1c460e,_0x50ecd9,_0x411c3c,_0x4e72de={})=>{const _0x4d7f19=_0x3c0e0a;let _0x9f335e=Buffer[_0x4d7f19(0x238)](_0x50ecd9)?_0x50ecd9:/^data:.*?\/.*?;base64,/i[_0x4d7f19(0x25e)](_0x50ecd9)?Buffer['from'](_0x50ecd9[_0x4d7f19(0x20c)]`,`[0x1],'base64'):/^https?:\/\//['test'](_0x50ecd9)?await await getBuffer(_0x50ecd9):fs[_0x4d7f19(0x2b5)](_0x50ecd9)?fs[_0x4d7f19(0x2a3)](_0x50ecd9):Buffer[_0x4d7f19(0x291)](0x0),_0x3248a1;return _0x4e72de&&(_0x4e72de[_0x4d7f19(0x2aa)]||_0x4e72de[_0x4d7f19(0x27f)])?_0x3248a1=await writeExifVid(_0x9f335e,_0x4e72de):_0x3248a1=await videoToWebp(_0x9f335e),await _0x138963[_0x4d7f19(0x211)](_0x1c460e,{'sticker':{'url':_0x3248a1},..._0x4e72de},{'quoted':_0x411c3c}),_0x3248a1;},_0x138963[_0x3c0e0a(0x26f)]=async(_0x5ef297,_0x201216,_0x1119c9=!![])=>{const _0xaa0d35=_0x3c0e0a;let _0x38abb5=_0x5ef297[_0xaa0d35(0x269)]?_0x5ef297[_0xaa0d35(0x269)]:_0x5ef297,_0x483f0a=(_0x5ef297[_0xaa0d35(0x269)]||_0x5ef297)[_0xaa0d35(0x228)]||'',_0x188632=_0x5ef297[_0xaa0d35(0x1fc)]?_0x5ef297[_0xaa0d35(0x1fc)][_0xaa0d35(0x29d)](/Message/gi,''):_0x483f0a[_0xaa0d35(0x20c)]('/')[0x0];const _0x3e6ccc=await downloadContentFromMessage(_0x38abb5,_0x188632);let _0x4a212d=Buffer[_0xaa0d35(0x231)]([]);for await(const _0x124de0 of _0x3e6ccc){_0x4a212d=Buffer[_0xaa0d35(0x23d)]([_0x4a212d,_0x124de0]);}let _0x20cb84=await FileType['fromBuffer'](_0x4a212d);return trueFileName=_0x1119c9?_0x201216+'.'+_0x20cb84['ext']:_0x201216,await fs[_0xaa0d35(0x1fb)](trueFileName,_0x4a212d),trueFileName;},_0x138963[_0x3c0e0a(0x255)]=(_0x54d5c4,_0x6e74c8,_0x153c07='',_0x40061d=_0x138963[_0x3c0e0a(0x295)]['id'],_0x2f92c8={})=>{const _0x598257=_0x3c0e0a;let _0x1483a5=Object['keys'](_0x6e74c8['message'])[0x0],_0x1daf57=_0x1483a5==='ephemeralMessage';_0x1daf57&&(_0x1483a5=Object['keys'](_0x6e74c8['message'][_0x598257(0x221)][_0x598257(0x20a)])[0x0]);let _0x589c72=_0x1daf57?_0x6e74c8[_0x598257(0x20a)][_0x598257(0x221)][_0x598257(0x20a)]:_0x6e74c8[_0x598257(0x20a)],_0x22755d=_0x589c72[_0x1483a5];if(typeof _0x22755d===_0x598257(0x201))_0x589c72[_0x1483a5]=_0x153c07||_0x22755d;else{if(_0x22755d['caption'])_0x22755d['caption']=_0x153c07||_0x22755d[_0x598257(0x217)];else{if(_0x22755d[_0x598257(0x2bd)])_0x22755d['text']=_0x153c07||_0x22755d[_0x598257(0x2bd)];}}if(typeof _0x22755d!=='string')_0x589c72[_0x1483a5]={..._0x22755d,..._0x2f92c8};if(_0x6e74c8['key'][_0x598257(0x276)])_0x40061d=_0x6e74c8[_0x598257(0x23b)][_0x598257(0x276)]=_0x40061d||_0x6e74c8[_0x598257(0x23b)][_0x598257(0x276)];else{if(_0x6e74c8[_0x598257(0x23b)]['participant'])_0x40061d=_0x6e74c8[_0x598257(0x23b)][_0x598257(0x276)]=_0x40061d||_0x6e74c8[_0x598257(0x23b)][_0x598257(0x276)];}if(_0x6e74c8[_0x598257(0x23b)][_0x598257(0x258)][_0x598257(0x299)](_0x598257(0x2af)))_0x40061d=_0x40061d||_0x6e74c8[_0x598257(0x23b)][_0x598257(0x258)];else{if(_0x6e74c8[_0x598257(0x23b)][_0x598257(0x258)]['includes']('@broadcast'))_0x40061d=_0x40061d||_0x6e74c8[_0x598257(0x23b)]['remoteJid'];}return _0x6e74c8[_0x598257(0x23b)]['remoteJid']=_0x54d5c4,_0x6e74c8['key'][_0x598257(0x29f)]=_0x40061d===_0x138963['user']['id'],proto['WebMessageInfo'][_0x598257(0x280)](_0x6e74c8);},_0x138963[_0x3c0e0a(0x2bc)]=async(_0x1f11b3,_0x3ff9fb,_0x29d545,_0x4afbd0={},_0x9a7aae={})=>{const _0x154869=_0x3c0e0a;let _0xd948d1=await _0x138963[_0x154869(0x247)](_0x3ff9fb,!![]),{filename:_0x5edcec,size:_0x667a3b,ext:_0x1455c6,mime:_0x54773a,data:_0x359e0e}=_0xd948d1,_0x3d29dd='',_0x1b8247=_0x54773a,_0x9d420c=_0x5edcec;if(_0x9a7aae['asDocument'])_0x3d29dd='document';if(_0x9a7aae[_0x154869(0x28d)]||/webp/[_0x154869(0x25e)](_0x54773a)){let {writeExif:_0xba5cb6}=require('./lib/sticker.js'),_0xc31e38={'mimetype':_0x54773a,'data':_0x359e0e};_0x9d420c=await _0xba5cb6(_0xc31e38,{'packname':global[_0x154869(0x2aa)],'author':global[_0x154869(0x239)],'categories':_0x9a7aae[_0x154869(0x2b1)]?_0x9a7aae['categories']:[]}),await fs[_0x154869(0x2a2)][_0x154869(0x232)](_0x5edcec),_0x3d29dd=_0x154869(0x2ae),_0x1b8247='image/webp';}else{if(/image/[_0x154869(0x25e)](_0x54773a))_0x3d29dd=_0x154869(0x271);else{if(/video/[_0x154869(0x25e)](_0x54773a))_0x3d29dd=_0x154869(0x210);else{if(/audio/[_0x154869(0x25e)](_0x54773a))_0x3d29dd='audio';else _0x3d29dd=_0x154869(0x21c);}}}return await _0x138963[_0x154869(0x211)](_0x1f11b3,{[_0x3d29dd]:{'url':_0x9d420c},'mimetype':_0x1b8247,'fileName':_0x29d545,..._0x9a7aae},{'quoted':_0x4afbd0,..._0x9a7aae}),fs[_0x154869(0x2a2)][_0x154869(0x232)](_0x9d420c);},_0x138963[_0x3c0e0a(0x267)]=async _0x2ba926=>{const _0x53e60a=_0x3c0e0a;return[..._0x2ba926[_0x53e60a(0x1fa)](/@([0-9]{5,16}|0)/g)][_0x53e60a(0x2b7)](_0x3cebed=>_0x3cebed[0x1]+'@s.whatsapp.net');},_0x138963[_0x3c0e0a(0x2c1)]=async(_0x58b4ee,_0x27a16e,_0x34513a=![],_0x52e869={})=>{const _0x46b673=_0x3c0e0a;let _0xfc4def;_0x52e869[_0x46b673(0x275)]&&(_0x27a16e[_0x46b673(0x20a)]=_0x27a16e[_0x46b673(0x20a)]&&_0x27a16e[_0x46b673(0x20a)]['ephemeralMessage']&&_0x27a16e[_0x46b673(0x20a)][_0x46b673(0x221)][_0x46b673(0x20a)]?_0x27a16e[_0x46b673(0x20a)][_0x46b673(0x221)]['message']:_0x27a16e[_0x46b673(0x20a)]||undefined,_0xfc4def=Object['keys'](_0x27a16e[_0x46b673(0x20a)]['viewOnceMessage'][_0x46b673(0x20a)])[0x0],delete(_0x27a16e[_0x46b673(0x20a)]&&_0x27a16e[_0x46b673(0x20a)]['ignore']?_0x27a16e['message'][_0x46b673(0x230)]:_0x27a16e[_0x46b673(0x20a)]||undefined),delete _0x27a16e['message'][_0x46b673(0x214)][_0x46b673(0x20a)][_0xfc4def]['viewOnce'],_0x27a16e[_0x46b673(0x20a)]={..._0x27a16e[_0x46b673(0x20a)][_0x46b673(0x214)][_0x46b673(0x20a)]});let _0x19033b=Object[_0x46b673(0x23a)](_0x27a16e[_0x46b673(0x20a)])[0x0],_0x5ae2ac=await generateForwardMessageContent(_0x27a16e,_0x34513a),_0x5960bd=Object[_0x46b673(0x23a)](_0x5ae2ac)[0x0],_0x4ffab8={};if(_0x19033b!=_0x46b673(0x209))_0x4ffab8=_0x27a16e['message'][_0x19033b][_0x46b673(0x278)];_0x5ae2ac[_0x5960bd]['contextInfo']={..._0x4ffab8,..._0x5ae2ac[_0x5960bd][_0x46b673(0x278)]};const _0x1c58da=await generateWAMessageFromContent(_0x58b4ee,_0x5ae2ac,_0x52e869?{..._0x5ae2ac[_0x5960bd],..._0x52e869,..._0x52e869[_0x46b673(0x278)]?{'contextInfo':{..._0x5ae2ac[_0x5960bd][_0x46b673(0x278)],..._0x52e869[_0x46b673(0x278)]}}:{}}:{});return await _0x138963[_0x46b673(0x2b3)](_0x58b4ee,_0x1c58da['message'],{'messageId':_0x1c58da['key']['id']}),_0x1c58da;},_0x138963[_0x3c0e0a(0x290)]=async(_0x1c8361,_0x58770c,_0x324994={})=>{const _0x1f8725=_0x3c0e0a;let _0x26cd9e={'react':{'text':_0x58770c,'key':_0x324994}};return await _0x138963[_0x1f8725(0x211)](_0x1c8361,_0x26cd9e);},_0x138963[_0x3c0e0a(0x247)]=async(_0x4e3a26,_0x1cfa84)=>{const _0x5bcb80=_0x3c0e0a;let _0x4519d8,_0x1ffa48=Buffer[_0x5bcb80(0x238)](_0x4e3a26)?_0x4e3a26:/^data:.*?\/.*?;base64,/i[_0x5bcb80(0x25e)](_0x4e3a26)?Buffer[_0x5bcb80(0x231)](_0x4e3a26[_0x5bcb80(0x20c)]`,`[0x1],_0x5bcb80(0x287)):/^https?:\/\//[_0x5bcb80(0x25e)](_0x4e3a26)?await(_0x4519d8=await getBuffer(_0x4e3a26)):fs[_0x5bcb80(0x2b5)](_0x4e3a26)?(filename=_0x4e3a26,fs['readFileSync'](_0x4e3a26)):typeof _0x4e3a26===_0x5bcb80(0x201)?_0x4e3a26:Buffer['alloc'](0x0),_0x476f31=await FileType[_0x5bcb80(0x2be)](_0x1ffa48)||{'mime':'application/octet-stream','ext':'.bin'};filename=path['join'](__filename,'../src/'+new Date()*0x1+'.'+_0x476f31['ext']);if(_0x1ffa48&&_0x1cfa84)fs['promises'][_0x5bcb80(0x29e)](filename,_0x1ffa48);return{'res':_0x4519d8,'filename':filename,'size':await getSizeMedia(_0x1ffa48),..._0x476f31,'data':_0x1ffa48};},_0x138963['serializeM']=_0x3582fc=>smsg(_0x138963,_0x3582fc,store),_0x138963['ev']['on'](_0x3c0e0a(0x260),async _0x187ff8=>{const _0x99d7ba=_0x3c0e0a,{connection:_0x1dad35,lastDisconnect:_0x221afa}=_0x187ff8;if(_0x1dad35===_0x99d7ba(0x2a4)){let _0x5b8406=new Boom(_0x221afa?.['error'])?.['output'][_0x99d7ba(0x286)];if(_0x5b8406===DisconnectReason[_0x99d7ba(0x2ad)])console['log'](_0x99d7ba(0x2bb)),process[_0x99d7ba(0x213)]();else{if(_0x5b8406===DisconnectReason[_0x99d7ba(0x1f9)])console['log'](_0x99d7ba(0x25c)),connectToWhatsApp();else{if(_0x5b8406===DisconnectReason[_0x99d7ba(0x22b)])console[_0x99d7ba(0x26e)](_0x99d7ba(0x2b2)),connectToWhatsApp();else{if(_0x5b8406===DisconnectReason[_0x99d7ba(0x27a)])console['log'](_0x99d7ba(0x1f7)),process[_0x99d7ba(0x213)]();else{if(_0x5b8406===DisconnectReason[_0x99d7ba(0x26d)])console[_0x99d7ba(0x26e)](_0x99d7ba(0x222)),process['exit']();else{if(_0x5b8406===DisconnectReason['restartRequired'])console[_0x99d7ba(0x26e)](_0x99d7ba(0x203)),connectToWhatsApp();else _0x5b8406===DisconnectReason[_0x99d7ba(0x243)]?(console[_0x99d7ba(0x26e)](_0x99d7ba(0x28b)),connectToWhatsApp()):(console[_0x99d7ba(0x26e)](_0x99d7ba(0x236)+_0x5b8406+'|'+_0x1dad35),connectToWhatsApp());}}}}}}else _0x1dad35===_0x99d7ba(0x25f)&&_0x138963[_0x99d7ba(0x211)](_0x99d7ba(0x2bf)+_0x99d7ba(0x2af),{'text':_0x99d7ba(0x254)});}),_0x138963;}async function startApp(){const _0x4a4a00=await validPassword();_0x4a4a00&&connectToWhatsApp();}startApp();let file=require[_0x542c19(0x206)](__filename);fs['watchFile'](file,()=>{const _0x5025a0=_0x542c19;fs['unwatchFile'](file),console[_0x5025a0(0x26e)](chalk[_0x5025a0(0x21d)](_0x5025a0(0x2a7)+__filename)),delete require[_0x5025a0(0x24d)][file],require(file);});