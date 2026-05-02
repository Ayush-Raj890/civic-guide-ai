/**
 * Formats a timestamp into a 24h/12h human-readable time
 */
export function formatTime(ts) {
    if (!ts) return "Recently";
    return new Date(ts).toLocaleTimeString([], { 
        hour: "2-digit", 
        minute: "2-digit" 
    });
}

/**
 * Formats byte size into human readable string (KB, MB)
 */
export function formatBytes(n) {
    if (n < 1024) return `${n} B`;
    if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
    return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Reads a File object and returns a DataURL promise
 */
export function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
}

/**
 * Validates file size and type
 */
export function validateFile(file, maxSize) {
    if (file.size > maxSize) {
        return { valid: false, error: `"${file.name}" is too large.` };
    }
    return { valid: true };
}
