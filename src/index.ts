import got, { type Got } from 'got';
import type { Auth, ClearResponses } from './types/index.js';
import { AuthRouteEnums } from './enums/routes.js';
import { User } from './user.js';

/**
 * @class BeraniCerdasAPI
 */
export class BeraniCerdasAPI {
	protected http: Got;

	/**
	 * @constructor
	 * @param baseUrl BeraniCerdas's backend URL
	 */
	constructor(protected baseUrl = 'https://service.beranicerdas.sekolahkukeren.id') {
		this.http = got.extend({
			prefixUrl: baseUrl,
			headers: {
				'User-Agent':
					'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0',
				Origin: baseUrl,
				Referer: new URL('./', baseUrl).href,
			},
		});
	}

	/**
	 * Login to user
	 * @param payload Login JSON Payload
	 * @return {Promise<User>}
	 */
	public async login(payload: Auth.LoginPayload): Promise<User> {
		const response = await this.http
			.post(AuthRouteEnums.Login, {
				json: payload,
				throwHttpErrors: false,
			})
			.json<Auth.LoginResponse>();

		if (!response.token) {
			throw new Error('Failed to logged in because incorrect NIK or Password');
		}

		return new User(response.token, this.http, response.data.user);
	}

	/**
	 * Register new user
	 * @param payload Register JSON Payload
	 * @return {Promise<ClearResponses.RegisterResponse>}
	 */
	public async register(payload: Auth.RegisterPayload): Promise<ClearResponses.RegisterResponse> {
		const response = await this.http
			.post(AuthRouteEnums.Register, {
				json: payload,
				throwHttpErrors: false,
			})
			.json<Auth.RegisterResponse>();

		if ('form' in response) {
			const errors = Object.keys(response.form).map((key) => ({
				field: key,
				error: response.form[key].at(0) ?? '',
			}));

			return {
				errors,
				token: '',
			};
		}

		return {
			errors: [],
			token: response.token,
		};
	}
}
