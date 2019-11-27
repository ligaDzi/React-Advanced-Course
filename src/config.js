import firebase from 'firebase'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

/**
 * Конфигурация firebase
 */
export const appName = "advreact-494d7"
export const firebaseConfig = {
    apiKey: "AIzaSyCYkIhvBeDEviS_r_gHo7MfxMlVI9eIACE",
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: `${appName}.appspot.com`,
    messagingSenderId: "498974754140",
    appId: "1:498974754140:web:12abb50bce5d6010726d99",
    measurementId: "G-ZG19JW45EY"
}

firebase.initializeApp(firebaseConfig);

/**
 * кофигурация Enzyme
 */
Enzyme.configure({ adapter: new Adapter() })