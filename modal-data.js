// NHS A&E Simulation — modal data
// Auto-extracted from nhs_sim.html


const HELP={


  doc:{
    title:'Registrars',
    text:'Senior trainee doctors (typically ST4–ST8 in emergency medicine). They manage the Resus and Majors areas and carry 6–8 patients simultaneously — reviewing results, making decisions, seeing new arrivals. They can make admission decisions and sign off FY1/FY2 work. Reducing from 2 to 1 roughly halves throughput in Majors and Resus, and immediately creates a countersignature queue for junior doctors.',
  },
  con:{
    title:'Consultant',
    text:'A fully qualified emergency medicine consultant — the most senior clinician on the floor. They carry up to 12 patients, make final admission and discharge decisions, and are the escalation point when boarding or theatre queues build up. Without a consultant (set to 0, as on most night shifts), there is no senior decision-maker. FY1/FY2 doctors cannot discharge or admit without one present.',
  },
  fy1:{
    title:'FY1/FY2 Doctors (Foundation Year 1 & 2)',
    text:'The first two years after medical school. Foundation doctors can assess patients, order X-rays, bloods, ECGs, and CTs, and initiate treatment — but every admission or discharge decision needs countersigning by a registrar or consultant. In the sim they add 15–25 minutes per patient for the supervision loop. When senior doctors are scarce, FY1s become a queue — busy but blocked, unable to move patients on without sign-off.',
  },
  b7:{
    title:'Band 7 ENPs (Emergency Nurse Practitioners)',
    text:'The highest-grade nurses on the A&E floor. ENPs can independently assess, diagnose, prescribe, and discharge patients in the Minors area — no doctor needed. They are cost-effective: one B7 ENP clears the Minors queue as fast as a doctor at roughly half the cost. They cannot manage Majors, Resus, or surgical patients independently. Adding one ENP when Minors is backed up is often the highest-value single hire in the department.',
  },
  b5:{
    title:'Band 5/6 Nurses',
    text:'The frontline nursing workforce. Band 5s are newly qualified; Band 6s are senior nurses with more autonomy. They perform observations, IV cannulas, blood draws, medication administration, and patient monitoring. Without them, doctors must do basic tasks themselves, dramatically reducing the number of patients a doctor can carry. They are also the staff who collect samples for bloods and X-ray requests — so nurse shortages directly lengthen the imaging wait.',
  },
  bed:{
    title:'Ward Beds',
    text:'The total inpatient beds available to receive A&E admissions. This is the single most important bottleneck in the system. When a patient needs admission but no bed exists, they become a "boarder" — staying in an A&E treatment bay on a trolley, blocking that bay for new patients. The cascade from even 3–4 boarders can seize a department. Theatre patients who need a surgical ward bed post-op add to the same competition.',
  },
  arr:{
    title:'Walk-in Arrivals per Hour',
    text:'Patients arriving by car, taxi, or on foot. They go through the full pathway: Reception → Waiting room → Triage → Treatment zone → Investigations (if needed) → Discharge or admission. Arrival follows a real daily pattern: quiet overnight, building from 08:00, peaking 10:00–12:00. This slider sets the baseline; the hourly multiplier applies on top. Monday mornings are the busiest of the week.',
  },
  amb:{
    title:'Ambulance Arrivals per Hour',
    text:'999 patients bypass reception and triage entirely, going straight to Resus or a Majors bay. They are always Cat 1, 2, or 3 — the sickest third of presentations. Ambulance patients also disproportionately need imaging: CT head for trauma, chest X-ray for respiratory, ECG for cardiac. The paramedic crew cannot respond to another call until handover is complete — the NHS target is 15 minutes, the 2023–24 winter average was 63 minutes.',
  },
  abs:{
    title:'Staff Absence Rate',
    text:'The percentage of rostered staff who do not show up. Each staff member is rolled individually at startup and at every shift handover. Absent staff are shown greyed out and take no part in care — including countersigning FY1 work. In winter, absence cascades: one sick consultant means FY1 decisions queue up, investigations are ordered but not reviewed, and patients wait. This is distinct from vacancies — these people are on the rota but not present.',
  },
  hca:{
    title:'HCAs (Healthcare Assistants)',
    text:'Healthcare assistants support nursing staff with non-clinical tasks: taking observations, transporting patients, collecting samples, and preparing beds. In the sim, HCAs directly reduce investigation turnaround times — 2 HCAs gives 30% faster results, 1 HCA gives 15%. Without HCAs, nurses must do these tasks themselves, pulling them away from clinical care and slowing the investigation pipeline. HCAs cost significantly less than nurses and are one of the highest-value additions to a busy ED.',
  },
  soc:{
    title:'Social Care Block',
    text:'The percentage of ward beds occupied by patients who are medically fit to leave but cannot — because no home care package, care home bed, or supported discharge has been arranged. These patients have nothing clinically wrong with them. They are waiting on the council or a care provider. Every bed they occupy is unavailable to A&E. Theatre patients needing a post-op surgical bed face the same competition. This is the most politically contentious number in NHS performance data.',
  },
};


