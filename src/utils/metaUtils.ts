export const getMetadata = (page: string) => {
  switch (page) {
    case 'signin':
      return {
        title: 'Sign In',
        description: 'Sign in to your account.',
        icon: '/favicon.png',
      };
    default:
      return {
        title: 'My App',
        description: 'Default description of My App',
        icon: '/favicon.png',
      };
  }
};
