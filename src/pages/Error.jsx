import { useRouteError, Link } from 'react-router-dom';

const Error = () => {
  const error = useRouteError();
  console.log(error);

  if (error.status === 404) {
    return (
      <main className='grid min-h-[100vh] place-items-center px-8'>
        <div className='text-center'>
          <p className='text-9xl font-semibold text-primary'>404</p>
          <h1 className='text-3xl mt-4 font-bold tracking-tight sm:text-5xl'>
            page not found
          </h1>
          <p className='mt-6 text-lg leading-7'>
            Sorry, we could not find the page you're looking for{' '}
          </p>
        </div>
        <div className='mt-10 '>
          <Link to='/' className='btn btn-secondary'>
            go back home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className='grid min-h-[100vh] place-items-center px-8'>
      <h4 className='text-center font-bold text-4xl'>There was an error...</h4>
    </main>
  );
};
export default Error;