const DATA={
  season:{
    title:'Season — NHS data',
    rows:[
      {k:'Summer 4-hr compliance (Aug 2024)',v:'76.3%',c:'red'},
      {k:'Winter 4-hr compliance (Jan 2025)',v:'68.1%',c:'red'},
      {k:'Winter treatment time multiplier (sim)',v:'~1.35×',c:'amber'},
      {k:'Winter Cat1-3 acuity share vs summer',v:'+7 percentage points',c:'amber'},
      {k:'Peak arrival month',v:'January',c:''},
      {k:'Year-on-year attendance growth (2023–24)',v:'+4.2%',c:'amber'},
    ],
    source:'NHS England A&E Attendances and Emergency Admissions, 2024–25',
  },
  doc:{
    title:'Registrars — NHS data',
    rows:[
      {k:'Avg patients per registrar (Majors)',v:'6–8 simultaneous',c:''},
      {k:'Avg patients per consultant',v:'10–12 simultaneous',c:''},
      {k:'A&E doctor vacancy rate (2024)',v:'~9%',c:'amber'},
      {k:'Locum/agency doctor cost premium',v:'~2.5× substantive cost',c:'red'},
      {k:'RCEM recommended registrar:patient ratio',v:'1 per 8 Majors patients',c:''},
    ],
    source:'NHS Digital Workforce Statistics; RCEM workforce report 2024',
  },
  con:{
    title:'Consultant — NHS data',
    rows:[
      {k:'Departments with 24/7 consultant cover',v:'~40%',c:'red'},
      {k:'Night shift consultant presence',v:'Rare — typically on-call from home',c:'amber'},
      {k:'Admission decisions without consultant',v:'Take ~35% longer on average',c:'amber'},
      {k:'RCEM recommended ratio',v:'1 per 50 attendances/day',c:''},
      {k:'Consultant vacancy rate in EM (2024)',v:'~14%',c:'red'},
    ],
    source:'Royal College of Emergency Medicine (RCEM) Standards 2024',
  },
  fy1:{
    title:'FY1/FY2 Doctors — NHS data',
    rows:[
      {k:'Foundation doctors in NHS England',v:'~17,000',c:''},
      {k:'FY1 annual salary (2024–25)',v:'£32,398',c:''},
      {k:'FY2 annual salary (2024–25)',v:'£37,303',c:''},
      {k:'Avg wait for consultant countersignature',v:'15–40 min (busy dept)',c:'amber'},
      {k:'Decisions requiring countersign (FY1)',v:'~60% of disposals',c:''},
      {k:'Decisions requiring countersign (FY2)',v:'~30% of disposals',c:''},
      {k:'Foundation programme fill rate (2024)',v:'99.6%',c:'green'},
    ],
    source:'NHS Foundation Programme; NHS Employers pay scales 2024–25',
  },
  b7:{
    title:'Band 7 ENPs — NHS data',
    rows:[
      {k:'B7 ENP annual salary (NHS AfC 2024–25)',v:'£46,148–£52,809',c:''},
      {k:'Junior doctor annual cost (incl. on-costs)',v:'~£75,000–£90,000',c:''},
      {k:'Minors patients an ENP can see per hour',v:'3–4 independently',c:'green'},
      {k:'Minors conditions ENP can discharge',v:'~70% without a doctor',c:'green'},
      {k:'ENP vacancy rate (2024)',v:'~11%',c:'amber'},
    ],
    source:'NHS Agenda for Change pay scales 2024–25; RCEM',
  },
  b5:{
    title:'Band 5/6 Nurses — NHS data',
    rows:[
      {k:'Band 5 annual salary',v:'£29,970–£36,483',c:''},
      {k:'Band 6 annual salary',v:'£37,338–£44,962',c:''},
      {k:'Nursing vacancy rate in England (2024)',v:'~7.8% (≈38,000 posts)',c:'red'},
      {k:'Agency Band 5 shift cost vs substantive',v:'~£500 vs £180',c:'red'},
      {k:'Safe nurse:patient ratio (Majors)',v:'1:4 recommended; often 1:7+',c:'red'},
      {k:'Blood sample to result (typical)',v:'60–90 min via lab',c:'amber'},
    ],
    source:'NHS Digital; NHS Employers; NMC workforce data 2024',
  },
  bed:{
    title:'Ward Beds — NHS data',
    rows:[
      {k:'Total general & acute beds in England',v:'~106,000',c:''},
      {k:'Average occupancy 2024–25',v:'92.5%',c:'red'},
      {k:'NICE safe maximum occupancy',v:'90%',c:'amber'},
      {k:'Beds blocked by delayed discharge (daily)',v:'12,663',c:'red'},
      {k:'Winter peak blockage (Jan 2024)',v:'14,436 per day',c:'red'},
      {k:'Estimated annual cost of delayed discharge',v:'£2.6 billion',c:'red'},
    ],
    source:'NHS England Bed Availability and Occupancy data, 2024–25',
  },
  arr:{
    title:'Walk-in Arrivals — NHS data',
    rows:[
      {k:'Total A&E attendances (monthly, 2025)',v:'~2.4 million',c:''},
      {k:'Daily average across England',v:'~140,000',c:''},
      {k:'Per busy district general hospital (daily)',v:'200–400',c:''},
      {k:'Peak arrival window',v:'09:00–12:00, Monday highest',c:''},
      {k:'Overnight (midnight–06:00) share',v:'~12% of daily total',c:''},
    ],
    source:'NHS England A&E Attendances and Emergency Admissions, 2025',
  },
  amb:{
    title:'Ambulance Arrivals — NHS data',
    rows:[
      {k:'999 calls resulting in A&E conveyance',v:'~40%',c:''},
      {k:'Target ambulance handover time',v:'15 minutes',c:''},
      {k:'Average handover time (winter 2023–24)',v:'63 minutes',c:'red'},
      {k:'Handovers over 60 min (winter 2023–24)',v:'~33% of all handovers',c:'red'},
      {k:'Ambulances queuing at hospitals (peak)',v:'Up to 12 simultaneously',c:'red'},
      {k:'Cost of delayed handover per hour',v:'~£130 (crew + vehicle)',c:''},
    ],
    source:'AACE; NHS England Ambulance Quality Indicators 2023–24',
  },
  imaging:{
    title:'Imaging & Investigations — NHS data',
    rows:[
      {k:'X-ray: typical A&E turnaround',v:'20–40 minutes',c:''},
      {k:'Bloods (FBC, U&E, troponin): turnaround',v:'60–90 minutes',c:'amber'},
      {k:'CT scan: typical A&E turnaround',v:'45–90 minutes',c:'amber'},
      {k:'ECG: turnaround',v:'5–10 minutes',c:'green'},
      {k:'CT scanner availability (nights)',v:'Often single on-call radiographer',c:'red'},
      {k:'Radiology reporting backlog (2024)',v:'>1.7 million unreported scans',c:'red'},
      {k:'% of A&E patients needing bloods',v:'~65%',c:''},
      {k:'% needing imaging (X-ray or CT)',v:'~45%',c:''},
    ],
    source:'NHS England Diagnostic Waiting Times 2024; RCR Radiology Workforce Report 2024',
  },
  theatre:{
    title:'Theatre Queue (Emergency Surgery) — NHS data',
    rows:[
      {k:'Emergency surgery as % of all NHS ops',v:'~15%',c:''},
      {k:'Typical wait for emergency theatre slot',v:'2–8 hours from decision',c:'amber'},
      {k:'Patient must fast before general anaesthetic',v:'Yes — min 6 hrs (solid food)',c:''},
      {k:'Emergency theatre cost premium vs elective',v:'~2.5–3× per case',c:'red'},
      {k:'Cancelled emergency ops (no slot)',v:'~8% of listed cases',c:'amber'},
      {k:'Surgical patients boarding in A&E',v:'Common — no dedicated surgical holding',c:'red'},
      {k:'NHS target: emergency op within 24 hrs',v:'Met in ~72% of cases (2024)',c:'amber'},
    ],
    source:'NHS England Theatre Utilisation; Getting It Right First Time (GIRFT) Surgery 2024',
  },
  abs:{
    title:'Staff Absence — NHS data',
    rows:[
      {k:'Summer absence rate (all NHS staff)',v:'~8%',c:'amber'},
      {k:'Winter absence rate (Jan 2024)',v:'~22%',c:'red'},
      {k:'Peak week absence (Dec 2023)',v:'49,783 staff in one week',c:'red'},
      {k:'Burnout-related absence (nursing)',v:'Cited by 44% of leavers',c:'amber'},
      {k:'Cost of sickness absence (NHS England)',v:'~£2.4 billion/year',c:'red'},
    ],
    source:'NHS Digital Workforce Statistics; NHS Employers sickness absence data 2024',
  },
  soc:{
    title:'Social Care Block — NHS data',
    rows:[
      {k:'Patients fit-for-discharge but stuck (daily)',v:'12,663',c:'red'},
      {k:'As % of all general & acute beds',v:'~12%',c:'red'},
      {k:'Winter peak (Jan 2024)',v:'14,436 per day',c:'red'},
      {k:'Cause: waiting for home care package',v:'~38% of delays',c:'amber'},
      {k:'Cause: waiting for care home bed',v:'~29% of delays',c:'amber'},
      {k:'Annual cost to NHS',v:'~£2.6 billion',c:'red'},
      {k:'Social care workforce vacancy rate',v:'~9.9% (152,000 posts)',c:'red'},
    ],
    source:'NHS England; DHSC Adult Social Care Discharge Funding data 2024–25',
  },
};


