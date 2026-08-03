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
  'General',
  'Psychology',
  'Philosophy',
  'Human Behaviour',
  'Economics',
  'Productivity',
  'Communication',
  'Science',
  'Artificial Intelligence',
  'AI',
  'Technology',
  'History',
  'Environment',
  'Education',
  'Business',
  'Health',
  'Relationships',
  'Leadership',
  'Ethics',
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

  {
    id: 'new-0',
    title: 'Should physical currency be abolished?',
    category: 'General',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-1',
    title: 'Should public transit be free?',
    category: 'General',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-2',
    title: 'What if lying was impossible?',
    category: 'General',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-3',
    title: 'Should humanity adopt nocturnal lifestyles?',
    category: 'General',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-4',
    title: 'Should laws limit personal wealth?',
    category: 'General',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-5',
    title: 'Should animal testing be banned?',
    category: 'General',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-6',
    title: 'Should algorithms choose life partners?',
    category: 'General',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-7',
    title: 'What if the internet collapsed?',
    category: 'General',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-8',
    title: 'Should voting be mandatory?',
    category: 'General',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-9',
    title: 'How does alien life change philosophy?',
    category: 'General',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-10',
    title: 'Should memory editing be commercialized?',
    category: 'General',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-11',
    title: 'Should citizens choose their nationality?',
    category: 'General',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-12',
    title: 'What if anti-aging was wealth-exclusive?',
    category: 'General',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-13',
    title: 'Should space exploration replace welfare?',
    category: 'General',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-14',
    title: 'Should commercial advertising be banned?',
    category: 'General',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-15',
    title: 'What if moral ratings were visible?',
    category: 'General',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-16',
    title: 'Should human cloning be legalized?',
    category: 'General',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-17',
    title: 'What if humans never slept?',
    category: 'General',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-18',
    title: 'Should national borders be abolished?',
    category: 'General',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-19',
    title: 'Does universal basic income work?',
    category: 'General',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-20',
    title: 'Should we technologically control emotions?',
    category: 'General',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-21',
    title: 'Should we colonize the Moon?',
    category: 'General',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-22',
    title: 'Should physical books be banned?',
    category: 'General',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-23',
    title: 'What if we could talk to plants?',
    category: 'General',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-24',
    title: 'Should urban private cars be banned?',
    category: 'General',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-25',
    title: 'Should real-time mind reading be legal?',
    category: 'General',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-26',
    title: 'What if automation replaced all labor?',
    category: 'General',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-27',
    title: 'Should nuclear energy replace fossil fuels?',
    category: 'General',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-28',
    title: 'Should global bodies manage resources?',
    category: 'General',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-29',
    title: 'Should lab-grown meat replace farming?',
    category: 'General',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-30',
    title: 'Should one global language replace all?',
    category: 'General',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-31',
    title: 'Should warfare be decided virtually?',
    category: 'General',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-32',
    title: 'Should child genetic enhancement be allowed?',
    category: 'General',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-33',
    title: 'What if humans could hibernate?',
    category: 'General',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-34',
    title: 'Should the workweek be three days?',
    category: 'General',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-35',
    title: 'What if everyone had perfect memory?',
    category: 'General',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-36',
    title: 'Should space tourism be banned?',
    category: 'General',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-37',
    title: 'What if our universe is simulated?',
    category: 'General',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-38',
    title: 'Should university education be free?',
    category: 'General',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-39',
    title: 'Should we colonize Mars now?',
    category: 'General',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-40',
    title: 'What if we knew our death dates?',
    category: 'General',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-41',
    title: 'Should cities force daily exercise?',
    category: 'General',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-42',
    title: 'What if humans never fell ill?',
    category: 'General',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-43',
    title: 'Should the voting age be sixteen?',
    category: 'General',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-44',
    title: 'Should daylight saving time be permanent?',
    category: 'General',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-45',
    title: 'Should high-speed rail replace flights?',
    category: 'General',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-46',
    title: 'Should social media ban all minors?',
    category: 'General',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-47',
    title: 'What if languages shifted overnight?',
    category: 'General',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-48',
    title: 'Should extreme sports be banned?',
    category: 'General',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-49',
    title: 'Should citizens be paid to exercise?',
    category: 'General',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-50',
    title: 'Does social media encourage bystander behavior?',
    category: 'Psychology',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-51',
    title: 'How do high achievers cure impostor syndrome?',
    category: 'Psychology',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-52',
    title: 'Can self-reflection mitigate cognitive bias?',
    category: 'Psychology',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-53',
    title: 'How does halo effect bias courts?',
    category: 'Psychology',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-54',
    title: 'Does confirmation bias fuel political divide?',
    category: 'Psychology',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-55',
    title: 'How does cognitive dissonance shape beliefs?',
    category: 'Psychology',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-56',
    title: 'Does decision fatigue cause bad choices?',
    category: 'Psychology',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-57',
    title: 'How do cultural norms survive long-term?',
    category: 'Psychology',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-58',
    title: 'Does optimism bias hurt financial planning?',
    category: 'Psychology',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-59',
    title: 'How does media fuel negativity bias?',
    category: 'Psychology',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-60',
    title: 'Can groupthink destroy corporate boards?',
    category: 'Psychology',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-61',
    title: 'What are consequences of mental overload?',
    category: 'Psychology',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-62',
    title: 'How does stress affect decision making?',
    category: 'Psychology',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-63',
    title: 'Can neuroplasticity heal severe brain trauma?',
    category: 'Psychology',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-64',
    title: 'Do we think intuitively or analytically?',
    category: 'Psychology',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-65',
    title: 'Does advertising subconsciously prime buyers?',
    category: 'Psychology',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-66',
    title: 'How does spacing optimize learning retention?',
    category: 'Psychology',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-67',
    title: 'Why does negativity bias dominate news?',
    category: 'Psychology',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-68',
    title: 'Can we stop hedonic adaptation?',
    category: 'Psychology',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-69',
    title: 'What drives student academic motivation?',
    category: 'Psychology',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-70',
    title: 'How does childhood attachment shape adults?',
    category: 'Psychology',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-71',
    title: 'Does locus of control build resilience?',
    category: 'Psychology',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-72',
    title: 'How does workplace ostracism affect output?',
    category: 'Psychology',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-73',
    title: 'Can growth mindset improve intelligence?',
    category: 'Psychology',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-74',
    title: 'Does cognitive dissonance cause radicalization?',
    category: 'Psychology',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-75',
    title: 'How does self-discrepancy cause dissatisfaction?',
    category: 'Psychology',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-76',
    title: 'Can personality traits predict career success?',
    category: 'Psychology',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-77',
    title: 'Why do humans fear the unknown?',
    category: 'Psychology',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-78',
    title: 'Does childhood trauma dictate adult behavior?',
    category: 'Psychology',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-79',
    title: 'How does sleep deprivation limit cognition?',
    category: 'Psychology',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-80',
    title: 'Can meditation permanently lower anxiety?',
    category: 'Psychology',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-81',
    title: 'Does ego depletion actually exist?',
    category: 'Psychology',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-82',
    title: 'Why do humans believe conspiracy theories?',
    category: 'Psychology',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-83',
    title: 'Does virtual interaction replace real friendship?',
    category: 'Psychology',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-84',
    title: 'How does isolation affect cognitive health?',
    category: 'Psychology',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-85',
    title: 'Does altruism stem from selfish genes?',
    category: 'Psychology',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-86',
    title: 'How does peer pressure affect adults?',
    category: 'Psychology',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-87',
    title: 'Can public commitments change bad habits?',
    category: 'Psychology',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-88',
    title: 'Does color influence human emotional states?',
    category: 'Psychology',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-89',
    title: 'How does nostalgia affect consumer spending?',
    category: 'Psychology',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-90',
    title: 'Can emotional intelligence be taught?',
    category: 'Psychology',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-91',
    title: 'Why do humans seek social validation?',
    category: 'Psychology',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-92',
    title: 'Does birth order shape adult personality?',
    category: 'Psychology',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-93',
    title: 'How does humor reduce psychological pain?',
    category: 'Psychology',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-94',
    title: 'Does screen time shorten attention spans?',
    category: 'Psychology',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-95',
    title: 'Can self-compassion reduce academic procrastination?',
    category: 'Psychology',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-96',
    title: 'Why do we remember negative events?',
    category: 'Psychology',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-97',
    title: 'Does crowding increase human aggression?',
    category: 'Psychology',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-98',
    title: 'How does nature exposure lower stress?',
    category: 'Psychology',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-99',
    title: 'Can soundscapes improve focus and memory?',
    category: 'Psychology',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-100',
    title: 'Is teleportation a form of suicide?',
    category: 'Philosophy',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-101',
    title: 'Is religious belief rationally justified?',
    category: 'Philosophy',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-102',
    title: 'Does Occam\'s razor always work?',
    category: 'Philosophy',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-103',
    title: 'Can Hanlon\'s razor improve relationships?',
    category: 'Philosophy',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-104',
    title: 'Is Epicureanism relevant in consumer societies?',
    category: 'Philosophy',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-105',
    title: 'Does Existentialism resolve existential dread?',
    category: 'Philosophy',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-106',
    title: 'Is Nihilism actually a liberating philosophy?',
    category: 'Philosophy',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-107',
    title: 'Does Determinism eliminate personal responsibility?',
    category: 'Philosophy',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-108',
    title: 'Does Absurdism help accept life\'s chaos?',
    category: 'Philosophy',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-109',
    title: 'Is Utilitarianism compatible with human rights?',
    category: 'Philosophy',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-110',
    title: 'Should virtue ethics guide modern professions?',
    category: 'Philosophy',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-111',
    title: 'Is free will a chemical illusion?',
    category: 'Philosophy',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-112',
    title: 'Can science explain human consciousness?',
    category: 'Philosophy',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-113',
    title: 'What is the foundation of justice?',
    category: 'Philosophy',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-114',
    title: 'How is personal identity preserved over time?',
    category: 'Philosophy',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-115',
    title: 'Is judging criminal behavior morally fair?',
    category: 'Philosophy',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-116',
    title: 'Should we enter the experience machine?',
    category: 'Philosophy',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-117',
    title: 'Does the trolley problem reflect reality?',
    category: 'Philosophy',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-118',
    title: 'Does seeking meaning cause existential dread?',
    category: 'Philosophy',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-119',
    title: 'Is the soul physically real?',
    category: 'Philosophy',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-120',
    title: 'Is the simulation hypothesis scientifically testable?',
    category: 'Philosophy',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-121',
    title: 'Does the universe require fine-tuning?',
    category: 'Philosophy',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-122',
    title: 'Will advanced civilizations inevitably self-destruct?',
    category: 'Philosophy',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-123',
    title: 'How do we solve common resources?',
    category: 'Philosophy',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-124',
    title: 'Does veil of ignorance create fairness?',
    category: 'Philosophy',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-125',
    title: 'What are limits of individual property?',
    category: 'Philosophy',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-126',
    title: 'Does language describe or construct reality?',
    category: 'Philosophy',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-127',
    title: 'Do future generations have human rights?',
    category: 'Philosophy',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-128',
    title: 'Can artificial systems possess genuine intent?',
    category: 'Philosophy',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-129',
    title: 'Is truth relative to power dynamics?',
    category: 'Philosophy',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-130',
    title: 'Is state authority over individuals legitimate?',
    category: 'Philosophy',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-131',
    title: 'Does suffering disprove a benevolent creator?',
    category: 'Philosophy',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-132',
    title: 'Is it better to be feared?',
    category: 'Philosophy',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-133',
    title: 'Can war ever be morally justified?',
    category: 'Philosophy',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-134',
    title: 'What defines a good human life?',
    category: 'Philosophy',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-135',
    title: 'Is beauty entirely in the observer?',
    category: 'Philosophy',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-136',
    title: 'Should we fear death?',
    category: 'Philosophy',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-137',
    title: 'Does absolute morality exist?',
    category: 'Philosophy',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-138',
    title: 'Are humans naturally good or bad?',
    category: 'Philosophy',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-139',
    title: 'Does history have an ultimate goal?',
    category: 'Philosophy',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-140',
    title: 'Is knowledge possible without sensory input?',
    category: 'Philosophy',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-141',
    title: 'What is the nature of time?',
    category: 'Philosophy',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-142',
    title: 'Should free speech have absolute protection?',
    category: 'Philosophy',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-143',
    title: 'Does mathematics exist independent of humans?',
    category: 'Philosophy',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-144',
    title: 'Can computers ever possess true wisdom?',
    category: 'Philosophy',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-145',
    title: 'Is progress a natural human necessity?',
    category: 'Philosophy',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-146',
    title: 'Do animals possess moral rights?',
    category: 'Philosophy',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-147',
    title: 'Does the end justify the means?',
    category: 'Philosophy',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-148',
    title: 'What is the source of evil?',
    category: 'Philosophy',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-149',
    title: 'Is solipsism a logically sound philosophy?',
    category: 'Philosophy',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-150',
    title: 'Does social proof reinforce echo chambers?',
    category: 'Human Behaviour',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-151',
    title: 'How does reciprocity drive networking culture?',
    category: 'Human Behaviour',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-152',
    title: 'Does scarcity drive impulse buying behavior?',
    category: 'Human Behaviour',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-153',
    title: 'How does emotion spread online?',
    category: 'Human Behaviour',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-154',
    title: 'Is herd mentality evolutionary beneficial?',
    category: 'Human Behaviour',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-155',
    title: 'How does tribalism affect modern politics?',
    category: 'Human Behaviour',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-156',
    title: 'Why do humans signals social status?',
    category: 'Human Behaviour',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-157',
    title: 'Does Dunbar\'s number limit company size?',
    category: 'Human Behaviour',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-158',
    title: 'Why do sports fans identify collectively?',
    category: 'Human Behaviour',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-159',
    title: 'Does system justification block social progress?',
    category: 'Human Behaviour',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-160',
    title: 'Why do groups scapegoat during crises?',
    category: 'Human Behaviour',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-161',
    title: 'Is altruism an evolutionary survival strategy?',
    category: 'Human Behaviour',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-162',
    title: 'Does virtue signaling undermine charity?',
    category: 'Human Behaviour',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-163',
    title: 'How does grandstanding affect policy debates?',
    category: 'Human Behaviour',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-164',
    title: 'What are consequences of cancel culture?',
    category: 'Human Behaviour',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-165',
    title: 'How do dignity and honor cultures?',
    category: 'Human Behaviour',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-166',
    title: 'Does looking-glass self shape youth self-esteem?',
    category: 'Human Behaviour',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-167',
    title: 'How does politeness affect international diplomacy?',
    category: 'Human Behaviour',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-168',
    title: 'Do attachment styles influence career paths?',
    category: 'Human Behaviour',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-169',
    title: 'Does social comparison drive Instagram envy?',
    category: 'Human Behaviour',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-170',
    title: 'Why do we enjoy parasocial relationships?',
    category: 'Human Behaviour',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-171',
    title: 'How does crowd psychology explain panics?',
    category: 'Human Behaviour',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-172',
    title: 'Why do people believe fake news?',
    category: 'Human Behaviour',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-173',
    title: 'Does peer pressure change in adulthood?',
    category: 'Human Behaviour',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-174',
    title: 'What does Milgram teach about authority?',
    category: 'Human Behaviour',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-175',
    title: 'How does environment design shape behavior?',
    category: 'Human Behaviour',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-176',
    title: 'Why do humans gossip in groups?',
    category: 'Human Behaviour',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-177',
    title: 'How do outsiders become group members?',
    category: 'Human Behaviour',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-178',
    title: 'Why do people love ritualistic behaviors?',
    category: 'Human Behaviour',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-179',
    title: 'Does anonymity increase online toxicity?',
    category: 'Human Behaviour',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-180',
    title: 'How do micro-expressions betray hidden lies?',
    category: 'Human Behaviour',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-181',
    title: 'Why do humans form habitual routines?',
    category: 'Human Behaviour',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-182',
    title: 'Does physical proximity build lasting trust?',
    category: 'Human Behaviour',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-183',
    title: 'How does body language assert dominance?',
    category: 'Human Behaviour',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-184',
    title: 'Why do people hoard resources during?',
    category: 'Human Behaviour',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-185',
    title: 'Does competition improve individual performance?',
    category: 'Human Behaviour',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-186',
    title: 'How does storytelling influence human cooperation?',
    category: 'Human Behaviour',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-187',
    title: 'Why do we value handmade goods?',
    category: 'Human Behaviour',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-188',
    title: 'Does gratitude practice improve overall mood?',
    category: 'Human Behaviour',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-189',
    title: 'Why do humans seek familiar patterns?',
    category: 'Human Behaviour',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-190',
    title: 'How does packaging design influence buying?',
    category: 'Human Behaviour',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-191',
    title: 'Does lighting affect workplace collaboration?',
    category: 'Human Behaviour',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-192',
    title: 'Why do we fear public speaking?',
    category: 'Human Behaviour',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-193',
    title: 'How does culture shape personal space?',
    category: 'Human Behaviour',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-194',
    title: 'Does music influence shopper spending speed?',
    category: 'Human Behaviour',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-195',
    title: 'Why do people resist behavioral changes?',
    category: 'Human Behaviour',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-196',
    title: 'Does temperature affect customer patience levels?',
    category: 'Human Behaviour',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-197',
    title: 'How do social norms get established?',
    category: 'Human Behaviour',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-198',
    title: 'Why do humans seek group membership?',
    category: 'Human Behaviour',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-199',
    title: 'Does scent influence consumer memory recall?',
    category: 'Human Behaviour',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-200',
    title: 'What are consequences of hyperinflation?',
    category: 'Economics',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-201',
    title: 'Does market failure justify state healthcare?',
    category: 'Economics',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-202',
    title: 'Should luxury goods face high taxes?',
    category: 'Economics',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-203',
    title: 'Is opportunity cost key to decisions?',
    category: 'Economics',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-204',
    title: 'Does creative destruction drive long-term growth?',
    category: 'Economics',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-205',
    title: 'Is comparative advantage still valid today?',
    category: 'Economics',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-206',
    title: 'Does circular economy reduce GDP growth?',
    category: 'Economics',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-207',
    title: 'How does behavioral economics shape pensions?',
    category: 'Economics',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-208',
    title: 'Can we predict economic bubbles?',
    category: 'Economics',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-209',
    title: 'What is the cost of tariffs?',
    category: 'Economics',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-210',
    title: 'Does monopsony power suppress employee wages?',
    category: 'Economics',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-211',
    title: 'Is high national debt sustainable?',
    category: 'Economics',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-212',
    title: 'Should central banks issue digital currencies?',
    category: 'Economics',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-213',
    title: 'What role does informal economy play?',
    category: 'Economics',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-214',
    title: 'Do pricing algorithms hurt consumer surplus?',
    category: 'Economics',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-215',
    title: 'Do inflation expectations drive actual inflation?',
    category: 'Economics',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-216',
    title: 'Does economic freedom ensure social mobility?',
    category: 'Economics',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-217',
    title: 'Does universal childcare boost labor markets?',
    category: 'Economics',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-218',
    title: 'How does gig economy change employment?',
    category: 'Economics',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-219',
    title: 'Are carbon taxes effective at reduction?',
    category: 'Economics',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-220',
    title: 'Can Coase theorem solve environmental conflicts?',
    category: 'Economics',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-221',
    title: 'Should public goods be tax funded?',
    category: 'Economics',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-222',
    title: 'Does regulation encourage corporate rent seeking?',
    category: 'Economics',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-223',
    title: 'Does regulatory capture weaken antitrust laws?',
    category: 'Economics',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-224',
    title: 'Does wealth inequality slow GDP growth?',
    category: 'Economics',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-225',
    title: 'Should automation be taxed for workers?',
    category: 'Economics',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-226',
    title: 'Does globalization destroy local manufacturing jobs?',
    category: 'Economics',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-227',
    title: 'How should sovereign wealth funds invest?',
    category: 'Economics',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-228',
    title: 'Is universal basic income economically viable?',
    category: 'Economics',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-229',
    title: 'Do microfinance loans reduce rural poverty?',
    category: 'Economics',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-230',
    title: 'What is the cost of congestion?',
    category: 'Economics',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-231',
    title: 'Does patent protection limit scientific progress?',
    category: 'Economics',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-232',
    title: 'Should credit agencies face stricter regulations?',
    category: 'Economics',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-233',
    title: 'How do exchange rates affect trade?',
    category: 'Economics',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-234',
    title: 'Does aging population threaten pension systems?',
    category: 'Economics',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-235',
    title: 'Does minimum wage increase youth unemployment?',
    category: 'Economics',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-236',
    title: 'Is renewable transition economically feasible?',
    category: 'Economics',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-237',
    title: 'Do economic sanctions hurt civil populations?',
    category: 'Economics',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-238',
    title: 'Does venture capital encourage monopoly power?',
    category: 'Economics',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-239',
    title: 'How do tourist economies build resilience?',
    category: 'Economics',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-240',
    title: 'Does housing supply regulation cause inflation?',
    category: 'Economics',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-241',
    title: 'Does foreign aid harm local markets?',
    category: 'Economics',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-242',
    title: 'Does high-skilled immigration boost local wages?',
    category: 'Economics',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-243',
    title: 'How do we regulate ocean overfishing?',
    category: 'Economics',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-244',
    title: 'Should banks receive state bailouts?',
    category: 'Economics',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-245',
    title: 'Does corporate tax avoidance limit growth?',
    category: 'Economics',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-246',
    title: 'Does supply chain diversification prevent shocks?',
    category: 'Economics',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-247',
    title: 'Are cooperative business models more stable?',
    category: 'Economics',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-248',
    title: 'Does money velocity affect inflation directly?',
    category: 'Economics',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-249',
    title: 'Should utilities remain in state hands?',
    category: 'Economics',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-250',
    title: 'How do we apply Parkinson\'s law?',
    category: 'Productivity',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-251',
    title: 'Is the Eisenhower matrix still relevant?',
    category: 'Productivity',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-252',
    title: 'What is the cost of multitasking?',
    category: 'Productivity',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-253',
    title: 'How do we enter flow state?',
    category: 'Productivity',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-254',
    title: 'Does a second brain prevent overload?',
    category: 'Productivity',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-255',
    title: 'Do atomic habits compound over time?',
    category: 'Productivity',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-256',
    title: 'Is time blocking better than lists?',
    category: 'Productivity',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-257',
    title: 'How do we manage cognitive fatigue?',
    category: 'Productivity',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-258',
    title: 'Can decision trees eliminate business delays?',
    category: 'Productivity',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-259',
    title: 'What distinguishes practice from mindless work?',
    category: 'Productivity',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-260',
    title: 'Does Pomodoro technique work for creative?',
    category: 'Productivity',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-261',
    title: 'How do we optimize ultradian rhythms?',
    category: 'Productivity',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-262',
    title: 'Does circadian alignment improve mental output?',
    category: 'Productivity',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-263',
    title: 'Is energy management better than time?',
    category: 'Productivity',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-264',
    title: 'Does GTD framework work for startups?',
    category: 'Productivity',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-265',
    title: 'Is inbox zero actually productive?',
    category: 'Productivity',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-266',
    title: 'How do Kanban boards optimize workflows?',
    category: 'Productivity',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-267',
    title: 'Does Scrum framework work outside software?',
    category: 'Productivity',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-268',
    title: 'How do we conduct time audits?',
    category: 'Productivity',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-269',
    title: 'Does eating the frog prevent procrastination?',
    category: 'Productivity',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-270',
    title: 'Does the two-minute rule stop backlog?',
    category: 'Productivity',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-271',
    title: 'Does the five-second rule build motivation?',
    category: 'Productivity',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-272',
    title: 'How does Seinfeld strategy maintain consistency?',
    category: 'Productivity',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-273',
    title: 'Does habit stacking build morning routines?',
    category: 'Productivity',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-274',
    title: 'Do implementation intentions ensure goal success?',
    category: 'Productivity',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-275',
    title: 'How does friction optimization change habits?',
    category: 'Productivity',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-276',
    title: 'Does choice minimalization reduce decision fatigue?',
    category: 'Productivity',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-277',
    title: 'How do we practice digital minimalism?',
    category: 'Productivity',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-278',
    title: 'Can we shield focus from distraction?',
    category: 'Productivity',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-279',
    title: 'Is cognitive offloading helpful or harmful?',
    category: 'Productivity',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-280',
    title: 'How does Zeigarnik effect cause anxiety?',
    category: 'Productivity',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-281',
    title: 'Should we ban low-value corporate meetings?',
    category: 'Productivity',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-282',
    title: 'How do we build impact matrices?',
    category: 'Productivity',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-283',
    title: 'Do OKRs limit startup agility?',
    category: 'Productivity',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-284',
    title: 'Are systems better than goal setting?',
    category: 'Productivity',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-285',
    title: 'How do we run decisive meetings?',
    category: 'Productivity',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-286',
    title: 'Should companies adopt silent meeting methods?',
    category: 'Productivity',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-287',
    title: 'How do we transition to asynchronous?',
    category: 'Productivity',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-288',
    title: 'Maker schedule vs manager schedule dynamics?',
    category: 'Productivity',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-289',
    title: 'How do we work with chronotypes?',
    category: 'Productivity',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-290',
    title: 'What is the cost of sleep?',
    category: 'Productivity',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-291',
    title: 'How do we spot burnout early?',
    category: 'Productivity',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-292',
    title: 'Is active recovery better than rest?',
    category: 'Productivity',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-293',
    title: 'How do we design information diets?',
    category: 'Productivity',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-294',
    title: 'Does Feynman technique accelerate skill learning?',
    category: 'Productivity',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-295',
    title: 'Do spaced repetition systems improve memory?',
    category: 'Productivity',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-296',
    title: 'Is perfectionism the ultimate productivity killer?',
    category: 'Productivity',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-297',
    title: 'Does Zettelkasten method improve writing output?',
    category: 'Productivity',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-298',
    title: 'Does workspace design improve daily focus?',
    category: 'Productivity',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-299',
    title: 'How do we say no professionally?',
    category: 'Productivity',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-300',
    title: 'How do we practice active listening?',
    category: 'Communication',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-301',
    title: 'Can Socratic questioning resolve boardroom conflict?',
    category: 'Communication',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-302',
    title: 'Does framing influence public opinion?',
    category: 'Communication',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-303',
    title: 'Does nonviolent communication work at work?',
    category: 'Communication',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-304',
    title: 'Does mirroring improve negotiation success rates?',
    category: 'Communication',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-305',
    title: 'How do we build pitch structures?',
    category: 'Communication',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-306',
    title: 'Balancing logic and emotion in advocacy?',
    category: 'Communication',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-307',
    title: 'Is silence an effective negotiation strategy?',
    category: 'Communication',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-308',
    title: 'Does the Mehrabian rule actually hold?',
    category: 'Communication',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-309',
    title: 'Can we detect lies through micro-expressions?',
    category: 'Communication',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-310',
    title: 'How does physical proximity affect trust?',
    category: 'Communication',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-311',
    title: 'Does pitch control increase vocal authority?',
    category: 'Communication',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-312',
    title: 'High-context vs low-context cultural communication?',
    category: 'Communication',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-313',
    title: 'How does technical jargon limit understanding?',
    category: 'Communication',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-314',
    title: 'Does ladder of inference prevent misunderstandings?',
    category: 'Communication',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-315',
    title: 'How do we select conflict styles?',
    category: 'Communication',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-316',
    title: 'Why must negotiators know their BATNA?',
    category: 'Communication',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-317',
    title: 'How do we expand negotiation parameters?',
    category: 'Communication',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-318',
    title: 'Is compromise always a lose-lose outcome?',
    category: 'Communication',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-319',
    title: 'How do we address passive aggression?',
    category: 'Communication',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-320',
    title: 'Does DESC scripting deliver better feedback?',
    category: 'Communication',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-321',
    title: 'Are I-statements effective in relationship disputes?',
    category: 'Communication',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-322',
    title: 'Does Johari window improve team trust?',
    category: 'Communication',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-323',
    title: 'How does marketing persuade target audiences?',
    category: 'Communication',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-324',
    title: 'Can inoculation theory limit online misinformation?',
    category: 'Communication',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-325',
    title: 'Does unsolicited advice trigger psychological resistance?',
    category: 'Communication',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-326',
    title: 'Does the pyramid principle improve writing?',
    category: 'Communication',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-327',
    title: 'How do we write executive summaries?',
    category: 'Communication',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-328',
    title: 'How do we pitch in sixty?',
    category: 'Communication',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-329',
    title: 'How do we avoid boring slides?',
    category: 'Communication',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-330',
    title: 'Does visual hierarchy improve slide comprehension?',
    category: 'Communication',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-331',
    title: 'Should managers abandon the feedback sandwich?',
    category: 'Communication',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-332',
    title: 'Does radical candor build better teams?',
    category: 'Communication',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-333',
    title: 'Does structured feedback change employee behavior?',
    category: 'Communication',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-334',
    title: 'How do we lead appreciative inquiries?',
    category: 'Communication',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-335',
    title: 'What makes conversations crucial for success?',
    category: 'Communication',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-336',
    title: 'How do we maintain mutual respect?',
    category: 'Communication',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-337',
    title: 'Can we reframe criticism constructively?',
    category: 'Communication',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-338',
    title: 'How do we overcome stage fright?',
    category: 'Communication',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-339',
    title: 'Do impromptu speaking structures improve confidence?',
    category: 'Communication',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-340',
    title: 'Does STAR method improve interview quality?',
    category: 'Communication',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-341',
    title: 'When does workplace humor cause offense?',
    category: 'Communication',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-342',
    title: 'Does rule of three improve speeches?',
    category: 'Communication',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-343',
    title: 'Does voice modulation improve audience focus?',
    category: 'Communication',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-344',
    title: 'How do we explain technical code?',
    category: 'Communication',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-345',
    title: 'Is persuasive nudging ethical in marketing?',
    category: 'Communication',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-346',
    title: 'Has digital messaging ruined professional etiquette?',
    category: 'Communication',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-347',
    title: 'Can we show empathy in text?',
    category: 'Communication',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-348',
    title: 'How do we review post-project communication?',
    category: 'Communication',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-349',
    title: 'Does eye contact build immediate rapport?',
    category: 'Communication',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-350',
    title: 'Does entropy govern all social systems?',
    category: 'Science',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-351',
    title: 'Why do we search for dark?',
    category: 'Science',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-352',
    title: 'Does medicine stop natural human selection?',
    category: 'Science',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-353',
    title: 'What happens at black hole horizons?',
    category: 'Science',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-354',
    title: 'Are gene-drive organisms ecologically safe?',
    category: 'Science',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-355',
    title: 'Does entanglement disprove locality in physics?',
    category: 'Science',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-356',
    title: 'Why does GPS require relativity adjustments?',
    category: 'Science',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-357',
    title: 'Does herd immunity require mandatory vaccination?',
    category: 'Science',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-358',
    title: 'Why is nuclear fusion commercially difficult?',
    category: 'Science',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-359',
    title: 'Does biodiversity loss threaten human survival?',
    category: 'Science',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-360',
    title: 'How reliable are long-term climate models?',
    category: 'Science',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-361',
    title: 'What evidence supports tectonic plate movements?',
    category: 'Science',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-362',
    title: 'Does chaos theory limit weather prediction?',
    category: 'Science',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-363',
    title: 'How does emergence shape complex systems?',
    category: 'Science',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-364',
    title: 'Does butterfly effect apply to supply?',
    category: 'Science',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-365',
    title: 'What does double-slit experiment prove?',
    category: 'Science',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-366',
    title: 'Many-worlds vs Copenhagen interpretation of quantum?',
    category: 'Science',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-367',
    title: 'How does gravitational lensing aid astronomy?',
    category: 'Science',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-368',
    title: 'Do black holes evaporate via radiation?',
    category: 'Science',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-369',
    title: 'How does acid rain alter ecosystems?',
    category: 'Science',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-370',
    title: 'How do orbital cycles trigger ice?',
    category: 'Science',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-371',
    title: 'Can environmental changes trigger epigenetic changes?',
    category: 'Science',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-372',
    title: 'How has PCR changed forensic investigations?',
    category: 'Science',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-373',
    title: 'Do mitochondria prove endosymbiotic cell origin?',
    category: 'Science',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-374',
    title: 'How do neurotransmitters regulate human moods?',
    category: 'Science',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-375',
    title: 'Do thermodynamic laws limit clean energy?',
    category: 'Science',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-376',
    title: 'How does equilibrium shift under pressure?',
    category: 'Science',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-377',
    title: 'Why do catalysts speed chemical reactions?',
    category: 'Science',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-378',
    title: 'How do buffers maintain blood homeostatic?',
    category: 'Science',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-379',
    title: 'Will solid-state batteries replace lithium-ion?',
    category: 'Science',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-380',
    title: 'How does electronegativity dictate chemical bonds?',
    category: 'Science',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-381',
    title: 'General relativity vs quantum mechanics compatibility?',
    category: 'Science',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-382',
    title: 'How does momentum conservation govern orbits?',
    category: 'Science',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-383',
    title: 'What physics principles enable aircraft flight?',
    category: 'Science',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-384',
    title: 'How does turbulence differ from laminar?',
    category: 'Science',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-385',
    title: 'How is electromagnetic radiation used medically?',
    category: 'Science',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-386',
    title: 'Does light refraction enable human sight?',
    category: 'Science',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-387',
    title: 'Mitosis vs meiosis in genetic diversity?',
    category: 'Science',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-388',
    title: 'How do energy pyramids limit predators?',
    category: 'Science',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-389',
    title: 'What caused major historical mass extinctions?',
    category: 'Science',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-390',
    title: 'Is ocean carbon sequestration safe long-term?',
    category: 'Science',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-391',
    title: 'Did life originate at hydrothermal vents?',
    category: 'Science',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-392',
    title: 'How does sleep consolidate human memory?',
    category: 'Science',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-393',
    title: 'How does immunity distinguish self pathogens?',
    category: 'Science',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-394',
    title: 'Can we contain superheated fusion plasma?',
    category: 'Science',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-395',
    title: 'How does sound travel through solids?',
    category: 'Science',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-396',
    title: 'What triggers deep undersea mega earthquakes?',
    category: 'Science',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-397',
    title: 'Can synthetic organisms clean plastic waste?',
    category: 'Science',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-398',
    title: 'Does gut microbiota alter brain chemistry?',
    category: 'Science',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-399',
    title: 'What does the Higgs boson reveal?',
    category: 'Science',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-400',
    title: 'How do we solve AI alignment?',
    category: 'Artificial Intelligence',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-401',
    title: 'Can we permanently stop AI hallucinations?',
    category: 'Artificial Intelligence',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-402',
    title: 'Should AI select military target decisions?',
    category: 'Artificial Intelligence',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-403',
    title: 'Does synthetic data reduce model bias?',
    category: 'Artificial Intelligence',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-404',
    title: 'Can transformers perform true logical reasoning?',
    category: 'Artificial Intelligence',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-405',
    title: 'Multimodal AI vs unimodal AI capabilities?',
    category: 'Artificial Intelligence',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-406',
    title: 'Should frontier models be open source?',
    category: 'Artificial Intelligence',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-407',
    title: 'Is training AI on copyright fair?',
    category: 'Artificial Intelligence',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-408',
    title: 'Are current AI safety regulations effective?',
    category: 'Artificial Intelligence',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-409',
    title: 'Will AI replace teachers in classrooms?',
    category: 'Artificial Intelligence',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-410',
    title: 'Are AI medical diagnostics reliable enough?',
    category: 'Artificial Intelligence',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-411',
    title: 'Does AI companionship limit human socialization?',
    category: 'Artificial Intelligence',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-412',
    title: 'Should autonomous weapons be banned globally?',
    category: 'Artificial Intelligence',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-413',
    title: 'Are we close to achieving AGI?',
    category: 'Artificial Intelligence',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-414',
    title: 'Does RLHF introduce political bias?',
    category: 'Artificial Intelligence',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-415',
    title: 'Does chain-of-thought prompt improve mathematical accuracy?',
    category: 'Artificial Intelligence',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-416',
    title: 'Can we reliably detect deepfake videos?',
    category: 'Artificial Intelligence',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-417',
    title: 'Which white-collar jobs will AI automate?',
    category: 'Artificial Intelligence',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-418',
    title: 'What is the footprint of compute?',
    category: 'Artificial Intelligence',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-419',
    title: 'Can we remove data from models?',
    category: 'Artificial Intelligence',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-420',
    title: 'How does RAG improve response accuracy?',
    category: 'Artificial Intelligence',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-421',
    title: 'Are LLMs vulnerable to prompt injection?',
    category: 'Artificial Intelligence',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-422',
    title: 'Can AI predict novel molecular structures?',
    category: 'Artificial Intelligence',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-423',
    title: 'Should sentient AI receive legal rights?',
    category: 'Artificial Intelligence',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-424',
    title: 'Does AI art undermine human creativity?',
    category: 'Artificial Intelligence',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-425',
    title: 'Do mixture-of-experts improve training efficiency?',
    category: 'Artificial Intelligence',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-426',
    title: 'How do we secure training data?',
    category: 'Artificial Intelligence',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-427',
    title: 'Can we evaluate model safety objectively?',
    category: 'Artificial Intelligence',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-428',
    title: 'Will neuro-symbolic AI solve reasoning limits?',
    category: 'Artificial Intelligence',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-429',
    title: 'Can autonomous agents run entire businesses?',
    category: 'Artificial Intelligence',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-430',
    title: 'Will AI enable personalized cancer treatments?',
    category: 'Artificial Intelligence',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-431',
    title: 'Does algorithmic monoculture threaten financial markets?',
    category: 'Artificial Intelligence',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-432',
    title: 'Does personalized curation limit consumer choice?',
    category: 'Artificial Intelligence',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-433',
    title: 'Why must AI decisions be explainable?',
    category: 'Artificial Intelligence',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-434',
    title: 'Can AI optimize regional power grids?',
    category: 'Artificial Intelligence',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-435',
    title: 'Is real-time translation diplomat-ready?',
    category: 'Artificial Intelligence',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-436',
    title: 'How do we define machine creativity?',
    category: 'Artificial Intelligence',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-437',
    title: 'Can we prevent model inversion attacks?',
    category: 'Artificial Intelligence',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-438',
    title: 'Does copilot reduce coding student competence?',
    category: 'Artificial Intelligence',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-439',
    title: 'Should developers be liable for outputs?',
    category: 'Artificial Intelligence',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-440',
    title: 'Static prompt vs interactive agentic workflow?',
    category: 'Artificial Intelligence',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-441',
    title: 'Can AI translate lost ancient languages?',
    category: 'Artificial Intelligence',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-442',
    title: 'Will AI replace human customer service?',
    category: 'Artificial Intelligence',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-443',
    title: 'Should we restrict GPU compute exports?',
    category: 'Artificial Intelligence',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-444',
    title: 'Does AI optimize global logistics routes?',
    category: 'Artificial Intelligence',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-445',
    title: 'Will generative design replace human architects?',
    category: 'Artificial Intelligence',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-446',
    title: 'Can we defend against automated phishing?',
    category: 'Artificial Intelligence',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-447',
    title: 'Does local hosting guarantee data privacy?',
    category: 'Artificial Intelligence',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-448',
    title: 'Will AI automate regulatory compliance checks?',
    category: 'Artificial Intelligence',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-449',
    title: 'Does sentiment analysis drive market volatility?',
    category: 'Artificial Intelligence',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-450',
    title: 'Will smart glasses replace mobile screens?',
    category: 'Technology',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-451',
    title: 'Is the metaverse a commercial failure?',
    category: 'Technology',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-452',
    title: 'How do we secure IoT devices?',
    category: 'Technology',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-453',
    title: 'Will quantum computers break modern encryption?',
    category: 'Technology',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-454',
    title: 'Can blockchain decentralize the global web?',
    category: 'Technology',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-455',
    title: 'Will biotech extend human life expectancy?',
    category: 'Technology',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-456',
    title: 'Should public facial recognition be banned?',
    category: 'Technology',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-457',
    title: 'Should public transport go fully autonomous?',
    category: 'Technology',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-458',
    title: 'Will 3D printing localise supply chains?',
    category: 'Technology',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-459',
    title: 'Can satellite constellations bridge digital divide?',
    category: 'Technology',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-460',
    title: 'Can VR improve stroke rehabilitation therapy?',
    category: 'Technology',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-461',
    title: 'How does screen time affect toddlers?',
    category: 'Technology',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-462',
    title: 'Do fitness trackers improve health outcomes?',
    category: 'Technology',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-463',
    title: 'Should autonomous weapons systems be banned?',
    category: 'Technology',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-464',
    title: 'Vertical farming vs traditional field agriculture?',
    category: 'Technology',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-465',
    title: 'Do brain implants restore paralyzed communication?',
    category: 'Technology',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-466',
    title: 'Does proof-of-work mining ruin environments?',
    category: 'Technology',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-467',
    title: 'Should social algorithms be open source?',
    category: 'Technology',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-468',
    title: 'Can smart grids prevent city blackouts?',
    category: 'Technology',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-469',
    title: 'Should deep sea mining be banned?',
    category: 'Technology',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-470',
    title: 'Is clean meat commercially viable yet?',
    category: 'Technology',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-471',
    title: 'Will solid state batteries replace lithium?',
    category: 'Technology',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-472',
    title: 'Does cyber warfare threaten power grids?',
    category: 'Technology',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-473',
    title: 'Should consumers have right to repair?',
    category: 'Technology',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-474',
    title: 'Does employee tracking software destroy trust?',
    category: 'Technology',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-475',
    title: 'Should geoengineering combat global warming directly?',
    category: 'Technology',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-476',
    title: 'Does augmented reality improve factory output?',
    category: 'Technology',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-477',
    title: 'Do voice assistants violate home privacy?',
    category: 'Technology',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-478',
    title: 'Should police use predictive policing algorithms?',
    category: 'Technology',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-479',
    title: 'Will 6G networks enable remote surgery?',
    category: 'Technology',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-480',
    title: 'Does streaming curation kill musical diversity?',
    category: 'Technology',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-481',
    title: 'Can synthetic biology produce clean biofuels?',
    category: 'Technology',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-482',
    title: 'Are biometrics safer than regular passwords?',
    category: 'Technology',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-483',
    title: 'Should commercial drones deliver residential packages?',
    category: 'Technology',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-484',
    title: 'How do we recycle electronic waste?',
    category: 'Technology',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-485',
    title: 'Are virtual offices replacing physical corporate?',
    category: 'Technology',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-486',
    title: 'Can nanoparticles deliver targeted cancer drugs?',
    category: 'Technology',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-487',
    title: 'Should space debris cleanup be tax-funded?',
    category: 'Technology',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-488',
    title: 'Does big data improve athletic performance?',
    category: 'Technology',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-489',
    title: 'Does tech access dictate national wealth?',
    category: 'Technology',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-490',
    title: 'Can automated filters stop online abuse?',
    category: 'Technology',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-491',
    title: 'Is hydrogen viable for heavy transport?',
    category: 'Technology',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-492',
    title: 'Should police access public DNA databases?',
    category: 'Technology',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-493',
    title: 'Do interactive screens improve museum learning?',
    category: 'Technology',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-494',
    title: 'Are smart cities vulnerable to ransomware?',
    category: 'Technology',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-495',
    title: 'Does cloud dependency increase business vulnerability?',
    category: 'Technology',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-496',
    title: 'Will automated checkout replace retail workers?',
    category: 'Technology',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-497',
    title: 'Should deepfake creation be federally criminalized?',
    category: 'Technology',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-498',
    title: 'Does GPS tracking help endangered species?',
    category: 'Technology',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-499',
    title: 'Will digital currencies replace cash reserves?',
    category: 'Technology',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-500',
    title: 'Did printing press enable the Reformation?',
    category: 'History',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-501',
    title: 'What caused the Ottoman empire collapse?',
    category: 'History',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-502',
    title: 'How did trade routes exchange culture?',
    category: 'History',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-503',
    title: 'Did plague defeat the Aztec empire?',
    category: 'History',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-504',
    title: 'How did factories change family structure?',
    category: 'History',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-505',
    title: 'Does Sykes-Picot explain Middle East conflicts?',
    category: 'History',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-506',
    title: 'How did Hammurabi code shape laws?',
    category: 'History',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-507',
    title: 'Did Meiji restoration modernize Japan quickly?',
    category: 'History',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-508',
    title: 'Did Black Death end European feudalism?',
    category: 'History',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-509',
    title: 'How does propaganda sustain dictatorial regimes?',
    category: 'History',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-510',
    title: 'Did Suez canal shift trade power?',
    category: 'History',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-511',
    title: 'Did Magna Carta originate democracy?',
    category: 'History',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-512',
    title: 'Did space race accelerate computer innovations?',
    category: 'History',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-513',
    title: 'Why was Alexandria library destruction catastrophic?',
    category: 'History',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-514',
    title: 'Did Marshall plan successfully contain communism?',
    category: 'History',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-515',
    title: 'What role did women play revolution?',
    category: 'History',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-516',
    title: 'Did Gold Rush build American west?',
    category: 'History',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-517',
    title: 'Why did the Roman empire fall?',
    category: 'History',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-518',
    title: 'Did Versailles treaty cause World War?',
    category: 'History',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-519',
    title: 'What is the legacy of decolonization?',
    category: 'History',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-520',
    title: 'Did Gandhi salt march gain independence?',
    category: 'History',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-521',
    title: 'Did printing press enable scientific revolution?',
    category: 'History',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-522',
    title: 'Do Roman roads outline modern cities?',
    category: 'History',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-523',
    title: 'Did agriculture decrease human health initial?',
    category: 'History',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-524',
    title: 'Did compass enable global maritime empires?',
    category: 'History',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-525',
    title: 'How did code talkers affect WWII?',
    category: 'History',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-526',
    title: 'Does partition explain modern Kashmir dispute?',
    category: 'History',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-527',
    title: 'Did slavery drive early empire wealth?',
    category: 'History',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-528',
    title: 'Did Berlin Wall construct Cold War?',
    category: 'History',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-529',
    title: 'Did Enlightenment inspire the French revolution?',
    category: 'History',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-530',
    title: 'Did chivalry rules govern medieval wars?',
    category: 'History',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-531',
    title: 'How did Justinian code shape civil?',
    category: 'History',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-532',
    title: 'Did potato introduction transform European demographics?',
    category: 'History',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-533',
    title: 'Did sewers enable Victorian city growth?',
    category: 'History',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-534',
    title: 'Did Westphalia treaty create modern states?',
    category: 'History',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-535',
    title: 'Does Silk Road explain central architecture?',
    category: 'History',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-536',
    title: 'Did paper invention enable Chinese bureaucracy?',
    category: 'History',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-537',
    title: 'What caused the Opium Wars conflict?',
    category: 'History',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-538',
    title: 'Did antibiotics shift global war demographics?',
    category: 'History',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-539',
    title: 'Why were African trade routes important?',
    category: 'History',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-540',
    title: 'Did Galileo trial delay scientific inquiry?',
    category: 'History',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-541',
    title: 'Did Inquisition enforce religious uniform policies?',
    category: 'History',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-542',
    title: 'Did Panama canal link global commerce?',
    category: 'History',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-543',
    title: 'Did Hanseatic league create early capitalism?',
    category: 'History',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-544',
    title: 'Did steam engine initiate the Anthropocene?',
    category: 'History',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-545',
    title: 'Why did League of Nations fail?',
    category: 'History',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-546',
    title: 'Did Bushido shape Japanese military values?',
    category: 'History',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-547',
    title: 'Did New Deal increase government size?',
    category: 'History',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-548',
    title: 'Did Pax Romana spread early Christianity?',
    category: 'History',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-549',
    title: 'Did Rosetta Stone unlock ancient history?',
    category: 'History',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-550',
    title: 'Should ecocide be an international crime?',
    category: 'Environment',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-551',
    title: 'Are carbon offset programs corporate greenwashing?',
    category: 'Environment',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-552',
    title: 'Does plastic pollution disrupt human hormones?',
    category: 'Environment',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-553',
    title: 'Should cities charge entry to cars?',
    category: 'Environment',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-554',
    title: 'Does fast fashion exploit environment resources?',
    category: 'Environment',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-555',
    title: 'Can rewilding restore historical ecosystem balances?',
    category: 'Environment',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-556',
    title: 'Is nuclear fusion safe clean energy?',
    category: 'Environment',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-557',
    title: 'Should single-use plastics be banned globally?',
    category: 'Environment',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-558',
    title: 'Does Amazon deforestation change global weather?',
    category: 'Environment',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-559',
    title: 'Do indigenous forestry practices protect forests?',
    category: 'Environment',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-560',
    title: 'Should states subsidize electric car buyers?',
    category: 'Environment',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-561',
    title: 'Does fertilizer runoff create ocean dead?',
    category: 'Environment',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-562',
    title: 'Should we assist endangered species migration?',
    category: 'Environment',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-563',
    title: 'Is clean water a public right?',
    category: 'Environment',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-564',
    title: 'Does green design raise local rents?',
    category: 'Environment',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-565',
    title: 'Does light pollution disrupt insect migration?',
    category: 'Environment',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-566',
    title: 'Should deep-sea drilling be banned?',
    category: 'Environment',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-567',
    title: 'Does soil erosion threaten global food?',
    category: 'Environment',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-568',
    title: 'Does cement production dominate industrial emissions?',
    category: 'Environment',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-569',
    title: 'Should citizens have individual carbon allowances?',
    category: 'Environment',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-570',
    title: 'Does permafrost melt release ancient diseases?',
    category: 'Environment',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-571',
    title: 'Do park trees reduce city heat?',
    category: 'Environment',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-572',
    title: 'Should trade deals enforce climate tariffs?',
    category: 'Environment',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-573',
    title: 'Does vertical farming save agricultural water?',
    category: 'Environment',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-574',
    title: 'Does biological pest control cause damage?',
    category: 'Environment',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-575',
    title: 'Should oil companies pay climate damages?',
    category: 'Environment',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-576',
    title: 'Does ocean acidification destroy coral reefs?',
    category: 'Environment',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-577',
    title: 'Are 100 percent renewable grids achievable?',
    category: 'Environment',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-578',
    title: 'Should commercial logging be globally banned?',
    category: 'Environment',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-579',
    title: 'Does Sahel desertification fuel regional conflicts?',
    category: 'Environment',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-580',
    title: 'Does lithium mining pollute local water?',
    category: 'Environment',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-581',
    title: 'Should cities replace lawns with grass?',
    category: 'Environment',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-582',
    title: 'Are microplastics present in food crops?',
    category: 'Environment',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-583',
    title: 'Do marine reserves restore fish populations?',
    category: 'Environment',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-584',
    title: 'Should human access to wilderness restricted?',
    category: 'Environment',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-585',
    title: 'Do highway bridge crossings help wildlife?',
    category: 'Environment',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-586',
    title: 'Does container shipping fuel global warming?',
    category: 'Environment',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-587',
    title: 'Should river dams be removed globally?',
    category: 'Environment',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-588',
    title: 'Does warming shift vector-borne disease zones?',
    category: 'Environment',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-589',
    title: 'Is solar geoengineering safe for deployment?',
    category: 'Environment',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-590',
    title: 'Should national parks cap daily visitor?',
    category: 'Environment',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-591',
    title: 'Can organic farming feed global populations?',
    category: 'Environment',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-592',
    title: 'Does factory farming damage local air?',
    category: 'Environment',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-593',
    title: 'Does ecotourism damage fragile local ecosystems?',
    category: 'Environment',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-594',
    title: 'Does rising sea water pollute wells?',
    category: 'Environment',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-595',
    title: 'Does local community ownership save species?',
    category: 'Environment',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-596',
    title: 'Should commercial buildings mandate green roofs?',
    category: 'Environment',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-597',
    title: 'Does bee decline threaten crop yields?',
    category: 'Environment',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-598',
    title: 'Does food waste reduction lower emissions?',
    category: 'Environment',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-599',
    title: 'Should international law protect climate refugees?',
    category: 'Environment',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-600',
    title: 'Should portfolios replace standardized tests?',
    category: 'Education',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-601',
    title: 'Does bilingual education improve cognitive skills?',
    category: 'Education',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-602',
    title: 'Should high schools teach financial literacy?',
    category: 'Education',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-603',
    title: 'Does online learning limit child development?',
    category: 'Education',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-604',
    title: 'Should college tuition be state funded?',
    category: 'Education',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-605',
    title: 'Can schools teach how detect fake?',
    category: 'Education',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-606',
    title: 'Should middle schools start after nine?',
    category: 'Education',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-607',
    title: 'Do vocational diplomas pay better college?',
    category: 'Education',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-608',
    title: 'Should letter grades be completely replaced?',
    category: 'Education',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-609',
    title: 'Does gamification improve math test scores?',
    category: 'Education',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-610',
    title: 'Should elementary schools teach mindfulness daily?',
    category: 'Education',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-611',
    title: 'Does smaller class size guarantee success?',
    category: 'Education',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-612',
    title: 'Should homeschooling face national standard reviews?',
    category: 'Education',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-613',
    title: 'Is project learning better than lectures?',
    category: 'Education',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-614',
    title: 'Should primary schools still teach cursive?',
    category: 'Education',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-615',
    title: 'Do tablets in class distract students?',
    category: 'Education',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-616',
    title: 'Should schools teach digital safety consent?',
    category: 'Education',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-617',
    title: 'Does arts education improve spatial thinking?',
    category: 'Education',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-618',
    title: 'Should gym class be mandatory daily?',
    category: 'Education',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-619',
    title: 'Does economic mix improve school performance?',
    category: 'Education',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-620',
    title: 'Should teacher salary depend on tests?',
    category: 'Education',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-621',
    title: 'Does growth mindset training build resilience?',
    category: 'Education',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-622',
    title: 'Should primary schools teach basic philosophy?',
    category: 'Education',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-623',
    title: 'How did pandemic remote schooling affect?',
    category: 'Education',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-624',
    title: 'Should primary homework be banned entirely?',
    category: 'Education',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-625',
    title: 'Does university research drive local business?',
    category: 'Education',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-626',
    title: 'Should charter schools receive state funding?',
    category: 'Education',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-627',
    title: 'Does teacher representation improve student graduation?',
    category: 'Education',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-628',
    title: 'Should colleges ban legacy admissions policies?',
    category: 'Education',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-629',
    title: 'Does classroom inclusion benefit typical peers?',
    category: 'Education',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-630',
    title: 'Should programming count as foreign language?',
    category: 'Education',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-631',
    title: 'Does property tax funding create inequality?',
    category: 'Education',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-632',
    title: 'Should all student loan debts cancelled?',
    category: 'Education',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-633',
    title: 'Does suspension policy increase student dropout?',
    category: 'Education',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-634',
    title: 'Should schools run during summer months?',
    category: 'Education',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-635',
    title: 'Does peer tutoring benefit student tutors?',
    category: 'Education',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-636',
    title: 'Should history classes teach structural racism?',
    category: 'Education',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-637',
    title: 'Do forest schools build child confidence?',
    category: 'Education',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-638',
    title: 'Are individual learning styles a myth?',
    category: 'Education',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-639',
    title: 'Does digital research replace library books?',
    category: 'Education',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-640',
    title: 'Should empathy count toward school grades?',
    category: 'Education',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-641',
    title: 'Does testing pressure cause student depression?',
    category: 'Education',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-642',
    title: 'Should community service be mandatory graduation?',
    category: 'Education',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-643',
    title: 'Do open textbooks lower college costs?',
    category: 'Education',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-644',
    title: 'Should private schooling be banned globally?',
    category: 'Education',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-645',
    title: 'Does writing by hand improve learning?',
    category: 'Education',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-646',
    title: 'Should high schoolers complete mandatory internships?',
    category: 'Education',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-647',
    title: 'Do counselors prevent student drop out?',
    category: 'Education',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-648',
    title: 'Does lack of recess hurt behavior?',
    category: 'Education',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-649',
    title: 'Should college focus strictly on careers?',
    category: 'Education',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-650',
    title: 'Should businesses prioritize stakeholders over shareholders?',
    category: 'Business',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-651',
    title: 'Does four-day week work in services?',
    category: 'Business',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-652',
    title: 'Does greenwashing damage corporate reputation?',
    category: 'Business',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-653',
    title: 'Should salary ranges be mandatory listings?',
    category: 'Business',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-654',
    title: 'Does remote work reduce office values?',
    category: 'Business',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-655',
    title: 'Should tech monopolies be broken up?',
    category: 'Business',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-656',
    title: 'Does board diversity improve financial returns?',
    category: 'Business',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-657',
    title: 'Should corporate political donations be banned?',
    category: 'Business',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-658',
    title: 'Do corporate social programs yield profits?',
    category: 'Business',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-659',
    title: 'Does dynamic pricing alienate loyal customers?',
    category: 'Business',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-660',
    title: 'Should gig workers get full benefits?',
    category: 'Business',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-661',
    title: 'Does venture capital inflate startup values?',
    category: 'Business',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-662',
    title: 'Should employers track keystrokes of workers?',
    category: 'Business',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-663',
    title: 'Does direct sales model beat retail?',
    category: 'Business',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-664',
    title: 'Do patents encourage patent trolling behaviors?',
    category: 'Business',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-665',
    title: 'Do tax inversions harm public spending?',
    category: 'Business',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-666',
    title: 'Do stock buybacks hurt long-term R&D?',
    category: 'Business',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-667',
    title: 'Are loot boxes a form gambling?',
    category: 'Business',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-668',
    title: 'Are family firms more stable public?',
    category: 'Business',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-669',
    title: 'Should firms face fines planned obsolescence?',
    category: 'Business',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-670',
    title: 'Does sourcing transparency drive consumer choices?',
    category: 'Business',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-671',
    title: 'Should executive compensation be capped legally?',
    category: 'Business',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-672',
    title: 'Does customer trust recover after breaches?',
    category: 'Business',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-673',
    title: 'Should states bail out disrupted sectors?',
    category: 'Business',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-674',
    title: 'Are subscription models profitable long term?',
    category: 'Business',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-675',
    title: 'Does copyright law limit musical creativity?',
    category: 'Business',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-676',
    title: 'Should menus list carbon footprint metrics?',
    category: 'Business',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-677',
    title: 'How does tariff policy shape business?',
    category: 'Business',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-678',
    title: 'Should employee cooperatives receive tax breaks?',
    category: 'Business',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-679',
    title: 'Does social marketing dictate youth spend?',
    category: 'Business',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-680',
    title: 'Should shops accept cash payments always?',
    category: 'Business',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-681',
    title: 'Does corporate downsizing improve efficiency long?',
    category: 'Business',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-682',
    title: 'Should companies handle supply chain abuse?',
    category: 'Business',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-683',
    title: 'Do store brands outperform national labels?',
    category: 'Business',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-684',
    title: 'Should copyright protection terms be shortened?',
    category: 'Business',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-685',
    title: 'How do rates affect startup loans?',
    category: 'Business',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-686',
    title: 'Should paid family leave be mandatory?',
    category: 'Business',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-687',
    title: 'Does business lobbying corrupt green policy?',
    category: 'Business',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-688',
    title: 'Is bootstrapping better than venture capital?',
    category: 'Business',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-689',
    title: 'Should non-competes be banned at work?',
    category: 'Business',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-690',
    title: 'Do online platforms filter fake reviews?',
    category: 'Business',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-691',
    title: 'Does predator pricing destroy small businesses?',
    category: 'Business',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-692',
    title: 'Do gym benefits lower health insurance?',
    category: 'Business',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-693',
    title: 'Should algorithm trade secrets be public?',
    category: 'Business',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-694',
    title: 'Do import duties harm small business?',
    category: 'Business',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-695',
    title: 'Should drug makers advertise to consumers?',
    category: 'Business',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-696',
    title: 'Do accelerators help or exploit startups?',
    category: 'Business',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-697',
    title: 'Should businesses pay carbon shipping taxes?',
    category: 'Business',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-698',
    title: 'Are DAOs better than traditional LLCs?',
    category: 'Business',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-699',
    title: 'Does bankruptcy law encourage entrepreneurial risk?',
    category: 'Business',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-700',
    title: 'Is healthcare a basic human right?',
    category: 'Health',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-701',
    title: 'Do processed foods shorten human lifespan?',
    category: 'Health',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-702',
    title: 'Should health budgets fund lifestyle medicine?',
    category: 'Health',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-703',
    title: 'Does gut flora regulate mental health?',
    category: 'Health',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-704',
    title: 'Should sugary sodas face extra taxes?',
    category: 'Health',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-705',
    title: 'Does poor sleep weaken immune defense?',
    category: 'Health',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-706',
    title: 'Should therapy be free in clinics?',
    category: 'Health',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-707',
    title: 'Is fasting better than daily restriction?',
    category: 'Health',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-708',
    title: 'Should drug ads to consumers banned?',
    category: 'Health',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-709',
    title: 'Does loneliness raise blood pressure values?',
    category: 'Health',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-710',
    title: 'Should genetic cancer screening be mandatory?',
    category: 'Health',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-711',
    title: 'Does lifting weights prevent aging decay?',
    category: 'Health',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-712',
    title: 'Should vaccine mandates enforce public safety?',
    category: 'Health',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-713',
    title: 'Does blue light trigger sleep issues?',
    category: 'Health',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-714',
    title: 'Should health insurance pay for acupuncture?',
    category: 'Health',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-715',
    title: 'Does urban smog cause child asthma?',
    category: 'Health',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-716',
    title: 'Should exercise be prescribed before pills?',
    category: 'Health',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-717',
    title: 'Are electronic cigarettes safer than tobacco?',
    category: 'Health',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-718',
    title: 'Should cosmetic surgeries ban minor patients?',
    category: 'Health',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-719',
    title: 'Does online consultation help rural patients?',
    category: 'Health',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-720',
    title: 'Should governments regulate salt in meals?',
    category: 'Health',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-721',
    title: 'Does stress physically shrink brain cells?',
    category: 'Health',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-722',
    title: 'Should school dinners be fully vegetarian?',
    category: 'Health',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-723',
    title: 'Do park walks reduce stress hormones?',
    category: 'Health',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-724',
    title: 'Should embryo gene editing be banned?',
    category: 'Health',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-725',
    title: 'Does traffic noise raise heart risk?',
    category: 'Health',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-726',
    title: 'Should paid mental days be mandatory?',
    category: 'Health',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-727',
    title: 'Does minor dehydration lower brain performance?',
    category: 'Health',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-728',
    title: 'Should junk food carry warning labels?',
    category: 'Health',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-729',
    title: 'Does health literacy reduce emergency visits?',
    category: 'Health',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-730',
    title: 'Should public funds support commercial gyms?',
    category: 'Health',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-731',
    title: 'Does sitting for hours damage blood?',
    category: 'Health',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-732',
    title: 'Should yoga be standard rehab practice?',
    category: 'Health',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-733',
    title: 'Does farm antibiotic use build superbugs?',
    category: 'Health',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-734',
    title: 'Should active lifestyles lower insurance premiums?',
    category: 'Health',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-735',
    title: 'Can public campaigns change vaccine views?',
    category: 'Health',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-736',
    title: 'Should energy drinks ban minor sales?',
    category: 'Health',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-737',
    title: 'Does gum disease cause heart attacks?',
    category: 'Health',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-738',
    title: 'Should menus state calorie counts mandatory?',
    category: 'Health',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-739',
    title: 'Do microplastics settle in human organs?',
    category: 'Health',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-740',
    title: 'Should medical files be on blockchain?',
    category: 'Health',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-741',
    title: 'Does winter light affect seasonal depression?',
    category: 'Health',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-742',
    title: 'Should primary schools ban birthday cake?',
    category: 'Health',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-743',
    title: 'Has wellness commercialization ruined health views?',
    category: 'Health',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-744',
    title: 'Should water filters clean toxic PFAS?',
    category: 'Health',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-745',
    title: 'Does fitness level delay dementia onset?',
    category: 'Health',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-746',
    title: 'Should medical schools mandate nutrition study?',
    category: 'Health',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-747',
    title: 'Does sleep apnea cause brain strokes?',
    category: 'Health',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-748',
    title: 'Should red meat face cancer tax?',
    category: 'Health',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-749',
    title: 'Does music therapy reduce terminal pain?',
    category: 'Health',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-750',
    title: 'Does social media ruin self-esteem?',
    category: 'Relationships',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-751',
    title: 'Can long-distance relationships survive remote technology?',
    category: 'Relationships',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-752',
    title: 'Should couples sign prenuptial contracts standard?',
    category: 'Relationships',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-753',
    title: 'Do childhood attachments dictate romantic choices?',
    category: 'Relationships',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-754',
    title: 'Should parents read minor text messages?',
    category: 'Relationships',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-755',
    title: 'Does chore split predict divorce rates?',
    category: 'Relationships',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-756',
    title: 'Is ex friendship healthy or toxic?',
    category: 'Relationships',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-757',
    title: 'Does money arguments cause relationship breakdown?',
    category: 'Relationships',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-758',
    title: 'Should married couples split bank accounts?',
    category: 'Relationships',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-759',
    title: 'Does micro-cheating destroy trust in partners?',
    category: 'Relationships',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-760',
    title: 'Does parental divorce harm children relationships?',
    category: 'Relationships',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-761',
    title: 'Should polyamory get equal marriage rights?',
    category: 'Relationships',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-762',
    title: 'How do we define relationship codependency?',
    category: 'Relationships',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-763',
    title: 'Is emotional cheating worse than physical?',
    category: 'Relationships',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-764',
    title: 'Does baby arrival drop marital happiness?',
    category: 'Relationships',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-765',
    title: 'Should dating apps moderate user behavior?',
    category: 'Relationships',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-766',
    title: 'Do cultural gaps strain romantic relationships?',
    category: 'Relationships',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-767',
    title: 'Is cohabitation before marriage helpful?',
    category: 'Relationships',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-768',
    title: 'Do influencers distort dating expectation norms?',
    category: 'Relationships',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-769',
    title: 'Should adult kids support aging parents?',
    category: 'Relationships',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-770',
    title: 'Does sibling rivalry continue through adulthood?',
    category: 'Relationships',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-771',
    title: 'Is jealousy an evolutionary protection tool?',
    category: 'Relationships',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-772',
    title: 'Do love language labels actually help?',
    category: 'Relationships',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-773',
    title: 'Should couples seek counseling preventatively?',
    category: 'Relationships',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-774',
    title: 'Does silent treatment damage emotional bonds?',
    category: 'Relationships',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-775',
    title: 'Do friendships fade after marriage starts?',
    category: 'Relationships',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-776',
    title: 'Should kids apologize to sibling rivals?',
    category: 'Relationships',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-777',
    title: 'Does career focus ruin home life?',
    category: 'Relationships',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-778',
    title: 'Is unconditional romantic love actually possible?',
    category: 'Relationships',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-779',
    title: 'Are public displays of affection appropriate?',
    category: 'Relationships',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-780',
    title: 'Should partners check credit scores first?',
    category: 'Relationships',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-781',
    title: 'Does remote work strain partner relationships?',
    category: 'Relationships',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-782',
    title: 'Is nuclear family structure still optimal?',
    category: 'Relationships',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-783',
    title: 'How do we detect friendship gaslighting?',
    category: 'Relationships',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-784',
    title: 'Should unhappy parents stay for kids?',
    category: 'Relationships',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-785',
    title: 'Does text ghosting harm self esteem?',
    category: 'Relationships',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-786',
    title: 'Can trust recover after major infidelity?',
    category: 'Relationships',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-787',
    title: 'Do opposite personality types attract successfully?',
    category: 'Relationships',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-788',
    title: 'Should relationship boundaries negotiated explicitly?',
    category: 'Relationships',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-789',
    title: 'Is love addiction chemically real?',
    category: 'Relationships',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-790',
    title: 'Should kids veto parent dating choices?',
    category: 'Relationships',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-791',
    title: 'Do memory biases distort relationship arguments?',
    category: 'Relationships',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-792',
    title: 'Does trauma bonding occur in friendships?',
    category: 'Relationships',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-793',
    title: 'Should intimacy be scheduled weekly?',
    category: 'Relationships',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-794',
    title: 'Do relationship age gaps create imbalance?',
    category: 'Relationships',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-795',
    title: 'Does wealth change group friendship dynamics?',
    category: 'Relationships',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-796',
    title: 'Should family secrets remain hidden always?',
    category: 'Relationships',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-797',
    title: 'Does contempt expression predict relationship death?',
    category: 'Relationships',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-798',
    title: 'Is deep talk on first dates?',
    category: 'Relationships',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-799',
    title: 'Does friend loss equal partner breakup?',
    category: 'Relationships',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-800',
    title: 'Should leaders prioritize empathy over results?',
    category: 'Leadership',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-801',
    title: 'Do flat companies outperform hierarchy systems?',
    category: 'Leadership',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-802',
    title: 'Is emotional intelligence key for managers?',
    category: 'Leadership',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-803',
    title: 'Does remote work end leadership control?',
    category: 'Leadership',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-804',
    title: 'Should leaders admit errors to employees?',
    category: 'Leadership',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-805',
    title: 'Does charismatic leadership cause group blindspots?',
    category: 'Leadership',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-806',
    title: 'Should boss pay depend on sustainability?',
    category: 'Leadership',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-807',
    title: 'Does work mentoring improve diversity numbers?',
    category: 'Leadership',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-808',
    title: 'Should leadership decisions be fully collaborative?',
    category: 'Leadership',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-809',
    title: 'Do quiet introverts make better bosses?',
    category: 'Leadership',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-810',
    title: 'Should companies share bad financial results?',
    category: 'Leadership',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-811',
    title: 'How do we lead remote teams?',
    category: 'Leadership',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-812',
    title: 'Do leaders protect company whistleblowers directly?',
    category: 'Leadership',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-813',
    title: 'Does leader humor improve team output?',
    category: 'Leadership',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-814',
    title: 'Should workers elect their corporate bosses?',
    category: 'Leadership',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-815',
    title: 'Peacetime leadership vs crisis management styles?',
    category: 'Leadership',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-816',
    title: 'Should micromanagement be banned at work?',
    category: 'Leadership',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-817',
    title: 'How do leaders merge company cultures?',
    category: 'Leadership',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-818',
    title: 'Should leaders have fixed term limits?',
    category: 'Leadership',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-819',
    title: 'Does ethical behavior boost worker retention?',
    category: 'Leadership',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-820',
    title: 'Is internal promotion better than hiring?',
    category: 'Leadership',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-821',
    title: 'How do we lead during recessions?',
    category: 'Leadership',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-822',
    title: 'Should leaders encourage active debate sessions?',
    category: 'Leadership',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-823',
    title: 'Does leader communication set workplace norms?',
    category: 'Leadership',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-824',
    title: 'Are bosses legally liable for errors?',
    category: 'Leadership',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-825',
    title: 'Does servant leadership beat traditional styles?',
    category: 'Leadership',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-826',
    title: 'Should managers ban employee evening emails?',
    category: 'Leadership',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-827',
    title: 'How do we lead without authority?',
    category: 'Leadership',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-828',
    title: 'Should managers get conflict resolution training?',
    category: 'Leadership',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-829',
    title: 'Does cognitive diversity improve executive decisions?',
    category: 'Leadership',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-830',
    title: 'Does delegation improve employee job motivation?',
    category: 'Leadership',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-831',
    title: 'Does public boss criticism destroy trust?',
    category: 'Leadership',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-832',
    title: 'Should companies use anonymous review boxes?',
    category: 'Leadership',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-833',
    title: 'How should managers handle toxic high-performers?',
    category: 'Leadership',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-834',
    title: 'Should bosses share personal political views?',
    category: 'Leadership',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-835',
    title: 'Does leader fear of failure stop?',
    category: 'Leadership',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-836',
    title: 'Should school start basic leadership lessons?',
    category: 'Leadership',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-837',
    title: 'How do we align teams quickly?',
    category: 'Leadership',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-838',
    title: 'Should offices ban internal political gossip?',
    category: 'Leadership',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-839',
    title: 'Patience vs rapid action in business?',
    category: 'Leadership',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-840',
    title: 'Are short-term goals better than long?',
    category: 'Leadership',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-841',
    title: 'How do we manage multi-generational teams?',
    category: 'Leadership',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-842',
    title: 'Should bosses apologize for generic mistakes?',
    category: 'Leadership',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-843',
    title: 'How do new managers build credibility?',
    category: 'Leadership',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-844',
    title: 'Should leaders encourage side project work?',
    category: 'Leadership',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-845',
    title: 'Does physical presence build boss respect?',
    category: 'Leadership',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-846',
    title: 'Do self-managed teams work in practice?',
    category: 'Leadership',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-847',
    title: 'Does empathy lower worker sick leave?',
    category: 'Leadership',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-848',
    title: 'Is systems thinking key for executives?',
    category: 'Leadership',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-849',
    title: 'How do leaders transition out gracefully?',
    category: 'Leadership',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-850',
    title: 'Is genetic engineering of humans moral?',
    category: 'Ethics',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-851',
    title: 'Should carbon polluters pay flooded nations?',
    category: 'Ethics',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-852',
    title: 'Should autonomous military weapons be banned?',
    category: 'Ethics',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-853',
    title: 'Should wealth face maximum limit tax?',
    category: 'Ethics',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-854',
    title: 'Is prison labor exploitation or rehabilitation?',
    category: 'Ethics',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-855',
    title: 'Should designers be liable for addictive?',
    category: 'Ethics',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-856',
    title: 'Is lab meat morally superior farming?',
    category: 'Ethics',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-857',
    title: 'Should states regulate drug market prices?',
    category: 'Ethics',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-858',
    title: 'Should public housing use facial cameras?',
    category: 'Ethics',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-859',
    title: 'Is space funding moral during poverty?',
    category: 'Ethics',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-860',
    title: 'Is geoengineering climate manipulation morally correct?',
    category: 'Ethics',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-861',
    title: 'Should parents monetize child social photos?',
    category: 'Ethics',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-862',
    title: 'Is buying sweatshop products morally bad?',
    category: 'Ethics',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-863',
    title: 'Should bosses track employee brain waves?',
    category: 'Ethics',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-864',
    title: 'Is surrogate commercial pregnancy ethically sound?',
    category: 'Ethics',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-865',
    title: 'Should zoos be banned for autonomy?',
    category: 'Ethics',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-866',
    title: 'Does urban gentrification violate community rights?',
    category: 'Ethics',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-867',
    title: 'Should unpaid internships be banned globally?',
    category: 'Ethics',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-868',
    title: 'Is targeting ads to poor ethical?',
    category: 'Ethics',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-869',
    title: 'Should doctors strike during wage disputes?',
    category: 'Ethics',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-870',
    title: 'Is deepfake reconstruction of dead actors?',
    category: 'Ethics',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-871',
    title: 'Should rich nations pay preserve forests?',
    category: 'Ethics',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-872',
    title: 'Is loan approval via algorithms fair?',
    category: 'Ethics',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-873',
    title: 'Is cosmetic animal testing ever justified?',
    category: 'Ethics',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-874',
    title: 'Can Mars lands be privately owned?',
    category: 'Ethics',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-875',
    title: 'Should public squares ban commercial adverts?',
    category: 'Ethics',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-876',
    title: 'Is IVF sex selection morally acceptable?',
    category: 'Ethics',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-877',
    title: 'Are networks liable for user suicide?',
    category: 'Ethics',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-878',
    title: 'Is recruitment filtering via algorithms ethical?',
    category: 'Ethics',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-879',
    title: 'Should vaccine patents be fully public?',
    category: 'Ethics',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-880',
    title: 'Does extreme wealth inequality threaten democracy?',
    category: 'Ethics',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-881',
    title: 'Should history textbooks fit current morals?',
    category: 'Ethics',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-882',
    title: 'Should tax money bail out banks?',
    category: 'Ethics',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-883',
    title: 'Are whistleblowers heroes or federal criminals?',
    category: 'Ethics',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-884',
    title: 'Should AI romantic partner replacement allowed?',
    category: 'Ethics',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-885',
    title: 'Should workers have right disconnect laws?',
    category: 'Ethics',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-886',
    title: 'Should DNA test sites sell data?',
    category: 'Ethics',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-887',
    title: 'Should states ban gas cars completely?',
    category: 'Ethics',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-888',
    title: 'Is hosting sports in dictatorships ethical?',
    category: 'Ethics',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-889',
    title: 'Should healthcare prioritize active healthy patients?',
    category: 'Ethics',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-890',
    title: 'Are military drone strikes morally justified?',
    category: 'Ethics',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-891',
    title: 'Should journals charge for public research?',
    category: 'Ethics',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-892',
    title: 'Is watering golf courses during drought?',
    category: 'Ethics',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-893',
    title: 'Should plastic footprint reporting be mandatory?',
    category: 'Ethics',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-894',
    title: 'Should we eradicate mosquito species genetically?',
    category: 'Ethics',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-895',
    title: 'Are workplace vaccine mandates morally correct?',
    category: 'Ethics',
    difficulty: 'Medium',
    tags: []
  },
  {
    id: 'new-896',
    title: 'Should classrooms use facial attention tracking?',
    category: 'Ethics',
    difficulty: 'Hard',
    tags: []
  },
  {
    id: 'new-897',
    title: 'Is compulsory land sale for transit?',
    category: 'Ethics',
    difficulty: 'Extreme',
    tags: []
  },
  {
    id: 'new-898',
    title: 'Are state lotteries targeting poor ethical?',
    category: 'Ethics',
    difficulty: 'Easy',
    tags: []
  },
  {
    id: 'new-899',
    title: 'Should we bind self-aware artificial life?',
    category: 'Ethics',
    difficulty: 'Medium',
    tags: []
  }
];
