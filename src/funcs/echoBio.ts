import { Message } from "discord.js";
import { client } from '../index';

import { scrapingBio } from "../util/scraping";

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

4月27日の誕生花は<strong>「シャガ」</strong>です。,シャガの花言葉は「反抗」「友人が多い」。,<strong>「反抗」「友人が多い」</strong>,花言 葉の「反抗」は、剣状の鋭い葉の様子や陽光を避けて日陰で花を咲かせることにちなむともいわれます。また「友人が多い」の花言葉は、タネができず、地表をはう根茎を伸ばして群落を形成することに由来するといわれます。,,・宮根誠司 （フリーアナウンサー / 1963年4月27日）<br>
・馬場典子 （フリーアナウンサー / 1974年4月27日）<br>
・原千晶 （女優、タレント / 1974年4月27日）<br>
・尾形貴弘 （お笑いタレント / 1977年4月27日）,・婦人警官記念日（婦人警官の日）<br>
1946年のこの日、日本で最初の婦人警察官が勤務を開始したことにちなむ,・哲学の日<br>
紀元前399年のこの日、ソクラテスが毒杯をあおって刑死したことにちなむ,（4月27日の詳細：　<a href="https://ja.wikipedia.org/wiki/4%E6%9C%8827%E6%97%A5" title="wikipedia" target="_blank" rel="noopener noreferrer">Wikipedia</a>）,,★ 「花言葉-由来」の人気ページ<br>
<br>・<a href="https://hananokotoba.com/hanakotoba-ichiran/" title="花言葉一覧へ">花言葉一覧</a>　・<a href="https://hananokotoba.com/gyakubiki/" title="逆引き花言葉へ">逆引き花言葉</a>　・テーマ別花言葉（ <a href="https://hananokotoba.com/kansha/" title="感謝の花言葉へ">感謝</a> / <a href="https://hananokotoba.com/kowai/" title="怖い花言葉へ">怖い</a> / <a href="https://hananokotoba.com/rennai/" title="恋愛の花言葉へ">恋 愛</a> ）　・<a href="https://hananokotoba.com/category/tsuki/" title="各月の花へ">各月の花</a>（ <a href="https://hananokotoba.com/4gatsuhana/" title="4月の花へ">4月の花</a> / <a href="https://hananokotoba.com/5gatsuhana/" title="5月の花へ">5月の花</a> ）　・<a href="https://hananokotoba.com/category/tanjyouka-tsuki/" title="各月の誕生花へ">各月の誕生花</a>（ <a href="https://hananokotoba.com/t04/" title="4月の誕生花へ">4月の誕生花</a> / <a href="https://hananokotoba.com/t05/" title="5月の誕生花へ">5月の誕生花</a> ）　・人気の花（ <a href="https://hananokotoba.com/bara/" title="バラの花言葉へ">バラ</a> / <a href="https://hananokotoba.com/tulip/" title="チューリップの花言葉へ">チューリップ</a> / <a href="https://hananokotoba.com/ran/" title="ランの花言葉へ">ラン</a> / <a href="https://hananokotoba.com/anemone/" title="アネモネの花言葉へ">アネモネ</a> / <a href="https://hananokotoba.com/carnation/" title="カーネーションの花言葉へ">カーネーション</a> / <a href="https://hananokotoba.com/gerbera/" title="ガーベラの花言葉へ">ガーベラ</a> ）