const ZONE_INFO=[
  {
    id:'ambay',
    label:'Ambulance Bay',
    color:'#185FA5',
    who:'Paramedic crews + most seriously ill patients arriving by 999',
    what:'The dedicated entrance for ambulances. Patients bypass reception and triage entirely — they are already assessed and treated en route. The paramedic crew cannot leave until they have handed over the patient to A&E staff.',
    bottleneck:'Handover delay. If no A&E nurse is free to take the handover, the ambulance crew waits — unable to respond to the next 999 call. NHS target is 15 minutes; winter 2023–24 average was 63 minutes.',
    nhs:'Up to 12 ambulances can queue outside a busy hospital simultaneously.',
  },
  {
    id:'resus',
    label:'Resus (Resuscitation Room)',
    color:'#E24B4A',
    who:'Cat 1 and Cat 2 patients — the most critically ill. Cardiac arrest, major trauma, stroke, severe breathing difficulty.',
    what:'The highest-intensity area of A&E. Each bay has full resuscitation equipment. A consultant or registrar leads, supported by nurses. Decisions happen in minutes. The sim caps Resus at 8 patients — beyond that, Cat 2 patients overflow to Majors.',
    bottleneck:'Staff ratio. Resus patients need one-to-one nursing. If nurses are absent, a Resus bay cannot be safely opened.',
    nhs:'Cat 1 target: immediate response. Cat 2 target: seen within 10 minutes.',
  },
  {
    id:'majors',
    label:'Majors',
    color:'#BA7517',
    who:'Cat 2 overflow and Cat 3 patients — urgent but not immediately life-threatening. Chest pain, abdominal pain, head injury, fractures.',
    what:'The main treatment floor. Registrars and FY1/FY2 doctors manage patients here, often seeing 6–12 simultaneously. Most Cat 3 patients need bloods or imaging before a decision can be made — so they move to Awaiting Results and return. FY1/FY2 doctors can start treatment but need consultant countersignature to admit or discharge.',
    bottleneck:'The countersignature loop. FY1s are busy but blocked — every decision waits for a registrar or consultant to sign off. In the sim, if no senior is available after 20 sim-minutes, FY1s proceed autonomously.',
    nhs:'Cat 3 target: seen within 60 minutes. Reality in 2024–25: median wait over 90 minutes.',
  },
  {
    id:'reception',
    label:'Reception',
    color:'#888',
    who:'Band 2/3 admin staff. All walk-in patients.',
    what:'The first stop for anyone arriving on foot. Staff register the patient — name, date of birth, address, reason for attendance. Takes 2–5 minutes normally, longer if the receptionist is absent or busy. No clinical assessment happens here.',
    bottleneck:'Queue buildup. If reception is slow, patients stack up before they even reach triage — adding invisible time to the 4-hour clock that has already started.',
    nhs:'The 4-hour clock starts at arrival, not at triage. Every minute in reception counts.',
  },
  {
    id:'waiting',
    label:'Waiting Room',
    color:'#534AB7',
    who:'All walk-in patients who have been registered but not yet triaged or called through.',
    what:'Patients wait here after reception until a triage nurse calls them. The waiting room is not clinically monitored — a deteriorating patient here is a safety risk. In the sim, patients are sorted by clinical priority when the triage nurse calls them, not by arrival order.',
    bottleneck:'Volume vs triage capacity. One triage nurse cannot process fast arrivals. The waiting room fills, patients deteriorate unseen, and the queue becomes the visible face of a department in crisis.',
    nhs:'Nationally, median waiting room time before triage exceeded 45 minutes in winter 2024.',
  },
  {
    id:'triage',
    label:'Triage',
    color:'#0F6E56',
    who:'A Band 6 triage nurse.',
    what:'A rapid assessment — typically 3–5 minutes — to assign a Manchester Triage Category (Cat 1–5). The nurse takes observations, asks about symptoms, and decides urgency. This determines which zone the patient goes to and how quickly they must be seen. The triage nurse does not treat.',
    bottleneck:'Single point of failure. One nurse triaging means one patient at a time. If absent or busy, the entire walk-in stream stalls.',
    nhs:'Manchester Triage System used across NHS England. Cat 1 = immediate, Cat 5 = non-urgent (up to 4 hours).',
  },
  {
    id:'minors',
    label:'Minors',
    color:'#0F6E56',
    who:'Cat 4 and Cat 5 patients — minor injuries and illnesses. Sprains, minor lacerations, mild infections, simple fractures.',
    what:'Treated by Band 7 ENPs (Emergency Nurse Practitioners) who can independently assess, diagnose, prescribe, and discharge — without a doctor. ENPs see 3–4 patients per hour. If the ENP is overwhelmed and Minors queue exceeds 15, registrars overflow to help. Many Cat 4 patients still need an X-ray, adding ~25 minutes.',
    bottleneck:'Volume. Minors is typically 60–65% of all A&E attendances. One ENP cannot clear a peak-hour Minors queue alone — but adding doctors to Minors is expensive. ENPs are the cost-effective solution.',
    nhs:'~65% of A&E attendances are Cat 4 or Cat 5. ENPs cost roughly half as much per hour as a junior doctor.',
  },
  {
    id:'invest',
    label:'Awaiting Results',
    color:'#185FA5',
    who:'Patients who have been seen by a doctor or ENP and are waiting for test results.',
    what:'After initial assessment, most Cat 2/3/4 patients need investigations — bloods, X-ray, CT, or ECG — before a decision can be made. The doctor moves on to other patients while results are processed. When results return, the patient is flagged as priority and reassigned immediately. Typical waits: ECG 8 min, X-ray 25 min, Bloods 75 min, CT 90 min.',
    bottleneck:'Lab and radiology capacity. A single CT scanner at night means emergency scans queue behind each other. Radiology has a national backlog of 1.7 million unreported scans.',
    nhs:'~65% of A&E patients need bloods. ~45% need imaging. Both queues run independently of staffing.',
  },
  {
    id:'theatre',
    label:'Theatre Queue',
    color:'#534AB7',
    who:'Patients who have been assessed and listed for emergency surgery — appendicitis, fractured hip, acute abdomen.',
    what:'Once a surgeon decides a patient needs an operation, they are listed for theatre. They cannot eat or drink (in case general anaesthetic is needed). They wait — sometimes for hours — in A&E or a surgical holding area for a theatre slot to open. The sim has 3 theatre slots; when all are full, surgical patients board in the department instead.',
    bottleneck:'Theatre availability. Emergency theatres run 24/7 but are shared with trauma and obstetric emergencies. Typical wait for a non-life-threatening emergency slot is 2–8 hours. Each case costs ~2.5–3× an elective operation.',
    nhs:'NHS target: emergency surgery within 24 hours. Met in ~72% of cases in 2024.',
  },
  {
    id:'discharge',
    label:'Discharge / Home',
    color:'#888',
    who:'Patients who have completed their A&E episode — sent home, referred to GP, or transferred.',
    what:'Patients move here once they have been treated and discharged. In the sim this represents the successful end of the pathway. Patients admitted to a ward bed are shown here in blue; those who went home in grey; theatre patients in purple.',
    bottleneck:'None at this end — but delayed discharge upstream (boarding) means this zone stays smaller than it should. Every patient still in the department is one who has not reached here yet.',
    nhs:'NHS target: 95% of patients through A&E within 4 hours. National average in 2024–25: 73.9%.',
  },
  {
    id:'boarding',
    label:'Boarding — No Bed',
    color:'#E24B4A',
    who:'Patients who have been fully assessed, treated, and are medically ready for a ward bed — but no bed exists.',
    what:'The most damaging zone in the simulation. A boarding patient occupies an A&E bay on a trolley, blocking it for incoming patients. They receive no active treatment — they are simply waiting for a ward to find them a bed. Each boarder costs ~£400/day. When boarding patients exceed 3–4, the department begins to seize — new patients cannot be moved through because there is nowhere to put them.',
    bottleneck:'Ward capacity and social care. Beds are full (92.5% average occupancy nationally). Of those full beds, ~12% contain patients who are medically fit to leave but cannot — because no home care or care home placement is available.',
    nhs:'Average 12,663 patients per day boarding across England. Winter peak: 14,436. Annual cost: £2.6 billion.',
  },
  {
    id:'ward',
    label:'Ward Beds',
    color:'#0F6E56',
    who:'Inpatient ward beds available to receive patients admitted from A&E.',
    what:'Each dot represents one ward bed. Colour shows status: green = free, blue = occupied by a ward patient, red = occupied by a boarder from A&E still waiting to move, grey = blocked by a patient who is medically fit to leave but has no social care package in place. The simulation starts each day with boarders already in A&E — reflecting the overnight handover reality where day shift inherits the previous night problems.',
    bottleneck:'Social care discharge delays. Grey beds are permanently blocked for the entire simulation — those patients cannot leave hospital because no home care or care home placement is available. Drag the Social care block slider up and watch green beds turn grey, then red boarder dots appear in A&E as the knock-on effect.',
    nhs:'England has 106,000 general and acute beds at 92.5% average occupancy. On any given day, ~12,663 patients are medically fit for discharge but remain in hospital. Social care vacancy rate is 9.9% — 152,000 unfilled posts.',
  },
];


