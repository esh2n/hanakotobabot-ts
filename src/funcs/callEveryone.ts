import { Message } from "discord.js";
import { client } from '../index';


((): void => {
	client.on('message', (message: Message) => {
		((): void => {
			const content = message.content;
			if (message.author.bot) return;
				if (content.includes("のまぼ")) {
					message.channel.send(
						`
						🙇‍♂️ @everyone
						> ${message.author.username}さんがノーマル募集中！
						`
					);
					message.react('🥺');
				}

				if (content.includes("ぱちぼ")) {
					message.channel.send(
						`
						🙇‍♂️ @パチカス
						> ${message.author.username}さんがパチンコ募集中！
						`
					);
					message.react('🥺');
				}

		})();
	});
})();