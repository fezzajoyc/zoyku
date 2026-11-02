/**
 * pdfjs-dist ships no type declarations for the worker subpath.
 * We import the worker module only to register its WorkerMessageHandler
 * on the main thread (see loadPdfjs in pdf-ui.tsx) — a bundler-proof way
 * to run pdf.js without a worker URL or CDN.
 */
declare module "pdfjs-dist/build/pdf.worker.min.mjs" {
  export const WorkerMessageHandler: unknown;
}
