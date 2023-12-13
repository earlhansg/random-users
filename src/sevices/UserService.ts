class UserService {
  constructor() {}
  async fetchUsers() {
    try {
      const response = await fetch(
        "https://randomuser.me/api/?results=10"
      );
      // console.log("service", response.json())
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}

export default new UserService();
