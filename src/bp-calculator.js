// Blood Pressure Risk Calculator - Fixed Version
// Cardioton Heart Health Toolkit

document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate-btn');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateBP);
    }

    // Allow Enter key to calculate
    const systolicInput = document.getElementById('systolic');
    const diastolicInput = document.getElementById('diastolic');

    if (systolicInput) {
        systolicInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') calculateBP();
        });
    }

    if (diastolicInput) {
        diastolicInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') calculateBP();
        });
    }
});

function calculateBP() {
    const systolicInput = document.getElementById('systolic');
    const diastolicInput = document.getElementById('diastolic');
    const resultContainer = document.getElementById('result-container');

    if (!systolicInput || !diastolicInput || !resultContainer) {
        console.error('Required elements not found');
        showToast('Error: Calculator not initialized properly', 'error');
        return;
    }

    const systolic = parseInt(systolicInput.value);
    const diastolic = parseInt(diastolicInput.value);

    if (!systolic || !diastolic) {
        showToast('Please enter both systolic and diastolic readings', 'error');
        return;
    }

    if (systolic < 70 || systolic > 250 || diastolic < 40 || diastolic > 150) {
        showToast('Please enter valid readings (Systolic: 70-250, Diastolic: 40-150)', 'error');
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
    const categoryEl = document.getElementById('result-category');
    const readingEl = document.getElementById('result-reading');
    const messageEl = document.getElementById('result-message');
    const recommendationList = document.getElementById('recommendation-list');
    const gaugeFill = document.getElementById('gauge-fill');
    const gaugeMarker = document.getElementById('gauge-marker');
    const resultBox = document.getElementById('result-box');

    // Show result container
    resultContainer.classList.remove('hidden');
    
    // Add animation class
    resultContainer.classList.add('fade-in');

    // Update content
    categoryEl.textContent = category;
    categoryEl.className = 'result-category ' + colorClass;
    readingEl.textContent = systolic + '/' + diastolic + ' mmHg';
    messageEl.textContent = riskText;
    
    // Update gauge
    gaugeFill.style.width = gaugePercent + '%';
    gaugeFill.className = 'gauge-fill ' + colorClass;
    gaugeMarker.style.left = gaugePercent + '%';
    
    // Update result box color
    resultBox.className = 'result-box ' + colorClass;

    // Update recommendations
    recommendationList.innerHTML = '';
    recommendations.forEach(function(rec) {
        const li = document.createElement('li');
        li.textContent = rec;
        recommendationList.appendChild(li);
    });

    // Scroll to results
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    showToast('BP Risk Calculated: ' + category, 'success');
}

// Toast notification system
function showToast(message, type) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    toast.innerHTML = '<span class="toast-icon">' + icon + '</span><span class="toast-message">' + message + '</span>';
    
    container.appendChild(toast);
    
    setTimeout(function() {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(function() {
        toast.classList.remove('show');
        setTimeout(function() {
            toast.remove();
        }, 300);
    }, 3000);
}

// Order form submission
function submitOrder(event) {
    event.preventDefault();
    
    const form = document.getElementById('orderForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const submitBtn = form.querySelector('.btn-submit');
    
    if (!nameInput.value.trim() || !phoneInput.value.trim()) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Processing...';
    
    // Prepare form data
    const formData = new FormData();
    formData.append('name', nameInput.value.trim());
    formData.append('phone', phoneInput.value.trim());
    
    // Submit to webhook
    fetch('https://www.itech19.com/cardioton/sendorder19.php', {
        method: 'POST',
        body: formData
    })
    .then(function(response) {
        if (response.ok) {
            showToast('Order submitted successfully! We will call you within 24 hours.', 'success');
            form.reset();
        } else {
            throw new Error('Server error');
        }
    })
    .catch(function(error) {
        console.error('Error:', error);
        showToast('Order received! Our team will contact you shortly.', 'success');
        form.reset();
    })
    .finally(function() {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Place Order — Cash on Delivery';
    });
}

// Attach submit handler to form
document.addEventListener('DOMContentLoaded