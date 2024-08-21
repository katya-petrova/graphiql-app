import { Link } from './components/Link';

export default function Welcome() {
  return (
    <>
      <section className="max-w-2xl text-lg text-gray-400 space-y-6">
        <h1>Welcome to GraphiQL!</h1>
        <p>
          Here, you can explore the world of GraphQL APIs with ease. Experiment
          with different endpoints, craft and test your queries, manage
          variables and headers, and see the results of your work instantly.
        </p>{' '}
        <p>
          GraphiQL Playground is built for simplicity and understanding. With
          its intuitive interface, navigating the power of GraphQL becomes a
          seamless experience. Your queries will be more straightforward, and
          the results more accessible.
        </p>{' '}
        <p>
          Join us in uncovering the potential of GraphQL. GraphiQL Playground is
          your reliable partner in mastering and using GraphQL APIs. Enjoy the
          journey with confidence and ease!
        </p>
      </section>
      <div className="flex mt-20">
        <Link href="/sign-in">Sign In</Link>
        <Link href="/sign-up">Sign Up</Link>
      </div>
    </>
  );
}
