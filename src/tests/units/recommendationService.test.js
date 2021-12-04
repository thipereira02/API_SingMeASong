/* eslint-disable no-undef */
import * as recommendationService from '../../services/recommendationService.js';
import * as recommendationRepository from '../../repositories/recommendationRepository.js';
import * as isYoutubeLink from '../../utils/isYoutubeLink.js';

describe('Recommendation Service', () => {
  it('Should return true when data is valid', async () => {
    const name = 'Falamansa - Xote dos Milagres';
    const youtubeLink = 'https://www.youtube.com/watch?v=chwyjJbcs1Y';
    const genresIds = [1, 6];

    jest.spyOn(isYoutubeLink, 'isYoutubeVideo').mockImplementation(() => true);
    const result = await recommendationService.checkData(name, youtubeLink, genresIds);
    expect(result).toBe(true);
  });

  it('Should return false when name is empty', async () => {
    const name = '';
    const youtubeLink = 'https://www.youtube.com/watch?v=chwyjJbcs1Y';
    const genresIds = [1, 6];

    jest.spyOn(isYoutubeLink, 'isYoutubeVideo').mockImplementation(() => true);
    const result = await recommendationService.checkData(name, youtubeLink, genresIds);
    expect(result).toBe(false);
  });

  it('Should return false when genresId is empty', async () => {
    const name = 'Falamansa - Xote dos Milagres';
    const youtubeLink = 'https://www.youtube.com/watch?v=chwyjJbcs1Y';
    const genresIds = [];

    jest.spyOn(isYoutubeLink, 'isYoutubeVideo').mockImplementation(() => true);
    const result = await recommendationService.checkData(name, youtubeLink, genresIds);
    expect(result).toBe(false);
  });

  it('Should return false when recommendation id is invalid', async () => {
    const review = '+';

    jest.spyOn(recommendationRepository, 'recommById').mockImplementation(() => false);
    const result = await recommendationService.changingScore(0, review);
    expect(result).toBe(false);
  });

  it('Should return true when recommendation id exists', async () => {
    const id = 1;
    const review = '+';

    jest.spyOn(recommendationRepository, 'recommById').mockImplementation(async () => [{
      id: 1,
      name: 'Falamansa - Xote dos Milagres',
      youtubeLink: 'https://www.youtube.com/watch?v=chwyjJbcs1Y',
      score: 6,
    }]);
    jest.spyOn(recommendationRepository, 'updateScore').mockImplementation(async () => true);
    const result = await recommendationService.changingScore(id, review);
    expect(result).toBe(true);
  });

  it('Should return false when there is not recommendations to give', async () => {
    jest.spyOn(recommendationRepository, 'checkForSongs').mockImplementation(() => false);
    const result = await recommendationService.getRecommendation();
    expect(result).toBe(false);
  });

  it('Should return truthy when a recommendation is given', async () => {
    jest.spyOn(recommendationRepository, 'checkForSongs').mockImplementation(async () => true);
    jest.spyOn(recommendationRepository, 'findVideos').mockImplementation(async () => [{
      id: 1,
      name: 'Falamansa - Xote dos Milagres',
      youtubeLink: 'https://www.youtube.com/watch?v=chwyjJbcs1Y',
      score: 6,
    }]);
    const result = await recommendationService.getRecommendation();
    expect(result).toBeTruthy();
  });

  it('Should return null if params is less than 1', async () => {
    const amount = 0;
    const result = await recommendationService.topVideos(amount);
    expect(result).toBe(null);
  });

  it('Should return false when there is not recommendation to give', async () => {
    const amount = 1;

    jest.spyOn(recommendationRepository, 'topRecommendations').mockImplementation(() => false);
    const result = await recommendationService.topVideos(amount);
    expect(result).toBe(false);
  });

  it('Should return truthy when recommendations are given', async () => {
    const amount = 2;

    jest.spyOn(recommendationRepository, 'topRecommendations').mockImplementation(() => [
      {
        id: 1,
        name: 'Falamansa - Xote dos Milagres',
        youtubeLink: 'https://www.youtube.com/watch?v=chwyjJbcs1Y',
        score: 6,
      },
      {
        id: 2,
        name: 'Falamansa - Xote da Alegria',
        youtubeLink: 'https://www.youtube.com/watch?v=QDAHMMMtFBI',
        score: 20,
      },
    ]);
    const result = await recommendationService.topVideos(amount);
    expect(result).toBeTruthy();
  });
});
