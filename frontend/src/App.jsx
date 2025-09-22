import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';


// --- SVG Icon Components ---
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;
const UserCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>;
const StarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const CheckSquareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>;
const CameraIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-gray-300"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>;
const ActivityIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const PlusCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>;

// Main App Component
export default function App() {
    const [view, setView] = useState('login');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalRole, setModalRole] = useState('');
    const [isLoginMode, setIsLoginMode] = useState(true);

    // Set the background gradient when the component mounts
    useEffect(() => {
        document.body.style.backgroundImage = 'linear-gradient(135deg, #023047, #000000, #5c003d)';
        // Clean up the style when the component unmounts
        return () => {
            document.body.style.backgroundImage = '';
        };
    }, []);

    const showLoginModal = (role) => {
        setModalRole(role);
        setIsLoginMode(true);
        setIsModalOpen(true);
    };

    const handleLogout = () => {
        setView('login');
    };

    const handleAuthSuccess = (role) => {
        setView(role);
        setIsModalOpen(false);
    };

    const renderView = () => {
        switch (view) {
            case 'admin':
                return <AdminDashboard onLogout={handleLogout} />;
            case 'voter':
                return <VoterDashboard onLogout={handleLogout} />;
            case 'candidate':
                return <CandidateDashboard onLogout={handleLogout} />;
            default:
                return <LoginView onRoleSelect={showLoginModal} />;
        }
    };

    return (
        <div className="min-h-screen text-gray-200">
            <div className="container mx-auto p-4 sm:p-6 md:p-8">
                <Header />
                <main>{renderView()}</main>
            </div>
            {isModalOpen && (
                <AuthModal
                    role={modalRole}
                    isLogin={isLoginMode}
                    setIsLogin={setIsLoginMode}
                    onClose={() => setIsModalOpen(false)}
                    onAuthSuccess={() => handleAuthSuccess(modalRole)}
                />
            )}
        </div>
    );
}


// --- Page & Layout Components ---

const Header = () => (
    <header className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Secure E-Voting Platform
        </h1>
        <p className="text-lg text-gray-400 mt-3">Verifiable, Transparent, and Trustworthy Elections on the Blockchain</p>
    </header>
);

const LoginView = ({ onRoleSelect }) => (
    <div className="max-w-5xl mx-auto animate-fade-in-up">
        <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold text-white">Select Your Role</h2>
            <p className="text-gray-300 mt-2">Choose your designated role to proceed to the login or registration page.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
            <RoleCard
                title="Admin"
                description="Manage elections, candidates, and view real-time analytics."
                icon={<LockIcon />}
                buttonText="Admin Portal"
                color="primary"
                onClick={() => onRoleSelect('admin')}
            />
            <RoleCard
                title="Voter"
                description="Cast your vote securely and transparently on the blockchain."
                icon={<UserCheckIcon />}
                buttonText="Voter Portal"
                color="secondary"
                onClick={() => onRoleSelect('voter')}
            />
            <RoleCard
                title="Candidate"
                description="View your profile and track your vote count in real-time."
                icon={<StarIcon />}
                buttonText="Candidate Portal"
                color="accent"
                onClick={() => onRoleSelect('candidate')}
            />
        </div>
    </div>
);

const DashboardLayout = ({ title, children, onLogout }) => (
    <div className="animate-fade-in-up">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">{title}</h2>
            <button
                onClick={onLogout}
                className="bg-red-500 text-white font-semibold py-2 px-5 rounded-lg hover:bg-red-600 transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                Logout
            </button>
        </div>
        {children}
    </div>
);

// --- Dashboards ---

