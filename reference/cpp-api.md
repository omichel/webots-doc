## C++ API

The following tables describe the C++ classes and their methods.

```| #include <webots/Accelerometer.hpp> |
| class `Accelerometer` : public `Device` { |
| virtual void `enable`(int ms); |
| virtual void `disable`(); |
| int `getSamplingPeriod`(); |
| const double *`getValues`() const; |
| }; |
```


```| #include <webots/Brake.hpp> |
| class `Brake` : public `Device` { |
| void `setDampingConstant`(double dampingConstant) const; |
| int `getType`() const; |
| }; |
```


```| #include <webots/Camera.hpp> |
| class `Camera` : public `Device` { |
| enum {COLOR, RANGE\_FINDER, BOTH}; |
| virtual void `enable`(int ms); |
| virtual void `disable`(); |
| int `getSamplingPeriod`(); |
| double `getFov`() const; |
| double `getMinFov`() const; |
| double `getMaxFov`() const; |
| virtual void `setFov`(double fov); |
| double `getFocalLength`() const; |
| double `getFocalDistance`() const; |
| double `getMaxFocalDistance`() const; |
| double `getMinFocalDistance`() const; |
| virtual void `setFocalDistance`(double focalDistance); |
| int `getWidth`() const; |
| int `getHeight`() const; |
| double `getNear`() const; |
| double `getMaxRange`() const; |
| int `getType`() const; |
| const unsigned char *`getImage`() const; |
| static unsigned char `imageGetRed`(const unsigned char *image, |
| int width, int x, int y); |
| static unsigned char `imageGetGreen`(const unsigned char *image, |
| int width, int x, int y); |
| static unsigned char `imageGetBlue`(const unsigned char *image, |
| int width, int x, int y); |
| static unsigned char `imageGetGrey`(const unsigned char *image, |
| int width, int x, int y); |
| const float *`getRangeImage`() const; |
| static float `rangeImageGetDepth`(const float *image, |
| int width, int x, int y); |
| int `saveImage`(const std::string &filename, int quality) const; |
| }; |
```


```| #include <webots/Compass.hpp> |
| class `Compass` : public `Device` { |
| virtual void `enable`(int ms); |
| virtual void `disable`(); |
| int `getSamplingPeriod`(); |
| const double *`getValues`() const; |
| }; |
```


```| #include <webots/Connector.hpp> |
| class `Connector` : public `Device` { |
| virtual void `enablePresence`(int ms); |
| virtual void `disablePresence`(); |
| int `getPresence`() const; |
| virtual void `lock`(); |
| virtual void `unlock`(); |
| }; |
```


```| #include <webots/Device.hpp> |
| class `Device` { |
| const std::string &`getModel`() const; |
| const std::string &`getName`() const; |
| int `getNodeType`() const; |
| }; |
```


```| #include <webots/DifferentialWheels.hpp> |
| class `DifferentialWheels` : public `Robot` { |
| `DifferentialWheels`(); |
| virtual `~DifferentialWheels`(); |
| virtual void `setSpeed`(double left, double right); |
| double `getLeftSpeed`() const; |
| double `getRightSpeed`() const; |
| virtual void `enableEncoders`(int ms); |
| virtual void `disableEncoders`(); |
| int `getEncodersSamplingPeriod`(); |
| double `getLeftEncoder`() const; |
| double `getRightEncoder`() const; |
| virtual void `setEncoders`(double left, double right); |
| double `getMaxSpeed`() const; |
| double `getSpeedUnit`() const; |
| }; |
```


