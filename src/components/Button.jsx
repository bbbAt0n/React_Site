import { Link } from "../router/Link.jsx";
import "./Button.css";

export function Button({
  href,
  variant = "text",
  type = "button",
  className = "",
  children,
  ...rest
}) {
  const classes = ["button", `button--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  if (href) {
    const external = /^https?:/i.test(href);
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...rest}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
