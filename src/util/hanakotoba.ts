import puppeteer from 'puppeteer';

const hanakotoba = {
	browser: null as any,
	page: null as any,
	url: 'https://hananokotoba.com/t',

	initialize: async (): Promise<void> => {
		hanakotoba.browser = await puppeteer.launch({
			headless: false,
			slowMo: 50,
			args: ['--no-sandbox', '--disable-setuid-sandbox']
		});

		hanakotoba.page = await hanakotoba.browser.newPage();
		await hanakotoba.page.setDefaultNavigationTimeout(0);
	},

	getHanakotoba: async (): Promise<any> => {
		try {
			const today = hanakotoba.getToday();
			console.log(`goto: ${hanakotoba.url + today}`)
			await hanakotoba.page.goto(hanakotoba.url + today, {waitUntil: 'networkidle2'});
			await hanakotoba.page.waitFor(2000);

			const data = await hanakotoba.page.evaluate(() => {
				const bioDOM = document.querySelectorAll('div.post-single-content>p');
				const data: string[] = []
				bioDOM.forEach(dom => {
					data.push(dom.innerHTML)
				});
				return data;
			});
			// console.log(data)
			return data;
		} catch (error) {
			console.log(error);
			hanakotoba.close();
		}
	},

	getNecessaryWords: async (): Promise<string[]> => {
		try {
			const data = await hanakotoba.getHanakotoba();			const necessaryWords: string[] = []
			data.forEach((word: string) => {
				if (
					word.startsWith('また') ||
					word.startsWith('以下') ||
					word.startsWith('<a') ||
					word.startsWith('旬の') ||
					word.startsWith('開花時期') ||
					word.startsWith('出回り時期') ||
					word.startsWith('花持ち期間') ||
					word.startsWith('<strong><a') ||
					word.startsWith('&nbsp;')) {
					return;
				} else {
					necessaryWords.push(word)
				}
			})
			return necessaryWords;

		} catch (error) {
			console.log(error);
			hanakotoba.close();
			return [''];
		}
	},

	getToday: (): string=> {
		const today = new Date();
		const month = today.getMonth() + 1;
		let targetDate = '';
		const date = today.getDate();
		if (month < 10) {
			targetDate = '0' + `${month}`
		} else {
			targetDate = `${month}`
		}

		if (date < 10) {
			targetDate = targetDate + '0' + `${date}`
		} else {
			targetDate = targetDate + `${date}`
		}
		return targetDate
	},

	close: (): void => {
    hanakotoba.browser.close();
  }
};


export const scrapingBio = async(): Promise<any> => {
	await hanakotoba.initialize();
	const data = await hanakotoba.getNecessaryWords();
	hanakotoba.close();

	return data;
}

scrapingBio();