import { signUp } from '../../src/services/firebase/authService';
import auth from '@react-native-firebase/auth';

jest.mock('@react-native-firebase/auth');

describe('authService', () => {
    describe('signUp', () => {
        const mockUser = {
            updateProfile: jest.fn(),
            getIdTokenResult: jest.fn(),
        };

        const mockUserCredential = {
            user: mockUser,
        };

        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should sign up a new user and update profile', async () => {
            (auth().createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(mockUserCredential);
            mockUser.updateProfile.mockResolvedValue(null);
            mockUser.getIdTokenResult.mockResolvedValue(null);

            const email = 'test@example.com';
            const password = 'password123';
            const displayName = 'Test User';

            const result = await signUp(email, password, displayName);

            expect(auth().createUserWithEmailAndPassword).toHaveBeenCalledWith(email, password);
            expect(mockUser.updateProfile).toHaveBeenCalledWith({ displayName });
            expect(mockUser.getIdTokenResult).toHaveBeenCalledWith(true);
            expect(result).toBe(mockUser);
        });

        it('should throw an error if sign up fails', async () => {
            const error = new Error('Sign up failed');
            (auth().createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(error);

            const email = 'test@example.com';
            const password = 'password123';
            const displayName = 'Test User';

            await expect(signUp(email, password, displayName)).rejects.toThrow(error);
        });
    });
});