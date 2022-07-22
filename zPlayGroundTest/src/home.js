const section = document.getElementById('homeView');
section.remove();
let ctx = null;

export function showHome(inCtx) {
    ctx = inCtx;
    ctx.render(section)
}