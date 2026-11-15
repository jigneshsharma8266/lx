Add-Type -AssemblyName System.Drawing

$srcPath = "D:\villa\luxora-villa\public\images\Lgo.jpeg"
$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)

# Bounding box is 356..756 (width 401), 186..548 (height 363)
# Let's add a 10px margin
$minX = [Math]::Max(0, 356 - 10)
$minY = [Math]::Max(0, 186 - 10)
$maxX = [Math]::Min($bmp.Width - 1, 756 + 10)
$maxY = [Math]::Min($bmp.Height - 1, 548 + 10)
$w = $maxX - $minX + 1
$h = $maxY - $minY + 1

$cropBmp = New-Object System.Drawing.Bitmap($w, $h)
$g = [System.Drawing.Graphics]::FromImage($cropBmp)
$rectSrc = New-Object System.Drawing.Rectangle($minX, $minY, $w, $h)
$rectDest = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
$g.DrawImage($bmp, $rectDest, $rectSrc, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()

$cropBmp.Save("D:\villa\luxora-villa\public\original-logo-crop.png", [System.Drawing.Imaging.ImageFormat]::Png)
$cropBmp.Dispose()
$bmp.Dispose()

Write-Host "Saved original-logo-crop.png ($w x $h)"

