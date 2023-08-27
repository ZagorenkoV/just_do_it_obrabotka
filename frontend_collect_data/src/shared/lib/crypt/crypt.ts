const CryptoJS = require('crypto-js');
const SecureStorage = require('secure-web-storage');

const SECRET_KEY = 'my secret key4324';

export const secureStorage = new SecureStorage(localStorage, {
    hash: function hash(key: any) {
        key = CryptoJS.SHA256(key, SECRET_KEY);

        return key.toString();
    },
    encrypt: function encrypt(data: any) {
        data = CryptoJS.AES.encrypt(data, SECRET_KEY);

        data = data.toString();

        return data;
    },
    decrypt: function decrypt(data: any) {
        data = CryptoJS.AES.decrypt(data, SECRET_KEY);

        data = data.toString(CryptoJS.enc.Utf8);

        return data;
    },
});

// eslint-disable-next-line import/no-mutable-exports
export let decryptData: any;

if (secureStorage.getItem('data') !== null) {
    // eslint-disable-next-line prefer-destructuring
    decryptData = (Object.values(secureStorage.getItem('data'))[0]);
} else {
    decryptData = null;
}
