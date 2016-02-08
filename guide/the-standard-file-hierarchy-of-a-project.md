## The standard File Hierarchy of a Project

Some rules have to be followed in order to create a project which can be used by
Webots. This section describes the file hierarchy of a simple project.

### The Root Directory of a Project

The root directory of a project contains at least a directory called "worlds"
containing a single world file. But several other directories are often
required:

- "controllers": this directory contains the controllers available in each world
files of the current project. The link between the world files and this
directory is done through the *controller* field of the *Robot* node (explained
in the reference manual). More information about this directory in the following
subsections.
- "protos": this directory contains the PROTO files available for all the world
files of the current project.
- "plugins": this directory contains the plugins available in the current project.
The link between the world files and this directory is done through the
*physics* field of the *WordInfo* node (explained in the reference manual).
- "worlds": this directory contains the world files, the project files (see below)
and the textures (typically in a subdirectory called "textures").

### The Project Files

The project files contain information about the GUI (such as the perspective).
These files are hidden. Each world file can have one project file. If the world
file is named "myWorldFile.wbt", its project file is named
".myWorldFile.wbproj". This file is written by Webots when a world is correctly
closed. Removing it allows you to retrieve the default perspective.

### The "controllers" Directory

This directory contains the controllers. Each controller is defined in a
directory. A controller is referenced by the name of the directory. Here is an
example of the controllers directory having one simple controller written in C
which can be edited and executed.


```

controllers/
controllers/simple_controller/
controllers/simple_controller/Makefile
controllers/simple_controller/simple_controller.c
controllers/simple_controller/simple_controller[.exe]
```
