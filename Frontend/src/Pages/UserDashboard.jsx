const UserDashboardPage = ({ setPage }) => {
    const { user, isLister, handleLogout } = useAuth();
    
    if (!user) {
        return <div className="p-8 text-center"><p className="text-xl">Please log in to view your dashboard.</p></div>;
    }

    // Filter properties owned/listed by this user
    const userListings = MockProperties.filter(p => p.listingType === (isLister ? 'sale' : 'rent')); // Mock logic

    return (
        <div className="space-y-12">
            <h2 className="text-4xl font-bold text-gray-800 border-b pb-4">Welcome, {user.firstName || user.username}!</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Summary Card */}
                <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-2xl border border-blue-100 space-y-3 h-fit">
                    <div className="flex items-center space-x-3 pb-3 border-b">
                        <User className="w-8 h-8 text-blue-600" />
                        <h3 className="text-2xl font-semibold">My Account</h3>
                    </div>
                    <p className="text-gray-700"><strong>Role:</strong> <span className="font-medium text-blue-600">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span></p>
                    <p className="text-gray-700"><strong>Username:</strong> {user.username}</p>
                    <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
                    <Button onClick={() => handleLogout()} primary={false} className="w-full mt-4 bg-red-50 text-red-600 hover:bg-red-100">
                        Sign Out
                    </Button>
                </div>
                
                {/* Dashboard Content */}
                <div className="md:col-span-2 space-y-8">
                    
                    {/* Listings Section (for Lister roles) */}
                    {isLister && (
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                            <div className="flex justify-between items-center mb-4 pb-3 border-b">
                                <h3 className="text-2xl font-bold text-gray-800">My Listings ({userListings.length})</h3>
                                <Button onClick={() => setPage('createListing')} icon={PlusCircle}>
                                    New Listing
                                </Button>
                            </div>
                            {userListings.length > 0 ? (
                                <div className="space-y-4">
                                    {userListings.map(p => (
                                        <div key={p._id} className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 transition">
                                            <span className="font-medium">{p.title}</span>
                                            <div className="flex items-center space-x-3">
                                                <span className="text-sm text-gray-500">
                                                    {p.listingType.toUpperCase()}
                                                </span>
                                                <Button onClick={() => alert(`Edit ${p._id}`)} primary={false} className="py-1 px-3">
                                                    Edit
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">You currently have no properties listed.</p>
                            )}
                        </div>
                    )}

                    {/* Favorites/Saved Searches Section (for Buyer roles) */}
                    {!isLister && (
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4 pb-3 border-b">Saved Properties (Mock)</h3>
                            <p className="text-gray-500">No saved properties found. Start searching!</p>
                            <Button onClick={() => setPage('listings')} primary={true} className="mt-4">
                                Browse Listings
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
