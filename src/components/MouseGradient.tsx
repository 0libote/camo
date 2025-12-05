import { useEffect, useRef } from 'react';

export function MouseGradient() {
    const divRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number>();
    const mousePos = useRef({ x: 0, y: 0 });
    const currentPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            // Smooth interpolation (lerp) for lag effect
            const dx = mousePos.current.x - currentPos.current.x;
            const dy = mousePos.current.y - currentPos.current.y;

            currentPos.current.x += dx * 0.15; // Adjust speed here
            currentPos.current.y += dy * 0.15;

            if (divRef.current) {
                divRef.current.style.background = `radial-gradient(600px circle at ${currentPos.current.x}px ${currentPos.current.y}px, rgba(255, 159, 0, 0.12), rgba(255, 159, 0, 0.03) 40%, transparent 60%)`;
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <div
            ref={divRef}
            className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300 blur-2xl"
            style={{
                background: `radial-gradient(600px circle at 50% 50%, rgba(255, 159, 0, 0.12), rgba(255, 159, 0, 0.03) 40%, transparent 60%)`
            }}
        />
    );
}
