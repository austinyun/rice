BUGS
====

* There's still extra newlines all over the HTML output of marked
* [FIXED] Marked is adding an extra paragraph at the start of every article

FEATURES
========
* [HIGH] Add tests with Expresso
* [HIGH] Refactor file access into a separate data module
* [HIGH] Memoize template compilation
* [LOW] Cache pages
    * A few seconds for dynamic pages
    * An hour for SHA archives when that is implemented
* [MED] GZIP responses
    * Done for statics with Lactate

* [DONE] add /robots.txt to the routing table