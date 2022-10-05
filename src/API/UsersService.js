import axios from "axios";
export default class UsersService {
    static async getAll(example = 'all') {
        const response = await axios.get('https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users', {
            params: {
                __example: example,
            }
        });
        return response.data;
    };
}