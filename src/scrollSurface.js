// Keep animation geometry in viewport coordinates while the document owns scrolling.
// The menu temporarily freezes the original viewport shell for its existing transform.
export function scrollSurface(shell) {
  if (!shell) return null
  const frozen = () => shell.classList.contains('shell-frozen')
  return {
    get clientHeight() { return document.documentElement.clientHeight },
    get scrollTop() { return frozen() ? shell.scrollTop : window.scrollY },
    get scrollHeight() { return frozen() ? shell.scrollHeight : document.documentElement.scrollHeight },
    querySelectorAll: (...args) => shell.querySelectorAll(...args),
    scrollTo: (options) => (frozen() ? shell : window).scrollTo(options),
    addEventListener(type, listener, options) {
      window.addEventListener(type, listener, options)
      shell.addEventListener(type, listener, options)
    },
    removeEventListener(type, listener) {
      window.removeEventListener(type, listener)
      shell.removeEventListener(type, listener)
    },
  }
}
