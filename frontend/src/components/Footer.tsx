export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm">
            © {new Date().getFullYear()} Yuhan University. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}