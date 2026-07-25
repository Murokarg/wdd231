// add the year and the last modified date
export const currentYear = new Date().getFullYear();
export const lastModified = document.lastModified;

// functions to add the year and the last modified date
document.getElementById("currentYear").textContent = currentYear;
document.getElementById("lastModified").textContent = document.lastModified;