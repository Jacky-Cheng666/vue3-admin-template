import { defineStore } from 'pinia';
import { loginAPI, userInfoAPI } from '@/api/user/index';
import { Local } from '@/utils/storage';

const useUserStore = defineStore('User', {
  state: () => ({
    username: '',
    avatar: '',
    buttons: [],
  }),
  actions: {
    login({ username, password }) {
      return new Promise((resolve, reject) => {
        loginAPI(username, password)
          .then((res) => {
            Local.set('token', res.data.token);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    userInfo() {
      return new Promise((resolve, reject) => {
        userInfoAPI()
          .then((res) => {
            const { checkUser } = res.data;
            this.username = checkUser.username;
            this.avatar = checkUser.avatar;
            resolve(checkUser);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {},
});

export default useUserStore;
