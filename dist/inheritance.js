"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateInheritance = calculateInheritance;
function calculateInheritance(estate, heirs) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    let shares = {};
    let remainingEstate = estate;
    // 🟢 Spouse Share
    if (heirs.spouse) {
        if (heirs.spouse === 'husband') {
            shares.spouse = heirs.children ? estate * (1 / 4) : estate * (1 / 2);
        }
        else if (heirs.spouse === 'wife') {
            shares.spouse = heirs.children ? estate * (1 / 8) : estate * (1 / 4);
        }
        remainingEstate -= shares.spouse;
    }
    // 🟢 Parents' Share
    if (heirs.father) {
        shares.father = heirs.children ? estate * (1 / 6) : 0; // Father gets 1/6 if there are children
        remainingEstate -= shares.father;
    }
    if (heirs.mother) {
        if (heirs.children || ((_a = heirs.siblings) !== null && _a !== void 0 ? _a : 0) > 1) {
            shares.mother = estate * (1 / 6);
        }
        else {
            shares.mother = estate * (1 / 3);
        }
        remainingEstate -= shares.mother;
    }
    // 🟢 Children's Share
    if (heirs.sons === 0 && heirs.daughters === 1) {
        shares.daughters = estate * (1 / 2);
        remainingEstate -= shares.daughters;
    }
    else if (heirs.sons === 0 && ((_b = heirs.daughters) !== null && _b !== void 0 ? _b : 0) > 1) {
        shares.daughters = estate * (2 / 3);
        remainingEstate -= shares.daughters;
    }
    else if (((_c = heirs.sons) !== null && _c !== void 0 ? _c : 0) > 0) {
        shares.children = 'residuary'; // Sons and daughters inherit as residuary
    }
    // 🟢 Grandchildren (Only If No Son Exists)
    if (((_d = heirs.grandsons) !== null && _d !== void 0 ? _d : 0) > 0 && ((_e = heirs.sons) !== null && _e !== void 0 ? _e : 0) === 0) {
        shares.grandsons = 'residuary';
    }
    // 🟢 Siblings' Share (Only If No Parents or Children)
    if (!heirs.father && ((_f = heirs.sons) !== null && _f !== void 0 ? _f : 0) === 0) {
        if (heirs.fullSisters === 1) {
            shares.fullSisters = estate * (1 / 2);
            remainingEstate -= shares.fullSisters;
        }
        else if (((_g = heirs.fullSisters) !== null && _g !== void 0 ? _g : 0) > 1) {
            shares.fullSisters = estate * (2 / 3);
            remainingEstate -= shares.fullSisters;
        }
        else if (((_h = heirs.fullBrothers) !== null && _h !== void 0 ? _h : 0) > 0) {
            shares.siblings = 'residuary';
        }
    }
    // 🟢 Distribute Residuary Shares
    if (remainingEstate > 0) {
        if (shares.children === 'residuary') {
            let totalParts = ((_j = heirs.sons) !== null && _j !== void 0 ? _j : 0) * 2 + ((_k = heirs.daughters) !== null && _k !== void 0 ? _k : 0) * 1;
            shares.sons = (remainingEstate * 2) / totalParts;
            shares.daughters = (remainingEstate * 1) / totalParts;
            remainingEstate = 0;
        }
        else if (shares.grandsons === 'residuary') {
            shares.grandsons = remainingEstate;
            remainingEstate = 0;
        }
        else if (shares.siblings === 'residuary') {
            let totalParts = ((_l = heirs.fullBrothers) !== null && _l !== void 0 ? _l : 0) * 2 + ((_m = heirs.fullSisters) !== null && _m !== void 0 ? _m : 0) * 1;
            shares.fullBrothers = (remainingEstate * 2) / totalParts;
            shares.fullSisters = (remainingEstate * 1) / totalParts;
            remainingEstate = 0;
        }
        else if (!heirs.children && heirs.father) {
            shares.father += remainingEstate;
            remainingEstate = 0;
        }
    }
    return { shares, remainingEstate };
}

const heirs = {
    spouse: 'wife', // 'husband' or 'wife'
    children: true, // If deceased has any children
    sons: 1,
    daughters: 1,
    father: true,
    mother: true,
    siblings: 0,
    fullBrothers: 0,
    fullSisters: 0,
    grandsons: 0,
};

console.log(calculateInheritance(100000000, heirs))