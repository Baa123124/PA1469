import pb from './pocketbase';

export const getUser = async (userId: string) => {
  return await pb.collection('users').getOne(userId);
};

export const updateUserSettings = async (userId: string, settings: object) => {
  return await pb.collection('users').update(userId, { setting: settings });
};

export const getCurrentUser = () => {
  return pb.authStore.model;
};
