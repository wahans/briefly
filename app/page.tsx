import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <span className="font-bold text-xl text-gray-900">Briefly</span>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost">Sign in</Button>
              </Link>
              <Link href="/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Generate Professional Briefs<br />
            <span className="text-blue-600">Powered by AI</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Stop chasing clients for project details. Send an intelligent questionnaire
            that transforms terse answers into comprehensive creative briefs.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="text-lg px-8">
                Start Free
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Create a Template
              </h3>
              <p className="text-gray-600">
                Build a questionnaire template with the sections you need:
                goals, audience, deliverables, timeline, budget, and more.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Send to Your Client
              </h3>
              <p className="text-gray-600">
                Share a unique link with your client. They walk through a
                friendly, conversational questionnaire at their own pace.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                AI Generates the Brief
              </h3>
              <p className="text-gray-600">
                Our AI expands terse client answers into detailed, professional
                brief content. Client approves, you get notified.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Built for Agencies
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-xl border bg-white">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Conversational UI
              </h3>
              <p className="text-gray-600">
                Clients answer one question at a time in a friendly, focused interface.
                No overwhelming forms - just a simple conversation.
              </p>
            </div>
            <div className="p-8 rounded-xl border bg-white">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                AI-Powered Expansion
              </h3>
              <p className="text-gray-600">
                Short client answers become detailed, professional brief sections.
                Save hours of back-and-forth clarification.
              </p>
            </div>
            <div className="p-8 rounded-xl border bg-white">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Client Approval Flow
              </h3>
              <p className="text-gray-600">
                Clients review the generated brief and sign off with one click.
                Full transparency, no miscommunication.
              </p>
            </div>
            <div className="p-8 rounded-xl border bg-white">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Email Notifications
              </h3>
              <p className="text-gray-600">
                Automatic emails keep everyone in the loop. Clients get the link,
                you get notified when the brief is approved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to streamline your brief process?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Start collecting better briefs today. No credit card required.
          </p>
          <Link href="/signup">
            <Button size="lg" className="text-lg px-8 bg-white text-gray-900 hover:bg-gray-100">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="font-bold text-gray-900">Briefly</span>
          <p className="text-sm text-gray-500">
            Built with Next.js, Supabase, and Claude AI
          </p>
        </div>
      </footer>
    </div>
  )
}
