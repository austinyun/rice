RICE
====

Rice is a clone of the [Wheat blog engine](https://github.com/creationix/wheat)
using [Jade](https://github.com/visionmedia/jade/) for templating / markdown support (wheat + jade = rice)

Project Outline
===============

* Blog entries stored as .markdown files in a Git repository
* Walk through the articles directory
* Generate routes based on article titles 
* Generate HTML by plugging the article markdown into the Jade template

Project Goals
=============

* Leverage existing Node modules for as much functionality as possible
* Be lean, quick to setup, and easily deployable to Heroku and other cloud services
* No reliance on a database
* Run my personal blog

Possible Goals
==============

* Generate and serve static HTML pages somehow? Check to see how Jekyll does it