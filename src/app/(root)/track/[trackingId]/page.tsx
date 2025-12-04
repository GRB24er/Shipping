import TrackingResult from "@/components/features/tracking.result";
import Link from "next/link";
import { prisma } from "@/constants/config/db";
import { Metadata } from "next";

// Dynamic metadata generation
export async function generateMetadata({
  params,
}: {
  params: Promise<{ trackingId: string }>;
}): Promise<Metadata> {
  const { trackingId } = await params;
  return {
    title: trackingId
      ? `Track ${trackingId} | AsyncShip Logistics`
      : "Tracking Results | AsyncShip Logistics",
    description: "Real-time shipment tracking and delivery status updates",
  };
}

async function getTrackingData(trackingNumber: string) {
  try {
    const result = await prisma.shipment.findUnique({
      where: { trackingNumber },
      select: {
        trackingNumber: true,
        estimatedDelivery: true,
        deliveredAt: true,
        isPaid: true,
        originAddress: true,
        originCity: true,
        originState: true,
        originPostalCode: true,
        originCountry: true,
        destinationAddress: true,
        destinationCity: true,
        destinationState: true,
        destinationPostalCode: true,
        destinationCountry: true,
        serviceType: true,
        specialInstructions: true,
        recipient: {
          select: {
            name: true,
            company: true,
            email: true,
            phone: true,
          },
        },
        Sender: {
          select: {
            name: true,
            email: true,
          },
        },
        TrackingUpdates: {
          select: {
            id: true,
            timestamp: true,
            location: true,
            status: true,
            message: true,
          },
          orderBy: {
            timestamp: "asc",
          },
        },
        packages: {
          select: {
            height: true,
            width: true,
            length: true,
            packageType: true,
            declaredValue: true,
            weight: true,
            description: true,
            pieces: true,
            dangerous: true,
            insurance: true,
          },
        },
        createdAt: true,
      },
    });

    return result;
  } catch (error) {
    console.error("Database query error:", error);
    return null;
  }
}

// Error state component
function TrackingError({
  trackingNumber,
  type,
}: {
  trackingNumber?: string;
  type: "not-found" | "error" | "missing";
}) {
  const content = {
    "not-found": {
      icon: (
        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Shipment Not Found",
      subtitle: trackingNumber ? `Tracking Number: ${trackingNumber}` : undefined,
      description:
        "We couldn't locate a shipment with this tracking number. Please verify the number and try again, or contact support if you believe this is an error.",
      suggestions: [
        "Double-check for typos in your tracking number",
        "Ensure the shipment has been processed (allow 1-2 hours after pickup)",
        "Try searching with an alternative reference number",
      ],
    },
    error: {
      icon: (
        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
      title: "Unable to Retrieve Data",
      subtitle: "A temporary error occurred",
      description:
        "We're experiencing technical difficulties retrieving your tracking information. Our team has been notified and is working to resolve this.",
      suggestions: [
        "Wait a few moments and refresh the page",
        "Clear your browser cache and try again",
        "Contact support if the issue persists",
      ],
    },
    missing: {
      icon: (
        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "No Tracking Number Provided",
      subtitle: "Please enter your tracking information",
      description:
        "To view shipment details, you'll need to provide a valid tracking number. Enter your AWB or reference number to get started.",
      suggestions: [
        "Find your tracking number in your shipping confirmation email",
        "Check your receipt or shipping label",
        "Contact the sender for tracking details",
      ],
    },
  };

  const { icon, title, subtitle, description, suggestions } = content[type];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-slate-400 mb-8">
            {icon}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{title}</h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-lg text-slate-400 mb-6 font-mono tracking-wide">{subtitle}</p>
          )}

          {/* Description */}
          <p className="text-slate-400 max-w-lg mx-auto mb-10 leading-relaxed">{description}</p>

          {/* Suggestions Card */}
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 mb-10 text-left max-w-md mx-auto">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">
              Suggestions
            </h3>
            <ul className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-slate-400">
                  <svg
                    className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/track"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg shadow-blue-600/25"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Try Another Number
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold hover:bg-slate-700 transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              Contact Support
            </Link>
          </div>

          {/* Support info */}
          <div className="mt-12 pt-8 border-t border-slate-800/50">
            <p className="text-sm text-slate-500 mb-2">Need immediate assistance?</p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <a
                href="tel:+18003876789"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                +1 (800) 387-6789
              </a>
              <span className="text-slate-700">|</span>
              <a
                href="mailto:support@asyncship.com"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                support@asyncship.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function TrackingResultsPage({
  params,
}: {
  params: Promise<{ trackingId: string }>;
}) {
  const { trackingId } = await params;

  // No tracking number provided
  if (!trackingId) {
    return <TrackingError type="missing" />;
  }

  // Sanitize tracking number
  const sanitizedTrackingNumber = trackingId.trim().toUpperCase();

  // Fetch tracking data
  const trackingData = await getTrackingData(sanitizedTrackingNumber);

  // Shipment not found
  if (!trackingData) {
    return <TrackingError type="not-found" trackingNumber={sanitizedTrackingNumber} />;
  }

  // Render tracking results
  try {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Background effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-[130px]" />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Header bar */}
          <div className="border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Link
                    href="/track"
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Back to Tracking
                  </Link>
                  <span className="text-slate-700">|</span>
                  <span className="text-sm font-mono text-slate-300">{sanitizedTrackingNumber}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-sm text-slate-400 hover:text-white hover:border-slate-600 transition-all"
                    title="Print tracking details"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                      />
                    </svg>
                    Print
                  </button>
                  <button
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-sm text-slate-400 hover:text-white hover:border-slate-600 transition-all"
                    title="Share tracking link"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <TrackingResult data={trackingData} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error rendering tracking result:", error);
    return <TrackingError type="error" trackingNumber={sanitizedTrackingNumber} />;
  }
}