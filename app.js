/* =========================================================
   REFERENCE DATA
   ========================================================= */
const LOGO_FULL = 'assets/logo-full.jpg';
const DEPTS = {
    cse:       { short: 'CSE',      name: 'Computer Science and Engineering',          hod: 'Dr. R. Subha' },
    cse_aiml:  { short: 'CSE-AIML', name: 'CSE (AI & Machine Learning)',               hod: 'HOD, CSE (AI&ML)' },
    cce:       { short: 'CCE',      name: 'Computer and Communication Engineering',    hod: 'HOD, CCE' },
    cse_cyber: { short: 'CSE-CS',   name: 'CSE (Cyber Security)',                      hod: 'HOD, CSE (Cyber Security)' },
    ece:       { short: 'ECE',      name: 'Electronics and Communication Engineering', hod: 'Dr. R. Kumar' },
    ece_vlsi:  { short: 'VLSI',     name: 'Electronics Engineering (VLSI Design)',     hod: 'HOD, VLSI' },
    eee:       { short: 'EEE',      name: 'Electrical and Electronics Engineering',    hod: 'HOD, EEE' },
    mech:      { short: 'MECH',     name: 'Mechanical Engineering',                    hod: 'HOD, Mechanical' },
    aids:      { short: 'AI&DS',    name: 'Artificial Intelligence and Data Science',  hod: 'HOD, AI&DS' },
    csbs:      { short: 'CSBS',     name: 'CSE with Business Systems',                 hod: 'HOD, CSBS' },
    it:        { short: 'IT',       name: 'Information Technology',                    hod: 'HOD, IT' }
};
const PURCHASE_OFFICER = 'Ramesh Babu';
const MANAGEMENT_SIGNATORY = 'Principal & Management';
const POLICY_LIMIT = 25000;
const MIN_QUOTES = 2;
const DEADLINE_WINDOW = 4; // days
const CATEGORIES = ['Lab Equipment', 'Computing Infrastructure', 'Consumables & Tools', 'Software Licenses', 'Furniture & Fixtures', 'Research / Project Materials'];

const STATUS = {
    hod:        { label: 'Pending HOD Approval',        cls: 'bg-amber-100 text-amber-800' },
    purchase:   { label: 'Pending Quotation Check',     cls: 'bg-orange-100 text-orange-800' },
    management: { label: 'Pending Management Sanction', cls: 'bg-blue-100 text-blue-800' },
    sanctioned: { label: 'Sanctioned – Awaiting PO',    cls: 'bg-indigo-100 text-indigo-800' },
    po:         { label: 'PO Issued – In Transit',      cls: 'bg-violet-100 text-violet-800' },
    delivered:  { label: 'Delivered & Verified',        cls: 'bg-emerald-100 text-emerald-800' },
    returned:   { label: 'Returned for Clarification',  cls: 'bg-red-100 text-red-700' },
    rejected:   { label: 'Rejected',                    cls: 'bg-gray-200 text-gray-700' }
};
const PIPELINE = ['hod', 'purchase', 'management', 'sanctioned', 'po', 'delivered'];
const STAGE_LABELS = ['Submitted', 'HOD Approved', 'Quotes Verified', 'Mgmt Sanctioned', 'PO Issued', 'Delivered'];
const PRIORITY_CLS = { Urgent: 'bg-red-100 text-red-700 font-bold', High: 'bg-orange-100 text-orange-700 font-semibold', Normal: 'bg-gray-100 text-gray-600' };

/* =========================================================
   DATE HELPERS (demo dates are relative to today)
   ========================================================= */
const DAY = 86400000;
const pad = n => String(n).padStart(2, '0');
const isoLocal = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const TODAY = isoLocal(new Date());
const addDays = n => isoLocal(new Date(Date.now() + n * DAY));
const fmtDate = d => d ? new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
const shortDate = d => new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
const stamp = () => new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
const pastStamp = (n, time) => `${shortDate(addDays(-n))}, ${time}`;

function seedCore() {
    return [
        {
            id: 'REQ-2026-041', dept: 'ece', title: 'High-Performance DSP Starter Kits (TMS320F28379D)', category: 'Lab Equipment',
            qty: 15, unitCost: 12333, total: 185000, priority: 'Urgent',
            urgentNote: 'Required urgently for final year IoT & Embedded Systems lab overhaul before Anna University inspection.',
            spec: 'TI C2000 LaunchPad-class DSP kits with JTAG debugger, for Embedded Systems Lab (Room EC-204).',
            neededBy: addDays(3), requester: { name: 'Dr. R. Kumar', role: 'HOD', isHod: true },
            status: 'purchase', created: addDays(-4),
            quotes: [
                { vendor: 'Bharath Embedded Solutions', amount: 192500, gst: false, warranty: '1 year', days: 14 },
                { vendor: 'Kovai Electronics Traders', amount: 185000, gst: true, warranty: '3 years onsite', days: 7 }
            ],
            selectedVendor: 'Kovai Electronics Traders', attachments: ['VendorA_Quote.pdf', 'VendorB_Quote.pdf'],
            approvals: { hod: { by: 'Dr. R. Kumar', date: addDays(-4) } },
            log: [{ time: pastStamp(4, '09:40 AM'), step: 'Raised & endorsed by HOD', by: 'Dr. R. Kumar (ECE HOD)', note: 'Routed directly to Central Purchase.' }],
            chat: [
                { from: 'Ramesh Babu', tag: 'Purchase Desk', side: 'purchase', text: "We received your request for 15 DSP starter kits. Can you clarify if Kovai Electronics Traders' quotation includes tax and 3-year warranty?", time: pastStamp(1, '10:32 AM') },
                { from: 'Dr. R. Kumar', tag: 'ECE HOD', side: 'dept', text: 'Yes, Kovai Electronics Traders quote includes GST and comprehensive onsite warranty. Please proceed with Kovai Electronics Traders.', time: pastStamp(1, '10:45 AM') }
            ]
        },
        {
            id: 'REQ-2026-042', dept: 'cse', title: 'Raspberry Pi 5 (8 GB) Starter Kits', category: 'Lab Equipment',
            qty: 20, unitCost: 11500, total: 230000, priority: 'High', urgentNote: '',
            spec: 'Pi 5 8 GB with official 27W PSU, 64 GB microSD and case. For IoT Lab (CS-112) semester practicals.',
            neededBy: addDays(2), requester: { name: 'K. Priya', role: 'Lab Technician', isHod: false },
            status: 'hod', created: addDays(-1), quotes: [], selectedVendor: '', attachments: [],
            approvals: {},
            log: [{ time: pastStamp(1, '11:15 AM'), step: 'Request submitted', by: 'K. Priya (Lab Technician)', note: 'Routed to CSE HOD for approval.' }],
            chat: [{ from: 'K. Priya', tag: 'Lab Technician', side: 'dept', text: 'Please note we need the official 27W power adapters — third-party ones cause throttling during inference labs.', time: pastStamp(1, '11:18 AM') }]
        },
        {
            id: 'REQ-2026-039', dept: 'aids', title: 'GPU Workstations (RTX-class, 64 GB RAM)', category: 'Computing Infrastructure',
            qty: 4, unitCost: 285000, total: 1140000, priority: 'High', urgentNote: '',
            spec: 'Deep learning lab workstations, 24 GB VRAM GPU, 64 GB RAM, 2 TB NVMe. Lab AD-301.',
            neededBy: addDays(18), requester: { name: 'Prof. S. Anand', role: 'Faculty / Staff', isHod: false },
            status: 'management', created: addDays(-10),
            quotes: [
                { vendor: 'Western Ghats Infotech', amount: 1140000, gst: true, warranty: '3 years onsite', days: 21 },
                { vendor: 'Coimbatore Computer Systems', amount: 1186000, gst: true, warranty: '3 years', days: 18 }
            ],
            selectedVendor: 'Western Ghats Infotech', attachments: ['Workstation_Quotes.pdf'],
            approvals: { hod: { by: 'HOD, AI&DS', date: addDays(-9) }, purchase: { by: PURCHASE_OFFICER, date: addDays(-5) } },
            log: [
                { time: pastStamp(10, '02:10 PM'), step: 'Request submitted', by: 'Prof. S. Anand (Faculty / Staff)', note: 'Routed to AI&DS HOD.' },
                { time: pastStamp(9, '10:00 AM'), step: 'HOD approved', by: 'HOD, AI&DS', note: 'Forwarded to Central Purchase.' },
                { time: pastStamp(5, '02:05 PM'), step: 'Quotations verified', by: 'Ramesh Babu (Purchase Officer)', note: 'Western Ghats Infotech (L1) selected at ₹11,40,000. Forwarded to Management.' }
            ],
            chat: [{ from: 'Ramesh Babu', tag: 'Purchase Desk', side: 'purchase', text: 'Two quotes compared, Western Ghats Infotech is L1. Forwarded to Management.', time: pastStamp(5, '02:05 PM') }]
        },
        {
            id: 'REQ-2026-040', dept: 'eee', title: 'Programmable DC Power Supplies (0–30 V, 5 A)', category: 'Lab Equipment',
            qty: 8, unitCost: 21000, total: 168000, priority: 'Normal', urgentNote: '',
            spec: 'Triple-output programmable supplies with USB interface, replacing outdated units in Power Electronics Lab.',
            neededBy: addDays(9), requester: { name: 'HOD, EEE', role: 'HOD', isHod: true },
            status: 'sanctioned', created: addDays(-12), sanctionDate: addDays(-1),
            quotes: [
                { vendor: 'Sakthi Scientific Instruments', amount: 168000, gst: true, warranty: '2 years', days: 10 },
                { vendor: 'Annai Lab Equipments', amount: 176500, gst: true, warranty: '2 years', days: 7 }
            ],
            selectedVendor: 'Sakthi Scientific Instruments', attachments: [],
            approvals: { hod: { by: 'HOD, EEE', date: addDays(-12) }, purchase: { by: PURCHASE_OFFICER, date: addDays(-6) }, management: { by: MANAGEMENT_SIGNATORY, date: addDays(-1) } },
            log: [
                { time: pastStamp(12, '09:00 AM'), step: 'Raised & endorsed by HOD', by: 'HOD, EEE', note: 'Routed directly to Central Purchase.' },
                { time: pastStamp(6, '04:30 PM'), step: 'Quotations verified', by: 'Ramesh Babu (Purchase Officer)', note: 'Sakthi Scientific Instruments (L1) selected.' },
                { time: pastStamp(1, '11:00 AM'), step: 'Management sanction granted', by: MANAGEMENT_SIGNATORY, note: 'Purchase Desk may issue PO.' }
            ],
            chat: [{ from: 'Management Office', tag: 'Management', side: 'management', text: 'Sanctioned under lab modernisation budget. Please issue PO.', time: pastStamp(1, '11:00 AM') }]
        },
        {
            id: 'REQ-2026-038', dept: 'ece', title: 'Oscilloscopes (100MHz Digital Storage)', category: 'Lab Equipment',
            qty: 5, unitCost: 48000, total: 240000, priority: 'Normal', urgentNote: '',
            spec: '100 MHz, 2-channel DSO, 1 GSa/s, for Analog Circuits Lab.',
            neededBy: addDays(6), requester: { name: 'Dr. R. Kumar', role: 'HOD', isHod: true },
            status: 'po', created: addDays(-15), sanctionDate: addDays(-2),
            quotes: [
                { vendor: 'Precision Tech Supplies', amount: 240000, gst: true, warranty: '3 years', days: 5 },
                { vendor: 'Sakthi Scientific Instruments', amount: 255000, gst: true, warranty: '2 years', days: 10 },
                { vendor: 'Annai Lab Equipments', amount: 249500, gst: false, warranty: '3 years', days: 8 }
            ],
            selectedVendor: 'Precision Tech Supplies', attachments: ['DSO_Quotes.pdf'],
            approvals: { hod: { by: 'Dr. R. Kumar', date: addDays(-15) }, purchase: { by: PURCHASE_OFFICER, date: addDays(-9) }, management: { by: MANAGEMENT_SIGNATORY, date: addDays(-2) } },
            po: { number: 'SECE/PO/2026/089', vendor: 'Precision Tech Supplies', issuedOn: addDays(-1), expectedDate: addDays(2), tracking: 'Dispatched from vendor warehouse' },
            log: [
                { time: pastStamp(15, '10:00 AM'), step: 'Raised & endorsed by HOD', by: 'Dr. R. Kumar (ECE HOD)', note: 'Routed directly to Central Purchase.' },
                { time: pastStamp(9, '04:10 PM'), step: 'Quotations verified', by: 'Ramesh Babu (Purchase Officer)', note: 'Three quotations compared; Precision Tech Supplies (L1) selected.' },
                { time: pastStamp(2, '11:20 AM'), step: 'Management sanction granted', by: MANAGEMENT_SIGNATORY, note: '' },
                { time: pastStamp(1, '03:00 PM'), step: 'Purchase Order issued', by: 'Ramesh Babu (Purchase Officer)', note: 'PO SECE/PO/2026/089 issued to Precision Tech Supplies.' }
            ],
            chat: [
                { from: 'Ramesh Babu', tag: 'Purchase Desk', side: 'purchase', text: 'Three quotations compared. Precision Tech Supplies is L1 with GST and 3-year warranty. Forwarded for sanction.', time: pastStamp(9, '04:10 PM') },
                { from: 'Management Office', tag: 'Management', side: 'management', text: 'Sanctioned. Proceed with PO to Precision Tech Supplies.', time: pastStamp(2, '11:20 AM') }
            ]
        },
        {
            id: 'REQ-2026-035', dept: 'mech', title: 'CNC Lathe Tooling Inserts & Safety Gear', category: 'Consumables & Tools',
            qty: 100, unitCost: 950, total: 95000, priority: 'Urgent', urgentNote: 'Needed for manufacturing practice lab examinations.',
            spec: 'Carbide turning inserts (CNMG 120408) and safety goggles/gloves for Manufacturing Lab.',
            neededBy: addDays(-3), requester: { name: 'HOD, Mechanical', role: 'HOD', isHod: true },
            status: 'delivered', created: addDays(-20), sanctionDate: addDays(-17),
            quotes: [
                { vendor: 'Nilgiri Tools & Hardware', amount: 95000, gst: true, warranty: '—', days: 5 },
                { vendor: 'Precision Tech Supplies', amount: 99800, gst: true, warranty: '—', days: 4 }
            ],
            selectedVendor: 'Nilgiri Tools & Hardware', attachments: [],
            approvals: { hod: { by: 'HOD, Mechanical', date: addDays(-20) }, purchase: { by: PURCHASE_OFFICER, date: addDays(-19) }, management: { by: MANAGEMENT_SIGNATORY, date: addDays(-17) } },
            po: { number: 'SECE/PO/2026/075', vendor: 'Nilgiri Tools & Hardware', issuedOn: addDays(-16), expectedDate: addDays(-10), tracking: 'Delivered & verified' },
            delivery: { by: 'HOD, Mechanical', date: addDays(-9), condition: 'Received in good condition', note: 'Verified and stocked in tool room.' },
            log: [
                { time: pastStamp(20, '11:00 AM'), step: 'Raised & endorsed by HOD', by: 'HOD, Mechanical', note: '' },
                { time: pastStamp(19, '03:00 PM'), step: 'Quotations verified', by: 'Ramesh Babu (Purchase Officer)', note: 'Nilgiri Tools & Hardware (L1) selected.' },
                { time: pastStamp(17, '10:00 AM'), step: 'Management sanction granted', by: MANAGEMENT_SIGNATORY, note: '' },
                { time: pastStamp(16, '02:00 PM'), step: 'Purchase Order issued', by: 'Ramesh Babu (Purchase Officer)', note: 'PO SECE/PO/2026/075 issued to Nilgiri Tools & Hardware.' },
                { time: pastStamp(9, '03:30 PM'), step: 'Delivery confirmed', by: 'HOD, Mechanical', note: 'Received in good condition. Verified and stocked in tool room.' }
            ],
            chat: [{ from: 'HOD, Mechanical', tag: 'MECH HOD', side: 'dept', text: 'Items received in good condition. Thank you for the quick turnaround.', time: pastStamp(9, '03:30 PM') }]
        }
    ];
}

/* ---------------------------------------------------------
   Sample requisitions for every department — one each from a
   faculty member, a lab technician and a student (illustrative).
   [dept, kind, name, item, category, qty, unitCost, priority, status, daysAgo, neededInDays, spec, firstMessage, extra]
   --------------------------------------------------------- */
