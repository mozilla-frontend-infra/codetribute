For use with legacy implelemtations, it is important that both $asyncbind
and $asyncspawn can be stringified and have no dependencies.

To do so, we require the contents of their dependencies and
inline them.

This reduces runtime size slightly (due to the removal of
processIncludes()) and no longer uses new Function(), making it compatible
with a strict Content-Security-Policy.

'npm install' builds a dist/index.js that contains this implementation.
