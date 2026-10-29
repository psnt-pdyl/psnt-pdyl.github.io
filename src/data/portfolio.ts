// All portfolio content. Each project's `skills` list drives its chips, the skill filter and the skills matrix.
//
// HOW TO ADD A FIGURE: put the image in src/assets/img/ and replace a placeholder figure
//   { placeholder: 'Converted electric jeep', caption: '...' }
// with
//   { src: 'img/your-file.png', alt: 'short description', caption: '...' }

export type CatKey = 'academic' | 'professional' | 'other';

// Keys are used in each project's `skills`.
export const SKILLS: [group: string, skills: [key: string, label: string][]][] = [
	['Methods', [
		['lstm', 'LSTM / time-series deep learning'],
		['pinn', 'Physics-informed ML'],
		['gnn', 'Graph neural networks'],
		['vision', 'Computer vision'],
		['xai', 'Explainable AI (attention, Grad-CAM)'],
		['forecast', 'Load forecasting'],
		['scenario', 'Scenario modelling'],
		['evmodel', 'EV energy modelling'],
		['dynamics', 'Kinematics & dynamics'],
		['turbo', 'Hydro turbines & pumps'],
		['evconv', 'EV powertrain conversion'],
		['evinfra', 'EV charging infrastructure'],
		['wind', 'Wind turbine aerodynamics'],
		['cfd', 'CFD simulation'],
		['mechdesign', 'Mechanical design'],
		['hvac', 'HVAC design (ASHRAE)'],
	]],
	['Software', [
		['python', 'Python'],
		['pytorch', 'PyTorch'],
		['pandas', 'pandas'],
		['numpy', 'NumPy'],
		['matlab', 'MATLAB'],
		['ansys', 'ANSYS Fluent'],
		['solidworks', 'SolidWorks'],
		['autocad', 'AutoCAD'],
	]],
];

export const skillLabel: Record<string, string> = {};
export const isSoftware: Record<string, boolean> = {};
for (const [group, skills] of SKILLS) {
	for (const [key, label] of skills) {
		skillLabel[key] = label;
		if (group === 'Software') isSoftware[key] = true;
	}
}

/** `slug` is the URL segment: /projects/<slug>. */
export const CATS: { key: CatKey; slug: string; name: string; group: string }[] = [
	{ key: 'academic', slug: 'academic', name: 'Academic', group: 'Academic projects' },
	{ key: 'professional', slug: 'non-academic', name: 'Non-academic', group: 'Non-academic projects (work experience)' },
	{ key: 'other', slug: 'other', name: 'Other projects', group: 'Other projects' },
];

export const catName = Object.fromEntries(CATS.map((c) => [c.key, c.name])) as Record<CatKey, string>;

export type Fig =
	| { src: string; alt: string; caption: string; photo?: boolean }
	| { video: string; poster?: string; label: string; caption: string }
	| { placeholder: string; caption: string };

export interface Link {
	label: string;
	/** Leave out to show the link as "to add". */
	href?: string;
}

/** Display name for a project id: 'p1' → 'Project 1'. */
export const projectName = (id: string) => `Project ${id.slice(1)}`;

export interface Project {
	id: string;
	cat: CatKey;
	title: string;
	meta: string;
	description: string;
	cover?: string;
	fit?: 'contain' | 'cover';
	skills: string[];
	figures: Fig[];
	/** `value` may contain inline HTML such as <sub>. */
	results?: { value: string; label: string }[];
	links?: Link[];
}

