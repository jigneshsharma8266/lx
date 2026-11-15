Add-Type -AssemblyName System.Drawing

$srcPath = "D:\villa\luxora-villa\public\images\Lgo.jpeg"
$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)

Write-Host "Width: $($bmp.Width), Height: $($bmp.Height)"

$corners = @(
    $bmp.GetPixel(0, 0),
    $bmp.GetPixel($bmp.Width - 1, 0),
    $bmp.GetPixel(0, $bmp.Height - 1),
    $bmp.GetPixel($bmp.Width - 1, $bmp.Height - 1)
)

foreach ($c in $corners) {
    Write-Host "Corner pixel: R=$($c.R), G=$($c.G), B=$($c.B)"
}

# Sample some non-background pixels
$minR = 255; $maxR = 0; $minG = 255; $maxG = 0; $minB = 255; $maxB = 0
for ($y = 0; $y -lt $bmp.Height; $y += 5) {
    for ($x = 0; $x -lt $bmp.Width; $x += 5) {
        $px = $bmp.GetPixel($x, $y)
        # Assuming background is white or black
        if ($px.R -lt 230 -or $px.G -lt 230 -or $px.B -lt 230) {
            # non-white
        }
    }
}

$bmp.Dispose()

