import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--cream)]">
      {/* Navigation */}
      <nav className="border-b border-[var(--black)]">
        <div className="max-w-4xl mx-auto px-6 py-6 flex justify-between items-center">
          <Link href="/" className="font-editorial text-[28px] font-bold text-[var(--black)]">
            Briefly
          </Link>
          <Link href="/" className="nav-label text-[var(--black)] hover:text-[var(--coral)]">
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="headline-xl mb-4">Privacy Policy</h1>
        <p className="text-[var(--gray)] mb-12">Last updated: January 2025</p>

        <div className="space-y-12 text-[var(--black)]">
          <section>
            <h2 className="headline-md mb-4">1. Introduction</h2>
            <p className="leading-relaxed">
              Briefly (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you use our creative brief platform service.
            </p>
          </section>

          <section>
            <h2 className="headline-md mb-4">2. Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold mb-2">Account Information</h3>
                <p className="leading-relaxed text-[var(--gray)]">
                  When you create an account, we collect your email address, password (encrypted),
                  and agency/company name.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Brief Content</h3>
                <p className="leading-relaxed text-[var(--gray)]">
                  We store the templates you create, client information you provide (names and email addresses),
                  questionnaire responses, and AI-generated brief content.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Usage Data</h3>
                <p className="leading-relaxed text-[var(--gray)]">
                  We automatically collect information about how you interact with our service,
                  including pages visited, features used, and timestamps.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="headline-md mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-[var(--gray)]">
              <li>To provide and maintain our service</li>
              <li>To send transactional emails (questionnaire invitations, completion notifications)</li>
              <li>To process your briefs using AI to enhance and expand client responses</li>
              <li>To improve and optimize our platform</li>
              <li>To communicate with you about service updates</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="headline-md mb-4">4. AI Processing</h2>
            <p className="leading-relaxed">
              We use third-party AI services (Anthropic Claude) to process and enhance brief content.
              Client responses are sent to these services for processing. We do not use your data
              to train AI models. The AI processing is solely to improve the quality of your creative briefs.
            </p>
          </section>

          <section>
            <h2 className="headline-md mb-4">5. Data Sharing</h2>
            <p className="leading-relaxed mb-4">We do not sell your personal information. We may share data with:</p>
            <ul className="list-disc pl-6 space-y-2 text-[var(--gray)]">
              <li><strong>Service Providers:</strong> Third-party services that help us operate (hosting, email, AI processing)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            </ul>
          </section>

          <section>
            <h2 className="headline-md mb-4">6. Data Security</h2>
            <p className="leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your data.
              This includes encryption in transit (HTTPS), secure password hashing, and access controls.
              However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="headline-md mb-4">7. Data Retention</h2>
            <p className="leading-relaxed">
              We retain your account information and brief data for as long as your account is active.
              You may request deletion of your data at any time by contacting us.
              Upon account deletion, we will remove your personal data within 30 days.
            </p>
          </section>

          <section>
            <h2 className="headline-md mb-4">8. Your Rights</h2>
            <p className="leading-relaxed mb-4">Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 text-[var(--gray)]">
              <li>Access the personal data we hold about you</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data in a portable format</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="headline-md mb-4">9. Cookies</h2>
            <p className="leading-relaxed">
              We use essential cookies to maintain your session and authentication state.
              We do not use third-party tracking cookies for advertising purposes.
            </p>
          </section>

          <section>
            <h2 className="headline-md mb-4">10. Changes to This Policy</h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes
              by posting the new policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="headline-md mb-4">11. Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@briefly.com" className="text-link">privacy@briefly.com</a>.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--black)] py-8">
        <div className="max-w-4xl mx-auto px-6 flex justify-between items-center">
          <p className="text-sm text-[var(--gray)]">&copy; 2025 Briefly. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-[var(--coral)]">Privacy</Link>
            <Link href="/terms" className="text-sm text-[var(--black)] hover:text-[var(--coral)]">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
