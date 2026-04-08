/* New Ultra-Attractive Animations */
@keyframes subtleFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}

@keyframes pulseRing {
    0% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.5; }
    50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.2; }
    100% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.5; }
}

@keyframes clickSparkle {
    0% { transform: scale(0); opacity: 1; }
    100% { transform: scale(2); opacity: 0; }
}

@keyframes mouseTrail {
    0% { transform: scale(1); opacity: 0.8; }
    100% { transform: scale(0); opacity: 0; }
}

.pulse-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid rgba(212, 175, 55, 0.4);
    animation: pulseRing 2s ease-in-out infinite;
    pointer-events: none;
}

.star-ring.tertiary {
    width: 75%;
    height: 75%;
    border: 1px dotted rgba(212, 175, 55, 0.4);
    animation: rotateRing 15s linear infinite reverse;
}

.glow-dot {
    position: absolute;
    width: 4px;
    height: 4px;
    background: radial-gradient(circle, #ffd700, #d4af37);
    border-radius: 50%;
    animation: floatParticle 2s ease-in-out infinite;
    box-shadow: 0 0 10px rgba(212, 175, 55, 0.8);
    pointer-events: none;
}

.floating-sparkle {
    position: absolute;
    width: 2px;
    height: 2px;
    background: #ffd700;
    border-radius: 50%;
    animation: floatSparkle 2.5s ease-in-out infinite;
    pointer-events: none;
}

.click-sparkle {
    position: absolute;
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, #ffd700, transparent);
    border-radius: 50%;
    animation: clickSparkle 0.5s ease-out forwards;
    pointer-events: none;
}

.mouse-trail {
    position: fixed;
    width: 10px;
    height: 10px;
    background: radial-gradient(circle, rgba(212, 175, 55, 0.8), transparent);
    border-radius: 50%;
    pointer-events: none;
    z-index: 10000;
    transition: all 0.05s linear;
    opacity: 0;
    transform: scale(0);
}

.super-sparkle {
    width: 10px !important;
    height: 10px !important;
    background: radial-gradient(circle, #fff8dc, #ffd700) !important;
    box-shadow: 0 0 20px rgba(255, 215, 0, 1) !important;
    animation: superGlitter 1s ease-in-out infinite !important;
}

@keyframes superGlitter {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 1; transform: scale(2); box-shadow: 0 0 30px #ffd700; }
}

@keyframes floatSparkle {
    0% { transform: translate(0, 0) scale(1); opacity: 0; }
    50% { transform: translate(var(--x, 30px), var(--y, 30px)) scale(3); opacity: 1; }
    100% { transform: translate(0, 0) scale(1); opacity: 0; }
}

@keyframes clickRipple {
    0% { transform: scale(0); opacity: 0.8; }
    100% { transform: scale(50); opacity: 0; }
}

.click-ripple {
    position: fixed;
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, rgba(212, 175, 55, 0.5), transparent);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    animation: clickRipple 0.6s ease-out forwards;
}