const DEPT_SAMPLES = [
    ['cse', 'faculty', 'Dr. S. Karthikeyan', 'High-performance workstations for AI Lab', 'Computing Infrastructure', 5, 130000, 'High', 'purchase', 6, 26, 'Workstations (i7, 32 GB RAM, RTX-class GPU) for deep-learning practicals of final-year project students.', 'Spec has been verified against the curriculum requirements.'],
    ['ece', 'lab', 'Kavitha Ramesh', 'Digital storage oscilloscopes (100 MHz, 4-channel)', 'Lab Equipment', 4, 70000, 'Urgent', 'management', 10, 4, 'Replacement for damaged units in the EDC Lab.', 'Two existing scopes are beyond repair; lab exams start soon.', { urgentNote: 'Damaged units must be replaced before semester lab examinations.' }],
    ['cse', 'student', 'Arun Kumar', 'ESP32 & IoT sensor kits for Project Hub', 'Research / Project Materials', 10, 3500, 'Normal', 'hod', 1, 20, 'ESP32 boards with sensor packs for Smart Campus Hackathon student prototypes.', 'These kits will be shared by 10 hackathon teams.'],
    ['cse', 'faculty', 'Dr. A. Vignesh', 'IntelliJ IDEA Ultimate academic licences', 'Software Licenses', 60, 1200, 'Normal', 'management', 8, 20, 'Classroom licences for Advanced Java & Spring Boot lab (CS-210), 1-year term.', 'Please make sure the licences cover the student lab machines, not named users.'],
    ['cse', 'lab', 'R. Selvam', 'UPS replacement batteries (12V 26Ah)', 'Consumables & Tools', 12, 4500, 'High', 'delivered', 38, -20, 'Replacement SMF batteries for the 3 kVA online UPS in Programming Lab II.', 'Two UPS units are already beeping on battery fault — please prioritise.'],
    ['cse', 'student', 'Nithya S. (III Yr, Coding Club)', 'Cloud GPU credits for final-year project', 'Research / Project Materials', 1, 45000, 'Normal', 'hod', 1, 25, 'GPU compute credits for training a Tamil speech-to-text model (final-year project, guide: Dr. A. Vignesh).', 'Our guide has approved the proposal; attaching the compute estimate.'],

    ['cse_aiml', 'faculty', 'Dr. P. Deepa', 'NVIDIA Jetson Orin Nano developer kits', 'Lab Equipment', 6, 42000, 'High', 'po', 18, 5, 'Edge-AI lab kits (8 GB) with official power supplies for Embedded AI elective.', 'We need the 8 GB variant — the 4 GB one cannot run our YOLO models.'],
    ['cse_aiml', 'lab', 'M. Gopinath', '27-inch IPS monitors for annotation workstations', 'Computing Infrastructure', 10, 16500, 'Normal', 'purchase', 4, 21, 'QHD IPS monitors with height-adjustable stands for the data-annotation lab (AM-104).', 'Height-adjustable stands are important — students annotate for long hours.'],
    ['cse_aiml', 'student', 'Harish K. (II Yr, AI Club)', 'Intel RealSense depth cameras', 'Research / Project Materials', 2, 38000, 'Normal', 'returned', 5, 30, 'Depth cameras for an obstacle-avoiding campus robot (AI Club project).', 'Could we get two so both robot teams can work in parallel?', { returnTo: 'hod', by: 'HOD, CSE (AI&ML)', note: 'Please attach the project abstract and confirm whether one camera can be shared between teams.' }],

    ['cce', 'faculty', 'Dr. L. Saranya', 'Software-defined radio kits (ADALM-Pluto class)', 'Lab Equipment', 8, 24000, 'Normal', 'sanctioned', 12, 14, 'SDR kits for Wireless Communication lab experiments (70 MHz – 6 GHz).', 'Kits with the external antenna set preferred.'],
    ['cce', 'lab', 'P. Ramesh', 'Cat6 patch cords, RJ45 connectors & crimping tools', 'Consumables & Tools', 1, 18500, 'Normal', 'delivered', 30, -10, 'Lot of 200 Cat6 patch cords, 500 RJ45 connectors and 6 crimp tools for Networks Lab.', 'Current stock is almost exhausted after the CCNA batch.'],
    ['cce', 'student', 'Aishwarya M. (IV Yr)', 'LoRaWAN gateway for campus IoT project', 'Research / Project Materials', 1, 22000, 'High', 'hod', 2, 4, '8-channel LoRaWAN gateway for the smart-campus air quality mesh (final-year project).', 'Our project review is next week, so we need the gateway soon.'],

    ['cse_cyber', 'faculty', 'Dr. J. Arun Prasad', 'Web security testing suite licences', 'Software Licenses', 5, 38000, 'High', 'purchase', 3, 12, 'Professional web application security testing licences for the Ethical Hacking lab.', 'Licences are for the instructor machines used in lab demonstrations.'],
    ['cse_cyber', 'lab', 'V. Dinesh', '24-port managed switches for isolated security lab', 'Computing Infrastructure', 2, 46000, 'Normal', 'po', 16, 3, 'L2 managed switches with VLAN & port mirroring to air-gap the Cyber Range lab.', 'Port mirroring is mandatory for the IDS exercises.'],
    ['cse_cyber', 'student', 'Rohit V. (III Yr, CTF Club)', 'Raspberry Pi kits for CTF practice range', 'Research / Project Materials', 6, 9500, 'Normal', 'rejected', 9, 10, 'Pi 5 kits to host practice challenges for the inter-college CTF.', 'We will host the practice challenges on these.', { by: 'HOD, CSE (Cyber Security)', note: 'The Cyber Range lab already has spare Pi units — please collect 6 from the lab in-charge instead.' }],

    ['ece', 'faculty', 'Dr. K. Revathi', 'Function generators (25 MHz, dual channel)', 'Lab Equipment', 6, 18500, 'Normal', 'delivered', 34, -12, 'Arbitrary waveform generators for Analog Communication lab.', 'Dual channel needed for AM/FM modulation experiments.'],
    ['ece', 'lab', 'S. Murugan', 'Soldering stations & fume extractors', 'Consumables & Tools', 10, 6800, 'High', 'hod', 1, 3, 'Temperature-controlled soldering stations with fume extractors for Electronics Workshop.', 'Three stations failed during the last workshop — this is a safety issue.'],
    ['ece', 'student', 'Keerthana R. (III Yr, IEEE SB)', 'PCB fabrication for mini-project boards', 'Research / Project Materials', 1, 28000, 'Normal', 'purchase', 4, 15, '2-layer PCB fabrication for 40 mini-project boards (IEEE Student Branch).', 'Gerber files are ready and checked by our faculty advisor.'],

    ['ece_vlsi', 'faculty', 'Dr. S. Balamurugan', 'FPGA development boards (Artix-7 class)', 'Lab Equipment', 12, 21000, 'High', 'management', 7, 16, 'FPGA boards with on-board peripherals for Digital System Design lab.', 'Boards should support the vendor tool version installed in VL-201.'],
    ['ece_vlsi', 'lab', 'T. Karthikeyan', 'ESD mats & wrist straps', 'Consumables & Tools', 20, 1450, 'Normal', 'returned', 6, 18, 'Anti-static mats and wrist straps for the VLSI testing bench.', 'Current mats are worn out.', { returnTo: 'purchase', by: 'Ramesh Babu (Purchase Desk)', note: 'Please confirm mat size (600×1200 mm or 600×900 mm) before we request quotations.' }],
    ['ece_vlsi', 'student', 'Pranav S. (IV Yr)', 'USB logic analyser (16-channel)', 'Research / Project Materials', 2, 14500, 'Normal', 'delivered', 28, -8, 'Logic analysers for RISC-V core debugging in the chip-design project.', 'Needed to debug the SPI and UART blocks.'],

    ['eee', 'faculty', 'Dr. N. Senthil Kumar', 'Three-phase power quality analyser', 'Lab Equipment', 1, 185000, 'High', 'purchase', 5, 20, 'Class-A power quality analyser for Power Systems lab & campus energy audit.', 'We will also use it for the campus energy audit requested by management.'],
    ['eee', 'lab', 'G. Venkatesh', 'Rheostats & MCB replacements', 'Consumables & Tools', 30, 1800, 'Normal', 'delivered', 26, -6, 'Wire-wound rheostats and 32 A MCBs for Electrical Machines lab panels.', 'Several rheostats have burnt-out windings.'],
    ['eee', 'student', 'Divya P. (III Yr, EV Club)', 'Solar panels & MPPT charge controller', 'Research / Project Materials', 1, 36000, 'Normal', 'hod', 2, 22, '2 × 330 W panels with MPPT controller for the solar EV charging demo.', 'This is for the state-level EV design competition.'],

    ['mech', 'faculty', 'Dr. R. Manikandan', 'FDM 3D printers (300 mm bed)', 'Lab Equipment', 2, 85000, 'Normal', 'po', 20, 6, 'Enclosed FDM printers with auto bed levelling for the Design & Prototyping lab.', 'Enclosed models only — the lab is air-conditioned.'],
    ['mech', 'lab', 'K. Saravanan', 'Lathe chuck keys, tool bits & cutting fluid', 'Consumables & Tools', 1, 14500, 'Normal', 'sanctioned', 9, 8, 'Spares and consumables for the 12 centre lathes in Machine Shop.', 'Cutting fluid stock will run out this month.'],
    ['mech', 'student', 'Sanjay M. (III Yr, SAE BAJA)', 'Suspension components for SAE BAJA vehicle', 'Research / Project Materials', 1, 120000, 'Urgent', 'management', 6, 4, 'Front & rear shock absorbers and A-arm bushings for the BAJA SAEINDIA entry.', 'Technical inspection is in 4 days — we cannot pass without these.', { urgentNote: 'Vehicle must pass technical inspection for BAJA SAEINDIA; current shocks failed testing.' }],

    ['aids', 'faculty', 'Dr. V. Priyadharshini', 'Data visualisation software licences', 'Software Licenses', 40, 1500, 'Normal', 'delivered', 32, -14, 'Academic licences for the Data Visualisation elective.', 'Licences should be activated before the semester starts.'],
    ['aids', 'lab', 'B. Arulmozhi', 'Network-attached storage (32 TB) for datasets', 'Computing Infrastructure', 1, 145000, 'High', 'purchase', 3, 14, '4-bay NAS with 4 × 8 TB drives for shared research datasets in AD-301.', 'Current datasets are scattered across student laptops — we need central storage.'],
    ['aids', 'student', 'Lokesh R. (IV Yr)', 'Dataset licence & cloud credits for capstone', 'Research / Project Materials', 1, 25000, 'Normal', 'hod', 1, 18, 'Commercial dataset licence and cloud compute for retail demand-forecasting capstone.', 'Our guide recommended this dataset for realistic results.'],

    ['csbs', 'faculty', 'Dr. G. Anitha', 'Business analytics software licences', 'Software Licenses', 60, 900, 'Normal', 'hod', 2, 24, 'Analytics suite licences for Business Systems lab (BS-102).', 'Same version as used by our industry partner for the internship.'],
    ['csbs', 'lab', 'S. Prabhu', 'Interactive smart board (86-inch)', 'Computing Infrastructure', 1, 98000, 'Normal', 'po', 17, 2, 'Interactive display for the case-study classroom.', 'Wall-mount installation needed.'],
    ['csbs', 'student', 'Shalini V. (II Yr, E-Cell)', 'Projector & screen for E-Cell events', 'Furniture & Fixtures', 1, 42000, 'Normal', 'delivered', 24, -5, 'Portable projector and tripod screen for Entrepreneurship Cell pitch events.', 'Needed for the startup pitch day.'],

    ['it', 'faculty', 'Dr. M. Kavitha', 'Thin client terminals for Web Technology lab', 'Computing Infrastructure', 30, 14000, 'Normal', 'management', 7, 30, 'Thin clients with 24-inch monitors replacing 10-year-old desktops in IT-105.', 'This replaces desktops that cannot run current browsers.'],
    ['it', 'lab', 'J. Sathish', 'Server rack cooling fans & PDU', 'Consumables & Tools', 1, 26000, 'High', 'delivered', 22, -4, 'Rack-mount fan tray and metered PDU for the department server rack.', 'Rack temperature is crossing 35°C in the afternoons.'],
    ['it', 'student', 'Varun K. (III Yr, App Dev Club)', 'Android test devices for app club', 'Research / Project Materials', 4, 15500, 'Normal', 'returned', 4, 20, 'Mid-range Android phones for testing student apps on real hardware.', 'Emulators are too slow on the lab machines.', { returnTo: 'hod', by: 'HOD, IT', note: 'Please list the apps to be tested and the faculty coordinator responsible for the devices.' }]
];

const VENDORS_BY_CATEGORY = {
    'Lab Equipment': ['Kovai Electronics Traders', 'Precision Tech Supplies', 'Sakthi Scientific Instruments'],
    'Computing Infrastructure': ['Western Ghats Infotech', 'Coimbatore Computer Systems'],
    'Consumables & Tools': ['Nilgiri Tools & Hardware', 'Precision Tech Supplies'],
    'Software Licenses': ['Western Ghats Infotech', 'Coimbatore Computer Systems'],
    'Research / Project Materials': ['Kovai Electronics Traders', 'Bharath Embedded Solutions'],
    'Furniture & Fixtures': ['Annai Lab Equipments', 'Nilgiri Tools & Hardware']
};
const KIND_ROLE = { faculty: 'Faculty / Staff', lab: 'Lab Technician', student: 'Student (Project / Club)' };
const KIND_TAG = { faculty: 'Faculty', lab: 'Lab Technician', student: 'Student' };

function seedDeptRequests(startNum) {
    const order = [...DEPT_SAMPLES].sort((a, b) => b[9] - a[9]);          // oldest first → lower IDs
    const year = new Date().getFullYear();
    return order.map((s, i) => {
        const [dept, kind, name, title, category, qty, unitCost, priority, status, ago, neededIn, spec, msg, extra = {}] = s;
        const d = DEPTS[dept], hodName = d.hod, id = `REQ-${year}-${String(startNum + i).padStart(3, '0')}`;
        const role = KIND_ROLE[kind];
        const estimate = qty * unitCost;
        const r = {
            id, dept, title, category, qty, unitCost, total: estimate, priority, urgentNote: extra.urgentNote || '',
            spec, neededBy: addDays(neededIn), requester: { name, role, isHod: false }, status, created: addDays(-ago),
            quotes: [], selectedVendor: '', attachments: [], approvals: {}, log: [], chat: [], generated: true
        };
        const at = (n, t) => pastStamp(n, t);
        r.log.push({ time: at(ago, '10:05 AM'), step: 'Request submitted', by: `${name} (${role})`, note: `Routed to ${d.short} HOD for approval.` });
        r.chat.push({ from: name, tag: KIND_TAG[kind], side: 'dept', text: msg, time: at(ago, '10:08 AM') });

        const step = ['hod', 'purchase', 'management', 'sanctioned', 'po', 'delivered'];
        const reached = st => step.indexOf(status) >= step.indexOf(st);
        const pastHod = status !== 'hod' && !(status === 'returned' && extra.returnTo === 'hod') && !(status === 'rejected');

        if (pastHod) {
            const hAgo = Math.max(ago - 1, 0);
            r.approvals.hod = { by: hodName, date: addDays(-hAgo) };
            r.log.push({ time: at(hAgo, '03:30 PM'), step: 'HOD approved', by: hodName, note: 'Forwarded to Central Purchase for quotation check.' });
        }

        // Quotations: complete set once past Purchase; one quote so far while at Purchase
        const vendors = VENDORS_BY_CATEGORY[category] || ['Precision Tech Supplies', 'Kovai Electronics Traders'];
        const quoteSet = n => vendors.slice(0, n).map((v, k) => ({ vendor: v, amount: Math.round(estimate * (k === 0 ? 0.97 : 1.02 + 0.04 * k) / 10) * 10,
            gst: k !== 1, warranty: category === 'Consumables & Tools' ? '—' : ['1 year', '2 years', '3 years onsite'][(i + k) % 3], days: 5 + ((i + k * 3) % 12) }));
        if (reached('management')) {
            r.quotes = quoteSet(Math.max(2, vendors.length));
            r.selectedVendor = r.quotes[0].vendor;
            r.total = r.quotes[0].amount;
            r.unitCost = Math.round(r.total / qty);
            const pAgo = Math.max(ago - 3, 0);
            r.approvals.purchase = { by: PURCHASE_OFFICER, date: addDays(-pAgo) };
            r.log.push({ time: at(pAgo, '11:40 AM'), step: 'Quotations verified', by: 'Ramesh Babu (Purchase Officer)', note: `${r.quotes.length} quotations compared; ${r.selectedVendor} (L1) selected at ${inr(r.total)}. Forwarded to Management.` });
            r.chat.push({ from: 'Ramesh Babu', tag: 'Purchase Desk', side: 'purchase', text: `${r.quotes.length} quotations received. ${r.selectedVendor} is L1 at ${inr(r.total)}. Forwarded for sanction.`, time: at(pAgo, '11:42 AM') });
        } else if (status === 'purchase' && estimate > POLICY_LIMIT) {
            r.quotes = quoteSet(1);
            r.selectedVendor = r.quotes[0].vendor;
            r.chat.push({ from: 'Ramesh Babu', tag: 'Purchase Desk', side: 'purchase', text: `First quotation received from ${r.selectedVendor}. Waiting for a second vendor before forwarding.`, time: at(Math.max(ago - 2, 0), '04:15 PM') });
        }
        if (reached('sanctioned')) {
            const mAgo = Math.max(ago - 5, 0);
            r.sanctionDate = addDays(-mAgo);
            r.approvals.management = { by: MANAGEMENT_SIGNATORY, date: r.sanctionDate };
            r.log.push({ time: at(mAgo, '12:10 PM'), step: 'Management sanction granted', by: MANAGEMENT_SIGNATORY, note: 'Purchase Desk may issue the Purchase Order.' });
        }
        if (reached('po')) {
            const oAgo = Math.max(ago - 6, 0);
            const expected = status === 'delivered' ? addDays(-(Math.max(ago - 12, 1))) : addDays(Math.max(neededIn - 1, 1));
            r.po = { number: `SECE/PO/${year}/${String(40 + i).padStart(3, '0')}`, vendor: r.selectedVendor, issuedOn: addDays(-oAgo), expectedDate: expected,
                tracking: status === 'delivered' ? 'Delivered & verified' : ['PO acknowledged by vendor', 'Dispatched from vendor warehouse', 'Out for delivery'][i % 3] };
            r.log.push({ time: at(oAgo, '02:45 PM'), step: 'Purchase Order issued', by: 'Ramesh Babu (Purchase Officer)', note: `${r.po.number} issued to ${r.po.vendor}.` });
        }
        if (status === 'delivered') {
            const dAgo = Math.max(ago - 12 - (i % 3 === 0 ? -1 : 1), 0);     // a few arrive a day late
            const date = addDays(-dAgo), onTime = date <= r.po.expectedDate, rating = onTime ? 5 - (i % 2) : 3;
            const by = kind === 'lab' ? name : hodName;
            r.delivery = { by, date, condition: 'Received in good condition', note: 'Verified and entered in the department stock register.', rating, onTime };
            r.log.push({ time: at(dAgo, '11:20 AM'), step: 'Delivery confirmed', by, note: `Received in good condition. Vendor rated ${rating}/5, ${onTime ? 'delivered on time' : 'delivered late'}.` });
        }
        if (status === 'returned') {
            r.returnTo = extra.returnTo;
            const rAgo = Math.max(ago - 1, 0);
            r.log.push({ time: at(rAgo, '05:00 PM'), step: 'Returned for clarification', by: extra.by, note: extra.note });
            r.chat.push({ from: extra.by.replace(/ \(.*\)$/, ''), tag: extra.returnTo === 'hod' ? `${d.short} HOD` : 'Purchase Desk', side: extra.returnTo === 'hod' ? 'dept' : 'purchase', text: 'Returned for clarification: ' + extra.note, time: at(rAgo, '05:00 PM') });
        }
        if (status === 'rejected') {
            const rAgo = Math.max(ago - 1, 0);
            r.approvals.hod = { by: extra.by, date: addDays(-rAgo), rejected: true };
            r.log.push({ time: at(rAgo, '04:40 PM'), step: 'Rejected', by: extra.by, note: extra.note });
            r.chat.push({ from: extra.by, tag: `${d.short} HOD`, side: 'dept', text: 'Rejected: ' + extra.note, time: at(rAgo, '04:40 PM') });
        }
        return r;
    });
}

function seedData() {
    const core = seedCore();
    const next = Math.max(...core.map(r => parseInt(r.id.split('-')[2], 10))) + 1;
    return [...core, ...seedDeptRequests(next)];
}

function seedNotifications() {
    return [
        { id: 'N1', to: ['hod:cse'], type: 'new', title: 'New request awaiting your approval', msg: 'K. Priya (Lab Technician) requested 20× Raspberry Pi 5 Starter Kits, needed by ' + fmtDate(addDays(2)) + '.', reqId: 'REQ-2026-042', time: pastStamp(1, '11:15 AM'), read: false },
        { id: 'N2', to: ['management', 'dept:aids'], type: 'forwarded', title: 'REQ-2026-039 forwarded for sanction', msg: 'Purchase Desk verified 2 quotations for GPU Workstations (AI&DS). Western Ghats Infotech at ₹11,40,000.', reqId: 'REQ-2026-039', time: pastStamp(5, '02:05 PM'), read: false },
        { id: 'N3', to: ['purchase', 'dept:eee'], type: 'sanctioned', title: 'Sanction granted: REQ-2026-040', msg: 'Management sanctioned Programmable DC Power Supplies (EEE). Purchase Desk may issue the PO.', reqId: 'REQ-2026-040', time: pastStamp(1, '11:00 AM'), read: false },
        { id: 'N4', to: ['dept:ece', 'management'], type: 'po', title: 'PO issued: REQ-2026-038', msg: 'PO SECE/PO/2026/089 issued to Precision Tech Supplies for 5× Oscilloscopes. Expected delivery ' + fmtDate(addDays(2)) + '.', reqId: 'REQ-2026-038', time: pastStamp(1, '03:00 PM'), read: false }
    ];
}

