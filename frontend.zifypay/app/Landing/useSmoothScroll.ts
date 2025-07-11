import { useEffect } from "react";

// Basic smooth scroll using CSS
export default function useSmoothScroll() {
  useEffect(() => {
    const html = document.documentElement;
    const prevScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "smooth";
    return () => {
      html.style.scrollBehavior = prevScrollBehavior;
    };
  }, []);
}

// For a more advanced inertia/lanis effect, you could use a library like 'locomotive-scroll' or implement a custom solution with requestAnimationFrame.
// This hook provides native smooth scroll for all browsers that support it.