```| #include <webots/Display.hpp> |
| class `Display` : public `Device` { |
| enum {RGB, RGBA, ARGB, BGRA}; |
| int `getWidth`() const; |
| int `getHeight`() const; |
| virtual void `setColor`(int color); |
| virtual void `setAlpha`(double alpha); |
| virtual void `setOpacity`(double opacity); |
| virtual void `drawPixel`(int x1, int y1); |
| virtual void `drawLine`(int x1, int y1, int x2, int y2); |
| virtual void `drawRectangle`(int x, int y, int width, int height); |
| virtual void `drawOval`(int cx, int cy, int a, int b); |
| virtual void `drawPolygon`(const int *x, const int *y, int size); |
| virtual void `drawText`(const std::string &txt, int x, int y); |
| virtual void `fillRectangle`(int x, int y, int width, int height); |
| virtual void `fillOval`(int cx, int cy, int a, int b); |
| virtual void `fillPolygon`(const int *x, const int *y, int size); |
| `ImageRef` *`imageCopy`(int x, int y, int width, int height) const; |
| virtual void `imagePaste`(`ImageRef` *ir, int x, int y); |
| `ImageRef` *`imageLoad`(const std::string &filename) const; |
| `ImageRef` *`imageNew`(int width, int height, const void *data, int format)
const; |
| void `imageSave`(`ImageRef` *ir, const std::string &filename) const; |
| void `imageDelete`(`ImageRef` *ir) const; |
| }; |
```


```| #include <webots/DistanceSensor.hpp> |
| class `DistanceSensor` : public `Device` { |
| virtual void `enable`(int ms); |
| virtual void `disable`(); |
| int `getSamplingPeriod`(); |
| double `getValue`() const; |
| }; |
```


```| #include <webots/Emitter.hpp> |
| class `Emitter` : public `Device` { |
| enum {CHANNEL\_BROADCAST}; |
| virtual int `send`(const void *data, int size); |
| int `getChannel`() const; |
| virtual void `setChannel`(int channel); |
| double `getRange`() const; |
| virtual void `setRange`(double range); |
| int `getBufferSize`() const; |
| }; |
```


```| #include <webots/Field.hpp> |
| class Field { |
| enum { SF\_BOOL, SF\_INT32, SF\_FLOAT, SF\_VEC2F, SF\_VEC3F, SF\_ROTATION,
SF\_COLOR, SF\_STRING, SF\_NODE, MF, MF\_INT32, MF\_FLOAT, MF\_VEC2F, MF\_VEC3F,
MF\_COLOR, MF\_STRING, MF\_NODE }; |
| int `getType`() const; |
| std::string `getTypeName`() const; |
| int `getCount`() const; |
| bool `getSFBool`() const; |
| int `getSFInt32`() const; |
| double `getSFFloat`() const; |
| const double *`getSFVec2f`() const; |
| const double *`getSFVec3f`() const; |
| const double *`getSFRotation`() const; |
| const double *`getSFColor`() const; |
| std::string `getSFString`() const; |
| `Node` *`getSFNode`() const; |
| bool `getMFBool`(int index) const; |
| int `getMFInt32`(int index) const; |
| double `getMFFloat`(int index) const; |
| const double *`getMFVec2f`(int index) const; |
| const double *`getMFVec3f`(int index) const; |
| const double *`getMFRotation`(int index) const; |
| const double *`getMFColor`(int index) const; |
| std::string `getMFString`(int index) const; |
| `Node` *`getMFNode`(int index) const; |
| void `setSFBool`(bool value); |
| void `setSFInt32`(int value); |
| void `setSFFloat`(double value); |
| void `setSFVec2f`(const double values[2]); |
| void `setSFVec3f`(const double values[3]); |
| void `setSFRotation`(const double values[4]); |
| void `setSFColor`(const double values[3]); |
| void `setSFString`(const std::string &value); |
| void `setMFBool`(int index, bool value); |
| void `setMFInt32`(int index, int value); |
| void `setMFFloat`(int index, double value); |
| void `setMFVec2f`(int index, const double values[2]); |
| void `setMFVec3f`(int index, const double values[3]); |
| void `setMFRotation`(int index, const double values[4]); |
| void `setMFColor`(int index, const double values[3]); |
| void `setMFString`(int index, const std::string &value); |
| void `importMFNode`(int position, const std::string &filename); |
| void `importMFNodeFromString`(int position, const std::string &nodeString); |
| void `removeMFNode`(int position); |
| }; |
```


```| #include <webots/GPS.hpp> |
| class `GPS` : public `Device` { |
| virtual void `enable`(int ms); |
| virtual void `disable`(); |
| int `getSamplingPeriod`(); |
| const double *`getValues`() const; |
| }; |
```


