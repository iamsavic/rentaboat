export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Cookie Policy</h1>
        <p className="text-slate-400 text-sm mb-8">Last updated: March 2025</p>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 prose prose-slate max-w-none">
          <h2>What are cookies?</h2>
          <p>Cookies are small text files stored on your device when you visit a website. They help the website function properly and remember your preferences.</p>

          <h2>Cookies we use</h2>
          <h3>Essential cookies</h3>
          <p>These cookies are required for the website to function. They include session cookies used during the booking process. These cannot be disabled.</p>

          <h3>Analytics cookies</h3>
          <p>We may use anonymous analytics to understand how visitors use our website. No personal data is collected through these cookies.</p>

          <h2>Managing cookies</h2>
          <p>You can control cookies through your browser settings. Disabling cookies may affect the functionality of the booking process.</p>

          <h2>Contact</h2>
          <p>For questions about our cookie policy: info@rentaboat-budva.com</p>
        </div>
      </div>
    </div>
  );
}
