from PIL import Image, ImageDraw, ImageFont
import os

W, H = 1200, 630
base = Image.new('RGBA', (W, H), (3, 7, 18, 255)) # slate-950

# Ambient glows
glow_overlay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
ov_draw = ImageDraw.Draw(glow_overlay)

# Top-right cyan glow
for r in range(400, 0, -6):
    alpha = int(32 * (1 - r / 400))
    ov_draw.ellipse([980 - r, 120 - r, 980 + r, 120 + r], fill=(6, 182, 212, alpha))

# Bottom-left emerald glow
for r in range(350, 0, -6):
    alpha = int(28 * (1 - r / 350))
    ov_draw.ellipse([180 - r, 520 - r, 180 + r, 520 + r], fill=(16, 185, 129, alpha))

img = Image.alpha_composite(base, glow_overlay)
draw = ImageDraw.Draw(img)

# Subtle grid lines
grid_color = (30, 41, 59, 90)
for x in range(40, W - 40, 50):
    draw.line([(x, 40), (x, H - 40)], fill=grid_color, width=1)
for y in range(40, H - 40, 50):
    draw.line([(40, y), (W - 40, y)], fill=grid_color, width=1)

# Outer card border
border_box = [40, 40, W - 40, H - 40]
draw.rounded_rectangle(border_box, radius=20, outline=(51, 65, 85, 200), width=2)

# Top Bar background
draw.rounded_rectangle([42, 42, W - 42, 105], radius=18, fill=(15, 23, 42, 190))
draw.line([(42, 105), (W - 42, 105)], fill=(51, 65, 85, 160), width=1)

# Terminal dots
dot_y = 74
draw.ellipse([70, dot_y - 7, 84, dot_y + 7], fill=(239, 68, 68)) # red
draw.ellipse([96, dot_y - 7, 110, dot_y + 7], fill=(234, 179, 8)) # yellow
draw.ellipse([122, dot_y - 7, 136, dot_y + 7], fill=(34, 197, 94)) # green

# Fonts
font_path = '/System/Library/Fonts/AppleSDGothicNeo.ttc'
font_title = ImageFont.truetype(font_path, 54, index=6) # Bold
font_badge = ImageFont.truetype(font_path, 20, index=4) # SemiBold
font_sub = ImageFont.truetype(font_path, 25, index=4) # SemiBold
font_tag = ImageFont.truetype(font_path, 19, index=4) # SemiBold
font_url = ImageFont.truetype(font_path, 22, index=6) # Bold

# Top Title in bar
draw.text((160, 62), "dontotl.systems", font=font_badge, fill=(56, 189, 248))
draw.text((310, 62), "·  AUTONOMOUS AI & CLOUD-NATIVE SYSTEMS", font=font_badge, fill=(148, 163, 184))

# Status indicator on right of top bar
draw.ellipse([W - 240, 69, W - 228, 81], fill=(52, 211, 153))
draw.text((W - 215, 62), "ONLINE // VERIFIED", font=font_badge, fill=(110, 231, 183))

# Main Headings
start_y = 175
draw.text((80, start_y), "Building Autonomous AI &", font=font_title, fill=(248, 250, 252))
draw.text((80, start_y + 72), "Cloud-Native Systems", font=font_title, fill=(56, 189, 248))

# Subtitle
draw.text((80, start_y + 160), "데이터베이스 코어부터 클라우드 인프라, 자율형 AI 에이전트까지 — 시스템을 설계하고 코드로 증명합니다.", font=font_sub, fill=(203, 213, 225))

# Tags / Badges
tags = [
    ("Oracle Cloud (OCI)", (30, 58, 138), (147, 197, 253)),
    ("Oracle DB 23ai", (4, 47, 46), (110, 231, 183)),
    ("Pgvector & ANN", (69, 26, 3), (253, 186, 116)),
    ("LLM Benchmark CLI", (49, 46, 129), (199, 210, 254)),
    ("Autonomous Agents", (59, 7, 100), (240, 171, 252)),
]

tag_x = 80
tag_y = 445
for tag, bg_col, text_col in tags:
    bbox = draw.textbbox((0, 0), tag, font=font_tag)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    pad_x, pad_y = 16, 10
    
    # Pill background & border
    draw.rounded_rectangle([tag_x, tag_y, tag_x + tw + pad_x * 2, tag_y + th + pad_y * 2], radius=10, fill=bg_col, outline=text_col, width=1)
    draw.text((tag_x + pad_x, tag_y + pad_y - 2), tag, font=font_tag, fill=text_col)
    
    tag_x += tw + pad_x * 2 + 16

# Footer line
draw.line([(80, 530), (W - 80, 530)], fill=(51, 65, 85, 120), width=1)

draw.text((80, 545), "https://dontotl.github.io", font=font_url, fill=(56, 189, 248))
draw.text((W - 350, 545), "24 Curated Projects & Architecture", font=font_badge, fill=(148, 163, 184))

# Convert to RGB and save
final_img = img.convert('RGB')
output_path = os.path.join(os.getcwd(), 'public', 'og-image.png')
final_img.save(output_path, format='PNG', optimize=True)
print(f"Successfully generated OpenGraph image: {output_path}")
