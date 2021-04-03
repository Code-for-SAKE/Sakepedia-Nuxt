import { mount, RouterLinkStub } from '@vue/test-utils'
import BrandList from '@/components/BrandList.vue'



describe('components/BrandList.vue', () => {
  let wrapper;
  let responseMock
  beforeEach(() => {
    wrapper = mount(BrandList, {
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve(responseMock))
        }
      },
      propsData: {
        search: {}
      },
      stubs: {
        'nuxt-link': RouterLinkStub,
        'b-pagination': true
      }
    });
  })
  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });
  describe('template', () => {
    describe('renderd correctly', () => {
      describe('with data', () => {
        beforeAll(() => {
          responseMock = {
            data: {
              brands: [
                {_id: 'test', name: 'test'},
                {_id: 'test2', name: 'test2'},
                {_id: 'test3', name: 'test3'}
              ],
              currentPage: 1,
              pageCount: 0
            }
          }
        });
        it('will be renderd correctly', () => {
          expect(wrapper.html()).toMatchSnapshot();
        });
      });
      
      describe('without data', () => {
        beforeAll(() => {
          responseMock = {
            data: {
              brands: [],
              currentPage: 1,
              pageCount: 0
            }
          }
        });
        it('will be renderd correctly', () => {
          expect(wrapper.html()).toMatchSnapshot();
        });
      });
    });
  });
  describe('script', () => {
    beforeAll(() => {
      responseMock = {
        data: {
          brands: [
            {_id: 'test', name: 'test'},
            {_id: 'test2', name: 'test2'},
            {_id: 'test3', name: 'test3'}
          ],
          currentPage: 1,
          pageCount: 0
        }
      }
    });
    describe('methods', () => {
      describe('getRequestParams', () => {
        it('return correct value', () => {
          const page = 1;
          const limit = 10;
          expect(wrapper.vm.getRequestParams(page,limit)).toEqual({
            params: {
              page: page,
              limit: limit
            }
          });
        });
      });
      describe('retrieves', () => {
        const page = 1
        const limit = 10
        it('getRequestParams has been called', () => {
          const spyGetRequestParams = jest.spyOn(wrapper.vm, 'getRequestParams');
          wrapper.vm.retrieves();
          expect(spyGetRequestParams).toHaveBeenCalledWith(page,limit);
        });
        it('$axios.get has been called', () => {
          const spyAxiosGet = jest.spyOn(wrapper.vm.$axios, 'get')
          wrapper.vm.retrieves();
          expect(spyAxiosGet).toHaveBeenCalledWith('/api/brands', { params: { page: page, limit: limit } });
        });
      });
      describe('handlePageChange', () => {
        it('retrieves() has been called', () => {
          const spyRetrieves = jest.spyOn(wrapper.vm, 'retrieves');
          wrapper.vm.handlePageChange();
          expect(spyRetrieves).toHaveBeenCalled();
        });
      });
    });
  });
});
