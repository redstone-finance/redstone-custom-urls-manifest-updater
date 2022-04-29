import { generateNewManifest } from '../src/modules/manifest.service';
import { checkIfSubscribed } from '../src/utils';
import manifest from './helpers/mockManifest.json';

describe('Service', () => {
	describe('checkIfSubscribed', () => {
		test('custom url asset already subscribed', () => {
			const isAlreadySubscribed = checkIfSubscribed(
				manifest,
				'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD',
				'$.RAW.ETH.USD.PRICE'
			);
			expect(isAlreadySubscribed).toBeTruthy();
		});

		test('custom url asset not subscribed', () => {
			const isAlreadySubscribed = checkIfSubscribed(
				manifest,
				'https://notSubscribed',
				'notSubscribedManifest'
			);
			expect(isAlreadySubscribed).toBeFalsy();
		});
	});

	describe('generateNewManifest', () => {
		test('generate new manifest with new custom oracle url and jsonpath', async () => {
			const newManifest = generateNewManifest(manifest, 'https://newUrl', 'newJsonpath');
			expect(newManifest).toEqual({
				...manifest,
				'0x16e82b57b6e71a27': {
						customUrlDetails: {
							jsonpath: 'newJsonpath',
						 	url: 'https://newUrl'
					},
				},
			});
		});
	});
});
