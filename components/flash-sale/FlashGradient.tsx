'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

import styles from './flash.module.css';

/**
 * The slow, living gradient behind /flash, in Euforyc's own colours.
 *
 * The field is the noise-and-lines fragment shader of the Identeti footer
 * gradient, with the same camera-in-sphere framing and the same slow drift
 * (0.005 a frame at 60 frames a second, which is 0.3 a second here). Raw
 * WebGL1, no library. One canvas serves the whole page: it fills the cover
 * while the page is closed, then sits softly behind the top of the open page.
 *
 * Colours: ink is the body, green and sage are the mid tones at the edges of
 * the light, cream and beige are the light itself. On the closed page the
 * light lies along the bottom edge, like light under a door.
 *
 * Legibility is built in, not painted on: the shader limits how much of the
 * light is let through at each height (`reach`), and the cover tells it where
 * its last line of words ends (`lightBelow`), on every screen size. Where the
 * words are, at most a fifth of the light gets through, and the lightest
 * colour that can produce is about rgb(80, 91, 69): 7:1 under cream type and
 * 4.8:1 under the cover's quietest text, at every moment of the drift. No
 * box, scrim or text shadow is involved.
 *
 * Kind to phones: drawn at half the layout resolution or less, 30 frames a
 * second, a low-power context, paused when the tab is hidden or the canvas is
 * off screen, one still frame under reduced motion, recovery after a lost
 * context, and a pure-CSS gradient behind the canvas when WebGL is missing.
 */

// Brand tokens (app/globals.css), as the shader wants them
const rgb = (hex: string) => [1, 3, 5].map((at) => parseInt(hex.slice(at, at + 2), 16) / 255);
const INK = rgb('#1a260e'); // --eu-ink
const GREEN = rgb('#2a3a21'); // --eu-green
const SAGE = rgb('#3d4a33'); // --eu-sage
const CREAM = rgb('#fffcf2'); // --eu-cream
const BEIGE = rgb('#f5f0e8'); // --eu-beige

// The reference's construction: a camera inside a sphere, looking at one fixed
// spot. No scroll sweep and no cursor: only the drift moves.
//
// The framing is this page's own. The reference frame, cropped to a phone's
// tall screen, shows almost nothing but the light part of the pattern. Here
// the camera is tilted up a little and the sphere turned so that the pattern
// runs from the light at the bottom edge of the screen, through its sage edge
// about a quarter of the way up, to the ink body above. On every screen shape.
const TIME_START = 4.35;
const DRIFT_PER_SECOND = 0.3;
const FOV_TAN = Math.tan((70 * Math.PI) / 360);
const VIEW = { rx: 0.104, ry: 0, roll: 0 };
const SPHERE = { ry: 0, rz: -1.071 };

const FPS = 30;
/** Buffer pixels per layout pixel: half resolution, whatever the screen's density */
const RESOLUTION = 0.5;
const MAX_BUFFER_SIDE = 760;

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uRes;
uniform float uTime;
uniform float uOpen;     // 0 on the closed cover, 1 behind the open page
uniform float uLight;    // closed: how far up from the bottom edge the light may come (0 to 1)
uniform float uGrain;    // which frame of film grain
uniform mat3 uView;
uniform mat3 uSphere;
uniform vec3 uBaseFirst;  // sage: the edge of the light
uniform vec3 uBaseStep1;  // green: the second mid tone, and the swell in the body
uniform vec3 uBaseThird;  // cream: the light
uniform vec3 uWash;       // ink: the body
uniform vec3 uAccent;     // beige: a trace in the light

float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

float noise(vec3 p){
  vec3 a = floor(p);
  vec3 d = p - a;
  d = d * d * (3.0 - 2.0 * d);
  vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
  vec4 k1 = perm(b.xyxy);
  vec4 k2 = perm(k1.xyxy + b.zzww);
  vec4 c = k2 + a.zzzz;
  vec4 k3 = perm(c);
  vec4 k4 = perm(c + 1.0);
  vec4 o1 = fract(k3 * (1.0 / 41.0));
  vec4 o2 = fract(k4 * (1.0 / 41.0));
  vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
  vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);
  return o4.y * d.y + o4.x * (1.0 - d.y);
}

