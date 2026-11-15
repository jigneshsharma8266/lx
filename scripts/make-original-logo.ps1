Add-Type -AssemblyName System.Drawing

$srcPath = "D:\villa\luxora-villa\public\images\Lgo.jpeg"
$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)

# Bounding box is minX=356, maxX=756, minY=186, maxY=548
# Let's crop tightly around the logo with a small 12px margin
$margin = 12
$minX = [Math]::Max(0, 356 - $margin)
$minY = [Math]::Max(0, 186 - $margin)
$maxX = [Math]::Min($bmp.Width - 1, 756 + $margin)
$maxY = [Math]::Min($bmp.Height - 1, 548 + $margin)
$w = $maxX - $minX + 1
$h = $maxY - $minY + 1

# Create 32-bit ARGB bitmap for original black logo with transparent background
$outBmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $srcX = $minX + $x
        $srcY = $minY + $y
        $p = $bmp.GetPixel($srcX, $srcY)

        # In Lgo.jpeg, background is white (~254, 254, 254) and artwork is black (~0, 0, 0)
        # Luminance:
        $lum = 0.299 * $p.R + 0.587 * $p.G + 0.114 * $p.B

        # Calculate opacity: white is transparent (alpha = 0), black is opaque (alpha = 255)
        # Using smooth anti-aliased alpha thresholding:
        if ($lum -ge 250) {
            $alpha = 0
        } elseif ($lum -le 30) {
            $alpha = 255
        } else {
            # Smooth transition for anti-aliasing edges
            $alpha = [int](255 * (250 - $lum) / 220.0)
            if ($alpha -gt 255) { $alpha = 255 }
            if ($alpha -lt 0) { $alpha = 0 }
        }

        # Keep the original black color of the logo
        if ($alpha -gt 0) {
            $color = [System.Drawing.Color]::FromArgb($alpha, 0, 0, 0)
            $outBmp.SetPixel($x, $y, $color)
        } else {
            $outBmp.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
        }
    }
}

$outPath = "D:\villa\luxora-villa\public\images\luxora-logo-original.png"
$outBmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$outBmp.Dispose()

# Also let's create a high-res 2x / 4x super-sampled or vector version
Write-Host "Created $outPath ($w x $h)"
$bmp.Dispose()

