import pb from './pocketbase';

export const addReview = async (reviewData: object) => {
  return await pb.collection('reviews').create(reviewData);
};

export const getReviewsForCache = async (cacheId: string) => {
  return await pb.collection('reviews').getList(1, 50, {
    filter: `cacheId='${cacheId}'`
  });
};
