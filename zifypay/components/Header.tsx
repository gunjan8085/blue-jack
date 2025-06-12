'use client';

import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Searchbar from './Searchbar';
import Link from 'next/link';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Hardcoded user info
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    role: 'User', // Try: 'User' | 'Business' | null
  };

  const showMenu = true; // Menu is always shown for demo

  const handleLogOut = () => {
    console.log('logout successful');
    router.push('/');
  };

  return (
    <header className="tw-w-full tw-px-8 tw-py-4 tw-flex tw-justify-between tw-relative tw-items-center tw-top-0 tw-z-50">
      <motion.div
        className="tw-text-xl tw-font-bold"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 0.2,
          duration: 0.4,
          scale: { type: 'spring', bounce: 0.5 },
        }}
        onClick={() => router.push('/')}
      >
        Brand
      </motion.div>

      {(pathname.includes('search') ||
        pathname.includes('business') ||
        pathname.includes('user/appointments') ||
        pathname.includes('user/profile')) && <Searchbar />}

      <div className="tw-flex tw-gap-4 tw-items-center">
        {!user && (
          <motion.button
            onClick={() => router.push('/auth')}
            className="tw-cursor-pointer tw-bg-white tw-px-4 tw-py-2 tw-rounded-2xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.4, scale: { type: 'spring', bounce: 0.5 } }}
          >
            Log In
          </motion.button>
        )}

        {user?.role === 'User' && !pathname.includes('user/profile') && (
          <motion.button
            onClick={() => router.push('/user/profile')}
            className="tw-cursor-pointer tw-bg-white tw-px-4 tw-py-2 tw-rounded-2xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.4, scale: { type: 'spring', bounce: 0.5 } }}
          >
            Profile
          </motion.button>
        )}

        {user?.role !== 'Business' && (
          <motion.button
            onClick={() => router.push('/auth/login')}
            className="tw-cursor-pointer tw-bg-white tw-px-4 tw-py-2 tw-rounded-2xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.4, scale: { type: 'spring', bounce: 0.5 } }}
          >
            For Business
          </motion.button>
        )}

        {user?.role === 'Business' && (
          <motion.button
            onClick={() => router.push('/booking-dashboard')}
            className="tw-cursor-pointer tw-bg-white tw-px-4 tw-py-2 tw-rounded-2xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.4, scale: { type: 'spring', bounce: 0.5 } }}
          >
            Dashboard
          </motion.button>
        )}

        <motion.button
          onClick={() => {}}
          className="tw-relative tw-cursor-pointer tw-bg-white tw-px-4 tw-py-2 tw-rounded-2xl tw-flex tw-gap-2 tw-items-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4, scale: { type: 'spring', bounce: 0.5 } }}
        >
          Menu
        </motion.button>

        {showMenu && (
          <nav className="tw-absolute tw-top-full tw-right-2 tw-bg-white tw-shadow-md tw-rounded-md tw-p-4 tw-flex tw-flex-col tw-gap-2 tw-z-50">
            {user?.role === 'User' && (
              <motion.span className="tw-font-semibold tw-text-lg">
                {user.firstName} {user.lastName}
              </motion.span>
            )}

            {user?.role === 'User' && !pathname.includes('user/profile') && (
              <motion.div whileHover={{ scale: 1.1 }} onClick={() => router.push('/user/profile')}>
                Profile
              </motion.div>
            )}

            {user?.role === 'User' && !pathname.includes('user/appointments') && (
              <motion.div whileHover={{ scale: 1.1 }} onClick={() => router.push('/user/appointments')}>
                Appointments
              </motion.div>
            )}

            {user?.role !== 'Business' && (
              <motion.div whileHover={{ scale: 1.1 }} onClick={() => router.push('/businesses')}>
                For Business
              </motion.div>
            )}

            <motion.div whileHover={{ scale: 1.1 }} onClick={() => router.push('/customer-support')}>
              Help and Support
            </motion.div>

            {!user && (
              <motion.div whileHover={{ scale: 1.1 }} onClick={() => router.push('/auth')}>
                Log In
              </motion.div>
            )}

            {user?.role === 'User' && (
              <motion.div onClick={handleLogOut}>
                Logout
              </motion.div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