/* =========================================================
   STATE & PERSISTENCE
   ========================================================= */
// Sample vendor master (illustrative names and GSTINs, not real suppliers)
function seedVendors() {
    const v = (name, gstin, city, contact, phone, email, categories, ratings) => ({ name, gstin, city, contact, phone, email, categories, ratings });
    const past = (id, score, onTime, ago) => ({ reqId: id, score, onTime, date: addDays(-ago) });
    return [
        v('Kovai Electronics Traders', '33AABCK1234A1Z5', 'Coimbatore', 'S. Karthik', '98430 11223', 'sales@kovaielectronics.example', ['Lab Equipment', 'Research / Project Materials'], [past('REQ-2025-118', 5, true, 140), past('REQ-2025-131', 4, true, 90)]),
        v('Bharath Embedded Solutions', '29AAFCB5678B1Z2', 'Bengaluru', 'R. Nandini', '80 4123 5566', 'orders@bharathembedded.example', ['Lab Equipment'], [past('REQ-2025-102', 3, false, 200)]),
        v('Precision Tech Supplies', '33AAGFP9012C1Z8', 'Coimbatore', 'M. Rajesh', '94422 33445', 'info@precisiontech.example', ['Lab Equipment', 'Consumables & Tools'], [past('REQ-2025-097', 5, true, 220), past('REQ-2025-140', 4, true, 60)]),
        v('Sakthi Scientific Instruments', '33AAHCS3456D1Z1', 'Tiruppur', 'P. Sakthivel', '97890 55667', 'sakthi.sci@example.com', ['Lab Equipment'], [past('REQ-2025-109', 4, false, 170)]),
        v('Annai Lab Equipments', '33AAJFA7890E1Z4', 'Erode', 'K. Meena', '99944 77889', 'annailab@example.com', ['Lab Equipment', 'Furniture & Fixtures'], []),
        v('Western Ghats Infotech', '33AAKCW2345F1Z7', 'Coimbatore', 'A. Joseph', '98422 99001', 'enterprise@wginfotech.example', ['Computing Infrastructure', 'Software Licenses'], [past('REQ-2025-121', 5, true, 120)]),
        v('Coimbatore Computer Systems', '33AALCC6789G1Z3', 'Coimbatore', 'V. Lakshmi', '0422 255 6677', 'ccs.sales@example.com', ['Computing Infrastructure', 'Software Licenses'], [past('REQ-2025-088', 3, true, 250), past('REQ-2025-126', 4, false, 110)]),
        v('Nilgiri Tools & Hardware', '33AAMFN0123H1Z6', 'Coimbatore', 'G. Prakash', '93600 12121', 'nilgiritools@example.com', ['Consumables & Tools', 'Furniture & Fixtures'], [past('REQ-2026-035', 5, true, 9)])
    ];
}

// Financial year budgets per department (₹) — editable by Management
const FY_LABEL = (() => { const d = new Date(), y = d.getMonth() >= 3 ? d.getFullYear() : d.getFullYear() - 1; return `FY ${y}-${String(y + 1).slice(2)}`; })();
function seedBudgets() {
    return { cse: 1500000, cse_aiml: 600000, cce: 400000, cse_cyber: 400000, ece: 1000000, ece_vlsi: 450000, eee: 600000, mech: 700000, aids: 1000000, csbs: 300000, it: 500000 };
}

/* =========================================================
   SIGN-IN ACCOUNTS (merged from the SECE IPMS prototype)
   Demo only: accounts and password live in this page.
   ========================================================= */
const DEMO_PASSWORD = 'sece@123';
const ROLE_LABEL = { management: 'Management', purchase_officer: 'Purchase Officer', hod: 'Head of Department', faculty: 'Faculty', lab_assistant: 'Lab Technician', student: 'Student' };
const REQ_ROLE = { faculty: 'Faculty / Staff', lab_assistant: 'Lab Technician', student: 'Student (Project / Club)' };
const MAIL_CODE = { cse: 'cse', cse_aiml: 'aiml', cce: 'cce', cse_cyber: 'cyber', ece: 'ece', ece_vlsi: 'vlsi', eee: 'eee', mech: 'mech', aids: 'aids', csbs: 'csbs', it: 'it' };
let USERS = [];

function buildUsers() {
    const users = [
        { id: 'u6', name: 'Shri. R. Rajaram', role: 'management', email: 'director@sece.ac.in', dept: null, designation: 'Director' },
        { id: 'u5', name: 'Ramesh Babu', role: 'purchase_officer', email: 'sece@sece.ac.in', dept: null, designation: 'Purchase Officer, Central Purchase Department' },
        { id: 'u4', name: 'Dr. R. Subha', role: 'hod', email: 'hodcse@sece.ac.in', dept: 'cse', designation: 'Professor & Head (CSE)' },
        { id: 'u3', name: 'Dr. S. Karthikeyan', role: 'faculty', email: 'karthikeyan.s@sece.ac.in', dept: 'cse', designation: 'Associate Professor' },
        { id: 'u2', name: 'Kavitha Ramesh', role: 'lab_assistant', email: 'kavitha.lab@sece.ac.in', dept: 'ece', labName: 'VLSI & Embedded Lab' },
        { id: 'u1', name: 'Arun Kumar', role: 'student', email: 'arun.21cse@sece.ac.in', dept: 'cse', year: '3rd Year', section: 'A', regNo: '711621104012' }
    ];
    Object.entries(DEPTS).forEach(([k, d]) => {
        if (!users.some(u => u.role === 'hod' && u.dept === k))
            users.push({ id: 'hod-' + k, name: d.hod, role: 'hod', email: `hod${MAIL_CODE[k]}@sece.ac.in`, dept: k, designation: `Head of Department (${d.short})` });
    });
    const add = (dept, kind, name) => {
        if (users.some(u => u.name === name)) return;
        const role = { faculty: 'faculty', lab: 'lab_assistant', student: 'student' }[kind];
        const parts = name.replace(/\(.*\)/, '').replace(/^(Dr|Prof)\.\s*/, '').trim().split(/\s+/);
        const first = parts.filter(x => !x.endsWith('.')).join('').toLowerCase();
        const init = (parts.find(x => x.endsWith('.')) || '').replace('.', '').toLowerCase();
        const yr = { I: 25, II: 24, III: 23, IV: 22 }[(name.match(/\((I{1,3}|IV) Yr/) || [])[1]] || 23;
        const email = role === 'student' ? `${first}.${yr}${MAIL_CODE[dept]}@sece.ac.in` : `${first}${init ? '.' + init : ''}@sece.ac.in`;
        users.push({ id: `${role}-${dept}-${users.length}`, name, role, email, dept,
            designation: role === 'faculty' ? 'Faculty' : '', labName: role === 'lab_assistant' ? `${DEPTS[dept].short} Laboratory` : '' });
    };
    add('cse', 'lab', 'K. Priya');
    add('aids', 'faculty', 'Prof. S. Anand');
    DEPT_SAMPLES.forEach(s => add(s[0], s[1], s[2]));
    const seen = {};
    users.forEach(u => { if (seen[u.email]) u.email = u.email.replace('@', (++seen[u.email]) + '@'); else seen[u.email] = 1; });
    return users;
}
const currentUser = () => USERS.find(u => u.id === state.userId);

function accountOptions(selected) {
    const opt = u => `<option value="${u.id}" ${u.id === selected ? 'selected' : ''}>${esc(u.name)} — ${ROLE_LABEL[u.role]}</option>`;
    const rank = { hod: 0, faculty: 1, lab_assistant: 2, student: 3 };
    let html = `<optgroup label="Management & Central">${USERS.filter(u => !u.dept).map(opt).join('')}</optgroup>`;
    Object.entries(DEPTS).forEach(([k, d]) => {
        const list = USERS.filter(u => u.dept === k).sort((a, b) => rank[a.role] - rank[b.role]);
        html += `<optgroup label="${d.short} — ${d.name}">${list.map(opt).join('')}</optgroup>`;
    });
    return html;
}
function applyUser(u) {
    state.userId = u.id;
    if (u.role === 'management') state.role = 'management';
    else if (u.role === 'purchase_officer') state.role = 'purchase';
    else {
        state.role = u.dept;
        state.persona = u.role === 'hod' ? 'hod' : 'staff';
        if (u.role !== 'hod') { state.staffName = u.name; state.staffRole = REQ_ROLE[u.role]; }
    }
}
function logAccess(action, u) {
    state.access = [{ time: stamp(), action, name: u.name, role: ROLE_LABEL[u.role], email: u.email }, ...(state.access || [])].slice(0, 100);
}
function showLogin() {
    $('login-account').innerHTML = `<option value="">— Choose an account —</option>` + accountOptions('');
    $('login-email').value = ''; $('login-pass').value = '';
    $('login-role').innerHTML = ''; $('login-error').classList.add('hidden');
    $('login-screen').classList.remove('hidden'); $('login-screen').classList.add('flex');
    icons();
}
function pickAccount(id) {
    const u = USERS.find(x => x.id === id);
    if (!u) return;
    $('login-email').value = u.email;
    $('login-pass').value = DEMO_PASSWORD;
    const extra = u.regNo ? ` · Reg. No. ${esc(u.regNo)}` : u.labName ? ` · ${esc(u.labName)}` : u.designation ? ` · ${esc(u.designation)}` : '';
    $('login-role').innerHTML = `<span class="inline-block bg-blue-50 text-[#003366] text-[10px] font-bold px-3 py-1 rounded-full">${ROLE_LABEL[u.role]}${u.dept ? ' · ' + DEPTS[u.dept].short : ''}${extra}</span>`;
}
function doLogin(e) {
    e.preventDefault();
    const email = $('login-email').value.trim().toLowerCase();
    const u = USERS.find(x => x.email.toLowerCase() === email);
    const err = !u ? 'No account found for that email address.' : $('login-pass').value !== DEMO_PASSWORD ? 'Incorrect password.' : '';
    if (err) { $('login-error').textContent = err; $('login-error').classList.remove('hidden'); return; }
    applyUser(u); logAccess('Signed in', u);
    $('login-screen').classList.add('hidden'); $('login-screen').classList.remove('flex');
    $('user-switcher').innerHTML = accountOptions(u.id);
    activeTab = 'dashboard';
    setRole(state.role);
    toast(`Welcome, ${u.name}`, `${ROLE_LABEL[u.role]}${u.dept ? ' · ' + DEPTS[u.dept].name : ''}`, 'success');
}
function switchUser(id) {
    const u = USERS.find(x => x.id === id);
    if (!u) return;
    applyUser(u); logAccess('Switched account (demo)', u);
    ['detail-modal', 'signoff-modal', 'note-modal'].forEach(closeModal);
    setRole(state.role);
}
function logout() {
    const u = currentUser();
    if (u) logAccess('Signed out', u);
    state.userId = null; save();
    ['detail-modal', 'signoff-modal', 'note-modal'].forEach(closeModal);
    $('notif-drawer').classList.add('hidden');
    showLogin();
}
function canReceive(r) {
    return isDept() && r.dept === state.role && (state.persona === 'hod' || state.staffRole === 'Lab Technician' || r.requester.name === state.staffName);
}

const STORE_KEY = 'sece-procurement-v5';
let state;   // loaded in INIT, after all helpers are defined
let activeTab = 'dashboard';
let detailId = null;
let pendingNote = null;
let lastFiltered = [];

function freshState(role = 'ece', persona = 'hod') {
    const requests = seedData(), vendors = seedVendors(), notifications = seedNotifications();
    // Ratings from sample deliveries feed the vendor directory
    requests.forEach(r => {
        if (!r.delivery || !r.delivery.rating) return;
        const v = vendors.find(x => x.name === r.po.vendor);
        if (v && !v.ratings.some(x => x.reqId === r.id)) v.ratings.push({ reqId: r.id, score: r.delivery.rating, onTime: r.delivery.onTime, date: r.delivery.date });
    });
    // Alerts for sample requests waiting on an HOD or Management
    requests.filter(r => r.generated && (r.status === 'hod' || r.status === 'management')).forEach((r, i) => {
        const hod = r.status === 'hod';
        notifications.push({ id: 'NG' + i, to: hod ? ['hod:' + r.dept] : ['management'], type: hod ? 'new' : 'forwarded',
            title: hod ? `New request awaiting your approval: ${r.id}` : `${r.id} forwarded for sanction`,
            msg: `${r.requester.name} (${r.requester.role}, ${DEPTS[r.dept].short}) — ${r.qty}× "${r.title}", ${inr(r.total)}, needed by ${fmtDate(r.neededBy)}.`,
            reqId: r.id, time: r.log[r.log.length - 1].time, read: false });
    });
    return { requests, notifications, vendors, budgets: seedBudgets(), role, persona, staffName: 'K. Priya' };
}
function load() {
    try {
        const raw = localStorage.getItem(STORE_KEY);
        if (raw) {
            const s = JSON.parse(raw);
            if (!s.vendors) s.vendors = seedVendors();
            if (!s.budgets) s.budgets = seedBudgets();
            return s;
        }
    } catch (e) {}
    return freshState();
}
function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {} }
function resetDemo() {
    if (!confirm('Reset all requisitions, vendors, budgets and notifications to the demo data?')) return;
    state = freshState(state.role, state.persona);
    save(); closeModal('detail-modal'); renderAll(); toast('Demo data restored', 'All requisitions reset.', 'info');
}

/* =========================================================
   HELPERS
   ========================================================= */
const $ = id => document.getElementById(id);
const inr = n => '₹' + Number(n || 0).toLocaleString('en-IN');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
/* Icons are embedded (Lucide, ISC licence) so the page works without internet */
const LUCIDE_ICONS = {"alarm-clock": "<svg class=\"lucide lucide-alarm-clock\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" > <circle cx=\"12\" cy=\"13\" r=\"8\" /> <path d=\"M12 9v4l2 2\" /> <path d=\"M5 3 2 6\" /> <path d=\"m22 6-3-3\" /> <path d=\"M6.38 18.7 4 21\" /> <path d=\"M17.64 18.67 20 21\" /> </svg>", "alert-triangle": "<svg class=\"lucide lucide-alert-triangle\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" > <path d=\"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3\" /> <path d=\"M12 9v4\" /> <path d=\"M12 17h.01\" /> </svg>", "arrow-right-circle": "<svg class=\"lucide lucide-arrow-right-circle\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" > <circle cx=\"12\" cy=\"12\" r=\"10\" /> <path d=\"m12 16 4-4-4-4\" /> <path d=\"M8 12h8\" /> </svg>", "bell": "<svg class=\"lucide lucide-bell\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" > <path d=\"M10.268 21a2 2 0 0 0 3.464 0\" /> <path d=\"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326\" /> </svg>", "bell-ring": "<svg class=\"lucide lucide-bell-ring\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" > <path d=\"M10.268 21a2 2 0 0 0 3.464 0\" /> <path d=\"M22 8c0-2.3-.8-4.3-2-6\" /> <path d=\"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326\" /> <path d=\"M4 2C2.8 3.7 2 5.7 2 8\" /> </svg>", "check-circle": "<svg class=\"lucide lucide-check-circle\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" > <path d=\"M21.801 10A10 10 0 1 1 17 3.335\" /> <path d=\"m9 11 3 3L22 4\" /> </svg>", "clipboard-list": "<svg class=\"lucide lucide-clipboard-list\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" > <rect width=\"8\" height=\"4\" x=\"8\" y=\"2\" rx=\"1\" ry=\"1\" /> <path d=\"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2\" /> <path d=\"M12 11h4\" /> <path d=\"M12 16h4\" /> <path d=\"M8 11h.01\" /> <path d=\"M8 16h.01\" /> </svg>", "corner-up-left": "<svg class=\"lucide lucide-corner-up-left\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" > <path d=\"M20 20v-7a4 4 0 0 0-4-4H4\" /> <path d=\"M9 14 4 9l5-5\" /> </svg>", "download": "<svg class=\"lucide lucide-download\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" > <path d=\"M12 15V3\" /> <path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\" /> <path d=\"m7 10 5 5 5-5\" /> </svg>", "file-plus": "<svg class=\"lucide lucide-file-plus\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" > <path d=\"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z\" /> <path d=\"M14 2v5a1 1 0 0 0 1 1h5\" /> <path d=\"M9 15h6\" /> <path d=\"M12 18v-6\" /> </svg>", "flame": "<svg class=\"lucide lucide-flame\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" > <path d=\"M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4\" /> </svg>", "inbox": "<svg class=\"lucide lucide-inbox\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" > <polyline points=\"22 12 16 12 14 15 10 15 8 12 2 12\" /> <path d=\"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z\" /> </svg>", "key-round": "<svg class=\"lucide lucide-key-round\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" > <path d=\"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z\" /> <circle cx=\"16.5\" cy=\"7.5\" r=\".5\" fill=\"currentColor\" /> </svg>", "log-in": "<svg class=\"lucide lucide-log-in\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" > <path d=\"m10 17 5-5-5-5\" /> <path d=\"M15 12H3\" /> <path d=\"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4\" /> </svg>", "log-out": "<svg class=\"lucide lucide-log-out\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" > <path d=\"m16 17 5-5-5-5\" /> <path d=\"M21 12H9\" /> <path d=\"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4\" /> </svg>", "mail": "<svg class=\"lucide lucide-mail\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" > <path d=\"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7\" /> <rect x=\"2\" y=\"4\" width=\"20\" height=\"16\" rx=\"2\" /> </svg>", "message-square": "<svg class=\"lucide lucide-message-square\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" > <path d=\"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z\" /> </svg>", "messages-square": "<svg class=\"lucide lucide-messages-square\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" > <path d=\"M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z\" /> <path d=\"M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1\" /> </svg>", "package-check": "<svg class=\"lucide lucide-package-check\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" > <path d=\"M12 22V12\" /> <path d=\"m16 17 2 2 4-4\" /> <path d=\"M21 11.127V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.32-.753\" /> <path d=\"M3.29 7 12 12l8.71-5\" /> <path d=\"m7.5 4.27 8.997 5.148\" /> </svg>", "search": "<svg class=\"lucide lucide-search\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" > <path d=\"m21 21-4.34-4.34\" /> <circle cx=\"11\" cy=\"11\" r=\"8\" /> </svg>", "send": "<svg class=\"lucide lucide-send\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" > <path d=\"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z\" /> <path d=\"m21.854 2.147-10.94 10.939\" /> </svg>", "shield-check": "<svg class=\"lucide lucide-shield-check\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" > <path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\" /> <path d=\"m9 12 2 2 4-4\" /> </svg>", "truck": "<svg class=\"lucide lucide-truck\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" > <path d=\"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2\" /> <path d=\"M15 18H9\" /> <path d=\"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14\" /> <circle cx=\"17\" cy=\"18\" r=\"2\" /> <circle cx=\"7\" cy=\"18\" r=\"2\" /> </svg>", "user-check": "<svg class=\"lucide lucide-user-check\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" > <path d=\"m16 11 2 2 4-4\" /> <path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\" /> <circle cx=\"9\" cy=\"7\" r=\"4\" /> </svg>", "users": "<svg class=\"lucide lucide-users\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" > <path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\" /> <path d=\"M16 3.128a4 4 0 0 1 0 7.744\" /> <path d=\"M22 21v-2a4 4 0 0 0-3-3.87\" /> <circle cx=\"9\" cy=\"7\" r=\"4\" /> </svg>", "x-circle": "<svg class=\"lucide lucide-x-circle\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" > <circle cx=\"12\" cy=\"12\" r=\"10\" /> <path d=\"m15 9-6 6\" /> <path d=\"m9 9 6 6\" /> </svg>"};
function icons() {
    document.querySelectorAll('i[data-lucide]').forEach(el => {
        const svg = LUCIDE_ICONS[el.dataset.lucide];
        if (!svg) return;
        const wrap = document.createElement('span');
        wrap.innerHTML = svg;
        const node = wrap.firstElementChild;
        node.setAttribute('class', (el.getAttribute('class') || '') + ' shrink-0');
        node.setAttribute('aria-hidden', 'true');
        el.replaceWith(node);
    });
}
const isDept = () => !!DEPTS[state.role];
const isHodPersona = () => isDept() && state.persona === 'hod';
const findReq = id => state.requests.find(r => r.id === id);
const refId = r => 'SECE/PUR/' + r.id.replace('REQ-', '').replace('-', '/');
const isClosed = r => r.status === 'delivered' || r.status === 'rejected';
const daysLeft = r => Math.round((new Date(r.neededBy + 'T00:00:00') - new Date(TODAY + 'T00:00:00')) / DAY);
const isApproaching = r => !isClosed(r) && daysLeft(r) <= DEADLINE_WINDOW;

