class StorageManager {
    constructor(prefix = 'learnEnglish_') {
        this.prefix = prefix;
    }

    set(key, value) {
        try {
            const prefixedKey = this.prefix + key;
            const serialized = JSON.stringify({
                data: value,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem(prefixedKey, serialized);
            return true;
        } catch (error) {
            console.error('Storage set error:', error);
            return false;
        }
    }

    get(key) {
        try {
            const prefixedKey = this.prefix + key;
            const item = localStorage.getItem(prefixedKey);
            if (!item) return null;
            const parsed = JSON.parse(item);
            return parsed.data;
        } catch (error) {
            console.error('Storage get error:', error);
            return null;
        }
    }

    remove(key) {
        try {
            const prefixedKey = this.prefix + key;
            localStorage.removeItem(prefixedKey);
            return true;
        } catch (error) {
            console.error('Storage remove error:', error);
            return false;
        }
    }

    clear() {
        try {
            for (let i = localStorage.length - 1; i >= 0; i--) {
                const key = localStorage.key(i);
                if (key && key.startsWith(this.prefix)) {
                    localStorage.removeItem(key);
                }
            }
            return true;
        } catch (error) {
            console.error('Storage clear error:', error);
            return false;
        }
    }
}

const storage = new StorageManager();