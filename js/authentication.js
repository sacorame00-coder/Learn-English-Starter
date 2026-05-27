class AuthenticationManager {
    constructor() {
        this.currentUser = null;
        this.users = JSON.parse(localStorage.getItem('users')) || [];
    }

    register(email, password, name) {
        if (this.users.find(u => u.email === email)) {
            return { success: false, message: 'البريد الإلكتروني مستخدم بالفعل' };
        }

        const newUser = {
            id: 'user_' + Date.now(),
            email: email,
            password: this.hashPassword(password),
            name: name,
            createdAt: new Date().toISOString(),
            subscription: null,
            completedLessons: [],
            points: 0
        };

        this.users.push(newUser);
        localStorage.setItem('users', JSON.stringify(this.users));
        
        return { success: true, message: 'تم التسجيل بنجاح', user: newUser };
    }

    login(email, password) {
        const user = this.users.find(u => u.email === email);
        
        if (!user) {
            return { success: false, message: 'البريد الإلكتروني غير موجود' };
        }

        if (user.password !== this.hashPassword(password)) {
            return { success: false, message: 'كلمة المرور غير صحيحة' };
        }

        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        return { success: true, message: 'تم تسجيل الدخول بنجاح', user: user };
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        return { success: true, message: 'تم تسجيل الخروج' };
    }

    getCurrentUser() {
        return this.currentUser || JSON.parse(localStorage.getItem('currentUser'));
    }

    hashPassword(password) {
        // Simple hash - في الإنتاج استخدم طريقة آمنة
        return btoa(password);
    }

    updateUserProgress(lessonId, score) {
        if (!this.currentUser) return false;
        
        this.currentUser.completedLessons.push({
            lessonId: lessonId,
            score: score,
            completedAt: new Date().toISOString()
        });

        this.currentUser.points += score * 10;
        
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        return true;
    }
}

const authManager = new AuthenticationManager();