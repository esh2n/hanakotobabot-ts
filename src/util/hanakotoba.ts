import puppeteer from 'puppeteer';

const hanakotoba = {
	browser: null as any,
	page: null as any,
	url: 'https://hananokotoba.com/t',

	initialize: async (): Promise<void> => {
		hanakotoba.browser = await puppeteer.launch({
			headless: true,
			slowMo: 50,
			args: ['--no-sandbox', '--disable-setuid-sandbox']
		});

		hanakotoba.page = await hanakotoba.browser.newPage();
		await hanakotoba.page.setDefaultNavigationTimeout(0);
	},

	getHanakotoba: async (): Promise<DataPayload | null> => {
		try {
			const today = hanakotoba.getToday();
			const targetURL = `${hanakotoba.url + today.url}`;
			console.log(`goto: ${targetURL}`)
			await hanakotoba.page.goto(targetURL, {waitUntil: 'networkidle2'});
			await hanakotoba.page.waitFor(5000);

			const data = await hanakotoba.page.evaluate((targetURL: string, today: DateObject) => {
				const data = {} as DataPayload
				data.url = targetURL
				data.today = today.str

				const initialDOM = document.querySelector('div.topad+p');
				if (initialDOM) {
					data.initial = initialDOM.innerHTML.replace(/<\/?strong>/g, "")
				}
				const countOfFlowers: number = data.initial.split("」").length - 1
				data.flowers = []
				for (let i = 0; i < countOfFlowers; i++) {
					const suffix1 = i == 0 ? "" : `-${i + 1}`
					const suffix2 = i == 0 ? "" : `-${(3 * (i + 1)) - 2}`
					const flowerDOM = document.getElementById(`${today.dom + suffix1}`)
					if (flowerDOM) {
						const flower = {} as FlowerInfo

						flower.name = flowerDOM.innerHTML.replace(/[0-9]+月[0-9]+日の誕生花/g, "").replace(/[「」]/g, "")

						const hanakotoba = document.getElementById(`i${suffix2}`)?.parentNode?.nextSibling?.nextSibling?.textContent
						flower.hanakotoba = `${hanakotoba}`

						const isExistOrient = document.getElementById(`i${suffix2}`)?.parentNode?.nextSibling?.nextSibling?.nextSibling?.nextSibling?.textContent?.startsWith("西洋の")
						let origin;
						if (isExistOrient) {
							origin = document.getElementById(`i${suffix2}`)?.parentNode?.nextSibling?.nextSibling?.nextSibling?.nextSibling?.nextSibling?.nextSibling?.nextSibling?.nextSibling?.nextSibling?.nextSibling
						} else {
							origin = document.getElementById(`i${suffix2}`)?.parentNode?.nextSibling?.nextSibling?.nextSibling?.nextSibling
						}
						flower.origin = []
						flower.origin.push(`${origin?.textContent}`)
						if (Object.prototype.toString.call(origin?.nextSibling?.nextSibling) == "[object HTMLParagraphElement]") {
							flower.origin.push(`${origin?.nextSibling?.nextSibling?.textContent}`)
						}

						const regexp = /src=["']?([a-zA-Z0-9_./\-:%?&#=;]+)["']?/g
						const img = regexp.exec(flowerDOM.parentNode?.nextSibling?.nextSibling?.textContent ?? '')
						flower.img = ""
						if (img != null) {
							console.log(img[1])
							flower.img = `${img[1]}`
						}
						data.flowers.push(flower)
					}
				}
				console.log(data.flowers)
				return data;
			}, targetURL, today);
			await hanakotoba.page.waitFor(5000);
			const returnedData = data as DataPayload
			console.log(returnedData)
			return returnedData;
		} catch (error) {
			console.log(error)
			hanakotoba.close()
			return null
		}
	},
	getToday: (): DateObject => {
		const today = new Date();
		const month = today.getMonth() + 1;
		const targetDates = {
			url: '',
			dom: '',
			str: '',
		};
		const date = today.getDate();

		if (month < 10) {
			targetDates.url = '0' + `${month}`
		} else {
			targetDates.url = `${month}`
		}
		if (date < 10) {
			targetDates.url = targetDates.url + '0' + `${date}`
		} else {
			targetDates.url = targetDates.url + `${date}`
		}

		targetDates.dom = `${month}`
		targetDates.dom = targetDates.dom + `${date}`

		targetDates.str = `${month}月${date}日`

		return targetDates
	},

	close: (): void => {
    hanakotoba.browser.close();
	}
};


export const scrapingHanakotoba = async(): Promise<DataPayload | null> => {
	await hanakotoba.initialize();
	const data = await hanakotoba.getHanakotoba();
	hanakotoba.close();

	return data;
}

// scrapingHanakotoba();

interface DateObject {
	url: string;
	dom: string;
	str: string;
}

interface FlowerInfo {
	name: string;
	hanakotoba: string;
	origin: string[];
	img: string;
}

interface DataPayload {
	today: string;
	url: string;
	initial: string;
	flowers: FlowerInfo[];
}