function daysText(r) {
    if (r.status === 'delivered') return 'Fulfilled';
    if (r.status === 'rejected') return 'Closed';
    const d = daysLeft(r);
    return d < 0 ? `${-d}d overdue` : d === 0 ? 'Due today' : `${d}d left`;
}
function nextId() {
    const year = new Date().getFullYear();
    const max = state.requests.reduce((m, r) => Math.max(m, parseInt(r.id.split('-')[2], 10) || 0), 0);
    return `REQ-${year}-${String(max + 1).padStart(3, '0')}`;
}
function me() {
    const u = currentUser();
    if (state.role === 'purchase') return { name: u?.name || PURCHASE_OFFICER, tag: 'Purchase Desk', side: 'purchase' };
    if (state.role === 'management') return { name: u?.name || 'Management Office', tag: u?.designation || 'Management', side: 'management' };
    const d = DEPTS[state.role];
    return state.persona === 'hod'
        ? { name: d.hod, tag: d.hod.startsWith('HOD') ? d.hod : `${d.short} HOD`, side: 'dept' }
        : { name: state.staffName || 'Requester', tag: `${d.short} ${u ? ROLE_LABEL[u.role] : 'Requester'}`, side: 'dept' };
}
function actorLabel() { const m = me(); return m.name === m.tag ? m.name : `${m.name} (${m.tag})`; }

function nextActor(r) {
    const s = DEPTS[r.dept].short;
    return {
        hod: `${s} HOD`, purchase: 'Purchase Desk', management: 'Management', sanctioned: 'Purchase Desk (PO)',
        po: `${s} Dept (receipt)`, returned: r.returnTo === 'hod' ? 'Requester' : `${s} Department`, delivered: 'Completed', rejected: 'Closed'
    }[r.status];
}
function isMyAction(r) {
    const s = r.status;
    if (state.role === 'purchase') return s === 'purchase' || s === 'sanctioned';
    if (state.role === 'management') return s === 'management';
    if (r.dept !== state.role) return false;
    if (s === 'po') return canReceive(r);
    if (state.persona === 'hod') return s === 'hod' || (s === 'returned' && r.returnTo !== 'hod');
    return s === 'returned' && r.returnTo === 'hod' && r.requester.name === state.staffName;
}
function visibleRequests() { return isDept() ? state.requests.filter(r => r.dept === state.role) : state.requests; }

function addLog(r, step, note) { r.log.push({ time: stamp(), step, by: actorLabel(), note: note || '' }); }
function notify(to, type, title, msg, reqId) {
    state.notifications.unshift({ id: 'N' + Date.now() + Math.random().toString(36).slice(2, 6), to, type, title, msg, reqId, time: stamp(), read: false });
}
function forMe(n) {
    if (n.to.includes(state.role)) return true;
    if (!isDept()) return false;
    return n.to.includes('dept:' + state.role) || (state.persona === 'hod' && n.to.includes('hod:' + state.role));
}

/* =========================================================
   TOASTS & MODALS
   ========================================================= */
function toast(title, msg, theme = 'info') {
    const themes = {
        info: ['bg-[#003366] text-white border-[#FFC107]', 'text-blue-100'],
        success: ['bg-emerald-800 text-white border-emerald-300', 'text-emerald-100'],
        warn: ['bg-amber-900 text-white border-amber-300', 'text-amber-100'],
        danger: ['bg-white text-gray-900 border-red-400', 'text-gray-600']
    };
    const [cls, sub] = themes[theme] || themes.info;
    const el = document.createElement('div');
    el.className = `toast-enter pointer-events-auto rounded-xl border-l-4 shadow-xl p-3.5 flex gap-3 items-start ${cls}`;
    el.innerHTML = `<i data-lucide="bell-ring" class="w-4 h-4 mt-0.5 shrink-0"></i>
        <div class="flex-1 min-w-0"><p class="text-xs font-bold">${esc(title)}</p>${msg ? `<p class="text-xs ${sub} mt-0.5 leading-snug">${esc(msg)}</p>` : ''}</div>
        <button class="opacity-70 hover:opacity-100 text-lg leading-none">&times;</button>`;
    el.querySelector('button').onclick = () => el.remove();
    $('toasts').appendChild(el); icons();
    while ($('toasts').children.length > 4) $('toasts').firstElementChild.remove();
    setTimeout(() => el.remove(), 6000);
}
function openModal(id) { $(id).classList.remove('hidden'); $(id).classList.add('flex'); }
function closeModal(id) { $(id).classList.add('hidden'); $(id).classList.remove('flex'); if (id === 'detail-modal') detailId = null; }

/* =========================================================
   ROLE / PERSONA / TABS
   ========================================================= */
function setRole(value, silent) {
    state.role = value;
    const badge = $('current-role-badge'), user = $('current-user-name');
    let bannerBadge, bannerText;
    if (value === 'purchase') {
        badge.textContent = 'Central Purchase'; user.textContent = `${PURCHASE_OFFICER} (Purchase Officer)`;
        $('view-title').textContent = 'All Department Requisitions';
        $('view-subtitle').textContent = 'Verify quotations, forward for sanction, issue purchase orders and track deliveries.';
        bannerBadge = 'Purchase Desk View';
        bannerText = 'Compare vendor quotes, clarify specs in each request chat, issue POs once sanctioned.';
    } else if (value === 'management') {
        badge.textContent = 'Management'; user.textContent = MANAGEMENT_SIGNATORY;
        $('view-title').textContent = 'Requisitions Awaiting Sanction';
        $('view-subtitle').textContent = 'Review vendor comparisons and grant or withhold final sanction.';
        bannerBadge = 'Management Sanction View';
        bannerText = 'Grant final budget sanction on HOD-endorsed, quote-verified requests.';
    } else {
        const d = DEPTS[value];
        badge.textContent = 'Department: ' + d.short;
        if (state.persona === 'hod') {
            user.textContent = d.hod.startsWith('HOD') ? d.hod : `${d.hod} (HOD)`;
            bannerBadge = `${d.short} HOD View`;
            bannerText = 'Approve requests from your faculty, lab staff and students. Your own requisitions go straight to Central Purchase.';
        } else {
            user.textContent = `${state.staffName || 'Requester'} (${d.short})`;
            bannerBadge = `${d.short} Requester View`;
            bannerText = 'Raise purchase requests, track each approval stage, and answer spec questions from the Purchase Desk.';
        }
        $('view-title').textContent = `${d.short} Department Requisitions`;
        $('view-subtitle').textContent = 'Track status, quotations, deadlines and two-way correspondence in real-time.';
    }
    $('banner-badge').textContent = bannerBadge;
    $('banner-text').textContent = bannerText;
    const cu = currentUser();
    if (cu) {
        user.textContent = `${cu.name} (${ROLE_LABEL[cu.role]})`;
        user.title = cu.email;
        $('user-switcher').value = cu.id;
        if (isDept() && state.persona === 'staff') $('banner-badge').textContent = `${DEPTS[value].short} ${ROLE_LABEL[cu.role]} View`;
    }
    document.querySelectorAll('.raise-btn').forEach(b => b.classList.toggle('hidden', !isDept()));
    $('status-filter').value = isDept() ? 'all' : 'mine';
    if (!isDept()) $('dept-filter').value = 'all';
    save();
    if (!isDept() && activeTab === 'new-request') switchTab('dashboard'); else switchTab(activeTab);
    renderAll();
    if (detailId) renderDetail();

    if (!silent) {
        const unread = state.notifications.filter(n => !n.read && forMe(n));
        if (unread.length) toast(unread[0].title, unread[0].msg + (unread.length > 1 ? ` (+${unread.length - 1} more in Alerts)` : ''), unread[0].type === 'reminder' ? 'warn' : 'info');
    }
}

function switchTab(tab) {
    activeTab = tab;
    ['dashboard', 'new-request', 'analytics', 'vendors', 'signoff-records'].forEach(t => {
        $('tab-' + t).classList.toggle('hidden', t !== tab);
        const on = t === tab, nav = $('nav-' + t);
        nav.className = `w-full text-left px-4 py-2.5 rounded-lg text-sm ${t === 'dashboard' ? 'flex items-center justify-between ' : ''}${on ? 'bg-blue-50 text-[#003366] font-semibold' : 'text-gray-600 hover:bg-gray-100 font-medium'}`;
    });
    $('form-blocked').classList.toggle('hidden', isDept());
    $('req-form').classList.toggle('hidden', !isDept());
    if (tab === 'new-request') prepareForm();
}
function setStatusFilter(v) { switchTab('dashboard'); $('status-filter').value = v; renderList(); }
function setDeptFilter(v) {
    if (isDept()) { if (v !== 'all' && v !== state.role) toast('Department view only', `You are signed in to ${DEPTS[state.role].short}. Sign in with another account to see other departments.`, 'info'); return; }
    $('dept-filter').value = v; renderList(); renderDeptList();
}

/* =========================================================
   RENDERING
   ========================================================= */
function renderAll() { renderKPIs(); renderDeadlineStrip(); renderList(); renderDeptList(); renderRecords(); renderNotifications(); renderAnalytics(); renderVendors(); }

function renderKPIs() {
    const list = visibleRequests();
    const mine = list.filter(isMyAction).length;
    const urgent = list.filter(isApproaching).length;
    const delivered = list.filter(r => r.status === 'delivered').length;
    const open = list.filter(r => !isClosed(r)).length;
    $('nav-count').textContent = mine;
    const card = (label, value, sub, icon, tone, onclick, highlight) => `
        <div ${onclick ? `onclick="${onclick}"` : ''} class="${onclick ? 'cursor-pointer hover:shadow-md' : ''} bg-white p-4 rounded-xl border ${highlight ? 'border-[#FFC107] ring-2 ring-amber-100' : 'border-gray-200'} shadow-sm flex items-center justify-between transition">
            <div><p class="text-xs font-medium text-gray-500">${label}</p><p class="text-2xl font-bold ${tone} mt-1">${value}</p><p class="text-[11px] text-gray-400 mt-0.5">${sub}</p></div>
            <div class="w-11 h-11 rounded-xl bg-blue-50 text-[#003366] flex items-center justify-center"><i data-lucide="${icon}" class="w-5 h-5"></i></div>
        </div>`;
    $('kpis').innerHTML =
        card('Total Requisitions', list.length, `${open} open`, 'clipboard-list', 'text-[#003366]') +
        card('Pending My Action', mine, 'Click to filter your queue', 'user-check', 'text-[#003366]', "setStatusFilter('mine')", mine > 0) +
        card('Approaching Deadlines', urgent, `Due within ${DEADLINE_WINDOW} days`, 'alarm-clock', 'text-amber-600', "setStatusFilter('urgent')", false) +
        card('Delivered & Verified', delivered, 'Received by departments', 'package-check', 'text-emerald-600');
    icons();
}

function renderDeadlineStrip() {
    const urgent = visibleRequests().filter(isApproaching).sort((a, b) => daysLeft(a) - daysLeft(b));
    $('deadline-strip').classList.toggle('hidden', !urgent.length);
    if (!urgent.length) return;
    const r = urgent[0];
    $('deadline-text').innerHTML = `<strong>${urgent.length} request(s)</strong> are due within ${DEADLINE_WINDOW} days — most pressing: <strong>${r.id} (${esc(r.title)})</strong>, needed by <strong>${fmtDate(r.neededBy)}</strong> (${daysText(r)}), awaiting <strong>${esc(nextActor(r))}</strong>.`;
}

function renderDeptList() {
    const active = isDept() ? state.role : $('dept-filter').value;
    $('dept-clear').classList.toggle('hidden', isDept() || active === 'all');
    $('dept-list').innerHTML = Object.entries(DEPTS).map(([k, d]) => {
        const n = state.requests.filter(r => r.dept === k && !isClosed(r)).length;
        const on = k === active;
        return `<button onclick="setDeptFilter('${k}')" class="w-full text-left px-3 py-1.5 rounded-lg text-xs flex justify-between items-center transition ${on ? 'bg-[#003366] text-white font-semibold' : 'text-gray-600 hover:bg-gray-100'}">
            <span>${d.short}</span><span class="${on ? 'bg-[#FFC107] text-[#003366]' : 'bg-gray-100 text-gray-500'} px-1.5 rounded text-[10px] font-bold" title="Open requests">${n}</span></button>`;
    }).join('');
    // Keep the toolbar dept dropdown in sync
    const sel = $('dept-filter');
    sel.classList.toggle('hidden', isDept());
    if (!sel.options.length) sel.innerHTML = `<option value="all">All departments</option>` + Object.entries(DEPTS).map(([k, d]) => `<option value="${k}">${d.short}</option>`).join('');
}

function ensureStatusOptions() {
    const sel = $('status-filter');
    if (sel.options.length > 3) return;
    Object.entries(STATUS).forEach(([k, s]) => sel.insertAdjacentHTML('beforeend', `<option value="${k}">${s.label}</option>`));
}

function renderList() {
    ensureStatusOptions();
    const q = $('search').value.trim().toLowerCase();
    const sf = $('status-filter').value, pf = $('priority-filter').value, df = isDept() ? 'all' : $('dept-filter').value;
    const base = visibleRequests();
    const list = base.filter(r => {
        if (df !== 'all' && r.dept !== df) return false;
        if (pf !== 'all' && r.priority !== pf) return false;
        if (sf === 'mine' && !isMyAction(r)) return false;
        if (sf === 'urgent' && !isApproaching(r)) return false;
        if (STATUS[sf] && r.status !== sf) return false;
        if (q && ![r.id, r.title, r.category, r.requester.name, DEPTS[r.dept].short, DEPTS[r.dept].name].some(v => String(v).toLowerCase().includes(q))) return false;
        return true;
    }).sort((a, b) => (isMyAction(b) - isMyAction(a)) || (isApproaching(b) - isApproaching(a)) || b.id.localeCompare(a.id));

    $('count-approved').textContent = 'Sanctioned / Delivered: ' + base.filter(r => ['sanctioned', 'po', 'delivered'].includes(r.status)).length;
    $('count-pending').textContent = 'Pending Review: ' + base.filter(r => ['hod', 'purchase', 'management'].includes(r.status)).length;
    $('count-returned').textContent = 'Returned / Rejected: ' + base.filter(r => ['returned', 'rejected'].includes(r.status)).length;
    $('list-count').textContent = `(${list.length} shown)`;
    lastFiltered = list;

    if (!list.length) {
        $('request-list').innerHTML = `<div class="p-10 text-center text-xs text-gray-500">
            <i data-lucide="inbox" class="w-8 h-8 mx-auto text-gray-300 mb-2"></i>No requisitions match this view.
            <div><button onclick="resetFilters()" class="mt-3 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold">Reset filters</button></div></div>`;
        icons(); return;
    }
    $('request-list').innerHTML = list.map(r => {
        const s = STATUS[r.status], d = DEPTS[r.dept], mine = isMyAction(r), urgent = isApproaching(r);
        const policyFlag = r.total > POLICY_LIMIT && r.quotes.length < MIN_QUOTES && r.status === 'purchase'
            ? `<span class="bg-orange-50 border border-orange-200 text-orange-800 text-xs px-2 py-0.5 rounded-full">Needs ${MIN_QUOTES - r.quotes.length} more quote(s)</span>` : '';
        return `
        <div onclick="openDetail('${r.id}')" class="cursor-pointer p-5 hover:bg-blue-50/40 transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${mine ? 'border-l-4 border-[#FFC107] bg-amber-50/30' : 'border-l-4 border-transparent'}">
            <div class="space-y-1 min-w-0">
                <div class="flex flex-wrap items-center gap-2">
                    <span class="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">${r.id}</span>
                    ${r.priority !== 'Normal' ? `<span class="${PRIORITY_CLS[r.priority]} text-xs px-2 py-0.5 rounded-full uppercase">${r.priority}</span>` : ''}
                    <span class="${s.cls} text-xs px-2 py-0.5 rounded-full font-medium">${s.label}</span>
                    ${urgent ? `<span class="inline-flex items-center gap-1 bg-amber-100 border border-amber-300 text-amber-800 text-xs px-2 py-0.5 rounded-full font-bold"><i data-lucide="flame" class="w-3 h-3"></i>${daysText(r)}</span>` : ''}
                    ${policyFlag}
                    ${!isClosed(r) && !COMMITTED.includes(r.status) && budgetImpact(r).over ? `<span class="bg-red-50 border border-red-300 text-red-700 text-xs px-2 py-0.5 rounded-full font-semibold">⚠ Over ${DEPTS[r.dept].short} budget</span>` : ''}
                    ${mine ? `<span class="w-2 h-2 rounded-full bg-[#FFC107] animate-pulse" title="Awaiting your action"></span>` : ''}
                </div>
                <h4 class="font-bold text-gray-800 text-base">${esc(r.title)}</h4>
                <p class="text-xs text-gray-500">${d.short} • ${esc(r.requester.name)} (${esc(r.requester.role)}) • ${esc(r.category)} • Qty ${r.qty} • ${['sanctioned', 'po', 'delivered'].includes(r.status) ? 'Total' : 'Est.'} ${inr(r.total)} • Needed by ${fmtDate(r.neededBy)}${urgent ? '' : ` <span class="text-gray-400">(${daysText(r)})</span>`}</p>
                ${r.priority === 'Urgent' && r.urgentNote && !isClosed(r) ? `<p class="text-xs text-gray-600 italic bg-amber-50 p-2 rounded border border-amber-200 mt-1"><strong>Justification:</strong> ${esc(r.urgentNote)}</p>` : ''}
                ${r.po && r.status === 'po' ? `<p class="text-xs text-violet-700 mt-1"><i data-lucide="truck" class="w-3.5 h-3.5 inline -mt-0.5"></i> ${esc(r.po.number)} • ${esc(r.po.tracking)} • ETA ${fmtDate(r.po.expectedDate)}</p>` : ''}
            </div>
            <div class="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end shrink-0">
                <span class="text-[11px] text-gray-500 flex items-center gap-1"><i data-lucide="arrow-right-circle" class="w-3.5 h-3.5"></i>${esc(nextActor(r))}</span>
                <span class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-xs"><i data-lucide="message-square" class="w-3.5 h-3.5 text-[#003366]"></i>${r.chat.length}</span>
                <button class="${mine ? 'bg-[#003366] text-white' : 'bg-white border border-gray-300 text-gray-700'} text-xs font-semibold px-3 py-2 rounded-lg">${mine ? 'Review & Act' : 'Open'}</button>
            </div>
        </div>`;
    }).join('');
    icons();
}
function resetFilters() { $('search').value = ''; $('status-filter').value = 'all'; $('priority-filter').value = 'all'; $('dept-filter').value = 'all'; renderList(); renderDeptList(); }

