// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { svg2png, initialize } from 'svg2png-wasm';

/** @type {import('./__types/[tex]').RequestHandler} */
export async function get(request) {

    const tex = request.params.tex;
    const json = await request.json;
    console.log(request.url.origin); // Use `request.url.origin` to get URL where the request is coming from, and the tack on /svg2png_wasm_bg.wasm to get the web assembly file

    const responce = await fetch(`https://math.vercel.app/?from=${tex}`);
    const svg = responce.body;

    await initialize(
        fetch(request.url.origin + "/svg2png_wasm_bg.wasm'")
    );

    const png = svg2png(svg)

    // console.log(`${request.url.origin}/svg2png_wasm_bg.wasm`)

    // return { status: 400 }

    return { status: 200, body: png, headers: { 'Content-Type': 'image/png' } };
}