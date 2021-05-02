import { Message } from "discord.js";
import { client } from '../index';

import { scrapingBio } from "../util/hanakotoba";

((): void => {
	client.on('message', (message: Message) => {
		(async (): Promise<void> => {
			const content = message.content;
			if (message.author.bot) return;
			switch (true) {
				case /^\/bio (.+)$/.test(content): {
					const user = RegExp.$1;
					message.channel.send(
						`
						📈Twitterで${user}の自己紹介を検索中...
						`
						);
					const data = await scrapingBio(user);
					message.channel.send(
						`
						> ${data}
						`
					);
					message.react('🥺');
					break;
				}
				default:
					break;
			}
		})();
	});
})();