function renderRecords() {
    const showLog = state.role === 'management' || state.role === 'purchase';
    $('access-log-wrap').classList.toggle('hidden', !showLog);
    if (showLog) $('access-log').innerHTML = (state.access || []).slice(0, 25).map(a => `<tr><td class="py-1.5 px-3 text-gray-500 whitespace-nowrap">${esc(a.time)}</td><td class="font-semibold">${esc(a.action)}</td><td>${esc(a.name)}</td><td>${esc(a.role)}</td><td class="font-mono text-gray-500">${esc(a.email)}</td></tr>`).join('')
        || '<tr><td colspan="5" class="py-3 px-3 text-gray-400">No sign-ins recorded yet.</td></tr>';
    const list = visibleRequests().filter(r => ['sanctioned', 'po', 'delivered'].includes(r.status)).sort((a, b) => (b.sanctionDate || '').localeCompare(a.sanctionDate || ''));
    $('sanction-total').textContent = inr(list.reduce((s, r) => s + r.total, 0));
    $('records-list').innerHTML = list.length ? list.map(r => `
        <div class="p-4 border border-gray-200 rounded-lg flex flex-wrap gap-3 justify-between items-center hover:bg-gray-50">
            <div>
                <div class="flex flex-wrap items-center gap-2">
                    <span class="text-xs font-mono font-bold text-blue-600">SANCTION-${r.id.replace('REQ-', '')}</span>
                    <span class="${STATUS[r.status].cls} text-[10px] px-2 py-0.5 rounded-full font-semibold">${STATUS[r.status].label}</span>
                    ${r.po ? `<span class="text-[10px] font-mono bg-gray-100 px-1.5 rounded">${esc(r.po.number)}</span>` : ''}
                </div>
                <h4 class="font-bold text-sm text-gray-800 mt-0.5">${esc(r.title)} - ${DEPTS[r.dept].short} Dept</h4>
                <p class="text-xs text-gray-500">Approved by ${MANAGEMENT_SIGNATORY} | Date: ${fmtDate(r.sanctionDate)} | ${inr(r.total)} | ${esc(r.selectedVendor || '')}</p>
            </div>
            <div class="flex gap-2">
                ${r.po ? `<button onclick="openPODoc('${r.id}')" class="px-3 py-1.5 border border-[#003366] text-[#003366] text-xs font-bold rounded-lg">Print PO</button>` : ''}
                <button onclick="openSignOffModal('${r.id}')" class="px-3 py-1.5 bg-[#003366] text-white text-xs font-bold rounded-lg">Print Sign-Off Form</button>
            </div>
        </div>`).join('')
        : `<p class="text-xs text-gray-500 p-6 text-center border border-dashed border-gray-300 rounded-lg">No sanctioned records yet.</p>`;
}

/* =========================================================
   NOTIFICATIONS
   ========================================================= */
const NOTIF_META = {
    new: ['file-plus', 'bg-blue-100 text-blue-700'], hod_approved: ['check-circle', 'bg-indigo-100 text-indigo-700'],
    forwarded: ['send', 'bg-blue-100 text-blue-700'], sanctioned: ['shield-check', 'bg-emerald-100 text-emerald-700'],
    po: ['truck', 'bg-violet-100 text-violet-700'], delivered: ['package-check', 'bg-emerald-100 text-emerald-700'],
    returned: ['corner-up-left', 'bg-red-100 text-red-700'], rejected: ['x-circle', 'bg-red-100 text-red-700'],
    reminder: ['alarm-clock', 'bg-amber-100 text-amber-700'], message: ['message-square', 'bg-gray-100 text-gray-700'],
    issue: ['alert-triangle', 'bg-orange-100 text-orange-700']
};
function targetLabel(t) {
    if (t === 'purchase') return 'Purchase'; if (t === 'management') return 'Management';
    const [kind, d] = t.split(':'); return `${DEPTS[d]?.short || d} ${kind === 'hod' ? 'HOD' : 'Dept'}`;
}
function toggleNotifications() { $('notif-drawer').classList.toggle('hidden'); renderNotifications(); }
function markAllRead() { state.notifications.forEach(n => { if (forMe(n) || $('notif-all').checked) n.read = true; }); save(); renderNotifications(); }
function renderNotifications() {
    const unread = state.notifications.filter(n => !n.read && forMe(n)).length;
    $('notif-badge').textContent = unread > 99 ? '99+' : unread;
    $('notif-badge').classList.toggle('hidden', !unread);
    $('notif-for').textContent = actorLabel();
    const list = $('notif-all').checked ? state.notifications : state.notifications.filter(forMe);
    $('notif-list').innerHTML = list.length ? list.map(n => {
        const [icon, cls] = NOTIF_META[n.type] || ['bell', 'bg-gray-100 text-gray-700'];
        return `<div onclick="openFromNotification('${n.id}')" class="cursor-pointer p-3.5 rounded-xl border ${n.read ? 'bg-white border-gray-200' : 'bg-blue-50/60 border-blue-200'} hover:border-[#003366] transition">
            <div class="flex gap-3">
                <div class="w-8 h-8 rounded-lg ${cls} flex items-center justify-center shrink-0"><i data-lucide="${icon}" class="w-4 h-4"></i></div>
                <div class="flex-1 min-w-0">
                    <div class="flex justify-between gap-2"><p class="text-xs font-bold text-gray-900">${esc(n.title)}</p><span class="text-[10px] text-gray-400 whitespace-nowrap">${esc(n.time)}</span></div>
                    <p class="text-xs text-gray-600 mt-1 leading-relaxed">${esc(n.msg)}</p>
                    <div class="mt-2 flex flex-wrap gap-1">${n.to.map(t => `<span class="px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 text-[10px] font-medium uppercase">${esc(targetLabel(t))}</span>`).join('')}</div>
                </div>
            </div></div>`;
    }).join('') : `<p class="text-xs text-gray-500 text-center py-8">No notifications for this role yet.</p>`;
    icons();
}
function openFromNotification(id) {
    const n = state.notifications.find(x => x.id === id);
    if (n) { n.read = true; save(); }
    toggleNotifications();
    if (n && n.reqId && findReq(n.reqId)) openDetail(n.reqId);
}
function runDeadlineCheck() {
    const due = state.requests.filter(isApproaching).sort((a, b) => daysLeft(a) - daysLeft(b));
    if (!due.length) { toast('All deadlines on track', 'No open requests are due within ' + DEADLINE_WINDOW + ' days.', 'success'); return; }
    due.forEach(r => {
        const target = { hod: ['hod:' + r.dept], purchase: ['purchase'], management: ['management'], sanctioned: ['purchase'], po: ['purchase', 'dept:' + r.dept], returned: ['dept:' + r.dept] }[r.status] || ['purchase'];
        notify([...new Set([...target, 'dept:' + r.dept])], 'reminder', `Deadline reminder: ${r.id} (${daysText(r)})`,
            `"${r.title}" is needed by ${fmtDate(r.neededBy)} and is awaiting ${nextActor(r)}.`, r.id);
    });
    save(); renderNotifications();
    toast('Deadline reminders sent', `${due.length} request(s) due within ${DEADLINE_WINDOW} days — reminders sent to the next approver for each.`, 'warn');
}

/* =========================================================
   NEW REQUISITION
   ========================================================= */
function prepareForm() {
    if (!$('f-category').options.length) $('f-category').innerHTML = CATEGORIES.map(c => `<option>${c}</option>`).join('');
    const staff = isDept() && state.persona === 'staff';
    $('requester-row').classList.toggle('hidden', !staff);
    $('requester-row').classList.toggle('grid', staff);
    if (staff) {
        $('f-req-name').value = state.staffName || '';
        if (state.staffRole) $('f-req-role').value = state.staffRole;
    }
    const locked = staff && !!currentUser();
    $('f-req-name').readOnly = locked; $('f-req-role').disabled = locked;
    $('f-req-name').classList.toggle('bg-gray-100', locked);
    $('f-req-name').required = staff;
    $('f-date').min = TODAY;
    if (!$('f-date').value) $('f-date').value = addDays(14);
    if (isDept()) {
        const d = DEPTS[state.role];
        $('form-route').textContent = staff
            ? `Your request will be routed to the ${d.short} HOD (${d.hod}) for approval, then to the Central Purchase Department.`
            : `As HOD, your requisition is endorsed on submission and goes straight to the Central Purchase Department.`;
        $('submit-btn').textContent = staff ? 'Submit to HOD' : 'Submit to Central Purchase';
    }
}
function toggleUrgentField() {
    const on = $('f-priority').value === 'Urgent';
    $('urgent-justification-box').classList.toggle('hidden', !on);
    $('f-urgent').required = on;
}
function updateEstimate() {
    const qty = +$('f-qty').value, cost = +$('f-cost').value, box = $('estimate-box');
    if (!qty || !cost) { box.classList.add('hidden'); return; }
    const total = qty * cost, over = total > POLICY_LIMIT;
    box.className = `text-xs p-3 rounded-lg border ${over ? 'bg-blue-50 border-blue-200 text-blue-900' : 'bg-emerald-50 border-emerald-200 text-emerald-800'}`;
    box.innerHTML = `<strong>Estimated total: ${inr(total)}</strong> — ${over
        ? `above the ${inr(POLICY_LIMIT)} threshold: at least ${MIN_QUOTES} vendor quotations, Purchase clearance and Management sanction are required.`
        : `within the ${inr(POLICY_LIMIT)} threshold.`}`;
    if (isDept()) {
        const u = budgetUse(state.role), left = u.available - total;
        box.innerHTML += `<br><span class="${left < 0 ? 'text-red-700 font-bold' : ''}">${DEPTS[state.role].short} budget (${FY_LABEL}): ${inr(u.available)} available before this request → ${left < 0 ? `⚠ ${inr(-left)} over budget; Management will need to approve an exception.` : `${inr(left)} left after it.`}</span>`;
    }
}
function handleFormSubmit(e) {
    e.preventDefault();
    if (!isDept()) return;
    const d = DEPTS[state.role], hod = state.persona === 'hod';
    const qty = +$('f-qty').value, unitCost = +$('f-cost').value;
    const files = Array.from($('f-file').files).map(f => f.name);
    let requester;
    if (hod) requester = { name: d.hod, role: 'HOD', isHod: true };
    else {
        state.staffName = $('f-req-name').value.trim();
        requester = { name: state.staffName, role: state.staffRole || $('f-req-role').value, isHod: false };
    }
    const r = {
        id: nextId(), dept: state.role, title: $('f-title').value.trim(), category: $('f-category').value,
        qty, unitCost, total: qty * unitCost, priority: $('f-priority').value,
        urgentNote: $('f-urgent').value.trim(), spec: $('f-spec').value.trim(), neededBy: $('f-date').value,
        requester, status: hod ? 'purchase' : 'hod', created: TODAY,
        quotes: [], selectedVendor: '', attachments: files,
        approvals: hod ? { hod: { by: d.hod, date: TODAY } } : {},
        log: [], chat: []
    };
    r.log.push({ time: stamp(), step: hod ? 'Raised & endorsed by HOD' : 'Request submitted', by: `${requester.name} (${hod ? d.short + ' HOD' : requester.role})`,
        note: hod ? 'Routed directly to Central Purchase.' : `Routed to ${d.short} HOD for approval.` + (files.length ? ` Attached: ${files.join(', ')}.` : '') });
    state.requests.push(r);
    if (hod) notify(['purchase'], 'new', `New requisition from ${d.short}: ${r.id}`, `${d.hod} raised ${qty}× "${r.title}" (${inr(r.total)}), needed by ${fmtDate(r.neededBy)}.`, r.id);
    else notify(['hod:' + r.dept], 'new', `New request awaiting your approval: ${r.id}`, `${requester.name} (${requester.role}) requested ${qty}× "${r.title}", needed by ${fmtDate(r.neededBy)}.`, r.id);
    save();
    e.target.reset(); toggleUrgentField(); updateEstimate(); $('f-date').value = '';
    switchTab('dashboard'); renderAll();
    toast(`${r.id} submitted`, hod ? 'Sent to Central Purchase for quotation check.' : `Routed to ${d.short} HOD for approval.`, 'success');
}

/* =========================================================
   WORKFLOW ACTIONS
   ========================================================= */
function afterAction(id) { save(); renderAll(); if (detailId === id) renderDetail(); }

function approveHod(id) {
    const r = findReq(id), d = DEPTS[r.dept];
    r.status = 'purchase';
    r.approvals.hod = { by: d.hod, date: TODAY };
    addLog(r, 'HOD approved', 'Forwarded to Central Purchase for quotation check.');
    notify(['purchase', 'dept:' + r.dept], 'hod_approved', `HOD approved: ${r.id}`, `${d.short} HOD approved ${r.qty}× "${r.title}". Purchase Desk alerted for quotation check.`, r.id);
    afterAction(id);
    toast('Approved — Purchase Desk alerted', `${r.id} forwarded to Central Purchase.`, 'success');
}
function forwardToManagement(id) {
    const r = findReq(id);
    if (r.total > POLICY_LIMIT && r.quotes.length < MIN_QUOTES) { toast('Policy check failed', `Add at least ${MIN_QUOTES} vendor quotations for purchases above ${inr(POLICY_LIMIT)}.`, 'danger'); return; }
    if (r.quotes.length && !r.selectedVendor) { toast('Select a vendor', 'Pick the vendor in the quotation table first.', 'danger'); return; }
    const sel = r.quotes.find(q => q.vendor === r.selectedVendor);
    if (sel) r.total = sel.amount;
    r.status = 'management';
    r.approvals.purchase = { by: PURCHASE_OFFICER, date: TODAY };
    addLog(r, 'Quotations verified', `${r.quotes.length} quotation(s) compared${sel ? `; ${sel.vendor} selected at ${inr(sel.amount)}` : ''}. Forwarded to Management.`);
    notify(['management', 'dept:' + r.dept], 'forwarded', `${r.id} forwarded for sanction`, `Purchase Desk verified quotations for "${r.title}" (${DEPTS[r.dept].short})${sel ? ` — ${sel.vendor} at ${inr(sel.amount)}` : ''}.`, r.id);
    afterAction(id);
    toast('Forwarded to Management', `${r.id} is awaiting final sanction.`, 'success');
}
function sanction(id) {
    const r = findReq(id), b = budgetImpact(r);
    if (b.over && !($('over-ok') && $('over-ok').checked)) { toast('Budget exception needed', `This takes ${DEPTS[r.dept].short} over budget by ${inr(b.overBy)}. Tick the exception box to sanction anyway.`, 'danger'); return; }
    r.status = 'sanctioned'; r.sanctionDate = TODAY;
    r.approvals.management = { by: me().name, date: TODAY };
    if (b.over) r.budgetException = { overBy: b.overBy, date: TODAY };
    addLog(r, 'Management sanction granted', (b.over ? `Budget exception approved: ${DEPTS[r.dept].short} exceeds ${FY_LABEL} budget by ${inr(b.overBy)}. ` : '') + 'Purchase Desk may issue the Purchase Order.');
    notify(['purchase', 'dept:' + r.dept], 'sanctioned', `Sanction granted: ${r.id}`, `Management sanctioned "${r.title}" (${DEPTS[r.dept].short}) for ${inr(r.total)}. Purchase Desk may issue the PO.`, r.id);
    afterAction(id);
    toast('Sanction granted', `Sign-off record generated for ${r.id}.`, 'success');
    openSignOffModal(id);
}
function issuePO(id) {
    const r = findReq(id);
    const expected = $('po-date').value || addDays(7);
    const seq = 90 + state.requests.filter(x => x.po).length;
    r.po = { number: `SECE/PO/${new Date().getFullYear()}/${String(seq).padStart(3, '0')}`, vendor: r.selectedVendor || 'Approved vendor', issuedOn: TODAY, expectedDate: expected, tracking: 'PO sent to vendor' };
    r.status = 'po';
    addLog(r, 'Purchase Order issued', `${r.po.number} issued to ${r.po.vendor}. Expected delivery ${fmtDate(expected)}.`);
    notify(['dept:' + r.dept, 'management'], 'po', `PO issued: ${r.id}`, `${r.po.number} issued to ${r.po.vendor} for ${r.qty}× "${r.title}". Expected delivery ${fmtDate(expected)}.`, r.id);
    afterAction(id);
    toast('Purchase Order issued', `${r.po.number} — ${DEPTS[r.dept].short} Dept and Management notified.`, 'success');
}
function updateTracking(id) {
    const r = findReq(id), t = $('po-tracking').value.trim(), date = $('po-eta').value;
    if (!t && !date) return;
    if (t) r.po.tracking = t;
    if (date) r.po.expectedDate = date;
    addLog(r, 'Delivery tracking updated', `${r.po.tracking}. ETA ${fmtDate(r.po.expectedDate)}.`);
    notify(['dept:' + r.dept], 'po', `Delivery update: ${r.id}`, `${r.po.tracking} — ETA ${fmtDate(r.po.expectedDate)}.`, r.id);
    afterAction(id);
    toast('Tracking updated', `${DEPTS[r.dept].short} Dept notified.`, 'info');
}
function confirmDelivery(id) {
    const r = findReq(id), cond = $('dl-cond').value, note = $('dl-note').value.trim();
    if (cond !== 'Received in good condition') {
        r.po.tracking = `Issue reported: ${cond}`;
        addLog(r, 'Delivery issue reported', `${cond}.${note ? ' ' + note : ''}`);
        notify(['purchase'], 'issue', `Delivery issue on ${r.id}`, `${DEPTS[r.dept].short} reported: ${cond}.${note ? ' ' + note : ''}`, r.id);
        afterAction(id);
        toast('Issue reported to Purchase Desk', 'The request stays open until the full order is received.', 'warn');
        return;
    }
    r.status = 'delivered';
    r.po.tracking = 'Delivered & verified';
    const score = +$('dl-rating').value, onTime = TODAY <= r.po.expectedDate;
    r.delivery = { by: me().name, date: TODAY, condition: cond, note, rating: score, onTime };
    const v = findVendor(r.po.vendor);
    if (v) v.ratings.push({ reqId: r.id, score, onTime, date: TODAY });
    addLog(r, 'Delivery confirmed', `${cond}. Vendor rated ${score}/5, ${onTime ? 'delivered on time' : 'delivered late'}.${note ? ' ' + note : ''}`);
    notify(['purchase', 'management'], 'delivered', `Delivered: ${r.id}`, `${DEPTS[r.dept].short} confirmed receipt of ${r.qty}× "${r.title}".`, r.id);
    afterAction(id);
    toast('Delivery confirmed', 'Purchase Desk and Management notified. Request closed.', 'success');
}
function resubmit(id) {
    const r = findReq(id);
    r.status = r.returnTo || 'purchase';
    addLog(r, 'Resubmitted', `Clarifications addressed. Back with ${nextActor(r)}.`);
    const to = r.status === 'hod' ? ['hod:' + r.dept] : r.status === 'management' ? ['management'] : ['purchase'];
    notify(to, 'new', `Resubmitted: ${r.id}`, `"${r.title}" was resubmitted after clarification.`, r.id);
    afterAction(id);
    toast(`${id} resubmitted`, `Sent back to ${nextActor(r)}.`, 'success');
}
function askNote(id, kind) {
    pendingNote = { id, kind };
    $('note-title').textContent = kind === 'return' ? `Return ${id} for clarification` : `Reject ${id}`;
    $('note-confirm').textContent = kind === 'return' ? 'Return' : 'Reject Requisition';
    $('note-text').value = '';
    openModal('note-modal'); $('note-text').focus();
}
function confirmNote(e) {
    e.preventDefault();
    const { id, kind } = pendingNote, r = findReq(id), text = $('note-text').value.trim(), stage = r.status;
    if (kind === 'return') { r.returnTo = stage; r.status = 'returned'; }
    else {
        r.status = 'rejected';
        const key = stage === 'hod' ? 'hod' : stage === 'management' ? 'management' : 'purchase';
        r.approvals[key] = { by: me().name, date: TODAY, rejected: true };
    }
    addLog(r, kind === 'return' ? 'Returned for clarification' : 'Rejected', text);
    r.chat.push({ from: me().name, tag: me().tag, side: me().side, text: (kind === 'return' ? 'Returned for clarification: ' : 'Rejected: ') + text, time: stamp() });
    notify(['dept:' + r.dept], kind === 'return' ? 'returned' : 'rejected', `${kind === 'return' ? 'Returned' : 'Rejected'}: ${r.id}`, `${actorLabel()}: ${text}`, r.id);
    closeModal('note-modal');
    afterAction(id);
    toast(kind === 'return' ? `${id} returned` : `${id} rejected`, 'The department has been notified.', 'danger');
}

