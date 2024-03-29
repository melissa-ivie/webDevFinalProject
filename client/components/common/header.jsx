import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { Button } from '../common/button';


export const Header = (props) => {
    const [, setAuthToken] = useContext(AuthContext);
    const api = useContext(ApiContext);
    const roles = useContext(RolesContext);

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    useEffect(async () => {
        const res = await api.get('/users/me');
        setUser(res.user);
        setLoading(false);
    }, []);

    const logout = async () => {
        const res = await api.del('/sessions');
        if (res.success) {
            setAuthToken(null);
        }
        navigate("/signin")
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="head1">
            <h1>{props.text}</h1>
            <div className='logoutButton'>
                <h2>User: {user.firstName} {user.lastName}</h2>
                <Button type="button" onClick={logout}>
                    Logout
                </Button>
            </div>
            {/* {roles.includes('admin') && (
                <Button type="button" onClick={() => navigate('/admin')}>
                Admin
                </Button>
            )} */}
        </div>
    );
  };