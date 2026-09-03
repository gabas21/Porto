import { chromium } from '@playwright/test';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const FRAMES_DIR = path.resolve('scripts/frames');
if (!fs.existsSync(FRAMES_DIR)) {
  fs.mkdirSync(FRAMES_DIR, { recursive: true });
}

const TOTAL_FRAMES = 900; // 15 seconds at 60 FPS
const FPS = 60;
const SPEED = 1.8; // Relaxed, serene landscape cloud drift (natural 60 FPS)
const WIDTH = 1920;
const HEIGHT = 1080;

const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; overflow: hidden; background: #000; }
    canvas { width: ${WIDTH}px; height: ${HEIGHT}px; display: block; }
  </style>
</head>
<body>
  <canvas id="c" width="${WIDTH}" height="${HEIGHT}"></canvas>
  <script>
    const VERT = \`
      attribute vec2 a_pos;
      varying vec2 v_uv;
      void main() {
        v_uv = a_pos * 0.5 + 0.5;
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    \`;

    const FRAG = \`
      #ifdef GL_FRAGMENT_PRECISION_HIGH
      precision highp float;
      #else
      precision mediump float;
      #endif

      varying vec2 v_uv;
      uniform vec2 u_res;
      uniform float u_time;
      uniform float u_count;
      uniform vec3 u_cloud;
      uniform vec3 u_skyTop;
      uniform vec3 u_skyBottom;

      const mat2 R = mat2(0.80, 0.60, -0.60, 0.80);

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(41.31, 289.17))) * 26737.367);
      }

      float vnoise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      float fbm(vec2 p) {
        float sum = 0.0;
        float amp = 0.5;
        for (int i = 0; i < 4; i++) {
          sum += amp * vnoise(p);
          p = R * p * 2.03 + 19.19;
          amp *= 0.5;
        }
        return sum;
      }

      float billow(vec2 p) {
        float sum = 0.0;
        float amp = 0.5;
        for (int i = 0; i < 5; i++) {
          sum += amp * (1.0 - abs(2.0 * vnoise(p) - 1.0));
          p = R * p * 2.11 + 13.37;
          amp *= 0.5;
        }
        return sum;
      }

      float cloudDensity(vec2 p, vec2 c, vec2 r, float seed, float t) {
        vec2 q = p - c;
        float ry = q.y > 0.0 ? r.y : r.y * 0.42;
        float env = 1.0 - length(vec2(q.x / r.x, q.y / ry));
        if (env < -0.35) return 0.0;

        vec2 dp = q * (2.4 / r.x) + seed;
        dp += 0.6 * vec2(
          fbm(dp * 1.4 + t * 0.08),
          fbm(dp * 1.4 + 7.7 - t * 0.06)
        );
        float detail = billow(dp * 1.6);
        return env + (detail - 0.62) * 0.62;
      }

      vec3 shadeCloud(vec3 color, vec3 sky, vec2 p, vec2 c, vec2 r, float seed, float t, float dist) {
        float d = cloudDensity(p, c, r, seed, t);
        if (d < 0.015) return color;

        float dUp = cloudDensity(p + vec2(r.x * 0.22, r.y * 0.45), c, r, seed, t);
        float occl = clamp((dUp - d) * 1.6 + d * 0.65, 0.0, 1.0);

        vec3 lit = u_cloud * 1.25;
        vec3 shadow = mix(u_cloud * 0.30, sky * 0.70, 0.65);
        vec3 cloudCol = mix(lit, shadow, occl * 0.92);

        float alpha = smoothstep(0.015, 0.28, d) * 1.35;
        alpha = clamp(alpha, 0.0, 1.0);

        float rim = smoothstep(0.015, 0.12, d) * (1.0 - smoothstep(0.12, 0.40, d));
        cloudCol += rim * 0.35 * mix(vec3(1.0, 0.95, 0.75), u_cloud, 0.5);

        cloudCol = mix(cloudCol, sky, dist * 0.28);
        alpha *= mix(1.0, 0.85, dist);
        return mix(color, cloudCol, alpha);
      }

      vec3 cloudPass(vec3 color, vec3 sky, vec2 p, float aspect, float t,
                     float spd, float phase, float y, vec2 r, float seed, float dist) {
        float cx = mix(-r.x - 0.25, aspect + r.x + 0.25, fract(t * spd + phase));
        float cy = y + sin(t * 0.10 + phase * 6.2831) * 0.015;
        return shadeCloud(color, sky, p, vec2(cx, cy), r, seed, t, dist);
      }

      void main() {
        float aspect = u_res.x / u_res.y;
        vec2 p = vec2(v_uv.x * aspect, v_uv.y);
        float t = u_time;

        vec3 sky = mix(u_skyBottom, u_skyTop, v_uv.y);
        vec3 color = sky;
        color = mix(color, u_skyBottom * 1.10, smoothstep(0.40, 0.0, v_uv.y) * 0.4);

        vec2 sunPos = vec2(aspect * 0.78, 0.92);
        float sunDist = length(p - sunPos);
        color += vec3(1.0, 0.94, 0.72) * exp(-sunDist * sunDist * 4.2) * 0.38;

        float cirrusBand = smoothstep(0.55, 0.8, v_uv.y) * (1.0 - smoothstep(0.9, 1.0, v_uv.y));
        if (cirrusBand > 0.01) {
          float streak = fbm(vec2(p.x * 1.6 - t * 0.015, p.y * 12.0));
          float wisp = smoothstep(0.52, 0.78, streak) * cirrusBand;
          color = mix(color, u_cloud * 0.98, wisp * 0.35);
        }

        if (u_count > 5.5) color = cloudPass(color, sky, p, aspect, t, 0.008, 0.10, 0.84, vec2(0.20, 0.10), 43.7, 1.0);
        if (u_count > 4.5) color = cloudPass(color, sky, p, aspect, t, 0.012, 0.62, 0.73, vec2(0.24, 0.12), 71.3, 0.85);
        if (u_count > 3.5) color = cloudPass(color, sky, p, aspect, t, 0.016, 0.33, 0.60, vec2(0.34, 0.16), 17.3, 0.55);
        if (u_count > 2.5) color = cloudPass(color, sky, p, aspect, t, 0.022, 0.80, 0.47, vec2(0.30, 0.15), 29.9, 0.45);
        if (u_count > 1.5) color = cloudPass(color, sky, p, aspect, t, 0.028, 0.05, 0.35, vec2(0.46, 0.20), 91.1, 0.15);
        color = cloudPass(color, sky, p, aspect, t, 0.035, 0.48, 0.20, vec2(0.56, 0.24), 57.2, 0.0);

        gl_FragColor = vec4(color, 1.0);
      }
    \`;

    const canvas = document.getElementById('c');
    const gl = canvas.getContext('webgl', { preserveDrawingBuffer: true, alpha: false, antialias: false });

    function compile(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_res');
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uCount = gl.getUniformLocation(prog, 'u_count');
    const uCloud = gl.getUniformLocation(prog, 'u_cloud');
    const uSkyTop = gl.getUniformLocation(prog, 'u_skyTop');
    const uSkyBottom = gl.getUniformLocation(prog, 'u_skyBottom');

    gl.viewport(0, 0, ${WIDTH}, ${HEIGHT});
    gl.uniform2f(uRes, ${WIDTH}, ${HEIGHT});
    gl.uniform1f(uCount, 5.0);
    gl.uniform3f(uCloud, 1.0, 1.0, 1.0);
    gl.uniform3f(uSkyTop, 0.576, 0.773, 0.992);
    gl.uniform3f(uSkyBottom, 0.878, 0.949, 0.996);

    window.renderFrame = function(frameIndex) {
      const t = frameIndex * (1.0 / ${FPS}) * ${SPEED};
      gl.uniform1f(uTime, t);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      return canvas.toDataURL('image/jpeg', 0.92);
    };
  </script>
</body>
</html>`;

