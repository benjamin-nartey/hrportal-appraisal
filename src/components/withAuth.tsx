// import { ComponentType, useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { getCookie } from "@/lib/getCookie";
// import { fetchUser } from "@/lib/fetchUser";

// type WithAuthHOC = <P extends {}>(
//   WrappedComponent: ComponentType<P>,
//   requiredPermission: string
// ) => ComponentType<P>;

// export const withAuth: WithAuthHOC = (WrappedComponent, requiredPermission) => {
//   const AuthenticatedComponent = (props: any) => {
//     const router = useRouter();
//     const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
//     const [isLoading, setIsLoading] = useState<boolean>(true);

//     useEffect(() => {
//       async function checkAuth() {
//         const token = getCookie(document.cookie, "token");
//         if (!token) {
//           router.push("/unauthorized");
//           return;
//         }

//         try {
//           const userData: UserProps = await fetchUser(
//             "http://localhost:8000/user",
//             token
//           );
//           if ("User" in userData && userData.User) {
//             const permissions = userData.User.role.flatMap((roleData) =>
//               roleData.rolePermissions.map(
//                 (permissionData) => permissionData.permission.name
//               )
//             );
//             if (permissions.includes(requiredPermission)) {
//               setIsAuthorized(true);
//             } else {
//               router.push("/unauthorized");
//             }
//           } else {
//             router.push("/unauthorized");
//           }
//         } catch (error) {
//           console.error("Authentication error:", error);
//           router.push("/unauthorized");
//         }

//         setIsLoading(false);
//       }

//       checkAuth();
//     }, [router, requiredPermission]);

//     if (isLoading) {
//       return <div>Loading...</div>; // Or your custom loading component
//     }

//     return isAuthorized ? <WrappedComponent {...props} /> : null;
//   };

//   return AuthenticatedComponent;
// };

// import React, { useEffect, useState, ComponentType } from "react";
// import { useRouter } from "next/router";
// import { refreshTokenAndFetchUser } from "@/lib/refreshTokenAndFetchUser";
// // import { refreshTokenAndFetchUser } from './refreshTokenAndFetchUser';
// // import { PERMISSIONS } from './lib/const/permissions';
// import { PERMISSIONS } from "@/lib/const/permissions";

// // Define types for user and token data
// // interface UserRole {
// //   rolePermissions: Array<{
// //     permission: {
// //       name: string;
// //     };
// //   }>;
// // }

// // interface UserProps {
// //   User: {
// //     role: UserRole[];
// //   };
// // }

// // interface AccessTokenProps {
// //   token: string;
// //   refreshToken: string;
// // }

// // Define the HOC function type
// type WithAuthHOC = <P extends {}>(
//   WrappedComponent: ComponentType<P>,
//   requiredPermission: string
// ) => ComponentType<P>;

// export const withAuth: WithAuthHOC = (WrappedComponent, requiredPermission) => {
//   const AuthenticatedComponent = (props: any) => {
//     const router = useRouter();
//     const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
//     const [isLoading, setIsLoading] = useState<boolean>(true);

//     useEffect(() => {
//       async function checkAuth() {
//         try {
//           const { userData, tokenData } = await refreshTokenAndFetchUser();

//           // Update cookies with new tokens
//           document.cookie = `token=${tokenData.token}; path=/; httpOnly`;
//           document.cookie = `refreshToken=${tokenData.refreshToken}; path=/; httpOnly`;

//           const permissions = userData.User.role.flatMap((roleData) =>
//             roleData.rolePermissions.map(
//               (permissionData) => permissionData.permission.name
//             )
//           );

//           if (permissions.includes(requiredPermission)) {
//             setIsAuthorized(true);
//           } else {
//             router.push("/unauthorized");
//           }
//         } catch (error) {
//           console.error("Authentication error:", error);
//           router.push("/unauthorized");
//         }

//         setIsLoading(false);
//       }

//       checkAuth();
//     }, [router, requiredPermission]);

//     if (isLoading) {
//       return <div>Loading...</div>; // Or your custom loading component
//     }

//     return isAuthorized ? <WrappedComponent {...props} /> : null;
//   };

//   return AuthenticatedComponent;
// };

// withAuth.tsx
import { redirect } from "next/navigation";
import { refreshTokenAndFetchUser } from "@/lib/refreshTokenAndFetchUser";

import ClientAuth from "./ClientAuth";
import ErrorBoundary from "./ErrorBoundary";

export function withAuth(
  WrappedComponent: React.ComponentType,
  requiredPermission: string
) {
  return async function AuthWrapper(props: any) {
    try {
      const { userData, tokenData } = await refreshTokenAndFetchUser();

      // Check permissions
      const permissions = userData?.User.role.flatMap((roleData) =>
        roleData.rolePermissions.map(
          (permissionData) => permissionData.permission.name
        )
      );

      if (!permissions?.includes(requiredPermission)) {
        return redirect("/unauthorized");
      }

      // If we reach here, the user is authorized
      return (
        <ErrorBoundary
          fallback={<div>An error occurred. Please try again later.</div>}
        >
          <ClientAuth
            newToken={tokenData?.token}
            newRefreshToken={tokenData?.refreshToken}
          >
            <WrappedComponent {...props} />
          </ClientAuth>
        </ErrorBoundary>
      );
    } catch (error) {
      console.error("Authentication error:", error);

      if (error instanceof Error && error.message === "Unauthorized") {
        return redirect("/unauthorized"); // Redirect to unauthorized page for "Unauthorized" error
      } else {
        return redirect("/"); // Redirect to login for any other error
      }
    }
  };
}
