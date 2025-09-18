export default function NavBar() {
  return (
    <>
      <style jsx>{`
        .navbar {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          border-bottom: 1px solid #e2e8f0;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #374151;
          text-decoration: none;
          font-weight: 500;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .nav-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
          transition: left 0.5s;
        }
        .nav-item:hover::before {
          left: 100%;
        }
        .nav-item:hover {
          color: #2563eb;
          background-color: rgba(59, 130, 246, 0.05);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
        }
        .nav-icon {
          width: 1.25rem;
          height: 1.25rem;
          transition: all 0.3s ease;
        }
        .nav-item:hover .nav-icon {
          color: #2563eb;
          transform: scale(1.1);
        }
        .nav-text {
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.025em;
        }
        .navbar-container {
          max-width: 80rem;
          margin: 0 auto;
          padding: 0 1rem;
        }
        .navbar-content {
          display: flex;
          justify-content: center;
          gap: 3rem;
          padding: 1rem 0;
        }
      `}</style>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-content">
            <a href="/" className="nav-item group">
              <svg className="nav-icon text-gray-500 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="nav-text">Home</span>
            </a>
            <a href="/events" className="nav-item group">
              <svg className="nav-icon text-gray-500 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="nav-text">Events</span>
            </a>
            <a href="/notifications" className="nav-item group">
              <svg className="nav-icon text-gray-500 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM15 17H9a6 6 0 01-6-6V5a2 2 0 012-2h6a2 2 0 012 2v1m0 0V3a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2h-1" />
              </svg>
              <span className="nav-text">Notifications</span>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