```| #include <webots/Gyro.hpp> |
| class `Gyro` : public `Device` { |
| virtual void `enable`(int ms); |
| virtual void `disable`(); |
| int `getSamplingPeriod`(); |
| const double *`getValues`() const; |
| }; |
```


```| #include <webots/ImageRef.hpp> |
| class ImageRef { |
| }; |
```


```| #include <webots/InertialUnit.hpp> |
| class `InertialUnit` : public `Device` { |
| virtual void `enable`(int ms); |
| virtual void `disable`(); |
| int `getSamplingPeriod`(); |
| const double *`getRollPitchYaw`() const; |
| }; |
```


```| #include <webots/LED.hpp> |
| class `LED` : public `Device` { |
| virtual void `set`(int value); |
| int `get`() const; |
| }; |
```


```| #include <webots/LightSensor.hpp> |
| class `LightSensor` : public `Device` { |
| virtual void `enable`(int ms); |
| virtual void `disable`(); |
| int `getSamplingPeriod`(); |
| double `getValue`() const; |
| }; |
```


```| #include <webots/utils/Motion.hpp> |
| class `Motion` { |
| `Motion`(const std::string &fileName); |
| virtual `~Motion`(); |
| bool `isValid`() const; |
| virtual void `play`(); |
| virtual void `stop`(); |
| virtual void `setLoop`(bool loop); |
| virtual void `setReverse`(bool reverse); |
| bool `isOver`() const; |
| int `getDuration`() const; |
| int `getTime`() const; |
| virtual void `setTime`(int time); |
| }; |
```


```| #include <webots/Motor.hpp> |
| class `Motor` : public `Device` { |
| enum {ROTATIONAL, LINEAR}; |
| virtual void `setPosition`(double position); |
| virtual void `setVelocity`(double vel); |
| virtual void `setAcceleration`(double force); |
| virtual void `setAvailableForce`(double motor\_force); |
| virtual void `setAvailableTorque`(double motor\_torque); |
| virtual void `setControlPID`(double p, double i, double d); |
| double `getTargetPosition`(double position) const; |
| double `getMinPosition`() const; |
| double `getMaxPosition`() const; |
| double `getVelocity`() const; |
| double `getMaxVelocity`() const; |
| double `getAcceleration`() const; |
| double `getAvailableForce`() const; |
| double `getMaxForce`() const; |
| double `getAvailableTorque`() const; |
| double `getMaxTorque`() const; |
| virtual void `enableForceFeedback`(int ms); |
| virtual void `disableForceFeedback`(); |
| int `getForceFeedbackSamplingPeriod`(); |
| double `getForceFeedback`() const; |
| virtual void `setForce`(double force); |
| virtual void `enableTorqueFeedback`(int ms); |
| virtual void `disableTorqueFeedback`(); |
| int `getTorqueFeedbackSamplingPeriod`(); |
| double `getTorqueFeedback`() const; |
| virtual void `setTorque`(double torque); |
| int `getType`() const; |
| }; |
```


```| #include <webots/Node.hpp> |
| class Node { |
| enum { NO\_NODE, APPEARANCE, BACKGROUND, BOX, COLOR, CONE, |
| COORDINATE, CYLINDER, DIRECTIONAL\_LIGHT, ELEVATION\_GRID, |
| EXTRUSION, FOG, GROUP, IMAGE\_TEXTURE, INDEXED\_FACE\_SET, |
| INDEXED\_LINE\_SET, MATERIAL, POINT\_LIGHT, SHAPE, SPHERE, |
| SPOT\_LIGHT, SWITCH, TEXTURE\_COORDINATE, TEXTURE\_TRANSFORM, |
| TRANSFORM, VIEWPOINT, WORLD\_INFO, CAPSULE, PLANE, ROBOT, |
| SUPERVISOR, DIFFERENTIAL\_WHEELS, SOLID, PHYSICS, CAMERA\_ZOOM, |
| CHARGER, DAMPING, CONTACT\_PROPERTIES, ACCELEROMETER, BRAKE, |
| CAMERA, COMPASS, CONNECTOR, DISPLAY, DISTANCE\_SENSOR, |
| EMITTER, GPS,GYRO, LED, LIGHT\_SENSOR, MICROPHONE, MOTOR, PEN, |
| POSITION\_SENSOR, RADIO, RECEIVER, SERVO, SPEAKER, |
| TOUCH\_SENSOR }; |
| virtual void `remove`(); |
| int `getId`() const; |
| int `getType`() const; |
| std::string `getTypeName`() const; |
| std::string `getBaseTypeName`() const; |
| Node *`getParentNode`() const; |
| `Field` *`getField`(const std::string &fieldName) const; |
| const double *`getPosition`() const; |
| const double *`getOrientation`() const; |
| const double *`getCenterOfMass`() const; |
| const double *`getContactPoint`(int index) const; |
| int `getNumberOfContactPoints`() const; |
| bool `getStaticBalance`() const; |
| const double * `getVelocity`() const; |
| void `setVelocity`(const double velocity[6]); |
| void `resetPhysics`(); |
| }; |
```


