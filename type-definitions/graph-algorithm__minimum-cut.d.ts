declare module '@graph-algorithm/minimum-cut' {
    export function mincut(edges: [string, string][]): Generator<[string, string]>;
}