export const PROJECTS: Project[] = [
	{
		id: 'p1',
		cat: 'academic',
		title: "Physics-informed hourly load forecasting for Nepal's national grid",
		meta: 'M.Sc. thesis · NAST & Pulchowk Campus · 2024–2026 · supervised by Asst. Prof. Sanjaya Neupane · external examiner from WECS',
		description:
			"A multi-stage pipeline that separates an economic baseline from new EV and cooking load, then forecasts hourly demand from three years of Load Dispatch Center data. An energy-conservation loss keeps each year's forecast consistent with its annual total, and a constrained four-output network recovers a cooking-only profile that grid data does not show.",
		cover: 'img/p1-daily-profile.png',
		fit: 'contain',
		skills: ['lstm', 'pinn', 'forecast', 'scenario', 'python', 'pytorch', 'pandas', 'numpy'],
		figures: [
			{ src: 'img/p1-workflow.png', alt: 'Five-stage workflow from input data through annual, hourly and cooking-load models to peak analysis', caption: 'Overall pipeline: annual baseline, physics-informed hourly model and cooking-load disaggregation.' },
			{ src: 'img/p1-annual-demand.png', alt: 'Stacked area chart of annual demand from 2001 to 2030 split into baseline, stove and EV energy', caption: 'Annual demand disaggregated into baseline, cooking and EV energy, forecast from 2025.' },
			{ src: 'img/p1-hourly-forecast.png', alt: 'Demand at 08:00 over four years, historical in blue and forecast in red', caption: 'Hourly model: demand at 08:00, history (blue) and recursive forecast (red).' },
			{ src: 'img/p1-cooking.png', alt: 'Learned cooking load decomposition and its hourly distribution', caption: 'Cooking load recovered from total load; it peaks at 19:30, at about 11% of grid load.' },
			{ src: 'img/p1-daily-profile.png', alt: 'Forecast daily load profile for 25 April 2027 with cooking layer on top of baseline plus EV', caption: 'Forecast day (25 Apr 2027): cooking lands on the evening peak.' },
			{ src: 'img/p1-peak.png', alt: 'Daily peak demand over the forecast year by season, maximum 2748.6 MW', caption: 'Daily peak demand across the forecast year; maximum 2,748.6 MW.' },
		],
		results: [
			{ value: '4.38%', label: 'MAPE on held-out 2021–25, vs 12.46% persistence and 33.18% ARIMA' },
			{ value: '28.74 TWh', label: 'national demand projected for 2030' },
			{ value: '2,748.61 MW', label: 'evening peak at 19:00' },
			{ value: '17–18%', label: 'of demand from transport & cooking' },
		],
		links: [
			{ label: 'Journal paper (accepted 2026)', href: '#pub1' },
			{ label: 'Paper PDF', href: 'papers/Sharma_Neupane_2026_Nepal_demand_forecasting.pdf' },
			{ label: 'M.Sc. thesis (TU repository)', href: 'https://hdl.handle.net/20.500.14540/26855' },
			{ label: 'Code' },
		],
	},
	{
		id: 'p2',
		cat: 'academic',
		title: 'Helical Bach-type Savonius wind turbine for water pumping',
		meta: 'B.E. final-year project · Pulchowk Campus & Center for Energy Studies · 2022–2023 · published 2025',
		description:
			'Designed a two-bladed helical Bach-type (modified Savonius) rotor, 0.7 m tall, in SolidWorks; built it and tested it in front of a fan in the lab; and simulated the flow in ANSYS Fluent with a rotating inner domain. Power and torque coefficients from the experiment and CFD were compared across tip speed ratios.',
		cover: 'img/be-streamlines.png',
		fit: 'cover',
		skills: ['wind', 'cfd', 'mechdesign', 'ansys', 'solidworks'],
		figures: [
			{ src: 'img/be-rotor-3d.png', alt: 'SolidWorks model of the two-bladed helical rotor', caption: 'Helical rotor designed in SolidWorks.' },
			{ src: 'img/be-test-setup.jpg', photo: true, alt: 'Fabricated rotor in a steel test frame facing a large fan in the lab', caption: 'Built rotor in the lab test rig, March 2023.' },
			{ src: 'img/be-geometry.png', alt: 'Rotor geometry inside the rotating and stationary flow domains', caption: 'CFD domain: rotating zone around the rotor.' },
			{ src: 'img/be-streamlines.png', alt: 'Streamlines around the rotor coloured by velocity with surface pressure', caption: 'Streamlines and surface pressure on the blades.' },
			{ src: 'img/be-velocity.png', alt: 'Velocity contour on a horizontal plane through the rotor', caption: 'Velocity field around the rotor.' },
			{ src: 'img/be-cp-tsr.png', alt: 'Power coefficient against tip speed ratio, experimental and CFD with fitted lines', caption: 'Power coefficient vs tip speed ratio: experiment and CFD.' },
		],
		results: [
			{ value: 'C<sub>p</sub> 0.114', label: 'power coefficient at 4 m/s' },
			{ value: '2.31 W', label: 'power at 4 m/s from a 0.7 m² rotor' },
			{ value: '1 m/s', label: 'wind speed at which the rotor starts turning' },
		],
		links: [
			{ label: 'Journal paper (2025)', href: '#pub5' },
			{ label: 'Read on ResearchGate', href: 'https://www.researchgate.net/publication/389736923' },
		],
	},
	{
		id: 'p3',
		cat: 'professional',
		title: 'Explainable visuomotor control for a small two-joint robot arm',
		meta: 'Robotics & machine learning · NAST Innovation Program · 2025 · team project, before the larger arm in Project 4',
		description:
			'A small 2-DOF arm on a Raspberry Pi 4, filmed by a wrist Pi Camera and a fixed webcam, learns to predict its next joint angles from images. A frozen ResNet-18 encodes both views, YOLOv8n finds the ball, and a 4-layer LSTM decodes the motion. A cross-attention layer in which the motor state queries the visual features shows where in the image each prediction looked: on the gripper and the ball, where the plain ResNet-LSTM spread its focus over the background.',
		cover: 'img/arm2dof-setup.jpg',
		fit: 'cover',
		skills: ['vision', 'xai', 'lstm', 'python'],
		figures: [
			{ src: 'img/arm2dof-setup.jpg', photo: true, alt: 'Small robot arm on a table with a ball, a target zone, a webcam, a wrist camera and a Raspberry Pi 4, joint angles marked', caption: 'Setup: 2-DOF arm, wrist Pi Camera and webcam, Raspberry Pi 4, ball and target.' },
			{ src: 'img/arm2dof-pipeline.jpg', alt: 'Pipeline: Pi Camera and webcam images through frozen ResNets, ball coordinates and motor angles through encoders, fused by multi-head cross-attention into an LSTM and output head', caption: 'Pipeline: two camera views, ball position and motor state fused by cross-attention before the LSTM.' },
			{ src: 'img/arm2dof-cross-attention.jpg', alt: 'Cross-attention block: fused image and ball features as key and value, motor embedding as query', caption: 'Cross-attention: the motor state is the query; image and ball features are keys and values.' },
			{ src: 'img/arm2dof-yolo.jpg', photo: true, alt: 'Camera frame of the arm with a detected red ball in a bounding box', caption: 'YOLOv8n ball detection (mAP@0.5 = 0.992).' },
			{ src: 'img/arm2dof-feature-importance.jpg', alt: 'Five frames with baseline ResNet feature maps spread over the image and cross-attention maps concentrated on the arm and ball', caption: 'Five frames: baseline features spread over the background (middle); cross-attention concentrates on the arm and ball (bottom).' },
			{ src: 'img/arm2dof-gradcam.jpg', alt: 'Grad-CAM maps for three frames, baseline versus cross-attention', caption: 'Grad-CAM: the cross-attention model focuses on the gripper and ball.' },
		],
		results: [
			{ value: 'MAE &lt; 0.03', label: 'on every joint, with cross-attention added' },
			{ value: 'R<sup>2</sup> 0.98–0.99', label: 'on joints 1 and 3 (joint 2: 0.92)' },
			{ value: '0.992', label: 'mAP@0.5 of the YOLOv8n ball detector' },
		],
		links: [{ label: 'Preprint (TechRxiv, 2025)', href: '#pub6' }],
	},
	{
		id: 'p4',
		cat: 'professional',
		title: 'Robot arm cells driven by graph and physics-informed networks',
		meta: 'Robotics & machine learning · 2025–2026',
		description:
			'Simulated 3- and 5-joint arms that find a part by camera and drop it in a bin. A graph neural network solves inverse kinematics (choosing the least-torque pose for the redundant 5-joint arm), a vision network locates the part, and a PINN shapes each move for low motor effort using Newton–Euler dynamics. A physical arm on a wheeled base was also built with teammates.',
		cover: 'img/arm-hardware-2.jpg',
		fit: 'cover',
		skills: ['gnn', 'pinn', 'vision', 'dynamics', 'python', 'pytorch', 'numpy'],
		figures: [
			{ video: 'img/arm3-compare.mp4', poster: 'img/p8-sim.jpg', label: 'Three-joint arm: three PINNs running the same pick-and-bin cycle side by side', caption: 'Three-joint arm: three motion PINNs on the same pick-and-bin cycle.' },
			{ video: 'img/arm5-pick-drop.mp4', label: 'Five-joint arm picking a part and dropping it in a bin', caption: 'Five-joint arm: least-torque poses from the GNN, pick and drop.' },
			{ src: 'img/p8-gnn-training.png', alt: 'GNN training curves for gripper position error, tool angle error and loss', caption: 'GNN inverse-kinematics training: position error, angle error and loss.' },
			{ src: 'img/p8-pinn-move.png', alt: 'Joint angle and torque curves for shoulder, elbow and wrist during a move', caption: 'PINN move: joint angles and torques against motor limits.' },
			{ src: 'img/arm-hardware-2.jpg', photo: true, alt: 'Team holding the physical robot arm mounted on a wheeled base', caption: 'Physical arm prototype with the team, December 2025.' },
			{ src: 'img/arm-hardware-1.jpg', photo: true, alt: 'Physical robot arm on a wheeled base being demonstrated', caption: 'Arm on its wheeled base during a demonstration.' },
		],
		links: [
			{ label: 'Code: 3-joint arm', href: 'https://github.com/psnt-pdyl/roboticarm_3joints' },
			{ label: 'Code: 5-joint arm', href: 'https://github.com/psnt-pdyl/roboticarm_5joints' },
			{ label: 'Live demo: 3-joint arm', href: 'https://psnt-pdyl.github.io/roboticarm_3joints/' },
			{ label: 'Live demo: 5-joint arm', href: 'https://psnt-pdyl.github.io/roboticarm_5joints/' },
		],
	},
	{
		id: 'p5',
		cat: 'professional',
		title: "Multivariate LSTM for Nepal's net-zero demand and generation gap",
		meta: 'NAST · 2025 · with R. Pandey',
		description:
			'A multivariate LSTM trained on 2001–2021 socio-economic and consumption data gives a business-as-usual baseline; sigmoid adoption curves add EV and induction-cooking demand under NDC targets, and the total is compared with planned generation. Its limits (annual-only output, policy jumps treated as growth) led directly to the design of Project 1.',
		cover: 'img/p3-total.png',
		fit: 'contain',
		skills: ['lstm', 'forecast', 'scenario', 'python', 'pandas'],
		figures: [
			{ src: 'img/p3-baseline.png', alt: 'Historical demand and LSTM business-as-usual forecast saturating near 16 TWh', caption: 'LSTM business-as-usual baseline: growth flattens after 2035.' },
			{ src: 'img/p3-ev-sigmoid.png', alt: 'Sigmoid curve of EV electricity demand from 2024 to 2045', caption: 'EV demand: sigmoid adoption to full electrification by 2045.' },
			{ src: 'img/p3-cooking-sigmoid.png', alt: 'Sigmoid curve of electric cooking demand from 2024 to 2050', caption: 'Electric cooking demand: sigmoid adoption to 2050.' },
			{ src: 'img/p3-total.png', alt: 'Historical demand, baseline forecast and total forecast with EV and cooking to 2045', caption: 'Total demand with EV and cooking pulls away from the baseline.' },
		],
		results: [
			{ value: '14,690 GWh', label: 'business-as-usual demand in 2030' },
			{ value: '16,270 GWh', label: 'with EV and cooking electrification, 2030' },
			{ value: '15,000 MW', label: 'NDC generation target for 2030, vs 3,591 MW installed' },
		],
		links: [
			{ label: 'Conference paper (accepted 2025)', href: '#pub2' },
			{ label: 'Paper PDF', href: 'papers/Pandey_Sharma_2025_net_zero_Nepal.pdf' },
		],
	},
	{
		id: 'p6',
		cat: 'professional',
		title: 'Petrol-to-electric jeep conversion',
		meta: 'Nepal Academy of Science and Technology · 2024–2025',
		description: 'Led the conversion of a petrol-powered jeep into an electric jeep.',
		skills: ['evconv', 'mechdesign'],
		figures: [
			{ placeholder: 'Jeep before conversion / during the work', caption: 'Powertrain conversion in progress.' },
			{ placeholder: 'Converted electric jeep', caption: 'The finished electric jeep.' },
		],
		links: [{ label: 'News / NAST report' }],
	},
	{
		id: 'p7',
		cat: 'professional',
		title: 'Integrated turbine-pump systems',
		meta: 'Mechanical Engineer, aQysta · 2023–2024',
		description:
			'Took water-powered turbine-pump systems from 2D/3D design through component analysis, manufacture and on-site installation, and contributed to R&D on a higher-power version.',
		skills: ['turbo', 'mechdesign', 'solidworks', 'autocad'],
		figures: [
			{ placeholder: 'CAD model / render', caption: '3D model in SolidWorks.' },
			{ placeholder: 'Installed system on site', caption: 'Field installation.' },
		],
		links: [{ label: 'Company / project page' }],
	},
	{
		id: 'p8',
		cat: 'professional',
		title: 'Complete HVAC design for a hotel',
		meta: 'HVAC Design Intern, C-Zone HVAC · 2022',
		description:
			'Independently designed a full system, from heating and cooling load calculation to ASHRAE-standard equipment selection, layout drawings and procurement schedules.',
		cover: 'img/hvac-restaurant.png',
		fit: 'cover',
		skills: ['hvac', 'autocad'],
		figures: [
			{ src: 'img/hvac-floor.png', alt: "AutoCAD HVAC layout of the hotel's second floor with rooms, units and piping", caption: 'Second-floor guest rooms: units and piping layout.' },
			{ src: 'img/hvac-restaurant.png', alt: 'AutoCAD HVAC layout of the restaurant floor with dining, bar and buffet areas', caption: 'Restaurant floor: dining, bar and buffet areas.' },
		],
		links: [{ label: 'Internship certificate' }],
	},
	{
		id: 'p9',
		cat: 'other',
		title: 'Energy consumption and driving range of electric vehicles',
		meta: 'With Dr. Bishal Silwal, Kathmandu University · 2023–2024',
		description:
			'A MATLAB vehicle model showing that the same car and battery give very different ranges across drive cycles. The lesson that totals hide the pattern of use runs through all my later work.',
		cover: 'img/p3-simulink.png',
		fit: 'contain',
		skills: ['evmodel', 'matlab'],
		figures: [
			{ src: 'img/p3-method.png', alt: 'Methodology: standard, Nepali semi-urban and urban drive cycles feed a Simulink model for validation and range estimation', caption: 'Study method: standard and Nepali drive cycles into a Simulink EV model.' },
			{ src: 'img/p3-simulink.png', alt: 'EV powertrain loop: driver, FOC, inverter, PMSM, battery and vehicle model', caption: 'Simulink EV powertrain: driver, field-oriented control, inverter, PMSM and vehicle model.' },
			{ src: 'img/p3-nepal-cycle.png', alt: 'Velocity over time for a real-world Nepali city drive cycle', caption: 'Real-world Nepali urban drive cycle recorded for the study.' },
		],
		links: [{ label: 'IEEE Xplore (DOI)', href: 'https://doi.org/10.1109/SEFET61574.2024.10718266' }],
	},
	{
		id: 'p10',
		cat: 'other',
		title: 'Electrified vs diesel-powered tractor',
		meta: 'Collaborative study · 2024',
		description: 'A comparative analysis of an electrified tractor against a diesel-powered one for agricultural use.',
		cover: 'img/p4-economics.png',
		fit: 'contain',
		skills: ['evmodel', 'matlab'],
		figures: [
			{ src: 'img/p4-velocity.png', alt: 'Achieved versus reference velocity of the electric tractor model', caption: 'Electric tractor model tracking the reference velocity.' },
			{ src: 'img/p4-battery.png', alt: 'Battery state of charge falling over a 60-second run', caption: 'Battery consumption over the test cycle.' },
			{ src: 'img/p4-economics.png', alt: 'Bar chart of fuel and maintenance cost in NPR, diesel far higher than electric', caption: 'Fuel and maintenance cost: diesel vs electric (NPR).' },
		],
		links: [{ label: 'Journal article', href: 'https://li01.tci-thaijo.org/index.php/TSAEJ/article/view/262801' }],
	},
	{
		id: 'p11',
		cat: 'other',
		title: 'Solar-powered vending cart and e-cargo kart',
		meta: 'Product design · 2024',
		description:
			'Designed a mobile vending cart and a pedal-electric cargo kart with a roof-mounted solar panel, from frame design to rendered concepts.',
		cover: 'img/p9-kart.jpg',
		fit: 'cover',
		skills: ['mechdesign', 'solidworks'],
		figures: [
			{ src: 'img/p9-kart.jpg', photo: true, alt: 'Rendered e-cargo kart with solar roof and front cargo box', caption: 'E-cargo kart with solar roof.' },
			{ src: 'img/p9-cart.jpg', photo: true, alt: 'Rendered vending cart with shelves and canopy', caption: 'Vending cart concept.' },
			{ src: 'img/p9-frame.png', alt: 'SolidWorks frame model of the cart with dimensions', caption: 'Cart frame in SolidWorks.' },
		],
	},
	{
		id: 'p12',
		cat: 'other',
		title: 'EV charging station layout',
		meta: 'Design study · 2024',
		description: 'Modelled an EV charging site with charger bays for cars, vans and buses, sized and laid out on a real plot.',
		cover: 'img/p10-site.jpg',
		fit: 'cover',
		skills: ['evinfra', 'mechdesign', 'solidworks'],
		figures: [
			{ src: 'img/p10-site.jpg', photo: true, alt: 'Rendered site layout with car, van and bus charging bays', caption: 'Site layout with car, van and bus bays.' },
			{ src: 'img/p10-bus.jpg', photo: true, alt: 'Two electric buses at a covered charger', caption: 'Bus charging bay.' },
			{ src: 'img/p10-chargers.jpg', photo: true, alt: 'Covered dual charger unit', caption: 'Charger canopy and units.' },
		],
	},
];

