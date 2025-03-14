## Islamic Inheritance Calculator (Experimental)
#### ⚠️ Project Status: Experimental/Development ⚠️
This package is still under development and may undergo significant changes. Please use it with caution and report any issues you find.

### 📜 Overview
This package provides a calculation engine for Islamic inheritance distribution based on Sunni Fiqh rules. It helps automate the process of determining the shares of heirs according to Islamic law.

### 🚀 Features
* Calculates inheritance shares based on Islamic rules.
* Supports various family structures (spouse, parents, children, siblings, etc.).
* Handles both fixed shares and residuary distributions.
* Designed to be used as a backend service or integrated into larger applications.

### 📦 Installation
```
[wip]
```

### 🛠 Usage
```
import { calculateInheritance } from "islamic-inheritance-calculator";
const estateValue = 1000000; // Total wealth left behind
const heirs = {
  spouse: "wife",
  children: true,
  father: true,
  mother: true,
};
const result = calculateInheritance(estateValue, heirs);
console.log(result);
```

### Running Tests
```
npm test
```

### 🚨 Disclaimer
This package aims to provide an automated approach to Islamic inheritance but does not replace the need for professional legal or religious consultation. Always consult a qualified scholar for final decisions.
