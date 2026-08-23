export const COCOA_MODEL_PATH = "/models/cocoa-mascot.glb";
export const COCOA_REQUIRED_CLIPS = Object.freeze([
  "Idle",
  "Walk",
  "Wave",
  "Jump",
  "Point",
  "LookAround",
  "Happy",
]);

export const MASCOT_STATES = Object.freeze({
  IDLE: "idle",
  LOOKING: "looking",
  TURNING: "turning",
  WAVING: "waving",
  POINTING: "pointing",
  JUMPING: "jumping",
  HOVERED: "hovered",
  CLICKED: "clicked",
  RETURNING: "returning",
});

const MOTION_STATES = new Set([
  MASCOT_STATES.TURNING,
  MASCOT_STATES.WAVING,
  MASCOT_STATES.POINTING,
  MASCOT_STATES.JUMPING,
  MASCOT_STATES.CLICKED,
  MASCOT_STATES.RETURNING,
]);

/**
 * Small state controller shared by the current 2.5D mascot and a future GLB
 * renderer. A rigged model can consume the same play/lookAt/returnHome API.
 */
export function createMascotController(root, { reducedMotion = false } = {}) {
  let state = MASCOT_STATES.IDLE;
  let activeTimer = 0;
  let activeResolve = null;
  let destroyed = false;

  const finishActive = (completed) => {
    window.clearTimeout(activeTimer);
    activeTimer = 0;
    if (activeResolve) activeResolve(completed);
    activeResolve = null;
  };

  const setState = (nextState) => {
    state = nextState;
    root.dataset.state = nextState;
  };

  const play = (nextState, duration = 700) => {
    if (destroyed) return Promise.resolve(false);
    if (reducedMotion && MOTION_STATES.has(nextState)) return Promise.resolve(false);

    finishActive(false);
    setState(nextState);

    return new Promise((resolve) => {
      activeResolve = resolve;
      activeTimer = window.setTimeout(() => {
        activeTimer = 0;
        activeResolve = null;
        if (nextState !== MASCOT_STATES.HOVERED) setState(MASCOT_STATES.IDLE);
        resolve(true);
      }, duration);
    });
  };

  const lookAt = (x, y) => {
    const safeX = Math.max(-1, Math.min(1, x));
    const safeY = Math.max(-1, Math.min(1, y));
    root.style.setProperty("--look-rx", `${(safeY * -7).toFixed(2)}deg`);
    root.style.setProperty("--look-ry", `${(safeX * 13).toFixed(2)}deg`);
    root.style.setProperty("--look-ry-soft", `${(safeX * 10).toFixed(2)}deg`);
    root.style.setProperty("--look-ry-strong", `${(safeX * 15).toFixed(2)}deg`);
    root.style.setProperty("--look-shift-x", `${(safeX * 3).toFixed(2)}px`);
    root.style.setProperty("--look-tilt", `${(safeX * -1.4).toFixed(2)}deg`);
    root.style.setProperty("--eye-x", `${(safeX * 2.4).toFixed(2)}px`);
    root.style.setProperty("--eye-y", `${(safeY * 1.8).toFixed(2)}px`);
  };

  return {
    get state() {
      return state;
    },
    play,
    lookAt,
    // Deliberately restrained for the flattened-image fallback. A future
    // CocoaModel renderer can replace this with rigged locomotion.
    walkTo(x) {
      lookAt(Math.sign(x) || 0, 0);
      return play(MASCOT_STATES.TURNING, 520);
    },
    returnHome() {
      lookAt(0, 0);
      return play(MASCOT_STATES.RETURNING, 620);
    },
    pause(paused) {
      root.dataset.paused = String(paused);
      if (paused) finishActive(false);
      if (paused) setState(MASCOT_STATES.IDLE);
    },
    destroy() {
      destroyed = true;
      finishActive(false);
    },
  };
}
