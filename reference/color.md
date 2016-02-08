## Color


```
Color {
  MFColor   color   []   # [0,1]
}
```

This node defines a set of RGB colors to be used in the fields of another node.

`Color` nodes are only used to specify multiple colors for a single geometric
shape, such as colors for the faces or vertices of an `ElevationGrid`. A
`Material` node is used to specify the overall material parameters of a
geometric node. If both a `Material` node and a `Color` node are specified for a
geometric shape, the colors shall replace the diffuse component of the material.

RGB or RGBA textures take precedence over colors; specifying both an RGB or RGBA
texture and a Color node for a geometric shape will result in the Color node
being ignored.
