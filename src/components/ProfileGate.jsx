import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CreateProfile from './CreateProfile';

function ProfileGate() {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId;
  const role = location.state?.role;
  const [hasProfile, setHasProfile] = useState(null);

  useEffect(() => {
    if (!userId || !role) return;

    fetch(`http://localhost:3000/profiles?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          navigate(`/${role}/${userId}/dashboard`);
        } else {
          setHasProfile(false);
        }
      })
      .catch(err => {
        console.error('Error checking profile:', err);
        setHasProfile(false);
      });
  }, [userId, role, navigate]);

  if (hasProfile === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 text-gray-600 dark:text-gray-300">
        Checking your profile...
      </div>
    );
  }

  return <CreateProfile />;
}

export default ProfileGate;
