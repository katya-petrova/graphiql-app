'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const Welcome = () => {
  const { isSignedIn } = useAuth();

  return (
    <>
      <section className="max-w-2xl text-base md:text-lg text-gray-400 space-y-6">
        <h1>Welcome to GraphiQL!</h1>
        <p>
          Here, you can explore the world of GraphQL APIs with ease. Experiment
          with different endpoints, craft and test your queries, manage
          variables and headers, and see the results of your work instantly.
        </p>
        <p>
          GraphiQL Playground is built for simplicity and understanding. With
          its intuitive interface, navigating the power of GraphQL becomes a
          seamless experience. Your queries will be more straightforward, and
          the results more accessible.
        </p>
        <p>
          Join us in uncovering the potential of GraphQL. GraphiQL Playground is
          your reliable partner in mastering and using GraphQL APIs. Enjoy the
          journey with confidence and ease!
        </p>
      </section>
      <div className="flex justify-center mt-20">
        <Link
          href={isSignedIn ? '/main' : '/signin'}
          className="border border-blue-500 rounded px-4 py-2 hover:border-blue-700 text-blue-500 hover:text-blue-700 transition ease-in-out duration-150 hover:bg-transparent w-64 text-center"
        >
          Get started
        </Link>
      </div>
    </>
  );
};

export default Welcome;
