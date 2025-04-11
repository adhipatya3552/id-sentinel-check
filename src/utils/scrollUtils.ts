
/**
 * Smoothly scrolls the window to a specific element
 * @param elementId The ID of the element to scroll to
 * @param offset Optional offset from the top of the element (in pixels)
 */
export const scrollToElement = (elementId: string, offset: number = 0): void => {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
};

/**
 * Sets up intersection observers for elements that should animate when they come into view
 * @param selector CSS selector for elements to observe
 * @param animationClass CSS class to add when element is visible
 */
export const setupScrollAnimations = (
  selector: string = ".animate-on-scroll",
  animationClass: string = "animate-fade-in"
): void => {
  const elements = document.querySelectorAll(selector);
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
        }
      });
    },
    { threshold: 0.1 }
  );
  
  elements.forEach((element) => {
    observer.observe(element);
  });
};
