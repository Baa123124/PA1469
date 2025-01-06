import pb from './pocketbase';

export const getCaches = async () => {
  return await pb.collection('caches').getFullList();
};

export const addCache = async (cacheData: object) => {
  return await pb.collection('caches').create(cacheData);
};
