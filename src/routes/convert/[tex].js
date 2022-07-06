// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import sharp from 'sharp'

/** @type {import('./__types/[tex]').RequestHandler} */
export async function get(request) {

    const tex = request.params.tex;

    const responce = await fetch(`https://math.vercel.app/?from=${tex}`);
    const svg = await responce.text();
    const png = await svg2png(svg);

    return { status: 200, body: png };
}

async function svg2png(_svg) {
    const svg = await sharp(Buffer.from(_svg), { density: 1000 });
    const _png = await svg.resize({ width: 200 }).png({ quality: 100 });
    const png = await _png.toBuffer();
    return png;
}