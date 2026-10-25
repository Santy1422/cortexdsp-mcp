// Static, public, non-sensitive reference data for the demo tools.
// Indicative values — Amazon's exact weekly targets vary by station/week.

export const THRESHOLDS = {
  note: 'Indicative DSP scorecard targets. Exact Fantastic cutoffs are set weekly per station.',
  tiers: ['Fantastic', 'Great', 'Fair', 'Poor', 'At Risk'],
  metrics: {
    DCR: { label: 'Delivery Completion Rate', fantastic: '>= 98.5%', unit: '%' },
    DSB: { label: 'Delivered Standard Behaviours', fantastic: '>= 99%', unit: '%' },
    DSC: { label: 'Delivery Success Behaviours (DPMO)', fantastic: '<= ~1600 DPMO', unit: 'DPMO' },
    POD: { label: 'Photo-On-Delivery compliance', fantastic: '>= 98%', unit: '%' },
    CC:  { label: 'Contact Compliance', fantastic: '>= 98%', unit: '%' },
    DAR: { label: 'Delivered And Received', fantastic: '>= 99%', unit: '%' },
    DNR_DPMO: { label: 'Did Not Receive (DPMO, visibility only)', fantastic: 'lower is better', unit: 'DPMO' },
    LoR: { label: 'Lost on Road', fantastic: '~0', unit: 'count' },
  },
};

export const METRICS = {
  dcr: 'DCR (Delivery Completion Rate) = packages delivered / packages dispatched. The headline execution metric. Returns (RTS) are the gap.',
  dsc: 'DSC (Delivery Success Behaviours) = a DPMO score over eight "soft" delivery buckets (e.g. delivered to a safe/handoff location vs. left unsafely). This is the metric that actually scores — lower DPMO is better.',
  dnr: 'DNR (Did Not Receive) = customer reports a package as not received. Reported as DPMO. Visibility-only in the scorecard, but each case is an investigation with a 24h window.',
  pod: 'POD (Photo On Delivery) = share of eligible drop-offs with a valid, appropriate photo. Driver-controllable; coach the few who take bad/no photos.',
  lor: 'LoR (Lost on Road) = packages neither delivered nor returned to station. Should be ~0; each one is tracked.',
  ementor: 'eMentor / Mentor Adoption = share of on-road DAs using the Mentor safety app. Often a gate for the Safety Fantastic bonus (e.g. 90% adoption).',
};

// Educational description of the DNR investigation response flow (concept only —
// no Amazon-internal endpoints, payloads or credentials here).
export const DNR_FORMAT = {
  overview: 'A DNR investigation is answered by selecting, per tracking id, a cascade that explains where/how the parcel was handled.',
  cascade: ['completion (was it delivered?)', 'location (where it was left / handed to)', 'additional detail', 'property / building / floor when applicable'],
  deadline: 'Investigations typically expire ~24h after they are raised; answer before the window closes.',
  tip: 'Pick the branch that matches the scan evidence. Consistent, evidence-based answers reduce repeat DNR exposure.',
};

export const PNOV_BENCHMARK = {
  note: 'Aggregated, anonymous ranges — your mileage varies with volume and area.',
  typicalLostPerWeek: { low: 0, median: '3-8', high: '15+' },
  guidance: 'Rising PNOV (potential-not-on-van / missing) usually points at sortation or a specific route; triage by route and day.',
};
