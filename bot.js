const Discord = require("discord.js");
const robot = new Discord.Client();
const comms = require("./comms.js");
const fs = require("fs");
// let config = require("./config.json");
const USER_ID = '374863997209673738';

let filesArray = [
'images/llyfan1.jpg',
'images/llyfan2.jpg',
'images/llyfan3.jpg',
'images/llyfan4.jpg',
'images/llyfan5.jpg',
'images/llyfan6.jpg',
'images/llyfan7.webp',
'images/llyfan8.webp',
'images/llyfan9.webp',
'images/llyfan10.webp',
'images/llyfan11.webp',
'images/llyfan12.webp',
'images/llyfan13.webp',
'images/llyfan14.webp',
'images/llyfan15.gif',
'images/llyfan16.gif',
'images/llyfan17.webp',
'images/llyfan18.webp',
'images/llyfan19.webp',
'images/llyfan20.webp',
'images/llyfan21.webp',
'images/llyfan22.mp3',
'images/llyfan23.webp',
'images/llyfan24.webp',
'images/llyfan25.webp',
'images/llyfan26.gif',
'images/llyfan27.gif',
'images/llyfan28.mp3',
'images/llyfan29.mp3'

];

let phrasesArray = [
'Лобковый голос',
'Пиздохлоп',
'Облямудевшаяпиздопроушина',
'Семирукий восьмихуй',
'Самоходная пизда',
'Вяло дрочащий',
'Пиздушкин чепчик',
'Хуепутало',
'Мудовое рыдание',
'Пиздорез',
'Пиздянка',
'Хуй стоптанный',
'Конина блядская',
'Перемандоблядскоестрахоперепиздовище',
'Ошибка аборта',
'Хуерыгало',
'Нулина',
'Днище'
];




// let token = config.token;
//let prefix = config.prefix;
let prefix = PREFIX;

robot.on("ready", () => {
	console.log(robot.user.username + " started!");
});

robot.on("message", (msg) => {
	//answer on current user ID
	if(msg.author.id === USER_ID) {
		let randomArr = Math.floor(Math.random() * filesArray.length);
		let randomPhrase = Math.floor(Math.random() * phrasesArray.length);
		msg.reply(`Пошел нахуй, ${phrasesArray[randomPhrase]}`);
		msg.channel.send({files: [filesArray[randomArr]]});
	}

	if (
		msg.author.username != robot.user.username &&
		msg.author.discriminator != robot.user.discriminator
	) {
		let comm = msg.content.trim() + " ";
		let comm_name = comm.slice(0, comm.indexOf(" "));
		let messArr = comm.split(" ");

		for (comm_count in comms.comms) {
			let comm2 = prefix + comms.comms[comm_count].name;
			if (comm2 == comm_name) {
				comms.comms[comm_count].out(robot, msg, messArr);
			}
		}
	}

	
	
});

robot.login();
