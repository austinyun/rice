RICE
====

Rice is inspired by the [Wheat blog engine](https://github.com/creationix/wheat)
using <strike>Jade</strike>[doT](http://github.com/olado/doT/) for templating /
markdown support (wheat + jade = rice... even though jade is no longer used).

How-To
======

Rice requires a folder structure like so:

* Root
    * posts/
        *contains .md files
    * public/
        * stylesheets
            * contains .css files
        * images
            * contains images, such as backgrounds, favicons, etc.
    * templates/
        * contains .dot doT template files

A complete example can be found in the examples directory.

Project Outline
===============

* Blog entries stored as .markdown files in a Git repository
* Walk through the articles directory
* Generate routes based on article titles 
* Generate HTML by plugging the article markdown into the
  <strike>Jade</strike> doT template

Project Goals
=============

* Leverage existing Node modules for as much functionality as possible
* Be lean, quick to setup, and easily deployable to Heroku and other cloud services
* No reliance on a database
* Run my personal blog
