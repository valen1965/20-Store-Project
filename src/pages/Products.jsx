import { PaginationContainer, ProductsContainer, Filters } from '../components';
import { customFetch } from '../utils';

const url = '/products';

// my solution
// const allProductsQuery = {
//   queryKey: ['Products'],
//   queryFn: () => customFetch(url),
// };

//  John's solution

const allProductsQuery = (queryParams) => {
  const { search, category, company, sort, price, shipping, page } =
    queryParams;

  return {
    queryKey: [
      'products',
      search ?? '',
      category ?? 'all',
      company ?? 'all',
      sort ?? 'a-z',
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () =>
      customFetch(url, {
        params: queryParams,
      }),
  };
};


export const loader =
  (queryClient) =>
  async ({ request }) => {
    // const params = new URL(request.url).searchParams;
    // const search = params.get('search');

    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    const response = await queryClient.ensureQueryData(allProductsQuery(params));
    const products = response.data.data;
    const meta = response.data.meta;

    return { products, meta, params };
  };

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};
export default Products;


