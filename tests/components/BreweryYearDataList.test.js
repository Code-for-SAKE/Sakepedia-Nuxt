import { mount, RouterLinkStub } from '@vue/test-utils';
import BreweryYearDataList from '@/components/BreweryYearDataList.vue';
import { getList } from '../../lib/ApiClient/getList';

jest.mock('../../lib/ApiClient/getList', () => ({
  __esModule: true,
  getList: jest.fn(() =>
    Promise.resolve({
      list: [
        { _id: 'test', name: 'test', sake: { name: 'test1' } },
        { _id: 'test2', name: 'test2', sake: { name: 'test2' } },
        { _id: 'test3', name: 'test3', sake: { name: 'test3' } },
      ],
      currentPage: 1,
      count: 0,
    })
  ),
}));

describe('components/BreweryYearDataList.vue', () => {
  let wrapper;
  let responseMock;

  beforeEach(() => {
    wrapper = mount(BreweryYearDataList, {
      propsData: {
        search: {},
      },
      stubs: {
        'nuxt-link': RouterLinkStub,
        'b-pagination': true,
      },
    });
  });
  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });
  describe('template', () => {
    describe('renderd correctly', () => {
      describe('with data', () => {
        beforeAll(() => {
          responseMock = {
            list: [
              { _id: 'test', name: 'test', sake: { name: 'test1' } },
              { _id: 'test2', name: 'test2', sake: { name: 'test2' } },
              { _id: 'test3', name: 'test3', sake: { name: 'test3' } },
            ],
            currentPage: 1,
            count: 0,
          };
          getList.mockImplementation(() => {
            return Promise.resolve(responseMock);
          });
        });
        it('will be renderd correctly', () => {
          expect(wrapper.html()).toMatchSnapshot();
        });
      });

      describe('without data', () => {
        beforeAll(() => {
          responseMock = {
            list: [],
            currentPage: 1,
            count: 0,
          };
          getList.mockImplementation(() => {
            return Promise.resolve(responseMock);
          });
        });
        it('will be renderd correctly', () => {
          expect(wrapper.html()).toMatchSnapshot();
        });
      });
    });
  });
});
