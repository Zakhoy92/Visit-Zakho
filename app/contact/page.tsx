'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Send,
  CheckCircle2,
  PhoneCall,
  ExternalLink,
  MapPin,
  AlertCircle,
} from 'lucide-react';
import {
  validateSubmissionInput,
  StakeholderSubmissionInput,
} from '@/lib/planner-engine';
import { useZakho } from '@/components/ZakhoContext';

export default function ContactPage() {
  const { addStakeholderSubmission, stakeholderRecords } = useZakho();

  const [formState, setFormState] = useState<StakeholderSubmissionInput>({
    entityName: '',
    entityType: 'Tourism Enquiry',
    contactName: '',
    contactEmail: '',
    locationDescription: '',
    verificationSource: '',
    details: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedRecordId, setSubmittedRecordId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateSubmissionInput(formState);
    if (!validation.valid) {
      setErrors(validation.errors);
      setSubmittedRecordId(null);
      return;
    }
    setErrors({});
    const created = addStakeholderSubmission(formState);
    setSubmittedRecordId(created.id);
    setFormState({
      entityName: '',
      entityType: 'Tourism Enquiry',
      contactName: '',
      contactEmail: '',
      locationDescription: '',
      verificationSource: '',
      details: '',
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#F7F5EF] text-[#101716]">
      <section className="pt-32 pb-16 bg-[#142B2B] text-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-6 space-y-5">
          <p className="text-xs uppercase tracking-widest text-[#8BBDB5] font-mono-tabular">
            Official Tourism Enquiries &amp; Stakeholder Submissions
          </p>
          <h1 className="text-4xl sm:text-6xl font-serif-editorial text-[#FAFAF7] max-w-3xl">
            Contact Visit Zakho &amp; Submit Local Listings
          </h1>
          <p className="text-base sm:text-lg text-[#EAE2D3]/85 max-w-2xl leading-relaxed">
            Connect with the destination platform for visitor guidance, press inquiries, or to
            submit a local Zakho restaurant, hotel, or cultural attraction for editorial
            verification.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left 7 Columns: Validated Submission Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="p-6 sm:p-10 rounded-3xl bg-white border border-[#101716]/10 shadow-sm space-y-6"
          >
            <div>
              <p className="text-xs uppercase tracking-widest text-[#245D4D] font-semibold">
                Verified Stakeholder &amp; Visitor Form
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif-editorial mt-1">
                Submit an Enquiry or Business Profile
              </h2>
            </div>

            {submittedRecordId && (
              <div
                role="status"
                className="p-5 rounded-2xl bg-[#245D4D]/10 border border-[#245D4D] text-[#142B2B] space-y-2"
              >
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#245D4D]" />
                  <span>Submission Logged in Verification Registry ({submittedRecordId})</span>
                </div>
                <p className="text-xs text-[#101716]/80">
                  Your submission is now visible in the Content Management Console ({' '}
                  <Link href="/about" className="underline font-semibold text-[#245D4D]">
                    View Registry on /about
                  </Link>{' '}
                  ).
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="entityType"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#101716]/75 mb-2"
                >
                  Submission Category
                </label>
                <select
                  id="entityType"
                  value={formState.entityType}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      entityType: e.target.value as StakeholderSubmissionInput['entityType'],
                    }))
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#F7F5EF] border border-[#101716]/15 text-sm text-[#101716]"
                >
                  <option value="Tourism Enquiry">General Visitor / Press Enquiry</option>
                  <option value="Restaurant / Cafe">Local Restaurant / Cafe Listing</option>
                  <option value="Accommodation">Hotel / Accommodation Listing</option>
                  <option value="Destination">Cultural / Heritage Attraction Update</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="entityName"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#101716]/75 mb-2"
                >
                  Subject or Business Name *
                </label>
                <input
                  id="entityName"
                  type="text"
                  value={formState.entityName}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, entityName: e.target.value }))
                  }
                  placeholder="e.g., Khabur Riverfront Tea House"
                  className="w-full px-4 py-3 rounded-xl bg-[#F7F5EF] border border-[#101716]/15 text-sm text-[#101716]"
                />
                {errors.entityName && (
                  <p className="text-xs text-red-700 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.entityName}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="contactName"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#101716]/75 mb-2"
                >
                  Your Full Name *
                </label>
                <input
                  id="contactName"
                  type="text"
                  value={formState.contactName}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, contactName: e.target.value }))
                  }
                  placeholder="e.g., Diyar Sindî"
                  className="w-full px-4 py-3 rounded-xl bg-[#F7F5EF] border border-[#101716]/15 text-sm text-[#101716]"
                />
                {errors.contactName && (
                  <p className="text-xs text-red-700 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.contactName}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contactEmail"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#101716]/75 mb-2"
                >
                  Email Address *
                </label>
                <input
                  id="contactEmail"
                  type="email"
                  value={formState.contactEmail}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, contactEmail: e.target.value }))
                  }
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#F7F5EF] border border-[#101716]/15 text-sm text-[#101716]"
                />
                {errors.contactEmail && (
                  <p className="text-xs text-red-700 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.contactEmail}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="locationDescription"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#101716]/75 mb-2"
                >
                  Location in Zakho / Neighborhood *
                </label>
                <input
                  id="locationDescription"
                  type="text"
                  value={formState.locationDescription}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      locationDescription: e.target.value,
                    }))
                  }
                  placeholder="e.g., East Bank near Delal Bridge, Zakho City"
                  className="w-full px-4 py-3 rounded-xl bg-[#F7F5EF] border border-[#101716]/15 text-sm text-[#101716]"
                />
                {errors.locationDescription && (
                  <p className="text-xs text-red-700 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.locationDescription}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="verificationSource"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#101716]/75 mb-2"
                >
                  Verification Reference / Website (Optional)
                </label>
                <input
                  id="verificationSource"
                  type="text"
                  value={formState.verificationSource}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      verificationSource: e.target.value,
                    }))
                  }
                  placeholder="Official registration or map coordinates"
                  className="w-full px-4 py-3 rounded-xl bg-[#F7F5EF] border border-[#101716]/15 text-sm text-[#101716]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="details"
                className="block text-xs font-semibold uppercase tracking-wider text-[#101716]/75 mb-2"
              >
                Detailed Description or Enquiry Message *
              </label>
              <textarea
                id="details"
                rows={4}
                value={formState.details}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, details: e.target.value }))
                }
                placeholder="Provide factual information, opening hours, or your travel inquiry..."
                className="w-full px-4 py-3 rounded-xl bg-[#F7F5EF] border border-[#101716]/15 text-sm text-[#101716]"
              />
              {errors.details && (
                <p className="text-xs text-red-700 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.details}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 rounded-xl bg-[#142B2B] text-[#FAFAF7] hover:bg-[#245D4D] text-xs font-semibold uppercase tracking-widest inline-flex items-center justify-center gap-2 transition-colors shadow-lg"
            >
              <Send className="w-4 h-4 text-[#8BBDB5]" />
              <span>Submit to Visit Zakho Registry</span>
            </button>
          </form>
        </div>

        {/* Right 5 Columns: Official Institutional Contacts & Emergency Numbers */}
        <aside className="lg:col-span-5 space-y-6">
          <div className="p-7 rounded-3xl bg-[#142B2B] text-[#FAFAF7] space-y-5 shadow-xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8BBDB5]">
              <PhoneCall className="w-4 h-4" />
              <span>Verified Emergency Contacts (Kurdistan Region)</span>
            </div>
            <h3 className="text-2xl font-serif-editorial">
              Official Public Safety &amp; Medical Numbers
            </h3>
            <p className="text-xs text-[#EAE2D3]/80 leading-relaxed">
              In compliance with factual integrity rules, we display only verified public emergency
              codes operating across the Kurdistan Region of Iraq:
            </p>

            <dl className="space-y-3 font-mono-tabular text-sm pt-2 border-t border-white/10">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <dt className="text-[#EAE2D3]">Police / Civic Security</dt>
                <dd className="text-lg font-bold text-[#8BBDB5]">104</dd>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <dt className="text-[#EAE2D3]">Ambulance &amp; Medical Emergency</dt>
                <dd className="text-lg font-bold text-[#8BBDB5]">122</dd>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <dt className="text-[#EAE2D3]">Civil Defense &amp; Fire Response</dt>
                <dd className="text-lg font-bold text-[#8BBDB5]">115</dd>
              </div>
            </dl>
          </div>

          <div className="p-7 rounded-3xl bg-[#EAE2D3] border border-[#101716]/10 space-y-4">
            <h3 className="text-2xl font-serif-editorial text-[#101716]">
              Official Regional &amp; Academic Portals
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <a
                  href="https://visit.gov.krd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#245D4D] hover:underline inline-flex items-center gap-1.5"
                >
                  <span>Official Kurdistan Region Visitor &amp; e-Visa Portal (visit.gov.krd)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://gov.krd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#245D4D] hover:underline inline-flex items-center gap-1.5"
                >
                  <span>Kurdistan Regional Government Official Portal (gov.krd)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://uoz.edu.krd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#245D4D] hover:underline inline-flex items-center gap-1.5"
                >
                  <span>University of Zakho (uoz.edu.krd)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>

            <div className="pt-4 border-t border-[#101716]/10 text-xs text-[#101716]/75 flex items-center justify-between">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#B87D57]" />
                Active Registry Entries: {stakeholderRecords.length}
              </span>
              <Link href="/about" className="font-semibold text-[#245D4D] hover:underline">
                Manage in CMS →
              </Link>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
