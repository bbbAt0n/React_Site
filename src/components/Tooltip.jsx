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
  as: Component = "span",
  className = "",
  placement = "right",
  offset = 10,
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
      const gap = offset;

      const spaceRight = window.innerWidth - triggerRect.right - padding;
      const spaceLeft = triggerRect.left - padding;
      const spaceAbove = triggerRect.top - padding;
      const spaceBelow = window.innerHeight - triggerRect.bottom - padding;

      // Determine actual placement based on preferred placement and available space
      let actualPlacement = placement;

      if (placement === "right") {
        if (spaceRight >= tooltipRect.width + gap) {
          actualPlacement = "right";
        } else if (spaceLeft >= tooltipRect.width + gap) {
          actualPlacement = "left";
        } else if (spaceAbove >= tooltipRect.height + gap) {
          actualPlacement = "top";
        } else {
          actualPlacement = "bottom";
        }
      } else if (placement === "top") {
        if (spaceAbove >= tooltipRect.height + gap) {
          actualPlacement = "top";
        } else if (spaceBelow >= tooltipRect.height + gap) {
          actualPlacement = "bottom";
        } else if (spaceRight >= tooltipRect.width + gap) {
          actualPlacement = "right";
        } else {
          actualPlacement = "left";
        }
      }

      let top;
      let left;
      let arrowTop = 0;
      let arrowLeft = 0;

      if (actualPlacement === "right") {
        left = triggerRect.right + gap;
        const triggerCenterY = triggerRect.top + triggerRect.height / 2;
        top = triggerCenterY - tooltipRect.height / 2;
        top = Math.max(
          padding,
          Math.min(top, window.innerHeight - tooltipRect.height - padding)
        );
        arrowTop = triggerCenterY - top;
        arrowTop = Math.max(12, Math.min(arrowTop, tooltipRect.height - 12));
      } else if (actualPlacement === "left") {
        left = triggerRect.left - tooltipRect.width - gap;
        const triggerCenterY = triggerRect.top + triggerRect.height / 2;
        top = triggerCenterY - tooltipRect.height / 2;
        top = Math.max(
          padding,
          Math.min(top, window.innerHeight - tooltipRect.height - padding)
        );
        arrowTop = triggerCenterY - top;
        arrowTop = Math.max(12, Math.min(arrowTop, tooltipRect.height - 12));
      } else if (actualPlacement === "top") {
        top = triggerRect.top - tooltipRect.height - gap;
        const triggerCenterX = triggerRect.left + triggerRect.width / 2;
        left = triggerCenterX - tooltipRect.width / 2;
        left = Math.max(
          padding,
          Math.min(left, window.innerWidth - tooltipRect.width - padding)
        );
        arrowLeft = triggerCenterX - left;
        arrowLeft = Math.max(12, Math.min(arrowLeft, tooltipRect.width - 12));
      } else {
        // bottom
        top = triggerRect.bottom + gap;
        const triggerCenterX = triggerRect.left + triggerRect.width / 2;
        left = triggerCenterX - tooltipRect.width / 2;
        left = Math.max(
          padding,
          Math.min(left, window.innerWidth - tooltipRect.width - padding)
        );
        arrowLeft = triggerCenterX - left;
        arrowLeft = Math.max(12, Math.min(arrowLeft, tooltipRect.width - 12));
      }

      tooltip.style.top = `${top}px`;
      tooltip.style.left = `${left}px`;
      tooltip.classList.remove(
        "tooltip--top",
        "tooltip--bottom",
        "tooltip--left",
        "tooltip--right"
      );
      tooltip.classList.add(`tooltip--${actualPlacement}`, "tooltip--visible");
      tooltip.style.visibility = "visible";
      tooltip.style.opacity = "1";

      if (arrow) {
        if (actualPlacement === "right" || actualPlacement === "left") {
          arrow.style.top = `${arrowTop}px`;
          arrow.style.left = "";
        } else {
          arrow.style.left = `${arrowLeft}px`;
          arrow.style.top = "";
        }
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
  }, [isOpen, offset, placement]);

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