```| #include <webots/Pen.hpp> |
| class `Pen` : public `Device` { |
| virtual void `write`(bool write); |
| virtual void `setInkColor`(int color, double density); |
| }; |
```


```| #include <webots/PositionSensor.hpp> |
| class `PositionSensor` : public `Device` { |
| enum {ANGULAR, LINEAR}; |
| virtual void `enable`(int ms); |
| virtual void `disable`(); |
| int `getSamplingPeriod`(); |
| double `getValue`() const; |
| int `getType`() const; |
| }; |
```


```| #include <webots/Receiver.hpp> |
| class `Receiver` : public `Device` { |
| enum {CHANNEL\_BROADCAST}; |
| virtual void `enable`(int ms); |
| virtual void `disable`(); |
| int `getSamplingPeriod`(); |
| int `getQueueLength`() const; |
| virtual void `nextPacket`(); |
| const void *`getData`() const; |
| int `getDataSize`() const; |
| double `getSignalStrength`() const; |
| const double *`getEmitterDirection`() const; |
| virtual void `setChannel`(int channel); |
| int `getChannel`() const; |
| }; |
```


```| #include <webots/Robot.hpp> |
| class `Robot` { |
| enum {MODE\_SIMULATION, MODE\_CROSS\_COMPILATION, |
| MODE\_REMOTE\_CONTROL}; |
| enum {KEYBOARD\_END, KEYBOARD\_HOME, KEYBOARD\_LEFT, |
| KEYBOARD\_UP, KEYBOARD\_RIGHT, KEYBOARD\_DOWN, |
| KEYBOARD\_PAGEUP, KEYBOARD\_PAGEDOWN, |
| KEYBOARD\_NUMPAD\_HOME, KEYBOARD\_NUMPAD\_LEFT, |
| KEYBOARD\_NUMPAD\_UP, KEYBOARD\_NUMPAD\_RIGHT, |
| KEYBOARD\_NUMPAD\_DOWN, KEYBOARD\_NUMPAD\_END, |
| KEYBOARD\_KEY, KEYBOARD\_SHIFT, KEYBOARD\_CONTROL, |
| KEYBOARD\_ALT}; |
| `Robot`(); |
| virtual `~Robot`(); |
| virtual int `step`(int ms); |
| `Accelerometer` *`getAccelerometer`(const std::string &name); |
| `Brake` *`getBrake`(const std::string &name); |
| `Camera` *`getCamera`(const std::string &name); |
| `Compass` *`getCompass`(const std::string &name); |
| `Connector` *`getConnector`(const std::string &name); |
| `Display` *`getDisplay`(const std::string &name); |
| `DistanceSensor` *`getDistanceSensor`(const std::string &name); |
| `Emitter` *`getEmitter`(const std::string &name); |
| `GPS` *`getGPS`(const std::string &name); |
| `Gyro` *`getGyro`(const std::string &name); |
| `InertialUnit` *`getInertialUnit`(const std::string &name); |
| `LED` *`getLED`(const std::string &name); |
| `LightSensor` *`getLightSensor`(const std::string &name); |
| `Motor` *`getMotor`(const std::string &name); |
| `Pen` *`getPen`(const std::string &name); |
| `PositionSensor` *`getPositionSensor`(const std::string &name); |
| `Receiver` *`getReceiver`(const std::string &name); |
| `Servo` *`getServo`(const std::string &name); |
| `TouchSensor` *`getTouchSensor`(const std::string &name); |
| int `getNumberOfDevices`(); |
| `Device` *`getDeviceByIndex`(int index); |
| virtual void `batterySensorEnable`(int ms); |
| virtual void `batterySensorDisable`(); |
| int `batterySensorGetSamplingPeriod`(); |
| double `batterySensorGetValue`() const; |
| double `getBasicTimeStep`() const; |
| int `getMode`() const; |
| std::string `getModel`() const; |
| std::string `getData`() const; |
| void `setData`(const std::string &data); |
| std::string `getName`() const; |
| std::string `getControllerName`() const; |
| std::string `getControllerArguments`() const; |
| std::string `getProjectPath`() const; |
| bool `getSynchronization`() const; |
| double `getTime`() const; |
| std::string `getWorldPath`() const; |
| virtual void `keyboardEnable`(int ms); |
| virtual void `keyboardDisable`(); |
| int `keyboardGetKey`() const; |
| int `getType`() const; |
| void *`robotWindowCustomFunction`(void *arg); |
| }; |
```


