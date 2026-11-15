# Luxora Villa 3D Models Directory

Place your official villa 3D model file here:

```
public/models/villa.glb
```

## Supported 3D Formats
- **GLB** (Binary GLTF — Recommended for fastest load time and embedded textures)
- **GLTF** (JSON GLTF with companion `.bin` and texture images)

## How to Obtain or Export the Villa 3D Model

### Option A: From Architectural CAD / 3D Software
If your architect or designer has 3D files of the villa:
- **SketchUp**: Export as `.dae` or `.obj` -> Convert to `.glb` using Blender or [gltf.report](https://gltf.report/).
- **Blender**: File -> Export -> `glTF 2.0 (.glb)`. Ensure "Apply Modifiers" and "Include Textures" are enabled.
- **Revit / Rhino / 3ds Max**: Export to `.fbx` or `.obj` -> Open in Blender -> Export to `.glb`.

### Option B: Automatic 3D Model from Smartphone Photos (Photogrammetry / AI)
If you don't have CAD files, you can create a real textured 3D model from your photos or a 2-minute video walkaround:
- **Polycam** (iOS / Android / Web): Walk around the villa taking 40–100 photos or a video. Polycam automatically processes them into a textured `.glb` file.
- **Luma AI** (iOS / Web): Free photogrammetry capture that exports to `.glb`.
- **Scaniverse** (iOS / Android): Instant LiDAR or Gaussian/Photogrammetry mesh export to `.glb`.

Once downloaded, name the file `villa.glb` and drop it right into this `public/models/` folder. The website will automatically render your actual villa in full 3D!

