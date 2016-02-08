## Motion

#### Description

The `wbu_motion_new()` function allows to read a motion file specified by the
`filename` parameter. The `filename` can be specified either with an absolute
path or a path relative to the controller directory. If the file can be read, if
its syntax is correct and if it contains at least one pose and one joint
position, then `wbu_motion_new()` returns a `WbMotionRef` that can be used as
parameter in further `wbu_motion_*()` calls. If an error occurred, an error
message is printed to Webots' console, and `NULL` is returned. Motions are
created in *stopped mode*, `wbu_motion_play()` must be called to start the
playback.

The `wbu_motion_delete()` function frees all the memory associated with the
`WbMotionRef`. This `WbMotionRef` can no longer be used afterwards.

#### See also

`wbu_motion_play`

#### Description

The `wbu_motion_play()` starts the playback of the specified motion. This
function registers the motion to the playback system, but the effective playback
happens in the background and is activated as a side effect of calling the
`wb_robot_step()` function. If you want to play a file and wait for its
termination you can do it with this simple function:

Several motion files can be played simultaneously by the same robot, however if
two motion files have common joints, the behavior is undefined.

Note that the steps of the `wb_robot_step()` function and the pose intervals in
the motion file can differ. In this case Webot computes intermediate joint
positions by linear interpolation.

The `wbu_motion_stop()` interrupts the playback of the specified motion but
preserves the current position. After interruption the playback can be resumed
with `wbu_motion_play()`.

The `wbu_motion_set_loop()` sets the *loop mode* of the specified motion. If the
*loop mode* is `true`, the motion repeats when it reaches either the end or the
beginning (*reverse mode*) of the file. The *loop mode* can be used, for
example, to let a robot repeat a series of steps in a walking sequence. Note
that the loop mode can be changed while the motion is playing.

The `wbu_motion_set_reverse()` sets the *reverse mode* of the specified motion.
If the *reverse mode* is `true`, the motion file plays backwards. For example,
by using the *reverse mode*, it may be possible to turn a forwards walking
motion into a backwards walking motion. The *reverse mode* can be changed while
the motion is playing, in this case, the motion will go back from its current
position.

By default, the *loop mode* and *reverse mode* of motions are `false`.

#### See also

`wbu_motion_new`

#### Description

The `wbu_motion_is_over()` function returns `true` when the playback position
has reached the end of the motion file. That is when the last pose has been sent
to the `Motor` nodes using the `wb_motor_set_position()` function. But this does
not mean that the motors have yet reached the specified positions; they may be
slow or blocked by obstacles, robots, walls, the floor, etc. If the motion is in
*loop mode*, this function returns always `false`. Note that
`wbu_motion_is_over()` depends on the *reverse mode*. `wbu_motion_is_over()`
returns `true` when *reverse mode* is `true` and the playback position is at the
beginning of the file or when *reverse mode* is `false` and the playback
position is at the end of the file.

The `wbu_motion_get_duration()` function returns the total duration of the
motion file in milliseconds.

The `wbu_motion_get_time()` function returns the current playback position in
milliseconds.

The `wbu_motion_set_time()` function allows to change the playback position.
This enables, for example, to skip forward or backward. Note that, the position
can be changed whether the motion is playing or stopped. The minimum value is 0
(beginning of the motion), and the maximum value is the value returned by the
`wbu_motion_get_duration()` function (end of the motion).

#### See also

`wbu_motion_play`