/* =========================================================
   DETAIL MODAL
   ========================================================= */
function openDetail(id) { detailId = id; renderDetail(); openModal('detail-modal'); }

function renderDetail() {
    const r = findReq(detailId); if (!r) return;
    const d = DEPTS[r.dept], s = STATUS[r.status];

    $('d-badges').innerHTML = `
        <span class="font-mono font-bold bg-white/15 px-2 py-0.5 rounded">${r.id}</span>
        <span class="text-blue-200">${d.short} Department</span>
        ${r.priority !== 'Normal' ? `<span class="${PRIORITY_CLS[r.priority]} px-2 py-0.5 rounded-full uppercase">${r.priority}</span>` : ''}
        ${isApproaching(r) ? `<span class="bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full font-bold">🔥 ${daysText(r)}</span>` : ''}`;
    $('d-title').textContent = r.title;
    $('d-signoff-btn').onclick = () => openSignOffModal(r.id);
    $('d-signoff-btn').textContent = ['sanctioned', 'po', 'delivered'].includes(r.status) ? '🖨 Order Sign-Off Form' : '🖨 Sign-Off Form (Draft)';
    $('d-status').innerHTML = `<span class="${s.cls} px-2.5 py-1 rounded-full font-semibold">${s.label}</span>`;

    // Stepper
    if (r.status === 'rejected') {
        $('d-stepper').innerHTML = `<div class="col-span-6 p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-800 font-semibold">This requisition was rejected and closed.</div>`;
    } else {
        const idx = PIPELINE.indexOf(r.status === 'returned' ? r.returnTo : r.status);
        $('d-stepper').innerHTML = STAGE_LABELS.map((label, k) => {
            const done = k === 0 || idx >= k || r.status === 'delivered';
            const active = !done && idx === k - 1;
            const bar = done ? 'bg-emerald-500' : active ? (r.status === 'returned' ? 'bg-red-500' : 'bg-[#003366] animate-pulse') : 'bg-gray-200';
            const txt = done ? 'text-emerald-700 font-bold' : active ? (r.status === 'returned' ? 'text-red-600 font-bold' : 'text-[#003366] font-bold') : 'text-gray-400';
            return `<div><div class="h-1.5 rounded-full ${bar} mb-1.5"></div><p class="text-[10px] leading-tight ${txt}">${label}</p></div>`;
        }).join('');
    }

    // Meta
    const cell = (label, value, extra = '') => `<div class="p-3 rounded-lg bg-white border border-gray-200 ${extra}"><p class="text-[11px] text-gray-500">${label}</p><p class="text-sm font-bold text-gray-900 mt-0.5">${value}</p></div>`;
    $('d-meta').innerHTML =
        cell('Requested By', `${esc(r.requester.name)} <span class="font-normal text-gray-500 text-xs">(${esc(r.requester.role)})</span>`, 'col-span-2') +
        cell('Category', esc(r.category)) +
        cell('Quantity × Unit Cost', `${r.qty} × ${inr(r.unitCost)}`) +
        cell(['sanctioned', 'po', 'delivered'].includes(r.status) ? 'Sanctioned Total' : 'Estimated Total', inr(r.total)) +
        cell('Required By', `${fmtDate(r.neededBy)} <span class="font-normal text-xs ${isApproaching(r) ? 'text-amber-700' : 'text-gray-500'}">(${daysText(r)})</span>`) +
        cell('Next Action By', `<span class="text-[#003366]">${esc(nextActor(r))}</span>`, 'col-span-2 sm:col-span-3');

    $('d-justification').innerHTML = `
        <h4 class="font-bold uppercase tracking-wider text-gray-500 mb-1.5">Specification & Purpose</h4>
        <div class="p-3 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-700 leading-relaxed">${esc(r.spec)}</div>
        ${r.priority === 'Urgent' && r.urgentNote ? `<div class="mt-2 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900"><strong>Urgency justification:</strong> ${esc(r.urgentNote)}</div>` : ''}
        ${r.attachments.length ? `<p class="mt-2 text-gray-500">📎 Attachments: ${r.attachments.map(esc).join(', ')}</p>` : ''}`;

    renderActions(r);
    renderQuotes(r);

    // PO & delivery tracker
    $('d-po').innerHTML = r.po ? `
        <div class="p-4 rounded-xl ${r.status === 'delivered' ? 'bg-emerald-50 border-emerald-200' : 'bg-violet-50 border-violet-200'} border">
            <div class="flex justify-between items-center mb-2">
                <span class="font-bold ${r.status === 'delivered' ? 'text-emerald-900' : 'text-violet-900'} flex items-center gap-1.5"><i data-lucide="truck" class="w-4 h-4"></i> Purchase Order & Delivery Tracker</span>
                <span class="flex items-center gap-2"><span class="font-mono bg-white/70 px-2 py-0.5 rounded border">${esc(r.po.number)}</span>
                <button onclick="openPODoc('${r.id}')" class="bg-[#003366] text-white px-2.5 py-1 rounded font-semibold">🖨 Print PO</button></span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-800">
                <div><strong>Vendor:</strong> ${esc(r.po.vendor)}</div>
                <div><strong>Issued on:</strong> ${fmtDate(r.po.issuedOn)}</div>
                <div><strong>Expected delivery:</strong> ${fmtDate(r.po.expectedDate)}</div>
                <div><strong>Tracking:</strong> <span class="font-semibold">${esc(r.po.tracking)}</span></div>
                ${r.delivery ? `<div class="sm:col-span-2"><strong>Received:</strong> ${fmtDate(r.delivery.date)} by ${esc(r.delivery.by)} — ${esc(r.delivery.condition)}${r.delivery.note ? '. ' + esc(r.delivery.note) : ''}</div>` : ''}
            </div>
        </div>` : '';

    $('d-log').innerHTML = r.log.map(l => `
        <li class="relative pl-4">
            <span class="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-[#003366] ring-4 ring-blue-50"></span>
            <p class="font-bold text-gray-800">${esc(l.step)} <span class="font-normal text-gray-400">— ${esc(l.by)}</span></p>
            ${l.note ? `<p class="text-gray-600">${esc(l.note)}</p>` : ''}
            <p class="text-[10px] text-[#003366] font-mono">${esc(l.time)}</p>
        </li>`).join('');

    renderChat(r);
    icons();
}

function renderActions(r) {
    const box = (tone, title, body, buttons) => `<div class="p-4 rounded-xl border ${tone} space-y-3"><h4 class="text-sm font-bold">${title}</h4>${body ? `<p>${body}</p>` : ''}<div class="flex flex-wrap items-end gap-2">${buttons}</div></div>`;
    const btn = (label, fn, cls) => `<button onclick="${fn}" class="${cls} text-xs font-semibold px-4 py-2 rounded-lg transition">${label}</button>`;
    const primary = 'bg-[#003366] hover:bg-blue-900 text-white', danger = 'bg-white hover:bg-red-50 text-red-700 border border-red-200', ghost = 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300';
    const own = isDept() && r.dept === state.role;
    let html = '';

    if (r.status === 'hod' && own && state.persona === 'hod') {
        html = box('bg-indigo-50 border-indigo-200 text-indigo-950', 'HOD Approval Required',
            'Approving sends an instant alert to the <strong>Purchase Desk</strong> for vendor quotation comparison.',
            btn('✔ Approve & Forward to Purchase', `approveHod('${r.id}')`, primary) + btn('Return to Requester', `askNote('${r.id}','return')`, ghost) + btn('Reject', `askNote('${r.id}','reject')`, danger));
    } else if (r.status === 'purchase' && state.role === 'purchase') {
        html = box('bg-orange-50 border-orange-200 text-orange-950', 'Quotation Check',
            `Record vendor quotations below and select the vendor. ${r.total > POLICY_LIMIT ? `Policy requires at least ${MIN_QUOTES} quotations for this value.` : ''}`,
            btn('Forward to Management', `forwardToManagement('${r.id}')`, primary) + btn('Return to Department', `askNote('${r.id}','return')`, ghost));
    } else if (r.status === 'management' && state.role === 'management') {
        html = box('bg-blue-50 border-blue-200 text-blue-950', 'Management Final Sanction',
            `Endorsed by HOD and verified by Purchase Desk. Granting sanction authorises a PO of <strong>${inr(r.total)}</strong>${r.selectedVendor ? ` to <strong>${esc(r.selectedVendor)}</strong>` : ''}.`,
            (budgetImpact(r).over ? `<label class="w-full flex items-start gap-2 p-2 rounded bg-red-50 border border-red-200 text-red-800"><input type="checkbox" id="over-ok" class="mt-0.5"> <span>Sanction above the ${DEPTS[r.dept].short} budget by ${inr(budgetImpact(r).overBy)}. This exception is recorded in the audit log.</span></label>` : '') +
            btn('🛡 Grant Sanction', `sanction('${r.id}')`, 'bg-emerald-600 hover:bg-emerald-700 text-white') + btn('Return to Purchase', `askNote('${r.id}','return')`, ghost) + btn('Reject', `askNote('${r.id}','reject')`, danger));
    } else if (r.status === 'sanctioned' && state.role === 'purchase') {
        html = box('bg-indigo-50 border-indigo-200 text-indigo-950', 'Issue Purchase Order',
            `Sanctioned for ${inr(r.total)}. Issuing the PO notifies the ${DEPTS[r.dept].short} Department and Management.`,
            `<label class="flex-1 min-w-40"><span class="block text-[11px] font-semibold mb-1">Expected delivery date</span>
                <input type="date" id="po-date" value="${r.neededBy >= TODAY ? r.neededBy : addDays(7)}" min="${TODAY}" class="w-full border border-indigo-300 rounded-lg px-2 py-1.5 bg-white"></label>` +
            btn('Issue PO to ' + esc(r.selectedVendor || 'vendor'), `issuePO('${r.id}')`, primary));
    } else if (r.status === 'po' && state.role === 'purchase') {
        html = box('bg-violet-50 border-violet-200 text-violet-950', 'Update Delivery Tracking', '',
            `<label class="flex-1 min-w-40"><span class="block text-[11px] font-semibold mb-1">Tracking status</span><input id="po-tracking" placeholder="e.g. Out for delivery" class="w-full border border-violet-300 rounded-lg px-2 py-1.5 bg-white"></label>
             <label><span class="block text-[11px] font-semibold mb-1">Revised ETA</span><input type="date" id="po-eta" class="border border-violet-300 rounded-lg px-2 py-1.5 bg-white"></label>` +
            btn('Update', `updateTracking('${r.id}')`, primary));
    } else if (r.status === 'po' && own && canReceive(r)) {
        html = box('bg-emerald-50 border-emerald-200 text-emerald-950', 'Confirm Delivery Receipt',
            'Inspect the items when they arrive, then confirm. Any shortfall or damage is reported back to the Purchase Desk.',
            `<label class="min-w-48"><span class="block text-[11px] font-semibold mb-1">Condition</span>
                <select id="dl-cond" class="w-full border border-emerald-300 rounded-lg px-2 py-1.5 bg-white"><option>Received in good condition</option><option>Partially received</option><option>Damaged / not as specified</option></select></label>
             <label><span class="block text-[11px] font-semibold mb-1">Rate vendor</span>
                <select id="dl-rating" class="border border-emerald-300 rounded-lg px-2 py-1.5 bg-white"><option value="5">★★★★★ Excellent</option><option value="4">★★★★ Good</option><option value="3">★★★ Average</option><option value="2">★★ Poor</option><option value="1">★ Very poor</option></select></label>
             <label class="flex-1 min-w-40"><span class="block text-[11px] font-semibold mb-1">Remarks (optional)</span><input id="dl-note" placeholder="e.g. Stocked in Lab EC-204" class="w-full border border-emerald-300 rounded-lg px-2 py-1.5 bg-white"></label>` +
            btn('Confirm', `confirmDelivery('${r.id}')`, 'bg-emerald-600 hover:bg-emerald-700 text-white'));
    } else if (r.status === 'returned' && isMyAction(r)) {
        html = box('bg-red-50 border-red-200 text-red-950', 'Returned for Clarification',
            'Reply in the chat with the requested details, then resubmit.',
            btn('Resubmit', `resubmit('${r.id}')`, 'bg-[#FFC107] hover:bg-amber-400 text-[#003366]'));
    } else if (!isClosed(r)) {
        html = `<div class="p-3 rounded-lg bg-gray-100 border border-gray-200 text-gray-600">Awaiting action from <strong>${esc(nextActor(r))}</strong>. Switch role in the header to act on this stage.</div>`;
    }
    $('d-actions').innerHTML = html + (['hod', 'purchase', 'management'].includes(r.status) && (state.role === 'purchase' || state.role === 'management' || isHodPersona()) ? '<div class="mt-3">' + budgetPanel(r) + '</div>' : '');
}

function renderQuotes(r) {
    const editable = state.role === 'purchase' && r.status === 'purchase';
    $('quote-form').classList.toggle('hidden', !editable);
    const needs = r.total > POLICY_LIMIT, ok = !needs || r.quotes.length >= MIN_QUOTES;
    $('quote-policy').className = `text-[10px] font-semibold ${ok ? 'text-emerald-700' : 'text-orange-700'}`;
    $('quote-policy').textContent = needs ? `${r.quotes.length}/${MIN_QUOTES} quotes required ${ok ? '✓' : ''}` : 'Below policy threshold';
    const lowest = r.quotes.length ? Math.min(...r.quotes.map(q => q.amount)) : null;
    $('quote-rows').innerHTML = r.quotes.length ? r.quotes.map((q, i) => `
        <tr class="border-t border-gray-100 ${r.selectedVendor === q.vendor ? 'bg-emerald-50' : ''}">
            <td class="py-2 px-3"><span class="font-semibold">${esc(q.vendor)}</span> ${q.amount === lowest ? '<span class="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 rounded">L1</span>' : ''}
                <div class="text-[10px]">${(() => { const v = findVendor(q.vendor); if (!v) return '<span class="text-amber-700">Not in directory</span>'; const s = vendorStats(v); return stars(s.avg, s.n) + (s.onTime !== null ? ` · ${s.onTime}% on-time` : ''); })()}</div></td>
            <td>${inr(q.amount)}</td><td>${q.gst ? '✓' : '✗'}</td><td>${esc(q.warranty || '—')}</td><td>${q.days ? q.days + ' days' : '—'}</td>
            <td class="text-right px-3">${editable
                ? `<input type="radio" name="sel-vendor" ${r.selectedVendor === q.vendor ? 'checked' : ''} onchange="selectVendor(${i})">`
                : (r.selectedVendor === q.vendor ? '<span class="text-emerald-700 font-bold">✓</span>' : '')}</td>
        </tr>`).join('')
        : `<tr><td colspan="6" class="py-3 px-3 text-gray-400">No quotations recorded yet.</td></tr>`;
}
function addQuote(e) {
    e.preventDefault();
    const r = findReq(detailId);
    const q = { vendor: $('q-vendor').value.trim(), amount: +$('q-amount').value, gst: $('q-gst').value === 'yes', warranty: $('q-warranty').value.trim(), days: +$('q-days').value || null };
    if (r.quotes.some(x => x.vendor.toLowerCase() === q.vendor.toLowerCase())) { toast('Duplicate vendor', 'That vendor already has a quotation.', 'danger'); return; }
    const known = findVendor(q.vendor);
    if (known) q.vendor = known.name;
    else {
        state.vendors.push({ name: q.vendor, gstin: '', city: '', contact: '', phone: '', email: '', categories: [r.category], ratings: [] });
        toast('New vendor added to directory', `${q.vendor} has no GSTIN on file yet. Complete it in the Vendor Directory.`, 'warn');
    }
    r.quotes.push(q);
    if (!r.selectedVendor) r.selectedVendor = q.vendor;
    addLog(r, 'Quotation recorded', `${q.vendor}: ${inr(q.amount)}`);
    e.target.reset(); afterAction(r.id);
}
function selectVendor(i) { const r = findReq(detailId); r.selectedVendor = r.quotes[i].vendor; afterAction(r.id); }

