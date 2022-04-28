import { checkIfSubscribed, generateNewManifest, sendNewManifest } from '../src/modules/service';
import manifest from './helpers/mockManifest.json';
const bundlr = jest.mock('@bundlr-network/client');

describe('Service', () => {
	describe('checkIfSubscribed', () => {
		test('custom url asset already subscribed', () => {
			const isAlreadySubscribed = checkIfSubscribed(
				manifest,
				'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD'
			);
			expect(isAlreadySubscribed).toBeTruthy();
		});

		test('custom url asset not subscribed', () => {
			const isAlreadySubscribed = checkIfSubscribed(
				manifest,
				'https://notSubscribed'
			);
			expect(isAlreadySubscribed).toBeFalsy();
		});
	});

	describe('generateNewManifest', () => {
		test('generate new manifest with new custom oracle url and jsonpath', async () => {
			const newManifest = generateNewManifest(manifest, 'https://newUrl', 'newJsonpath');
			expect(newManifest).toEqual({
				...manifest,
				'0x16e82b57b6e71a276ff1675ec5f9883dde238d28636ca5fa2f16252fe57509f2': {
						customUrlDetails: {
							jsonpath: 'newJsonpath',
						 	url: 'https://newUrl'
					},
				},
			});
		});
	});
});