const AdminDashboard = ({ onLogout }) => {
    return (
        <DashboardLayout title="Admin Dashboard" onLogout={onLogout}>
            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard icon={<CheckSquareIcon />} title="Total Votes Cast" value="8,750" color="primary" />
                <StatCard icon={<UsersIcon />} title="Registered Voters" value="12,300" color="secondary" />
                <StatCard icon={<StarIcon />} title="Total Candidates" value="12" color="accent" />
                <StatCard icon={<ActivityIcon />} title="Active Elections" value="1" color="yellow" />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">
                    <DashboardCard title="Create New Election">
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="electionName" className="block text-sm font-medium text-gray-200 mb-1">Election Name</label>
                                <input type="text" id="electionName" placeholder="e.g., Presidential Election 2025" required className="glass-input" />
                            </div>
                            <button type="submit" className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-lg hover:bg-primary-hover transition-colors duration-300 shadow-lg hover:shadow-primary/50">
                                Create & Deploy Contract
                            </button>
                        </form>
                    </DashboardCard>
                     <DashboardCard title="Manage Candidates">
                        <div className="space-y-3 mb-4">
                            <p className="text-gray-300 text-sm">Add candidates to the active election contract.</p>
                            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                                <p className="font-medium">Alice Johnson</p>
                                <p className="text-sm text-gray-400">Unity Party</p>
                            </div>
                             <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                                <p className="font-medium">Bob Williams</p>
                                <p className="text-sm text-gray-400">Liberty Alliance</p>
                            </div>
                        </div>
                        <form className="flex gap-4">
                             <input type="text" placeholder="Candidate Name" required className="glass-input flex-grow" />
                             <input type="text" placeholder="Party / Affiliation" required className="glass-input flex-grow" />
                             <button type="submit" className="bg-secondary text-white font-semibold py-2 px-4 rounded-lg hover:bg-secondary-hover transition-colors duration-300 shadow-lg flex items-center gap-2">
                                <PlusCircleIcon /> Add
                            </button>
                        </form>
                    </DashboardCard>
                </div>

                {/* Right Sidebar */}
                <div className="lg:col-span-1 space-y-8">
                    <DashboardCard title="Voter Turnout">
                        <VoterTurnoutChart />
                    </DashboardCard>
                    <DashboardCard title="Upcoming Elections">
                       <UpcomingElections />
                    </DashboardCard>
                </div>
            </div>
        </DashboardLayout>
    );
};


const VoterDashboard = ({ onLogout }) => (
    <DashboardLayout title="Voter Dashboard" onLogout={onLogout}>
        <DashboardCard title="Presidential Election 2025">
            <p className="text-gray-300 mb-8">Select a candidate to cast your vote. Once cast, your vote is cryptographically secured and cannot be altered.</p>
            <div className="space-y-4">
                <CandidateOption name="Alice Johnson - Unity Party" />
                <CandidateOption name="Bob Williams - Liberty Alliance" />
                <CandidateOption name="Charlie Brown - Future Forward" />
            </div>
            <button className="mt-8 w-full bg-secondary text-white py-3 px-4 rounded-lg text-lg font-semibold hover:bg-secondary-hover transition-colors duration-300 shadow-lg hover:shadow-secondary/50">
                Submit Your Vote
            </button>
        </DashboardCard>
    </DashboardLayout>
);


const CandidateDashboard = ({ onLogout }) => (
     <DashboardLayout title="Candidate Dashboard" onLogout={onLogout}>
        <DashboardCard>
            <div className="text-center">
                 <h3 className="text-2xl font-semibold text-white">Welcome, Alice Johnson!</h3>
                 <p className="text-gray-300 mt-2 mb-8">You are a candidate in the "Presidential Election 2025".</p>
                 <div className="bg-white/5 border border-white/10 p-8 rounded-xl">
                     <p className="text-xl text-accent">Real-Time Vote Count</p>
                     <p className="text-7xl font-bold text-white my-2">4,120</p>
                     <p className="text-sm text-gray-400">(Updated from the blockchain)</p>
                 </div>
            </div>
        </DashboardCard>
    </DashboardLayout>
);


// --- Reusable UI Components ---