float lines(vec2 uv, float offset){
  return smoothstep(0., 0.5 + offset * 0.5, 0.8 * abs((sin(uv.x * 25.) + offset * 3.)));
}

mat2 rotate2D(float angle){
  return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

// Film grain: one value per buffer pixel, a new arrangement each grain frame
float grain(vec2 p){
  p = 50.0 * fract(p * 0.3183099 + vec2(0.71, 0.113));
  return -1.0 + 2.0 * fract(p.x * p.y * (p.x + p.y));
}

void main() {
  vec2 st = gl_FragCoord.xy / uRes; // 0 to 1, from the bottom left
  vec2 ndc = st * 2.0 - 1.0;
  vec3 dir = uView * vec3(ndc.x * ${FOV_TAN.toFixed(6)} * (uRes.x / uRes.y), ndc.y * ${FOV_TAN.toFixed(6)}, -1.0);
  vec3 vPosition = (uSphere * (64.0 * normalize(dir))) * 0.03;

  float n = noise(vPosition + uTime);
  vec2 baseUV = rotate2D(n) * vPosition.xy * 0.05;
  float basePattern = lines(baseUV, 0.6);
  float secondPattern = lines(baseUV, 0.125);
  float thirdPattern = lines(baseUV, 0.3);

  // How much of the light is let through at this height. Closed: all of it
  // along the bottom edge, falling to a fifth at uLight, which is kept below
  // the last line of words; from there up, a fifth is the most there can be.
  // Open: a soft sixth everywhere, under the page's own type.
  float edge = max(uLight, 0.0001);
  float lit = (1.0 - smoothstep(edge * 0.4, edge, st.y)) * step(0.001, uLight);
  float reach = mix(mix(0.2, 1.0, lit), 0.16, uOpen);

  // The body is ink with a slow swell of green through it
  float swell = noise(vPosition * 0.55 - uTime * 0.6 + 7.3);
  vec3 body = mix(uWash, uBaseStep1, 0.7 * smoothstep(0.25, 0.85, swell));

  vec3 baseColor = mix(uBaseStep1, uBaseFirst, basePattern);
  vec3 secondStep = mix(baseColor, uBaseThird, secondPattern * 0.9);
  vec3 thirdStep = mix(secondStep, body, 1.0 - (1.0 - thirdPattern) * reach);
  vec3 finalColor = mix(thirdStep, uAccent, (1.0 - thirdPattern) * reach * 0.04);

  finalColor += grain(gl_FragCoord.xy + uGrain) * 0.012;
  gl_FragColor = vec4(clamp(finalColor, 0.0, 1.0), 1.0);
}
`;

/** Column-major mat3 helpers for gl.uniformMatrix3fv */
const mulM3 = (a: number[], b: number[]) => {
  const r = new Array<number>(9).fill(0);
  for (let c = 0; c < 3; c++)
    for (let row = 0; row < 3; row++) for (let k = 0; k < 3; k++) r[c * 3 + row] += a[k * 3 + row] * b[c * 3 + k];
  return r;
};
const rotXM = (a: number) => [1, 0, 0, 0, Math.cos(a), Math.sin(a), 0, -Math.sin(a), Math.cos(a)];
const rotYM = (a: number) => [Math.cos(a), 0, -Math.sin(a), 0, 1, 0, Math.sin(a), 0, Math.cos(a)];
const rotZM = (a: number) => [Math.cos(a), Math.sin(a), 0, -Math.sin(a), Math.cos(a), 0, 0, 0, 1];
const VIEW_MATRIX = new Float32Array(mulM3(mulM3(rotYM(VIEW.ry), rotXM(VIEW.rx)), rotZM(VIEW.roll)));
const SPHERE_MATRIX = new Float32Array(mulM3(rotZM(SPHERE.rz), rotYM(SPHERE.ry)));

function compile(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export interface FlashGradientHandle {
  /**
   * Draws the field as it is this instant into two canvases, its left half
   * and its right half, for the cover to slide apart. False when there is no
   * live field to copy (the CSS gradient is showing instead).
   */
  snapshot(left: HTMLCanvasElement, right: HTMLCanvasElement): boolean;
}

/** The light never comes further up the closed cover than this, however empty the screen */
const MAX_LIGHT = 0.25;

interface FlashGradientProps {
  /** "cover" fills the screen above everything; "page" lies behind the top of the open page */
  mode: 'cover' | 'page';
  /**
   * Closed cover only: the share of the screen's height, measured up from the
   * bottom edge, that lies clear below the last line of words. The light
   * stays inside it. 0 keeps the whole cover dark.
   */
  lightBelow: number;
  /** Stops the drift, for the moment the cover slides apart */
  paused: boolean;
  /** One still frame and no drift at all, for the closed page after midnight */
  still: boolean;
  /** Not drawn at all: a visitor coming back to an open page, while the server is asked again */
  hidden?: boolean;
}

interface LiveField {
  /** Draws a frame now */
  render(): void;
  /** Starts or stops the loop to match the props, the tab and the screen */
  sync(): void;
}

const FlashGradient = forwardRef<FlashGradientHandle, FlashGradientProps>(function FlashGradient(
  { mode, lightBelow, paused, still, hidden = false },
  ref
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const live = useRef<LiveField | null>(null);
  // Read by the loop, which outlives any one render
  const light = Math.max(0, Math.min(MAX_LIGHT, lightBelow));
  const wants = useRef({ mode, light, paused, still });
  wants.current = { mode, light, paused, still };

  useImperativeHandle(
    ref,
    () => ({
      snapshot(left, right) {
        const canvas = canvasRef.current;
        if (!canvas || !live.current) return false;
        // Draw, then copy in the same breath: the buffer is only guaranteed until the browser composites
        live.current.render();
        const half = Math.ceil(canvas.width / 2);
        let copied = true;
        [left, right].forEach((target, index) => {
          target.width = half;
          target.height = canvas.height;
          const context = target.getContext('2d');
          if (!context) {
            copied = false;
            return;
          }
          context.drawImage(canvas, index === 0 ? 0 : canvas.width - half, 0, half, canvas.height, 0, 0, half, canvas.height);
        });
        return copied;
      },
    }),
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let disposed = false;
    let raf = 0;
    let onScreen = true;
    let teardown: (() => void) | null = null;

    const setup = (): boolean => {
      const gl = canvas.getContext('webgl', {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: 'low-power',
      });
      if (!gl || gl.isContextLost()) return false;

      const vertex = compile(gl, gl.VERTEX_SHADER, VERT);
      const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAG);
      const program = gl.createProgram();
      if (!vertex || !fragment || !program) return false;
      gl.attachShader(program, vertex);
      gl.attachShader(program, fragment);
      gl.linkProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return false;
      gl.useProgram(program);

      // One triangle that covers the screen
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const aPos = gl.getAttribLocation(program, 'aPos');
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      const uniform = (name: string) => gl.getUniformLocation(program, name);
      const uRes = uniform('uRes');
      const uTime = uniform('uTime');
      const uOpen = uniform('uOpen');
      const uLight = uniform('uLight');
      const uGrain = uniform('uGrain');
      gl.uniformMatrix3fv(uniform('uView'), false, VIEW_MATRIX);
      gl.uniformMatrix3fv(uniform('uSphere'), false, SPHERE_MATRIX);
      gl.uniform3fv(uniform('uBaseFirst'), SAGE);
      gl.uniform3fv(uniform('uBaseStep1'), GREEN);
      gl.uniform3fv(uniform('uBaseThird'), CREAM);
      gl.uniform3fv(uniform('uWash'), INK);
      gl.uniform3fv(uniform('uAccent'), BEIGE);

      let time = TIME_START;
      let grainFrame = 0;
      let lastDraw = 0;
      // The light's upper limit, eased towards what the cover asks for. It only
      // ever eases while the loop runs; a single frame takes the value as it is.
      let lightNow = wants.current.light;

      const resize = () => {
        const longest = Math.max(canvas.clientWidth, canvas.clientHeight, 1);
        const scale = Math.min(RESOLUTION, MAX_BUFFER_SIDE / longest);
        const width = Math.max(1, Math.round(canvas.clientWidth * scale));
        const height = Math.max(1, Math.round(canvas.clientHeight * scale));
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
          gl.viewport(0, 0, width, height);
        }
      };

      const render = (eased = false) => {
        resize();
        // Falling (words have moved lower) is immediate, so the light is never
        // behind text even for a frame. Rising is eased.
        const target = wants.current.light;
        lightNow = eased && target > lightNow ? lightNow + (target - lightNow) * 0.08 : target;
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform1f(uTime, time);
        gl.uniform1f(uOpen, wants.current.mode === 'page' ? 1 : 0);
        gl.uniform1f(uLight, lightNow);
        gl.uniform1f(uGrain, grainFrame * 17.0);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      };

      const shouldRun = () =>
        !disposed && !reducedMotion && !wants.current.paused && !wants.current.still && onScreen && !document.hidden;

      // The loop asks for no frame at all while it has no reason to draw
      const frame = (now: number) => {
        raf = 0;
        if (!shouldRun()) return;
        raf = requestAnimationFrame(frame);
        const elapsed = now - lastDraw;
        if (elapsed < 1000 / FPS - 1) return;
        lastDraw = now;
        // A long gap (a hidden tab, a slow frame) must not make the field jump
        time += (Math.min(elapsed, 100) / 1000) * DRIFT_PER_SECOND;
        grainFrame = (grainFrame + 1) % 240;
        render(true);
      };

      const sync = () => {
        if (shouldRun()) {
          if (!raf) {
            lastDraw = performance.now();
            raf = requestAnimationFrame(frame);
          }
        } else if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      };

      // Keeps a paused or still frame correct when the canvas changes size
      const resizeObserver = new ResizeObserver(() => render());
      resizeObserver.observe(canvas);

      live.current = { render: () => render(), sync };
      render();
      canvas.dataset.live = 'true';
      sync();

      teardown = () => {
        live.current = null;
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        resizeObserver.disconnect();
        delete canvas.dataset.live;
        gl.deleteBuffer(buffer);
        gl.deleteProgram(program);
        // Give the context back once the canvas has really left the page. Not at
        // once: React's development mode remounts on the same canvas, and a
        // context lost on purpose can never be had again from it.
        window.setTimeout(() => {
          if (!canvas.isConnected) gl.getExtension('WEBGL_lose_context')?.loseContext();
        });
      };
      return true;
    };

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      live.current?.sync();
    });
    observer.observe(canvas);

    const onVisibility = () => live.current?.sync();
    document.addEventListener('visibilitychange', onVisibility);

    // A lost context: stop, let the CSS gradient show, and rebuild if it comes back
    const onLost = (event: Event) => {
      event.preventDefault();
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      live.current = null;
      delete canvas.dataset.live;
    };
    const onRestored = () => {
      teardown = null;
      if (!disposed) setup();
    };
    canvas.addEventListener('webglcontextlost', onLost);
    canvas.addEventListener('webglcontextrestored', onRestored);

    // If this fails, the CSS gradient behind the canvas is what shows
    setup();

    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('webglcontextlost', onLost);
      canvas.removeEventListener('webglcontextrestored', onRestored);
      teardown?.();
    };
  }, []);

  // A change of mode redraws at once (the field looks different open and
  // closed); a change of pause or stillness starts or stops the loop. While
  // the loop is stopped, a new light limit is drawn at once too.
  useEffect(() => {
    live.current?.render();
    live.current?.sync();
  }, [mode, paused, still]);
  useEffect(() => {
    if (paused || still) live.current?.render();
  }, [light, paused, still]);

  return (
    <div
      className={`${styles.field} ${mode === 'page' ? styles.fieldPage : styles.fieldCover} ${hidden ? styles.fieldHidden : ''}`}
      data-flash-field={mode}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className={styles.fieldCanvas} />
    </div>
  );
});

export default FlashGradient;
