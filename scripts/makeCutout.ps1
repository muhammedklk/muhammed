Add-Type -AssemblyName System.Drawing

$srcPath = "c:\Users\MY PC\Desktop\my portfolios\PORTFOLIO MUHAMMEDK\old-portfolio\public\assets\muhammedk-3d-original.jpg"
$dstPath = "c:\Users\MY PC\Desktop\my portfolios\PORTFOLIO MUHAMMEDK\old-portfolio\public\assets\muhammedk-3d-original-cutout.png"

$src = [System.Drawing.Bitmap]::new($srcPath)
$w = $src.Width
$h = $src.Height

# Create 32-bit ARGB bitmap
$dst = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Lock bits for fast memory processing
$rect = [System.Drawing.Rectangle]::new(0, 0, $w, $h)
$srcData = $src.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$dstData = $dst.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

$bytes = $w * $h * 4
$pixelBuffer = New-Object byte[] $bytes
[System.Runtime.InteropServices.Marshal]::Copy($srcData.Scan0, $pixelBuffer, 0, $bytes)

# BFS flood fill from outer borders to identify white background
$visited = New-Object byte[] ($w * $h)
$queue = New-Object System.Collections.Generic.Queue[int]

# Function to check if pixel is near-white
function IsNearWhite($idx) {
    $b = $pixelBuffer[$idx]
    $g = $pixelBuffer[$idx + 1]
    $r = $pixelBuffer[$idx + 2]
    return ($r -gt 232 -and $g -gt 232 -and $b -gt 232)
}

# Seed top & bottom rows
for ($x = 0; $x -lt $w; $x++) {
    $topIdx = $x * 4
    if (IsNearWhite($topIdx)) {
        $visited[$x] = 1
        $queue.Enqueue($x)
    }
    $btmP = ($h - 1) * $w + $x
    $btmIdx = $btmP * 4
    if (IsNearWhite($btmIdx)) {
        $visited[$btmP] = 1
        $queue.Enqueue($btmP)
    }
}

# Seed left & right columns
for ($y = 0; $y -lt $h; $y++) {
    $leftP = $y * $w
    $leftIdx = $leftP * 4
    if ($visited[$leftP] -eq 0 -and (IsNearWhite($leftIdx))) {
        $visited[$leftP] = 1
        $queue.Enqueue($leftP)
    }
    $rightP = $y * $w + ($w - 1)
    $rightIdx = $rightP * 4
    if ($visited[$rightP] -eq 0 -and (IsNearWhite($rightIdx))) {
        $visited[$rightP] = 1
        $queue.Enqueue($rightP)
    }
}

# BFS expansion
while ($queue.Count -gt 0) {
    $p = $queue.Dequeue()
    $px = $p % $w
    $py = [int]($p / $w)

    # Set alpha to 0 for background
    $pixelBuffer[$p * 4 + 3] = 0

    # 4 neighbors
    $neighbors = @(
        @($px + 1, $py),
        @($px - 1, $py),
        @($px, $py + 1),
        @($px, $py - 1)
    )

    foreach ($n in $neighbors) {
        $nx = $n[0]
        $ny = $n[1]
        if ($nx -ge 0 -and $nx -lt $w -and $ny -ge 0 -and $ny -lt $h) {
            $np = $ny * $w + $nx
            if ($visited[$np] -eq 0) {
                $visited[$np] = 1
                $nIdx = $np * 4
                if (IsNearWhite($nIdx)) {
                    $queue.Enqueue($np)
                } else {
                    $nb = $pixelBuffer[$nIdx]
                    $ng = $pixelBuffer[$nIdx + 1]
                    $nr = $pixelBuffer[$nIdx + 2]
                    if ($nr -gt 220 -and $ng -gt 220 -and $nb -gt 220) {
                        # Soft edge antialiasing
                        $pixelBuffer[$nIdx + 3] = 130
                    }
                }
            }
        }
    }
}

[System.Runtime.InteropServices.Marshal]::Copy($pixelBuffer, 0, $dstData.Scan0, $bytes)
$src.UnlockBits($srcData)
$dst.UnlockBits($dstData)

$dst.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Png)
$src.Dispose()
$dst.Dispose()
Write-Output "Successfully saved cutout to $dstPath"

