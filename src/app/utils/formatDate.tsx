// utils/formatDate.ts
export function formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
  
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const year = d.getFullYear();
  
    return `${day}/${month}/${year}`; // 👉 e.g., "04/05/2025"
  }
  