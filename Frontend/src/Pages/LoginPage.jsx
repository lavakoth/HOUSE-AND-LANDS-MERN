const AuthForm = ({ type, setPage }) => {
    const { handleAuth, loading, error, setError } = useAuth();
    const [formData, setFormData] = useState({
        email: '', password: '', username: '', firstName: '', lastName: '', role: 'buyer',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null); // Clear error on input change
    };
    
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToSend = type === 'login' 
                ? { email: formData.email, password: formData.password }
                : formData;
                
            await handleAuth(type, dataToSend);
            setPage('listings'); // Redirect on success
            
        } catch (err) {
            // Error is already set in the useAuth hook
            console.error("Auth Error:", err);
        }
    };
    
    // Simple validation
    const requiredRegistrationFields = [
        formData.email, formData.password, formData.username, formData.firstName
    ];
    
    const isRegistrationValid = requiredRegistrationFields.every(field => field.trim() !== '');
    const isLoginValid = formData.email.trim() !== '' && formData.password.trim() !== '';

    return (
        <div className="max-w-md mx-auto p-8 mt-10 bg-white shadow-2xl rounded-xl border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{type === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
            
            {error && (
                <div className="p-3 mb-4 text-sm text-red-800 bg-red-100 rounded-lg" role="alert">
                    {error}
                </div>
            )}
            
            <form onSubmit={onSubmit} className="space-y-4">
                <input 
                    type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required
                />
                
                {type === 'register' && (
                    <>
                        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
                             <input type="text" name="lastName" placeholder="Last Name (Optional)" value={formData.lastName} onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                    </>
                )}
                
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
                
                {type === 'register' && (
                     <select name="role" value={formData.role} onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="buyer">I am looking to Buy/Rent (Buyer/Renter)</option>
                        <option value="agent">I am an Agent</option>
                        <option value="landlord">I am a Landlord</option>
                     </select>
                )}

                <Button 
                    type="submit" primary={true} className="w-full mt-6" loading={loading}
                    disabled={type === 'login' ? !isLoginValid : !isRegistrationValid}
                >
                    {type === 'login' ? 'Log In' : 'Sign Up'}
                </Button>
            </form>
            
            <div className="text-center mt-4 text-sm">
                {type === 'login' ? (
                    <p>Don't have an account? <span onClick={() => setPage('register')} className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium">Register here</span></p>
                ) : (
                    <p>Already have an account? <span onClick={() => setPage('login')} className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium">Log in</span></p>
                )}
            </div>
        </div>
    );
};