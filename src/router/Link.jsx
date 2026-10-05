import { useRouter } from "./context.js";

export function Link({ href, replace = false, onClick, children, ...rest }) {
  const { navigate } = useRouter();

  function handleClick(event) {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) return;

    event.preventDefault();
    navigate(`${url.pathname}${url.search}${url.hash}`, { replace });
  }

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
