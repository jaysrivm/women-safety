// Voice distress detection parameters
const PITCH_THRESHOLD = 300; // Hz - threshold for distress pitch
const VOLUME_THRESHOLD = 0.7; // 0-1 - threshold for loudness
const DURATION_THRESHOLD = 1000; // ms - minimum duration to trigger

let audioContext;
let analyser;
let microphone;
let isRecording = false;
let distressDetected = false;
let startTime;
let canvas, canvasCtx;

document.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('voiceVisualizer');
    canvasCtx = canvas.getContext('2d');
    
    // Set up voice button
    const voiceBtn = document.getElementById('voiceBtn');
    voiceBtn.addEventListener('mousedown', startRecording);
    voiceBtn.addEventListener('mouseup', stopRecording);
    voiceBtn.addEventListener('touchstart', startRecording);
    voiceBtn.addEventListener('touchend', stopRecording);
});

function startRecording() {
    if (isRecording) return;
    
    const statusElement = document.getElementById('voiceStatus');
    statusElement.textContent = "Listening... Speak loudly if in distress";
    distressDetected = false;
    startTime = Date.now();
    
    // Set up audio context
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            isRecording = true;
            microphone = audioContext.createMediaStreamSource(stream);
            microphone.connect(analyser);
            
            // Start visualization
            visualize();
            
            // Start analyzing for distress
            analyzePitch();
        })
        .catch(err => {
            console.error('Error accessing microphone:', err);
            statusElement.textContent = "Microphone access denied. Allow access for voice detection.";
        });
}

function stopRecording() {
    if (!isRecording) return;
    
    const statusElement = document.getElementById('voiceStatus');
    if (distressDetected) {
        statusElement.textContent = "Distress detected! Sending alerts...";
        triggerEmergencyProtocol();
    } else {
        statusElement.textContent = "No distress detected. Press and hold to detect distress";
    }
    
    // Clean up
    if (microphone && microphone.mediaStream) {
        microphone.mediaStream.getTracks().forEach(track => track.stop());
    }
    if (audioContext) {
        audioContext.close();
    }
    isRecording = false;
    cancelAnimationFrame(animationId);
}

let animationId;
function visualize() {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    function draw() {
        animationId = requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);
        
        canvasCtx.fillStyle = 'rgb(200, 200, 200)';
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
        
        const barWidth = (canvas.width / bufferLength) * 2.5;
        let x = 0;
        
        for (let i = 0; i < bufferLength; i++) {
            const barHeight = dataArray[i] / 2;
            
            // Color based on volume (red for high volume)
            const intensity = dataArray[i] / 255;
            canvasCtx.fillStyle = `rgb(${Math.floor(255 * intensity)}, ${Math.floor(255 * (1 - intensity))}, 0)`;
            
            canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth + 1;
        }
    }
    
    draw();
}

function analyzePitch() {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    function check() {
        analyser.getByteFrequencyData(dataArray);
        
        // Find the frequency with the highest amplitude
        let maxIndex = 0;
        let maxValue = 0;
        for (let i = 0; i < bufferLength; i++) {
            if (dataArray[i] > maxValue) {
                maxValue = dataArray[i];
                maxIndex = i;
            }
        }
        
        // Convert index to frequency
        const sampleRate = audioContext.sampleRate;
        const frequency = maxIndex * sampleRate / analyser.fftSize;
        
        // Check for distress signals
        const volume = maxValue / 255;
        const duration = Date.now() - startTime;
        
        if (frequency > PITCH_THRESHOLD && 
            volume > VOLUME_THRESHOLD && 
            duration > DURATION_THRESHOLD) {
            distressDetected = true;
            stopRecording();
            return;
        }
        
        if (isRecording) {
            setTimeout(check, 200);
        }
    }
    
    check();
}

function triggerEmergencyProtocol() {
    // In a real app, this would send alerts to emergency contacts
    // For this demo, we'll just show an alert
    alert("EMERGENCY ALERT: Distress signal detected! Your emergency contacts have been notified with your location.");
    
    // Vibrate device if supported
    if (navigator.vibrate) {
        navigator.vibrate([500, 200, 500, 200, 500]);
    }
}
