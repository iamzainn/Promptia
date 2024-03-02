import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
 
  publicRoutes: ['/',"/api/webhooks(.*)","/api/prompt(.*)"],
  
  ignoredRoutes: ['/home','/projects','/about'],
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};