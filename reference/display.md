## Display

Derived from `Device`.


```
Display {
  SFInt32    width          64
  SFInt32    height         64
}
```

### Description

The `Display` node allows to handle a 2D pixel array using simple API functions,
and render it into a 2D overlay on the 3D view, into a 2D texture of any `Shape`
node, or both. It can model an embedded screen or it can display any graphical
information such as graphs, text, robot trajectory, filtered camera images and
so on.

If the first child of the `Display` node is or contains (recursive search if the
first node is a `Group`) a `Shape` node having a `ImageTexture`, then the
internal texture of the(se) `ImageTexture` node(s) is replaced by the texture of
the `Display`.

### Field Summary

- `width`: width of the display in pixels
- `height`: height of the display in pixels

### Coordinates system

Internally, the `Display` image is stored in a 2D pixel array. The RGBA value
(4x8 bits) of a pixel is dislayed in the status bar (the bar at the bottom of
the console window) when the mouse hovers over the pixel in the `Display`. The
2D array has a fixed size defined by the `width` and `height` fields. The (0,0)
coordinate corresponds to the top left pixel, while the (`width`-1,`height`-1)
coordinate corresponds to the bottom right pixel.

### Command stack

Each function call of the `Display` device API (except for
`wb_display_get_width()` and `wb_display_get_height()`) is storing a specific
command into an internal stack. This command stack is sent to Webots during the
next call of the `wb_robot_step()` function, using a FIFO scheme (First In,
First Out), so that commands are executed in the same order as the corresponding
function calls.

### Context

The `Display` device has among other things two kinds of functions; the
contextual ones which allow to set the current state of the display, and the
drawing ones which allow to draw specific primitives. The behavior of the
drawing functions depends on the display context. For example, in order to draw
two red lines, the `wb_display_set_color` contextual function must be called for
setting the display's internal color to red before calling twice the
`wb_display_draw_line` drawing function to draw the two lines.

### Overlay Image


%figure "Display overlay image"
![Display overlay image](png/display_overlay.png)
%end

The display image is shown by default on top of the 3D window with a cyan
border, see . The user can move this display image at the desired position using
the mouse drag and drop and resize it by clicking on the icon at the bottom
right corner. Additionally a close button is available on the top right corner
to hide the image. Once the robot is selected, it is also possible to show or
hide the overlay image from the `Display Devices` item in `Robot` menu.

It is also possible to show the display image in an external window by double-
clicking on it. After doing it, the overlay disappears and the new window pops
up. Then, after closing the window, the overlay will be automatically restored.

### Display Functions

#### Description

These functions return respectively the values of the `width` and `height`
fields.

#### Description

These three functions define the context in which the subsequent drawing
commands (see `draw primitive functions`) will be applied.

`wb_display_set_color()` defines the color for the subsequent drawing commands.
It is expressed as a 3 bytes RGB integer, the most significant byte (leftmost
byte in hexadecimal representation) represents the red component, the second
most significant byte represents the green component and the third byte
represents the blue component. For example, `0xFF00FF` (a mix of the red and
blue components) represents the magenta color. Before the first call to
`wb_display_set_color()`, the default color is white (`0xFFFFFF`).

`wb_display_set_alpha()` defines the alpha channel for the subsequent drawing
commands. This function should be used only with special displays that can be
transparent or semi-transparent (for which one can see through the display). The
alpha channel defines the opacity of a pixel of the display. It is expressed as
a floating point value between 0.0 and 1.0 representing respectively fully
transparent and fully opaque. Intermediate values correspond to semi-transparent
levels. Before the first call to `wb_display_set_alpha()`, the default value for
alpha is 1 (opaque).

`wb_display_set_opacity()` defines with which opacity the new pixels will
replace the old ones for the following drawing instructions. It is expressed as
a floating point value between 0.0 and 1.0; while 0 means that the new pixel has
no effect over the old one and 1 means that the new pixel replaces entirely the
old one. Only the color channel is affected by the `opacity` according to the
formula.


%figure "Blending formula used to compute the new the color channels (Cn) of a pixel
            from the old color channels (Co) of the background pixel and from the opacity."
![Blending formula used to compute the new the color channels (Cn) of a pixel
            from the old color channels (Co) of the background pixel and from the opacity.](pdf/display_opacity.pdf.png)
%end

#### Description

