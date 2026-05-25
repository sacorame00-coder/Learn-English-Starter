class AITutor {
    constructor() {
        this.conversationHistory = [];
        this.commonResponses = {
            greetings: [
                'مرحباً! كيف حالك؟',
                'أهلاً وسهلاً بك في درسنا اليوم!',
                'تشرفت بمقابلتك! كيف يمكنني مساعدتك؟'
            ],
            encouragement: [
                '👏 إجابة رائعة!',
                '✨ أنت تحسن بسرعة!',
                '🌟 ممتاز جداً!',
                '💪 استمر في هذا الجهد!'
            ],
            corrections: [
                'في الواقع، الطريقة الصحيحة هي...',
                'جميل، لكن يمكنك أن...',
                'قريب جداً! الأصح هو...'
            ]
        };
    }

    generateResponse(userInput) {
        const input = userInput.toLowerCase().trim();
        
        // Check for greetings
        if (this.isGreeting(input)) {
            return this.getRandomResponse(this.commonResponses.greetings);
        }
        
        // Check for questions
        if (input.includes('?')) {
            return this.answerQuestion(userInput);
        }

        // Check for pronunciation
        return this.provideFeedback(userInput);
    }

    isGreeting(text) {
        const greetings = ['hello', 'hi', 'good morning', 'good afternoon', 'how are you', 'hey'];
        return greetings.some(g => text.includes(g));
    }

    answerQuestion(question) {
        const responses = {
            'what': 'هذا سؤال جيد! دعني أساعدك...',
            'how': 'الطريقة الصحيحة هي...',
            'when': 'عندما تريد أن تقول...'
        };
        
        for (let key in responses) {
            if (question.toLowerCase().includes(key)) {
                return responses[key];
            }
        }
        return 'سؤال ممتاز! دعنا نناقشه معاً.';
    }

    provideFeedback(input) {
        return this.getRandomResponse(this.commonResponses.encouragement);
    }

    getRandomResponse(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    recordConversation(user, ai) {
        this.conversationHistory.push({
            user: user,
            ai: ai,
            timestamp: new Date()
        });
    }
}

const tutor = new AITutor();