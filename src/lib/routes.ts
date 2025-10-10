// Helper function to check if path matches any route pattern
export const matchesRoutes = (pathname: string, routes: string[]): boolean => {
  return routes.some((route) => {
    if (route === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(route);
  });
};
