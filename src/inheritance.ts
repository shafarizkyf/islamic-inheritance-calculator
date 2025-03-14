import { Heirs, InheritanceResult } from "./types";

export function calculateInheritance(estate: number, heirs: Heirs): InheritanceResult {
  let shares: Record<string, number | string> = {};
  let remainingEstate = estate;

  // 🟢 Spouse Share
  if (heirs.spouse) {
    if (heirs.spouse === 'husband') {
      shares.spouse = heirs.children ? estate * (1 / 4) : estate * (1 / 2);
    } else if (heirs.spouse === 'wife') {
      shares.spouse = heirs.children ? estate * (1 / 8) : estate * (1 / 4);
    }
    remainingEstate -= shares.spouse as number;
  }

  // 🟢 Parents' Share
  if (heirs.father) {
    shares.father = heirs.children ? estate * (1 / 6) : 0; // Father gets 1/6 if there are children
    remainingEstate -= shares.father;
  }

  if (heirs.mother) {
    if (heirs.children || (heirs.siblings ?? 0) > 1) {
      shares.mother = estate * (1 / 6);
    } else {
      shares.mother = estate * (1 / 3);
    }
    remainingEstate -= shares.mother;
  }

  // 🟢 Children's Share
  if (heirs.sons === 0 && heirs.daughters === 1) {
    shares.daughters = estate * (1 / 2);
    remainingEstate -= shares.daughters;
  } else if (heirs.sons === 0 && (heirs.daughters ?? 0) > 1) {
    shares.daughters = estate * (2 / 3);
    remainingEstate -= shares.daughters;
  } else if ((heirs.sons ?? 0) > 0) {
    shares.children = 'residuary'; // Sons and daughters inherit as residuary
  }

  // 🟢 Grandchildren (Only If No Son Exists)
  if ((heirs.grandsons ?? 0) > 0 && (heirs.sons ?? 0) === 0) {
    shares.grandsons = 'residuary';
  }

  // 🟢 Siblings' Share (Only If No Parents or Children)
  if (!heirs.father && (heirs.sons ?? 0) === 0) {
    if (heirs.fullSisters === 1) {
      shares.fullSisters = estate * (1 / 2);
      remainingEstate -= shares.fullSisters;
    } else if ((heirs.fullSisters ?? 0) > 1) {
      shares.fullSisters = estate * (2 / 3);
      remainingEstate -= shares.fullSisters;
    } else if ((heirs.fullBrothers ?? 0) > 0) {
      shares.siblings = 'residuary';
    }
  }

  // 🟢 Distribute Residuary Shares
  if (remainingEstate > 0) {
    if (shares.children === 'residuary') {
      let totalParts = (heirs.sons ?? 0) * 2 + (heirs.daughters ?? 0) * 1;
      shares.sons = (remainingEstate * 2) / totalParts;
      shares.daughters = (remainingEstate * 1) / totalParts;
      remainingEstate = 0;
    } else if (shares.grandsons === 'residuary') {
      shares.grandsons = remainingEstate;
      remainingEstate = 0;
    } else if (shares.siblings === 'residuary') {
      let totalParts = (heirs.fullBrothers ?? 0) * 2 + (heirs.fullSisters ?? 0) * 1;
      shares.fullBrothers = (remainingEstate * 2) / totalParts;
      shares.fullSisters = (remainingEstate * 1) / totalParts;
      remainingEstate = 0;
    } else if (!heirs.children && heirs.father) {
      (shares.father as number) += remainingEstate;
      remainingEstate = 0;
    }
  }

  return { shares, remainingEstate };
}
