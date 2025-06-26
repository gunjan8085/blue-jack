import Home from "@/components/landingPage/Landingpage";
import React from 'react';

// 👇 This makes sure the page is rendered on every request
export const dynamic = 'force-dynamic';

function Page() {
  return (
    <div>
      <Home />
    </div>
  );
}

export default Page;
