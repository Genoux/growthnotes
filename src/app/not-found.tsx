import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center " style={{ height: 'calc(100vh - 73px)' }}>
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-orange hover:opacity-95 text-white font-normal py-2 px-4 rounded-full"
      >
        Go back home
      </Link>
    </div>
  );
}