```| #include <webots/Servo.hpp> |
| class `Servo` : public `Device` { |
| enum {ROTATIONAL, LINEAR}; |
| virtual void `setPosition`(double position); |
| virtual void `setVelocity`(double vel); |
| virtual void `setAcceleration`(double force); |
| virtual void `setMotorForce`(double motor\_force); |
| virtual void `setControlP`(double p); |
| double `getTargetPosition`(double position) const; |
| double `getMinPosition`() const; |
| double `getMaxPosition`() const; |
| virtual void `enablePosition`(int ms); |
| virtual void `disablePosition`(); |
| int `getPositionSamplingPeriod`(); |
| double `getPosition`() const; |
| virtual void `enableMotorForceFeedback`(int ms); |
| virtual void `disableMotorForceFeedback`(); |
| int `getMotorForceFeedbackSamplingPeriod`(); |
| double `getMotorForceFeedback`() const; |
| virtual void `setForce`(double force); |
| int `getType`() const; |
| }; |
```


```| #include <webots/Supervisor.hpp> |
| class `Supervisor` : public `Robot` { |
| enum {MOVIE\_READY, MOVIE\_RECORDING, MOVIE\_SAVING, MOVIE\_WRITE\_ERROR,
MOVIE\_ENCODING\_ERROR, MOVIE\_SIMULATION\_ERROR}; |
| `Supervisor`(); |
| virtual `~Supervisor`(); |
| void `exportImage`(const std::string &file, int quality) const; |
| `Node` *`getRoot`(); |
| `Node` *`getSelf`(); |
| `Node` *`getFromDef`(const std::string &name); |
| `Node` *`getFromId`(int id); |
| virtual void `setLabel`(int id, const std::string &label, double xpos, double
ypos, |
| double size, int color, double transparency); |
| virtual void `simulationQuit`(int status); |
| virtual void `simulationRevert`(); |
| virtual void `simulationResetPhysics`(); |
| virtual void `loadWorld`(const std::string &file); |
| virtual void `saveWorld`(); |
| virtual void `saveWorld`(const std::string &file); |
| virtual void `movieStartRecording`(const std::string &file, int width, int
height, int codec, int quality, |
| int acceleration, bool caption) const; |
| virtual void `movieStopRecording`(); |
| int `movieGetStatus`() const; |
| virtual bool `animationStartRecording`(const std::string &file); |
| virtual bool `animationStopRecording`(); |
| }; |
```


```| #include <webots/TouchSensor.hpp> |
| class `TouchSensor` : public `Device` { |
| enum {BUMPER, FORCE, FORCE3D}; |
| virtual void `enable`(int ms); |
| virtual void `disable`(); |
| int `getSamplingPeriod`(); |
| double `getValue`() const; |
| const double *`getValues`() const; |
| int `getType`() const; |
| }; |
```

