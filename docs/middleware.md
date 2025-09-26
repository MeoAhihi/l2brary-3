# Middleware Documentation

## Overview

The L2brary-3 middleware provides authentication and authorization for the application based on Next.js 15 App Router architecture. It uses route groups and role-based access control to manage user access to different parts of the application.

## Route Classification

The middleware classifies routes into four categories:

### 1. Auth Routes
- **Purpose**: Authentication pages (login, sign-up, register)
- **Access**: Only unauthenticated users
- **Behavior**: Authenticated users are redirected to dashboard
- **Routes**: `/login`, `/sign-up`, `/register/*`

### 2. Public Routes  
- **Purpose**: Publicly accessible content
- **Access**: Everyone (authenticated and unauthenticated)
- **Behavior**: No restrictions
- **Routes**: `/`, `/about`, `/contact`, `/courses/*`, `/knowledge/*`

### 3. Protected Routes
- **Purpose**: User-specific functionality
- **Access**: Only authenticated users
- **Behavior**: Unauthenticated users redirected to login
- **Routes**: `/profile`, `/my-progress/*`, `/log-activity`, `/dashboard`

### 4. Admin Routes
- **Purpose**: Administrative functionality
- **Access**: Only authenticated users with Admin role
- **Behavior**: 
  - Unauthenticated users → redirect to login
  - Non-admin users → redirect to dashboard
- **Routes**: `/admin/*`

## User Roles

The system supports three user roles:

1. **Admin**: Full access to all routes including admin panel
2. **Member**: Access to public and protected routes (no admin access)
3. **Monitor**: Access to public and protected routes (no admin access)

## Authentication Flow

1. **Token Extraction**: JWT token extracted from cookies
2. **Token Validation**: Token decrypted and expiration checked
3. **Route Classification**: Current path classified into route category
4. **Access Control**: User access determined based on authentication status and role
5. **Redirects**: Appropriate redirects performed if access denied

## Redirect Behavior

| User Type | Auth Routes | Public Routes | Protected Routes | Admin Routes |
|-----------|-------------|---------------|------------------|--------------|
| Unauthenticated | Allow | Allow | → Login | → Login |
| Member | → Dashboard | Allow | Allow | → Dashboard |
| Admin | → Dashboard | Allow | Allow | Allow |

## Technical Implementation

- **Framework**: Next.js 15 middleware
- **Authentication**: JWT tokens in HTTP-only cookies
- **Authorization**: Role-based access control
- **Route Matching**: Pattern-based route classification
- **Headers**: Custom `X-Pathname-Key` header for debugging

## Configuration

The middleware is configured in `src/middleware.ts` with the following matcher:

```javascript
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*$).*)",
  ],
};
```

This applies middleware to all routes except:
- API routes (`/api/*`)
- Static files (`_next/static/*`)
- Image optimization (`_next/image/*`) 
- Favicon (`favicon.ico`)
- File assets (`.` in path)

## Testing

The middleware logic can be tested using the scenarios in `src/middleware.test.ts`. Key test cases include:

- Unauthenticated user accessing protected routes
- Authenticated user accessing auth routes  
- Non-admin user accessing admin routes
- Admin user accessing all routes
- Public route access for all users

## Maintenance

When adding new routes:

1. Determine the appropriate route category
2. Add route pattern to the corresponding array in middleware
3. Test the access control behavior
4. Update documentation if needed

Routes are matched using `startsWith()` logic, so parent paths will match child paths automatically (e.g., `/admin` matches `/admin/members`).