const RoleCard = ({ title, description, icon, buttonText, color, onClick }) => (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-2xl hover:border-white/20 transition-all duration-300 transform hover:-translate-y-2 group text-white">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-white/10 text-${color} mb-6`}>
            {React.cloneElement(icon, { className: "w-8 h-8" })}
        </div>
        <h3 className="text-2xl font-semibold mb-3 text-white">{title}</h3>
        <p className="text-gray-300 mb-6 h-20">{description}</p>
        <button
            onClick={onClick}
            className={`w-full text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 bg-${color} hover:bg-${color}-hover shadow-lg hover:shadow-${color}/50`}
        >
            {buttonText}
        </button>
    </div>
);

const AnalyticsChart = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) chartInstance.current.destroy();
        const ctx = chartRef.current.getContext('2d');
        chartInstance.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Alice Johnson', 'Bob Williams', 'Charlie Brown', 'Diana Miller'],
                datasets: [{
                    label: '# of Votes',
                    data: [4120, 2800, 1830, 0],
                    backgroundColor: ['#818cf8', '#6ee7b7', '#93c5fd', '#fca5a5'],
                    borderColor: ['#4f46e5', '#10b981', '#3b82f6', '#ef4444'],
                    borderWidth: 2,
                    borderRadius: 8,
                }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true, grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: '#e5e7eb' } },
                    x: { grid: { display: false }, ticks: { color: '#e5e7eb' } }
                },
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } }
            }
        });
        return () => { if (chartInstance.current) chartInstance.current.destroy(); };
    }, []);

    return <div className="h-80"><canvas ref={chartRef}></canvas></div>;
};

const VoterTurnoutChart = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) chartInstance.current.destroy();
        const ctx = chartRef.current.getContext('2d');
        chartInstance.current = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Voted', 'Did Not Vote'],
                datasets: [{
                    data: [8750, 12300 - 8750],
                    backgroundColor: ['#4f46e5', 'rgba(255, 255, 255, 0.2)'],
                    borderColor: ['#023047'],
                    borderWidth: 4,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 14 }, color: '#e5e7eb' } },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                 }
                                if (context.parsed !== null) {
                                    label += context.parsed.toLocaleString();
                                }
                                return label;
                            }
                        }
                    }
                 }
            }
        });
        return () => { if (chartInstance.current) chartInstance.current.destroy(); };
    }, []);

    return (
        <div className="h-64 relative">
            <canvas ref={chartRef}></canvas>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold text-white">
                    {((8750/12300)*100).toFixed(1)}%
                </span>
                <span className="text-sm text-gray-400">Turnout</span>
            </div>
        </div>
    );
};

const DashboardCard = ({ title, children }) => (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 sm:p-8 rounded-2xl shadow-2xl text-white">
        {title && <h3 className="text-xl font-bold mb-6 pb-4 border-b border-white/10">{title}</h3>}
        {children}
    </div>
);

const StatCard = ({ icon, title, value, color }) => {
    const colorVariants = {
      primary: 'bg-primary text-primary',
      secondary: 'bg-secondary text-secondary',
      accent: 'bg-accent text-accent',
      yellow: 'bg-yellow-400 text-yellow-400'
    };
    const selectedColor = colorVariants[color] || colorVariants.primary;

    return (
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-5 rounded-xl shadow-2xl flex items-center gap-4">
            <div className={`${selectedColor} bg-opacity-10 w-12 h-12 rounded-full flex items-center justify-center`}>
                {icon}
            </div>
            <div>
                <p className="text-gray-300 font-medium">{title}</p>
                <p className="text-2xl font-bold text-white">{value}</p>
            </div>
        </div>
    );
};


const CandidateOption = ({ name }) => (
    <label className="flex items-center p-5 border-2 border-white/10 rounded-lg cursor-pointer hover:bg-white/10 hover:border-primary transition-colors duration-300 has-[:checked]:bg-primary/20 has-[:checked]:border-primary">
        <input type="radio" name="candidate" className="h-5 w-5 text-primary focus:ring-primary-hover border-gray-500 bg-transparent" />
        <span className="ml-4 text-lg font-medium text-white">{name}</span>
    </label>
);

