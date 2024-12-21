import { jest } from '@jest/globals';
import { signOut } from '@react-native-firebase/auth';

const mockGoogleAuthProvider = {
  credential: jest.fn(() => 'mock-credential'),
};

const mockAuthInstance = {
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signInWithCredential: jest.fn(),
  signOut: jest.fn(),
  currentUser: null,
  onIdTokenChanged: jest.fn(),
};


const auth: jest.Mock & { GoogleAuthProvider: typeof mockGoogleAuthProvider } = jest.fn(() => mockAuthInstance) as any;

auth.GoogleAuthProvider = mockGoogleAuthProvider;

export default auth;
