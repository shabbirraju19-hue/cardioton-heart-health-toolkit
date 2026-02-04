// Blood Pressure Risk Calculator
// Cardioton Heart Health Toolkit

document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate-btn');
    const resultContainer = document.getElementById('result-container');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateBP);
    }
    
    // Allow Enter key to calculate
    document.getElementById('systolic')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculateBP();
    });
    document.getElementById('diastolic')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculateBP();
    });
});

function calculateBP() {
    const systolic = parseInt(document.getElementById('systolic').value);
    const diastolic = parseInt(document.getElementById('diastolic').value);
    
    if (!systolic || !diastolic) {
        alert('Please enter both systolic and diastolic readings');
        return;
    }
    
    if (systolic < 70 || systolic > 250 || diastolic < 40 || diastolic > 150) {
        alert('Please enter valid readings (Systolic: 70-250, Diastolic: 40-150)');
        return;
    }
    
    let category, colorClass, gaugePercent, riskText, recommendations;
    
    // Determine category based on AHA guidelines
    if (systolic > 180 || diastolic > 120) {
        category = 'Hypertensive Crisis';
        colorClass = 'crisis';
        gaugePercent = 100;
        riskText = 'EMERGENCY: Seek immediate medical attention!';
        recommendations = [
            'Call emergency services immediately',
            'Do not wait - this is a medical emergency',
            'Sit down and stay calm while waiting for help'
        ];
    } else if (systolic >= 140 || diastolic >= 90) {
        category = 'Hypertension Stage 2';
        colorClass = 'danger';
        gaugePercent = 85;
        riskText = 'High Risk: Consult a doctor as soon as possible';
        recommendations = [
            'Schedule a doctor appointment within 1-2 weeks',
            'Monitor your BP daily',
            'Consider natural supplements like Cardioton',
            'Reduce salt intake and exercise regularly'
        ];
    } else if (systolic >= 130 || diastolic >= 80) {
        category = 'Hypertension Stage 1';
        colorClass = 'warning';
        gaugePercent = 65;
        riskText = 'Moderate Risk: Lifestyle changes recommended';
        recommendations = [
            'Monitor your BP regularly',
            'Adopt heart-healthy diet (DASH diet)',
            'Exercise 30 minutes daily',
            'Consider Cardioton for natural BP support'
        ];
    } else if (systolic >= 120 && diastolic < 80) {
        category = 'Elevated';
        colorClass = 'caution';
        gaugePercent = 40;
        riskText = 'Caution: Pre-hypertension range';
        recommendations = [
            'Monitor BP monthly',
            'Increase physical activity',
            'Reduce sodium intake',
            'Maintain healthy weight'
        ];
    } else {
        category = 'Normal';
        colorClass = 'normal';
        gaugePercent = 20;
        riskText = 'Good: Keep up the healthy lifestyle!';
        recommendations = [
            'Continue your healthy habits',
            'Monitor BP every 6 months',
            'Stay active and eat balanced meals',
            'Cardioton can help maintain optimal levels'
        ];
    }
    
    // Update UI
    resultContainer.classList.remove('hidden');
    resultContainer.className = 'result-container ' + colorClass;
    
    document.getElementById('bp-category').textContent = category;
    document.getElementById('bp-reading').textContent = `${systolic}/${diastolic} mmHg`;
    document.getElementById('risk-text').textContent = riskText;
    
    // Animate gauge
    setTimeout(() => {
        document.getElementById('gauge-fill').style.width = gaugePercent + '%';
    }, 100);
    
    // Build recommendations
    const recList = document.getElementById('recommendations');
    recList.innerHTML = recommendations.map(rec => `<li>${rec}</li>`).join('');
    
    // Scroll to result
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            faqItems.forEach(i => i.classList.remove('open'));
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });
});

// Form submission
function submitOrder(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    fetch('https://www.itech19.com/cardioton/sendorder19.php', {
        method: 'POST',
        body: formData
    })
    .then(() => {
        form.innerHTML = '<div class="success-message"><h3>✅ Order Received!</h3><p>Thank you for your order. Our team will call you within 24 hours to confirm.</p></div>';
    })
    .catch(() => {
        form.innerHTML = '<div class="success-message"><h3>✅ Order Received!</h3><p>Thank you for your order. Our team will call you within 24 hours to confirm.</p></div>';
    });
}
