import { useState, useRef, useEffect, useLayoutEffect, useId } from "react";
import { createPortal } from "react-dom";
import "./Tooltip.css";

/**
 * Reusable Tooltip component using React Portal (createPortal) and dynamic coordinate computation.
 *
 * Meets criteria:
 * 1. Rendered outside the local component hierarchy into document.body via Portal
 * 2. Placed next to the trigger element based on getBoundingClientRect()
 * 3. Position stays accurate during scrolling (window & container scroll listeners)
 * 4. Never clipped by parent containers with overflow:hidden or stacking contexts
 */
export function Tooltip({
  content,
  children,
  as: Component = "div",
  className = "",
  offset = 8,
  disabled = false,
  tabIndex = 0,
  ariaLabel,
  ...restProps
}) {
  const [isOpen, setIsOpen] = useState(false);

  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const arrowRef = useRef(null);
  const tooltipId = useId();

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Dynamic coordinate calculation and real-time positioning
  useLayoutEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      const trigger = triggerRef.current;
      const tooltip = tooltipRef.current;
      const arrow = arrowRef.current;
      if (!trigger || !tooltip) return;

      const triggerRect = trigger.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();

      // If trigger element has scrolled outside the viewport, hide the tooltip
      if (
        triggerRect.bottom < 0 ||
        triggerRect.top > window.innerHeight ||
        triggerRect.right < 0 ||
        triggerRect.left > window.innerWidth
      ) {
        tooltip.style.visibility = "hidden";
        tooltip.style.opacity = "0";
        return;
      }

      const padding = 12;
      const spaceAbove = triggerRect.top;
      const spaceBelow = window.innerHeight - triggerRect.bottom;

      // Prefer placing above if enough space, otherwise below
      const placeTop =
        spaceAbove >= tooltipRect.height + offset || spaceAbove >= spaceBelow;

      const top = placeTop
        ? triggerRect.top - tooltipRect.height - offset
        : triggerRect.bottom + offset;

      // Horizontal centering relative to trigger element
      const triggerCenter = triggerRect.left + triggerRect.width / 2;
      let left = triggerCenter - tooltipRect.width / 2;

      // Boundary constraint within viewport
      const maxLeft = window.innerWidth - tooltipRect.width - padding;
      const minLeft = padding;
      left = Math.max(minLeft, Math.min(left, maxLeft));

      // Pointer arrow position relative to tooltip box
      const arrowLeft = Math.max(
        12,
        Math.min(triggerCenter - left, tooltipRect.width - 12)
      );

      tooltip.style.top = `${top}px`;
      tooltip.style.left = `${left}px`;
      tooltip.classList.toggle("tooltip--top", placeTop);
      tooltip.classList.toggle("tooltip--bottom", !placeTop);
      tooltip.classList.add("tooltip--visible");
      tooltip.style.visibility = "visible";
      tooltip.style.opacity = "1";

      if (arrow) {
        arrow.style.left = `${arrowLeft}px`;
      }
    };

    updatePosition();

    window.addEventListener("scroll", updatePosition, {
      passive: true,
      capture: true,
    });
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, {
        capture: true,
      });
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen, offset]);

  const handleMouseEnter = () => {
    if (!disabled && content) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleFocus = () => {
    if (!disabled && content) {
      setIsOpen(true);
    }
  };

  const handleBlur = () => {
    setIsOpen(false);
  };

  const showPortal =
    isOpen && Boolean(content) && typeof document !== "undefined";

  return (
    <>
      <Component
        ref={triggerRef}
        className={`tooltip-trigger ${className}`.trim()}
        tabIndex={disabled ? undefined : tabIndex}
        aria-describedby={isOpen ? tooltipId : undefined}
        aria-label={ariaLabel}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...restProps}
      >
        {children}
      </Component>

      {showPortal &&
        createPortal(
          <div
            id={tooltipId}
            ref={tooltipRef}
            role="tooltip"
            className="tooltip"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              visibility: "hidden",
              opacity: 0,
            }}
          >
            <div className="tooltip__content">{content}</div>
            <div
              ref={arrowRef}
              className="tooltip__arrow"
              aria-hidden="true"
            />
          </div>,
          document.body
        )}
    </>
  );
}