export interface Publication {
	id: string;
	/** May contain <b> around the author's own name. */
	authors: string;
	title: string;
	venue: string;
	/** Text after the venue, e.g. ", 2026." */
	rest: string;
	accepted?: boolean;
	/** Not peer reviewed, e.g. TechRxiv. */
	preprint?: boolean;
	/** Related project id, shown first as a "Project N" pill with a hover preview. */
	project?: string;
	links: Link[];
}

export const PUBLICATIONS: Publication[] = [
	{
		id: 'pub1',
		authors: '<b>P. P. Sharma</b> and S. Neupane.',
		title: "Forecasting Nepal's electricity demand under transport and cooking electrification using deep learning.",
		venue: 'Journal of Innovations in Engineering Education',
		rest: ', 2026.',
		accepted: true,
		project: 'p1',
		links: [
			{ label: 'Paper PDF', href: 'papers/Sharma_Neupane_2026_Nepal_demand_forecasting.pdf' },
		],
	},
	{
		id: 'pub6',
		authors: 'B. Chand, S. Gaire, <b>P. Paudyal</b>, K. Rasaili, R. Pandey and I. Bajracharya.',
		title: 'Cross-attention for explainable visuomotor prediction in robotic manipulation.',
		venue: 'TechRxiv',
		rest: ', December 2025.',
		preprint: true,
		project: 'p3',
		links: [
			{ label: 'doi:10.36227/techrxiv.176704503.34542562/v1', href: 'https://doi.org/10.36227/techrxiv.176704503.34542562/v1' },
		],
	},
	{
		id: 'pub2',
		authors: 'R. Pandey and <b>P. P. Sharma</b>.',
		title: 'Electrification and net-zero transition in Nepal: bridging the gap between demand and generation using multivariate LSTM.',
		venue: 'Int. Conf. on Energy Efficiency, Conservation and Transition for Achieving Net Zero and SDGs',
		rest: ', Kerala, India, 2025.',
		accepted: true,
		project: 'p5',
		links: [
			{ label: 'Paper PDF', href: 'papers/Pandey_Sharma_2025_net_zero_Nepal.pdf' },
		],
	},
	{
		id: 'pub5',
		authors: 'S. R. Shakya, B. Chaulagain, S. Poudel, <b>P. Sharma Poudel</b>, T. R. Subedi, S. Subedi and J. K. Sah.',
		title: 'Computation and experimental analysis of helical Bach-type Savonius wind turbine for water pumping application.',
		venue: 'Journal of the Institute of Engineering',
		rest: ', 18(1), 94–101, 2025.',
		project: 'p2',
		links: [
			{ label: 'Read on ResearchGate', href: 'https://www.researchgate.net/publication/389736923' },
		],
	},
	{
		id: 'pub3',
		authors: '<b>P. P. Sharma</b>, A. Karki, O. Lakhey and B. Silwal.',
		title: 'Comparative analysis of energy consumption and driving range of electric vehicles.',
		venue: 'IEEE 4th Int. Conf. on Sustainable Energy and Future Electric Transportation (SEFET)',
		rest: ', Hyderabad, 2024, pp. 1–6.',
		project: 'p9',
		links: [
			{ label: 'doi:10.1109/SEFET61574.2024.10718266', href: 'https://doi.org/10.1109/SEFET61574.2024.10718266' },
		],
	},
	{
		id: 'pub4',
		authors: 'A. Karki, B. Shrestha, <b>P. P. Sharma</b>, D. Tuladhar and S. Basnet.',
		title: 'Comparative analysis between electrified tractor and diesel-powered tractor.',
		venue: 'Journal of the Thai Society of Agricultural Engineering',
		rest: ', 30(1), 37–41, 2024.',
		project: 'p10',
		links: [
			{ label: 'Read article', href: 'https://li01.tci-thaijo.org/index.php/TSAEJ/article/view/262801' },
		],
	},
];

