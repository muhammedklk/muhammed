Add-Type -AssemblyName System.Drawing

$size = 512
$bmp = New-Object System.Drawing.Bitmap($size, $size)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

# Background: Crisp luxury dark slate (#0F1117)
$bgColor = [System.Drawing.Color]::FromArgb(255, 15, 17, 23)
$brushBg = New-Object System.Drawing.SolidBrush($bgColor)
$g.FillRectangle($brushBg, 0, 0, $size, $size)

# Centered ambient violet glow (#7C5CE1)
$glowBmp = New-Object System.Drawing.Bitmap(360, 360)
$gg = [System.Drawing.Graphics]::FromImage($glowBmp)
$gg.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$pathGlow = New-Object System.Drawing.Drawing2D.GraphicsPath
$pathGlow.AddEllipse(0, 0, 360, 360)
$pgb = New-Object System.Drawing.Drawing2D.PathGradientBrush($pathGlow)
$pgb.CenterColor = [System.Drawing.Color]::FromArgb(140, 124, 92, 225)
$pgb.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 15, 17, 23))
$gg.FillPath($pgb, $pathGlow)
$g.DrawImage($glowBmp, 76, 76)
$gg.Dispose()
$glowBmp.Dispose()

# Squircle logo badge in center
$bw = 256
$bh = 256
$bx = 128
$by = 128
$r = 56
$badgePath = New-Object System.Drawing.Drawing2D.GraphicsPath
$badgePath.AddArc($bx, $by, $r * 2, $r * 2, 180, 90)
$badgePath.AddArc($bx + $bw - $r * 2, $by, $r * 2, $r * 2, 270, 90)
$badgePath.AddArc($bx + $bw - $r * 2, $by + $bh - $r * 2, $r * 2, $r * 2, 0, 90)
$badgePath.AddArc($bx, $by + $bh - $r * 2, $r * 2, $r * 2, 90, 90)
$badgePath.CloseFigure()

$badgeBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 24, 26, 34))
$g.FillPath($badgeBrush, $badgePath)

$badgePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(120, 124, 92, 225), 3)
$g.DrawPath($badgePen, $badgePath)

# Monogram M: pure crisp white
$penWhite = New-Object System.Drawing.Pen([System.Drawing.Color]::White, 22)
$penWhite.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$penWhite.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
$penWhite.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round

$ptsM = @(
    [System.Drawing.Point]::new(180, 316),
    [System.Drawing.Point]::new(180, 196),
    [System.Drawing.Point]::new(256, 268),
    [System.Drawing.Point]::new(332, 196),
    [System.Drawing.Point]::new(332, 316)
)
$g.DrawLines($penWhite, $ptsM)

# Monogram K accent branch in vibrant brand violet (#7C5CE1)
$penViolet = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 124, 92, 225), 22)
$penViolet.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$penViolet.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
$g.DrawLine($penViolet, [System.Drawing.Point]::new(256, 268), [System.Drawing.Point]::new(332, 316))

# Save 512x512
$bmp.Save('old-portfolio/public/favicon.png', [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Save('old-portfolio/public/assets/favicon-og.png', [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Save('old-portfolio/public/favicon-512.png', [System.Drawing.Imaging.ImageFormat]::Png)

# Also generate 1200x630 wide OpenGraph banner
$wBmp = New-Object System.Drawing.Bitmap(1200, 630)
$gw = [System.Drawing.Graphics]::FromImage($wBmp)
$gw.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$gw.FillRectangle($brushBg, 0, 0, 1200, 630)

# Ambient brand aura in center
$wGlowBmp = New-Object System.Drawing.Bitmap(600, 600)
$gwg = [System.Drawing.Graphics]::FromImage($wGlowBmp)
$gwg.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$wPathGlow = New-Object System.Drawing.Drawing2D.GraphicsPath
$wPathGlow.AddEllipse(0, 0, 600, 600)
$wPgb = New-Object System.Drawing.Drawing2D.PathGradientBrush($wPathGlow)
$wPgb.CenterColor = [System.Drawing.Color]::FromArgb(120, 124, 92, 225)
$wPgb.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 15, 17, 23))
$gwg.FillPath($wPgb, $wPathGlow)
$gw.DrawImage($wGlowBmp, 300, 15)
$gwg.Dispose()
$wGlowBmp.Dispose()

# Draw the 512x512 badge centered in the 1200x630 card
# Draw scaled 260x260 in center-left, with clean typography
$gw.DrawImage($bmp, (1200 - 360) / 2, (630 - 360) / 2, 360, 360)

$wBmp.Save('old-portfolio/public/assets/og-cover.png', [System.Drawing.Imaging.ImageFormat]::Png)

$gw.Dispose()
$wBmp.Dispose()
$g.Dispose()
$bmp.Dispose()
Write-Output 'All PNGs generated successfully'

