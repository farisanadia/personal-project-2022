export default function usersService(){
  constructor() {
    this.user = null;
  }
  
  setCurrentUser(user) {
    this.user = user;
  }

  getCurrentUser() {
    return this.user;
  }
};