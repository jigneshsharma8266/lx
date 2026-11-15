Add-Type -AssemblyName System.Drawing

$srcPath = "D:\villa\luxora-villa\public\images\Lgo.jpeg"
$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)

Write-Host "Image Size: $($bmp.Width) x $($bmp.Height)"

# Check pixel values across the image
$hist = @{}
for ($y = 0; $y -lt $bmp.Height; $y += 5) {
    for ($x = 0; $x -lt $bmp.Width; $x += 5) {
        $p = $bmp.GetPixel($x, $y)
        $key = "$($p.R),$($p.G),$($p.B)"
        if ($hist.ContainsKey($key)) {
            $hist[$key]++
        } else {
            $hist[$key] = 1
        }
    }
}

Write-Host "Top colors in Lgo.jpeg:"
$hist.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 15 | ForEach-Object {
    Write-Host "$($_.Key) : $($_.Value) pixels"
}

$bmp.Dispose()

