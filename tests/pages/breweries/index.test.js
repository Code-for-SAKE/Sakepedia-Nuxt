import { mount, RouterLinkStub } from '@vue/test-utils';
import index from '@/pages/breweries/index.vue';
import { getList } from '../../../lib/ApiClient/getList';

jest.mock('../../../lib/ApiClient/getList', () => ({
  __esModule: true,
  getList: jest.fn(() =>
    Promise.resolve({
      list: [
        { _id: 'test', name: 'test' },
        { _id: 'test2', name: 'test2' },
        { _id: 'test3', name: 'test3' },
      ],
      currentPage: 1,
      count: 0,
    })
  ),
}));

describe('pages/breweries/index.vue', () => {
  let wrapper;
  let responseMock;

  beforeEach(async () => {
    wrapper = mount(index, {
      propsData: {
        search: {},
      },
      stubs: {
        'nuxt-link': RouterLinkStub,
        'b-pagination': true,
        'b-button': true,
      },
    });
    const context = { query: { name: '', page: '', limit: '' } };
    const data = await wrapper.vm.$options.asyncData(context);
    wrapper.setData(data);
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
              { _id: 'test', name: 'test' },
              { _id: 'test2', name: 'test2' },
              { _id: 'test3', name: 'test3' },
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
