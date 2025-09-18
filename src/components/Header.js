export default function Header() {
  return (
    <>
      <style jsx>{`
        .header-gradient {
          background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .nav-link {
          color: white;
          text-decoration: none;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          transition: all 0.3s ease;
          position: relative;
        }
        .nav-link:hover {
          color: #fbbf24;
          background-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-1px);
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background-color: #fbbf24;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .brand-logo {
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(45deg, #ffffff, #fbbf24);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .mobile-menu-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 0.375rem;
          transition: all 0.3s ease;
        }
        .mobile-menu-btn:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
      `}</style>
      <header className="header-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="brand-logo">🎉 EventHub</h1>
            </div>
            <nav className="hidden md:flex space-x-2">
              <a href="/" className="nav-link">Home</a>
              <a href="/events" className="nav-link">Events</a>
              <a href="/notifications" className="nav-link">Notifications</a>
            </nav>
            <div className="md:hidden">
              <button className="mobile-menu-btn text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