function renderChat(r) {
    $('chat-count').textContent = r.chat.length;
    $('chat-as').textContent = actorLabel();
    const mySide = me().side;
    const tone = { dept: 'bg-blue-100 text-blue-800', purchase: 'bg-amber-100 text-amber-800', management: 'bg-emerald-100 text-emerald-800' };
    $('chat-body').innerHTML = r.chat.length ? r.chat.map(m => {
        const mine = m.side === mySide && m.from === me().name;
        return `<div class="flex flex-col ${mine ? 'items-end' : 'items-start'}">
            <div class="flex items-center gap-1.5 mb-1 px-1">
                <span class="text-[11px] font-bold text-gray-700">${esc(m.from)}</span>
                <span class="px-1.5 rounded text-[10px] font-semibold ${tone[m.side] || 'bg-gray-100'}">${esc(m.tag)}</span>
                <span class="text-[10px] text-gray-400">${esc(m.time)}</span>
            </div>
            <div class="max-w-[88%] px-3.5 py-2.5 rounded-2xl leading-relaxed shadow-sm ${mine ? 'bg-[#003366] text-white rounded-tr-sm' : 'bg-white text-gray-800 border border-gray-200 rounded-tl-sm'}">${esc(m.text)}</div>
        </div>`;
    }).join('') : `<div class="h-full flex flex-col items-center justify-center text-center text-gray-400 p-6">
        <i data-lucide="messages-square" class="w-8 h-8 mb-2 text-gray-300"></i><p class="font-medium text-gray-500">No messages yet.</p>
        <p class="text-[11px] mt-1">Clarify model numbers, specifications or delivery deadlines here.</p></div>`;
    setTimeout(() => { $('chat-body').scrollTop = $('chat-body').scrollHeight; }, 20);
}
function sendMessage(e) {
    e.preventDefault();
    const text = $('chat-input').value.trim(); if (!text || !detailId) return;
    const r = findReq(detailId), m = me();
    r.chat.push({ from: m.name, tag: m.tag, side: m.side, text, time: stamp() });
    const to = m.side === 'dept' ? ['purchase'] : ['dept:' + r.dept];
    if (m.side === 'dept' && r.status === 'hod' && state.persona === 'staff') to.splice(0, 1, 'hod:' + r.dept);
    notify(to, 'message', `New message on ${r.id}`, `${m.name}: ${text.length > 90 ? text.slice(0, 90) + '…' : text}`, r.id);
    $('chat-input').value = '';
    afterAction(r.id);
}

/* =========================================================
   SIGN-OFF RECORD
   ========================================================= */
function signBlock(title, a, pendingText) {
    const signed = a && !a.rejected;
    return `<div class="border border-gray-300 rounded-lg p-3 text-center flex flex-col justify-between min-h-[120px]">
        <p class="text-[10px] uppercase font-bold text-gray-500">${title}</p>
        <div class="my-2 flex justify-center">${signed
            ? `<span class="stamp inline-block px-2 py-1 rounded text-[10px] font-bold uppercase">Digitally Approved</span>`
            : a && a.rejected ? `<span class="inline-block px-2 py-1 rounded text-[10px] font-bold uppercase border-2 border-red-600 text-red-600">Rejected</span>`
            : `<span class="text-[10px] text-gray-400 italic">${pendingText}</span>`}</div>
        <div class="border-t border-gray-300 pt-1">
            <p class="font-semibold text-gray-800">${a ? esc(a.by) : '________________'}</p>
            <p class="text-[10px] text-gray-500">${a ? fmtDate(a.date) : 'Date: ________'}</p>
        </div></div>`;
}
function openSignOffModal(id) {
    const r = findReq(id), d = DEPTS[r.dept], final = COMMITTED.includes(r.status);
    $('print-subtitle').textContent = 'PURCHASE ORDER APPROVAL & SIGN-OFF FORM';
    const lowest = r.quotes.length ? Math.min(...r.quotes.map(q => q.amount)) : null;
    const sel = r.quotes.find(q => q.vendor === r.selectedVendor);
    const v = findVendor(r.po?.vendor || r.selectedVendor);
    const b = budgetUse(r.dept, r.id);
    const sec = (n, title, body) => `<section class="break-inside-avoid"><h4 class="font-bold text-[#003366] uppercase text-[11px] mb-2 border-b border-[#FFC107] pb-1">${n}. ${title}</h4>${body}</section>`;
    const kv = rows => `<table class="w-full border border-gray-300">${rows.map(([k, val]) => `<tr><td class="p-1.5 px-2 border bg-gray-50 font-semibold w-[38%]">${k}</td><td class="p-1.5 px-2 border">${val}</td></tr>`).join('')}</table>`;
    const blank = '<span class="inline-block w-full border-b border-dotted border-gray-400 h-4"></span>';

    // Who signs, with the digital approval recorded in the system (if any)
    const req = r.requester;
    const signatories = [
        ['Requested by', `${esc(req.name)}`, req.isHod ? 'HOD' : esc(req.role), { by: req.name, date: r.created }],
        ['Recommended by', esc(d.hod), `Head of Department, ${d.short}`, r.approvals.hod],
        ['Quotations verified by', PURCHASE_OFFICER, 'Purchase Officer', r.approvals.purchase],
        ['Budget verified by', '', 'Accounts Officer', null],
        ['Sanctioned by', r.approvals.management && r.approvals.management.by !== MANAGEMENT_SIGNATORY ? esc(r.approvals.management.by) : 'Principal', 'Principal / Management', r.approvals.management]
    ];
    const status = a => !a ? '<span class="text-gray-400 italic">Pending</span>'
        : a.rejected ? `<span class="text-red-700 font-bold">Rejected ${fmtDate(a.date)}</span>`
        : `<span class="stamp inline-block px-1.5 py-0.5 rounded text-[9px] font-bold uppercase">Approved</span><div class="text-[10px] text-gray-500 mt-0.5">${fmtDate(a.date)}</div>`;

    $('signoff-body').innerHTML = `
        ${letterhead('PURCHASE ORDER APPROVAL & SIGN-OFF FORM')}
        <h2 class="hidden print:block text-center text-sm font-bold tracking-[0.2em] text-[#003366]">PURCHASE ORDER APPROVAL & SIGN-OFF FORM</h2>
        ${final ? '' : `<div class="bg-amber-50 border border-amber-200 text-amber-800 p-2 rounded text-center font-bold uppercase tracking-wide">Draft — ${STATUS[r.status].label}. Not valid for purchase until sanctioned.</div>`}

        <div class="grid grid-cols-2 gap-x-6 gap-y-0.5 border border-gray-300 rounded p-3">
            <p><strong>Form / Sanction Ref:</strong> ${refId(r)}</p>
            <p><strong>Requisition No.:</strong> ${r.id}</p>
            <p><strong>Department:</strong> ${d.name} (${d.short})</p>
            <p><strong>Date Raised:</strong> ${fmtDate(r.created)}</p>
            <p><strong>Category:</strong> ${esc(r.category)}</p>
            <p><strong>Required By:</strong> ${fmtDate(r.neededBy)}</p>
            <p><strong>Priority:</strong> ${r.priority === 'Urgent' ? '<span class="text-red-700 font-bold">URGENT</span>' : r.priority}</p>
            <p><strong>Current Status:</strong> ${STATUS[r.status].label}</p>
        </div>

        ${sec(1, 'Requester Details', kv([
            ['Name', esc(req.name)],
            ['Designation / Role', req.isHod ? `Head of Department, ${d.short}` : esc(req.role)],
            ['Department', d.name]
        ]))}

        ${sec(2, 'Item Particulars', `<table class="w-full border border-gray-300">
            <tr class="bg-gray-50"><th class="p-2 border w-10">S.No</th><th class="text-left p-2 border">Description & Specification</th><th class="p-2 border">Qty</th><th class="p-2 border">Unit Cost</th><th class="p-2 border">Amount</th></tr>
            <tr><td class="p-2 border text-center">1</td><td class="p-2 border"><strong>${esc(r.title)}</strong><div class="text-[10px] text-gray-600 mt-1">${esc(r.spec)}</div></td>
                <td class="p-2 border text-center">${r.qty}</td><td class="p-2 border text-right">${inr(Math.round(r.total / r.qty))}</td><td class="p-2 border text-right font-bold">${inr(r.total)}</td></tr>
            <tr><td colspan="4" class="p-2 border text-right font-bold">${final ? 'Sanctioned' : 'Estimated'} Total ${sel && sel.gst === false ? '(GST extra)' : '(incl. GST)'}</td><td class="p-2 border text-right font-bold">${inr(r.total)}</td></tr>
        </table>
        <p class="mt-1.5"><strong>Amount in words:</strong> Rupees ${inWordsIN(r.total)} Only</p>
        ${r.priority === 'Urgent' && r.urgentNote ? `<p class="mt-1"><strong>Urgency justification:</strong> ${esc(r.urgentNote)}</p>` : ''}
        ${r.attachments.length ? `<p class="mt-1 text-[10px] text-gray-500">Attachments on file: ${r.attachments.map(esc).join(', ')}</p>` : ''}`)}

        ${sec(3, 'Vendor Comparison Statement', r.quotes.length ? `<table class="w-full border border-gray-300">
            <tr class="bg-gray-50"><th class="text-left p-2 border">Vendor</th><th class="p-2 border">Quoted Total</th><th class="p-2 border">GST</th><th class="p-2 border">Warranty</th><th class="p-2 border">Lead Time</th><th class="p-2 border">Rank</th></tr>
            ${[...r.quotes].sort((a, b) => a.amount - b.amount).map((q, i) => `<tr class="${q.vendor === r.selectedVendor ? 'bg-emerald-50 font-semibold' : ''}">
                <td class="p-2 border">${esc(q.vendor)}${q.vendor === r.selectedVendor ? ' ★' : ''}</td><td class="p-2 border text-right">${inr(q.amount)}</td>
                <td class="p-2 border text-center">${q.gst ? 'Included' : 'Extra'}</td><td class="p-2 border text-center">${esc(q.warranty || '—')}</td>
                <td class="p-2 border text-center">${q.days ? q.days + ' days' : '—'}</td><td class="p-2 border text-center">L${i + 1}</td></tr>`).join('')}
        </table>
        <p class="mt-1 text-[10px] text-gray-500">★ Recommended vendor${sel && sel.amount !== lowest ? ' (not L1 — justification recorded in the discussion thread)' : ' (lowest quotation, L1)'}. ${r.total > POLICY_LIMIT ? `Policy: minimum ${MIN_QUOTES} quotations for purchases above ${inr(POLICY_LIMIT)} — ${r.quotes.length >= MIN_QUOTES ? 'complied' : '<strong class="text-red-700">not yet complied</strong>'}.` : ''}</p>`
        : `<p class="text-gray-500 italic">No vendor quotations recorded yet.</p>`)}

        ${sec(4, `Budget Verification (${FY_LABEL})`, kv([
            [`${d.short} annual budget`, inr(b.budget)],
            ['Already committed (other orders)', inr(b.committed)],
            ['This order', inr(r.total)],
            ['Balance after this order', `<span class="${b.budget - b.committed - r.total < 0 ? 'text-red-700 font-bold' : ''}">${inr(b.budget - b.committed - r.total)}</span>`],
            ['Budget head / account code', blank]
        ]) + (r.budgetException ? `<p class="mt-1.5 text-red-700"><strong>Budget exception:</strong> sanctioned ${inr(r.budgetException.overBy)} above budget, approved by Management on ${fmtDate(r.budgetException.date)}.</p>` : ''))}

        ${sec(5, 'Purchase Order Details', kv([
            ['PO Number', r.po ? `<span class="font-mono">${esc(r.po.number)}</span>` : '<span class="text-gray-400 italic">To be issued after sanction</span>'],
            ['Vendor', esc(r.po?.vendor || r.selectedVendor || '—')],
            ['Vendor GSTIN', v?.gstin ? `<span class="font-mono">${esc(v.gstin)}</span>` : '—'],
            ['Vendor contact', v?.contact ? `${esc(v.contact)}${v.phone ? ' · ' + esc(v.phone) : ''}` : '—'],
            ['PO Date', r.po ? fmtDate(r.po.issuedOn) : '—'],
            ['Delivery due by', r.po ? fmtDate(r.po.expectedDate) : fmtDate(r.neededBy)],
            ['Delivery address', `Dept. of ${d.name}, Sri Eshwar College of Engineering, Coimbatore`],
            ['Warranty', esc(sel?.warranty || '—')],
            ['Payment terms', 'Within 30 days of verified receipt and invoice']
        ]))}

        ${sec(6, 'Approvals & Signatures', `<table class="w-full border border-gray-300">
            <tr class="bg-gray-50"><th class="p-2 border text-left">Stage</th><th class="p-2 border text-left">Name & Designation</th><th class="p-2 border">System approval</th><th class="p-2 border w-[22%]">Signature</th><th class="p-2 border w-[13%]">Date</th></tr>
            ${signatories.map(([stage, name, desig, a]) => `<tr>
                <td class="p-2 border font-semibold">${stage}</td>
                <td class="p-2 border">${name ? `<div class="font-semibold">${name}</div>` : blank}<div class="text-[10px] text-gray-500">${desig}</div></td>
                <td class="p-2 border text-center">${stage === 'Requested by' ? `<span class="text-gray-600">Submitted</span><div class="text-[10px] text-gray-500 mt-0.5">${fmtDate(r.created)}</div>` : status(a)}</td>
                <td class="p-2 border h-12"></td><td class="p-2 border"></td></tr>`).join('')}
        </table>
        <p class="mt-1 text-[10px] text-gray-500">"System approval" is the electronic approval recorded in the Procurement Hub. Wet signatures are for the physical file.</p>`)}

        ${sec(7, 'Goods Received & Inspection Certificate', kv([
            ['Date received', r.delivery ? fmtDate(r.delivery.date) : blank],
            ['Quantity received', r.delivery ? `${r.qty} of ${r.qty}` : `${blank}<span class="text-[10px] text-gray-500"> of ${r.qty} ordered</span>`],
            ['Condition on inspection', r.delivery ? esc(r.delivery.condition) : '☐ Good condition &nbsp;&nbsp; ☐ Partially received &nbsp;&nbsp; ☐ Damaged / not as specified'],
            ['Stock register / asset entry no.', blank],
            ['Remarks', r.delivery?.note ? esc(r.delivery.note) : blank]
        ]) + `<div class="grid grid-cols-2 gap-6 pt-10">
            <div class="text-center border-t border-gray-400 pt-1"><p class="font-semibold">${r.delivery ? esc(r.delivery.by) : 'Lab In-charge / Store Keeper'}</p><p class="text-[10px] text-gray-500">Received & inspected by</p></div>
            <div class="text-center border-t border-gray-400 pt-1"><p class="font-semibold">${esc(d.hod)}</p><p class="text-[10px] text-gray-500">Head of Department</p></div>
        </div>`)}

        <p class="text-[10px] text-gray-400 border-t pt-3">System-generated from the SECE Centralized Procurement Hub on ${fmtDate(TODAY)}. Ref ${refId(r)} · ${r.id}.</p>`;
    openModal('signoff-modal');
}

/* =========================================================
   BUDGETS
   ========================================================= */
const COMMITTED = ['sanctioned', 'po', 'delivered'];
const IN_PIPELINE = ['hod', 'purchase', 'management', 'returned'];
const C_COMMITTED = '#2F6FB5', C_PIPELINE = '#B07A00';   // validated pair: CVD-safe, ≥3:1 on white
const sumTotal = list => list.reduce((s, r) => s + r.total, 0);

function budgetUse(dept, excludeId) {
    const rs = state.requests.filter(r => r.dept === dept && r.id !== excludeId);
    const budget = state.budgets[dept] || 0;
    const committed = sumTotal(rs.filter(r => COMMITTED.includes(r.status)));
    const pipeline = sumTotal(rs.filter(r => IN_PIPELINE.includes(r.status)));
    return { budget, committed, pipeline, available: budget - committed - pipeline };
}
function budgetImpact(r) {
    const u = budgetUse(r.dept, r.id);
    const after = u.committed + r.total;
    return { ...u, after, pct: u.budget ? after / u.budget * 100 : 0, over: after > u.budget, overBy: after - u.budget };
}
function budgetPanel(r) {
    if (isClosed(r) || COMMITTED.includes(r.status)) return '';
    const b = budgetImpact(r), d = DEPTS[r.dept];
    const w = v => b.budget ? Math.min(100, v / b.budget * 100) : 0;
    const wC = w(b.committed), wR = Math.min(100 - wC, w(r.total));
    return `<div class="p-3 rounded-lg border ${b.over ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'}">
        <div class="flex flex-wrap justify-between gap-2 mb-2">
            <span class="font-bold text-gray-700">${d.short} budget impact · ${FY_LABEL}</span>
            <span class="${b.over ? 'text-red-700 font-bold' : 'text-gray-600'}">${b.over ? `⚠ Exceeds budget by ${inr(b.overBy)}` : `${b.pct.toFixed(0)}% of budget used after sanction`}</span>
        </div>
        <div class="flex gap-[2px] h-3 rounded bg-gray-200 overflow-hidden" data-tip="Committed ${inr(b.committed)} · This request ${inr(r.total)} · Budget ${inr(b.budget)}">
            ${wC ? `<div style="width:${wC}%;background:${C_COMMITTED}"></div>` : ''}
            ${wR ? `<div style="width:${wR}%;background:${C_PIPELINE}" class="rounded-r"></div>` : ''}
        </div>
        <p class="mt-1.5 text-gray-500">Budget ${inr(b.budget)} · already committed ${inr(b.committed)} · this request ${inr(r.total)} · other requests in pipeline ${inr(b.pipeline)}</p>
    </div>`;
}
function setBudget(dept, value) {
    const v = Math.max(0, Math.round(+value || 0));
    const old = state.budgets[dept];
    if (v === old) return;
    state.budgets[dept] = v;
    save(); renderAll();
    toast('Budget updated', `${DEPTS[dept].short}: ${inr(old)} → ${inr(v)} for ${FY_LABEL}.`, 'info');
}

/* =========================================================
   ANALYTICS
   ========================================================= */
