import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFCF7' }}>
      {/* Navigation */}
      <nav className="border-b border-[#0D0D0D]">
        <div className="content-max px-6 md:px-20">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="font-editorial text-[28px] font-bold text-[#0D0D0D]">
              Briefly
            </Link>
            <div className="hidden md:flex items-center gap-10">
              <Link href="#how-it-works" className="nav-label text-[#0D0D0D] hover:text-[#FF6B35] transition-colors">
                How it works
              </Link>
              <Link href="#pricing" className="nav-label text-[#0D0D0D] hover:text-[#FF6B35] transition-colors">
                Pricing
              </Link>
              <Link href="#" className="nav-label text-[#0D0D0D] hover:text-[#FF6B35] transition-colors">
                Journal
              </Link>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/login" className="nav-label text-[#0D0D0D] hover:text-[#FF6B35] transition-colors hidden sm:block">
                Log in
              </Link>
              <Link href="/signup" className="btn-primary">
                Start Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section-padding border-b border-[#0D0D0D]">
        <div className="content-max">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="headline-xl mb-6">
                Briefs that <span className="accent-italic">actually</span> brief.
              </h1>
              <p className="text-[18px] text-[#4A4A4A] max-w-[440px] mb-10 leading-relaxed">
                Stop chasing clients for project details. Send an intelligent questionnaire
                that transforms scattered thoughts into comprehensive creative briefs.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <Link href="/signup" className="btn-primary">
                  Start Free Trial
                </Link>
                <Link href="#" className="text-link text-[14px]">
                  Watch the film
                </Link>
              </div>
            </div>
            <div className="relative">
              <span className="label-tag absolute -top-3 left-6 z-10">Live Brief</span>
              <div className="bg-[#0D0D0D] p-8 text-white">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-[#888] text-xs uppercase tracking-wider mb-1">Project</p>
                    <h3 className="font-editorial text-xl font-bold">Brand Refresh 2024</h3>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#FF6B35] border border-[#FF6B35] px-2 py-1">
                    In Progress
                  </span>
                </div>
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-[#888] text-xs uppercase tracking-wider mb-1">Objective</p>
                    <p className="text-[15px]">Modernize visual identity while maintaining brand equity with existing customers.</p>
                  </div>
                  <div>
                    <p className="text-[#888] text-xs uppercase tracking-wider mb-1">Success Metric</p>
                    <p className="text-[15px]">20% increase in brand recognition among target demographic.</p>
                  </div>
                </div>
                <div className="border-t border-[#333] pt-4">
                  <p className="text-[#888] text-xs uppercase tracking-wider mb-3">Section Status</p>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <span className="status-dot status-complete"></span>
                      <span className="text-xs">Goals</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="status-dot status-complete"></span>
                      <span className="text-xs">Audience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="status-dot status-pending"></span>
                      <span className="text-xs">Timeline</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="status-dot status-pending"></span>
                      <span className="text-xs">Budget</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="section-dark py-20">
        <div className="content-max px-6 md:px-20">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <span className="font-editorial text-[48px] font-bold text-[#FF6B35] block mb-4">01</span>
              <h3 className="text-white text-[20px] font-semibold mb-3">Build Your Template</h3>
              <p className="text-[#888] text-[14px] leading-relaxed">
                Create questionnaire templates with the exact sections you need. Goals, audience, deliverables, timeline—your way.
              </p>
            </div>
            <div>
              <span className="font-editorial text-[48px] font-bold text-[#FF6B35] block mb-4">02</span>
              <h3 className="text-white text-[20px] font-semibold mb-3">Send to Clients</h3>
              <p className="text-[#888] text-[14px] leading-relaxed">
                Share a unique link. Clients answer one question at a time in a focused, conversational interface. No overwhelm.
              </p>
            </div>
            <div>
              <span className="font-editorial text-[48px] font-bold text-[#FF6B35] block mb-4">03</span>
              <h3 className="text-white text-[20px] font-semibold mb-3">AI Writes the Brief</h3>
              <p className="text-[#888] text-[14px] leading-relaxed">
                Our AI expands terse answers into detailed, professional brief content. Client approves, you get notified.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 border-b border-[#0D0D0D]">
        <div className="content-max px-6 md:px-20">
          <p className="nav-label text-center text-[#4A4A4A] mb-10">Trusted by agencies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale">
            <span className="text-2xl font-bold text-[#0D0D0D]">Pentagram</span>
            <span className="text-2xl font-bold text-[#0D0D0D]">IDEO</span>
            <span className="text-2xl font-bold text-[#0D0D0D]">Huge</span>
            <span className="text-2xl font-bold text-[#0D0D0D]">R/GA</span>
            <span className="text-2xl font-bold text-[#0D0D0D]">Instrument</span>
          </div>
        </div>
      </section>

      {/* How It Works - Detailed */}
      <section id="how-it-works" className="section-padding border-b border-[#0D0D0D]">
        <div className="content-max">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <p className="nav-label text-[#FF6B35] mb-4">How it works</p>
              <h2 className="headline-lg mb-6">
                From chaos to <span className="accent-italic">clarity</span>
              </h2>
              <p className="text-[18px] text-[#4A4A4A] leading-relaxed">
                We&apos;ve reimagined the brief process from the ground up. No more endless email threads,
                no more incomplete information, no more starting projects in the dark.
              </p>
            </div>
            <div className="space-y-12">
              <div className="flex gap-6">
                <span className="font-editorial text-[32px] font-bold text-[#FF6B35]">1</span>
                <div>
                  <h3 className="text-[20px] font-semibold mb-2">Create your template</h3>
                  <p className="text-[#4A4A4A] leading-relaxed">
                    Build a questionnaire with the sections that matter for your work. We include smart defaults, but you&apos;re in control.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <span className="font-editorial text-[32px] font-bold text-[#FF6B35]">2</span>
                <div>
                  <h3 className="text-[20px] font-semibold mb-2">Invite your client</h3>
                  <p className="text-[#4A4A4A] leading-relaxed">
                    Send a personalized link. Your client walks through each question one at a time—no form fatigue, just focused answers.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <span className="font-editorial text-[32px] font-bold text-[#FF6B35]">3</span>
                <div>
                  <h3 className="text-[20px] font-semibold mb-2">AI does the heavy lifting</h3>
                  <p className="text-[#4A4A4A] leading-relaxed">
                    Short answers become comprehensive brief sections. The AI expands, clarifies, and structures—while keeping your client&apos;s voice.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <span className="font-editorial text-[32px] font-bold text-[#FF6B35]">4</span>
                <div>
                  <h3 className="text-[20px] font-semibold mb-2">Review and approve</h3>
                  <p className="text-[#4A4A4A] leading-relaxed">
                    Client reviews the generated brief. One click to approve. You get notified instantly. Project kicks off with clarity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section-padding border-b border-[#0D0D0D]" style={{ backgroundColor: '#FFFCF7' }}>
        <div className="content-max text-center">
          <blockquote className="font-editorial text-[32px] md:text-[42px] font-normal italic text-[#0D0D0D] max-w-4xl mx-auto leading-tight mb-8">
            &ldquo;Briefly cut our brief collection time from two weeks to two days.
            The AI expansion is <span className="text-[#FF6B35]">genuinely impressive</span>—it captures nuance we&apos;d usually miss.&rdquo;
          </blockquote>
          <div>
            <p className="font-semibold text-[#0D0D0D]">Sarah Chen</p>
            <p className="text-[#4A4A4A] text-sm">Creative Director, Outline Studio</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section-padding border-b border-[#0D0D0D]">
        <div className="content-max">
          <div className="text-center mb-16">
            <p className="nav-label text-[#FF6B35] mb-4">Pricing</p>
            <h2 className="headline-lg">
              Simple, <span className="accent-italic">transparent</span> pricing
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <div className="border border-[#0D0D0D] p-8">
              <h3 className="font-editorial text-[24px] font-bold mb-2">Starter</h3>
              <p className="text-[#4A4A4A] text-sm mb-6">For freelancers and small teams</p>
              <div className="mb-6">
                <span className="text-[48px] font-bold">$0</span>
                <span className="text-[#4A4A4A]">/month</span>
              </div>
              <ul className="space-y-3 mb-8 text-[15px]">
                <li className="flex items-center gap-3">
                  <span className="text-[#FF6B35]">&#10003;</span>
                  3 active briefs
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#FF6B35]">&#10003;</span>
                  1 template
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#FF6B35]">&#10003;</span>
                  AI brief expansion
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#FF6B35]">&#10003;</span>
                  Email notifications
                </li>
              </ul>
              <Link href="/signup" className="btn-secondary w-full text-center block">
                Get Started
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="bg-[#0D0D0D] text-white p-8 relative">
              <span className="label-tag absolute -top-3 right-6">Popular</span>
              <h3 className="font-editorial text-[24px] font-bold mb-2">Professional</h3>
              <p className="text-[#888] text-sm mb-6">For growing agencies</p>
              <div className="mb-6">
                <span className="text-[48px] font-bold">$29</span>
                <span className="text-[#888]">/month</span>
              </div>
              <ul className="space-y-3 mb-8 text-[15px]">
                <li className="flex items-center gap-3">
                  <span className="text-[#FF6B35]">&#10003;</span>
                  Unlimited briefs
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#FF6B35]">&#10003;</span>
                  Unlimited templates
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#FF6B35]">&#10003;</span>
                  Priority AI processing
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#FF6B35]">&#10003;</span>
                  Custom branding
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#FF6B35]">&#10003;</span>
                  Export to PDF
                </li>
              </ul>
              <Link href="/signup" className="btn-primary w-full text-center block">
                Start Free Trial
              </Link>
            </div>

            {/* Agency Tier */}
            <div className="border border-[#0D0D0D] p-8">
              <h3 className="font-editorial text-[24px] font-bold mb-2">Agency</h3>
              <p className="text-[#4A4A4A] text-sm mb-6">For teams that need more</p>
              <div className="mb-6">
                <span className="text-[48px] font-bold">$99</span>
                <span className="text-[#4A4A4A]">/month</span>
              </div>
              <ul className="space-y-3 mb-8 text-[15px]">
                <li className="flex items-center gap-3">
                  <span className="text-[#FF6B35]">&#10003;</span>
                  Everything in Pro
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#FF6B35]">&#10003;</span>
                  Team collaboration
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#FF6B35]">&#10003;</span>
                  Client portal
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#FF6B35]">&#10003;</span>
                  API access
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#FF6B35]">&#10003;</span>
                  Dedicated support
                </li>
              </ul>
              <Link href="/signup" className="btn-secondary w-full text-center block">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-coral section-padding">
        <div className="content-max text-center">
          <h2 className="font-editorial text-[40px] md:text-[56px] font-bold text-white mb-6 leading-tight" style={{ letterSpacing: '-1px' }}>
            Ready to brief <span className="italic">better</span>?
          </h2>
          <p className="text-white/90 text-[18px] max-w-xl mx-auto mb-10">
            Join hundreds of agencies who&apos;ve transformed their client intake process. Start free, no credit card required.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/signup" className="bg-white text-[#0D0D0D] font-medium text-[13px] uppercase tracking-wider px-8 py-4 hover:bg-gray-100 transition-colors">
              Start Free Trial
            </Link>
            <Link href="#" className="text-white border border-white text-[13px] uppercase tracking-wider px-8 py-4 hover:bg-white/10 transition-colors">
              Book a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section-dark py-20">
        <div className="content-max px-6 md:px-20">
          <div className="grid md:grid-cols-5 gap-12 mb-16">
            <div className="md:col-span-2">
              <Link href="/" className="font-editorial text-[28px] font-bold text-white block mb-4">
                Briefly
              </Link>
              <p className="text-[#888] text-[15px] max-w-xs leading-relaxed">
                The creative brief platform that turns client conversations into actionable project documentation.
              </p>
            </div>
            <div>
              <h4 className="nav-label text-[#888] mb-4">Product</h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-white text-[15px] hover:text-[#FF6B35] transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="text-white text-[15px] hover:text-[#FF6B35] transition-colors">Pricing</Link></li>
                <li><Link href="#" className="text-white text-[15px] hover:text-[#FF6B35] transition-colors">Templates</Link></li>
                <li><Link href="#" className="text-white text-[15px] hover:text-[#FF6B35] transition-colors">Integrations</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="nav-label text-[#888] mb-4">Company</h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-white text-[15px] hover:text-[#FF6B35] transition-colors">About</Link></li>
                <li><Link href="#" className="text-white text-[15px] hover:text-[#FF6B35] transition-colors">Journal</Link></li>
                <li><Link href="#" className="text-white text-[15px] hover:text-[#FF6B35] transition-colors">Careers</Link></li>
                <li><Link href="#" className="text-white text-[15px] hover:text-[#FF6B35] transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="nav-label text-[#888] mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-white text-[15px] hover:text-[#FF6B35] transition-colors">Privacy</Link></li>
                <li><Link href="#" className="text-white text-[15px] hover:text-[#FF6B35] transition-colors">Terms</Link></li>
                <li><Link href="#" className="text-white text-[15px] hover:text-[#FF6B35] transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#333] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#888] text-sm">
              &copy; 2024 Briefly. All rights reserved. Made by pressing buttons 🤖
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-[#888] hover:text-white transition-colors text-sm">Twitter</Link>
              <Link href="#" className="text-[#888] hover:text-white transition-colors text-sm">LinkedIn</Link>
              <Link href="#" className="text-[#888] hover:text-white transition-colors text-sm">Instagram</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
