import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa';

const FloatingSocials = () => {
    const socials = [
        { icon: <FaFacebookF />, color: '#1877F2', url: 'https://www.facebook.com/', name: 'Facebook' },
        { icon: <FaTwitter />, color: '#1DA1F2', url: 'https://twitter.com/', name: 'Twitter' },
        { icon: <FaLinkedinIn />, color: '#0A66C2', url: 'https://www.linkedin.com/', name: 'LinkedIn' },
        { icon: <FaInstagram />, color: '#E4405F', url: 'https://www.instagram.com/njrealestate_gandhinagar', name: 'Instagram' },
        { icon: <FaYoutube />, color: '#FF0000', url: 'https://www.youtube.com/', name: 'YouTube' },
    ];

    return (
        <div className="floating-socials-container">
            <style>
                {`
                .floating-socials-container {
                    position: fixed;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    z-index: 99999;
                }

                .floating-social-link {
                    width: 50px;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    text-decoration: none;
                    font-size: 22px;
                    transition: all 0.3s ease;
                    background: rgba(15, 23, 42, 0.85);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-right: none;
                    border-radius: 12px 0 0 12px;
                    box-shadow: -4px 0 15px rgba(0, 0, 0, 0.2);
                    padding-left: 5px;
                }

                .floating-social-link:hover {
                    width: 60px;
                    padding-left: 0;
                    background: var(--hover-color, #3b82f6);
                    box-shadow: -8px 0 25px var(--glow-color, rgba(59, 130, 246, 0.4));
                    transform: translateX(-5px);
                }

                .floating-social-link svg {
                    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

                .floating-social-link:hover svg {
                    transform: scale(1.2) rotate(360deg);
                }

                @media (max-width: 768px) {
                    .floating-social-link {
                        width: 40px;
                        height: 40px;
                        font-size: 18px;
                    }
                    .floating-social-link:hover {
                        width: 45px;
                    }
                }
                `}
            </style>
            {socials.map((social, index) => (
                <a
                    key={index}
                    href={social.url}
                    className="floating-social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                    style={{
                        '--hover-color': social.color,
                        '--glow-color': `${social.color}66`
                    }}
                >
                    {social.icon}
                </a>
            ))}
        </div>
    );
};

export default FloatingSocials;