function hbar(label, value, max, display, tip) {
    const pct = max ? Math.max(value ? 2 : 0, value / max * 100) : 0;
    return `<div class="grid grid-cols-[11.5rem_1fr_auto] items-center gap-3 text-xs" data-tip="${esc(tip)}">
        <span class="text-gray-600 truncate">${esc(label)}</span>
        <div class="h-3.5"><div class="h-full rounded-r" style="width:${pct}%;background:${C_COMMITTED}"></div></div>
        <span class="text-gray-800 font-semibold tabular-nums">${display}</span></div>`;
}
function renderAnalytics() {
    if (!$('an-kpis')) return;
    const depts = isDept() ? [state.role] : Object.keys(DEPTS);
    const reqs = state.requests.filter(r => depts.includes(r.dept));
    $('fy-label').textContent = FY_LABEL;
    $('analytics-sub').textContent = isDept()
        ? `${DEPTS[state.role].name} budget against committed and in-pipeline spend.`
        : 'All department budgets against committed and in-pipeline spend.';

    const uses = depts.map(k => ({ k, ...budgetUse(k) }));
    const tot = uses.reduce((a, u) => ({ budget: a.budget + u.budget, committed: a.committed + u.committed, pipeline: a.pipeline + u.pipeline }), { budget: 0, committed: 0, pipeline: 0 });
    const cycles = reqs.filter(r => r.sanctionDate).map(r => Math.max(0, Math.round((new Date(r.sanctionDate) - new Date(r.created)) / DAY)));
    const avgCycle = cycles.length ? (cycles.reduce((a, b) => a + b, 0) / cycles.length).toFixed(1) : '—';
    const overCount = uses.filter(u => u.committed + u.pipeline > u.budget).length;
    const tile = (label, value, sub, tone = 'text-gray-900') => `<div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <p class="text-xs text-gray-500">${label}</p><p class="text-xl font-bold mt-1 tabular-nums ${tone}">${value}</p><p class="text-[11px] text-gray-400 mt-0.5">${sub}</p></div>`;
    $('an-kpis').innerHTML =
        tile(`Total budget`, inr(tot.budget), FY_LABEL) +
        tile('Committed', inr(tot.committed), `${tot.budget ? (tot.committed / tot.budget * 100).toFixed(0) : 0}% of budget`) +
        tile('In approval pipeline', inr(tot.pipeline), 'Awaiting HOD / Purchase / Mgmt') +
        tile('Available', inr(tot.budget - tot.committed - tot.pipeline), overCount ? `⚠ ${overCount} dept(s) over budget` : 'After pipeline is sanctioned', overCount ? 'text-red-700' : 'text-emerald-700') +
        tile('Avg. time to sanction', avgCycle === '—' ? '—' : `${avgCycle} days`, `Across ${cycles.length} sanctioned request(s)`);

    const mgmt = state.role === 'management';
    $('budget-edit-note').classList.toggle('hidden', !mgmt);
    $('budget-rows').innerHTML = uses.map(u => {
        const d = DEPTS[u.k], used = u.committed + u.pipeline, over = used > u.budget;
        const w = v => u.budget ? Math.min(100, v / u.budget * 100) : (v ? 100 : 0);
        const wC = w(u.committed), wP = Math.min(100 - wC, w(u.pipeline));
        const tip = `${d.short}: committed ${inr(u.committed)}, pipeline ${inr(u.pipeline)}, budget ${inr(u.budget)}`;
        return `<tr class="border-b border-gray-100">
            <td class="py-2.5 pr-2 font-semibold text-gray-800">${d.short}</td>
            <td class="pr-2">${mgmt
                ? `<input type="number" min="0" step="10000" value="${u.budget}" onchange="setBudget('${u.k}', this.value)" class="w-28 border border-gray-300 rounded px-1.5 py-1 tabular-nums">`
                : `<span class="tabular-nums">${inr(u.budget)}</span>`}</td>
            <td class="pr-3"><div class="flex gap-[2px] h-3.5 rounded bg-gray-200 overflow-hidden" data-tip="${esc(tip)}">
                ${wC ? `<div style="width:${wC}%;background:${C_COMMITTED}" class="${wP ? '' : 'rounded-r'}"></div>` : ''}
                ${wP ? `<div style="width:${wP}%;background:${C_PIPELINE}" class="rounded-r"></div>` : ''}
            </div></td>
            <td class="text-right pr-2 tabular-nums">${inr(u.committed)}</td>
            <td class="text-right pr-2 tabular-nums">${inr(u.pipeline)}</td>
            <td class="text-right pr-2 tabular-nums ${over ? 'text-red-700 font-bold' : ''}">${over ? '⚠ −' + inr(used - u.budget).slice(1) : inr(u.budget - used)}</td>
            <td class="text-right tabular-nums ${over ? 'text-red-700 font-bold' : 'text-gray-700'}">${u.budget ? Math.round(used / u.budget * 100) : 0}%</td>
        </tr>`;
    }).join('');

    const byCat = CATEGORIES.map(c => ({ c, v: sumTotal(reqs.filter(r => r.category === c && COMMITTED.includes(r.status))), n: reqs.filter(r => r.category === c && COMMITTED.includes(r.status)).length }))
        .filter(x => x.v).sort((a, b) => b.v - a.v);
    const maxCat = Math.max(0, ...byCat.map(x => x.v));
    $('chart-category').innerHTML = byCat.length
        ? byCat.map(x => hbar(x.c, x.v, maxCat, inr(x.v), `${x.c}: ${inr(x.v)} across ${x.n} requisition(s)`)).join('')
        : `<p class="text-xs text-gray-400">No committed spend yet.</p>`;

    const byStage = Object.entries(STATUS).map(([k, s]) => ({ label: s.label, n: reqs.filter(r => r.status === k).length, v: sumTotal(reqs.filter(r => r.status === k)) }));
    const maxStage = Math.max(0, ...byStage.map(x => x.n));
    $('chart-stage').innerHTML = byStage.map(x => hbar(x.label, x.n, maxStage, x.n, `${x.label}: ${x.n} request(s), ${inr(x.v)}`)).join('');
}

/* Hover tooltips for any element with data-tip */
document.addEventListener('mousemove', e => {
    const t = e.target.closest && e.target.closest('[data-tip]'), tip = $('tip');
    if (!t) { tip.classList.add('hidden'); return; }
    tip.textContent = t.dataset.tip;
    tip.classList.remove('hidden');
    const x = Math.min(e.clientX + 14, window.innerWidth - tip.offsetWidth - 8);
    tip.style.left = x + 'px'; tip.style.top = (e.clientY + 16) + 'px';
});

/* =========================================================
   VENDOR DIRECTORY
   ========================================================= */
const findVendor = name => state.vendors.find(v => v.name.toLowerCase() === String(name).trim().toLowerCase());
function vendorStats(v) {
    const quotes = state.requests.filter(r => r.quotes.some(q => q.vendor === v.name)).length;
    const won = state.requests.filter(r => r.po && r.po.vendor === v.name).length;
    const value = sumTotal(state.requests.filter(r => r.selectedVendor === v.name && COMMITTED.includes(r.status)));
    const n = v.ratings.length;
    const avg = n ? v.ratings.reduce((s, x) => s + x.score, 0) / n : 0;
    const onTime = n ? Math.round(v.ratings.filter(x => x.onTime).length / n * 100) : null;
    return { quotes, won, value, n, avg, onTime };
}
function stars(avg, n) {
    if (!n) return '<span class="text-gray-400">No ratings yet</span>';
    const full = Math.round(avg);
    return `<span class="text-amber-500 tracking-tight" aria-hidden="true">${'★'.repeat(full)}<span class="text-gray-300">${'★'.repeat(5 - full)}</span></span> <span class="text-gray-700 font-semibold">${avg.toFixed(1)}</span> <span class="text-gray-400">(${n})</span>`;
}
function renderVendors() {
    if (!$('vendor-rows')) return;
    $('vendor-form').classList.toggle('hidden', state.role !== 'purchase');
    $('vendor-options').innerHTML = state.vendors.map(v => `<option value="${esc(v.name)}"></option>`).join('');
    const q = ($('vendor-search').value || '').trim().toLowerCase();
    const list = state.vendors.map(v => ({ v, s: vendorStats(v) }))
        .filter(({ v }) => !q || [v.name, v.city, v.contact, ...(v.categories || [])].some(x => String(x || '').toLowerCase().includes(q)))
        .sort((a, b) => b.s.value - a.s.value || b.s.avg - a.s.avg);
    $('vendor-rows').innerHTML = list.length ? list.map(({ v, s }) => `
        <tr class="hover:bg-gray-50">
            <td class="py-3 px-4"><p class="font-bold text-gray-900">${esc(v.name)}</p>
                <p class="text-gray-500">${esc(v.city || '—')} · ${v.gstin ? `<span class="font-mono">${esc(v.gstin)}</span>` : '<span class="text-amber-700 font-semibold">GSTIN not on file</span>'}</p></td>
            <td><div class="flex flex-wrap gap-1">${(v.categories || []).map(c => `<span class="px-1.5 py-0.5 bg-blue-50 text-[#003366] rounded text-[10px]">${esc(c)}</span>`).join('') || '—'}</div></td>
            <td class="text-gray-600">${esc(v.contact || '—')}<br><span class="text-gray-400">${esc(v.phone || '')}${v.email ? ' · ' + esc(v.email) : ''}</span></td>
            <td class="text-right tabular-nums">${s.quotes}</td>
            <td class="text-right tabular-nums">${s.won}</td>
            <td class="text-right tabular-nums font-semibold">${inr(s.value)}</td>
            <td class="px-3 whitespace-nowrap">${stars(s.avg, s.n)}</td>
            <td class="text-right pr-4 tabular-nums ${s.onTime !== null && s.onTime < 70 ? 'text-red-700 font-bold' : ''}">${s.onTime === null ? '—' : s.onTime + '%'}</td>
        </tr>`).join('')
        : `<tr><td colspan="8" class="p-6 text-center text-gray-400">No vendors match.</td></tr>`;
}
function addVendor(e) {
    e.preventDefault();
    const name = $('v-name').value.trim(), gstin = $('v-gstin').value.trim().toUpperCase();
    if (findVendor(name)) { toast('Vendor already exists', `${name} is already in the directory.`, 'danger'); return; }
    if (gstin && !/^\d{2}[A-Z]{5}\d{4}[A-Z][A-Z\d]Z[A-Z\d]$/.test(gstin)) { toast('Check the GSTIN', 'A GSTIN has 15 characters, e.g. 33AABCK1234A1Z5.', 'danger'); return; }
    state.vendors.push({ name, gstin, city: $('v-city').value.trim(), contact: $('v-contact').value.trim(), phone: $('v-phone').value.trim(), email: $('v-email').value.trim(),
        categories: $('v-cats').value.split(',').map(s => s.trim()).filter(Boolean), ratings: [] });
    e.target.reset(); save(); renderVendors();
    toast('Vendor registered', `${name} added to the directory.`, 'success');
}

/* =========================================================
   EXPORTS (CSV opens directly in Excel)
   ========================================================= */
function downloadCSV(filename, rows) {
    const cell = v => {
        let s = String(v ?? '');
        if (/^[=+\-@]/.test(s)) s = "'" + s;           // stop spreadsheet formula injection
        return /[",\r\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    };
    const csv = '﻿' + rows.map(r => r.map(cell).join(',')).join('\r\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    toast('Export ready', `${filename} downloaded (${rows.length - 1} rows).`, 'success');
}
function exportRequests() {
    const rows = [['Requisition ID', 'Department', 'Item', 'Category', 'Quantity', 'Unit cost (INR)', 'Total (INR)', 'Priority', 'Status', 'Requested by', 'Requester role', 'Raised on', 'Required by', 'Days left', 'Next action by', 'Selected vendor', 'PO number', 'Expected delivery', 'Sanction date']];
    lastFiltered.forEach(r => rows.push([r.id, DEPTS[r.dept].short, r.title, r.category, r.qty, r.unitCost, r.total, r.priority, STATUS[r.status].label, r.requester.name, r.requester.role,
        r.created, r.neededBy, isClosed(r) ? '' : daysLeft(r), nextActor(r), r.selectedVendor || '', r.po?.number || '', r.po?.expectedDate || '', r.sanctionDate || '']));
    downloadCSV(`SECE_requisitions_${TODAY}.csv`, rows);
}
function exportVendors() {
    const rows = [['Vendor', 'GSTIN', 'City', 'Contact', 'Phone', 'Email', 'Categories', 'Quotes submitted', 'POs won', 'Business value (INR)', 'Average rating', 'Ratings', 'On-time %']];
    state.vendors.forEach(v => { const s = vendorStats(v); rows.push([v.name, v.gstin, v.city, v.contact, v.phone, v.email, (v.categories || []).join('; '), s.quotes, s.won, s.value, s.n ? s.avg.toFixed(1) : '', s.n, s.onTime ?? '']); });
    downloadCSV(`SECE_vendor_directory_${TODAY}.csv`, rows);
}
function exportBudgets() {
    const depts = isDept() ? [state.role] : Object.keys(DEPTS);
    const rows = [['Department', 'Financial year', 'Budget (INR)', 'Committed (INR)', 'In pipeline (INR)', 'Available (INR)', 'Used %']];
    depts.forEach(k => { const u = budgetUse(k); rows.push([DEPTS[k].name, FY_LABEL, u.budget, u.committed, u.pipeline, u.available, u.budget ? Math.round((u.committed + u.pipeline) / u.budget * 100) : '']); });
    downloadCSV(`SECE_budget_report_${FY_LABEL.replace(' ', '_')}.csv`, rows);
}

/* =========================================================
   PURCHASE ORDER DOCUMENT
   ========================================================= */
function inWordsIN(num) {
    num = Math.round(num);
    if (!num) return 'Zero';
    const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const two = x => x < 20 ? a[x] : b[Math.floor(x / 10)] + (x % 10 ? ' ' + a[x % 10] : '');
    const three = x => (x >= 100 ? a[Math.floor(x / 100)] + ' Hundred' + (x % 100 ? ' ' : '') : '') + (x % 100 ? two(x % 100) : '');
    const parts = [];
    const crore = Math.floor(num / 1e7); num %= 1e7;
    const lakh = Math.floor(num / 1e5); num %= 1e5;
    const thousand = Math.floor(num / 1000); num %= 1000;
    if (crore) parts.push((crore >= 1000 ? inWordsIN(crore) : three(crore)) + ' Crore');
    if (lakh) parts.push(two(lakh) + ' Lakh');
    if (thousand) parts.push(two(thousand) + ' Thousand');
    if (num) parts.push(three(num));
    return parts.join(' ');
}
function letterhead(title) {
    return `<div class="hidden print:flex flex-col items-center text-center border-b-4 border-[#FFC107] pb-3">
        <img src="${LOGO_FULL}" alt="Sri Eshwar College of Engineering" class="h-28 w-auto">
        <p class="mt-2 text-[11px] font-bold tracking-wider text-[#003366]">AUTONOMOUS INSTITUTION | ${title}</p>
    </div>`;
}
function openPODoc(id) {
    const r = findReq(id); if (!r || !r.po) return;
    const d = DEPTS[r.dept], v = findVendor(r.po.vendor) || { name: r.po.vendor };
    const q = r.quotes.find(x => x.vendor === r.po.vendor) || {};
    const rate = r.total / r.qty;
    $('print-subtitle').textContent = 'PURCHASE ORDER';
    $('signoff-body').innerHTML = `
        ${letterhead('PURCHASE ORDER')}
        <h2 class="text-center text-base font-bold tracking-[0.3em] text-[#003366]">PURCHASE ORDER</h2>
        <div class="grid grid-cols-2 gap-4">
            <div class="border border-gray-300 rounded p-3">
                <p class="text-[10px] uppercase font-bold text-gray-500 mb-1">To (Vendor)</p>
                <p class="font-bold text-sm text-gray-900">${esc(v.name)}</p>
                ${v.city ? `<p>${esc(v.city)}</p>` : ''}
                <p>GSTIN: <span class="font-mono">${esc(v.gstin || 'Not on file')}</span></p>
                ${v.contact ? `<p>Attn: ${esc(v.contact)}${v.phone ? ' · ' + esc(v.phone) : ''}</p>` : ''}
                ${v.email ? `<p>${esc(v.email)}</p>` : ''}
            </div>
            <div class="border border-gray-300 rounded p-3 space-y-0.5">
                <p><strong>PO Number:</strong> <span class="font-mono">${esc(r.po.number)}</span></p>
                <p><strong>PO Date:</strong> ${fmtDate(r.po.issuedOn)}</p>
                <p><strong>Requisition:</strong> ${r.id}</p>
                <p><strong>Sanction Ref:</strong> ${refId(r)} (${fmtDate(r.sanctionDate)})</p>
                <p><strong>Deliver by:</strong> ${fmtDate(r.po.expectedDate)}</p>
            </div>
        </div>
        <div class="border border-gray-300 rounded p-3">
            <p class="text-[10px] uppercase font-bold text-gray-500 mb-1">Deliver To</p>
            <p>Department of ${d.name}, Sri Eshwar College of Engineering, Coimbatore, Tamil Nadu — Attn: ${esc(d.hod)}${d.hod.startsWith('HOD') ? '' : ' (HOD)'}</p>
        </div>
        <table class="w-full border border-gray-300">
            <tr class="bg-gray-50"><th class="p-2 border w-10">S.No</th><th class="p-2 border text-left">Description</th><th class="p-2 border">Qty</th><th class="p-2 border">Unit Rate</th><th class="p-2 border">Amount</th></tr>
            <tr><td class="p-2 border text-center">1</td>
                <td class="p-2 border">${esc(r.title)}<div class="text-[10px] text-gray-500 mt-1">${esc(r.spec)}</div></td>
                <td class="p-2 border text-center">${r.qty}</td>
                <td class="p-2 border text-right">${inr(rate.toFixed(2))}</td>
                <td class="p-2 border text-right font-semibold">${inr(r.total)}</td></tr>
            <tr><td colspan="4" class="p-2 border text-right font-bold">Total ${q.gst === false ? '(GST extra as applicable)' : '(inclusive of GST)'}</td><td class="p-2 border text-right font-bold">${inr(r.total)}</td></tr>
        </table>
        <p><strong>Amount in words:</strong> Rupees ${inWordsIN(r.total)} Only</p>
        <div>
            <p class="font-bold text-[#003366] uppercase text-[11px] mb-1">Terms & Conditions</p>
            <ol class="list-decimal pl-5 space-y-0.5">
                <li>Supply to be completed on or before ${fmtDate(r.po.expectedDate)} at the delivery address above.</li>
                <li>Warranty: ${esc(q.warranty || 'as per quotation')}, from the date of installation / acceptance.</li>
                <li>Items will be inspected by the department; payment within 30 days of verified receipt and invoice.</li>
                <li>Invoice must quote the PO number and the college GSTIN, with a copy of this order.</li>
                <li>Supply is as per your quotation compared under requisition ${r.id}.</li>
            </ol>
        </div>
        <div class="grid grid-cols-2 gap-6 pt-8">
            <div class="text-center border-t border-gray-400 pt-1"><p class="font-semibold">${PURCHASE_OFFICER}</p><p class="text-[10px] text-gray-500">Purchase Officer</p></div>
            <div class="text-center border-t border-gray-400 pt-1"><p class="font-semibold">Principal</p><p class="text-[10px] text-gray-500">Authorised Signatory</p></div>
        </div>
        <p class="text-[10px] text-gray-400 border-t pt-3">System-generated purchase order from the SECE Centralized Procurement Hub. Generated on ${fmtDate(TODAY)}.</p>`;
    openModal('signoff-modal');
}

/* =========================================================
   INIT
   ========================================================= */
document.addEventListener('keydown', e => {
    if (e.key !== 'Escape' || !$('login-screen').classList.contains('hidden')) return;
    if (!$('notif-drawer').classList.contains('hidden')) { toggleNotifications(); return; }
    for (const id of ['note-modal', 'signoff-modal', 'detail-modal']) if (!$(id).classList.contains('hidden')) { closeModal(id); return; }
});
['detail-modal', 'signoff-modal', 'note-modal'].forEach(id => $(id).addEventListener('click', e => { if (e.target.id === id) closeModal(id); }));

state = load();
USERS = buildUsers();
const sessionUser = currentUser();
if (sessionUser) applyUser(sessionUser);
$('user-switcher').innerHTML = accountOptions(state.userId);
setRole(state.role, true);
switchTab('dashboard');
if (!sessionUser) showLogin();
