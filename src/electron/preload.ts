// The preload script is needed to expose Node functionality in the renderer
// process. Letting the browser execute arbitrary Node functions, which have
// access to the underlying system, would be a security nightmare. However, we
// do need some form of communication between the main and renderer process and
// that communication API only lives in the main process, accessible by Node.
// The preload script allows us to selectively expose some functionality to the
// renderer process.
