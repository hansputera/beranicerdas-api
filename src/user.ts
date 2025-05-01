import type { Got } from 'got';
import type { Auth, ClearResponses, Product, Profile } from './types/index.js';
import { AuthRouteEnums, ProfileRouteEnums } from './enums/routes.js';
import { onlyKeys } from './utils/onlyKeys.js';

/**
 * @class User
 */
export class User {
	protected http: Got;
	/**
	 * @constructor
	 * @param token JWT Token
	 * @param parentHttp BeraniCerdas HTTP Client
	 */
	constructor(
		token: string,
		parentHttp: Got,
		public user: Auth.LoginResponse['data']['user'],
	) {
		this.http = parentHttp.extend({
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	}

	/**
	 * Fetch user's data profile
	 * @return {Promise<Product.ProfileData>}
	 */
	public async fetchProfile(): Promise<Product.ProfileData> {
		return this.http
			.get(ProfileRouteEnums.Profile)
			.json<Profile.ProfileResponse>()
			.then((res) => res.data.ppdb_user);
	}

	/**
	 * Fetch current scholarship progress
	 * @return {Promise<Product.Progress>}
	 */
	public async fetchProgress(): Promise<Product.Progress> {
		return this.http
			.get(ProfileRouteEnums.Progress)
			.json<Profile.ProgressResponse>()
			.then((res) => onlyKeys(res.data, 'track_status', 'education', 'profile'));
	}

	/**
	 * Fetch current scholarship statuses
	 * @return {Promise<ClearResponses.StatusResponse>}
	 */
	public async fetchStatus(): Promise<ClearResponses.StatusResponse> {
		return this.http
			.get(ProfileRouteEnums.Status)
			.json<Profile.StatusResponse>()
			.then((res) => ({
				logs: res.data.ppdb_log,
				user: res.data.ppdb_user,
			}));
	}

	/**
	 * Fetch current education status
	 * @return {Promise<Profile.EducationResponse['data']>}
	 */
	public async fetchEducation(): Promise<Profile.EducationResponse['data']> {
		return this.http
			.get(ProfileRouteEnums.Education)
			.json<Profile.EducationResponse>()
			.then((res) => res.data);
	}

	/**
	 * Update current user profile data
	 * @param payload Update profile JSON payload
	 * @return {Promise<Product.Progress>}
	 */
	public async updateProfile(payload: Auth.LoginPayload): Promise<Product.Progress> {
		return this.http
			.post(ProfileRouteEnums.Profile, { json: payload })
			.json<Profile.UpdatedDataResponse>()
			.then((res) => onlyKeys(res.data.progress, 'education', 'profile', 'track_status'));
	}

	/**
	 * Update current user education data
	 * @param payload Update education JSON payload
	 * @return {Promise<Product.Progress>}
	 */
	public async updateEducation(
		payload: Profile.UpdateEducationPayload,
	): Promise<Product.Progress> {
		return this.http
			.post(ProfileRouteEnums.Education, { json: payload })
			.json<Profile.UpdatedDataResponse>()
			.then((res) => onlyKeys(res.data.progress, 'education', 'profile', 'track_status'));
	}

	public async logout(): Promise<void> {
		await this.http.post(AuthRouteEnums.Logout);
	}
}