const LOGIC_ENTRIES=[
  {
    title:'Patient arrival & triage',
    body:`Walk-in patients arrive at a rate set by the Arrivals/hr slider, modulated by an hourly curve (peak 10:00–14:00, quiet 02:00–06:00). Ambulance patients bypass reception and triage entirely and go direct to Resus or Majors. Each walk-in patient is registered at Reception (2–3 min) then assessed by the Triage nurse using the Manchester Triage System (3 min). If the triage nurse is absent, a Band 5/6 nurse covers at reduced speed (6 min). Patients are assigned Cat1–5 which determines their zone, treatment time, and investigation needs.`
  },
  {
    title:'Staff assignment & capacity',
    body:`tryAssign() runs every tick. It counts only <strong>actively treating</strong> patients toward a doctor's capacity — patients in investigations do not count. Registrars: max 3 active. Consultants: max 4 active. FY/PA: max 2 active, Cat3/4 only. ENPs: one patient at a time, Minors only. If Minors queue exceeds 8, registrars overflow to help. If no senior is present or a patient has waited >20 min, FY/PA act autonomously without countersignature.`
  },
  {
    title:'Crowding penalty (flow degradation)',
    body:`When the waiting room exceeds 50 patients or boarding exceeds 10, staff efficiency degrades. Treatment and investigation times increase by up to 30% at peak overcrowding. Formula: penalty = min(30%, (waiting−50)/100 × 15% + (boarding−10)/20 × 15%). This reflects real ED dynamics: doctors get interrupted more, nurses cover more patients, decisions take longer, handovers run over. Winter crisis can trigger 20–25% slowdown at peak, making collapse feel exponential rather than linear.`
  },
  {
    title:'Nurse bay ratios (capacity limits)',
    body:`Nurse staffing limits how many patients can be actively treated, not just how fast. Resus: strict 1:1 nurse-to-patient ratio — if 2 nurses present, max 2 resus patients. Majors: safe ratio 1:4, crisis threshold 1:7 — once the crisis ratio is hit, no new patients can be assigned to Majors bays. Boarding patients count against Majors nurses. This means short-staffed nights genuinely close bays rather than just slowing things down. Reflects RCN safe staffing guidelines for emergency departments.`
  },
  {
    title:'Investigations (bloods, imaging)',
    body:`Patients needing investigations are sent after initial assessment. ECG: 8 min, X-ray: 25 min, Bloods: 75 min, CT: 90 min. HCAs reduce investigation times: 2 HCAs = 30% faster, 1 HCA = 15% faster. When results return, the patient is flagged as priority and immediately re-enters the assignment queue. <strong>invDone flag</strong> prevents a patient being sent to investigations twice. Without this flag, patients looped indefinitely and never discharged.`
  },
  {
    title:'Discharge, boarding & ward beds',
    body:`After treatment, each patient either goes home, is admitted to a ward, or goes to theatre. Admission probability varies by category (Cat1: 85%, Cat2: 60%, Cat3: 35%, Cat4: 5%). If a patient needs admission but no ward bed is free, they board in A&E on a trolley — blocking a bay and costing £400/day. Ward beds are blocked by social care delays (grey dots). The social care block % represents patients medically fit to leave but unable to — no care package available. Boarding drives the 4-hour breach and cost escalation.`
  },
  {
    title:'Theatre pathway',
    body:`A proportion of patients are listed for emergency surgery (Cat1: 15%, Cat2: 12%, Cat3: 10%). They fast and wait for a theatre slot (2–6 hr). The sim has 3 theatre slots. If all slots are taken, surgical patients board in A&E instead. Each emergency theatre case costs £800 listing fee plus an ongoing overhead. Theatre queue is shown in purple.`
  },
  {
    title:'Shift handovers & absence',
    body:`Shifts change at 08:00, 16:00, and 00:00. During the 15-minute handover, throughput is paused — no new assignments. Staff absence is re-rolled at each handover. Absence rates: summer 8%, autumn 12%, winter 22%. Absent staff show as faded badges. If the triage nurse is absent, a Band 5/6 nurse covers triage at reduced speed. If no consultant is present (e.g. night shift), FY/PA doctors escalate autonomously.<br><br><strong>Triage nurse protection:</strong> The triage nurse has a reduced absence probability (40% of normal rate) — losing triage entirely on a busy shift is a catastrophic single point of failure that would trigger an immediate escalation in real practice. The sim models this as protected rather than fully immune.`
  },
  {
    title:'Boarding pressure — discharge decisions',
    body:`When boarding exceeds 5 patients, clinicians come under pressure to discharge borderline admissions rather than admit them. This reflects real NHS practice: when wards are full, Cat3 patients who might ordinarily be admitted for observation get an 'ambulatory care' discharge with GP follow-up instead. The sim reduces effective admission probability by 15% when boarding >5, and 25% when boarding >10. This prevents total department seizure but reflects the clinical risk of premature discharge under pressure.`
  },
  {
    title:'Pre-population at 08:00',
    body:`The sim starts at 08:00 with a live department state — reflecting overnight handover. Pre-populated patients include boarders (if wards are full), patients awaiting results, and patients in the waiting room. These patients have negative arrivedAt values and are excluded from the door-to-treatment average. The number of pre-populated boarders depends on available ward beds — if beds are free at start, no boarders are created.`
  },
  {
    title:'Cost model — how £ is calculated',
    body:`Costs accrue every simulation tick and are shown as a running total in the bottom-right KPI.<br><br>
<strong>Per-minute ongoing costs:</strong><br>
• Boarding: £0.28/min per boarder (≈ £400/patient/day) — NHS England delayed transfer of care cost estimate<br>
• Theatre overhead: £0.55/min while theatre is active — NHS reference cost for emergency theatre<br>
• Agency staff premium: £0.22/min per absent substantive staff member — average agency uplift over substantive pay<br><br>
<strong>One-off event costs:</strong><br>
• 12-hour breach: £2,500 per patient — NHS England contractual penalty<br>
• Theatre listing: £800 per surgical patient — emergency theatre booking cost<br>
• No-bed boarding: £400 per patient who cannot be admitted — trolley wait cost<br><br>
<strong>Not modelled (simplification):</strong> base staffing salaries, consumables, diagnostic costs, readmission risk. The sim models the <em>marginal cost of poor flow</em> — the extra cost incurred by boarding, breaches and agency cover above normal operations. NHS target is 95% 4-hour; national average Jan 2025 was 68.1%.`
  },
  {
    title:'Dot clustering (repackZone)',
    body:`Every 10 ticks, all patient dots in each zone are repositioned to fill from top-left with no gaps. This prevents dots scattering across empty space as patients move between states. Each zone type has its own filter: waiting room uses state=waiting, investigations uses state=investigations, treatment zones use zone assignment. Without repacking, dots drift and accumulate in random positions as the simulation runs.`
  },
];