const HTML_FILE = path.resolve('scripts/render.html');
fs.writeFileSync(HTML_FILE, htmlContent);

async function main() {
  console.log('Launching Chromium for offline WebGL render with dynamic visible speed...');
  const browser = await chromium.launch({
    args: ['--use-gl=angle', '--enable-webgl', '--ignore-gpu-blocklist']
  });
  const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } });
  await page.goto('file://' + HTML_FILE.replace(/\\/g, '/'));

  console.log('Rendering ' + TOTAL_FRAMES + ' exact frames at 60 FPS...');
  const startTime = Date.now();

  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const dataUrl = await page.evaluate((idx) => window.renderFrame(idx), i);
    const base64Data = dataUrl.replace(/^data:image\/jpeg;base64,/, '');
    const filename = path.join(FRAMES_DIR, 'frame_' + String(i).padStart(4, '0') + '.jpg');
    fs.writeFileSync(filename, Buffer.from(base64Data, 'base64'));

    if (i % 60 === 0) {
      console.log('Rendered frame ' + i + ' / ' + TOTAL_FRAMES + ' (' + Math.round((i/TOTAL_FRAMES)*100) + '%)');
    }
  }

  await browser.close();
  console.log('Frames rendered in ' + Math.round((Date.now() - startTime) / 1000) + 's!');

  console.log('Compiling frames into 60 FPS video with seamless xfade loop...');
  const rawMp4 = path.resolve('scripts/raw_loop.mp4');
  
  // 480 frames = 8.0 seconds. 
  // Step 1: Stitch raw 60 FPS video
  execSync('ffmpeg -framerate ' + FPS + ' -i "' + FRAMES_DIR + '/frame_%04d.jpg" -c:v libx264 -pix_fmt yuv420p -preset fast -crf 18 "' + rawMp4 + '" -y', { stdio: 'inherit' });

  // Step 2: Seamless crossfade (2.0s crossfade between tail 12.5-15.0s and head 0-12.5s)
  const finalMp4 = path.resolve('public/clouds.mp4');
  const finalWebm = path.resolve('public/clouds.webm');
  const finalPoster = path.resolve('public/clouds-poster.webp');

  console.log('Applying seamless loop crossfade filter (2.0s)...');
  const xfadeCmd = 'ffmpeg -i "' + rawMp4 + '" -filter_complex "[0:v]split[v1][v2];[v1]trim=start=0:end=12.5,setpts=PTS-STARTPTS[a];[v2]trim=start=12.5:end=15.0,setpts=PTS-STARTPTS[b];[b][a]xfade=transition=fade:duration=2.0:offset=0,format=yuv420p[outv]" -map "[outv]" -c:v libx264 -preset slow -crf 20 -movflags +faststart -an "' + finalMp4 + '" -y';
  execSync(xfadeCmd, { stdio: 'inherit' });

  console.log('Encoding WebM (VP9 60 FPS)...');
  execSync('ffmpeg -i "' + finalMp4 + '" -c:v libvpx-vp9 -b:v 2000k -crf 26 -an "' + finalWebm + '" -y', { stdio: 'inherit' });

  console.log('Extracting poster image...');
  execSync('ffmpeg -ss 00:00:01 -i "' + finalMp4 + '" -vframes 1 "' + finalPoster + '" -y', { stdio: 'inherit' });

  // Cleanup temporary frames and raw file
  fs.rmSync(FRAMES_DIR, { recursive: true, force: true });
  fs.rmSync(HTML_FILE, { force: true });
  fs.rmSync(rawMp4, { force: true });

  console.log('SUCCESS! Dynamic, visibly drifting 60 FPS CloudShader video ready!');
}

main().catch(console.error);
