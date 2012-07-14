BUGS
====

* [LOW] Marked is adding an extra paragraph at the start of every article

FEATURES
========
* [HIGH] Memoize template compilation
* [LOW] Cache pages
    * A few seconds for dynamic pages
    * An hour for SHA archives when that is implemented
    * CloudFlare already caches, see how that interops
        * It should be unnecessary to cache static content (images, css, etc)
        * because of that
* [MED] GZIP responses
* [HIGH] add /robots.txt to the routing table
* [LOW] Search for posts by tag
