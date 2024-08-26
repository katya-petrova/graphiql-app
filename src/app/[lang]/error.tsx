'use client';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col gap-6 items-center">
      <h2 className="text-lg">Ooops... Something went wrong</h2>

      <button
        onClick={() => reset()}
        className="border border-blue-500 rounded px-4 py-2 hover:border-blue-700 text-blue-500 hover:text-blue-700 transition ease-in-out duration-150 hover:bg-transparent w-64 text-center"
      >
        Try again
      </button>
    </div>
  );
}
