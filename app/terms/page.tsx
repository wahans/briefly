import Link from 'next/link'

export default function TermsPage() {
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
        <h1 className="headline-xl mb-4">Terms of Service</h1>
        <p className="text-[var(--gray)] mb-12">Last updated: January 2025</p>

        <div className="space-y-12 text-[var(--black)]">
          <section>
            <h2 className="headline-md mb-4">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing or using Briefly (&quot;the Service&quot;), you agree to be bound by these Terms of Service.
              If you do not agree to these terms, please do not use the Service. These terms apply to all users,
              including agencies and their clients who interact with the questionnaire system.
            </p>
          </section>

          <section>
            <h2 className="headline-md mb-4">2. Description of Service</h2>
            <p className="leading-relaxed">
              Briefly is a creative brief platform that enables agencies to collect project requirements
              from clients through AI-enhanced questionnaires. The Service includes template creation,
              client questionnaire distribution, AI-powered response enhancement, and brief generation.
            </p>
          </section>

          <section>
            <h2 className="headline-md mb-4">3. Account Registration</h2>
            <p className="leading-relaxed mb-4">To use the Service, you must:</p>
            <ul className="list-disc pl-6 space-y-2 text-[var(--gray)]">
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Be at least 18 years old or have parental consent</li>
              <li>Notify us immediately of any unauthorized account access</li>
            </ul>
            <p className="leading-relaxed mt-4">
              You are responsible for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="headline-md mb-4">4. Acceptable Use</h2>
            <p className="leading-relaxed mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 text-[var(--gray)]">
              <li>Use the Service for any illegal purpose</li>
              <li>Send spam or unsolicited communications through our email system</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the Service</li>
              <li>Upload malicious code or content</li>
              <li>Impersonate another person or entity</li>
              <li>Use the Service to collect sensitive personal data without proper consent</li>
            </ul>
          </section>

          <section>
            <h2 className="headline-md mb-4">5. Client Data and Consent</h2>
            <p className="leading-relaxed">
              When you invite clients to complete questionnaires, you represent that you have the
              authority to share their email addresses with us and that they have consented to
              receiving communications. You are responsible for ensuring your use of client data
              complies with applicable privacy laws.
            </p>
          </section>

          <section>
            <h2 className="headline-md mb-4">6. Intellectual Property</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold mb-2">Your Content</h3>
                <p className="leading-relaxed text-[var(--gray)]">
                  You retain ownership of the templates you create and the brief content generated
                  from your client interactions. By using the Service, you grant us a limited license
                  to store, process, and display this content solely to provide the Service.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Our Service</h3>
                <p className="leading-relaxed text-[var(--gray)]">
                  The Briefly platform, including its design, features, and underlying technology,
                  is owned by us and protected by intellectual property laws. You may not copy,
                  modify, or create derivative works of the Service.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="headline-md mb-4">7. AI-Generated Content</h2>
            <p className="leading-relaxed">
              The Service uses artificial intelligence to enhance and expand client responses.
              While we strive for accuracy, AI-generated content may contain errors or inaccuracies.
              You are responsible for reviewing and editing all generated content before use.
              We make no warranties about the accuracy, completeness, or suitability of AI-generated content.
            </p>
          </section>

          <section>
            <h2 className="headline-md mb-4">8. Payment Terms</h2>
            <p className="leading-relaxed">
              Paid plans are billed in advance on a monthly or annual basis. All fees are non-refundable
              except as required by law. We reserve the right to change pricing with 30 days notice.
              Failure to pay may result in suspension or termination of your account.
            </p>
          </section>

          <section>
            <h2 className="headline-md mb-4">9. Service Availability</h2>
            <p className="leading-relaxed">
              We strive to maintain high availability but do not guarantee uninterrupted service.
              We may modify, suspend, or discontinue features with reasonable notice.
              Scheduled maintenance will be communicated in advance when possible.
            </p>
          </section>

          <section>
            <h2 className="headline-md mb-4">10. Limitation of Liability</h2>
            <p className="leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, BRIEFLY SHALL NOT BE LIABLE FOR ANY INDIRECT,
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS,
              DATA, OR BUSINESS OPPORTUNITIES. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT
              YOU PAID US IN THE TWELVE MONTHS PRECEDING THE CLAIM.
            </p>
          </section>

          <section>
            <h2 className="headline-md mb-4">11. Disclaimer of Warranties</h2>
            <p className="leading-relaxed">
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND,
              EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
          </section>

          <section>
            <h2 className="headline-md mb-4">12. Indemnification</h2>
            <p className="leading-relaxed">
              You agree to indemnify and hold harmless Briefly and its officers, directors, employees,
              and agents from any claims, damages, losses, or expenses arising from your use of the
              Service or violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="headline-md mb-4">13. Termination</h2>
            <p className="leading-relaxed">
              Either party may terminate this agreement at any time. Upon termination, your right
              to use the Service ceases immediately. We may retain your data for a reasonable period
              to comply with legal obligations. You may request data export before termination.
            </p>
          </section>

          <section>
            <h2 className="headline-md mb-4">14. Governing Law</h2>
            <p className="leading-relaxed">
              These Terms shall be governed by the laws of the State of Delaware, United States,
              without regard to conflict of law principles. Any disputes shall be resolved in the
              courts of Delaware.
            </p>
          </section>

          <section>
            <h2 className="headline-md mb-4">15. Changes to Terms</h2>
            <p className="leading-relaxed">
              We may update these Terms from time to time. Material changes will be communicated
              via email or prominent notice on the Service. Continued use after changes constitutes
              acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="headline-md mb-4">16. Contact</h2>
            <p className="leading-relaxed">
              For questions about these Terms, please contact us at{' '}
              <a href="mailto:legal@briefly.com" className="text-link">legal@briefly.com</a>.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--black)] py-8">
        <div className="max-w-4xl mx-auto px-6 flex justify-between items-center">
          <p className="text-sm text-[var(--gray)]">&copy; 2025 Briefly. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-[var(--black)] hover:text-[var(--coral)]">Privacy</Link>
            <Link href="/terms" className="text-sm text-[var(--coral)]">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
