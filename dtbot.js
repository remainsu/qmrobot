const {
  Wechaty,
  FileBox,
  Friendship
} = require('wechaty');
const {
  PuppetPadplus
} = require('wechaty-puppet-padplus');
const QrcodeTerminal = require('qrcode-terminal');
const comutil = require('./utils/comutil');
const checker = require('./utils/checker');
const networkutil = require('./utils/networkutil');
const config = require('./config');

const token = config.basic.TOKEN;
var sensitiveArr = [];

const puppet = new PuppetPadplus({
  token,
});

const name = config.basic.NAME;

const bot = new Wechaty({
  puppet,
  name, // generate xxxx.memory-card.json and save login data for the next login
})

bot
  .on('scan', (qrcode, status) => {
    console.log("onScan");
    QrcodeTerminal.generate(qrcode, {
      small: true
    })
  })
  .on('message', async msg => {

    const contact = msg.from()
    const text = msg.text()
    const room = msg.room()
  
    if (!room) {

      
      msg.say("你好，我是一个机器人，当前功能还不完善，正在努力开发中...")
    }
}).on('login', onLogin)
  .on('logout', onLogout)
  .on('friendship', (friendship) => {
  if(friendship.type() === Friendship.Type.Receive){
    contact = friendship.contact()
    let result = friendship.accept()
      if(result){
        console.log(`Request from ${contact.name()} is accept succesfully!`)
      } else{
        console.log(`Request from ${contact.name()} failed to accept!`)
      }
 } else if (friendship.type() === Friendship.Type.Confirm) {
      console.log(`new friendship confirmed with ${contact.name()}`)
   }
 })
  .on('error', onError)
  .start()
  .catch(console.error);

async function onLogin(user) {
  console.log(`${user} 登录成功`);
}

function onLogout(user) {
  console.log(`${user} logout`)
}

function onError(e) {
  console.error(e)
}
