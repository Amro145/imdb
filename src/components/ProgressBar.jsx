'use client'; 
import NextNProgress from 'nextjs-progressbar';

const ProgressBar = () => {
return (
    <NextNProgress 
        color="#29D" 
        startPosition={0.3} 
        stopDelayMs={200} 
        height={100} 
        showOnShallow={true} 
        options={{ easing: "ease", speed: 1000 }}
    />
);
};

export default ProgressBar;