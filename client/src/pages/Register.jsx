import { useState } from "react";
import { registerUser } from "../api/authApi";

function Register(){
    const [formData, setFormData] = useState({
        name: '',
        email:'',
        password: '',
    });

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);
        
        try{
            const data = await registerUser(formData);
            setMessage(data.message || 'Registration successful!');
            setFormData({ name:'', email:'', password:''});
        }catch (error){
            setMessage(
                error.response?.data?.message ||
                    'Registration failed. please try again.'
            );
        }finally{
            setLoading(false);
        }
    };

    return(
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-xl bg-white p-8 shadow-lg">

                <h1 className="text-center text-gray-900">
                    Create Account
                </h1>

                <p className="text-center text-gray-500">
                    Join the Mini SaaS Template Store
                </p>

                <input 
                    name="name"
                    type="text"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border p-3" 
                 />

                <input 
                    name="email"
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border p-3" 
                />

                <input 
                    name="password"
                    type="password"
                    placeholder="Password (minimum 8 character)"
                    value={formData.password}
                    onChange={handleChange}
                    minLength={8}
                    required
                    className="w-full rounded-lg border p-3"
                />

                {message && (
                    <p role="status" className="text-sm text-blue-700">
                        {message}
                    </p>
                )}

                <button type="submit" disabled={loading} className="w-full rounded-lg bg-green-700 p-3 font-semibold text-white hover:bg-green-800 disabled:opacity-50">
                    {loading ? 'Creating account...': 'Register'}
                </button>

                <p className="text-center text-gray-600">
                    Already have an account?{''}
                    <a href="/login" className="font-semibold text-blue-600 hover:underline">Login</a>
                </p>

            </form>
        </div>
    );
}

export default Register;