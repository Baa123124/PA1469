type GoogleSignInResult = {
    data: {
      idToken: string;
    };
  };
  
export const GoogleSignin = {
    configure: jest.fn(),
    hasPlayServices: jest.fn(async () => true),
    signIn: jest.fn(async (): Promise<GoogleSignInResult> => ({
        data: {
        idToken: 'mock-id-token',
        },
    })),
    revokeAccess: jest.fn(async () => {}),
};
