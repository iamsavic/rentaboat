export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
        <p className="text-slate-400 text-sm mb-8">Last updated: March 2025</p>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 prose prose-slate max-w-none">
          <h2>1. Data We Collect</h2>
          <p>When you make a booking, we collect: first and last name, email address, phone number, country of residence, and any notes you provide.</p>

          <h2>2. How We Use Your Data</h2>
          <p>Your data is used exclusively for processing your booking, sending confirmation and communication related to your tour, and improving our service. We do not sell or share your data with third parties for marketing purposes.</p>

          <h2>3. Email Communications</h2>
          <p>We use Brevo (formerly Sendinblue) to send transactional emails. Emails are sent only in connection with your booking. If you opt in, you may receive occasional promotional offers — you can unsubscribe at any time.</p>

          <h2>4. Data Storage</h2>
          <p>Booking data is stored in a secure database hosted on Supabase (EU region). We retain booking data for a minimum of 2 years for business purposes.</p>

          <h2>5. Your Rights</h2>
          <p>Under GDPR, you have the right to access, correct, or delete your personal data. To exercise these rights, contact us at info@rentaboat-budva.com.</p>

          <h2>6. Cookies</h2>
          <p>This website uses minimal cookies necessary for functionality. See our Cookie Policy for details.</p>

          <h2>7. Contact</h2>
          <p>For privacy-related requests: info@rentaboat-budva.com</p>
        </div>
      </div>
    </div>
  );
}