export interface Certificate {
	title: string;
	issuer: string;
	/** Scan of the certificate in public/img/. Certificates without one are listed as text. */
	src?: string;
	alt?: string;
}

export const CERTIFICATES: Certificate[] = [
	{
		title: 'Energy audit training for young engineers',
		issuer: 'Center for Energy Studies, IOE & AEPC · July 2023',
		src: 'img/cert-energy-audit.jpg',
		alt: 'Certificate: Energy audit training for young engineers, Center for Energy Studies, July 2023',
	},
	{
		title: 'Detailed Feasibility Study (DFS) for Solar PV Systems',
		issuer: 'Center for Energy Studies · TEA-LP',
		src: 'img/cert-dfs-solar.jpg',
		alt: 'Certificate: Professional training on Detailed Feasibility Study for Solar PV Systems',
	},
	{
		title: 'Solar PV mini-grid design & hybrid solar + hydro',
		issuer: 'Alliance for Rural Electrification, CES & GSES',
		src: 'img/cert-minigrid.jpg',
		alt: 'Training certificate: Solar PV mini-grid system design and hybrid solar plus hydro mini-grid design',
	},
	{ title: 'HOMER Pro Training', issuer: 'CES' },
	{ title: 'Research Methodology Scholar', issuer: 'CES & UGC' },
];
