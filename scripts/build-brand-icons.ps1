# Derives package sizes from the user-supplied Partner Center artwork; no ZIP creation.
$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing
$root = Split-Path $PSScriptRoot -Parent
$source = [System.Drawing.Bitmap]::FromFile((Join-Path $root "assets/branding/dark-icon_300x300.png"))
$mask = New-Object System.Drawing.Bitmap($source.Width, $source.Height)
try {
    # This master is opaque on black. Key the black matte before downsampling
    # the white silhouette; otherwise the outline would become a solid square.
    # Ignore near-black edge pixels (<=16) when finding the symbol and mask.
    $left = $source.Width; $top = $source.Height; $right = -1; $bottom = -1
    for ($y = 0; $y -lt $source.Height; $y++) {
        for ($x = 0; $x -lt $source.Width; $x++) {
            $pixel = $source.GetPixel($x, $y)
            if ($pixel.A -gt 0 -and [Math]::Max($pixel.R, [Math]::Max($pixel.G, $pixel.B)) -gt 16) {
                $left = [Math]::Min($left, $x); $right = [Math]::Max($right, $x)
                $top = [Math]::Min($top, $y); $bottom = [Math]::Max($bottom, $y)
                $mask.SetPixel($x, $y, [System.Drawing.Color]::White)
            }
        }
    }
    if ($right -lt $left -or $bottom -lt $top) { throw "Brand master has no visible symbol." }
    $bounds = New-Object System.Drawing.Rectangle($left, $top, ($right - $left + 1), ($bottom - $top + 1))
    foreach ($variant in @(@{ File = "color.png"; Size = 192; Safe = 96 }, @{ File = "outline.png"; Size = 32; Safe = 28 })) {
        $bitmap = New-Object System.Drawing.Bitmap($variant.Size, $variant.Size)
        $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
        try {
            if ($variant.File -eq "color.png") { $graphics.Clear([System.Drawing.Color]::Black) }
            else { $graphics.Clear([System.Drawing.Color]::Transparent) }
            $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
            $scale = $variant.Safe / [double][Math]::Max($bounds.Width, $bounds.Height)
            $width = [int][Math]::Round($bounds.Width * $scale)
            $height = [int][Math]::Round($bounds.Height * $scale)
            $target = New-Object System.Drawing.Rectangle(([int](($variant.Size - $width) / 2)), ([int](($variant.Size - $height) / 2)), $width, $height)
            $graphics.SetClip($target)
            $artwork = if ($variant.File -eq "outline.png") { $mask } else { $source }
            $graphics.DrawImage($artwork, $target, $bounds, [System.Drawing.GraphicsUnit]::Pixel)
            if ($variant.File -eq "outline.png") {
                for ($y = 0; $y -lt $bitmap.Height; $y++) {
                    for ($x = 0; $x -lt $bitmap.Width; $x++) {
                        $bitmap.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($bitmap.GetPixel($x, $y).A, 255, 255, 255))
                    }
                }
            }
            $bitmap.Save((Join-Path $root "appPackage/$($variant.File)"), [System.Drawing.Imaging.ImageFormat]::Png)
        } finally { $graphics.Dispose(); $bitmap.Dispose() }
    }
} finally { $mask.Dispose(); $source.Dispose() }
Write-Host "Updated color.png (192px, black background, centered 96px symbol area) and outline.png (32px, white on transparent) from the Partner Center master."
