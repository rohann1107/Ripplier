import type { Topic, Category, Difficulty } from '../types';

let _id = 0;
function seeds(category: Category, difficulty: Difficulty, titles: string[]): Topic[] {
  return titles.map((title) => ({
    id: `s-${++_id}`,
    title,
    category,
    difficulty,
    tags: [category.toLowerCase().replace(/\s+/g, '-')],
  }));
}

export const CATEGORIES = [
  'All',
  'Psychology',
  'Philosophy',
  'Human Behaviour',
  'Economics',
  'Productivity',
  'Communication',
  'Science',
  'AI',
] as const;

export const TOPICS: Topic[] = [
  // ═══════════════════════════════════════
  // PSYCHOLOGY (120 subtopics)
  // ═══════════════════════════════════════
  ...seeds('Psychology', 'Medium', [
    'Halo Effect', 'Confirmation Bias', 'Cognitive Dissonance', 'Dunning–Kruger Effect', 
    'Stockholm Syndrome', 'Impostor Syndrome', 'Decision Fatigue', 'Learned Helplessness', 
    'Projection', 'Anchoring Bias', 'In-Group Favoritism', 'Out-Group Homogeneity Effect', 
    'Self-Serving Bias', 'Actor-Observer Bias', 'Fundamental Attribution Error', 'Just-World Hypothesis', 
    'Hindsight Bias', 'Availability Heuristic', 'Representativeness Heuristic', 'Affect Heuristic', 
    'Optimism Bias', 'Pessimism Bias', 'Status Quo Bias', 'Loss Aversion', 
    'Endowment Effect', 'Framing Effect', 'Sunk Cost Fallacy', 'Decoy Effect', 
    'Barnum Effect', 'Placebo Effect', 'Nocebo Effect', 'Rosenthal Effect', 
    'Pygmalion Effect', 'Hawthorne Effect', 'Zeigarnik Effect', 'Ovsiankina Effect', 
    'Ringelmann Effect', 'Bystander Effect', 'Social Loafing', 'Social Facilitation', 
    'Deindividuation', 'Group Polarization', 'Groupthink', 'Cognitive Overload', 
    'Yerkes-Dodson Law', 'Hebb\'s Rule', 'Neuroplasticity', 'Dual-Process Theory', 
    'Cognitive Map', 'Working Memory Limit', 'Priming Effect', 'Spacing Effect', 
    'Testing Effect', 'Serial Position Effect', 'Von Restorff Effect', 'Stroop Effect', 
    'Flanker Task', 'Simon Effect', 'Negativity Bias', 'Positivity Effect', 
    'Pollyanna Principle', 'Peak-End Rule', 'Duration Neglect', 'Impact Bias', 
    'Focalism', 'Immune Neglect', 'Hedonic Adaptation', 'Set Point Theory', 
    'Drive Reduction Theory', 'Arousal Theory', 'Maslow\'s Hierarchy', 'ERG Theory', 
    'Two-Factor Theory', 'Self-Determination Theory', 'Expectancy Theory', 'Equity Theory', 
    'Goal-Setting Theory', 'Reinforcement Theory', 'Social Cognitive Theory', 'Observational Learning', 
    'Mirror Neurons', 'Theory of Mind', 'Mentalizing', 'Empathy-Altruism Hypothesis', 
    'Bystander Intervention', 'Pluralistic Ignorance', 'Diffusion of Responsibility', 'Social Exchange Theory', 
    'Attachment Theory', 'Strange Situation', 'Internal Working Models', 'Erikson\'s Stages', 
    'Piaget\'s Stages', 'Vygotsky\'s Scaffolding', 'Zone of Proximal Development', 'Kohlberg\'s Stages', 
    'Gilligan\'s Ethics', 'Marcia\'s Identity Statuses', 'Bronfenbrenner\'s Systems', 'Fetal Programming', 
    'Epigenetics', 'Gene-Environment Interaction', 'Diathesis-Stress Model', 'Differential Susceptibility', 
    'Sensory Processing Sensitivity', 'Big Five Traits', 'HEXACO Model', 'Dark Triad', 
    'Myers-Briggs Limitations', 'Locus of Control', 'Self-Efficacy', 'Self-Esteem Stability', 
    'Sociometer Theory', 'Terror Management Theory', 'Self-Discrepancy Theory', 'Regulatory Focus Theory', 
    'Self-Handicapping', 'Self-Monitoring', 'Impulse Control', 'Delay of Gratification'
  ]),

  // ═══════════════════════════════════════
  // PHILOSOPHY (120 subtopics)
  // ═══════════════════════════════════════
  ...seeds('Philosophy', 'Hard', [
    'Ship of Theseus', 'Hedonic Treadmill', 'Existentialism', 'Stoicism', 
    'Nihilism', 'Absurdism', 'Free Will', 'Determinism', 
    'Pascal\'s Wager', 'Occam\'s Razor', 'Solipsism', 'Epistemology', 
    'Metaphysics', 'Ontology', 'Phenomenology', 'Hermeneutics', 
    'Deconstruction', 'Postmodernism', 'Structuralism', 'Post-Structuralism', 
    'Utilitarianism', 'Deontology', 'Virtue Ethics', 'Categorical Imperative', 
    'Social Contract Theory', 'State of Nature', 'Leviathan', 'Tabula Rasa', 
    'Rationalism', 'Empiricism', 'Skepticism', 'Pragmatism', 
    'Logical Positivism', 'Falsificationism', 'Paradigm Shift', 'Scientific Realism', 
    'Instrumentalism', 'Mind-Body Dualism', 'Physicalism', 'Functionalism', 
    'Panpsychism', 'Eudaimonia', 'The Golden Mean', 'Platonic Realism', 
    'Allegory of the Cave', 'Theory of Forms', 'Socratic Irony', 'Dialectic Method', 
    'Hegelian Dialectic', 'Historical Materialism', 'Alienation of Labor', 'Will to Power', 
    'Eternal Recurrence', 'Ubermensch', 'Bad Faith', 'Being-in-the-World', 
    'Existential Dread', 'The Myth of Sisyphus', 'Pascal\'s Wager', 'Problem of Evil', 
    'Theodicy', 'Free Will Defense', 'Simulation Hypothesis', 'Anthropic Principle', 
    'Fermi Paradox', 'Doomsday Argument', 'Newcomb\'s Paradox', 'Sleeping Beauty Problem', 
    'Trolley Problem', 'Fat Man Loop', 'Surgeon Paradox', 'Violinist Argument', 
    'Experience Machine', 'Utility Monster', 'Rawlsian Veil of Ignorance', 'Difference Principle', 
    'Nozick\'s Entitlement Theory', 'Lockean Proviso', 'Tragedy of the Commons', 'Prisoner\'s Dilemma', 
    'Nash Equilibrium', 'Pareto Efficiency', 'Kaldor-Hicks Efficiency', 'Arrow\'s Impossibility Theorem', 
    'Condorcet Paradox', 'Zeno\'s Dichotomy Paradox', 'Achilles and Tortoise', 'Arrow Paradox', 
    'Sorites Paradox', 'Liar Paradox', 'Russell\'s Paradox', 'Grelling-Nelson Paradox', 
    'Barber Paradox', 'Grandfather Paradox', 'Bootstrap Paradox', 'Predestination Paradox', 
    'Twin Paradox', 'Schrodinger\'s Cat', 'Wigner\'s Friend', 'EPR Paradox', 
    'Bell\'s Theorem', 'Chinese Room Argument', 'Mary\'s Room Thought Experiment', 'Philosophical Zombie', 
    'Swampman', 'Teleportation Paradox', 'Split-Brain Scenario', 'Bundle Theory of Self', 
    'Narrative Self', 'Substance Dualism', 'Property Dualism', 'Epiphenomenalism', 
    'Eliminative Materialism', 'Behaviorism', 'Identity Theory of Mind', 'Computationalism'
  ]),

  // ═══════════════════════════════════════
  // HUMAN BEHAVIOUR (120 subtopics)
  // ═══════════════════════════════════════
  ...seeds('Human Behaviour', 'Medium', [
    'Social Proof', 'Reciprocity', 'Scarcity Principle', 'Groupthink', 
    'Emotional Contagion', 'Herd Mentality', 'Tribalism', 'Status Signalling', 
    'Reciprocity Bias', 'First Impression Bias', 'Dunbar\'s Number', 'Social Identity Theory', 
    'Minimal Group Paradigm', 'Outgroup Derogation', 'In-group Bias', 'System Justification Theory', 
    'Social Dominance Orientation', 'Right-Wing Authoritarianism', 'Belief in a Just World', 'Scapegoating', 
    'Prosocial Behavior', 'Altruism Heuristic', 'Kin Selection', 'Reciprocal Altruism', 
    'Indirect Reciprocity', 'Competitive Altruism', 'Costly Signaling Theory', 'Conspicuous Consumption', 
    'Virtue Signaling', 'Moral Grandstanding', 'Outrage Culture', 'Cancel Culture Dynamics', 
    'Call-out Culture', 'Victimhood Culture', 'Honor Culture', 'Dignity Culture', 
    'Face Saving', 'Impression Management', 'Dramaturgical Perspective', 'Front Stage Back Stage', 
    'Self-Presentation Theory', 'Looking-Glass Self', 'Symbolic Interactionism', 'Social Construction of Reality', 
    'Ethnomethodology', 'Breaching Experiments', 'Conversation Analysis', 'Turn-Taking Mechanics', 
    'Politeness Theory', 'Face-Threatening Acts', 'Social Penetration Theory', 'Breadth and Depth', 
    'Self-Disclosure Dynamics', 'Relationship Stages Model', 'Relationship Dissolution Model', 'Attachment Styles', 
    'Secure Attachment', 'Anxious Attachment', 'Avoidant Attachment', 'Fearful Attachment', 
    'Love Languages', 'Triangular Theory of Love', 'Compassionate vs Passionate Love', 'Mate Selection Heuristics', 
    'Assortative Mating', 'Evolutionary Psychology of Attraction', 'Parental Investment Theory', 'Sexual Strategies Theory', 
    'Intrasequential Competition', 'Intersequential Choice', 'Social Comparison Theory', 'Upward Comparison', 
    'Downward Comparison', 'Self-Evaluation Maintenance Model', 'Basking in Reflected Glory', 'Cutting Off Reflected Failure', 
    'Optimal Distinctiveness Theory', 'Social Inclusion Need', 'Ostracism Effects', 'Cyberball Paradigm', 
    'Rejection Sensitivity', 'Loneliness Epidemic', 'Para-social Relationships', 'Celebrity Worship Syndrome', 
    'Fandom Psychology', 'Subculture Identification', 'Counterculture Movements', 'Deindividuation Dynamics', 
    'Crowd Psychology', 'Contagion Theory', 'Convergence Theory', 'Emergent Norm Theory', 
    'Social Movements Lifecycle', 'Relative Deprivation Theory', 'Resource Mobilization Theory', 'Political Opportunity Structure', 
    'Frame Alignment', 'Collective Action Dilemma', 'Free Rider Problem', 'Selective Incentives', 
    'Social Norms Enforcement', 'Altruistic Punishment', 'Third-Party Punishment', 'Peer Pressure Mechanics', 
    'Conformity Studies', 'Asch Paradigm', 'Obedience to Authority', 'Milgram Paradigm', 
    'Stanford Prison Experiment Lessons', 'Lucifer Effect', 'Banality of Evil', 'Agentic State', 
    'Role Playing Impact', 'Cognitive Dissonance Resolution', 'Spillover Effects', 'Foot-in-the-Door Technique'
  ]),

  // ═══════════════════════════════════════
  // ECONOMICS (120 subtopics)
  // ═══════════════════════════════════════
  ...seeds('Economics', 'Hard', [
    'Opportunity Cost', 'Sunk Cost Fallacy', 'Pareto Principle', 'Network Effect', 
    'Comparative Advantage', 'Inflation Psychology', 'Black Swan Event', 'Tragedy of Commons', 
    'Game Theory', 'Prisoner\'s Dilemma', 'Nash Equilibrium', 'Bounded Rationality', 
    'Prospect Theory', 'Loss Aversion', 'Mental Accounting', 'Nudge Theory', 
    'Choice Architecture', 'Default Bias', 'Hyperbolic Discounting', 'Present Bias', 
    'Temporal Discounting', 'Asymmetric Information', 'Adverse Selection', 'Moral Hazard', 
    'Principal-Agent Problem', 'Signaling Theory', 'Screening Theory', 'Market Failure', 
    'Externalities', 'Pigouvian Tax', 'Coase Theorem', 'Public Goods', 
    'Club Goods', 'Common-Pool Resources', 'Free Rider Problem', 'Rent Seeking', 
    'Regulatory Capture', 'Public Choice Theory', 'Median Voter Theorem', 'Arrow\'s Theorem', 
    'Monopoly Pricing', 'Oligopoly Behavior', 'Cartel Stability', 'Price Discrimination', 
    'Perfect Competition', 'Monopolistic Competition', 'Creative Destruction', 'Kondratiev Waves', 
    'Business Cycle Theories', 'Keynesian Multiplier', 'Liquidity Trap', 'Fiscal Policy', 
    'Monetary Policy', 'Quantitative Easing', 'Stagflation', 'Hyperinflation Dynamics', 
    'Deflationary Spiral', 'Phillips Curve Paradox', 'Natural Rate of Unemployment', 'Okun\'s Law', 
    'GDP Limitations', 'Gini Coefficient', 'Lorenz Curve', 'Purchasing Power Parity', 
    'Big Mac Index', 'Dutch Disease', 'Resource Curse', 'Tragedy of the Horizon', 
    'Carbon Tax Economics', 'Cap and Trade Systems', 'Circular Economy', 'Degrowth Theory', 
    'Malthusian Trap', 'Demographic Transition', 'Lewis Model', 'Solow-Swan Model', 
    'Endogenous Growth', 'Human Capital Theory', 'Labor Theory of Value', 'Marginal Utility Theory', 
    'Subjective Value Theory', 'Say\'s Law', 'Walras\'s Law', 'Efficient Market Hypothesis', 
    'Random Walk Theory', 'Behavioral Finance Biases', 'Market Sentiment', 'Speculative Bubbles', 
    'Tulip Mania Lessons', 'Dot-Com Bubble Dynamics', 'Subprime Crisis Mechanics', 'Moral Hazard in Bailouts', 
    'Too Big to Fail', 'Systemic Risk', 'Liquidity Crisis', 'Credit Crunch', 
    'Bank Run Dynamics', 'Fractional Reserve Banking', 'Fiat Money System', 'Modern Monetary Theory', 
    'Seigniorage', 'Cantillon Effect', 'Gresham\'s Law', 'Gibson\'s Paradox', 
    'Trilemma of International Finance', 'Capital Flight', 'Dutch Disease', 'Washington Consensus', 
    'Dependency Theory', 'World Systems Theory', 'Structural Adjustment Programs', 'Universal Basic Income Economics'
  ]),

  // ═══════════════════════════════════════
  // PRODUCTIVITY (120 subtopics)
  // ═══════════════════════════════════════
  ...seeds('Productivity', 'Medium', [
    'Parkinson\'s Law', 'Eisenhower Matrix', 'Deep Work', 'Flow State', 
    'Second Brain', 'Atomic Habits', 'Time Blocking', 'Cognitive Load', 
    'Decision Trees', 'Deliberate Practice', 'Pomodoro Technique', 'Ultradian Rhythms', 
    'Circadian Alignment', 'Energy Management', 'Getting Things Done Framework', 'Inbox Zero Philosophy', 
    'Kanban Boards', 'Scrum Framework', 'Agile Principles', 'Time Audits', 
    'Eat the Frog Rule', 'Two-Minute Rule', '5-Second Rule', 'Seinfeld Strategy', 
    'Habit Stacking', 'Implementation Intentions', 'Friction Optimization', 'Choice Minimalization', 
    'Digital Minimalism', 'Attention Economy Shielding', 'Cognitive Offloading', 'Zeigarnik Effect Mastery', 
    'Mental Models for Prioritization', '80/20 Rule Application', 'Impact vs Effort Matrix', 'MoSCoW Method', 
    'OKR Goal Setting', 'SMART Goals Critique', 'Systems vs Goals Philosophy', 'Focus Blocks', 
    'Batching Tasks', 'Context Switching Cost', 'Monotasking Benefits', 'Attention Span Training', 
    'Meditation Impact on Focus', 'Blue Light Impact', 'Sleep Hygiene for Performance', 'Power Naps Science', 
    'Active Recall', 'Spaced Repetition Systems', 'Leitner System', 'Feynman Technique', 
    'SQ3R Method', 'Mind Mapping', 'Speed Reading Limits', 'Skimming vs Deep Reading', 
    'Note-Taking Systems', 'Cornell Method', 'Zettelkasten Method', 'Knowledge Graphs', 
    'Personal Knowledge Management', 'Information Diet', 'Filter Bubble Bursting', 'Curiosity Gap Utilization', 
    'Procrastination Root Causes', 'Emotional Regulation of Tasks', 'Structured Procrastination', 'Akrasia', 
    'Willpower Exhaustion Myth', 'Ego Depletion Critique', 'Self-Compassion in Failure', 'Growth Mindset', 
    'Fixed Mindset Pitfalls', 'Locus of Control Shift', 'Internal vs External Motivation', 'Intrinsic Reward Design', 
    'Dopamine Detox Reality', 'Gamification of Work', 'Habitica Principle', 'Accountability Partners', 
    'Commitment Devices', 'Ulysses Contracts', 'Loss Aversion Bets', 'Social Incentives', 
    'Delegation Frameworks', 'Automation of Routine', 'No-Code Tools Lever', 'Outsourcing Low-Value Tasks', 
    'Decisive Meetings Rule', 'Silent Meetings Concept', 'Async Communication Shift', 'Deep Work Scheduling', 
    'Maker vs Manager Schedule', 'Chronotype Optimization', 'Lark vs Owl Performance', 'Sleep Debt Correction', 
    'Burnout Red Flags', 'Chronic Stress Cognitive Impact', 'Rest as a Productive Act', 'Active Recovery Methods'
  ]),

  // ═══════════════════════════════════════
  // COMMUNICATION (120 subtopics)
  // ═══════════════════════════════════════
  ...seeds('Communication', 'Medium', [
    'Active Listening', 'Socratic Questioning', 'Framing Effect', 'Nonviolent Communication', 
    'Mirroring', 'Storytelling', 'Ethos, Pathos, Logos', 'Silence as Communication', 
    'Persuasion Principles', 'First Principles Thinking', 'Mehrabian\'s Rule Myth', 'Nonverbal Leakage', 
    'Micro-expressions', 'Kinesics Dynamics', 'Proxemics Boundaries', 'Haptics Context', 
    'Vocalics Pitch Control', 'Paralanguage Cues', 'High-Context Cultures', 'Low-Context Cultures', 
    'Intercultural Communication Barriers', 'Ethnocentrism', 'Cultural Relativism in Conversation', ' Sapir-Whorf Hypothesis', 
    'Linguistic Relativity', 'Semantic Noise', 'Psychological Noise', 'Feedback Loops', 
    'Double-Loop Learning', 'Ladder of Inference', 'Thomas-Kilmann Conflict Modes', 'Interest-Based Bargaining', 
    'BATNA Principle', 'ZOPA Concept', 'Principled Negotiation', 'Win-Win Fallacy', 
    'Passive Aggressive Indicators', 'Assertiveness Training', 'DESC Scripting Technique', 'I-Statements', 
    'Johari Window', 'Social Penetration Stages', 'Relational Dialectics Theory', 'Coordinated Management of Meaning', 
    'Elaboration Likelihood Model', 'Central vs Peripheral Route', 'Inoculation Theory', 'Cognitive Dissonance in Persuasion', 
    'Reactance Theory', 'Social Judgment Theory', 'Anchor and Latitude', 'Assimilation and Contrast', 
    'Narrative Paradigm Theory', 'Coherence and Fidelity', 'Fisher\'s Narrative Logic', 'Dramatic Structure in Presentations', 
    'Hero\'s Journey in Branding', 'Pixar Pitch Formula', 'Hook-Book-Look-Took Structure', 'Information Chunking', 
    'Pyramid Principle', 'Minto Framework', 'SCQA Framework', 'Elevator Pitch Mechanics', 
    'PechaKucha Style', 'Death by PowerPoint Avoidance', 'Visual Hierarchy in Slides', 'Cognitive Theory of Multimedia', 
    'Dual Coding Theory', 'Audience Segmentation', 'Empathy Mapping', 'Persona Creation', 
    'Feedback Sandwich Critique', 'Radical Candor Model', 'SBI Feedback Tool', 'Appreciative Inquiry', 
    'Crucial Conversations Framework', 'Safety in Communication', 'Mutual Respect Maintenance', 'State Your Path Protocol', 
    'Difficult Conversations Prep', 'Reframing Techniques', 'Cognitive Restructuring for Speaking', 'Systematic Desensitization', 
    'Public Speaking Anxiety Causes', 'Impromptu Speaking Frameworks', 'PREP Framework', 'STAR Method', 
    'CAR Method', '5 Ws and H', 'Anecdote Loop Technique', 'Humor in Communication Theory', 
    'Benign Violation Theory', 'Rule of Three in Writing', 'Parallel Structure Power', 'Active vs Passive Voice'
  ]),

  // ═══════════════════════════════════════
  // SCIENCE (120 subtopics)
  // ═══════════════════════════════════════
  ...seeds('Science', 'Hard', [
    'Entropy', 'Butterfly Effect', 'Lindy Effect', 'Murphy\'s Law', 
    'Chaos Theory', 'Emergence', 'Antifragility', 'Occam\'s Razor', 
    'Hanlon\'s Razor', 'Fermi Estimation', 'Quantum Superposition', 'Quantum Entanglement', 
    'Wave-Particle Duality', 'Uncertainty Principle', 'Double-Slit Experiment', 'Many-Worlds Interpretation', 
    'Copenhagen Interpretation', 'Spacetime Curvature', 'Time Dilation', 'Gravitational Lensing', 
    'Event Horizon', 'Hawking Radiation', 'Dark Matter Evidence', 'Dark Energy Dynamics', 
    'Cosmic Microwave Background', 'Big Bang Nucleosynthesis', 'Stellar Evolution Lifecycle', 'Supernova Mechanics', 
    'Plate Tectonics Theory', 'Continental Drift Evidence', 'Carbon Cycle Balances', 'Greenhouse Effect Physics', 
    'Albedo Effect', 'Ocean Acidification Chemistry', 'Milankovitch Cycles', 'Ice Core Dating', 
    'Natural Selection Pillars', 'Genetic Drift Dynamics', 'Gene Flow Barriers', 'Epigenetic Inheritance', 
    'CRISPR Gene Editing', 'Recombinant DNA Technology', 'Polymerase Chain Reaction', 'DNA Sequencing Methods', 
    'Cellular Respiration Krebs Cycle', 'Photosynthesis Light Reactions', 'Endosymbiotic Theory', 'Cell Membrane Fluidity', 
    'Synaptic Transmission Chemistry', 'Action Potential Physics', 'Neurotransmitter Roles', 'Endocrine System Loops', 
    'Thermodynamics First Law', 'Thermodynamics Second Law', 'Thermodynamics Third Law', 'Zeroth Law Thermodynamics', 
    'Heat Transfer Mechanisms', 'Conduction Convection Radiation', 'Carnot Cycle Efficiency', 'Maxwell\'s Relations', 
    'Chemical Equilibrium Kinetics', 'Le Chatelier\'s Principle', 'Catalyst Mechanisms', 'Activation Energy Barrier', 
    'Acid-Base Theories', 'pH Scale Logarithm', 'Redox Reactions Chemistry', 'Electrochemical Cells', 
    'Periodic Table Trends', 'Electronegativity Gradient', 'Ionization Energy Peak', 'Atomic Radius Shift', 
    'Covalent vs Ionic Bonds', 'Hydrogen Bonding Force', 'Van der Waals Interactions', 'Polymer Chemistry Basics', 
    'Newton\'s First Law', 'Newton\'s Second Law', 'Newton\'s Third Law', 'Universal Gravitation Law', 
    'Conservation of Energy', 'Conservation of Momentum', 'Conservation of Angular Momentum', 'Fluid Dynamics Bernoulli', 
    'Viscosity Mechanics', 'Reynolds Number Scale', 'Turbulent vs Laminar Flow', 'Electromagnetic Spectrum Wave', 
    'Refraction Snell\'s Law', 'Diffraction Patterns', 'Interference Waves', 'Polarization Physics', 
    'Plate tectonics Evidence', 'Mendelian Genetics Principles', 'Dominant vs Recessive Inheritance', 'Punnett Square Utility', 
    'Sex-Linked Traits', 'Mitosis vs Meiosis Cells', 'Ecosystem Energy Flow', 'Trophic Levels Pyramid'
  ]),

  // ═══════════════════════════════════════
  // AI (120 subtopics)
  // ═══════════════════════════════════════
  ...seeds('AI', 'Hard', [
    'Prompt Engineering', 'AI Hallucinations', 'Alignment Problem', 'Context Windows', 
    'Fine-Tuning', 'Vector Embeddings', 'RAG', 'AI Agents', 
    'Tokenization', 'Chain of Thought', 'Neural Network Layers', 'Backpropagation Mechanics', 
    'Gradient Descent Optimization', 'Activation Functions Role', 'ReLU vs Sigmoid', 'Loss Functions Goal', 
    'Overfitting vs Underfitting', 'Regularization Techniques', 'Dropout Layer Purpose', 'Transformer Architecture', 
    'Self-Attention Mechanism', 'Multi-Head Attention Layers', 'Positional Encoding Shift', 'Encoder-Decoder Framework', 
    'Pre-training Paradigm', 'Unsupervised Learning Methods', 'Supervised Learning Limits', 'Reinforcement Learning Loops', 
    'Q-Learning Algorithm', 'Policy Gradient Optimization', 'RLHF Pipeline Steps', 'Reward Model Training', 
    'PPO Algorithm Basics', 'Direct Preference Optimization', 'Instruction Tuning Impact', 'Few-Shot Learning Power', 
    'Zero-Shot Capabilities', 'In-Context Learning Theory', 'Prompt Chaining Workflows', 'ReAct Agent Framework', 
    'Tool Use Integration', 'Function Calling Protocol', 'System Prompt Guidelines', 'Temperature Settings Output', 
    'Top-P Sampling Logic', 'Beam Search vs Greedy Decode', 'KV Cache Performance', 'FlashAttention Efficiency', 
    'Quantization Methods', 'Model Distillation Strategies', 'LoRA Fine-Tuning Steps', 'PEFT Architecture', 
    'Multimodal Models Vision', 'Audio Input Processing LLM', 'Diffusion Models Math', 'U-Net Architecture', 
    'Latent Diffusion Magic', 'CLIP Joint Embedding Space', 'Generative Adversarial Networks', 'Generator vs Discriminator', 
    'Vector Databases Indexes', 'Cosine Similarity Calculation', 'Euclidean Distance Retrieval', 'Approximate Nearest Neighbors', 
    'HNSW Graph Algorithm', 'Metadata Filtering Strategy', 'Sparse vs Dense Retrieval', 'Hybrid Search Performance', 
    'Chunking Strategies Document', 'Recursive Character Splitter', 'Semantic Chunking Optimization', 'Lost in the Middle Phenomenon', 
    'Agentic RAG Workflows', 'Self-RAG Correction Loop', 'Corrective RAG Protocol', 'Graph RAG Entities', 
    'AI Bias Mitigation', 'Fairness Metrics Evaluation', 'Data Poisoning Attacks', 'Adversarial Prompt Injection', 
    'Jailbreaking LLMs Vulnerability', 'Model Merging Techniques', 'MoE Mixture of Experts', 'Routing Network Allocation', 
    'Sparse MoE Models', 'AI Governance Frameworks', 'Copyright Fair Use LLMs', 'Compute Governance Strategy', 
    'GPU Architecture Evolution', 'H100 vs B200 Specs', 'TPU Architecture Difference', 'CUDA Memory Management', 
    'Distributed Training Scale', 'Data Parallelism Strategy', 'Model Parallelism Allocation', 'Pipeline Parallelism Routing', 
    'Turing Test Critique', ' Searle\'s Chinese Room Objection', 'Gödel\'s Incompleteness AI', 'Superintelligence Timeline'
  ]),
];
