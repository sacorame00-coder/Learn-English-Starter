class PaymentManager {
    constructor() {
        this.stripe = null;
        this.currentPlan = null;
    }

    initializeStripe(publishableKey) {
        this.stripe = Stripe(publishableKey);
    }

    processPayment(planName, amount) {
        return new Promise((resolve, reject) => {
            // Simulate payment processing
            setTimeout(() => {
                const payment = {
                    id: 'pay_' + Date.now(),
                    plan: planName,
                    amount: amount,
                    status: 'succeeded',
                    date: new Date().toISOString()
                };
                
                // Save payment record
                let payments = localStorage.getItem('payments');
                payments = payments ? JSON.parse(payments) : [];
                payments.push(payment);
                localStorage.setItem('payments', JSON.stringify(payments));
                
                resolve(payment);
            }, 2000);
        });
    }

    getPaymentHistory() {
        const payments = localStorage.getItem('payments');
        return payments ? JSON.parse(payments) : [];
    }

    verifySubscription(plan) {
        const subscription = localStorage.getItem('subscription');
        if (!subscription) return false;
        
        const sub = JSON.parse(subscription);
        const startDate = new Date(sub.startDate);
        const expiryDate = new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000);
        
        return new Date() <= expiryDate && sub.plan === plan;
    }
}

const paymentManager = new PaymentManager();