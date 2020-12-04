const config = require("./config.json");
const Discord = require("discord.js");
const prefix = config.prefix;


//Орел или решка
function headsOrTrails(robot, mess, args) {
	mess.channel.send("Монета подбрасыватся...");

	let randomNum = Math.floor(Math.random() * 3) + 1;

	if (randomNum === 1) {
		mess.channel.send(":full_moon: Орёл!");
	} else if (randomNum === 2) {
		mess.channel.send(":new_moon: Решка!");
	} else if (randomNum === 3) {
		mess.channel.send(":last_quarter_moon: Монета упала на ребро!");
	}
}

//ММ или фейсит

function faceitOr(robot, mess, args) {

	let randomNum = Math.floor(Math.random() * 2) + 1;

	if(randomNum === 1) {
		mess.channel.send('Идем Faceit • :regional_indicator_f:');
	}
	else if(randomNum === 2) {
		mess.channel.send('Идем ММ • :regional_indicator_m: :regional_indicator_m:');
	}

}

function randomChoice(robot, mess, args) {
	const arggs = mess.content.split(' ').slice(1);
	const amount = arggs.join(' ');
	if(!amount){
		return mess.channge.send("Ты что настолько туп, что забыл указать кол-во?! :rage:");
	}
	if(isNaN(amount)){
		return mess.channel.send("Это не число! Баран! :goat:");
	}

	async function randomValue() {
		await mess.channel.messages
		.fetch({
			limit: amount,
		})
		.then((messages) => {
			let randomNum = Math.floor(Math.random() * amount) + 1;
			mess.channel.send(`⦿ Число: ${randomNum}`);
		});
	};
	process.on("unhandledRejection", (error) => {
		console.error("Unhandled promise rejection:", error);
	});
	randomValue();
	
	
}


//Удалить кол-во сообщений

function clear(robot, mess, args) {
	const arggs = mess.content.split(" ").slice(1);
	const amount = arggs.join(" ");
	if (!amount)
		return mess.channel.send(
			"Ты что настолько туп, что забыл указать кол-во?! :rage:"
		);
	if (isNaN(amount)) return mess.channel.send("Это не число! Баран! :goat:");
	if (amount > 100)
		return mess.channel.send(
			"Больше 100? Не пошел бы ты на... :face_with_symbols_over_mouth:"
		);

	async function delete_message() {
		await mess.channel.messages
			.fetch({
				limit: amount,
			})
			.then((messages) => {
				mess.channel.bulkDelete(messages);
				mess.channel.send(
					`Очистил ваш сервер на ${amount} сообщений. Да да я!`
				);
			});
	}
	process.on("unhandledRejection", (error) => {
		console.error("Unhandled promise rejection:", error);
	});

	delete_message();
}

//Команды
let comms_list = [
	{
		name: 'Играть',
		out: faceitOr,
		about: 'Мм или фейсит'
	},
	{
		name: "Монета",
		out: headsOrTrails,
		about: "Орел или решка"
	},
	{
		name: "Удалить",
		out: clear,
		about: "Удалить сообщения"
	},
	{
		name: "Рандом",
		out: randomChoice,
		'about': 'Рандомное число'
	}
];

module.exports.comms = comms_list;
