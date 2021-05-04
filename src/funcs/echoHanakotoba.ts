/* eslint-disable @typescript-eslint/camelcase */
import { TextChannel } from "discord.js";
import { client } from '../index';
import  cron  from 'node-cron';

import { scrapingHanakotoba as hanakotoba } from "../util/hanakotoba";

((): void => {
	cron.schedule('0 0 10 * * *', () => {
	// cron.schedule('* * * * *', () => {
		(async (): Promise<void> => {
			const data = await hanakotoba();
			if (data == null) return;
			const channel = client.channels.cache.get('832885404944433175') as TextChannel;
			channel.send({
				embed: {
					title: `${data.today}の花言葉`,
					color: 7506394,
				}
			})
			for (let i = 0; i < data.flowers.length; i++) {
				channel.send({
					embed: {
						title: data.flowers[i].name,
						color: 0xffffff,
						footer: {
							icon_url: data.flowers[i].img,
							text: "©️ 2021 | hanakotoba bot"
						},
						fields: [
							{
								name: "花言葉",
								value: data.flowers[i].hanakotoba,
							},
							{
								name: "由来",
								value: data.flowers[i].origin.join('/'),
							}
						],
						image: {
							url: data.flowers[i].img,
						},
					}
				})
			}

		})();
	})
})();