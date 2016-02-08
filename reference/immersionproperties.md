## ImmersionProperties


```
ImmersionProperties {
  field SFString   fluidName       ""
  field SFString   referenceArea   "immersed area"
  field SFVec3f    dragForceCoefficients  0 0 0 # dimensionless coefficient ranging in [0, infinity)
  field SFVec3f    dragTorqueCoefficients  0 0 0 # dimensionless coefficients ranging in [0, infinity)
  field SFFloat    viscousResistanceForceCoefficient  0 # (Ns/m) ranges in [0, infinity)
  field SFFloat    viscousResistanceTorqueCoefficient  0 # (Nm/s ) ranges in [0, infinity)
}
```

### Description

An `ImmersionProperties` node is used inside the `immersionProperties` field of
a `Solid` node to specify its dynamical interactions with one or more `Fluid`
nodes.

### ImmersionProperties Fields

- `fluidName`: name of the fluid with which the dynamical interaction is enabled.
The string value must coincide with the `name` field value of an existing
`Fluid` node.
- `referenceArea`: this field defines the reference area(s) used to compute the
drag force and drag torque of the submerging `Fluid`. If the `referenceArea` is
set to "xyz-projected area", the `x`-coordinate of the drag force vector with
respect to the the solid frame is given by:

```
drag_force_x = - c_x * fluid_density * (rel_linear_velocity_x)^2 * sign(rel_linear_velocity_x) * A_x
```

where `c_x` is the `x`-coordinate of the `dragForceCoefficients` vector,
`linear_velocity_x ` the `x`-coordinate of the linear velocity of the solid with
respect to the fluid expressed within the solid frame and `A_x` is the projected
immersed area onto the plane `x = 0`. Analogous formulas hold for `y` and `z`
coordinates. The `x`-coordinate of the drag torque vector with respect to the
the solid frame is given by:

```
drag_torque_x = - t_x * fluid_density * (rel_angular_velocity_x)^2 * sign(rel_angular_velocity_y) * (A_y + A_z)
```

where `t_x` is the `x`-coordinate of the `dragTorqueCoefficients` vector,
`angular_velocity_x` the `x`-coordinate of the angular velocity of the solid
expressed within the solid frame. Analogous formulas hold for `y` and `z`
coordinates. If the `referenceArea` value is "immersed area" then the `Solid`
`boundingObject`'s immersed area is used for drag force and drag torque
computations:

```
drag_force = - c_x * fluid_density * linear_velocity^2 * immersed_area, drag_torque = - t_x * fluid_density * angular_velocity^2 * immersed_area
```

all vectors being expressed in world coordinates. Note that in this case the
drag coefficients along the `y` and `z` axes are ignored.
- `dragForceCoefficients` and `dragTorqueCoefficients`: dimensionless non-negative
coefficients used to compute the drag force and the drag torque exerted by the
fluid on the solid. See above formulas.
- `viscousResistanceForceCoefficient` and `viscousResistanceTorqueCoefficient`:
this non-negative coefficients, expressed respectively in Ns/m and Nm/s, are
used to compute the viscous resistance force and the viscous resistance torque
exerted by the fluid on the solid according the following formulas

```
viscous_resistance_force = - immersion_ratio * fluid_viscosity * v_force * rel_linear_velocity viscous_resistance_torque = - immersion_ratio * fluid_viscosity * v_torque * angular_velocity
```

where v\_force (resp. v\_torque) denotes the viscous resistance force (resp.
torque) coefficient and immersion\_ratio is obtained by dividing the immersed
area by the full area. The viscous resistance (or linear drag) is appropriate
for objects moving through a fluid at relatively low speed where there is no
turbulences. By its linear nature it may offer a better numerical stability than
the above quadratic drags when the immersed solids are subject to large external
forces or torques.
