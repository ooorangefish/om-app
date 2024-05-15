import React, { Suspense } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <Suspense>{children}</Suspense>
);

export default Layout;
