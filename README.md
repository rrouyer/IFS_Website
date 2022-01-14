# IFS Website
# Iterative Function Systems(IFS)
===============

A website that will allow both client side and server side generation of images produced by iterative function systems.
An IFS is a system of functions that can be used to transform a point by picking one at random and using it to tansform the point. 
If you do this enough times, the point will convergere towards an image or diverge.

To start, initalize the server (pyWebServ.py) and go to lochalhost:8009 and it should serve you index.html. If the server is ever ran on a more powerful machine than the client then the serverside generation should be used to create larger IFS images, otherwise the clientside is fine. Also if you have autogenerate on consider lowering the resolution and iterations if the generation isn't as quick as you would like it to be.

dependancies for python include:
* numpy
* PIL
* cgi
* json
