import Link from "next/link";

export default function Home() {
  return (
    <div className="em-home">
      {/* Hero Section */}
      <section className="em-hero">
        <div className="em-container">
          <div className="em-hero-content">
            <h1 className="em-hero-title">
              Manage Your Events
              <span className="em-hero-accent">Effortlessly</span>
            </h1>
            <p className="em-hero-description">
              Create, organize, and track events with our comprehensive event management platform.
              From small gatherings to large conferences, we've got you covered.
            </p>
            <div className="em-hero-actions">
              <Link href="/events" className="em-btn em-btn-primary">
                Browse Events
              </Link>
              <Link href="/events/create" className="em-btn em-btn-secondary">
                Create Event
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="em-features">
        <div className="em-container">
          <h2 className="em-section-title">Why Choose Our Platform?</h2>
          <div className="em-features-grid">
            <div className="em-feature-card">
              <div className="em-feature-icon">📅</div>
              <h3 className="em-feature-title">Easy Scheduling</h3>
              <p className="em-feature-description">
                Intuitive calendar interface for scheduling and managing events with ease.
              </p>
            </div>
            <div className="em-feature-card">
              <div className="em-feature-icon">👥</div>
              <h3 className="em-feature-title">Attendee Management</h3>
              <p className="em-feature-description">
                Track registrations, send invitations, and manage attendee lists efficiently.
              </p>
            </div>
            <div className="em-feature-card">
              <div className="em-feature-icon">📊</div>
              <h3 className="em-feature-title">Analytics & Reports</h3>
              <p className="em-feature-description">
                Get detailed insights and analytics about your events and attendee engagement.
              </p>
            </div>
            <div className="em-feature-card">
              <div className="em-feature-icon">🔔</div>
              <h3 className="em-feature-title">Real-time Notifications</h3>
              <p className="em-feature-description">
                Stay updated with instant notifications for registrations and event updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="em-cta-section">
        <div className="em-container">
          <div className="em-cta-content">
            <h2 className="em-cta-title">Ready to Get Started?</h2>
            <p className="em-cta-description">
              Join thousands of event organizers who trust our platform for their events.
            </p>
            <Link href="/events" className="em-btn em-btn-primary em-btn-large">
              Start Managing Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
