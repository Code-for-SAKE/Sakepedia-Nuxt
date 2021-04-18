import { getList } from '../../../lib/ApiClient/getList';
import axios from 'axios';

jest.mock('axios');

describe('lib/ApiClient/getList.js', () => {
  axios.get.mockImplementation(() => {
    return Promise.resolve({
      data: {
        sakes: [],
        currentPage: 1,
        pageCount: 1,
      },
    });
  });
  describe('with correct arguements', () => {
    const type = 'sakes';
    const queryParams = {
      page: 1,
      limit: 10,
    };
    it('axios get has been called with query params', async () => {
      await getList(type, queryParams);
      expect(axios.get).toHaveBeenCalledWith(`/api/${type}`, {
        params: queryParams,
      });
    });
    it('getList return correct value', async () => {
      const res = await getList(type, queryParams);
      expect(res).toEqual({
        list: [],
        currentPage: 1,
        count: 1,
      });
    });
  });
  describe('with empty properties', () => {
    const type = 'sakes';
    const queryParams = {
      page: '',
      limit: '',
    };
    it('the properties have been removed', async () => {
      await getList(type, queryParams);
      expect(axios.get).toHaveBeenCalledWith(`/api/${type}`, { params: {} });
    });
  });
  describe('with searchName', () => {
    const type = 'sakes';
    const queryParams = {
      searchName: 'test',
    };
    it('searchName copied to keyword', async () => {
      await getList(type, queryParams);
      expect(axios.get).toHaveBeenCalledWith(`/api/${type}`, {
        params: { keyword: 'test' },
      });
    });
  });
});
