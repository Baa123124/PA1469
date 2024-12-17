import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({ 
    webClientId: process.env.GOOGLE_WEB_CLIENT_ID,
    offlineAccess: true,
});

//sign up with email and password
export const signUp = async (email: string, password: string) => {
    try {
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};

//Sign in with email and password
export const signIn = async (email: string, password: string) => {
    try {
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};

//Sign in with Google
export const signInWithGoogle = async () => {
    try {
        await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
        const signInResult = await GoogleSignin.signIn();
        const idToken = signInResult?.data?.idToken;
        if (!idToken) {
            throw new Error('No ID token found');
        }
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        return (await auth().signInWithCredential(googleCredential)).user;
    } catch (error) {
        throw error;
    }
};

//Sign out
export const signOut = async () => {
    try {
        await auth().signOut();
    } catch (error) {
        throw error;
    }
};

//Listen for authentication state changes
export const onAuthStateChanged = (callback: (user: FirebaseAuthTypes.User | null) => void) => {
    return auth().onAuthStateChanged(callback);
};
