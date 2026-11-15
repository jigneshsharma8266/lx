Add-Type -AssemblyName System.Drawing

$srcPath = "D:\villa\luxora-villa\public\images\1000118101.png"
$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)

# Find tight non-transparent bounding box
$minX = $bmp.Width; $maxX = 0; $minY = $bmp.Height; $maxY = 0

for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $p = $bmp.GetPixel($x, $y)
        if ($p.A -gt 15) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Host "Exact content bounds: minX=$minX maxX=$maxX minY=$minY maxY=$maxY"
$pad = 12
$cropX = [Math]::Max(0, $minX - $pad)
$cropY = [Math]::Max(0, $minY - $pad)
$cropW = [Math]::Min($bmp.Width - $cropX, ($maxX - $minX + 1) + 2 * $pad)
$cropH = [Math]::Min($bmp.Height - $cropY, ($maxY - $minY + 1) + 2 * $pad)

Write-Host "Cropping to: $cropW x $cropH (from $cropX, $cropY)"

# 1. Save original cropped PNG (exact untouched pixels, transparent background)
$cropBmp = New-Object System.Drawing.Bitmap($cropW, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($cropBmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$rectSrc = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
$rectDest = New-Object System.Drawing.Rectangle(0, 0, $cropW, $cropH)
$g.DrawImage($bmp, $rectDest, $rectSrc, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()

$destOriginal = "D:\villa\luxora-villa\public\images\luxora-logo.png"
$cropBmp.Save($destOriginal, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Saved: $destOriginal"

# 2. Also save an inverted white version of the EXACT same pixels for dark backgrounds if needed
$whiteBmp = New-Object System.Drawing.Bitmap($cropW, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
for ($y = 0; $y -lt $cropH; $y++) {
    for ($x = 0; $x -lt $cropW; $x++) {
        $p = $cropBmp.GetPixel($x, $y)
        if ($p.A -gt 0) {
            $whiteColor = [System.Drawing.Color]::FromArgb($p.A, 255, 255, 255)
            $whiteBmp.SetPixel($x, $y, $whiteColor)
        }
    }
}
$destWhite = "D:\villa\luxora-villa\public\images\luxora-logo-white.png"
$whiteBmp.Save($destWhite, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Saved: $destWhite"

$whiteBmp.Dispose()
$cropBmp.Dispose()
$bmp.Dispose()

