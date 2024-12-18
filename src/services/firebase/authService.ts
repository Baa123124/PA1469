import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({ 
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    offlineAccess: true,
});


/**
 * Signs up a new user with the provided email, password, and display name.
 *
 * @param email - The email address of the new user.
 * @param password - The password for the new user.
 * @param displayName - The display name for the new user.
 * @returns The newly created user.
 * @throws Will throw an error if the sign-up process fails.
*/
export const signUp = async (email: string, password: string, displayName: string) => {
    try {
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        if (user) {
            await user.updateProfile({
              displayName: displayName,
            });
            await user.getIdTokenResult(true);
        }
        return user;
    } catch (error) {
        throw error;
    }
};


/**
 * Signs in a user with the provided email and password.
 *
 * @param email - The email address of the user.
 * @param password - The password of the user.
 * @returns A promise that resolves to the signed-in user.
 * @throws An error if the sign-in process fails.
*/
export const signIn = async (email: string, password: string) : Promise<FirebaseAuthTypes.User> => {
    try {
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};


/**
 * Signs in a user using Google Sign-In.
 *
 * This function checks for Google Play Services, prompts the user to sign in with their Google account,
 * retrieves the ID token from the sign-in result, and uses it to authenticate with Firebase.
 *
 * @returns {Promise<FirebaseAuthTypes.User>} A promise that resolves to the authenticated Firebase user.
 * @throws {Error} If there is no ID token or play services found or if any other error occurs during the sign-in process.
*/
export const signInWithGoogle = async (): Promise<FirebaseAuthTypes.User> => {
    try {
        const hasPlayServices = await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        if (!hasPlayServices) {
            throw new Error('Google Play Services are not available. Please install or update Google Play Services.');
        }

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



/**
 * Signs out the current user from the Firebase authentication service.
 * 
 * This function checks if the current user is signed in via Google. If so, it revokes
 * the user's access using the Google Sign-In API before signing out the user from Firebase.
 * 
 * @returns {Promise<boolean>} A promise that resolves to `true` if the sign-out process completes successfully.
 * @throws Will throw an error if the sign-out process fails.
*/
export const signOut = async (): Promise<boolean> => {
    try {
        const currentUser = auth().currentUser;
        if (currentUser) {
            // Check if user signed in via Google
            const isGoogleUser = currentUser.providerData.some(
                (provider) => provider.providerId === 'google.com'
            );

            if (isGoogleUser) {
                await GoogleSignin.revokeAccess();
            }

            await auth().signOut();
        }
    } catch (error) {
        throw error;
    }
    return true;
};


/**
 * Subscribes to the authentication state changes.
 *
 * @param callback - A function that takes a `FirebaseAuthTypes.User` object or `null` as an argument.
 *                   This function will be called whenever the user's ID token changes.
 * @returns A function that can be called to unsubscribe from the ID token changes.
*/
export const onAuthStateChanged = (callback: (user: FirebaseAuthTypes.User | null) => void) => {
    return auth().onIdTokenChanged(callback);
};
