# BeraniCerdas API Wrapper

An API Wrapper (unofficial) for https://beranicerdas.sekolahkukeren.id website

## Usage
```ts
import { BeraniCerdasAPI } from 'beranicerdas-api';

const beranicerdas = new BeraniCerdasAPI();
// Or (maybe they changed the backend service DNS)
const beranicerdas = new BeraniCerdasAPI('https://newbackend.sekolahkukeren.id');

// Login as user
const user = await beranicerdas.login({
    username: 'use NIK as username',
    password: 'put plain user password here',
});

// Now, you can use 'user' to fetch profile, education, and progress
await user.fetchProfile();
await user.fetchStatus();
await user.fetchProgress();
await user.fetchEducation();

// And, you can update the education, and profile
await user.updateProfile({ ... });
await user.updateEducation({ ... });

// Last, logout (you cant use 'user' after doing this action)
await user.logout();

// But, can I register new user? Of course.
await beranicerdas.register({ ... });
```

## Soon
- Implement verification link method

## License
MIT