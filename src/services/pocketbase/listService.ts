import pb from './pocketbase';

export const getUserLists = async (userId: string) => {
  return await pb.collection('lists').getList(1, 50, {
    filter: `userId='${userId}'`
  });
};

export const addList = async (listData: object) => {
  return await pb.collection('lists').create(listData);
};