const EFFECTS_DATA=[
  {
    group:'Staff & timing',
    items:[
      {
        effect:'triageTime',
        label:'Triage duration',
        current:'3 min (nurse) / 6 min (B5 cover)',
        affects:'Time from waiting room to zone assignment. Every 1 min saved here moves ~20 patients/day faster through the system.',
        levers:'Triage nurse count, absence rate, AI pre-triage intervention',
        range:'1–8 min'
      },
      {
        effect:'treatMin',
        label:'Treatment time per category',
        current:'Cat1: 90 min / Cat2: 50 min / Cat3: 35 min / Cat4: 18 min',
        affects:'Core throughput. Reducing Cat3 treatment time by 10 min adds ~15% Majors capacity on a busy day.',
        levers:'Crowding penalty (adds up to 30%), season multiplier (winter +35%), FY supervision delay (+15–25 min)',
        range:'Cat1: 60–120 min, Cat4: 12–25 min'
      },
      {
        effect:'supDelay',
        label:'FY countersignature delay',
        current:'15–25 min added per FY/PA patient',
        affects:'Every FY patient needs a registrar or consultant to sign off. With 2 FY doctors and 1 registrar this creates a queue. Removing consultant (night shift) triggers autonomous mode after 20 min wait.',
        levers:'Consultant presence, registrar count, AI decision support',
        range:'0–25 min'
      },
      {
        effect:'invMins',
        label:'Investigation turnaround times',
        current:'ECG: 8 min / X-ray: 25 min / Bloods: 75 min / CT: 90 min',
        affects:'Patients in investigations do not count toward doctor capacity caps — but they block bay space and delay discharge. Bloods are the biggest bottleneck on high-volume days.',
        levers:'HCA count (2 HCAs = 30% faster), crowding penalty slows by up to 30%',
        range:'ECG: 5–12 min, Bloods: 50–100 min, CT: 60–120 min'
      },
      {
        effect:'crowdingPenalty',
        label:'Crowding efficiency penalty',
        current:'0% at normal load → up to 30% slowdown at peak',
        affects:'Applied to both treatment and investigation times. Triggers when waiting >50 or boarding >10. Makes winter collapse exponential — small overcrowding causes mild slowdown, full crisis causes near-seizure.',
        levers:'Arrival rate, boarding count, ward bed availability',
        range:'0–30% time multiplier'
      },
      {
        effect:'shiftHandover',
        label:'Shift handover pause',
        current:'15 min at 08:00, 16:00, 00:00 — throughput fully paused',
        affects:'Three times per day all assignment stops. On a winter crisis day this means 45 min of zero throughput with patients still arriving. Each handover can add 5–8 patients to the waiting room.',
        levers:'Handover duration, pre-briefing tools, electronic handover systems',
        range:'5–20 min'
      },
    ]
  },
  {
    group:'Nurse ratios & bay capacity',
    items:[
      {
        effect:'resusCap',
        label:'Resus nurse ratio',
        current:'Strict 1:1 — max resus patients = active resus nurses',
        affects:'If 1 nurse is in resus, only 1 patient can be actively treated regardless of how many doctors are available. Most direct capacity limit in the department.',
        levers:'B5/6 nurse count, absence rate, nurse zone assignment',
        range:'1:1 fixed (RCN guideline)'
      },
      {
        effect:'majorsCap',
        label:'Majors nurse ratio',
        current:'Safe: 1:4 / Crisis threshold: 1:7 (including boarders)',
        affects:'Once crisis ratio is hit, no new Majors assignments regardless of doctor availability. Boarders count against the ratio — so 5 boarders effectively remove 1 nurse\'s worth of capacity from new patients.',
        levers:'B5/6 nurse count, boarding count, absence rate',
        range:'Safe 1:4 → Crisis 1:7 (RCN guidelines)'
      },
    ]
  },
  {
    group:'Admission & discharge',
    items:[
      {
        effect:'admitP',
        label:'Admission probability per category',
        current:'Cat1: 85% / Cat2: 60% / Cat3: 35% / Cat4: 5% / Cat5: 1%',
        affects:'Primary driver of boarding. In winter, 60% of Cat2 patients need admission — with wards full, each becomes a boarder blocking a bay for ~8 hours.',
        levers:'Season (winter increases acuity), boarding pressure discount',
        range:'Cat1: 80–90%, Cat3: 25–45%'
      },
      {
        effect:'pressureDiscount',
        label:'Boarding pressure discharge adjustment',
        current:'Boarding >5: admitP -15% / Boarding >10: admitP -25%',
        affects:'Clinicians under boarding pressure push borderline admissions home with GP follow-up. Prevents total department seizure but increases readmission risk — not modelled as a cost here.',
        levers:'Boarding count, ward bed availability, discharge lounge intervention',
        range:'0–25% reduction in admitP'
      },
      {
        effect:'wardBedsFree',
        label:'Available ward beds',
        current:'Set by Ward beds slider minus social care blocked beds',
        affects:'Single most important bottleneck. Each bed freed reduces boarding by ~1 patient. Going from 0 to 2 free beds can cut boarding count by 40% over a shift.',
        levers:'Ward beds slider, social care block %, discharge lounge, social care fast-track intervention',
        range:'0 to cfg.bed'
      },
      {
        effect:'socBlocked',
        label:'Social care blocked beds',
        current:'Math.floor(cfg.bed × cfg.soc / 100)',
        affects:'Patients medically fit to leave but waiting on care packages. In winter at 75% block, 6 of 8 beds are unavailable to A&E. This single number drives more A&E harm than any clinical factor.',
        levers:'Social care block % slider, social care fast-track intervention',
        range:'0–75% of total beds in winter'
      },
      {
        effect:'theatreSlots',
        label:'Theatre slots available',
        current:'3 emergency slots. Wait: 2–6 hr per patient',
        affects:'Surgical patients who cannot get a theatre slot board in A&E instead, occupying a bay and counting against nurse ratios. Full theatre (3/3) pushes all subsequent surgical patients to boarding.',
        levers:'Theatre capacity, time of day (night = reduced availability)',
        range:'1–4 slots'
      },
    ]
  },
  {
    group:'Cost model',
    items:[
      {
        effect:'boardingCost',
        label:'Boarding cost rate',
        current:'£0.28/min per boarder (≈ £400/patient/day)',
        affects:'Primary cost driver on winter days. 35 boarders × £0.28/min × 480 min shift = £4,704 per shift just from boarding.',
        levers:'Ward bed availability, social care block, boarding pressure discount',
        range:'Fixed NHS England reference cost'
      },
      {
        effect:'agencyPremium',
        label:'Agency staff premium',
        current:'£0.22/min per absent staff member',
        affects:'With 22% winter absence across 14 rostered staff, ~3 staff absent at any time = £0.66/min = £570/shift in agency premium alone.',
        levers:'Staff absence rate slider',
        range:'Fixed average agency uplift'
      },
      {
        effect:'breachCost',
        label:'12-hour breach penalty',
        current:'£2,500 per patient exceeding 12 hours in A&E',
        affects:'Rare on quiet days. On winter crisis with 35 boarders staying 8+ hours, even 3–4 breaches adds £7,500–£10,000 to the daily cost.',
        levers:'Boarding count, ward bed availability, arrival rate',
        range:'Fixed NHS England contractual penalty'
      },
    ]
  },
  {
    group:'Patient flow',
    items:[
      {
        effect:'arrivalRate',
        label:'Walk-in arrival rate',
        current:'Baseline set by slider, modulated by hourly curve (peak 10:00–14:00)',
        affects:'Every +4 arrivals/hr adds ~50 patients per day. The hourly curve means the midday peak is ~3× the overnight trough regardless of the baseline setting.',
        levers:'Arrivals/hr slider, seasonal variation, bank holiday multipliers',
        range:'4–28/hr baseline'
      },
      {
        effect:'ambRate',
        label:'Ambulance arrival rate',
        current:'Bypass triage — go direct to Resus or Majors',
        affects:'Ambulance patients are always Cat1–3 and always need bays immediately. 5 ambulances/hr means ~80 direct bay admissions per day, all competing with walk-in Cat1–2 for resus and majors space.',
        levers:'Ambul/hr slider',
        range:'1–6/hr'
      },
      {
        effect:'absRate',
        label:'Staff absence rate',
        current:'Summer: 8% / Autumn: 12% / Winter: 22% (re-rolled each shift)',
        affects:'Each shift handover re-rolls absence for every staff member. Winter 22% across 14 staff means statistically 3 absent per shift. Cascade effect: absent consultant → FY queue → slower throughput → more overcrowding → crowding penalty kicks in.',
        levers:'Staff absence slider, triage nurse protection (40% of normal rate)',
        range:'0–30%'
      },
    ]
  },
];

