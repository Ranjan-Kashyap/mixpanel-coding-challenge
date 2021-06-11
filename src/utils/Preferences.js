import AsyncStorage from '@react-native-community/async-storage';
class Preferences {
  static setUser(data) {
    AsyncStorage.setItem('user', data);
  }

  static getUser() {
    return AsyncStorage.getItem('user');
  }

  static clearAppData() {
    AsyncStorage.clear();
  }
}

export default Preferences;
