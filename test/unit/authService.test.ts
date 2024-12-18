import { signUp, signIn, signInWithGoogle, signOut, onAuthStateChanged } from '../../src/services/firebase/authService';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

jest.mock('@react-native-firebase/auth');
jest.mock('@react-native-google-signin/google-signin');

const mockUser: Partial<FirebaseAuthTypes.User> = {
    uid: 'mock-uid',
    email: 'mock@mocked.com',
    displayName: 'Mock User',
    providerData: [
      {
        uid: 'google-uid',
        providerId: 'google.com',
        displayName: 'Mock Google User',
        email: 'mock@mocked.com',
        phoneNumber: undefined,
        photoURL: undefined,
      },
    ],
    updateProfile: jest.fn(async () => {}),
    getIdTokenResult: jest.fn(async () => ({
      token: 'mock-token',
      claims: {},
      authTime: 'mock-auth-time',
      issuedAtTime: 'mock-issued-at-time',
      expirationTime: 'mock-expiration-time',
      signInProvider: 'google.com',
    } as FirebaseAuthTypes.IdTokenResult)),
};

describe('signUp with email and password', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should sign up a user and update the profile successfully', async () => {
        (auth().createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
            user: mockUser,
        });

        const result = await signUp('mock@mocked.com', 'password123', 'Mock User');

        expect(auth().createUserWithEmailAndPassword).toHaveBeenCalledWith(
            'mock@mocked.com',
            'password123'
        );
        expect(mockUser.updateProfile).toHaveBeenCalledWith({ displayName: 'Mock User' });
        expect(mockUser.getIdTokenResult).toHaveBeenCalledWith(true);
        expect(result).toEqual(mockUser);
    });

    test('should throw an error if sign-up fails', async () => {
        const errorMessage = 'Sign-up failed';
        (auth().createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(new Error(errorMessage));

        await expect(signUp('mock@mocked.com', 'password123', 'Mock User')).rejects.toThrow(errorMessage);
    });
});

describe('signInWithGoogle', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should sign in a user with Google successfully', async () => {
        (GoogleSignin.hasPlayServices as jest.Mock).mockResolvedValue(true);
        (GoogleSignin.signIn as jest.Mock).mockResolvedValue({
            data: { idToken: 'mock-id-token' },
        });
        (auth.GoogleAuthProvider.credential as jest.Mock).mockReturnValue('mock-credential');
        (auth().signInWithCredential as jest.Mock).mockResolvedValue({
            user: mockUser,
        });

        const result = await signInWithGoogle();

        expect(GoogleSignin.hasPlayServices).toHaveBeenCalledWith({ showPlayServicesUpdateDialog: true });
        expect(GoogleSignin.signIn).toHaveBeenCalled();
        expect(auth.GoogleAuthProvider.credential).toHaveBeenCalledWith('mock-id-token');
        expect(auth().signInWithCredential).toHaveBeenCalledWith('mock-credential');
        expect(result).toEqual(mockUser);
    });

    test('should throw an error if no ID token is found', async () => {
        (GoogleSignin.hasPlayServices as jest.Mock).mockResolvedValue(true);
        (GoogleSignin.signIn as jest.Mock).mockResolvedValue({
            data: {},
        });

        await expect(signInWithGoogle()).rejects.toThrow('No ID token found');
    });

    test('should throw an error if Google sign-in fails', async () => {
        const errorMessage = 'Google sign-in failed';
        (GoogleSignin.hasPlayServices as jest.Mock).mockResolvedValue(true);
        (GoogleSignin.signIn as jest.Mock).mockRejectedValue(new Error(errorMessage));

        await expect(signInWithGoogle()).rejects.toThrow(errorMessage);
    });

    test('should throw an error if Play Services are not available', async () => {
        const errorMessage = 'Google Play Services are not available. Please install or update Google Play Services.';
        (GoogleSignin.hasPlayServices as jest.Mock).mockResolvedValue(false);
    
        await expect(signInWithGoogle()).rejects.toThrow(errorMessage);
    
        expect(GoogleSignin.hasPlayServices).toHaveBeenCalledWith({ showPlayServicesUpdateDialog: true });
    });

    test('should throw an error if signInWithCredential fails', async () => {
        const errorMessage = 'Invalid Google credentials';
    
        (GoogleSignin.hasPlayServices as jest.Mock).mockResolvedValue(true);
        (GoogleSignin.signIn as jest.Mock).mockResolvedValue({
            data: { idToken: 'mock-id-token' },
        });
        (auth.GoogleAuthProvider.credential as jest.Mock).mockReturnValue('mock-credential');
        (auth().signInWithCredential as jest.Mock).mockRejectedValue(new Error(errorMessage));
    
        await expect(signInWithGoogle()).rejects.toThrow(errorMessage);
    });
});

