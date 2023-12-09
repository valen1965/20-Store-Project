import { useLoaderData } from 'react-router-dom';
import { formatPrice, customFetch, generateAmountOptions } from '../utils';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';

const singleProductQuery = (id) => {
  return {
    queryKey: ['singleProduct', id],
    queryFn: () => customFetch(`/products/${id}`),
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const url = '/products/';
    const response = await queryClient.ensureQueryData(
      singleProductQuery(params.id)
    );
    const singleProduct = response.data.data;
    // console.log(singleProduct);
    return { singleProduct };
  };

const SingleProduct = () => {
  const { singleProduct } = useLoaderData();
  const { image, title, price, description, colors, company } =
    singleProduct.attributes;
  const { id } = singleProduct;
  const dollarsAmount = formatPrice(price);

  // set state

  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

  const cartProduct = {
    cartID: productColor.id + productColor.color,
    productID: productColor.id,
    image,
    title,
    price,
    company,
    productColor,
    amount,
  };

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }));
  };

  return (
    <section>
      <div className='text-lg breadcrumbs'>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/products'>Products</Link>
          </li>
        </ul>
      </div>
      {/* PRUDUCT */}
      <div className='mt-6 grid gap-y-8 lg:grid-cols-2 gap-x-16'>
        {/* IMAGE */}
        <img
          src={image}
          alt={title}
          className='w-96 h-96 object-cover rounded-lg lg:w-full'
        />
        {/* PRODUCT INFO */}
        <div>
          <h1 className='capitalize text-3xl font-bold '>{title}</h1>
          <h4 className='text-xl text-neutral-content font-bold mt-2 '>
            {company}
          </h4>
          <p className='mt-3 text-xl'>{dollarsAmount}</p>
          <p className='mt-6 leading-8'>{description}</p>
        </div>
        {/* COLORS */}
        <div className='mt-6'>
          <h4 className='text-md font-medium tracking-wider capitalize'>
            colors
          </h4>
          <div className='mt-2'>
            {colors.map((color) => {
              return (
                <button
                  key={color}
                  type='button'
                  className={`badge w-6 h-6 mr-2 ${
                    color === productColor && 'border-2 border-secondary'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setProductColor(color)}
                ></button>
              );
            })}
          </div>
        </div>
        {/* AMOUNT */}
        <div className='form-control w-full max-w-xs'>
          <label className='label' htmlFor='amount'>
            <h4 className='text-md font-medium tracking-wider capitalize'>
              Amount
            </h4>
          </label>
          <select
            className='select select-boarder border-neutral select-md'
            name='amount'
            id='amount'
            value={amount}
            onChange={handleAmount}
          >
            {generateAmountOptions(10)}
            {/* <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option> */}
          </select>
        </div>
        {/* CART BTN */}
        <div className='mt-10'>
          <button
            className='btn btn-secondary btn-md uppercase'
            onClick={addToCart}
          >
            add to bag
          </button>
        </div>
      </div>
    </section>
  );
};
export default SingleProduct;
