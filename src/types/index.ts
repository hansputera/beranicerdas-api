export type ServiceResponse<T> = T & {
	message: string;
	status?: string;
};

export type ServiceFormErrorResponse = ServiceResponse<{
	form: Record<string, string[]>;
}>;

export namespace Product {
	export type User = {
		created_at: string;
		role: string;
		updated_at: string;
		username: string;
		id: string;
		password: string; // bcrypt encrypted
		email_verified_at?: string;
	};

	export type UserRegister = {
		created_at: string;
		updated_at: string;
		users_id: string;
		id: string;
		name: string;
		nik: string;
		nisn?: string;
		school_origin?: string;
		status: string;
		graduation_year?: number;
		birthday?: string;
		birthplace?: string;
	};

	export type ProfileData = Pick<User, 'created_at' | 'updated_at' | 'id'> & {
		address?: string;
		birthday?: string;
		city?: string;
		coordinate_status: string;
		distrik?: string;
		email: string;
		fakultas?: string;
		gender?: string;
		/** Jenjang Pendidikan */
		grade?: string;
		/** Kode Pos */
		home_number?: string;
		img_path?: string;
		img_url?: string;
		jurusan?: string;
		location_pendidikan?: string;
		name: string;
		nik: string;
		phone: string;
		phone_parent?: string;
		/** Progress Status */
		ppdb_track_status: string;
		prodi?: string;
		province: string;
		rt?: string;
		rw?: string;
		status_lulus: string;
		status_pendidikan: string;
		/** Beasiswa jenis apa? */
		status_sekolah: string;
		sub_distrik?: string;
		type_help?: string;
		ukt?: number;
		universitas?: string;
	};

	export type Progress = {
		education: string;
		profile: string;
		track_status: string;
	};

	export type Log = {
		created_at: string;
		updated_at: string;
		date: string;
		description: string;
		id: string;
		name: string;
		ppdb_user_id: string;
		status: string;
	};
}

export namespace Profile {
	export type ProfileResponse = ServiceResponse<{
		data: {
			ppdb_user: Product.ProfileData;
		};
	}>;

	export type StatusResponse = ServiceResponse<{
		data: {
			ppdb_log: Array<Product.Log>;
			ppdb_user: Pick<
				Product.ProfileData,
				| 'name'
				| 'city'
				| 'address'
				| 'rt'
				| 'rw'
				| 'id'
				| 'distrik'
				| 'sub_distrik'
				| 'province'
				| 'ppdb_track_status'
				| 'coordinate_status'
			>;
		};
	}>;

	export type EducationResponse = ServiceResponse<{
		data: {
			/** Beasiswa yang diinginkan */
			education: string[];
			/** Posisi mengambil beasiswa */
			location: string[];
			/** current user data */
			ppdb_user: Product.ProfileData;
			/** daftar prodi yang tersedia */
			prodi: string;
			/** status pendidikan sekarang */
			status_pendidikan: string[];
			/** Universitas jenis apa? Swasta/Negeri */
			status_sma: string[];
			/** Daftar universitas yang tersedia */
			univercity: string[];
		};
	}>;

	export type ProgressResponse = ServiceResponse<{
		data: Product.Progress;
	}>;

	export type UpdatedDataResponse = ServiceResponse<{
		data: {
			progress: Product.Progress;
		};
	}>;

	export type UpdateEducationPayload = {
		fakultas: string;
		jurusan: string;
		location_pendidikan: string;
		prodi: string;
		status_pendidikan: string;
		status_sekolah: string;
		ukt: string;
		universitas: string;
	};

	export type UpdateProfilePayload = {
		name: string;
		nik: string;
		birthplace: string;
		birthday: string;
		gender: string;
		email: string;
		phone: string;
		phone_parent: string;
		province: string;
		city: string;
		distrik: string;
		sub_distrik: string;
		rt: string;
		rw: string;
		address: string;
		home_number: string;
		type_help: string;
		grade: string;
	};
}

export namespace Auth {
	export type RegisterPayload = {
		email: string;
		name: string;
		nik: string;
		password: string;
		password_confirmation: string;
		phone: string;
	};

	export type LoginPayload = {
		username: string;
		password: string;
	};

	export type RegisterResponse =
		| ServiceResponse<{
				token: string;
		  }>
		| ServiceFormErrorResponse;

	export type LoginResponse = ServiceResponse<{
		token: string;
		data: {
			user: Product.User & {
				register: Product.UserRegister;
			};
		};
	}>;
}

export namespace ClearResponses {
	export type StatusResponse = {
		logs: Product.Log[];
		user: Profile.StatusResponse['data']['ppdb_user'];
	};

	export type RegisterResponse = {
		errors: Array<{
			field: string;
			error: string;
		}>;

		token: string;
	};
}
