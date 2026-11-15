Add-Type -AssemblyName System.Drawing

$src = "C:\Users\Lenovo\.gemini\antigravity\brain\63785401-3126-4b90-81eb-6cea8f253bf8\.user_uploaded\media_1794552890148_cf290b98.png"
$bmp = [System.Drawing.Bitmap]::FromFile($src)

# The avatar logo bounding box in the original screenshot:
# X: 330 to 388, Y: 188 to 242
$cropWidth = 60
$cropHeight = 56
$cropX = 330
$cropY = 187

$cropped = $bmp.Clone([System.Drawing.Rectangle]::new($cropX, $cropY, $cropWidth, $cropHeight), $bmp.PixelFormat)

# We want to create two transparent versions:
# 1. Gold logo (#C5A880) with transparent background
# 2. White/Ivory logo (#F3EFE6) with transparent background

$scale = 4 # 4x upscale for sharpness
$targetWidth = $cropWidth * $scale
$targetHeight = $cropHeight * $scale

$goldBmp = [System.Drawing.Bitmap]::new($targetWidth, $targetHeight, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$whiteBmp = [System.Drawing.Bitmap]::new($targetWidth, $targetHeight, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Resample using high quality bicubic
$gGold = [System.Drawing.Graphics]::FromImage($goldBmp)
$gGold.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gGold.DrawImage($cropped, 0, 0, $targetWidth, $targetHeight)
$gGold.Dispose()

$gWhite = [System.Drawing.Graphics]::FromImage($whiteBmp)
$gWhite.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gWhite.DrawImage($cropped, 0, 0, $targetWidth, $targetHeight)
$gWhite.Dispose()

# Process each pixel: convert black/gray pixels to Gold (#C5A880 = R:197, G:168, B:128) and White (#F3EFE6 = R:243, G:239, B:230)
# and white background to transparent (alpha = 0)
for ($y = 0; $y -lt $targetHeight; $y++) {
    for ($x = 0; $x -lt $targetWidth; $x++) {
        $p = $goldBmp.GetPixel($x, $y)
        $brightness = ($p.R * 0.299 + $p.G * 0.587 + $p.B * 0.114)
        
        # If brightness > 220, it's white background -> transparent
        if ($brightness -gt 225) {
            $goldBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            $whiteBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } else {
            # Invert brightness into alpha: darker = higher alpha
            $alpha = [int][Math]::Min(255, [Math]::Max(0, (230 - $brightness) * 1.6))
            
            # Gold color: #C5A880 (197, 168, 128)
            $goldColor = [System.Drawing.Color]::FromArgb($alpha, 197, 168, 128)
            $goldBmp.SetPixel($x, $y, $goldColor)

            # White/Ivory color: #F3EFE6 (243, 239, 230)
            $whiteColor = [System.Drawing.Color]::FromArgb($alpha, 243, 239, 230)
            $whiteBmp.SetPixel($x, $y, $whiteColor)
        }
    }
}

$destDir = "d:\villa\luxora-villa\public\images"
$goldBmp.Save("$destDir\luxora-logo-gold.png", [System.Drawing.Imaging.ImageFormat]::Png)
$whiteBmp.Save("$destDir\luxora-logo-white.png", [System.Drawing.Imaging.ImageFormat]::Png)

$bmp.Dispose()
$cropped.Dispose()
$goldBmp.Dispose()
$whiteBmp.Dispose()

Write-Output "Successfully generated luxora-logo-gold.png and luxora-logo-white.png"

