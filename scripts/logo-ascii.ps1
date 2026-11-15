Add-Type -AssemblyName System.Drawing

$bmp = [System.Drawing.Bitmap]::FromFile("D:\villa\luxora-villa\public\original-logo-crop.png")

# Let's print ASCII representation of the image!
$charWidth = 70
$charHeight = 40
$stepX = [int]($bmp.Width / $charWidth)
$stepY = [int]($bmp.Height / $charHeight)

$sb = New-Object System.Text.StringBuilder

for ($y = 0; $y -lt $charHeight; $y++) {
    for ($x = 0; $x -lt $charWidth; $x++) {
        $px = $x * $stepX
        $py = $y * $stepY
        if ($px -lt $bmp.Width -and $py -lt $bmp.Height) {
            $p = $bmp.GetPixel($px, $py)
            $lum = [int](0.299 * $p.R + 0.587 * $p.G + 0.114 * $p.B)
            if ($lum -lt 80) {
                [void]$sb.Append("#")
            } elseif ($lum -lt 160) {
                [void]$sb.Append("+")
            } elseif ($lum -lt 220) {
                [void]$sb.Append(".")
            } else {
                [void]$sb.Append(" ")
            }
        }
    }
    [void]$sb.AppendLine()
}

$bmp.Dispose()
[System.IO.File]::WriteAllText("D:\villa\luxora-villa\public\logo-ascii.txt", $sb.ToString())
Write-Host "Saved logo-ascii.txt"