const UpcomingElections = () => (
    <ul className="space-y-4">
        <li className="flex items-start gap-4">
            <div className="bg-accent bg-opacity-10 text-accent p-2 rounded-lg">
                <CalendarIcon />
            </div>
            <div>
                <p className="font-semibold text-gray-200">Municipal Elections 2026</p>
                <p className="text-sm text-gray-400">Starts: Jan 15, 2026</p>
            </div>
        </li>
        <li className="flex items-start gap-4">
            <div className="bg-secondary bg-opacity-10 text-secondary p-2 rounded-lg">
                <CalendarIcon />
            </div>
            <div>
                <p className="font-semibold text-gray-200">State Governor Election</p>
                <p className="text-sm text-gray-400">Starts: Nov 05, 2026</p>
            </div>
        </li>
    </ul>
);

const LiveTransactionFeed = () => {
    const transactions = [
        { tx: '0x1a2b...', candidate: 'Alice Johnson', time: '2s ago' },
        { tx: '0x9f8c...', candidate: 'Bob Williams', time: '5s ago' },
        { tx: '0x3d4e...', candidate: 'Alice Johnson', time: '8s ago' },
        { tx: '0x7b8a...', candidate: 'Charlie Brown', time: '11s ago' },
        { tx: '0x5c6d...', candidate: 'Alice Johnson', time: '15s ago' },
    ];

    return (
        <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {transactions.map((t, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                            <CheckSquareIcon width="20" height="20" />
                        </div>
                        <div>
                            <p className="font-mono text-sm font-medium text-gray-300">{t.tx}</p>
                            <p className="text-sm text-gray-400">Vote for <span className="font-semibold text-white">{t.candidate}</span></p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500">{t.time}</p>
                </div>
            ))}
        </div>
    );
};


// --- Authentication Modal ---

const AuthModal = ({ role, isLogin, setIsLogin, onClose, onAuthSuccess }) => {
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`${isLogin ? 'Logging in' : 'Registering'} as ${role}...`);
        onAuthSuccess();
    };

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            {/* The Glassmorphism Box */}
            <div
                className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md relative animate-scale-in text-white"
                role="dialog"
                aria-modal="true"
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-300 hover:text-white">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">{isLogin ? `${capitalize(role)} Login` : `${capitalize(role)} Registration`}</h2>
                    <p className="text-gray-300 mt-2">{isLogin ? 'Enter your credentials to access your dashboard.' : 'Create an account to get started.'}</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">Email</label>
                        <input type="email" id="email" required className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-gray-400" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">Password</label>
                        <input type="password" id="password" required className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-gray-400" />
                    </div>

                    {!isLogin && role === 'voter' && <BiometricSection />}

                    <button type="submit" className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-lg hover:bg-primary-hover transition-colors duration-300 shadow-lg hover:shadow-primary/50">
                        {isLogin ? 'Login' : 'Create Account'}
                    </button>
                </form>
                <p className="text-center text-sm mt-6 text-gray-300">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-white hover:underline ml-1">
                        {isLogin ? 'Register Now' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};

const BiometricSection = () => (
    <div className="text-center p-4 bg-white/10 rounded-lg border border-white/20">
        <p className="font-semibold text-gray-200 mb-2">Biometric Identity Verification</p>
        <div className="w-32 h-32 bg-white/10 border border-white/20 rounded-full mx-auto flex items-center justify-center mb-3">
            <CameraIcon />
        </div>
        <button type="button" className="font-semibold text-sm text-white hover:underline">
            Launch Secure Camera
        </button>
        <p className="text-xs text-gray-400 mt-1">Powered by OpenCV AI Face Detection</p>
    </div>
);

