import { useCallback, useEffect, useMemo, useState } from "react";
import { RouterContext } from "./context.js";

function readLocation() {
  return {
    pathname: normalizePath(window.location.pathname),
    search: window.location.search,
    hash: window.location.hash,
  };
}

function normalizePath(pathname) {
  if (!pathname || pathname === "") return "/";
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function matchPath(pattern, pathname) {
  if (pattern === "*") return {};
  if (pattern === "/") return pathname === "/" ? {} : null;

  const patternParts = pattern.split("/").filter(Boolean);
  const pathParts = pathname.split("/").filter(Boolean);
  if (patternParts.length !== pathParts.length) return null;

  const params = {};
  for (let i = 0; i < patternParts.length; i += 1) {
    const part = patternParts[i];
    if (part.startsWith(":")) {
      params[part.slice(1)] = decodeURIComponent(pathParts[i]);
    } else if (part !== pathParts[i]) {
      return null;
    }
  }
  return params;
}

function matchRoute(routes, pathname) {
  for (const route of routes) {
    const params = matchPath(route.path, pathname);
    if (params) {
      return { route, params };
    }
  }
  const fallback = routes.find((route) => route.path === "*");
  return { route: fallback ?? null, params: {} };
}

function toHref(to) {
  const url = new URL(to, window.location.origin);
  return `${normalizePath(url.pathname)}${url.search}${url.hash}`;
}

export function Router({ routes, children }) {
  const [location, setLocation] = useState(readLocation);

  const navigate = useCallback((to, { replace = false } = {}) => {
    const href = toHref(to);
    const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (href === current) {
      setLocation(readLocation());
      return;
    }
    if (replace) {
      window.history.replaceState({}, "", href);
    } else {
      window.history.pushState({}, "", href);
    }
    setLocation(readLocation());
  }, []);

  useEffect(() => {
    const onPopState = () => setLocation(readLocation());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = decodeURIComponent(location.hash.slice(1));
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    requestAnimationFrame(() => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      } else {
        window.scrollTo(0, 0);
      }
    });
  }, [location.pathname, location.hash]);

  const match = useMemo(
    () => matchRoute(routes, location.pathname),
    [routes, location.pathname],
  );

  const value = useMemo(
    () => ({
      location,
      navigate,
      params: match.params,
      route: match.route,
    }),
    [location, navigate, match],
  );

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
}
