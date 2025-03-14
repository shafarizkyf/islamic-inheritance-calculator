export interface Heirs {
    spouse?: 'husband' | 'wife';
    children?: boolean;
    sons?: number;
    daughters?: number;
    father?: boolean;
    mother?: boolean;
    siblings?: number;
    fullBrothers?: number;
    fullSisters?: number;
    grandsons?: number;
}
export interface InheritanceResult {
    shares: Record<string, number | string>;
    remainingEstate: number;
}
