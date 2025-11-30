import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PageReveal from "../components/common/PageReveal";
import SignUpCard from "../components/SignUp/SignUpCard";
import { useAuth } from "../hooks/useAuth";
import apiService from "../../services/apiService";

function SignUp() {
  const navigate = useNavigate();
  const { signInWithGoogle } = useAuth();
  const [showReveal, setShowReveal] = useState(true);
  const [isPressed, setIsPressed] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // Typewriter state
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const texts = [
    "skills speak louder than degrees",
    "73% match rate. 2% on job boards.",
    "your talent > your college name",
  ];

  // Typewriter effect
  useEffect(() => {
    const currentText = texts[textIndex];

    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2500); // Pause for 2.5 seconds before deleting
      return () => clearTimeout(pauseTimeout);
    }

    // Slower, more natural typing speed with slight randomness
    const baseTypeSpeed = isDeleting ? 40 : 80;
    const randomVariation = Math.random() * 30; // Add slight randomness for natural feel
    const typeSpeed = baseTypeSpeed + randomVariation;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          // Finished typing, pause before deleting
          setIsPaused(true);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, isPaused, textIndex, texts]);

  // Card shuffle animation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCardIndex((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = async () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);

    try {
      await signInWithGoogle();

      // Check if user exists in backend
      try {
        const user = await apiService.checkUser();

        // Trigger exit animation
        setIsExiting(true);

        if (user && user.exists) {
          // User exists, redirect to home
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          // User exists but flag is false (unlikely given checkUser logic, but safe fallback)
          setTimeout(() => {
            navigate("/registration");
          }, 1000);
        }
      } catch (error) {
        // User does not exist (404) or other error -> redirect to registration
        console.log("User not found or error, redirecting to registration:", error);
        setIsExiting(true);
        setTimeout(() => {
          navigate("/registration");
        }, 1000);
      }
    } catch (error) {
      console.error("Google Sign In failed", error);
      // Optional: Show error state to user
    }
  };

  // Card configurations
  const cards = [
    {
      bgColor: "#F8A5B8",
      date: "1",
      month: "Skills over college names",
      title:
        "Take quick tests. Get verified badges. Show employers what you can actually do.",
      author: "HYRUP Team",
      icon: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect
            x="15"
            y="35"
            width="50"
            height="35"
            rx="3"
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
          <rect
            x="10"
            y="70"
            width="60"
            height="5"
            rx="2"
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
          <path
            d="M30 45 Q40 35 50 45 Q60 55 70 45"
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
          <path
            d="M25 50 Q35 40 45 50"
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
        </svg>
      ),
    },
    {
      bgColor: "#F97316",
      date: "2",
      month: "skills > college names",
      title:
        "Match with companies who care about talent, not where you studied. Zero bias.",
      author: "HYRUP Team",
      icon: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect
            x="20"
            y="20"
            width="15"
            height="50"
            rx="2"
            fill="none"
            stroke="black"
            strokeWidth="2"
            transform="rotate(-15 27 45)"
          />
          <line
            x1="27"
            y1="25"
            x2="27"
            y2="65"
            stroke="black"
            strokeWidth="1"
            transform="rotate(-15 27 45)"
          />
          <polygon
            points="50,70 45,55 55,55"
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
          <rect
            x="45"
            y="20"
            width="12"
            height="35"
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
          <path
            d="M35 75 Q40 85 50 80 Q60 85 65 75"
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
        </svg>
      ),
    },
    {
      bgColor: "#FFFFFF",
      date: "3",
      month: "find your people",
      title:
        "Join communities. Connect with mentors. Grow together, not alone.",
      author: "HYRUP Team",
      icon: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M10 25 L10 75 L50 70 L50 20 Z"
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
          <path
            d="M50 20 L50 70 L90 75 L90 25 Z"
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
          <line
            x1="15"
            y1="30"
            x2="45"
            y2="28"
            stroke="black"
            strokeWidth="1"
          />
          <line
            x1="15"
            y1="38"
            x2="45"
            y2="36"
            stroke="black"
            strokeWidth="1"
          />
          <circle cx="60" cy="40" r="3" fill="black" />
          <circle cx="72" cy="40" r="3" fill="black" />
          <circle cx="84" cy="40" r="3" fill="black" />
          <circle cx="60" cy="52" r="3" fill="black" />
          <circle cx="72" cy="52" r="3" fill="black" />
          <circle cx="84" cy="52" r="3" fill="black" />
          <rect x="60" y="58" width="8" height="8" fill="black" />
          <rect x="72" y="58" width="8" height="8" fill="black" />
        </svg>
      ),
    },
  ];

  // Check if mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getCardStyle = (index) => {
    const position = (index - activeCardIndex + 3) % 3;

    // Mobile positions (smaller, more compact)
    const mobilePositions = [
      {
        // Front card
        top: "120px",
        left: "20px",
        rotation: -3,
        zIndex: 30,
        scale: 1,
        opacity: 1,
      },
      {
        // Middle card
        top: "40px",
        left: "100px",
        rotation: 5,
        zIndex: 20,
        scale: 0.95,
        opacity: 1,
      },
      {
        // Back card
        top: "0px",
        left: "40px",
        rotation: -5,
        zIndex: 10,
        scale: 0.9,
        opacity: 0.9,
      },
    ];

    // Desktop positions
    const desktopPositions = [
      {
        // Front card - bottom position
        top: "220px",
        left: "-20px",
        rotation: -3,
        zIndex: 30,
        scale: 1,
        opacity: 1,
      },
      {
        // Middle card
        top: "80px",
        left: "120px",
        rotation: 5,
        zIndex: 20,
        scale: 0.95,
        opacity: 1,
      },
      {
        // Back card - top position
        top: "0px",
        left: "20px",
        rotation: -5,
        zIndex: 10,
        scale: 0.9,
        opacity: 0.9,
      },
    ];

    return isMobile ? mobilePositions[position] : desktopPositions[position];
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-[#FFFAE9]">
      {/* Page Reveal Animation */}
      {showReveal && <PageReveal onComplete={() => setShowReveal(false)} />}

      {/* Exit Animation Overlay */}
      {isExiting && (
        <>
          {/* Top Curtain */}
          <div className="fixed top-0 left-0 w-full h-1/2 bg-[#D9F99D] z-[100] animate-[slideDownCurtain_1s_ease-in-out_forwards]" />
          {/* Bottom Curtain */}
          <div className="fixed bottom-0 left-0 w-full h-1/2 bg-[#D9F99D] z-[100] animate-[slideUpCurtain_1s_ease-in-out_forwards]" />
        </>
      )}

      {/* Main Content */}
      <div
        className={`absolute top-0 left-0 p-3 md:p-4 z-50 transition-all duration-500 ${isExiting ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
      >
        <h1 className="text-xl md:text-2xl font-[inter-bold] text-amber-600">
          HYRUP.IN
        </h1>
      </div>
      <div
        className={`w-full h-full flex flex-col md:flex-row transition-all duration-500 ${isExiting ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
      >
        {/* Text Section - Bottom on mobile, Left on desktop */}
        <div className="order-2 md:order-1 flex-1 flex flex-col items-start justify-center px-5 md:pl-10 py-6 md:py-0">
          <div className="h-[150px] sm:h-[170px] md:h-[250px] flex items-start mb-9 md:mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black font-[inter-extra] leading-snug uppercase">
              {displayText}
              <span className="animate-pulse text-[#C75B5B]">|</span>
            </h1>
          </div>

          <div
            className="relative group cursor-pointer ml-8 md:ml-8 select-none"
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
            onClick={handleClick}
          >
            <div
              className={`absolute w-full h-full transition-all duration-100 ease-out ${isPressed
                  ? "top-0.5 left-0.5"
                  : "top-1 left-1 md:top-1.5 md:left-1.5 group-hover:top-1.5 group-hover:left-1.5 md:group-hover:top-2 md:group-hover:left-2"
                }`}
            >
              <div className="absolute -left-7 md:-left-8 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 bg-black rounded-full" />
              <div className="w-full h-full bg-black rounded-lg" />
            </div>

            <div
              className={`relative flex items-center transition-transform duration-100 ease-out ${isPressed ? "translate-x-0.5 translate-y-0.5" : ""
                }`}
            >
              <div
                className={`absolute -left-7 md:-left-8 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 bg-[#D9F99D] rounded-full border-2 border-black flex items-center justify-center z-10 transition-all duration-100 ${isPressed ? "scale-95" : "scale-100"
                  }`}
              >
                <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-9 md:h-9">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </div>

              <div
                className={`bg-[#D9F99D] rounded-lg border-2 border-black transition-all duration-100 ${isPressed ? "scale-[0.98]" : "scale-100"
                  }`}
              >
                <span className="block px-8 py-4 md:px-10 md:py-4 text-base md:text-xl font-[Jost-Bold] text-black pl-10 md:pl-12">
                  Continue with Google
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Cards Section - Top on mobile, Right on desktop */}
        <div className="order-1 md:order-2 flex-1 bg-[#E3FEAA] flex items-center justify-center relative overflow-hidden pt-2 min-h-[50vh] md:min-h-0">
          {/* Card Stack with Shuffle Animation */}
          <div className="relative w-[280px] h-[350px] md:w-[400px] md:h-[600px]">
            {cards.map((card, index) => {
              const style = getCardStyle(index);
              return (
                <div
                  key={index}
                  className="absolute transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                  style={{
                    top: style.top,
                    left: style.left,
                    zIndex: style.zIndex,
                    transform: `rotate(${style.rotation}deg) scale(${style.scale})`,
                    opacity: style.opacity,
                  }}
                >
                  <SignUpCard
                    bgColor={card.bgColor}
                    date={card.date}
                    month={card.month}
                    title={card.title}
                    author={card.author}
                    rotation={0}
                    icon={card.icon}
                    isMobile={isMobile}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
