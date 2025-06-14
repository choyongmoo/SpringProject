import Brand from "./common/Brand";
import Intro from "./common/Intro";

export default function Footer() {
  return (
    <footer className="bg-background text-white py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Brand />
            <Intro />
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-primary-light transition-colors">
                About
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-light transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-light transition-colors">
                Terms
              </a>
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 React Forum. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}