These functions order the execution of a drawing primitive on the display. They
depend on the context of the display as defined by the contextual functions (see
`set context functions`).

`wb_display_draw_pixel()` draws a pixel at the (`x`,`y`) coordinate.

`wb_display_draw_line()` draws a line between the (`x1`,`y1`) and the
(`x2`,`y2`) coordinates using the *Bresenham's line drawing algorithm*.

`wb_display_draw_rectangle()` draws the outline of a rectangle having a size of
`width`*`height`. Its top left pixel is defined by the (`x`,`y`) coordinate.

`wb_display_draw_oval()` draws the outline of an oval. The center of the oval is
specified by the (`cx`,`cy`) coordinate. The horizontal and vertical radius of
the oval are specified by the (`a`,`b`) parameters. If `a` equals `b`, this
function draws a circle.

`wb_display_draw_polygon()` draws the outline of a polygon having `size`
vertices. The list of vertices must be defined into `px` and `py`. If the first
pixel coordinates are not identical to the last ones, the loop is automatically
closed. Here is an example :


```

  const int px[] = {10,20,10, 0};
  const int py[] = {0, 10,20,10};
  wb_display_draw_polygon(display,px,py,4); // draw a diamond
```

`wb_display_draw_text()` draws an ASCII text from the (`x`,`y`) coordinate. The
font used to display the characters has a size of 8x8 pixels. There is no extra
space between characters.

`wb_display_fill_rectangle()` draws a rectangle having the same properties as
the rectangle drawn by the `wb_display_draw_rectangle()` function except that it
is filled instead of outlined.

`wb_display_fill_oval()` draws an oval having the same properties as the oval
drawn by the `wb_display_draw_oval()` function except that it is filled instead
of outlined.

`wb_display_fill_polygon()` draws a polygon having the same properties as the
polygon drawn by the `wb_display_draw_polygon()` function except that it is
filled instead of outlined.

#### Description

In addition to the main display image, each `Display` node also contains a list
of clipboard images used for various image manipulations. This list is initially
empty. The functions described below use a reference (corresponding to the
`WbImageRef` data type) to refer to a specific image. Clipboard images can be
created either with `wb_display_image_new()`, or `wb_display_image_load()`, or
`wb_display_image_copy()`. They should be deleted with the
`wb_display_image_delete()` function.when they are no more used. Finally, note
that both the main display image and the clipboard images have an alpha channel.

`wb_display_image_new()` creates a new clipboard image, with the specified
`with` and `height`, and loads the image `data` into it with respect to the
defined image `format`. Three images format are supported: `WB_IMAGE_RGBA` which
is similar to the image format returned by a `Camera` device and `WB_IMAGE_RGB`
or `WB_IMAGE_ARGB`. `WB_IMAGE_RGBA` and `WB_IMAGE_ARGB` are including an alpha
channel respectively after and before the color components.

`wb_display_image_load()` creates a new clipboard image, loads an image file
into it and returns a reference to the new clipboard image. The image file is
specified with the `filename` parameter (relatively to the controller
directory). An image file can be in either PNG or JPEG format. Note that this
function involves sending an image from the controller process to Webots, thus
possibly affecting the overall simulation speed.

`wb_display_image_copy()` creates a new clipboard image and copies the specified
sub-image from the main display image to the new clipboard image. It returns a
reference to the new clipboard image containing the copied sub-image. The copied
sub-image is defined by its top left coordinate (`x`,`y`) and its dimensions
(`width`,`height`).

`wb_display_image_paste()` pastes a clipboard image referred to by the `ir`
parameter to the main display image. The (`x`,`y`) coordinates define the top
left point of the pasted image. The resulting pixels displayed in the main
display image are computed using a blending operation (similar to the one
depicted in the  formula but involving the alpha channels of the old and new
pixels instead of the opacity).

`wb_display_image_save()` saves a clipboard image referred to by the `ir`
parameter to a file. The file name is defined by the `filename` parameter
(relatively to the controller directory). The image is saved in a file using
either the PNG format or the JPEG format depending on the end of the `filename`
parameter (respectively ".png" and ".jpg"). Note that this function involves
sending an image from Webots to the controller process, thus possibly affecting
the overall simulation speed.

`wb_display_image_delete()` releases the memory used by a clipboard image
specified by the `ir` parameter. After this call the value of `ir` becomes
invalid and should not be used any more. Using this function is recommended
after a clipboard image is not needed any more.