describe('signOut', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        auth().currentUser = mockUser as FirebaseAuthTypes.User;
    });

    test('should sign out a user successfully', async () => {
        auth().currentUser = mockUser as FirebaseAuthTypes.User;
        (auth().signOut as jest.Mock).mockResolvedValue(undefined);
        (GoogleSignin.revokeAccess as jest.Mock).mockResolvedValue(undefined);

        const result = await signOut();

        expect(auth().signOut).toHaveBeenCalled();
        expect(result).toBe(true);
    });

    test('should revoke Google access if user signed in via Google', async () => {
        mockUser.providerData = [{ providerId: 'google.com', uid: 'google-uid' }];
        auth().currentUser = mockUser as FirebaseAuthTypes.User;
        (auth().signOut as jest.Mock).mockResolvedValue(undefined);
        (GoogleSignin.revokeAccess as jest.Mock).mockResolvedValue(undefined);

        const result = await signOut();

        expect(GoogleSignin.revokeAccess).toHaveBeenCalled();
        expect(auth().signOut).toHaveBeenCalled();
        expect(result).toBe(true);
    });

    test('should throw an error if sign-out fails', async () => {
        const errorMessage = 'Sign-out failed';
        auth().currentUser = mockUser as FirebaseAuthTypes.User;
        (auth().signOut as jest.Mock).mockRejectedValue(new Error(errorMessage));

        await expect(signOut()).rejects.toThrow(errorMessage);
    });
});

describe('onAuthStateChanged', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call the callback with the user when the ID token changes', () => {
        const mockCallback = jest.fn();
        const mockUnsubscribe = jest.fn();
        (auth().onIdTokenChanged as jest.Mock).mockImplementation((callback) => {
            callback(mockUser);
            return mockUnsubscribe;
        });

        const unsubscribe = onAuthStateChanged(mockCallback);

        expect(auth().onIdTokenChanged).toHaveBeenCalledWith(mockCallback);
        expect(mockCallback).toHaveBeenCalledWith(mockUser);
        expect(unsubscribe).toBe(mockUnsubscribe);
    });

    test('should call the callback with null when the user signs out', () => {
        const mockCallback = jest.fn();
        const mockUnsubscribe = jest.fn();
        (auth().onIdTokenChanged as jest.Mock).mockImplementation((callback) => {
            callback(null);
            return mockUnsubscribe;
        });

        const unsubscribe = onAuthStateChanged(mockCallback);

        expect(auth().onIdTokenChanged).toHaveBeenCalledWith(mockCallback);
        expect(mockCallback).toHaveBeenCalledWith(null);
        expect(unsubscribe).toBe(mockUnsubscribe);
    });
});    

describe('signIn', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should sign in a user with email and password successfully', async () => {
        (auth().signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
            user: mockUser,
        });

        const result = await signIn('mock@mocked.com', 'password123');

        expect(auth().signInWithEmailAndPassword).toHaveBeenCalledWith(
            'mock@mocked.com',
            'password123'
        );
        expect(result).toEqual(mockUser);
    });

    test('should throw an error if sign-in fails', async () => {
        const errorMessage = 'Sign-in failed';
        (auth().signInWithEmailAndPassword as jest.Mock).mockRejectedValue(new Error(errorMessage));

        await expect(signIn('mock@mocked.com', 'password123')).rejects.toThrow(errorMessage);
    });
});
