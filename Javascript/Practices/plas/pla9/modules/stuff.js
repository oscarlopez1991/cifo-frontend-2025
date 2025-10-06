// Oscar Lopez

// Using 'export default' for the class
export default class Laptop {
  constructor(brand, model, ram) {
    this.brand = brand;
    this.model = model;
    this.ram = ram; // in GB
  }

  // Method to change a property
  upgradeRam(newRam) {
    console.log(`Upgrading RAM from ${this.ram}GB to ${newRam}GB...`);
    this.ram = newRam;
  }

  getSpecs() {
    return `${this.brand} ${this.model} with ${this.ram}GB RAM`;
  }
}

// Using named exports for other functions
export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export const capitalize = (s) => {
  if (typeof s !== 'string' || s.length === 0) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};
